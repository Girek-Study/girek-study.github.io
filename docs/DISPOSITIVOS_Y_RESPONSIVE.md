# Dispositivos y guía de responsive — girek-study.com

Referencia única para probar y ajustar el sitio (Astro 5 + Tailwind v4).
Todas las medidas son **píxeles CSS de viewport** (lo que ve el CSS), no píxeles físicos.

---

## 1. Matriz de dispositivos

### 1.1 Móviles (los que realmente importan)

| Dispositivo | Viewport CSS (W×H) | DPR | Resolución física | Cuota aprox. | Notas |
|---|---|---|---|---|---|
| **Galaxy S8 / A-series antiguos** | **360 × 740** | 3 | 1080×2220 | alta en LATAM | **Piso real del diseño.** Si funciona aquí, funciona en todo. |
| **Galaxy S21/S22/S23, A5x** | **360 × 800** | 3 | 1080×2400 | muy alta | El Android más común en Perú. |
| **iPhone SE 2/3** | **375 × 667** | 2 | 750×1334 | media | El **más bajo de altura**: el hero debe caber o cortar limpio. |
| **iPhone 12/13 mini** | 375 × 812 | 3 | 1125×2436 | baja | Notch. |
| **iPhone 13/14/15/16** | **390 × 844** | 3 | 1170×2532 | muy alta | Dynamic Island desde el 14 Pro. |
| **iPhone 14 Pro / 15 / 16 Pro** | **393 × 852** | 3 | 1179×2556 | muy alta | El que sale en tu captura (primero de la izquierda). |
| **Pixel 7 / 8** | **412 × 915** | 2.625 | 1080×2400 | media | Ancho "cómodo" de Android. |
| **Pixel 7 Pro** | 480 × 1040 | 3.5 | 1440×3120 | baja | El segundo de tu captura. |
| **iPhone 14/15/16 Plus y Pro Max** | **430 × 932** | 3 | 1290×2796 | alta | El más ancho de iOS. |
| Galaxy S23/S24 Ultra | 412 × 915 | 3.5 | 1440×3088 | media | En CSS es igual que un Pixel. |
| Galaxy Z Fold (cerrado) | 344 × 882 | 3.5 | — | baja | **El más angosto que existe.** Probar si sobra tiempo. |
| Galaxy Z Fold (abierto) | 673 × 841 | 2.6 | — | baja | Cae en `sm`, casi tablet. |

**Anchos críticos a probar: 344 · 360 · 375 · 390 · 412 · 430**

### 1.2 Tablets

| Dispositivo | Vertical | Horizontal | DPR | Notas |
|---|---|---|---|---|
| **iPad Mini 6** | 744 × 1133 | 1133 × 744 | 2 | Justo debajo de `md`. Peligroso: cae en `sm`. |
| **iPad 10.2" (9ª gen)** | 810 × 1080 | 1080 × 810 | 2 | Muy común en colegios y empresas. |
| **iPad Air 4/5 y Pro 11"** | **820 × 1180** | 1180 × 820 | 2 | El de tu captura. |
| iPad Pro 12.9" | 1024 × 1366 | 1366 × 1024 | 2 | Vertical cae exacto en `lg`. |
| Galaxy Tab S8/S9 | 800 × 1280 | 1280 × 800 | 2.25 | — |

**Anchos críticos: 744 · 768 · 810 · 820 · 1024**

### 1.3 Laptops y escritorio

| Dispositivo | Viewport CSS | Resolución real | Notas |
|---|---|---|---|
| **MacBook Air 13" M2/M3** | **1440 × 900** (escalado por defecto) | 2560×1664 @2x | El de tu captura (1559×975 es con zoom del navegador). |
| MacBook Pro 14" | 1512 × 982 | 3024×1964 @2x | — |
| MacBook Pro 16" | 1728 × 1117 | 3456×2234 @2x | — |
| **Laptop Windows 1366×768** | **1366 × 625** útiles | 1366×768 | **La más común en oficinas de Perú.** Altura útil mínima: el hero NO puede medir `100vh` con contenido apretado. |
| **Windows 1920×1080 al 125%** | **1536 × 864** | 1920×1080 | Windows escala a 125% por defecto, así que el viewport CSS es 1536, no 1920. |
| Full HD al 100% | 1920 × 1080 | 1920×1080 | — |
| 2K / QHD | 2560 × 1440 | — | Necesita `max-width` en el contenedor. |
| 4K | 3840 × 2160 | — | Igual; sin tope el texto se estira feo. |

