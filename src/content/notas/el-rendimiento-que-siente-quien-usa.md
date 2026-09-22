---
titulo: El servidor responde en 200 ms y la página sigue pareciendo lenta
resumen: >-
  La prueba de carga mide el servidor. Lo que siente quien usa el producto se
  mide en el navegador, y son otras tres métricas.
fecha: 2026-09-20
etiquetas: [Rendimiento, Core Web Vitals, Automatización]
portada: vitals
---

Un equipo con el que trabajé tenía el rendimiento bajo control: la prueba de
carga en verde, el percentil 95 por debajo de 300 ms, ninguna alerta.

Y los usuarios seguían diciendo que la aplicación iba lenta.

No se contradecían. Estaban midiendo cosas distintas. La prueba de carga mide
**cuánto tarda el servidor en responder**; el usuario siente **cuánto tarda en
poder usar la pantalla**. Entre esas dos cosas caben varios segundos de
JavaScript, fuentes, imágenes y reflujo.

```figura
{ "tipo": "barras", "titulo": "El mismo instante, medido en dos sitios",
  "barras": [
    { "que": "servidor", "valor": 200, "etiqueta": "200 ms" },
    { "que": "usable", "valor": 3400, "etiqueta": "3,4 s", "tono": "alarma" }
  ],
  "pie": "Entre las dos caben el JavaScript, las fuentes y las imágenes. La prueba de carga solo ve la primera." }
```

## Las tres que miden lo que se siente

Google las agrupa como Core Web Vitals y, más allá de que afecten al
posicionamiento, describen bien las tres formas en que una página se siente
lenta.

**LCP — cuándo aparece lo importante.** El tiempo hasta que se pinta el
elemento más grande del área visible: normalmente la imagen principal o el
titular. No es «cuándo empieza a cargar», es cuándo el usuario ve algo que le
sirve.

**CLS — cuánto se mueve todo.** Si pulsas un botón y en ese momento carga un
banner que empuja el contenido, acabas pulsando otra cosa. Es la métrica más
ignorada y la que más enfada.

**INP — cuánto tarda en responderte.** Sustituyó a FID en 2024 y mide lo que
pasa entre que pulsas y la interfaz reacciona. Aquí es donde aparecen los
segundos que la prueba de carga no ve: el servidor contestó rápido, pero el
hilo principal estaba ocupado.

## Medirlas en el pipeline, no una vez al año

Lo mismo que con la carga: una auditoría manual con Lighthouse que se hace
cuando alguien se acuerda no sirve. Lo que funciona es tomarlas en cada
release y ponerles un umbral.

Se pueden leer desde la propia prueba, sin herramienta aparte:

```ts
test('la portada no empeora su LCP', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  const lcp = await page.evaluate(() => new Promise<number>((resolver) => {
    new PerformanceObserver((lista) => {
      const entradas = lista.getEntries();
      resolver(entradas[entradas.length - 1].startTime);
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  }));

  // El umbral sale de lo que hace hoy el sitio, no de la nada.
  expect(lcp).toBeLessThan(2500);
});
```

Un aviso sobre ese número: **2500 ms es el corte que Google llama "bueno"**,
no un objetivo que tu sitio tenga que cumplir el primer día. El umbral útil es
el de tu propio sitio hoy, con un poco de margen, para que la prueba proteja
que no empeore. Ese es el mismo criterio que uso con el percentil 95 en las
pruebas de carga.

## Laboratorio y campo miden cosas distintas

Esta distinción evita discusiones largas.

Lo que mides en el pipeline es **laboratorio**: una máquina limpia, red
estable, sin extensiones. Sirve para comparar una versión con otra, que es
justo lo que quieres en una puerta de calidad.

Lo que sienten tus usuarios es **campo**: su teléfono de hace cuatro años, su
conexión, sus veinte pestañas. Suele ser bastante peor, y solo se sabe
recogiéndolo de gente real.

Las dos hacen falta. El laboratorio te dice si esta versión empeoró; el campo
te dice si tu producto va lento de verdad.

```figura
{
  "tipo": "comparar",
  "titulo": "Dos medidas que no se sustituyen",
  "izq": {
    "rotulo": "Laboratorio",
    "lineas": [
      "Máquina limpia, red estable",
      "Compara una versión con otra"
    ],
    "pie": "lo que pones en la puerta de calidad"
  },
  "der": {
    "rotulo": "Campo",
    "lineas": [
      "Su teléfono de hace cuatro años",
      "Dice si tu producto *va lento de verdad*"
    ],
    "pie": "solo se sabe recogiéndolo de gente real"
  }
}
```

## Lo que suele salir cuando miras

Casi siempre las mismas cuatro cosas, y ninguna es exótica:

**Imágenes sin dimensiones.** Sin `width` y `height`, el navegador no reserva
el sitio y todo salta cuando cargan. Es la causa número uno de CLS y se
arregla con dos atributos.

**Fuentes que bloquean.** El texto no aparece hasta que descarga la fuente.
Un `font-display: swap` lo resuelve.

**JavaScript de más en el arranque.** Analítica, chat, mapas de calor, todo
cargando antes de que la página sea usable. Mucho de eso puede esperar.

**Una imagen principal enorme.** El LCP suele ser una foto de dos megas que
nadie optimizó.

---

Si tu prueba de carga está en verde y la gente dice que va lento, no es que la
gente exagere: es que mediste el lado del que no se quejan.
