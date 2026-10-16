---
titulo: Qué resuelve cada framework de agentes, y cuándo no necesitas ninguno
resumen: >-
  LangGraph, CrewAI, AutoGen, MCP. No compiten entre sí tanto como parece:
  resuelven problemas distintos, y en la mitad de los casos el problema que
  tienes no es ninguno de ellos.
fecha: 2026-10-26
etiquetas: [Agentes, Herramientas, Criterio]
portada: frameworks
---

Cada vez que alguien monta su primer agente aparece la misma pregunta: **¿qué
framework uso?**

Y casi siempre es la segunda pregunta, hecha antes que la primera. La primera
es qué problema tienes, porque estas herramientas no compiten entre sí tanto
como sugiere la lista en la que te las encuentras: **resuelven cosas
distintas**, y algunas se usan juntas.

Aviso de caducidad: esto es octubre de 2026 y este terreno se mueve rápido.
Lo que no caduca es el criterio para elegir, así que es a lo que dedico la
nota.

## Lo primero: ¿necesitas uno?

```figura
{ "tipo": "comparar", "titulo": "Dos cosas que se llaman igual",
  "izq": { "rotulo": "Lo que mucha gente necesita",
    "lineas": [
      "Una llamada al modelo",
      "Con unos documentos delante",
      "Y un par de funciones que puede invocar"
    ],
    "pie": "Esto son cincuenta líneas con el SDK. Sin framework." },
  "der": { "rotulo": "Lo que resuelve un framework",
    "lineas": [
      "Varios pasos con *estado* entre ellos",
      "Que se reanudan si algo falla",
      "Con control de a dónde va cada rama"
    ],
    "pie": "Aquí sí: montarlo a mano acaba siendo un framework peor." } }
```

La prueba que uso: **si puedes dibujar lo que hace en una línea recta, no
necesitas un framework.** Prompt → modelo → respuesta, con una función por
medio, es código normal. Meter una capa de orquestación ahí añade conceptos,
dependencias y una forma nueva de que algo falle, a cambio de nada.

El framework empieza a pagar cuando hay **estado entre pasos** y el proceso
puede fallar a la mitad.

## Qué resuelve cada uno

```figura
{ "tipo": "matriz", "titulo": "No son alternativas; son capas distintas",
  "celdas": [
    { "rotulo": "LangGraph", "que": "Control de flujo con estado. Tú dibujas el grafo: qué nodo va después de cuál, qué se guarda entre pasos, dónde se puede reanudar.", "tono": "alta" },
    { "rotulo": "CrewAI", "que": "Reparto por roles. Varios agentes con un papel cada uno y una tarea que se pasan. Se monta rapidísimo." },
    { "rotulo": "AutoGen", "que": "Conversación entre agentes. Dialogan hasta converger, con un humano que puede entrar en el bucle." },
    { "rotulo": "MCP", "que": "No es un framework: es el protocolo para exponer herramientas y datos. Se usa CON los otros, no en vez de.", "tono": "baja" }
  ],
  "pie": "La confusión más común es tratar MCP como competidor de los otros tres. Está en otra capa." }
```

Ese último merece el matiz, porque es el que más se malinterpreta. **MCP
resuelve el problema de integración**: cómo le das a un agente acceso a tu
sistema de ficheros, a tu base de datos o a tu gestor de incidencias sin
escribir un adaptador distinto para cada herramienta y cada cliente. Si lo
expones una vez por MCP, lo consume cualquiera que hable ese protocolo.

## El criterio con el que elijo

```figura
{ "tipo": "flujo", "titulo": "Cuatro preguntas, en este orden",
  "pasos": [
    { "que": "¿Hay estado entre pasos?", "nota": "si no, no hay framework que haga falta" },
    { "que": "¿Necesitas reanudar tras un fallo?", "nota": "esto solo lo da un grafo con estado persistido" },
    { "que": "¿El flujo lo decides tú o el modelo?", "nota": "lo primero es un grafo; lo segundo, una conversación" },
    { "que": "¿Quién va a mantenerlo dentro de un año?", "tono": "bueno", "nota": "la pregunta que más decisiones ha salvado" }
  ] }
```

