---
titulo: Tu suite compara cadenas exactas y tu sistema ya no repite la respuesta
resumen: >-
  Cuando metes un modelo en el producto, `assertEquals` deja de servir de la
  noche a la mañana. Lo que funciona es afirmar en tres niveles distintos y
  medir tasas en vez de resultados sueltos.
fecha: 2026-10-28
etiquetas: [IA, Evaluación, Automatización]
portada: varianza
---

El día que entra un modelo en el producto, media suite se cae. No porque el
código esté mal: porque **la misma entrada deja de producir la misma salida**,
y toda nuestra forma de afirmar se apoyaba justo en lo contrario.

La reacción habitual es una de estas dos, y las dos son malas. O se marca el
módulo como «no automatizable» y se revisa a ojo, o se escribe una
comprobación tan laxa —que la respuesta no esté vacía— que pasa siempre y no
comprueba nada.

Hay una tercera, que es la que uso.

## Qué sigue siendo determinista

Antes de nada: **no todo cambia**. Y lo que no cambia hay que seguir
exigiéndolo con la misma dureza de siempre, porque es donde se cuelan los
defectos aburridos y caros.

```figura
{ "tipo": "marcas", "titulo": "Esto no varía aunque el texto sí",
  "filas": [
    { "vale": true, "que": "La forma de la respuesta", "porque": "si prometiste un JSON con tres campos, son tres campos, siempre" },
    { "vale": true, "que": "Los tipos y los rangos", "porque": "una puntuación entre 0 y 1 no sale a 1,4 ningún día" },
    { "vale": true, "que": "Que no se invente campos", "porque": "añadir una clave que no estaba en el contrato rompe a quien consume" },
    { "vale": true, "que": "Los efectos: qué tocó y qué no", "porque": "el texto puede variar; haber escrito en otra tabla, no" },
    { "vale": true, "que": "El tiempo y el coste por llamada", "porque": "con umbral, como cualquier otra prueba de rendimiento" }
  ],
  "pie": "Esta mitad se prueba exactamente como siempre. Nadie te obliga a aflojarla." }
```

Esto es más de lo que parece. En la mayoría de integraciones que he visto, el
**80 % de lo que puede ir mal está en esta tabla**, no en si la redacción fue
afortunada.

## Los tres niveles de afirmación

Para lo que sí varía, no hay una técnica: hay tres, y se usan a la vez.

```figura
{ "tipo": "capas", "titulo": "De lo más duro a lo más blando",
  "capas": [
    { "n": "1", "que": "Estructural — forma, tipos, campos obligatorios. Igual que siempre." },
    { "n": "2", "que": "Por propiedades — lo que tiene que cumplirse sea cual sea el texto." },
    { "n": "3", "que": "Semántico — si dice lo mismo, aunque no con las mismas palabras.", "tono": "clave" }
  ],
  "pie": "Casi todo el valor está en el nivel 2, que es justo el que casi nadie escribe." }
```

El nivel dos es el que cambia la vida. En vez de comprobar *qué* respondió,
compruebas **qué tiene que ser verdad de cualquier respuesta válida**:

- Si el usuario preguntó por su saldo, el importe que aparezca tiene que ser
  el que hay en la base de datos. El texto da igual.
- Si la pregunta era sobre devoluciones, la respuesta tiene que citar la
  política de devoluciones y no la de envíos.
- Si no hay datos para contestar, tiene que decir que no lo sabe, y **no debe
  aparecer ninguna cifra**.

Fíjate en que ninguna de las tres compara textos. Son afirmaciones sobre
hechos, y los hechos no varían con la redacción.

El nivel tres —comparar significados— es el último recurso, no el primero.
Cuesta más, es más frágil y, sobre todo, necesita que alguien decida qué es
«lo mismo».

## El conjunto de referencia

Para medir hace falta un conjunto de casos con su respuesta aceptable. Es el
equivalente a tu suite de regresión, y montarlo es el trabajo de verdad.

