---
titulo: Gobernanza de IA en tres reglas que caben en una página
resumen: >-
  Nada de silos, una forma común de usarla y límites claros de propiedad
  intelectual. Todo lo demás son matices.
fecha: 2026-09-23
etiquetas: [IA, Liderazgo, Equipos]
portada: gobernanza
---

Casi todos los equipos que conozco pasaron por la misma secuencia: primero se
prohibió la IA, después se toleró, y ahora se usa sin que nadie sepa muy bien
cómo ni con qué.

Ese tercer estado parece libertad y en realidad es riesgo repartido. Tres
reglas lo ordenan sin montar un comité.

## Regla 1 · Nada de silos

Lo que más me encuentro: cada persona se armó su método. Uno tiene un prompt
buenísimo para generar casos desde un requisito, otra descubrió cómo hacer que
analice una traza, un tercero perdió dos semanas en algo que la primera ya
había resuelto.

El conocimiento se queda en el historial de chat de cada uno, que es el peor
sitio posible: no se busca, no se hereda y se pierde cuando esa persona cambia
de proyecto.

Lo que funciona es ridículamente simple: **un repositorio de prompts, en el
mismo sitio donde vive el código.** Versionado, con ejemplos de lo que
devuelve y una línea sobre cuándo usarlo. Quince minutos de disciplina que
convierten un truco personal en una capacidad del equipo.

## Regla 2 · Una forma común de usarla

Si cada uno usa una herramienta distinta con un criterio distinto, no se puede
revisar nada ni comparar nada.

Estandarizar no es imponer una marca. Es acordar cuatro cosas:

**En qué se usa y en qué no.** Generar borradores, sí. Decidir el alcance de
una regresión, no.

**Qué se revisa siempre.** Todo lo que toque producción o datos reales.

**Qué se puede subir a un modelo.** Esta es la que se salta a diario.

**Cómo se marca lo generado.** Saber qué escribió un modelo es lo que permite
revisarlo distinto, y dentro de un año, entender por qué está así.

## Regla 3 · Límites claros de propiedad intelectual

La parte aburrida, y la única que puede acabar en un problema legal.

Dos preguntas que hay que tener contestadas por escrito, no de palabra: **qué
datos pueden salir** —código propietario, datos de clientes, contratos,
credenciales; y en QA, muy en particular, los datos de producción que alguien
pega en un chat para depurar— y **de quién es lo que vuelve**, que depende del
proveedor y del plan contratado, y que en un cliente con auditoría van a
preguntar.

## El principio que sostiene las tres

**La IA propone; la persona decide si funciona.**

Suena a eslogan y es una regla operativa: significa que siempre hay un nombre
detrás de cada cosa que entra al repositorio. No «lo generó el modelo», sino
«yo lo revisé y lo firmo».

En cuanto eso se afloja, aparece código que nadie entiende, que nadie puede
explicar en una revisión, y que nadie sabe arreglar cuando falle a las tres de
la mañana.

---

Gobernar la IA no es frenarla. Es hacer que lo que aprende una persona lo
tenga el equipo, y que lo que entra al producto tenga a alguien que responda
por ello.
