---
titulo: Documenté mis propias pruebas y encontré seis defectos en ellas
resumen: >-
  Escribir qué decidí probar y por qué no era un trámite. Destapó seis fallos en
  mis scripts de carga, y los seis producían informes verdes.
fecha: 2026-11-01
etiquetas: [QA, k6, Portafolio, Rendimiento]
portada: confianza
codigo:
  repo: k6-performance-suite
  titulo: Los seis hallazgos, con el antes y el después
  archivos:
    - ruta: docs/05-hallazgos.md
      que: Los seis, con pasos, cifras medidas y qué los corrigió
    - ruta: lib/config.js
      que: La traducción de peticiones por hora que redondeaba a cero
    - ruta: iniciativas/002-estres-de-agenda/src/tests/estres-agenda.k6.js
      que: La rampa que ahora llega a donde duele, con el cálculo escrito
    - ruta: scripts/correr.sh
      que: La protección contra CRLF que el README prometía y no existía
---

Hay un texto que circula por LinkedIn cada pocas semanas y que dice algo con lo que estoy
de acuerdo: un portafolio de QA no debería ser una colección de scripts. Debería enseñar
qué funcionalidades se probaron, qué casos se diseñaron, qué riesgos se identificaron y,
sobre todo, **por qué** se tomaron esas decisiones.

Me lo tomé en serio. Cogí mis tres repositorios públicos de automatización —web, móvil y
rendimiento— y me senté a escribir, para cada uno, los cinco documentos que normalmente
viven en la cabeza de quien hizo la suite: análisis funcional, diseño de casos, matriz de
trazabilidad, análisis de riesgos y hallazgos.

Esperaba que fuera un trabajo de redacción. Fue otra cosa.

## En los dos primeros, los defectos estaban en la aplicación

El de web tiene una app de ejemplo propia. Veinte minutos de exploración sobre ella, de la
mano de Playwright, probando lo que ningún escenario probaba.

```figura
{
  "tipo": "comparar",
  "titulo": "Lo mismo, el mismo día",
  "izq": {
    "rotulo": "La suite",
    "lineas": [
      "9 escenarios, 43 pasos",
      "Chromium, Firefox y WebKit",
      "8,3 segundos",
      "**Todo en verde**"
    ]
  },
  "der": {
    "rotulo": "La exploración",
    "lineas": [
      "20 minutos, una persona",
      "Ningún escenario nuevo",
      "**8 defectos**",
      "Ninguno lo detecta la suite"
    ],
    "tono": "alarma"
  },
  "pie": "El peor: un título de 500 caracteres desborda la página 4400 píxeles. El pie, el contador y el botón de salir se van fuera de la pantalla."
}
```

En el de móvil, nueve hallazgos sobre un emulador Android, volcando el árbol de vistas en
cada paso. Cuatro de ellos ni siquiera son defectos del producto: son decisiones suyas que
encarecen las pruebas. Los mensajes de error no tienen identificador ni descripción, así
que **la única forma de localizarlos es su texto literal en inglés**. El día que esa app se
traduzca, cualquier aserción sobre una validación se cae, y se cae por un motivo que no
tiene nada que ver con el defecto que buscaba.

Hasta aquí, la conclusión es la de siempre y no sorprende a nadie: una suite en verde no
dice que el producto esté bien. Dice que **lo que alguien decidió comprobar, se comprueba**.
Todo el valor está en esa decisión, y esa decisión no se ve en el código.

## En el tercero, los defectos estaban en mí

El repositorio de pruebas de carga con k6 lleva meses publicado. Corre en CI. Tiene umbrales
que hacen fallar la corrida. Y al escribir el documento donde había que explicar **de dónde
sale cada número**, empezaron a aparecer cosas.

La primera fue tonta. Estaba mirando la salida de una corrida y leí esto:

```
sostenida ✓ [ 100% ]  30s  1.00 iters/s
pico      ✓ [ 100% ]  15s  1.00 iters/s
```

El mismo número en los dos. El escenario de pico, que existe precisamente para aplicar más
carga que el sostenido, estaba aplicando exactamente la misma.

La causa era una línea que yo había escrito con toda la convicción del mundo:

```js
export function porSegundo(porHora) {
  return Math.max(1, Math.round(porHora / 3600));
}
```

`rate` tiene que ser un entero. Mil peticiones por hora entre 3600 da 0,27, que redondea a
cero, y ese `Math.max(1, …)` lo sube a **una por segundo, o sea 3600 por hora**. Mil
trescientas también. Las dos acababan en el mismo sitio.

