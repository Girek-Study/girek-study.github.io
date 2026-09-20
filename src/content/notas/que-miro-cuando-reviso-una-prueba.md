---
titulo: Lo que miro cuando reviso la prueba de otro
resumen: >-
  La revisión de código de pruebas casi siempre se despacha con un «LGTM».
  Estas son las nueve cosas que sí miro, en el orden en que las miro.
fecha: 2026-09-20
etiquetas: [Buenas prácticas, Automatización, Equipos]
portada: revision
---

El código de producción se revisa con lupa. El de las pruebas se aprueba con
un «LGTM» y un pulgar arriba.

Luego esa suite tarda cuarenta minutos, falla tres veces por semana sin
motivo, y nadie sabe por qué existe la mitad de sus casos. No pasó de golpe:
pasó una revisión a la vez.

Esta es mi lista, en el orden en que la recorro. Las tres primeras deciden si
la prueba debería existir; las demás, si va a durar.

## 1 · ¿Qué riesgo cubre?

Lo primero no es el código, es el nombre. `test('flujo completo')` no dice
nada: dentro de un año, cuando se ponga rojo, alguien va a tener que leerse
las cuarenta líneas para saber qué se rompió.

Si no puedo decir en una frase qué defecto atraparía esta prueba, devuelvo el
pull request. No por purismo: es que si no se sabe qué cubre, tampoco se sabrá
si sobra cuando haya que limpiar.

## 2 · ¿Está al nivel correcto?

La pregunta es si algo de lo que hace por la interfaz podría hacerse por API.
Una prueba que navega tres pantallas para llegar a validar una regla de
negocio está pagando treinta segundos y tres puntos de fractura por algo que
una llamada resuelve.

**Por la interfaz, solo lo que solo se ve en la interfaz.**

## 3 · ¿Duplica algo que ya existe?

La suite crece porque nadie busca antes de escribir. Dos pruebas del mismo
riesgo no dan el doble de confianza: dan el doble de mantenimiento y el doble
de rojos cuando eso cambie.

## 4 · Los localizadores

Lo que quiero ver: rol y nombre accesible, o un `data-testid` puesto a
propósito. Lo que rechazo: cadenas de CSS que recorren la estructura
(`div > div:nth-child(3) > span`) y XPath de siete niveles.

El criterio es una pregunta: **si mañana rediseñan esta pantalla sin cambiar
lo que hace, ¿esta prueba sigue pasando?** Con un `nth-child`, no.

## 5 · Las esperas

Cualquier espera por tiempo es una marca roja. `waitForTimeout` en medio de
una prueba dice «aquí no supe por qué esperar», y ese número se queda corto el
día que el entorno vaya lento.

Se espera por condición: que el elemento sea visible, que la petición termine,
que el texto cambie. Si de verdad no hay condición que esperar, el problema
está en la aplicación y merece una conversación, no un sleep.

## 6 · Los datos

¿De dónde sale lo que usa? Si es un usuario fijo escrito en el código, ya sé
que esta prueba va a chocar con otra en cuanto suban los workers.

Que cada prueba cree lo suyo, por API, y lo limpie o no le haga falta
limpiarlo.

## 7 · Qué comprueba de verdad

Aquí aparece la prueba fantasma. Recorre cinco pantallas, hace diez clics y
termina con un `expect(page).toBeTruthy()` o directamente sin comprobar nada.

Esa prueba pasa en verde con el backend caído. La pregunta de la revisión es:
**¿qué tendría que romperse para que esto fallara?** Si la respuesta es «que
la página no cargue», no es una prueba, es una visita.

También miro lo contrario: veinte aserciones seguidas. Cuando falla la
tercera, las diecisiete siguientes no se ejecutan y el informe cuenta media
historia.

## 8 · Qué dice cuando falla

Leo el mensaje que va a salir en el pipeline a las tres de la tarde de un
martes. `expect(recibido).toBe(esperado)` con dos objetos enormes obliga a
reproducir en local para entender qué pasó.

Un mensaje que nombra el negocio —«el saldo tras la transferencia no
descontó la comisión»— ahorra media hora a alguien que no escribió la prueba.

## 9 · ¿Se entiende en un minuto?

Lo último. Abro la prueba como si la viera por primera vez dentro de un año.
Si tengo que saltar a cuatro archivos para saber qué hace, no se va a
mantener: se va a reescribir.

Aquí soy menos estricto de lo que era. He visto suites con una abstracción
tan elegante que nadie del equipo sabía usarla, y eso es peor que un poco de
repetición.

---

Casi nada de esta lista es sobre si el código está bien escrito. Es sobre si
esa prueba, dentro de un año, va a estar diciendo la verdad o va a estar
gastando minutos y credibilidad.

Una revisión de pruebas hecha en serio cuesta diez minutos. Saltársela cuesta
la confianza en la suite, y eso se paga durante años.
