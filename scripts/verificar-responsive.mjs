// Verificación de responsive. Falla con código 1 si algo se movió.
//
//   npm run build && npx http-server dist -p 4474 -s &
//   node scripts/verificar-responsive.mjs
//   BASE=https://girek-study.com node scripts/verificar-responsive.mjs
//
// La matriz sale de docs/DISPOSITIVOS_Y_RESPONSIVE.md del repo del sistema.
// Cada objetivo aparece dos veces cuando importa: con la barra del navegador
// visible y sin ella. En Android esa barra se lleva ~135px y `vh` no lo
// refleja —devuelve la ventana grande—, así que el contenido tiene que caber
// en la medida corta o las últimas filas se ven cortadas.

import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4474';

const OBJETIVOS = [
  { nombre: 'Fold cerrado', ancho: 344, alto: 882, dpr: 3.5 },
  { nombre: 'Galaxy S8/A (piso)', ancho: 360, alto: 740, dpr: 3 },
  { nombre: 'Galaxy S21-23', ancho: 360, alto: 800, dpr: 3 },
  { nombre: 'iPhone SE', ancho: 375, alto: 667, dpr: 2 },
  { nombre: 'iPhone 13/14/15', ancho: 390, alto: 844, dpr: 3 },
  { nombre: 'iPhone 14 Pro', ancho: 393, alto: 852, dpr: 3 },
  { nombre: 'Galaxy Ultra con barra', ancho: 412, alto: 780, dpr: 3.5 },
  { nombre: 'Galaxy Ultra sin barra', ancho: 412, alto: 915, dpr: 3.5 },
  { nombre: 'iPhone Pro Max', ancho: 430, alto: 932, dpr: 3 },
  { nombre: 'Pixel 7 Pro', ancho: 480, alto: 1040, dpr: 3.5 },
  { nombre: 'Fold abierto', ancho: 673, alto: 841, dpr: 2.6 },
  { nombre: 'iPad Mini 6', ancho: 744, alto: 1133, dpr: 2 },
  { nombre: 'iPad 10.2', ancho: 810, alto: 1080, dpr: 2 },
  { nombre: 'iPad Air 5', ancho: 820, alto: 1180, dpr: 2 },
  { nombre: 'iPad Pro 12.9', ancho: 1024, alto: 1366, dpr: 2 },
  { nombre: 'Laptop 1366', ancho: 1366, alto: 625, dpr: 1 },
  { nombre: 'MacBook Air 13', ancho: 1440, alto: 900, dpr: 2 },
  { nombre: 'Win 1920 a 125%', ancho: 1536, alto: 864, dpr: 1 },
  { nombre: 'Full HD', ancho: 1920, alto: 1080, dpr: 1 },
  { nombre: 'QHD', ancho: 2560, alto: 1440, dpr: 1 },
];

const RUTAS = ['/', '/trayectoria/', '/girek-study/', '/notas/', '/portafolio/'];

const fallos = [];

const navegador = await chromium.launch();

for (const d of OBJETIVOS) {
  const ctx = await navegador.newContext({
    viewport: { width: d.ancho, height: d.alto },
    deviceScaleFactor: d.dpr,
    isMobile: d.ancho < 768,
    hasTouch: d.ancho < 1024,
  });
  const pagina = await ctx.newPage();

  // 1. Sin scroll horizontal en ninguna ruta. Se mide DESPUÉS de recorrer la
  //    página entera: las imágenes en diferido cambian el ancho al cargarse.
  for (const ruta of RUTAS) {
    await pagina.goto(BASE + ruta, { waitUntil: 'networkidle' });
    await pagina.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await pagina.waitForTimeout(400);

    const desborde = await pagina.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (desborde > 0) fallos.push(`${d.nombre} · ${ruta} · desborda ${desborde}px`);
  }

  // 2. El encabezado de trayectoria cabe entero en una pantalla, con sus
  //    cuatro cifras, y las etiquetas de cada fila arrancan a la misma altura.
  await pagina.goto(BASE + '/trayectoria/', { waitUntil: 'networkidle' });
  await pagina.evaluate(() =>
    document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible')),
  );
  await pagina.waitForTimeout(400);

  const encabezado = await pagina.evaluate(() => {
    const dl = document.querySelector('.perfil dl');
    const y = [...dl.querySelectorAll(':scope > div dd')].map((e) =>
      Math.round(e.getBoundingClientRect().top),
    );
    return {
      alto: Math.round(dl.getBoundingClientRect().bottom + window.scrollY),
      ventana: window.innerHeight,
      cifras: dl.children.length,
      alineadas: y[0] === y[1] && y[2] === y[3],
    };
  });

  if (encabezado.alto > encabezado.ventana + 1) {
    fallos.push(
      `${d.nombre} · el encabezado mide ${encabezado.alto} y la pantalla ${encabezado.ventana}`,
    );
  }
  if (encabezado.cifras !== 4) fallos.push(`${d.nombre} · faltan cifras (${encabezado.cifras}/4)`);
  if (!encabezado.alineadas) fallos.push(`${d.nombre} · las cifras no alinean entre sí`);

  // 3. Las tres decisiones nunca dejan una sola colgando con hueco al lado.
  const decisiones = await pagina.evaluate(() => {
    const ul = document.querySelector('#decisiones ul');
    const columnas = getComputedStyle(ul).gridTemplateColumns.split(' ').length;
    const filas = new Set(
      [...ul.children].map((c) => Math.round(c.getBoundingClientRect().top)),
    ).size;
    return { columnas, filas };
  });
  if (decisiones.columnas * decisiones.filas !== 3) {
    fallos.push(
      `${d.nombre} · decisiones en ${decisiones.columnas}x${decisiones.filas}, deja hueco`,
    );
  }

  await ctx.close();
}

await navegador.close();

if (fallos.length) {
  console.error(`\n${fallos.length} fallo(s):\n` + fallos.map((f) => '  · ' + f).join('\n'));
  process.exit(1);
}

console.log(`Sin fallos · ${OBJETIVOS.length} objetivos x ${RUTAS.length} rutas`);
