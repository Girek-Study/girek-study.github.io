---
titulo: Cuándo Screenplay no vale la pena
resumen: >-
  Llevo años usando el patrón y lo recomiendo, pero he visto equipos hundirse por
  adoptarlo antes de tiempo. Aquí está la línea donde deja de compensar.
fecha: 2026-09-05
etiquetas: [Screenplay, Arquitectura, Page Object]
portada: capas
codigo:
  repo: playwright-screenplay-ts
  titulo: Las cuatro capas, en código
  archivos:
    - ruta: src/screenplay/Actor.ts
      que: El actor que sostiene las habilidades y ejecuta las tareas
    - ruta: src/tasks/IniciarSesion.ts
      que: La tarea del ejemplo, separada de cómo se hace
    - ruta: src/screens/LoginScreen.ts
      que: Los localizadores con nombre de negocio, no con selector
    - ruta: src/tasks/AgregarTarea.ts
      que: Una acción que no devuelve el control hasta garantizar su efecto
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

<figure class="pieza">
<p class="pieza-titulo">Dónde vive cada responsabilidad</p>
<div class="comparativa">
<div class="lado es-flojo">
<p class="lado-rotulo">Page Object</p>
<p class="lado-titulo">Las cuatro en la misma clase</p>
<div class="bloque-mezcla">
<div class="capa"><span class="capa-marca">Quién</span> el propio test</div>
<div class="capa"><span class="capa-marca">Qué</span> iniciar sesión</div>
<div class="capa"><span class="capa-marca">Cómo</span> escribir y pulsar</div>
<div class="capa"><span class="capa-marca">Dónde</span> los selectores</div>
</div>
<p class="bloque-mezcla-pie">cualquier cambio toca el mismo archivo</p>
</div>
<div class="lado es-bueno">
<p class="lado-rotulo">Screenplay</p>
<p class="lado-titulo">Cada una en su capa</p>
<div class="pila">
<div class="capa"><span class="capa-marca">Actor</span> Ana</div>
<div class="capa"><span class="capa-marca">Tarea</span> IniciarSesion</div>
<div class="capa"><span class="capa-marca">Interacción</span> Escribir, Pulsar</div>
<div class="capa"><span class="capa-marca">Localizador</span> CampoUsuario</div>
</div>
<p class="bloque-mezcla-pie">cada cambio toca solo su capa</p>
</div>
</div>
<figcaption>Un rediseño mueve la capa de abajo. Un segundo factor mueve la tarea. Ninguno de los dos obliga a tocar los veinte tests que empiezan iniciando sesión.</figcaption>
</figure>

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

```figura
{
  "tipo": "matriz",
  "titulo": "Dónde el patrón paga y dónde estorba",
  "ejeY": "tamaño de la suite",
  "ejeX": "rotación del equipo",
  "celdas": [
    {
      "rotulo": "Suite grande · equipo que rota",
      "que": "Aquí *paga*: la estructura sostiene lo que la memoria no.",
      "tono": "baja"
    },
    {
      "rotulo": "Suite grande · equipo estable",
      "que": "Paga a medias. Conviene, pero sin prisa."
    },
    {
      "rotulo": "Suite pequeña · equipo que rota",
      "que": "Antes que el patrón, convenciones y revisión."
    },
    {
      "rotulo": "Suite pequeña · equipo estable",
      "que": "Adoptarlo ahora es *ceremonia*: cuesta más de lo que ordena.",
      "tono": "alta"
    }
  ]
}
```

## Dónde está la línea

Mi regla, después de aplicarlo en banca, fintech y salud:

<figure class="pieza">
<div class="regla-volumen">
<p class="pieza-titulo">Cuándo compensa, por volumen de pruebas</p>
<div class="tramos">
<span class="tramo es-uno"></span>
<span class="tramo es-dos"></span>
<span class="tramo es-tres"></span>
</div>
<div class="marcas">
<span class="marca">0</span>
<span class="marca">50</span>
<span class="marca">200 o más</span>
</div>
<div class="zonas">
<div class="zona es-uno">
<p class="zona-titulo">Page Object alcanza</p>
<p>El costo de mantener todavía no apareció. Screenplay solo agrega archivos que recorrer.</p>
</div>
<div class="zona es-dos">
<p class="zona-titulo">Zona gris</p>
<p>Aquí no manda el volumen, manda cuánto va a durar el proyecto. Tres años lo justifican; un piloto de dos meses, no.</p>
</div>
<div class="zona es-tres">
<p class="zona-titulo">La diferencia se nota</p>
<p>Con más de una persona tocando la suite, el Page Object empieza a mostrar clases de mil líneas y duplicación entre flujos parecidos.</p>
</div>
</div>
</div>
<figcaption>La regla después de aplicarlo en banca, fintech y salud. No es una ley: es dónde he visto que se cruza la línea.</figcaption>
</figure>

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

<aside class="aviso pieza">
<span class="aviso-icono"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2 20.5 6v6.1c0 4.4-3.5 7.5-8.5 8.7-5-1.2-8.5-4.3-8.5-8.7V6L12 3.2Z"/><path d="m8.8 12 2.3 2.3 4.1-4.4"/></svg></span>
<div>
<span class="aviso-rotulo">La prueba de fuego</span>
<p>Si el equipo todavía pelea con esperas y selectores, o si nadie va a revisar el estándar, la respuesta es no. Screenplay no simplifica una herramienta que aún no se domina: la esconde detrás de otra capa.</p>
</div>
</aside>

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

Mi implementación completa, con la explicación de cada decisión, está abajo. El README
incluye esta misma advertencia, porque un framework que no dice cuándo no usarlo está
vendiendo, no enseñando.
