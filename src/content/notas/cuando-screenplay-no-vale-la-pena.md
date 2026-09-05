---
titulo: Cuándo Screenplay no vale la pena
resumen: >-
  Llevo años usando el patrón y lo recomiendo, pero he visto equipos hundirse por
  adoptarlo antes de tiempo. Aquí está la línea donde deja de compensar.
fecha: 2026-09-05
etiquetas: [Screenplay, Arquitectura, Page Object]
---

Casi todo lo que se escribe sobre Screenplay lo defiende. Es lógico: quien se toma el
trabajo de escribir sobre un patrón suele ser quien acaba de tener una buena experiencia
con él.

El problema es que esa literatura deja fuera la pregunta que de verdad importa cuando estás
por empezar una suite: **¿me conviene a mí, hoy, con este equipo?** Y la respuesta muchas
veces es no.

## Qué resuelve realmente

Screenplay separa cuatro cosas que el Page Object mezcla en una: **quién** actúa, **qué**
quiere lograr, **cómo** se hace y **dónde** está el elemento.

```ts
// Page Object: la página sabe hacer cosas, y termina sabiendo demasiadas.
await loginPage.login('demo', 'demo123');

// Screenplay: quien sabe hacer cosas es el actor.
await ana.intenta(IniciarSesion.como('demo').conClave('demo123'));
```

Eso paga cuando esas cuatro cosas **cambian por motivos distintos y en momentos
distintos**. Un rediseño cambia los localizadores pero no la intención. Un segundo factor
cambia la tarea de login pero no los veinte tests que empiezan iniciando sesión. Si tienes
suficientes pruebas, esa independencia te ahorra semanas al año.

## Dónde está la línea

Mi regla, después de aplicarlo en banca, fintech y salud:

**Por debajo de unas cincuenta pruebas, el Page Object te alcanza.** Con ese volumen, el
costo de mantener no ha aparecido todavía, y la estructura extra de Screenplay solo agrega
archivos que recorrer. Vas a escribir cuatro clases para automatizar un login.

**Por encima de doscientas, y con más de una persona tocando la suite, la diferencia se
nota.** Ahí es donde el Page Object empieza a mostrar sus tres señales conocidas: clases de
mil líneas, métodos que devuelven otras páginas, y duplicación entre flujos que se parecen
pero no son iguales.

Entre cincuenta y doscientas está la zona gris, y ahí manda otra cosa: **cuánto va a durar
el proyecto**. Una suite que va a vivir tres años justifica la inversión. Una que acompaña
a un piloto de dos meses, no.

## Las tres señales de que adoptarlo ahora sería un error

**El equipo todavía no domina la herramienta.** Screenplay se monta *encima* de Playwright
o Selenium. Si la gente aún pelea con esperas, selectores o el modelo asíncrono, agregar
una capa de abstracción no simplifica: esconde. Y cuando algo falle, van a tener que
depurar dos cosas a la vez.

**Nadie va a mantener el estándar.** El patrón se sostiene sobre convenciones —qué es una
task y qué es una interaction, cuándo una question devuelve un valor y no un booleano—. Sin
alguien que revise, en tres meses tienes tasks que hacen clics y questions que afirman por
su cuenta. Eso es un Page Object con más archivos y peor nombre.

**Estás automatizando para salir del paso.** Si el objetivo es cubrir cuatro flujos antes
de una certificación y después nadie va a tocar esa suite, el mantenimiento futuro que
Screenplay optimiza sencillamente no existe.

## Lo que sí haría en cualquier caso

Aunque decidas quedarte con Page Objects, hay dos ideas del patrón que valen por separado y
no cuestan casi nada:

**Ponle nombre de negocio a los elementos.** Que el error diga «el botón "Ingresar" no
estaba habilitado» y no `locator('[data-testid=btn-login]') not enabled`. Con doscientas
pruebas, esa diferencia decide si el reporte lo puede leer alguien que no escribió la
suite.

**Haz que cada acción garantice su propio efecto.** Que "agregar tarea" no devuelva el
control hasta que la tarea aparece en pantalla. Así el fallo se reporta donde ocurrió y no
tres pasos después, que es donde se va la mitad del tiempo de diagnóstico.

Las dos se implementan en un Page Object sin cambiar de patrón.

## Y si decides adoptarlo

Hazlo con una suite nueva o con una migración por módulos, nunca convirtiendo todo de
golpe. Y escribe primero las tres o cuatro tasks que más se repiten —login, crear el
registro base, navegar al módulo—: son las que van a demostrar si el equipo entendió la
idea o solo está copiando la forma.

---

Mi implementación completa, con la explicación de cada decisión, está en
[playwright-screenplay-ts](https://github.com/Girek-Study/playwright-screenplay-ts). El
README incluye esta misma advertencia, porque un framework que no dice cuándo no usarlo
está vendiendo, no enseñando.
