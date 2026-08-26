import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { decompress } from 'wawoff2';

const FONTS_DIR = resolve(process.cwd(), 'public/fonts');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

const PAPER = '#F7F7F3';
const INK = '#191C21';
const MUTED = '#5C6370';
const AMBER = '#A85A0A';
const LINE = '#E4E3DC';

let fontsCache: satori.Font[] | null = null;

const VAR_TABLES = new Set(['fvar', 'gvar', 'avar', 'HVAR', 'STAT']);

function stripVarTables(ttf: Buffer): Buffer {
  const numTables = ttf.readUint16BE(4);

  for (let i = 0; i < numTables; i++) {
    const entry = 12 + i * 16;
    const tag = ttf.subarray(entry, entry + 4).toString('ascii');
    if (VAR_TABLES.has(tag)) {
      ttf.fill(0, entry, entry + 16);
    }
  }

  return ttf;
}

async function loadFonts(): Promise<satori.Font[]> {
  if (fontsCache) return fontsCache;

  const frauncesWoff2 = readFileSync(resolve(FONTS_DIR, 'fraunces-latin-standard-normal.woff2'));
  const plexSansWoff2 = readFileSync(resolve(FONTS_DIR, 'ibm-plex-sans-latin-400-normal.woff2'));
  const plexMonoWoff2 = readFileSync(resolve(FONTS_DIR, 'ibm-plex-mono-latin-500-normal.woff2'));

  const frauncesBuf = stripVarTables(
    Buffer.from(new Uint8Array(await decompress(frauncesWoff2))),
  );
  const plexSansBuf = Buffer.from(new Uint8Array(await decompress(plexSansWoff2)));
  const plexMonoBuf = Buffer.from(new Uint8Array(await decompress(plexMonoWoff2)));

  fontsCache = [
    { name: 'Fraunces', data: frauncesBuf, weight: 400, style: 'normal' },
    { name: 'IBM Plex Sans', data: plexSansBuf, weight: 400, style: 'normal' },
    { name: 'IBM Plex Mono', data: plexMonoBuf, weight: 500, style: 'normal' },
  ];

  return fontsCache;
}

interface OgProps {
  title: string;
  eyebrow?: string;
  description?: string;
  isHome?: boolean;
}

function titleLines(title: string) {
  return title.split('\n').map((line) => ({
    type: 'div' as const,
    props: {
      style: { display: 'flex' },
      children: line,
    },
  }));
}

export async function renderOgPng(props: OgProps): Promise<Buffer> {
  const fonts = await loadFonts();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: OG_WIDTH,
          height: OG_HEIGHT,
          background: PAPER,
          padding: props.isHome ? '54px 72px' : '64px 72px',
        },
        children: [
          props.eyebrow
            ? {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    fontFamily: 'IBM Plex Mono',
                    fontSize: 20,
                    fontWeight: 500,
                    color: MUTED,
                    letterSpacing: '0.04em',
                    marginBottom: props.isHome ? 48 : 28,
                    paddingBottom: 24,
                    borderBottom: `1px solid ${LINE}`,
                  },
                  children: props.eyebrow,
                },
              }
            : null,
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                flex: 1,
                justifyContent: props.isHome ? 'flex-start' : 'center',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      fontFamily: 'Fraunces',
                      fontSize: props.isHome ? 56 : 52,
                      fontWeight: 640,
                      fontStyle: 'italic',
                      lineHeight: 1.14,
                      letterSpacing: '-0.015em',
                      color: INK,
                    },
                    children: titleLines(props.title),
                  },
                },
                ...(props.description
                  ? [
                      {
                        type: 'div',
                        props: {
                          style: {
                            display: 'flex',
                            fontFamily: 'IBM Plex Sans',
                            fontSize: 24,
                            fontWeight: 400,
                            lineHeight: 1.45,
                            color: MUTED,
                            marginTop: 12,
                          },
                          children: props.description,
                        },
                      },
                    ]
                  : []),
              ],
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                marginTop: props.isHome ? 32 : 40,
                paddingTop: 24,
                borderTop: `1px solid ${LINE}`,
                alignItems: 'center',
                justifyContent: 'space-between',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      fontFamily: 'IBM Plex Mono',
                      fontSize: 18,
                      fontWeight: 500,
                      color: MUTED,
                      letterSpacing: '0.04em',
                    },
                    children: '~/anibal-rojas',
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      width: 48,
                      height: 3,
                      background: AMBER,
                      borderRadius: 2,
                    },
                  },
                },
              ],
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      fonts,
    },
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: OG_WIDTH },
  });
  return resvg.render().asPng();
}