**Anchos críticos: 1280 · 1366 · 1440 · 1536 · 1920**

---

## 2. Breakpoints (Tailwind v4, los que ya usa el proyecto)

| Prefijo | min-width | rem | Cubre |
|---|---|---|---|
| _(base)_ | 0 | — | **Móvil 344–639px** ← escribe aquí primero |
| `sm:` | 640px | 40rem | Móvil grande horizontal, Fold abierto, iPad Mini vertical |
| `md:` | 768px | 48rem | Tablets verticales (810, 820) |
| `lg:` | 1024px | 64rem | Tablet horizontal, laptops chicas |
| `xl:` | 1280px | 80rem | Laptops 1366 y 1440 |
| `2xl:` | 1536px | 96rem | 1920 al 125%, monitores grandes |

> **Regla del proyecto:** mobile-first siempre. El estilo sin prefijo es el de 360px.
> Nunca usar `max-*:` salvo para apagar algo puntual.

### Breakpoints extra recomendados

Agregar en `src/styles/global.css` dentro de `@theme`:

```css
@theme {
  --breakpoint-xs: 25.875rem;  /* 414px — separa iPhone chico de Plus/Pro Max */
  --breakpoint-3xl: 120rem;    /* 1920px — tope para pantallas gigantes */
}
```

Uso: `xs:text-lg`, `3xl:max-w-[1400px]`.

---

## 3. Problemas detectados en la captura actual (`/trayectoria/`)

| # | Ancho donde falla | Síntoma | Arreglo |
|---|---|---|---|
| 1 | 412–480px (Pixel 7 / 7 Pro) | La foto se encoge a ~110px y queda flotando con un hueco enorme arriba | Fijar `w-32 xs:w-40 sm:w-48` con `aspect-square object-cover`; nunca dejar que dependa del alto del contenedor |
| 2 | 344–430px | El grid de métricas a 2 columnas parte "tiempo de validación por release" en 3 líneas y las banderas se desbordan | `grid-cols-1 xs:grid-cols-2 lg:grid-cols-4` |
| 3 | 393–430px | Los 4 botones (Escríbeme / LinkedIn / GitHub / Correo) quedan en 2×2 apretados | `flex flex-wrap gap-2` con `min-w-0` y `flex-1 basis-[calc(50%-0.25rem)] sm:basis-auto` |
| 4 | 820px (iPad Air) | Las 4 métricas quedan 2×2 con mucho aire lateral | Mantener `md:grid-cols-2 lg:grid-cols-4` pero subir el contenedor a `md:max-w-3xl` |
| 5 | ≥1440px | El título "Giancarlo Renato Palomino Huallpa" ocupa 2 líneas y la foto se ve desproporcionada | `clamp()` en el título (ver §5.1) y `xl:grid-cols-[minmax(0,380px)_1fr]` |
| 6 | Todos | El email largo `ing.palominoh@gmail.com` fuerza scroll horizontal en 360px | En móvil mostrar solo "Correo"; el email completo desde `sm:` |

---

## 4. Checklist de responsive (pasar en TODO ancho)

- [ ] **Sin scroll horizontal.** Verificar con `document.documentElement.scrollWidth > window.innerWidth`.
- [ ] Ningún texto se corta ni se desborda del contenedor.
- [ ] Área táctil mínima **44×44px** (iOS) y **48×48px** (Android) en botones y enlaces.
- [ ] Tamaño de fuente base **≥16px** en inputs: menos que eso hace que iOS haga zoom al enfocar.
- [ ] Imágenes con `width`/`height` o `aspect-ratio` para evitar **CLS**.
- [ ] Contraste mínimo 4.5:1 en texto normal y 3:1 en texto grande.
- [ ] Navegación por teclado con `:focus-visible` visible en todos los breakpoints.
- [ ] `prefers-reduced-motion` respetado (ya está en `global.css`).
- [ ] Probar en **horizontal**, no solo vertical (390×844 → 844×390).
- [ ] Probar con **zoom del navegador al 200%** (equivale a la mitad del ancho).
- [ ] Safe areas del notch y de la barra gestual cubiertas (ver §6).

---

## 5. Patrones y snippets

### 5.1 Tipografía fluida con `clamp()` — evita 8 breakpoints