```figura
{ "tipo": "flujo", "titulo": "Cómo lo construyo",
  "pasos": [
    { "que": "Empieza por los fallos reales", "nota": "lo que salió mal en producción es el mejor caso de prueba" },
    { "que": "Treinta casos antes que trescientos", "nota": "etiquetados por alguien que sabe, no generados" },
    { "que": "Incluye los que NO debe contestar", "nota": "la mitad del valor está aquí, y casi nadie los mete" },
    { "que": "Guárdalo versionado, junto al código", "nota": "si vive en una hoja de cálculo, muere en un mes" },
    { "que": "Revísalo cuando cambie el producto", "tono": "bueno", "nota": "un conjunto viejo da una nota alta y falsa" }
  ],
  "pie": "Treinta casos buenos detectan más que trescientos generados con el mismo modelo que estás probando." }
```

El tercer paso merece insistencia. Un conjunto solo con preguntas
contestables mide si el sistema responde bien. No mide **si sabe callarse**, y
el fallo caro casi siempre es ese: inventarse una respuesta en vez de decir
que no tiene el dato.

## Medir tasas, no resultados

Y aquí está el cambio mental grande: con un sistema no determinista, **una
ejecución no dice nada**.

```figura
{ "tipo": "comparar", "titulo": "La misma prueba, dos formas de leerla",
  "izq": { "rotulo": "Como una prueba normal",
    "lineas": [
      "Se ejecuta una vez",
      "Pasa o falla",
      "Si falla, se vuelve a lanzar «por si acaso»"
    ],
    "pie": "Esto es echar una moneda al aire y anotar el resultado." },
  "der": { "rotulo": "Como una medición",
    "lineas": [
      "Se ejecuta *n* veces",
      "Se mide la tasa de acierto",
      "El umbral es la tasa, no el caso"
    ],
    "pie": "«Este caso acierta el 96 % de las veces» sí es información." } }
```

Eso cambia cómo se escribe el umbral. En vez de «este caso debe pasar», es
**«el conjunto debe acertar por encima del 95 %, y ningún caso crítico puede
bajar del 100 %»**. Los casos críticos —los de dinero, los de datos
personales— no admiten tasa: o siempre, o no sale.

Y da un efecto secundario muy útil: **si una tasa cae de un día para otro sin
que hayas tocado nada, el modelo cambió debajo**. Eso pasa, y sin medir tasas
no te enteras hasta que lo nota un cliente.

## La trampa de aceptar varianza donde no la hay

Lo que más me encuentro al revisar estas integraciones: equipos que, al
descubrir que el sistema no es determinista, **aflojan todo**.

```figura
{ "tipo": "matriz", "titulo": "Dónde aflojar y dónde no",
  "celdas": [
    { "rotulo": "Varía de verdad", "que": "La redacción, el orden de los argumentos, la longitud. Aquí van propiedades y semántica." },
    { "rotulo": "No varía", "que": "El importe, el identificador, la decisión de sí o no. Aquí va igualdad exacta.", "tono": "alta" },
    { "rotulo": "El error común", "que": "Comprobar que «la respuesta contiene un número». Pasa siempre, no comprueba nada.", "tono": "alta" },
    { "rotulo": "Lo que hay que hacer", "que": "Extraer el dato de la respuesta y compararlo con la fuente. Eso sí es determinista." }
  ] }
```

La tercera celda es un caso real que he visto más de una vez. Comprobar que
hay un número no distingue entre el saldo correcto y uno inventado. Lo que
hay que hacer es **sacar el número y compararlo con la base de datos**, y eso
vuelve a ser una comprobación de toda la vida.

---

Resumido: cuando entra un modelo, no se relaja la suite. **Se reparte en dos.**

La mitad determinista —forma, tipos, efectos, datos concretos— sigue siendo
tan dura como antes, y ahí está la mayoría de lo que puede salir mal. La otra
mitad deja de preguntarse «¿dijo exactamente esto?» y pasa a preguntarse **«¿es
verdad lo que dijo, y acierta con la frecuencia que acordamos?»**.

Lo difícil no es la técnica. Es aceptar que ahora tu suite devuelve un
porcentaje, y que alguien tiene que decidir cuál es el aceptable.
