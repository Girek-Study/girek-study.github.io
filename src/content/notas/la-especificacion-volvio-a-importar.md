---
titulo: La especificación volvió a importar, y esta vez la lee una máquina
resumen: >-
  Durante veinte años escribimos documentos que nadie abría después de la
  primera semana. Ahora el agente genera el código leyendo justo eso, y cada
  ambigüedad que dejes se convierte en una decisión que tomó él.
fecha: 2026-10-19
etiquetas: [Spec-Driven, IA, Criterio]
portada: spec
---

Llevamos veinte años con la misma escena. Alguien escribe un documento de
requisitos, se revisa en una reunión, se aprueba, y a la semana el producto ya
no se parece a lo que pone ahí. El documento queda en una carpeta y la verdad
pasa a estar en el código.

Esto tiene una consecuencia que normalizamos: **la especificación nunca fue la
fuente de la verdad, era una foto del día que se escribió**.

Y entonces llega algo que nadie vio venir. El agente que genera el código
**lee la especificación**. Literalmente. Es su entrada.

De golpe, aquel documento que nadie abría vuelve al centro, y con una
propiedad nueva: **cada ambigüedad que dejes dentro se convierte en una
decisión que toma la máquina por ti**.

## Qué es esto del desarrollo guiado por especificación

La idea cabe en una línea: **escribe primero qué tiene que pasar, con
precisión suficiente para que no quepan dos lecturas, y genera desde ahí.**

No es nuevo en el fondo —es lo que prometía BDD— pero sí cambia en algo
importante:

```figura
{ "tipo": "comparar", "titulo": "La misma idea, otro destinatario",
  "izq": { "rotulo": "La especificación de antes",
    "lineas": [
      "La leía una persona",
      "Rellenaba los huecos con sentido común",
      "Preguntaba si algo no cuadraba"
    ],
    "pie": "La ambigüedad se resolvía en el pasillo, y nadie la apuntaba." },
  "der": { "rotulo": "La especificación de ahora",
    "lineas": [
      "La lee un agente",
      "Rellena los huecos *inventando*",
      "No pregunta: entrega"
    ],
    "pie": "La ambigüedad se resuelve sola, y te enteras en producción." } }
```

Esa es toda la diferencia, y es enorme. Una persona que lee «el usuario podrá
filtrar los pedidos» sabe que tiene que preguntar por qué campos, si el filtro
se guarda, qué pasa sin resultados. Un agente no pregunta. Decide. Y decide
con lo que ha visto en otros proyectos, que no es el tuyo.

## Dónde se nota la diferencia

Un ejemplo pequeño y real, de los que aparecen cada semana:

```figura
{ "tipo": "comparar", "titulo": "«El usuario podrá filtrar los pedidos»",
  "izq": { "rotulo": "Lo que escribiste",
    "lineas": [
      "«Podrá filtrar los pedidos»",
      "Cuatro palabras",
      "Suena completo"
    ],
    "pie": "Y lo aprobó todo el mundo en la reunión." },
  "der": { "rotulo": "Lo que decidió el agente",
    "lineas": [
      "Filtra solo por estado",
      "No guarda el filtro al volver",
      "Sin resultados: una tabla vacía, sin mensaje"
    ],
    "pie": "Tres decisiones de producto tomadas por quien no conoce tu producto." } }
```

Ninguna de las tres es un defecto. El código hace lo que pone. **El defecto
estaba en la frase**, y antes se arreglaba preguntando. Ahora no hay nadie
preguntando.

## Lo que convierte un deseo en una especificación

La diferencia entre un requisito y algo de lo que se puede generar código es
que el segundo **se puede comprobar sin discutir**.

```figura
{ "tipo": "marcas", "titulo": "Qué tiene que llevar para que sirva",
  "filas": [
    { "vale": true, "que": "Un dato de entrada concreto", "porque": "«un importe alto» no es nada; «1.000.001» sí" },
    { "vale": true, "que": "El resultado esperado, exacto", "porque": "incluido el mensaje, no «muestra un error»" },
    { "vale": true, "que": "Qué pasa cuando sale mal", "porque": "es la mitad del comportamiento y la que siempre falta" },
    { "vale": true, "que": "Qué NO debe ocurrir", "porque": "«no se cobra dos veces» no se deduce de ninguna otra frase" },
    { "vale": false, "que": "«El sistema será intuitivo»", "porque": "no se puede comprobar, así que no es un requisito: es un deseo" },
    { "vale": false, "que": "«Debe ser rápido»", "porque": "sin número no obliga a nada; con número es un contrato" }
  ] }
```