```css
/* En @theme o en la clase del componente */
--text-hero: clamp(2rem, 1.2rem + 4vw, 4.5rem);      /* 32px → 72px */
--text-h2:   clamp(1.5rem, 1.1rem + 2vw, 2.5rem);    /* 24px → 40px */
--text-lead: clamp(1rem, 0.95rem + 0.4vw, 1.25rem);  /* 16px → 20px */
```

```html
<h1 class="text-[clamp(2rem,1.2rem+4vw,4.5rem)] leading-[1.05] text-balance">
  Giancarlo Renato Palomino Huallpa
</h1>
```

`text-balance` en títulos y `text-pretty` en párrafos evitan la línea huérfana.

### 5.2 Contenedor estándar del sitio

```html
<div class="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 3xl:max-w-[1400px]">
```

`px-4` (16px) es el mínimo cómodo en 360px. Nunca dejar contenido pegado al borde.

### 5.3 Grid que se acomoda solo (sin breakpoints)

```html
<!-- Métricas: 1 col en móvil, 2 en tablet, 4 en desktop, automático -->
<div class="grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr))]">
```

El `min(220px,100%)` es la clave: sin él, en 360px el grid desborda.

### 5.4 Hero de dos columnas correcto

```html
<section class="grid items-center gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-14">
  <img src="/foto.jpg" width="680" height="680"
       class="mx-auto aspect-square w-32 rounded-2xl object-cover object-top
              xs:w-40 sm:w-52 lg:mx-0 lg:w-full" />
  <div class="min-w-0"> ... </div>
</section>
```

**`min-w-0` es obligatorio** en hijos de grid/flex: sin él, un texto largo revienta la columna.

### 5.5 Botones que no se rompen

```html
<div class="flex flex-wrap gap-2">
  <a class="inline-flex min-h-11 flex-1 basis-[calc(50%-0.25rem)] items-center justify-center
            gap-2 whitespace-nowrap rounded-full px-4 text-sm sm:flex-none sm:basis-auto">
    <span class="sm:hidden">Correo</span>
    <span class="hidden sm:inline">ing.palominoh@gmail.com</span>
  </a>
</div>
```

### 5.6 Alturas: nunca `100vh` a secas

```css
/* vh en móvil incluye la barra del navegador, así que salta al hacer scroll */
.hero { min-height: 100vh; min-height: 100svh; }
```

En laptops de 1366×768 usar `min-h-[max(560px,80svh)]` para que el hero no empuje todo fuera de pantalla.

### 5.7 Imágenes responsivas en Astro

```astro
---
import { Image } from 'astro:assets';
import foto from '../assets/foto.jpg';
---
<Image src={foto} alt="Giancarlo Palomino"
       widths={[320, 480, 720, 1080]}
       sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 340px"
       format="webp" quality={82} loading="eager" fetchpriority="high" />
```

Todo lo que esté bajo el pliegue: `loading="lazy" decoding="async"`.

---

## 6. Safe areas (notch, Dynamic Island, barra gestual)

```html
<!-- Requisito: en el <head> del layout -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```

```css
header  { padding-top: max(1rem, env(safe-area-inset-top)); }
footer  { padding-bottom: max(1.5rem, env(safe-area-inset-bottom)); }
.full-w { padding-inline: max(1rem, env(safe-area-inset-left), env(safe-area-inset-right)); }
```

Sin `viewport-fit=cover` las variables `env()` valen 0 y no pasa nada.

---

## 7. Cómo probar

### 7.1 Chrome DevTools (rápido)

`F12` → `Ctrl+Shift+M` → probar en este orden: **360 → 390 → 430 → 768 → 820 → 1366 → 1440 → 1920**.
Después arrastrar lentamente la barra de "responsive" de 320 a 1920 y mirar dónde se rompe.

### 7.2 Detector de desbordamiento (pegar en la consola)

```js
[...document.querySelectorAll('*')].filter(el =>
  el.getBoundingClientRect().right > document.documentElement.clientWidth + 1
).forEach(el => { el.style.outline = '2px solid red'; console.log(el); });
```

### 7.3 Script de capturas con Playwright

Guardar como `scripts/capturas-responsive.mjs` y correr `node scripts/capturas-responsive.mjs`
(con `npm run dev` levantado):

