import type { APIRoute } from 'astro';
import { getPosts, postDateParts } from '../../lib/posts';
import { renderOgPng } from '../../lib/og';

interface OgMeta {
  title: string;
  eyebrow?: string;
  description?: string;
  isHome?: boolean;
}

function routeFromPath(p: string): string {
  if (p === '/') return 'home';
  if (p === '/es/') return 'es/home';
  return p.replace(/^\/|\/$/g, '');
}

export async function getStaticPaths() {
  const paths: { params: { route: string }; props: OgMeta }[] = [];

  const enMeta: Record<string, OgMeta> = {
    '/': {
      title: 'I help engineering organizations adopt AI-assisted development,\nelevating the team and the codebase',
      eyebrow: '~/anibal-rojas',
      description: 'Talks, fractional VP of Engineering, executive coaching.',
      isHome: true,
    },
    '/about/': {
      title: 'I help you turn AI into a boring technology.',
      eyebrow: '~/anibal-rojas · about',
      description: 'Three decades building and leading software organizations. VP of Engineering at Platzi. A year hands-deep in AI-assisted development.',
    },
    '/contact/': {
      title: 'Book a conversation',
      eyebrow: '~/anibal-rojas · contact',
      description: 'Every engagement starts with a conversation, no pitch, no deck, no commitment.',
    },
    '/ideas/': {
      title: 'Ideas',
      eyebrow: '~/anibal-rojas · ideas',
      description: 'Writing on AI-assisted development, engineering leadership, systems thinking, and the messy human reality between them.',
    },
  };

  const esMeta: Record<string, OgMeta> = {
    '/es/': {
      title: 'Ayudo a organizaciones de ingeniería a adoptar el desarrollo asistido por IA,\nelevando al equipo y al codebase',
      eyebrow: '~/anibal-rojas',
      description: 'Charlas, VP de Ingeniería fraccional, coaching ejecutivo.',
      isHome: true,
    },
    '/es/sobre-mi/': {
      title: 'Te ayudo a convertir la IA en una tecnología aburrida.',
      eyebrow: '~/anibal-rojas · sobre mí',
      description: 'Tres décadas construyendo y liderando organizaciones de software. VP de Ingeniería en Platzi. Coaching ejecutivo. Pensamiento sistémico.',
    },
    '/es/contacto/': {
      title: 'Agenda una conversación',
      eyebrow: '~/anibal-rojas · contacto',
      description: 'Todo empieza con una conversación, sin pitch, sin presentación, sin compromiso.',
    },
    '/es/ideas/': {
      title: 'Ideas',
      eyebrow: '~/anibal-rojas · ideas',
      description: 'Escritos sobre desarrollo asistido por IA, liderazgo de ingeniería, pensamiento sistémico, y la complicada realidad humana entre ellos.',
    },
  };

  for (const [path, meta] of Object.entries(enMeta)) {
    paths.push({ params: { route: routeFromPath(path) }, props: meta });
  }
  for (const [path, meta] of Object.entries(esMeta)) {
    paths.push({ params: { route: routeFromPath(path) }, props: meta });
  }

  const enPosts = await getPosts('en');
  for (const post of enPosts) {
    const { y, m, d } = postDateParts(post.data.date);
    paths.push({
      params: { route: `${y}/${m}/${d}/${post.id}` },
      props: {
        title: post.data.title,
        eyebrow: '~/anibal-rojas · ideas',
        description: post.data.description,
      },
    });
  }

  const esPosts = await getPosts('es');
  for (const post of esPosts) {
    const { y, m, d } = postDateParts(post.data.date);
    paths.push({
      params: { route: `${y}/${m}/${d}/${post.id}` },
      props: {
        title: post.data.title,
        eyebrow: '~/anibal-rojas · ideas',
        description: post.data.description,
      },
    });
  }

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const meta = props as OgMeta;
  const png = await renderOgPng(meta);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
