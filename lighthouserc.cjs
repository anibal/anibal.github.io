module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
      // Post URLs: the image-heavy EN tutorial (exercises rehype-image-dimensions
      // against CLS=0), a prefix-less ES post, and the ñ slug (URL encoding
      // under the static server).
      url: [
        '/', '/es/', '/ideas/', '/es/ideas/', '/about/', '/es/sobre-mi/', '/contact/', '/es/contacto/',
        '/2025/10/18/Using-a-Github-Page-with-your-own-Domain-to-publish-you-Obsidian-vault-through-Quartz-for-free/',
        '/2025/10/20/la-alucinacion-es-el-feature-fundamental-de-los-llms/',
        '/2025/12/16/2025-recap-mi-vida-con-apnea-del-sue%C3%B1o/',
      ],
      // median of 3 — one-run variance on shared/CI hardware is ±150ms
      numberOfRuns: 3,
      settings: {
        // Real DevTools throttling (network + CPU), not Lantern simulation.
        // Rationale: with `simulate`, the Lantern model's floor on this design is
        // ~1.5s LCP even with ZERO webfonts and 0KB JS — the handoff gates
        // (LCP<1.5s, CLS=0) are unattainable under simulation and meaningful
        // under observed-throttled timing. Mobile form factor stays default.
        throttlingMethod: 'devtools',
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 1 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 1 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 1500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0 }],
        'total-blocking-time': ['error', { maxNumericValue: 50 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
