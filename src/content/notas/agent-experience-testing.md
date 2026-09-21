---
titulo: "Agent Experience Testing: qué se mide y cómo"
resumen: >-
  No mide lo listo que es el agente. Mide lo navegable que es tu sistema para
  él, y eso se cuenta en pasos, reintentos y tokens.
fecha: 2026-09-24
etiquetas: [Agentes, Automatización, Métricas]
portada: ax
---

Si aceptas que [parte de tus usuarios van a ser
agentes](/notas/tu-proximo-usuario-no-es-humano/), aparece una pregunta
práctica: cómo se prueba eso.

Y lo primero es aclarar qué **no** se está probando. No se evalúa al agente:
el agente es el instrumento, no el sujeto. Se evalúa **tu sistema visto desde
un agente**, igual que una prueba de usabilidad no evalúa a la persona que
participa.

## Las cuatro medidas

**Pasos hasta completar.** Cuántas acciones necesita desde la entrada hasta el
objetivo. Es la medida más simple y la más reveladora: si un humano compra en
seis pasos y el agente necesita catorce, esos ocho de diferencia son pantallas
que él no entendió a la primera.

**Reintentos.** Cuántas veces hizo algo, no obtuvo lo que esperaba y volvió a
intentarlo. Cada reintento señala un punto donde el sistema no dijo con
claridad qué había pasado.

**Tasa de finalización.** De diez intentos, en cuántos llega al final. Con
agentes esto no es determinista, y ahí está la información: si son diez de
diez, tu flujo es inequívoco; si son siete, hay tres caminos donde algo se
interpreta de más de una forma.

**Coste por recorrido.** Los tokens consumidos. Es la traducción a dinero de
todo lo anterior, y es el número que entiende cualquiera en una reunión.

## Cómo montarlo sin inventar nada

No hace falta una herramienta nueva. Con el MCP de Playwright, un agente
recorre tu aplicación de verdad —lee el árbol de accesibilidad, no una
captura— y tú registras lo que hizo.

El montaje mínimo:

1. **Define el objetivo en lenguaje natural**, como lo pediría alguien:
   «compra dos unidades del producto X y llega hasta la confirmación».
2. **Déjalo solo.** Sin pistas, sin selectores, sin decirle dónde está el
   botón. En cuanto ayudas, dejas de medir tu sistema y empiezas a medir tu
   ayuda.
3. **Registra la sesión**: acciones, reintentos, dónde se detuvo.
4. **Repite diez veces.** Una sola pasada no dice nada, porque no es
   determinista.
5. **Marca los puntos de fricción.** Donde se atascó más de una vez, hay un
   defecto de diseño, no un defecto del agente.

## Lo que vas a encontrar

Por lo que he visto hasta ahora, casi siempre lo mismo, y casi siempre cosas
que un humano ya estaba sorteando sin decir nada:

**Elementos sin nombre accesible.** El icono que todos entendemos y que para
él es un cuadrado.

**Confirmaciones implícitas.** La pantalla cambia de color, el número del
carrito sube. Nadie dice «producto añadido», así que no puede confirmarlo.

**Diálogos que aparecen sin avisar.** El aviso de cookies, la encuesta, la
promoción. Interrumpen y a veces lo descarrilan.

**Textos duplicados.** Tres «Continuar» en la misma pantalla.

**Estados de carga sin señal.** No sabe si esperar o si algo falló, así que
reintenta. Y reintentar cuesta.

## El umbral, como en todo lo demás

La misma regla que aplico al rendimiento: **el umbral sale de lo que hace hoy
tu sistema**, no de una cifra ideal. Mides el recorrido actual, lo conviertes
en la línea base, y la prueba protege que no empeore.

Si hoy son catorce pasos y ocho de cada diez terminan, eso es tu punto de
partida. Que la próxima versión no lo empeore ya es un objetivo útil, y se
puede poner en un pipeline.

---

Agent Experience Testing suena a disciplina nueva y en el fondo es la de
siempre: comprobar que el sistema se deja usar por quien tiene que usarlo. Lo
que cambió es quién es ese «quien».
