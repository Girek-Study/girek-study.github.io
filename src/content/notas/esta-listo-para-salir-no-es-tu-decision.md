---
titulo: «¿Está listo para salir?» no es tu decisión
resumen: >-
  Contestar sí o no te mete en un sitio donde no puedes ganar. Lo que sí te
  toca es entregar el mapa del riesgo, y hacerlo de forma que quien decide no
  pueda decir después que no lo sabía.
fecha: 2026-10-10
etiquetas: [Liderazgo, Riesgo, Comunicación]
portada: balanza
---

Reunión de media tarde, víspera de salida. Alguien se gira hacia ti y suelta la
pregunta de siempre:

**«¿Está listo para salir?»**

Todo el mundo mira. Y en ese momento, contestes lo que contestes, pierdes.

## Por qué sí o no es una trampa

```figura
{ "tipo": "comparar", "titulo": "Las dos salidas de una pregunta mal planteada",
  "izq": { "rotulo": "Dices que sí",
    "lineas": [
      "Sale y algo falla",
      "«Pero QA lo había validado»",
      "Te comes algo que no decidiste"
    ],
    "pie": "Asumiste un riesgo de negocio que no te correspondía." },
  "der": { "rotulo": "Dices que no",
    "lineas": [
      "«¿Y cuándo va a estar?»",
      "Eres el que frena la entrega",
      "La próxima vez no te preguntan"
    ],
    "pie": "Te conviertes en un obstáculo en vez de en una fuente de información." } }
```

Las dos respuestas tienen el mismo error de fondo: **aceptan la pregunta**.

Y la pregunta está mal hecha. «Listo» no es una propiedad del software: es un
juicio sobre cuánto riesgo está dispuesto a correr alguien, y ese alguien no
eres tú. Tú no sabes cuánto cuesta un día de retraso, ni qué se le prometió a
qué cliente, ni qué hay en juego este trimestre.

**La decisión de salir no es tuya. La información para tomarla, sí.**

Esto no es escurrir el bulto: es lo contrario. Es la parte del trabajo que más
cuesta hacer bien.

## Lo que contesto en vez de sí o no

Hay cuatro cosas, y se dicen en treinta segundos:

```figura
{ "tipo": "flujo", "titulo": "La respuesta que sí sirve",
  "pasos": [
    { "que": "Qué se probó y pasó", "nota": "con el alcance claro: «pago con tarjeta, en los tres navegadores»" },
    { "que": "Qué NO se ha probado", "nota": "lo más importante de todo, y lo que casi nadie dice en voz alta" },
    { "que": "Qué puede pasar, y a cuánta gente", "nota": "en consecuencias, no en jerga: «no podrían pagar», no «falla el endpoint»" },
    { "que": "Qué cuesta esperar", "tono": "bueno", "nota": "«con medio día cubrimos lo de arriba»; da una alternativa, no solo un problema" }
  ],
  "pie": "Con esto, quien decide tiene lo que necesita. Y la decisión vuelve a estar donde debe." }
```

El segundo punto es el que convierte esto en profesional. Todo informe de
calidad dice lo que se probó; casi ninguno dice **lo que quedó fuera**, y es
justo lo que necesita saber quien firma.

Decir «no hemos probado la migración de los usuarios antiguos porque no había
datos» no es admitir una debilidad. Es la frase más útil de toda la reunión.

## De defecto a consecuencia

El otro cambio que más me ha servido: dejar de contar defectos y empezar a
contar qué le pasa a alguien.

```figura
{ "tipo": "comparar", "titulo": "La misma información, dos idiomas",
  "izq": { "rotulo": "Como lo decimos",
    "lineas": [
      "«Hay 3 bugs *críticos* abiertos»",
      "«Falla la validación del formulario»",
      "«La cobertura bajó al 61 %»"
    ],
    "pie": "Obliga a quien escucha a traducirlo. Normalmente lo traduce mal." },
  "der": { "rotulo": "Como se entiende",
    "lineas": [
      "«Quien pague con débito no va a poder»",
      "«Se pueden crear pedidos sin dirección»",
      "«Esta zona no la mira nadie si se rompe»"
    ],
    "pie": "Ahora puede decidir, porque entiende lo que compra y lo que paga." } }
```

