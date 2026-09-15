// Verificación de responsive. Falla con código 1 si algo se movió.
//
//   npm run build && npx http-server dist -p 4474 -s &
//   node scripts/verificar-responsive.mjs
//   BASE=https://girek-study.com node scripts/verificar-responsive.mjs
//   HILOS=2 node scripts/verificar-responsive.mjs   (si la máquina va justa)
//
// La matriz sale de docs/DISPOSITIVOS_Y_RESPONSIVE.md del repo del sistema.
// Cada objetivo aparece dos veces cuando importa: con la barra del navegador
// visible y sin ella. En Android esa barra se lleva ~135px y `vh` no lo
// refleja —devuelve la ventana grande—, así que el contenido tiene que caber
// en la medida corta o las últimas filas se ven cortadas.
//
// Los objetivos se reparten entre varias pestañas a la vez. En serie tardaba
// doce minutos y nadie espera doce minutos por una comprobación, así que se
// dejaba de correr, que es la peor forma de tener una guardia.

import { chromium } from 'playwright';

const BASE = process.env.BASE ?? 'http://localhost:4474';
const HILOS = Number(process.env.HILOS ?? 4);

/* `gestos: true` marca los objetivos donde se prueba el salto por rueda. No
 * hace falta en los veinte: lo que decide el comportamiento del scroll no es
 * el ancho exacto, sino si el sector cabe o no en la ventana. Con un teléfono
 * bajo, uno alto, una tablet y dos escritorios —uno de pantalla corta— quedan
 * cubiertos los dos casos y sus fronteras. */
const OBJETIVOS = [
  { nombre: 'Fold cerrado', ancho: 344, alto: 882, dpr: 3.5 },
  { nombre: 'Galaxy S8/A (piso)', ancho: 360, alto: 740, dpr: 3, gestos: true },
  { nombre: 'Galaxy S21-23', ancho: 360, alto: 800, dpr: 3 },
  { nombre: 'iPhone SE', ancho: 375, alto: 667, dpr: 2, gestos: true },
  { nombre: 'iPhone 13/14/15', ancho: 390, alto: 844, dpr: 3 },
  { nombre: 'iPhone 14 Pro', ancho: 393, alto: 852, dpr: 3, gestos: true },
  { nombre: 'Galaxy Ultra con barra', ancho: 412, alto: 780, dpr: 3.5 },
  { nombre: 'Galaxy Ultra sin barra', ancho: 412, alto: 915, dpr: 3.5 },
  { nombre: 'iPhone Pro Max', ancho: 430, alto: 932, dpr: 3 },
  { nombre: 'Pixel 7 Pro', ancho: 480, alto: 1040, dpr: 3.5 },
  { nombre: 'Fold abierto', ancho: 673, alto: 841, dpr: 2.6 },
  { nombre: 'iPad Mini 6', ancho: 744, alto: 1133, dpr: 2 },
  { nombre: 'iPad 10.2', ancho: 810, alto: 1080, dpr: 2 },
  { nombre: 'iPad Air 5', ancho: 820, alto: 1180, dpr: 2, gestos: true },
  { nombre: 'iPad Pro 12.9', ancho: 1024, alto: 1366, dpr: 2 },
  { nombre: 'Laptop 1366', ancho: 1366, alto: 625, dpr: 1, gestos: true },
  { nombre: 'MacBook Air 13', ancho: 1440, alto: 900, dpr: 2, gestos: true },
  { nombre: 'Win 1920 a 125%', ancho: 1536, alto: 864, dpr: 1 },
  { nombre: 'Full HD', ancho: 1920, alto: 1080, dpr: 1 },
  { nombre: 'QHD', ancho: 2560, alto: 1440, dpr: 1 },
];

// Las notas van una por una: su cuerpo lleva diagramas, tablas y bloques de
// código, que es justo lo que desborda en un teléfono estrecho.
const RUTAS = [
  '/',
  '/trayectoria/',
  '/girek-study/',
  '/notas/',
  '/portafolio/',
  '/notas/cuando-screenplay-no-vale-la-pena/',
  '/notas/migrar-xml-a-json-el-contrato-cambia/',
  '/notas/suite-sin-sitios-de-terceros/',
];

/** Deja la página quieta para medir: sin animaciones, revelada y con su
 * tipografía ya aplicada.
 *
 * Sin congelar las transiciones, medir es una carrera: cada bloque revelado
 * entra con su propio retardo, así que mientras la animación corre sus
 * posiciones difieren de verdad y la comprobación falla en un objetivo
 * distinto en cada pasada. */
async function preparar(pagina, { revelar = true } = {}) {
  await pagina.addStyleTag({
    content: `*, *::before, *::after {
      transition: none !important;
      animation: none !important;
      scroll-behavior: auto !important;
    }`,
  });

  if (revelar) {
    await pagina.evaluate(() =>
      document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible')),
    );
  }

  // `document.fonts.ready` resuelve cuando ya no queda ninguna fuente por
  // aplicar. Sin esto se mide con la de respaldo y las alturas bailan.
  await pagina.evaluate(() => document.fonts.ready);
  await pagina.waitForTimeout(150);
}

