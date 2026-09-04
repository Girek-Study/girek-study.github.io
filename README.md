# Girek — Sitio personal

Sitio personal de **Giancarlo (Girek) Palomino**: trayectoria profesional, el proyecto de enseñanza **Girek Study** y portafolio de proyectos.

Construido con **Astro 5 + Tailwind CSS v4**. Estático, rápido y responsive (web + mobile).

## Comandos

```bash
npm install      # instalar dependencias (una sola vez)
npm run dev      # servidor de desarrollo → http://localhost:4321
npm run build    # generar el sitio estático en /dist
npm run preview  # previsualizar el build de producción
```

## Estructura

```
src/
├─ data/              ← EDITA AQUÍ TU CONTENIDO
│  ├─ site.ts         ← perfil, tagline, stats, stack, enlaces (LinkedIn, GitHub, CV)
│  ├─ experience.ts   ← experiencia laboral, educación, certificaciones
│  ├─ courses.ts      ← Girek Study: cursos, temario, testimonios
│  └─ projects.ts     ← proyectos del portafolio
├─ pages/             ← una página por archivo
│  ├─ index.astro         (/)            Inicio
│  ├─ trayectoria.astro   (/trayectoria)
│  ├─ girek-study.astro   (/girek-study)
│  └─ portafolio.astro    (/portafolio)
├─ components/        ← Nav, Footer, SectionHeading
├─ layouts/Layout.astro
└─ styles/global.css  ← sistema de diseño (colores, fuentes, utilidades)
```

## Cómo editar el contenido

Todo el texto está en `src/data/*.ts`. Los valores actuales son una **base inferida**
de tu perfil QA Automation — reemplázalos con tus datos reales de LinkedIn. Busca los
comentarios `TODO:` para los campos pendientes (usuario de GitHub, CV en PDF, etc.).

- **Tu CV**: coloca el PDF en `public/cv.pdf` y pon la URL en `site.ts → links.cv`.
- **Favicon / dominio**: el favicon está en `public/favicon.svg`; el dominio en `astro.config.mjs`.

## Despliegue

El sitio es estático (`/dist`). Puedes desplegarlo gratis en:

- **Vercel** o **Netlify**: conecta el repo y detectan Astro automáticamente.
- **GitHub Pages**: sube `/dist` o usa la acción oficial de Astro.

Recuerda actualizar `site` en `astro.config.mjs` con tu dominio final.
