---
titulo: "Orquestar a mano o gestionar el estado: lo que cambia al probarlo"
resumen: >-
  La diferencia entre encadenar pasos y modelar un grafo con estado no es de
  estilo. Decide si el sistema se puede reproducir, observar y probar.
fecha: 2026-09-25
etiquetas: [Agentes, IA, Arquitectura]
portada: grafo
---

Cuando un equipo pasa de «llamamos a un modelo» a «tenemos un agente que hace
cosas», aparece una decisión de arquitectura que casi siempre se toma sin
consultar a quien va a probarlo: **quién gestiona el estado**.

Hay dos formas. Encadenar los pasos y llevar el estado a mano, o modelar el
flujo como un grafo donde el estado es parte de la máquina. La segunda es la
que propone LangGraph frente al encadenado clásico de LangChain, y la
diferencia se nota mucho más en las pruebas que en el desarrollo.

## Lo que ve quien prueba una cadena manual

En el encadenado, cada paso recibe, transforma y pasa. El estado vive donde
alguien decidió ponerlo: una variable, un diccionario que crece, a veces una
base. Los reintentos se escriben paso a paso, y cada paso los resuelve un
poco distinto.

Eso, al probarlo, se traduce en tres problemas concretos:

**No puedes entrar por el medio.** Para probar el paso 4 tienes que recorrer
1, 2 y 3, con sus llamadas al modelo, su tiempo y su no determinismo. Un fallo
en el paso 4 cuesta minutos por intento.

**No sabes en qué estado estaba.** Cuando falla, tienes la excepción y poco
más. Reconstruir qué había en memoria en ese momento es arqueología.

**Los reintentos mienten.** Si cada paso reintenta a su manera, una ejecución
«correcta» puede haber repetido tres veces por dentro. Eso se paga en tokens
y no aparece en ningún sitio.

## Lo que cambia con el estado gestionado

Cuando el flujo es un grafo con estado explícito y puntos de control, aparecen
tres cosas que para QA son oro:

**El estado es un dato, no un efecto.** Se puede leer, guardar y comparar. Una
prueba puede afirmar sobre el estado tras cada nodo, no solo sobre la salida
final.

**Se puede arrancar desde un punto de control.** Probar el nodo 4 es cargar el
estado que dejó el 3 y ejecutar solo ese. Sin llamadas de más, sin esperar, y
con el mismo punto de partida siempre. Esa es la diferencia entre una prueba
de dos minutos y una de dos segundos.

**Los caminos son enumerables.** Un grafo dibuja las bifurcaciones. Y unas
bifurcaciones dibujadas son exactamente lo que necesitas para el diseño de
casos: cada arista condicional es un caso, y las que nadie recorre nunca
saltan a la vista.

## Lo que no arregla ninguna de las dos

Conviene no venderlo de más. **El no determinismo sigue ahí.** El modelo puede
decidir distinto con la misma entrada, y ninguna arquitectura lo cambia.

Lo que sí cambia es que, con el estado gestionado, cuando decide distinto
puedes ver **dónde** se bifurcó y **con qué** contexto. Con el estado disperso,
solo ves que el resultado fue otro.

Y esa es toda la diferencia entre un defecto que se investiga y uno que se
cierra como «no reproducible».

## La pregunta que haría en el diseño

Si te sientan en la mesa donde se decide esto —y deberías pedir que te
sienten— hay una pregunta que ordena la conversación:

**«Cuando esto falle en producción, ¿qué vamos a poder ver?»**

Si la respuesta es «los logs que hayamos puesto», el estado está disperso y
vas a depurar a ciegas. Si es «el estado en cada nodo hasta el que falló», se
puede trabajar.

Esa pregunta, hecha antes de construir, vale más que cualquier suite que
escribas después.

---

La discusión se presenta como una de frameworks y es una de observabilidad. Lo
que no puedes observar no lo puedes probar, y con agentes eso se nota el
primer día.