```js
import { chromium } from 'playwright';

const OBJETIVOS = [
  { nombre: 'movil-360',   ancho: 360,  alto: 800,  dpr: 3 },
  { nombre: 'iphone-se',   ancho: 375,  alto: 667,  dpr: 2 },
  { nombre: 'iphone-15',   ancho: 393,  alto: 852,  dpr: 3 },
  { nombre: 'pixel-7',     ancho: 412,  alto: 915,  dpr: 2.625 },
  { nombre: 'iphone-max',  ancho: 430,  alto: 932,  dpr: 3 },
  { nombre: 'ipad-mini',   ancho: 744,  alto: 1133, dpr: 2 },
  { nombre: 'ipad-air',    ancho: 820,  alto: 1180, dpr: 2 },
  { nombre: 'laptop-1366', ancho: 1366, alto: 625,  dpr: 1 },
  { nombre: 'macbook-air', ancho: 1440, alto: 900,  dpr: 2 },
  { nombre: 'win-1536',    ancho: 1536, alto: 864,  dpr: 1 },
  { nombre: 'fhd-1920',    ancho: 1920, alto: 1080, dpr: 1 },
];

const RUTAS = ['/', '/trayectoria/', '/girek-study/', '/notas/', '/portafolio/'];
const BASE = process.env.BASE ?? 'http://localhost:4321';

const navegador = await chromium.launch();
let fallos = 0;

for (const d of OBJETIVOS) {
  const ctx = await navegador.newContext({
    viewport: { width: d.ancho, height: d.alto },
    deviceScaleFactor: d.dpr,
    isMobile: d.ancho < 768,
    hasTouch: d.ancho < 1024,
  });
  const page = await ctx.newPage();

  for (const ruta of RUTAS) {
    await page.goto(BASE + ruta, { waitUntil: 'networkidle' });

    const desborde = await page.evaluate(() =>
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    if (desborde > 0) {
      fallos++;
      console.warn(`DESBORDE ${desborde}px → ${d.nombre} ${ruta}`);
    }

    const slug = ruta.replace(/\//g, '_') || '_home';
    await page.screenshot({ path: `salidas/responsive/${d.nombre}${slug}.png`, fullPage: true });
  }
  await ctx.close();
}

await navegador.close();
console.log(fallos === 0 ? 'Sin desbordes → salidas/responsive/' : `${fallos} desbordes detectados`);
process.exit(fallos === 0 ? 0 : 1);
```

### 7.4 Lighthouse

```bash
npx lighthouse http://localhost:4321/trayectoria/ --view              # móvil (por defecto)
npx lighthouse http://localhost:4321/trayectoria/ --preset=desktop --view
```

Objetivos: LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

## 8. Errores que rompen el responsive

| Error | Por qué rompe | Reemplazo |
|---|---|---|
| `width: 400px` fijo | Desborda en 360px | `max-w-[400px] w-full` |
| `100vw` | Incluye el ancho de la scrollbar y genera scroll horizontal en desktop | `100%` o `100dvw` |
| `100vh` en móvil | La barra del navegador lo cambia al hacer scroll | `100svh` o `100dvh` |
| `white-space: nowrap` en texto largo | Desborda | `text-balance` o quitarlo |
| Falta `min-w-0` en hijo de flex/grid | El contenido largo estira la columna | Añadir `min-w-0` |
| `position: absolute` para maquetar | Se descuadra a otro ancho | Grid o Flex |
| `overflow-x: hidden` en `body` como parche | Esconde el bug, no lo arregla | Encontrar el elemento con §7.2 |
| Tabla sin envoltorio | Desborda en móvil | `<div class="overflow-x-auto">` |
| `font-size: 14px` en `<input>` | iOS hace zoom al enfocar | `text-base` (16px) |
| Media query `max-width` mezclada con Tailwind | Orden de cascada impredecible | Solo `min-width` (prefijos de Tailwind) |

---

## 9. Orden de trabajo sugerido

1. Arreglar los 6 puntos de §3 en `/trayectoria/`.
2. Correr §7.3 y verificar que no reporte ningún `DESBORDE`.
3. Repetir el barrido en `/`, `/girek-study/`, `/notas/` y `/portafolio/`.
4. Aplicar `clamp()` a los títulos de todas las páginas para no depender de breakpoints.
5. Lighthouse móvil ≥ 95 en Performance y Accessibility.

---

_Última actualización: 2026-09-08_
