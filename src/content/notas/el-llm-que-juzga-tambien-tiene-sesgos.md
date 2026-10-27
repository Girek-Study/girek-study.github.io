---
titulo: El modelo que juzga a otro modelo también tiene sus manías
resumen: >-
  Usar un LLM para evaluar respuestas es lo más práctico que hay, y viene con
  tres sesgos medidos: premia lo largo, le pesa el orden y se puntúa mejor a
  sí mismo. Se puede usar, pero hay que calibrarlo.
fecha: 2026-10-30
etiquetas: [IA, Evaluación, Criterio]
portada: juez
---

Tienes mil respuestas que evaluar y nadie para leerlas. La salida obvia, y la
que recomienda medio sector, es poner a un modelo a puntuar las respuestas de
otro modelo.

Funciona. Lo uso. Pero conviene saber qué estás contratando, porque **ese juez
llega con manías propias**, y algunas están medidas.

## Las tres manías que vas a encontrarte

```figura
{ "tipo": "capas", "titulo": "Sesgos del juez, por orden de lo que me ha molestado",
  "capas": [
    { "n": "1", "que": "Verbosidad — a igualdad de contenido, puntúa mejor lo más largo." },
    { "n": "2", "que": "Posición — el orden en que le das dos respuestas cambia cuál gana." },
    { "n": "3", "que": "Autopreferencia — reconoce su propio estilo y lo premia.", "tono": "clave" }
  ],
  "pie": "Ninguna es un fallo de tu prompt. Vienen con el juez, y hay que contarlas." }
```

**La verbosidad** es la que más distorsiona en la práctica. Si comparas dos
respuestas correctas y una da tres frases de contexto de más, suele ganar la
larga. Y eso te empuja justo donde no quieres ir: optimizar el producto para
que escriba más.

**La posición** es la más fácil de comprobar y la más incómoda. Le das A y B,
anota un ganador. Le das B y A —las mismas dos— y a veces cambia de opinión.
No por maldad: porque el orden es parte de su contexto.

**La autopreferencia** importa cuando el juez y el evaluado son el mismo
modelo o de la misma familia. Reconoce sus giros, su estructura, su forma de
cerrar un párrafo, y los premia. Es como pedirle a alguien que corrija su
propio examen con rúbrica ajena.

## Cómo se neutralizan

No se quitan, pero se controlan bastante:

```figura
{ "tipo": "marcas", "titulo": "Lo que hago antes de fiarme de una puntuación",
  "filas": [
    { "vale": true, "que": "Evaluar cada respuesta sola, no comparando", "porque": "sin pareja no hay sesgo de posición; se puntúa contra una rúbrica" },
    { "vale": true, "que": "Si comparas, hazlo en los dos órdenes", "porque": "y si el ganador cambia, esa comparación no vale: es un empate" },
    { "vale": true, "que": "Juez de familia distinta a la del evaluado", "porque": "corta la autopreferencia de raíz" },
    { "vale": true, "que": "Rúbrica con criterios separados", "porque": "no «¿es buena?» sino «¿cita la fuente?», «¿responde lo que se preguntó?»" },
    { "vale": false, "que": "Pedir una nota del 1 al 10", "porque": "se amontona todo en 7 y 8 y deja de distinguir nada" }
  ] }
```

La última es la que más veces he tenido que corregir. Una nota del uno al
diez suena informativa y no lo es: los modelos puntúan casi todo entre siete
y ocho, y acabas con una métrica que no se mueve aunque el producto empeore.

Lo que sí funciona: **criterios binarios y separados**. ¿Contesta lo que se
preguntó? Sí o no. ¿Se apoya en el documento recuperado? Sí o no. ¿Inventa
algún dato que no esté en la fuente? Sí o no. Tres preguntas cerradas dan más
información que una nota, y además se pueden auditar una por una.

## El paso que casi nadie da: calibrar al juez

Esta es la parte que separa una evaluación de una ceremonia.

**Antes de confiar en el juez, hay que medir si coincide con una persona.**

```figura
{ "tipo": "flujo", "titulo": "Calibrar, una vez y cada cierto tiempo",
  "pasos": [
    { "que": "Coge 50 casos y etiquétalos a mano", "nota": "alguien que sepa del dominio; es una tarde" },
    { "que": "Pásalos por el juez", "nota": "con la misma rúbrica, sin ver tus etiquetas" },
    { "que": "Mide el acuerdo", "nota": "en qué porcentaje coinciden, y dónde discrepan" },
    { "que": "Lee las discrepancias", "nota": "ahí está si el problema es la rúbrica o el juez" },
    { "que": "Repítelo cuando cambies de modelo", "tono": "bueno", "nota": "el juez también se actualiza debajo" }
  ],
  "pie": "Si el acuerdo es bajo, el problema casi siempre es la rúbrica: está pidiendo un juicio que ni tú harías igual dos veces." }
```

Ese cuarto paso es oro. Cuando leo las discrepancias, la mitad de las veces
descubro que **la rúbrica estaba mal escrita**: pedía valorar algo subjetivo,
o mezclaba dos criterios en una pregunta. Y la otra mitad descubro que yo
tampoco tenía claro qué consideraba correcto, lo cual es aún más útil de
saber.

## Dónde no lo uso

```figura
{ "tipo": "comparar", "titulo": "Dos tipos de pregunta",
  "izq": { "rotulo": "Para esto, no",
    "lineas": [
      "¿El importe es correcto?",
      "¿Este usuario tiene permiso?",
      "¿Existe este pedido?"
    ],
    "pie": "Tienen respuesta verificable. Se comprueba contra la fuente, no se opina." },
  "der": { "rotulo": "Para esto, sí",
    "lineas": [
      "¿Responde lo que se preguntó?",
      "¿Se apoya en el documento citado?",
      "¿Mantiene el tono acordado?"
    ],
    "pie": "No hay una cadena exacta que comparar, y aun así hay criterio que aplicar." } }
```

La columna izquierda es el error más caro que he visto en estas evaluaciones.
Si puedes comprobar algo consultando la base de datos, **consúltala**. Poner a
un modelo a opinar sobre un hecho verificable es cambiar una comprobación
segura por una probable, y encima pagando por token.

## El coste, que tampoco es cero

Un detalle práctico que se descubre tarde: evaluar también cuesta. Si tu
conjunto tiene 300 casos, los ejecutas 5 veces para medir tasas y encima cada
uno pasa por un juez, son **1.500 llamadas de producto y 1.500 de evaluación**
en cada ejecución.

Eso no cabe en cada cambio. Lo que hago: un subconjunto pequeño y barato en
cada *pull request* —los casos críticos, sin juez, solo propiedades— y el
conjunto completo con juez una vez al día o antes de publicar.

---

El juez automático es una herramienta buena y hace falta: sin él no hay forma
de evaluar a escala. Pero es un instrumento de medida, y **un instrumento de
medida que nadie ha calibrado no es un instrumento: es una opinión con
decimales**.

Dedícale la tarde de los cincuenta casos etiquetados a mano. Es lo único que
convierte ese número en algo que puedas defender en una reunión.