«Crítico» es una etiqueta que pusimos nosotros según nuestros criterios. «No
van a poder pagar» es un hecho sobre el negocio. La segunda se entiende sin
contexto técnico y, sobre todo, **se recuerda**.

Y donde puedas, pon tamaño: no es lo mismo «afecta a quien use Safari en
versiones viejas» —que puedes mirar en la analítica— que «afecta a todo el
mundo».

## Lo que sí es innegociable

Nada de esto significa que siempre toque ceder. Hay una lista corta donde no
entrego un mapa de riesgo: entrego una objeción y la dejo por escrito.

```figura
{ "tipo": "marcas", "titulo": "Donde no hay negociación posible",
  "filas": [
    { "vale": false, "que": "Datos de personas expuestos", "porque": "no es un riesgo de producto: es un riesgo legal, y no caduca" },
    { "vale": false, "que": "Dinero que se mueve mal", "porque": "cobrar de más, duplicar un cargo o perder una transacción no se compensa con una nota al pie" },
    { "vale": false, "que": "Pérdida de datos sin vuelta atrás", "porque": "un defecto se parchea; lo que se borró, no" },
    { "vale": false, "que": "Incumplimiento declarado", "porque": "lo que esté firmado con un cliente o exigido por ley no es una preferencia" },
    { "vale": true, "que": "Todo lo demás", "porque": "es una decisión de negocio, y el negocio tiene todo el derecho a tomarla" } ] }
```

La diferencia es si existe marcha atrás. Con una pantalla rota se vive un día;
con una fuga de datos, no. Para esos cuatro casos la frase es distinta y no
tiene adornos: **«esto no debería salir, y si sale quiero que conste por qué»**.

## Que conste: lo dicho en una reunión no existe

Esta parte es la que más gente se salta y la que más cara sale.

Después de la reunión, un mensaje de cinco líneas en el canal donde está la
gente que decide. Sin reproches, sin dramatismo. Qué se probó, qué no, qué
riesgo queda y qué se decidió.

```figura
{ "tipo": "capas", "titulo": "Por qué se escribe, aunque parezca burocracia",
  "capas": [
    { "n": "1", "que": "Porque dentro de tres semanas nadie recuerda qué se dijo." },
    { "n": "2", "que": "Porque quien no estaba en la sala también decide cosas con eso." },
    { "n": "3", "que": "Porque convierte una opinión en un registro consultable." },
    { "n": "4", "que": "Porque si sale mal, la conversación es «sabíamos esto» y no «¿quién lo aprobó?».", "tono": "clave" }
  ],
  "pie": "No se escribe para cubrirse. Se escribe para que la próxima decisión se tome mejor." }
```

Que quede claro el tono: esto no es un acta para señalar a nadie el día que
falle. Si se usa así una vez, nadie vuelve a contarte nada. Se escribe porque
una decisión de riesgo tomada a conciencia merece quedar registrada, igual que
se registra cualquier otra decisión de producto.

## El efecto secundario que no esperaba

Cuando dejé de contestar sí o no, pasó algo que no había previsto: **empezaron
a preguntarme antes**.

Mientras eras el que dice que no, te preguntaban al final, cuando ya no se
podía hacer nada. En cuanto te conviertes en el que trae el mapa, te llaman
cuando todavía se puede decidir. Y ahí es donde calidad vale de verdad.

---

«¿Está listo para salir?» seguirá sonando en todas las reuniones, y no vas a
cambiar la pregunta. Lo que puedes cambiar es qué pones encima de la mesa.

No tienes que cargar con una decisión que no te toca. Tienes que asegurarte de
que **quien la toma no pueda decir después que no lo sabía**.