```figura
{
  "tipo": "barras",
  "titulo": "Carga declarada frente a carga aplicada",
  "barras": [
    { "que": "1000/h (sostenida)", "valor": 3.6, "etiqueta": "×3,6" },
    { "que": "1300/h (pico)", "valor": 2.8, "etiqueta": "×2,8" },
    { "que": "120/h (API de un tercero)", "valor": 30, "etiqueta": "×30", "tono": "alarma" }
  ],
  "pie": "La última es la que peor me sentó: el archivo de configuración decía «subir la tasa contra un servicio ajeno no mide mejor, solo molesta», y el código mandaba treinta veces lo prometido."
}
```

Tirando de ese hilo salieron cinco más. Los enumero porque la lista en sí no es lo
interesante —es lo que tienen en común—:

| | Lo que decía el informe | Lo que pasaba |
| --- | --- | --- |
| **1** | `p(95) = 100 ms` | Calculado sobre **46 peticiones**. Con una muestra decente: 375 ms |
| **2** | `http_req_failed: 0.00 %` en la prueba de estrés | La rampa llegaba a 80 pet/s y el servicio **satura en 320** |
| **3** | Código de salida 0, CI en verde | Con un `✗` en pantalla que **ningún umbral vigilaba** |
| **4** | «El script quita los retornos de carro» | No los quitaba. Nunca se había ejercitado |

## Lo que los seis tienen en común

**Ninguno se manifestaba como un error.** Los seis producían corridas verdes con números
razonables. Esa es la forma más cara que tiene un defecto de esconderse.

Y tres de ellos —el redondeo, la muestra corta y los descartes sin umbral— empujaban el
resultado en la misma dirección: **hacia el optimismo**. El informe salía mejor que la
realidad.

Esto no es un detalle. En una prueba funcional, un defecto en la prueba produce
normalmente un falso negativo: algo falla que no debería, alguien lo investiga y se
descubre. En una prueba de rendimiento produce otra cosa:

> Un PDF con un veredicto favorable, que se adjunta a un correo y se usa para decidir una
> salida a producción.

Nadie investiga un informe que dice que todo va bien.

## El que más me enseñó

De los seis, el que me dejó pensando es el de la prueba de estrés, porque **se podía haber
sabido antes de correrla**.

La API de ejemplo del repositorio se degrada por encima de 25 peticiones en vuelo. Mi rampa
subía hasta 80 peticiones por segundo. Y hay una relación de hace sesenta años, la ley de
Little, que dice que las peticiones en vuelo son la tasa por la latencia:

```
80 pet/s × 0,08 s = 6,4 peticiones en vuelo
```

Seis coma cuatro. La cuarta parte de lo que hacía falta para que el servicio ni se
inmutara. La prueba corría setenta segundos, salía con 0 % de fallos y un percentil 95 de
94 milisegundos, y concluía que el servicio aguantaba **sin haberlo llegado a tocar**.

Despejando: para rozar esas 25 en vuelo hacen falta 25 ÷ 0,08 = **312 peticiones por
segundo**.

Después lo medí por escalones, y la rodilla apareció en 300. Doce milisegundos entre la
cuenta y el cronómetro. Pero hay un dato mejor en esa tabla:

| Tasa ofrecida | Caudal real | Mediana |
| ---: | ---: | ---: |
| 200/s | 200/s | 63 ms |
| 300/s | 293/s | 103 ms |
| 400/s | **320/s** | 1,78 s |
| 500/s | **321/s** | 2,43 s |

A 400 y a 500 el caudal es el mismo. **Subir la carga por encima del punto de saturación no
produce más trabajo hecho: produce más cola.** Ese es el número que uno se lleva de una
prueba de estrés —«satura en 320»— y no un «aguanta bastante».

Y una cosa más, que es la que de verdad cambia cómo miro un informe: con el servicio
saturado, ocho veces más lento que en reposo, **`http_req_failed` seguía en 0,00 %**. No se
caía. Se ponía lento y encolaba. Una prueba de estrés cuyo criterio sea la tasa de error
habría firmado que todo iba bien.

## La pregunta que me llevo

Antes de esto, mi reflejo ante una corrida verde era darla por buena. Ahora hago otra
pregunta primero, y me la hago especialmente cuando el resultado es bueno:

> ¿Esta prueba habría sido capaz de detectar el problema que estoy afirmando que no existe?

En mi prueba de estrés, la respuesta medida era **no**. Y solo apareció porque alguien
—yo, obligado por un documento— tuvo que escribir de dónde salía cada número.

Esa es la parte que no esperaba. Pensaba que documentar el trabajo de calidad servía para
que otro entendiera mis decisiones. Sirve para eso. Pero sobre todo sirve para **obligarme
a defenderlas**, y seis de ellas no aguantaron la pregunta.

Los seis están corregidos, cada uno dice con qué, y el registro de hallazgos está publicado
en el repositorio. Me pareció más útil dejarlo escrito que borrarlo y presumir de que nunca
pasó.
