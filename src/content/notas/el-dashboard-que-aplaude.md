---
titulo: El dashboard que aplaude y el que incomoda
resumen: >-
  Hay indicadores que existen para que la reunión salga bien. Se reconocen
  porque nunca han obligado a cambiar una decisión.
fecha: 2026-09-22
etiquetas: [Métricas, Liderazgo, Calidad]
portada: vanidad
---

Ya escribí sobre [qué métricas de QA no dicen
nada](/notas/las-metricas-de-qa-que-no-dicen-nada/). Esta es la otra mitad del
problema, que es política y no técnica: **para quién se construye el
tablero**.

Una métrica vanidosa no es la que está mal calculada. Es la que está
perfectamente calculada para que nadie tenga que hacer nada distinto.

## Cómo se reconoce una

Un truco que funciona siempre: **busca la última vez que ese número cambió una
decisión**.

Si el porcentaje de cobertura lleva dos años en el informe mensual y jamás
retrasó una salida, ni asignó una persona, ni abrió una conversación
incómoda, no es un indicador. Es decoración.

Los síntomas son bastante reconocibles:

**Solo sube.** Casos automatizados, pruebas ejecutadas, cobertura. Números que
por construcción crecen, y crecer se lee como mejorar.

**Nadie pregunta por el denominador.** «Automatizamos 340 casos» impresiona
hasta que alguien pregunta de cuántos, y sobre todo, de cuántos que importen.

**Se presentan en verde.** Si el tablero lleva un año sin un rojo, o el
producto es perfecto o el tablero está mirando hacia otro lado.

## Por qué existen, que es lo que casi nadie dice

No aparecen por ignorancia. Aparecen porque **cumplen una función**.

Cuando a un equipo se le pide velocidad por encima de todo, la calidad
necesita justificar que existe. Y la forma más rápida de justificarse es
mostrar actividad: mira cuánto hemos hecho.

El problema es que mostrar actividad y mostrar resultado son cosas distintas,
y la primera es infinitamente más fácil. Un equipo puede pasarse un trimestre
subiendo indicadores mientras la calidad real baja, y el tablero no se entera.

## Lo que sí incomoda

Un indicador útil tiene una propiedad que lo delata: **puede ponerse en rojo
por culpa de una decisión que alguien tomó en esa sala**.

Los defectos que llegaron a producción se ponen feos cuando se recorta el
tiempo de pruebas. El tiempo que la suite pasa en rojo se pone feo cuando se
aprueba con el pipeline roto. Esos números incomodan, y por eso informan.

Y sí: por eso mismo cuesta más que los acepten.

## Cómo se cambia esto sin perder la reunión

No quitando el tablero de golpe. Lo que me ha funcionado:

**Deja los de siempre y añade uno bueno.** Sin discurso. Dos o tres meses de
tendencia y el número nuevo empieza a hacer preguntas solo.

**Ponle al lado la consecuencia.** No «doce defectos escapados», sino «doce
escapados, de los cuales cuatro llegaron a afectar a clientes». El segundo
cambia la conversación.

**Y prepárate para el primer rojo.** Va a llegar en mal momento y va a
señalar una decisión que alguien de la sala tomó. Ese día se decide si la
métrica sobrevive o se convierte en decoración como las demás.

---

El tablero que aplaude se defiende solo, porque a nadie le molesta. Al que
incomoda hay que defenderlo, y eso ya es parte del trabajo.