La tercera es la que más separa, y la que menos se piensa.

**Si el flujo lo decides tú** —primero analiza, luego valida, si falla la
validación vuelve al análisis— lo que quieres es un grafo. Es explícito, se
dibuja, se prueba por nodos y cuando falla sabes dónde.

**Si el flujo lo decide el modelo** —que los agentes hablen hasta ponerse de
acuerdo— ganas flexibilidad y pierdes previsibilidad. Y esa pérdida la pagas
al depurar: un diálogo de treinta turnos que acaba mal no te dice en qué turno
se torció.

Yo tiendo al grafo salvo que tenga una razón concreta para lo otro. No por
elegancia: porque **lo que puedo dibujar lo puedo probar**.

## Lo que ninguno te resuelve

Esta es la parte que no sale en los comparativos y la que decide si el
proyecto llega a producción:

```figura
{ "tipo": "marcas", "titulo": "Lo que sigue siendo tuyo elijas lo que elijas",
  "filas": [
    { "vale": false, "que": "Decidir cuándo parar", "porque": "el tope de pasos y de gasto lo pones tú; ninguno trae uno sensato de serie" },
    { "vale": false, "que": "Saber si acertó", "porque": "ejecutan el flujo, no evalúan el resultado; eso es tu suite" },
    { "vale": false, "que": "Los permisos de cada herramienta", "porque": "el framework la llama; qué puede tocar lo decides tú" },
    { "vale": false, "que": "La calidad del contexto", "porque": "con basura dentro, el grafo más bonito produce basura ordenada" },
    { "vale": true, "que": "La fontanería de la orquestación", "porque": "esto sí, y es mucho: estado, reanudación, trazas, paralelismo" }
  ] }
```

La segunda es la que más proyectos frena. Montas el flujo en dos tardes y
luego descubres que no tienes forma de saber si lo que produce es correcto. Y
ahí no hay framework: hay casos de prueba, datos y aserciones. Lo conté en
[de un modelo que escribe a un sistema que
ejecuta](/notas/de-llm-a-agentes-en-testing/).

## Cómo lo decidiría hoy

Sin ceremonia, y en este orden:

```figura
{ "tipo": "capas", "titulo": "Del caso simple al complicado",
  "capas": [
    { "n": "1", "que": "Una llamada con herramientas, en el SDK. Sin framework. La mayoría se queda aquí." },
    { "n": "2", "que": "Varios pasos con estado y reanudación: un grafo." },
    { "n": "3", "que": "Herramientas que varios clientes reutilizan: exponerlas por MCP." },
    { "n": "4", "que": "Varios papeles coordinados y el flujo ya está claro: reparto por roles." },
    { "n": "5", "que": "Que el modelo decida el flujo: solo con una razón concreta y presupuesto para depurarlo.", "tono": "clave" }
  ],
  "pie": "Subir un escalón sin necesitarlo añade una capa que hay que mantener y una forma más de fallar." }
```

Y una advertencia que vale más que la elección: **no empieces por el escalón
cinco porque es el que sale en las conferencias.** Los sistemas multiagente
dan demostraciones espectaculares y producciones frágiles. Empieza por lo
simple, que se rompa, y sube cuando el dolor te diga por dónde.

---

La pregunta «qué framework uso» casi siempre esconde otra: **qué estoy
construyendo exactamente**. Cuando esa segunda está contestada, la primera se
cae sola, y la mitad de las veces la respuesta es ninguno.

Lo que no se cae nunca, porque no lo trae ninguna de estas herramientas: saber
cuándo parar, cómo comprobar que acertó, y qué tiene permiso para tocar.