Fíjate en que **esto no es una lista nueva**. Es exactamente lo que llevamos
años pidiendo en los refinamientos y nunca conseguimos del todo, porque el
coste de la ambigüedad lo pagaba alguien más tarde y nunca quedaba claro
quién.

Ahora el coste es inmediato y visible: código generado que hace otra cosa.

## Dónde encaja QA en esto, y por qué es buena noticia

Aquí está la parte que me interesa de verdad.

Durante años, escribir criterios de aceptación precisos fue la parte menos
valorada del trabajo. El que insistía en concretar el caso del importe
negativo era el pesado de la reunión.

```figura
{ "tipo": "capas", "titulo": "Lo que pasa cuando la spec es la entrada",
  "capas": [
    { "n": "1", "que": "La precisión deja de ser una manía y pasa a ser la calidad del material de partida." },
    { "n": "2", "que": "Los criterios de aceptación dejan de documentar: ahora generan." },
    { "n": "3", "que": "El caso raro escrito antes es código que existe; no escrito, es un hueco que alguien rellenó." },
    { "n": "4", "que": "Quien sabe preguntar «¿y si viene vacío?» se mueve al principio del proceso.", "tono": "clave" }
  ],
  "pie": "No es que QA entre antes por cortesía. Es que sin ese trabajo lo que entra es ruido." }
```

Esto conecta con algo que escribí hace tiempo en [empieza por el criterio; el
código viene después](/notas/del-criterio-al-codigo/): la parte difícil nunca
fue escribir el `assert`, fue decidir qué merece uno. Esa decisión ahora tiene
un consumidor nuevo y mucho más literal.

## Tres trampas que ya me he encontrado

**Generar la especificación desde el código.** Es tentador: le pides al agente
que documente lo que hay y te devuelve una especificación preciosa. Pero eso
no es una especificación: es una descripción. Dice lo que el sistema hace,
incluidos sus defectos, y los bendice. Una especificación dice lo que **debe**
hacer, y para eso hace falta alguien que decida.

**Confundir precisión con volumen.** Cuarenta páginas no son más precisas que
dos. Suelen ser menos: nadie las lee enteras, se contradicen entre sí, y el
agente —que sí las lee enteras— se queda con una de las dos versiones.

**Dejar de revisar lo generado porque la spec era buena.** Esta es la peor. La
especificación acota lo que pediste, no garantiza lo que salió. Que el agente
tuviera buenas instrucciones no significa que las siguiera, y lo generado
sigue necesitando que alguien lo mire.

```figura
{ "tipo": "flujo", "titulo": "El ciclo que sí funciona",
  "pasos": [
    { "que": "Escribe el comportamiento", "nota": "con datos concretos y el caso de error" },
    { "que": "Genera desde ahí", "nota": "la spec es la entrada, no la documentación" },
    { "que": "Comprueba contra la spec, no contra el código", "nota": "si pruebas lo generado, validas la interpretación" },
    { "que": "Cuando cambie algo, cambia la spec primero", "tono": "bueno", "nota": "si cambias el código, vuelves al punto de partida" }
  ],
  "pie": "El cuarto paso es el que decide si esto dura o se deshace en tres sprints." }
```

Ese último paso es donde esto se gana o se pierde. El día que alguien arregla
algo tocando el código y no la especificación, el documento vuelve a ser una
foto vieja y estamos otra vez en 2010, pero con más código generado.

---

Lo que más gracia me hace de todo esto es que no hay nada nuevo en el consejo.
Escribe qué tiene que pasar, con precisión, antes de construirlo. Lo llevamos
diciendo desde siempre y nunca tuvimos un argumento lo bastante bueno.

Ahora lo hay, y es muy simple: **todo lo que no escribas con precisión lo va a
decidir una máquina que no conoce tu negocio, no pregunta, y va a hacerlo muy
rápido**.
