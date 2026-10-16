---
titulo: Cómo trabajo con un agente de código sin que me meta deuda
resumen: >-
  El contexto que le das decide casi todo lo que recibes. Lo que hago antes de
  pedirle nada, cómo troceo el trabajo, qué miro al revisar y dónde le pongo
  el freno.
fecha: 2026-10-21
etiquetas: [IA, Productividad, Criterio]
portada: riendas
---

Uso agentes de código todos los días. No para experimentar: para trabajar.

Y he pasado por las tres fases por las que pasa todo el mundo. Primero el
asombro, luego la decepción cuando una tarea de verdad se tuerce, y por último
algo menos emocionante y mucho más útil: **un método**.

Esta nota es ese método. No va de qué herramienta uso —cambian cada seis
meses—, sino de lo que hago alrededor, que es lo que de verdad decide el
resultado.

## Lo que más cambia el resultado pasa antes de pedir nada

La primera lección me costó varias semanas: **la calidad de lo que recibo
depende mucho más de lo que preparo que de cómo redacto la petición.**

Todo el mundo optimiza la petición. Casi nadie prepara el terreno.

```figura
{ "tipo": "capas", "titulo": "Lo que le doy antes de pedirle nada",
  "capas": [
    { "n": "1", "que": "Un ejemplo del repositorio que ya haga algo parecido, y bien." },
    { "n": "2", "que": "El criterio de aceptación, con datos concretos y el caso de error." },
    { "n": "3", "que": "Los límites: qué ficheros puede tocar y cuáles no." },
    { "n": "4", "que": "Cómo se comprueba: el comando que tiene que pasar en verde." },
    { "n": "5", "que": "Lo que ya probé y no funcionó, si vengo de un intento fallido.", "tono": "clave" }
  ],
  "pie": "Sin el primero, te escribe el código a su manera. Sin el cuarto, no tiene forma de saber si acertó." }
```

El ejemplo del repositorio es el que más rinde de los cinco. Un agente sin
referencia escribe un código correcto y ajeno: otro estilo, otras
abstracciones, otra forma de manejar errores. Funciona, y al mes tienes dos
dialectos conviviendo. Con un ejemplo delante, imita; y aquí imitar es
exactamente lo que quiero.

## Tareas pequeñas, y con una forma concreta

La segunda lección: **el tamaño de lo que pides predice si vas a poder
revisarlo**.

Si pido algo grande, recibo trescientas líneas que hacen seis cosas. Para
revisarlas tengo que reconstruir mentalmente todo el razonamiento, y eso cuesta
más que haberlo escrito yo. Ahí es donde la productividad que prometía la
herramienta se evapora.

```figura
{ "tipo": "comparar", "titulo": "Dos formas de pedir lo mismo",
  "izq": { "rotulo": "Lo que no funciona",
    "lineas": [
      "«Implementa el módulo de pagos»",
      "Vuelve con 300 líneas",
      "Revisarlo cuesta más que escribirlo"
    ],
    "pie": "Y acabas aprobando por cansancio, que es como entra la deuda." },
  "der": { "rotulo": "Lo que sí",
    "lineas": [
      "«Añade la validación de importe negativo *aquí*»",
      "Vuelve con 15 líneas y su prueba",
      "Lo reviso en dos minutos"
    ],
    "pie": "Y si está mal, se tira sin que duela." } }
```

La regla que uso: **si no puedo revisar lo que me devuelva en cinco minutos,
la tarea estaba mal planteada**. No es un problema del agente, es que le pedí
algo que ni yo sé verificar de un vistazo.

## Cómo reviso lo que me entrega

Durante un tiempo revisé el diff línea a línea. Es agotador y, lo peor, no
funciona: lees sintaxis correcta y la mente se relaja.

Ahora miro otras cosas, en este orden:

```figura
{ "tipo": "flujo", "titulo": "Mi orden de revisión",
  "pasos": [
    { "que": "¿Hace lo que pedí?", "nota": "lo pruebo, no lo leo" },
    { "que": "¿Y lo que NO pedí?", "nota": "ficheros tocados de más, dependencias nuevas" },
    { "que": "¿Se parece al resto del repo?", "nota": "o ha traído su propio dialecto" },
    { "que": "¿Qué pasa en el camino malo?", "nota": "casi siempre es donde está flojo" },
    { "que": "¿Lo habría hecho así yo?", "tono": "bueno", "nota": "y si no, ¿es mejor lo suyo o es distinto?" }
  ],
  "pie": "El segundo paso es el que más veces ha salvado algo. Nadie mira lo que no pidió." }
```

