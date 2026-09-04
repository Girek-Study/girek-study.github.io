// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio final previsto: https://girek-study.com
  // Hasta comprarlo, el sitio vive en GitHub Pages. Este valor solo afecta a
  // los enlaces canónicos y al sitemap, así que tiene que apuntar a donde el
  // sitio realmente está publicado.
  site: 'https://girek-study.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
