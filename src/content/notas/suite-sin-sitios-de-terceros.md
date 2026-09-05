---
titulo: Tu suite no debería depender de un sitio que no controlas
resumen: >-
  El CI en rojo un lunes por la mañana no siempre es culpa del código. A veces es
  culpa de la página de demo contra la que estás probando.
fecha: 2026-09-05
etiquetas: [Playwright, CI/CD, Flakiness]
---

Hay una escena que se repite en casi todos los equipos donde he trabajado. Alguien abre el
canal a las nueve de la mañana y escribe: *"el pipeline está rojo"*. Media hora después,
tras revisar tres capturas y un log de doscientas líneas, aparece la conclusión: no había
ningún defecto. El sitio contra el que se ejecutaban las pruebas se había caído.

Nadie tocó nada. Nadie rompió nada. Y aun así el equipo perdió media mañana.

## El problema no es la caída, es lo que enseña

Una suite que falla por causas ajenas al código está enseñando algo peligrosísimo: **que
sus fallos no son de fiar**.

La primera vez que pasa, el equipo investiga. La tercera, alguien reejecuta antes de mirar.
A la décima, el rojo dejó de significar nada y las pruebas se volvieron un trámite: se
mira si pasó, y si no pasó se corre otra vez. En ese punto la suite ya no protege
producción, solo consume tiempo de CI.

Lo he visto degradarse así en cuestión de semanas, y casi nunca por un mal diseño de las
pruebas. Basta con un rate limit, un cambio de DOM que no anunciaron o un servidor gratuito
que se duerme.

## La regla

Una prueba automatizada solo debería poder fallar por dos motivos: **el código cambió**, o
**la prueba está mal escrita**. Cualquier tercer motivo es ruido, y el ruido se paga con la
confianza del equipo.

Un sitio de demo público es un tercer motivo permanente. No lo controlas, no te avisa
cuando cambia, y su disponibilidad no es tu problema hasta que rompe tu pipeline.

## Qué hice en el repo

Cuando publiqué mi implementación del patrón Screenplay quise que cualquiera pudiera
clonarla y ver la suite en verde en el primer intento, sin cuentas, sin credenciales y sin
depender de nada externo. Así que **la aplicación de ejemplo vive dentro del repositorio**.

Es una página en HTML plano —un login y una lista de tareas— servida por un estático de
Node de unas cuarenta líneas, sin una sola dependencia. Playwright la levanta antes de las
pruebas y la baja al terminar:

```ts
webServer: {
  command: 'node scripts/serve-demo.js',
  url: `http://localhost:${PUERTO}`,
  reuseExistingServer: !enCI,
  timeout: 30_000,
},
```

Eso es todo. No hay que arrancar nada a mano, ni documentar un paso previo que la mitad de
la gente se va a saltar.

El resultado es una suite **hermética**: corre igual hoy, en la máquina de otra persona y
dentro de tres años. Si algún día se pone roja, es porque alguien rompió algo de verdad.

## El detalle que más me gusta

La app de ejemplo tiene un retardo artificial de 250 milisegundos al agregar una tarea:

```js
// Retardo artificial al agregar una tarea. Está aquí para que el framework
// tenga que lidiar con UI asíncrona de verdad: si la suite pasa con esto,
// no depende de sleeps.
const RETARDO_MS = 250;
```

No está por realismo. Está para **que la suite tenga que ganárselo**.

Una aplicación de demo que responde instantáneamente deja pasar los peores hábitos: esperas
fijas, aserciones sin reintento, pruebas que funcionan en tu portátil y fallan en un
contenedor con la mitad de CPU. Con ese cuarto de segundo de por medio, cualquier atajo se
cae en el acto y el problema aparece cuando todavía es barato arreglarlo.

Es la misma idea que meter un test de carga en el pipeline: no esperas a que producción te
enseñe dónde está el límite.

## Y si ya dependes de uno

No hace falta rehacer nada de golpe. Por orden de esfuerzo:

1. **Intercepta la red.** `page.route()` en Playwright, o el equivalente en tu herramienta,
   te deja devolver respuestas fijas sin tocar los tests. Es una tarde de trabajo y elimina
   la mayoría de los fallos ajenos.
2. **Levanta el servicio en un contenedor** dentro del pipeline. Si la aplicación bajo
   prueba es tuya, esto además te da control sobre los datos de partida.
3. **Reserva las pruebas contra el entorno real** para un puñado de casos de humo, en un
   job aparte, que pueda fallar sin bloquear el merge. Sigues teniendo la señal, pero deja
   de detener al equipo.

Lo importante no es cuál elijas. Es que el rojo vuelva a significar algo.

---

El repositorio completo, con el framework y la app de ejemplo, está en
[playwright-screenplay-ts](https://github.com/Girek-Study/playwright-screenplay-ts). Es MIT:
clónalo y quédate con lo que te sirva.
