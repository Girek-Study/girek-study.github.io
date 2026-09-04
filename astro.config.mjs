// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // El dominio vive en Cloudflare y apunta a GitHub Pages.
  // El archivo public/CNAME es lo que se lo dice a GitHub en cada despliegue.
  site: 'https://girek-study.com',

  vite: {
    plugins: [tailwindcss()],
  },
});
