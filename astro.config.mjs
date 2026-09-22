// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import { remarkFiguras } from './src/lib/figuras.mjs';

// https://astro.build/config
export default defineConfig({
  // El dominio vive en Cloudflare y apunta a GitHub Pages.
  // El archivo public/CNAME es lo que se lo dice a GitHub en cada despliegue.
  // Este valor también alimenta los enlaces canónicos y el sitemap, así que
  // tiene que apuntar a donde el sitio realmente está publicado.
  site: 'https://girek-study.com',

  integrations: [sitemap()],

  // Los bloques ```figura del Markdown se convierten en diagramas. Ver src/lib/figuras.mjs.
  markdown: {
    remarkPlugins: [remarkFiguras],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
