---
titulo: "Un RAG no falla: fallan sus dos mitades, y hay que medirlas por separado"
resumen: >-
  Si evalúas la respuesta final no sabes cuál de las dos se rompió, y acabas
  tocando el prompt cuando el problema estaba en la búsqueda. Qué mido en cada
  una y el fallo que no detecta ninguna métrica.
fecha: 2026-11-02
etiquetas: [IA, RAG, Evaluación]
portada: rag
---

Un sistema que consulta tus documentos antes de responder tiene dos piezas
encadenadas: una **busca** y otra **redacta**. Y cuando la respuesta sale mal,
la pregunta útil no es «¿por qué respondió eso?», sino **cuál de las dos
falló**.

Esa distinción parece de manual y decide el trabajo de semanas. Lo que más he
visto: un equipo retocando el prompt durante días cuando el problema era que
la búsqueda nunca traía el documento correcto. Ningún prompt arregla eso.

```figura
{ "tipo": "flujo", "titulo": "Dos piezas, dos formas distintas de romperse",
  "pasos": [
    { "que": "Llega la pregunta", "icono": "lupa", "nota": "en las palabras del usuario, no en las tuyas" },
    { "que": "Se buscan documentos", "icono": "base", "nota": "aquí falla la *recuperación*" },
    { "que": "Se arma el contexto", "icono": "capas", "nota": "cuántos, en qué orden, recortados cómo" },
    { "que": "Se redacta la respuesta", "icono": "documento", "tono": "bueno", "nota": "aquí falla la *generación*" }
  ],
  "pie": "Evaluar solo el final es mirar el resultado de una suma sin ver los sumandos." }
```

## Mitad uno: ¿trajo lo que hacía falta?

Esta se mide sin tocar el modelo generador, y es la que más rinde porque es
**determinista**: la misma pregunta trae los mismos documentos.

Necesitas un conjunto donde, para cada pregunta, esté anotado **qué documento
contiene la respuesta**. Es trabajo manual y no hay atajo, pero son unas horas
y se amortiza en la primera semana.

```figura
{ "tipo": "marcas", "titulo": "Qué miro en la búsqueda",
  "filas": [
    { "vale": true, "que": "¿Está el documento correcto entre los k primeros?", "porque": "si no entra, la respuesta no puede ser buena por mucho que el modelo sea listo" },
    { "vale": true, "que": "¿En qué posición entra?", "porque": "el primero y el séptimo no pesan igual al redactar" },
    { "vale": true, "que": "Cuánta basura entra con él", "porque": "cada documento irrelevante es ruido que compite por la atención" },
    { "vale": true, "que": "Las preguntas sin respuesta en el corpus", "porque": "tiene que devolver poco o nada, no rellenar con lo más parecido" },
    { "vale": false, "que": "Si la respuesta final suena bien", "porque": "eso es la otra mitad; aquí todavía no hemos llegado" }
  ] }
```

La cuarta fila es la que casi nadie mete y la que más fallos caros previene.
**Un buscador siempre devuelve algo.** Si preguntas por una política que no
existe, te trae las tres más parecidas, y el modelo redacta encima de ellas
una respuesta perfectamente convincente sobre algo que no está en ninguna
parte.

## Mitad dos: ¿se apoyó en lo que trajo?

Aquí sí hace falta criterio, y es donde entra la evaluación asistida. Dos
preguntas, separadas a propósito:

```figura
{ "tipo": "comparar", "titulo": "Las dos preguntas de la generación",
  "izq": { "rotulo": "¿Está fundamentada?",
    "lineas": [
      "Cada afirmación, ¿sale del contexto?",
      "¿O hay frases que no están en ningún documento?",
      "Se comprueba *contra lo recuperado*"
    ],
    "pie": "Mide invención. Es la que detecta lo que se suele llamar alucinación." },
  "der": { "rotulo": "¿Es pertinente?",
    "lineas": [
      "¿Contesta lo que se preguntó?",
      "¿O contesta algo cercano y correcto?",
      "Se comprueba *contra la pregunta*"
    ],
    "pie": "Mide puntería. Una respuesta puede estar fundamentada y no venir a cuento." } }
```

Separarlas importa porque se arreglan de formas distintas. Si falla la
fundamentación, el problema está en las instrucciones: no le estás exigiendo
ceñirse al contexto, o le permites «completar con su conocimiento». Si falla
la pertinencia, el problema suele estar antes: le llegaron cinco documentos y
redactó sobre el equivocado.

## El fallo que no detecta ninguna métrica

Y aquí está lo que más me preocupa de estos sistemas, porque **pasa todas las
comprobaciones**:

```figura
{ "tipo": "matriz", "titulo": "El documento correcto, desactualizado",
  "celdas": [
    { "rotulo": "La recuperación", "que": "Perfecta. Trajo el documento que habla exactamente de eso.", "tono": "alta" },
    { "rotulo": "La fundamentación", "que": "Perfecta. Cada frase de la respuesta sale de ese documento." },
    { "rotulo": "La pertinencia", "que": "Perfecta. Contesta justo lo que se preguntó." },
    { "rotulo": "La realidad", "que": "El documento es de hace dos años y esa política cambió en marzo.", "tono": "alta" }
  ],
  "pie": "Todas las métricas en verde, y la respuesta es falsa. No es un problema del modelo: es del corpus." }
```

Esto no se arregla con evaluación, se arregla con **higiene del corpus**:
fecha en cada documento, retirar lo derogado en vez de dejarlo «por si acaso»,
y —cuando aplique— que el sistema diga de cuándo es lo que está citando.

Lo meto en esta nota porque es el fallo que más confianza destruye. Una
respuesta obviamente rara se detecta. Una respuesta coherente, bien
fundamentada y desfasada se cree.

## Cómo monto la evaluación

```figura
{ "tipo": "capas", "titulo": "El orden en que lo construyo",
  "capas": [
    { "n": "1", "que": "Conjunto de preguntas con el documento esperado anotado. Trabajo manual, unas horas." },
    { "n": "2", "que": "Mido solo recuperación. Rápido, determinista y sin coste de tokens." },
    { "n": "3", "que": "Arreglo la búsqueda hasta que el documento correcto entre casi siempre." },
    { "n": "4", "que": "Solo entonces miro la generación. Antes, estaría midiendo ruido." },
    { "n": "5", "que": "Separo lo que corre en cada cambio de lo que corre cada día.", "tono": "clave" }
  ],
  "pie": "Los tres primeros no gastan ni un token de generación y arreglan la mayoría de los fallos." }
```

El orden no es un detalle: **mientras la recuperación falle, cualquier medida
sobre la generación está contaminada**. Vas a estar puntuando lo bien que
redacta sobre documentos equivocados.

Y el quinto es lo que hace que esto sobreviva al día a día. En cada cambio,
las preguntas críticas midiendo solo recuperación, que es barato. El conjunto
completo con juez, una vez al día.

---

Si tuviera que dejar una sola frase: **no preguntes si la respuesta fue
buena. Pregunta si trajo lo correcto y si se ciñó a ello.**

Son dos preguntas, se contestan por separado, y la primera no cuesta ni un
céntimo. Empieza por esa, que además es donde está la mayoría del problema.
