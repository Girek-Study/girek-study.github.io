---
titulo: Lo que automatizas es lo que ya sabes que puede fallar
resumen: >-
  Una prueba automatizada solo puede fallar por algo que alguien ya previó. Los
  defectos que nadie vio venir los encuentra una persona explorando, y eso no
  es «testing manual»: es la parte difícil del oficio.
fecha: 2026-10-10
etiquetas: [Testing exploratorio, Estrategia, Criterio]
portada: explorar
---

Hay una frase que se repite en cada plan de calidad y en cada entrevista:
**«hay que automatizarlo todo»**.

Llevo diez años automatizando y te digo lo que he visto: los defectos que más
daño hicieron no los encontró ninguna de mis suites. Los encontró alguien
—a veces yo, a veces un compañero— trasteando con el producto el martes por la
tarde.

No es mala suerte. Es aritmética.

## Una prueba automatizada no descubre nada

Esta es la distinción que lo cambia todo, y casi nunca se dice en voz alta:

```figura
{ "tipo": "comparar", "titulo": "Dos trabajos distintos con el mismo nombre",
  "izq": { "rotulo": "Automatización",
    "lineas": [
      "Comprueba lo que ya sabías",
      "Detecta *regresión*",
      "Repite sin cansarse ni dudar"
    ],
    "pie": "Solo puede fallar por algo que alguien previó al escribirla." },
  "der": { "rotulo": "Exploración",
    "lineas": [
      "Busca lo que nadie formuló",
      "Detecta *lo que no estaba en el plan*",
      "Cambia de dirección con lo que acaba de ver"
    ],
    "pie": "Es el único sitio donde aparece un defecto nuevo." } }
```

Una prueba automatizada es una afirmación congelada: *cuando pase esto, debe
ocurrir aquello*. Es extraordinariamente útil, y es lo que me ha dado de comer.
Pero **no puede encontrar un problema que nadie imaginó**, porque fue una
persona quien decidió qué afirmar.

Automatizar es convertir conocimiento en vigilancia. Para convertirlo, primero
hay que tenerlo. Y ese paso —averiguar qué merece la pena vigilar— no lo hace
ninguna herramienta.

De ahí sale la regla que uso para repartir el esfuerzo: **se automatiza lo que
ya entiendes y vas a repetir; se explora lo que todavía no entiendes**.

## «Manual» es un nombre malísimo

Michael Bolton lleva años insistiendo en algo que al principio me pareció una
pedantería y acabé dándole la razón: hablar de «testing manual» es como hablar
de «cirugía manual». Pone el foco en las manos, que es la parte que no importa.

Teclear no es el trabajo. **El trabajo es decidir qué probar a continuación,
usando lo que acabas de ver.** Eso es un bucle de pensamiento, y es justo lo
que una suite no hace: una suite ejecuta los mismos cien pasos aunque el paso
tres haya devuelto algo rarísimo.

Cuando alguien dice «solo hago manual», casi siempre está describiendo mal la
parte más difícil de su trabajo. Y cuando alguien lo dice con desprecio, suele
ser porque nunca ha visto exploración hecha en serio.

## Exploración en serio no es «trastear»

Aquí está el motivo real de que tenga mala fama: la mayoría de lo que se llama
exploratorio es abrir la aplicación y hacer clic sin plan. Eso no es un método,
es un rato.

La versión seria existe desde hace veinticinco años y tiene nombre: **gestión
por sesiones**, de Jon y James Bach. La diferencia es que produce evidencia y
se puede planificar como cualquier otro trabajo.

```figura
{ "tipo": "flujo", "titulo": "Una sesión, no un rato",
  "pasos": [
    { "que": "Una misión escrita", "nota": "«explorar el alta de usuario buscando problemas de validación»" },
    { "que": "Tiempo acotado", "nota": "60 o 90 minutos; después se nota el cansancio en lo que encuentras" },
    { "que": "Notas mientras ocurre", "nota": "qué probaste, qué viste, qué te llamó la atención y no seguiste" },
    { "que": "Un repaso al terminar", "nota": "qué cubriste, qué quedó fuera, qué sesión hace falta ahora" },
    { "que": "Lo repetible se automatiza", "tono": "bueno", "nota": "lo que encontraste y vas a querer vigilar" }
  ],
  "pie": "Con esto se puede estimar, repartir y defender en una reunión. Sin esto, es un rato." }
```

