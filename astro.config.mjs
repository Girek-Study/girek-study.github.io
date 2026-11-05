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

  // Español en la raíz, inglés bajo /en/. `prefixDefaultLocale: false` deja las
  // URL españolas como estaban: /trayectoria sigue siendo /trayectoria y no se
  // rompe ningún enlace ya publicado.
  //
  // Las equivalencias de ruta viven en src/i18n/index.ts, no aquí: Astro solo
  // necesita saber qué idiomas hay, y el mapa /trayectoria <-> /en/experience
  // lo usan también el selector y los hreflang.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [sitemap()],

  // Los bloques ```figura del Markdown se convierten en diagramas. Ver src/lib/figuras.mjs.
  markdown: {
    remarkPlugins: [remarkFiguras],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