/** Revisa un objetivo entero y devuelve sus fallos. */
async function revisar(navegador, d) {
  const fallos = [];
  const ctx = await navegador.newContext({
    viewport: { width: d.ancho, height: d.alto },
    deviceScaleFactor: d.dpr,
    isMobile: d.ancho < 768,
    hasTouch: d.ancho < 1024,
  });
  const pagina = await ctx.newPage();

  try {
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
    await preparar(pagina);

    const encabezado = await pagina.evaluate(() => {
      const dl = document.querySelector('.perfil dl');
      const y = [...dl.querySelectorAll(':scope > div dd')].map(
        (e) => e.getBoundingClientRect().top,
      );
      return {
        alto: Math.round(dl.getBoundingClientRect().bottom + window.scrollY),
        ventana: window.innerHeight,
        cifras: dl.children.length,
        alineadas: Math.abs(y[0] - y[1]) <= 1 && Math.abs(y[2] - y[3]) <= 1,
      };
    });

    if (encabezado.alto > encabezado.ventana + 1) {
      fallos.push(
        `${d.nombre} · el encabezado mide ${encabezado.alto} y la pantalla ${encabezado.ventana}`,
      );
    }
    if (encabezado.cifras !== 4) fallos.push(`${d.nombre} · faltan cifras (${encabezado.cifras}/4)`);
    if (!encabezado.alineadas) fallos.push(`${d.nombre} · las cifras no alinean entre sí`);

    // 3. Ningún sector mide menos que la pantalla: si mide menos, el siguiente
    //    se asoma por abajo y se ven dos a la vez.
    const cortos = await pagina.evaluate(() => {
      const ventana = window.innerHeight;
      return [...document.querySelectorAll('.sector')]
        .map((s, i) => ({ i, alto: Math.round(s.getBoundingClientRect().height) }))
        .filter((s) => s.alto < ventana - 1);
    });
    for (const s of cortos) {
      fallos.push(`${d.nombre} · el sector ${s.i + 1} mide ${s.alto} y la pantalla ${d.alto}`);
    }

    if (d.gestos) {
      // 3b. Volver desde el final para en Formación y no se salta la parada.
      //     El bloque de cierre es más bajo que la ventana, así que su tope
      //     queda por encima del scroll máximo: si la cuenta del sector actual
      //     no lo contempla, el gesto hacia atrás retrocede dos de golpe.
      await pagina.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await pagina.waitForTimeout(500);
      await pagina.mouse.move(d.ancho / 2, d.alto / 2);

      // En pantallas estrechas el cierre es más alto que la ventana, así que el
      // primer gesto retrocede dentro de él: hacen falta varios para llegar.
      const paradas = [];
      for (let n = 0; n < 4; n++) {
        await pagina.mouse.wheel(0, -200);
        await pagina.waitForTimeout(1000);
        paradas.push(await pagina.evaluate(() => Math.round(window.scrollY)));
      }

      const formacion = await pagina.evaluate(() => {
        const s = document.getElementById('formacion');
        const caja = s.getBoundingClientRect();
        const tope = Math.round(caja.top + window.scrollY);
        // Un sector más alto que la ventana se puede leer por dentro: cualquier
        // altura entre su tope y su final cuenta como estar en él.
        return { tope, fondo: tope + Math.max(Math.round(caja.height) - window.innerHeight, 0) };
      });

      const paro = paradas.some((y) => y >= formacion.tope - 4 && y <= formacion.fondo + 4);
      if (!paro) {
        fallos.push(
          `${d.nombre} · volver desde el cierre no para en Formación (${formacion.tope}-${formacion.fondo}); pasó por ${paradas.join(', ')}`,
        );
      }

      // 3bis. Una ráfaga de rueda —la que da un trackpad— deja el scroll en una
      //       posición válida: el tope de una parada, una pantalla dentro de una
      //       parada más alta que la ventana, o el fondo. Dejar pasar los gestos
      //       que llegaban durante un salto hacía que el navegador los aplicara
      //       encima de la animación y el scroll acababa entre dos sectores.
      const donde = await pagina.evaluate(() => {
        const tope = (el) => Math.round(el.getBoundingClientRect().top + window.scrollY);
        const anchoDeSobra = window.matchMedia('(min-width: 44rem)').matches;
        const lista = [
          document.querySelector('.perfil'),
          ...document.querySelectorAll('.sector'),
          document.getElementById('cierre'),
        ].filter(Boolean);

        if (!anchoDeSobra) {
          const partidos = new Set();
          document.querySelectorAll('.pantalla-movil').forEach((mitad) => {
            lista.push(mitad);
            const sector = mitad.closest('.sector');
            if (sector) partidos.add(sector);
          });
          partidos.forEach((sector) => {
            const i = lista.indexOf(sector);
            if (i !== -1) lista.splice(i, 1);
          });
        }

        return {
          maximo: document.documentElement.scrollHeight - window.innerHeight,
          ventana: window.innerHeight,
          paradas: lista
            .map((s) => ({ tope: tope(s), alto: Math.round(s.getBoundingClientRect().height) }))
            .sort((a, b) => a.tope - b.tope),
        };
      });

      await pagina.evaluate(() => window.scrollTo(0, 0));
      await pagina.waitForTimeout(300);
      await pagina.mouse.move(d.ancho / 2, d.alto / 2);

      for (let ronda = 0; ronda < 3; ronda++) {
        for (let golpe = 0; golpe < 5; golpe++) {
          await pagina.mouse.wheel(0, 60);
          await pagina.waitForTimeout(45);
        }
        await pagina.waitForTimeout(1300);

        const y = await pagina.evaluate(() => Math.round(window.scrollY));
        const valida =
          y >= donde.maximo - 2 ||
          donde.paradas.some(
            (s) => y >= s.tope - 2 && y <= s.tope + Math.max(s.alto - donde.ventana, 0) + 2,
          );

        if (!valida) {
          fallos.push(`${d.nombre} · la rueda en ráfaga deja el scroll a medias, en ${y}`);
          break;
        }
      }
    }

    // 3c. En la portada, cada sección llena la pantalla. El salto por gesto solo
    //     se siente bien si lo que aterriza no deja asomar a la siguiente. La
    //     última queda fuera: cierra con el pie a la vista, y llevarla a pantalla
    //     completa lo empujaría fuera.
    await pagina.goto(BASE + '/', { waitUntil: 'networkidle' });
    await pagina.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await pagina.waitForTimeout(400);
    await pagina.evaluate(() => window.scrollTo(0, 0));
    await preparar(pagina);

    const cortas = await pagina.evaluate(() => {
      const ventana = window.innerHeight;
      return [...document.querySelectorAll('.seccion:not(.cierre-inicio)')]
        .map((s, i) => ({ i, alto: Math.round(s.getBoundingClientRect().height) }))
        .filter((s) => s.alto < ventana - 1);
    });
    for (const s of cortas) {
      fallos.push(
        `${d.nombre} · portada: la sección ${s.i + 1} mide ${s.alto} y la pantalla ${d.alto}`,
      );
    }

    // 3d. La portada de Girek Study entra en una pantalla: es un plano oscuro
    //     que recorta lo que sobra, así que un desborde no se vería en el alto.
    await pagina.goto(BASE + '/girek-study/', { waitUntil: 'networkidle' });
    await preparar(pagina);

    const plano = await pagina.evaluate(() => {
      const s = document.querySelector('.portada-estudio');
      const panel = s?.querySelector('.panel-portada');
      if (!s || !panel) return null;
      const caja = s.getBoundingClientRect();
      const dentro = panel.getBoundingClientRect();
      return {
        sobresale: Math.round(
          Math.max(0, dentro.bottom - caja.bottom) + Math.max(0, caja.top - dentro.top),
        ),
      };
    });
    if (plano && plano.sobresale > 1) {
      fallos.push(`${d.nombre} · girek-study: el plano se sale ${plano.sobresale}px del sector`);
    }

    await pagina.goto(BASE + '/trayectoria/', { waitUntil: 'networkidle' });
    await preparar(pagina);

    // 4. Las tres decisiones nunca dejan una sola colgando con hueco al lado.
    const decisiones = await pagina.evaluate(() => {
      const ul = document.querySelector('#decisiones ul');
      const columnas = getComputedStyle(ul).gridTemplateColumns.split(' ').length;
      const filas = new Set([...ul.children].map((c) => Math.round(c.getBoundingClientRect().top)))
        .size;
      return { columnas, filas };
    });
    if (decisiones.columnas * decisiones.filas !== 3) {
      fallos.push(
        `${d.nombre} · decisiones en ${decisiones.columnas}x${decisiones.filas}, deja hueco`,
      );
    }
  } finally {
    await ctx.close();
  }

  return fallos;
}

const arranque = Date.now();
const navegador = await chromium.launch();
const fallos = [];

// Cola repartida entre HILOS pestañas: cada una coge el siguiente objetivo
// libre en cuanto termina el suyo, así ninguna espera a las demás.
const cola = [...OBJETIVOS];
await Promise.all(
  Array.from({ length: Math.min(HILOS, cola.length) }, async () => {
    for (;;) {
      const d = cola.shift();
      if (!d) return;
      fallos.push(...(await revisar(navegador, d)));
    }
  }),
);

await navegador.close();

const minutos = ((Date.now() - arranque) / 60000).toFixed(1);

if (fallos.length) {
  console.error(`\n${fallos.length} fallo(s):\n` + fallos.map((f) => '  · ' + f).join('\n'));
  process.exit(1);
}

console.log(
  `Sin fallos · ${OBJETIVOS.length} objetivos x ${RUTAS.length} rutas · ${minutos} min con ${HILOS} en paralelo`,
);