Ese último paso es el que cierra el círculo y el que más se salta: **la
exploración alimenta a la automatización**. Lo que descubres explorando se
convierte en la prueba que vigila que no vuelva. Las dos cosas no compiten: una
es la que encuentra y otra la que recuerda.

## Qué busco cuando exploro

Sin una heurística, explorar es mirar la pantalla a ver si pasa algo. Con una,
es un recorrido. La más conocida es **SFDIPOT**, de James Bach, que no es más
que una lista de sitios donde mirar.

Esto es lo que yo reviso, que es su versión corta:

```figura
{ "tipo": "marcas", "titulo": "Dónde aparecen los defectos que nadie previó",
  "filas": [
    { "vale": true, "que": "Los bordes de los datos", "porque": "el cero, el negativo, la ñ, el nombre de 200 caracteres, la fecha de febrero" },
    { "vale": true, "que": "El camino que nadie dibujó", "porque": "volver atrás, recargar a media operación, abrir dos pestañas" },
    { "vale": true, "que": "Las junturas entre equipos", "porque": "ahí cada uno dio por supuesto lo del otro" },
    { "vale": true, "que": "Lo que pasa cuando algo tarda", "porque": "doble clic, pulsar mientras carga, perder la red a mitad" },
    { "vale": true, "que": "Los permisos cruzados", "porque": "cambiar un identificador en la URL y ver qué devuelve" },
    { "vale": false, "que": "El camino feliz, otra vez", "porque": "eso ya lo cubre una prueba automatizada, y mejor que tú" }
  ] }
```

Fíjate en la última fila. Si estás repitiendo a mano lo que tu suite ya
comprueba, no estás explorando: estás haciendo de robot caro.

## La métrica que arruina esto

El testing exploratorio se mata contándolo mal. En cuanto alguien pide
**«¿cuántos casos ejecutaste?»**, la sesión se convierte en una lista de pasos
y se acabó la exploración.

Lo que sí informa de una sesión: qué zona se cubrió, qué riesgos se
descartaron, qué se encontró y qué quedó pendiente de mirar. Es cualitativo, y
está bien que lo sea.

Ya lo conté en [las métricas de QA que no dicen
nada](/notas/las-metricas-de-qa-que-no-dicen-nada/): cuando mides una actividad
de pensamiento por su volumen, obtienes volumen.

## Entonces, ¿cuánto de cada cosa?

No tengo un porcentaje y desconfío de quien lo da. Tengo una forma de decidir:

```figura
{ "tipo": "matriz", "titulo": "Qué merece cada tipo de esfuerzo",
  "celdas": [
    { "rotulo": "Lo entiendes y se repite", "que": "Automatízalo. Es el caso para el que existe una suite.", "tono": "alta" },
    { "rotulo": "No lo entiendes todavía", "que": "Explóralo. Automatizar aquí es congelar una suposición." },
    { "rotulo": "Lo entiendes y no se repite", "que": "Una comprobación puntual. Automatizarlo cuesta más de lo que ahorra." },
    { "rotulo": "Ni lo entiendes ni se repite", "que": "Pregúntate por qué está en el producto.", "tono": "baja" }
  ] }
```

Y una pista práctica: **cada vez que una funcionalidad es nueva, el primer paso
nunca es escribir la automatización.** Es sentarse con ella. Si automatizas
antes de entender, lo que escribes es la versión que te contaron, no la que
existe.

---

La automatización es memoria: recuerda por ti, sin quejarse, mil veces al día.
La exploración es atención: se da cuenta de lo que nadie escribió.

Un equipo que solo automatiza tiene una memoria excelente de un producto que
nunca llegó a mirar. Y el día que aparece el defecto raro —el que se lleva por
delante un fin de semana— no estaba en ninguna suite, porque **nadie puede
escribir una afirmación sobre algo que todavía no se le ha ocurrido**.
