---
titulo: Empieza por el criterio; el código viene después
resumen: >-
  Abrir el editor y escribir test('login exitoso') es empezar por el final.
  Antes hay cuatro decisiones, y son las que deciden si la prueba sirve.
fecha: 2026-09-19
etiquetas: [Criterio, Automatización, Playwright]
portada: traducir
---

La escena se repite. Llega la tarea «automatizar el login», se abre el editor
y la primera línea que se escribe es `test('login exitoso')`.

Esa prueba va a existir durante años. Va a correr miles de veces. Y nadie
decidió si valía la pena.

Automatizar es el último paso de una cadena de cuatro decisiones. Cuando se
salta la cadena, sale lo de siempre: una suite grande que nadie mira, con la
pantalla cubierta al noventa por ciento y los defectos apareciendo igual en
producción.

## Decisión 1 · Qué puede salir mal

No «qué hace la pantalla», sino **qué puede salir mal aquí**. Es otra
pregunta y da otra lista.

Para un login, la pantalla hace: escribir usuario, escribir clave, pulsar
entrar. Tres cosas. Lo que puede salir mal es otra cosa:

- Entra alguien que no debería.
- No entra alguien que sí debería.
- La sesión se queda abierta cuando no toca.
- La clave viaja o se guarda donde no debe.
- Tras cinco intentos fallidos no se bloquea nada.

Fíjate en que el «login exitoso» de la tarea original es **uno solo** de esos,
y probablemente el menos interesante: es el que falla más escandalosamente y
por tanto el que se descubre solo.

## Decisión 2 · Cuál de esos importa

No todos merecen una prueba automática. Dos preguntas por riesgo: **qué pasa
si ocurre** y **cada cuánto puede ocurrir**.

«Entra alguien que no debería» es catastrófico y además silencioso: nadie lo
reporta. Ese va sí o sí. «El texto del botón cambió» se ve en cuanto alguien
abre la pantalla; ese no merece una prueba.

En banca la pregunta que zanjaba la discusión era: *si esto falla el sábado a
las tres de la mañana, ¿me llaman?* Si la respuesta es sí, se automatiza.

## Decisión 3 · A qué nivel se prueba

Aquí se desperdicia la mitad del esfuerzo de los equipos. El mismo riesgo
cuesta diez veces más arriba que abajo.

«Bloquea tras cinco intentos» no necesita navegador: es una regla, y se prueba
con cinco llamadas a la API en dos segundos. Por la interfaz son cuarenta
segundos y cinco formularios que pueden fallar por motivos que no tienen que
ver.

La regla que uso: **por la interfaz solo lo que solo se puede ver en la
interfaz.** Que el mensaje de error aparezca, que el foco vuelva al campo, que
el botón se deshabilite. Todo lo demás, más abajo.

## Decisión 4 · Cuál es la señal

Antes de escribir nada: **¿qué tendría que ver para saber que falló?**

Si la respuesta es «que no dé error», la prueba no sirve. Esa es la que pasa
en verde con el backend caído.

Para «no entra quien no debe», la señal no es que aparezca un mensaje: es que
**no exista sesión**. El mensaje es cosmética; la cookie es el hecho.

## Y ahora sí, el código

Las cuatro decisiones ya escribieron la prueba. Lo que queda es teclearla:

```ts
// Riesgo: entra alguien que no debería. Señal: no hay sesión, mire lo que
// mire la pantalla. Nivel: API, porque no depende de la interfaz.
test('una clave incorrecta no abre sesión', async ({ request }) => {
  const respuesta = await request.post('/api/sesion', {
    data: { usuario: cuenta.usuario, clave: 'la-que-no-es' },
  });

  expect(respuesta.status()).toBe(401);
  // Lo que de verdad importa: que no haya cookie de sesión.
  expect(respuesta.headers()['set-cookie'] ?? '').not.toContain('sesion=');
});
```

Compara ese nombre con `test('login exitoso')`. El primero dice el riesgo que
cubre; el segundo, la pantalla que toca. Dentro de un año, cuando falle, el
primero te dice en una línea qué se rompió.

## El atajo que no lo es

«Esto es mucho análisis para una prueba». Lo parece hasta que lo haces dos
veces: las cuatro decisiones tardan diez minutos y casi siempre **reducen** el
número de pruebas que escribes.

Y hay un motivo nuevo para hacerlo bien. Un modelo escribe el código de la
prueba mejor y más rápido que tú. Lo que no puede es decidir qué merece una
prueba, a qué nivel y cuál es la señal. Justo las cuatro decisiones.

Cuanto más barato es el código, más vale el criterio que decide qué código
escribir.

---

Una prueba no empieza en el editor. Empieza cuando alguien decide qué es lo
que no puede fallar.
