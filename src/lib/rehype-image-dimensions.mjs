/**
 * Build-time image dimensions for markdown bodies — the CLS = 0 gate needs
 * explicit width/height on every <img>, and markdown `![]()` emits none.
 *
 * For each root-absolute `src` (the convention for post images, which live in
 * public/ at their original published URLs) this reads the intrinsic size
 * straight from the file's header bytes — no dependencies — and sets
 * width/height plus lazy loading (the first image of a document stays eager:
 * a lazy LCP candidate is a Lighthouse failure).
 *
 * A missing or unparseable file THROWS: the build itself is the broken-image
 * guard, nothing ships with a dangling reference.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const publicDir = fileURLToPath(new URL('../../public/', import.meta.url));

function pngSize(buf) {
  // 8-byte signature, then IHDR: length(4) type(4) width(4) height(4)
  if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return undefined;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  if (buf.length < 4 || buf.readUInt16BE(0) !== 0xffd8) return undefined;
  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) return undefined;
    const marker = buf[offset + 1];
    // SOF0–SOF15 carry dimensions, except DHT (C4), JPG (C8), DAC (CC)
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
      return { width: buf.readUInt16BE(offset + 7), height: buf.readUInt16BE(offset + 5) };
    }
    offset += 2 + buf.readUInt16BE(offset + 2);
  }
  return undefined;
}

export default function rehypeImageDimensions() {
  return (tree, file) => {
    let first = true;
    const visit = (node) => {
      if (node.type === 'element' && node.tagName === 'img') {
        const src = node.properties?.src;
        if (typeof src === 'string' && src.startsWith('/')) {
          const path = publicDir + decodeURIComponent(src.slice(1));
          let size;
          try {
            const buf = readFileSync(path);
            size = pngSize(buf) ?? jpegSize(buf);
          } catch {
            throw new Error(`rehype-image-dimensions: missing image ${src} (looked in ${path}) referenced from ${file?.path ?? 'unknown file'}`);
          }
          if (!size) {
            throw new Error(`rehype-image-dimensions: cannot read dimensions of ${src} (not a PNG/JPEG?) referenced from ${file?.path ?? 'unknown file'}`);
          }
          node.properties.width = size.width;
          node.properties.height = size.height;
          node.properties.decoding = 'async';
          if (!first) node.properties.loading = 'lazy';
          first = false;
        }
      }
      for (const child of node.children ?? []) visit(child);
    };
    visit(tree);
  };
}