El segundo merece un párrafo. Los agentes son **generosos**: añaden una
dependencia para algo que ya resolvía una función del proyecto, tocan un
fichero de configuración «de paso», meten un try/catch que se come un error
que yo quería ver. Nada de eso aparece si solo miras si la funcionalidad
funciona.

Y la última pregunta no es ego. Si lo hizo distinto y es mejor, aprendo. Si lo
hizo distinto y no sé por qué, eso es exactamente la deuda de la que hablamos:
código que nadie entiende del todo, viviendo en tu repositorio.

## Dónde le pongo el freno

Hay zonas donde no le dejo trabajar solo. No por desconfianza general, sino
porque son las que no admiten una revisión rápida:

```figura
{ "tipo": "marcas", "titulo": "Lo que no delego, y por qué",
  "filas": [
    { "vale": false, "que": "Migraciones de datos", "porque": "un error no se revierte leyendo el diff, y a veces no se revierte" },
    { "vale": false, "que": "Permisos y autenticación", "porque": "el fallo no se ve: el código funciona y además deja pasar a quien no debe" },
    { "vale": false, "que": "Lo que toca dinero", "porque": "redondeos, monedas, impuestos; se equivoca poco y cuando lo hace es caro" },
    { "vale": false, "que": "Las aserciones de una prueba", "porque": "si él decide qué es correcto, la prueba comprueba su interpretación" },
    { "vale": true, "que": "Todo lo demás, con revisión", "porque": "que es casi todo, y ahí sí me ahorra horas de verdad" }
  ] }
```

La cuarta es la que más defiendo y la que más discusión genera. Dejar que el
agente escriba la prueba **y** el código es cerrar el círculo sobre sí mismo:
si entendió mal el requisito, el código y la prueba comparten el malentendido
y salen los dos en verde. Yo le dejo escribir el andamiaje de la prueba, pero
**qué se afirma lo decido yo**.

## El coste que no aparece en ninguna demo

Lo que casi nunca se cuenta de estas herramientas: **revisar código generado
rápido tiene un coste, y no es cero**.

Escribir cien líneas cuesta una hora. Generarlas cuesta un minuto, y
revisarlas de verdad cuesta cuarenta minutos. La cuenta sigue saliendo a
favor, bastante, pero no es la que venden. Y si te saltas la revisión para que
la cuenta salga mejor, lo que hiciste no fue ir más rápido: fue mover trabajo
al futuro.

```figura
{ "tipo": "barras", "titulo": "Dónde se va el tiempo de verdad",
  "barras": [
    { "que": "escribir a mano", "valor": 60, "etiqueta": "~60 min" },
    { "que": "generar", "valor": 2, "etiqueta": "~2 min", "tono": "bueno" },
    { "que": "revisar bien", "valor": 40, "etiqueta": "~40 min", "tono": "alarma" }
  ],
  "pie": "Mis tiempos, en tareas pequeñas de un repo que conozco. Sale a favor, pero no es magia." }
```

## Lo que no ha cambiado

Después de un año largo haciendo esto, lo que más me sorprende es lo poco que
cambió lo importante.

Sigo teniendo que saber qué quiero antes de pedirlo. Sigo teniendo que
reconocer un buen diseño cuando lo veo, porque si no, no puedo juzgar lo que
me entregan. Y sigo siendo responsable de lo que entra en la rama principal,
lo haya escrito yo o no.

Lo que cambió es la velocidad a la que puedo equivocarme. Eso es útil cuando
tienes criterio y por dónde comprobarlo, y es un problema cuando no.

---

Si tuviera que quedarme con una sola idea: **el agente amplifica lo que ya
tienes**. Un repositorio ordenado, con ejemplos buenos y pruebas en las que
confías, se vuelve mucho más rápido. Uno desordenado, sin criterio escrito y
con pruebas que fallan a ratos, se vuelve desordenado más deprisa.

La herramienta es la misma. La diferencia estaba ahí antes de instalarla.
