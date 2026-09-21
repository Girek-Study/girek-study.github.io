---
titulo: El testing dejó de ser aislado y pasó a ser asistido
resumen: >-
  La IA cambió la velocidad, la escala y lo que cuesta automatizar. No cambió
  quién decide qué merece una prueba.
fecha: 2026-09-21
etiquetas: [IA, Quality Engineering, Criterio]
portada: copiloto
---

Durante quince años el trabajo de probar fue solitario. Uno leía el
requisito, pensaba los casos, los escribía, los automatizaba y los mantenía.
Todo el ciclo en la misma cabeza.

Eso se acabó, y conviene decirlo sin dramatismo: no porque la máquina piense
mejor, sino porque hace en segundos la parte que nos consumía las tardes.

## Lo que sí cambió

**La velocidad de arranque.** Reconocer una aplicación que no conoces costaba
dos días de clicar y tomar notas. Hoy un agente recorre los flujos y devuelve
el mapa mientras tú lees el requisito.

**El costo de automatizar.** El primer borrador de una prueba —el esqueleto,
los localizadores, la estructura del archivo— dejó de ser trabajo. Y cuando
algo cuesta la décima parte, se hace diez veces más.

**La escala de los datos.** Generar cien combinaciones con reglas cruzadas era
tedioso y mecánico, y por eso se hacía mal. Ahora no.

Ese cambio es real y quien lo niegue va a quedarse atrás. Pero viene con una
confusión que está costando cara.

## Lo que no cambió

La máquina acelera la ejecución. **No decide qué merece ejecutarse.**

Un modelo te escribe treinta pruebas de un formulario. Ninguna de las treinta
sabe que ese formulario alimenta el cálculo de una comisión, que la comisión
se liquida los viernes, y que el error que de verdad duele aparece cuando el
viernes es feriado.

Eso no está en el código ni en el requisito. Está en que alguien lleva seis
meses en ese producto y escuchó al de negocio quejarse una vez.

Tres cosas siguen siendo humanas, y no por romanticismo:

**Decidir qué probar.** El riesgo se prioriza con contexto, no con
estadística.

**Interpretar un fallo.** Una diferencia no es un defecto. Distinguirlas es
criterio, y esa distinción decide si alguien pierde una tarde.

**Defender una decisión.** «No está listo» se sostiene ante una persona que
quiere salir hoy. Ningún informe lo hace por ti.

## El riesgo de la mezcla

Lo que veo este año, y no en un equipo ni en dos: suites que crecieron el
triple en seis meses y siguen sin atrapar los defectos que llegan a
producción.

Se automatizó más porque automatizar salía barato. No se pensó más, porque
pensar sigue costando lo mismo.

La proporción se invirtió. Antes, de cada diez horas, ocho eran teclear y dos
decidir. Ahora teclear son dos, y lo honesto sería dedicar las ocho restantes
a decidir mejor. Lo que suele pasar es que se dedican a teclear más.

---

El testing asistido no es el que produce más pruebas. Es el que dedica a
pensar el tiempo que la máquina le devolvió.
