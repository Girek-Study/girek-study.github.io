---
titulo: Ninguna suite de automatización muere por cómo está escrita
resumen: >-
  Las listas de buenas prácticas hablan de código. Llevo diez años viendo morir
  suites y ninguna murió de eso: mueren de tiempo, de reintentos y de no tener
  dueño.
fecha: 2026-10-04
etiquetas: [Automatización, CI/CD, Equipos]
portada: pulso
---

Si buscas buenas prácticas de automatización vas a encontrar siempre la misma
lista. Page Object. Nombres descriptivos. No repetir código. Pruebas
independientes. Localizadores estables.

No está mal. Yo firmo casi todo.

Pero llevo diez años entrando en suites que otros montaron, y he visto morir
unas cuantas. **Ninguna murió de eso.** Las he visto morir con el Page Object
impecable, los nombres perfectos y cero duplicación: muertas igual, archivadas
en un repositorio que nadie clona.

```figura
{ "tipo": "comparar", "titulo": "Lo que sale en las listas y lo que de verdad mata",
  "izq": { "rotulo": "Lo que todas las listas dicen",
    "lineas": [
      "Page Object bien hecho",
      "Nombres descriptivos",
      "No repetir código",
      "Localizadores estables"
    ],
    "pie": "Todo esto es de cómo está escrita la prueba." },
  "der": { "rotulo": "De lo que se muere en realidad",
    "lineas": [
      "Tarda tanto que nadie la espera",
      "Reintenta hasta ponerse verde",
      "Nadie es su dueño",
      "No bloquea nada cuando falla"
    ],
    "pie": "Nada de esto se arregla escribiendo mejor la prueba." } }
```

La diferencia entre las dos columnas es esta: la de la izquierda decide si tu
suite es **agradable de mantener**. La de la derecha decide si **sigue viva
dentro de un año**. Y casi todo lo que se publica es de la izquierda.

Estas son las cinco de la derecha.

## 1 · Corre en cada cambio, y bloquea

Es la primera porque todas las demás dependen de ella.

Una suite que hay que lanzar a mano ya está muerta, solo que todavía no lo
sabe. Primero se lanza antes de cada entrega. Luego antes de las entregas
grandes. Luego cuando alguien se acuerda. Luego nunca. No hay una decisión de
matarla: hay un goteo.

Y correr no basta: tiene que **bloquear**. Una suite que informa pero no
detiene nada es un informe, y los informes se leen cuando hay tiempo.

```figura
{ "tipo": "capas", "titulo": "El mismo defecto, según dónde lo encuentres",
  "capas": [
    { "n": "1", "que": "En el PR: lo arregla quien lo escribió, con el contexto fresco. Minutos." },
    { "n": "2", "que": "En la rama principal: ya bloquea a otros. Horas, y alguien cambia de tarea." },
    { "n": "3", "que": "En preproducción: entra el ciclo de reportar, priorizar y planificar. Días." },
    { "n": "4", "que": "En producción: más la llamada del cliente, el parche urgente y la confianza.", "tono": "techo" }
  ],
  "pie": "No hace falta ningún multiplicador de manual: la diferencia se ve a simple vista." }
```

Lo que más me ha costado defender en las reuniones no es técnico: es que
bloquear molesta. Y es exactamente para eso.

## 2 · Tiene un presupuesto de tiempo, y se respeta

Esta es la que más suites he visto salvar, y casi nunca aparece en las listas.

**Ponle un número a lo que puede tardar.** El mío son diez minutos para lo que
corre en cada cambio. No sale de ningún estudio: sale de que diez minutos es
lo que alguien aguanta mirando un pipeline antes de irse a otra cosa. Cuando
se va, el resultado le llega cuando ya está pensando en otro problema, y ahí
el coste deja de ser el tiempo de la suite y pasa a ser el cambio de contexto.

Lo importante es qué pasa cuando se pasa del presupuesto. La respuesta que
funciona no es «aguanta»: es **tratarlo como un fallo**. Si la suite tarda
quince minutos, hay una tarea, igual que si hubiera un defecto.

Y las palancas, por orden de lo que rinden:

```figura
{ "tipo": "flujo", "titulo": "Cuando la suite se pasa del presupuesto",
  "pasos": [
    { "que": "Paralelizar", "nota": "lo primero, y lo que obliga a que cada prueba tenga su dato" },
    { "que": "Bajar de nivel lo que no necesita navegador", "nota": "la mitad de una suite de interfaz suele ser API disfrazada" },
    { "que": "Borrar lo que duplica", "nota": "ocho pruebas que recorren el mismo camino con otro dato" },
    { "que": "Partir en dos: la que bloquea y la nocturna", "tono": "bueno", "nota": "el último recurso, no el primero" }
  ],
  "pie": "El orden importa: partir en dos es lo primero que todo el mundo propone y lo que menos arregla." }
```

Parto en dos solo al final porque lo que se va a la tanda nocturna deja de
mirarse a las tres semanas. Es una forma elegante de borrar pruebas sin
decirlo.

## 3 · Cero reintentos

Aquí va la parte incómoda, porque esto que viene lo recomienda casi todo el
mundo y viene puesto de serie en las herramientas.

**El reintento automático es la peor buena práctica de la industria.**

El argumento a favor se entiende: la red parpadea, el entorno tarda, y repetir
evita que alguien pierda media hora investigando algo que no era. De acuerdo
en el síntoma. El problema es lo que el reintento hace con los defectos de
verdad.

Un defecto de concurrencia —una condición de carrera, un bloqueo que aparece
cuando dos cosas caen a la vez— no falla siempre. Falla a veces. Digamos que
hace fallar la prueba tres de cada diez ejecuciones. Mira qué pasa con los
reintentos puestos:

```figura
{ "tipo": "barras", "titulo": "Veces que *ves* un defecto que falla 3 de cada 10",
  "barras": [
    { "que": "sin reintentos", "valor": 30, "etiqueta": "30 %", "tono": "bueno" },
    { "que": "1 reintento", "valor": 9, "etiqueta": "9 %" },
    { "que": "2 reintentos", "valor": 2.7, "etiqueta": "2,7 %", "tono": "alarma" }
  ],
  "pie": "Con dos reintentos, el defecto más caro que existe pasa en verde el 97 % de las veces." }
```

Esa es toda la aritmética: la prueba se da por buena si pasa **alguno** de los
intentos, así que cada reintento multiplica la probabilidad de esconder lo que
no es determinista. Y lo que no es determinista en el producto es justo la
clase de defecto que no vas a encontrar leyendo el código.

El reintento no distingue entre «el entorno parpadeó» y «tu aplicación tiene
una condición de carrera». Trata igual las dos cosas y te cuenta la misma
historia: verde.

Lo que hago en su lugar:

```figura
{ "tipo": "marcas", "titulo": "En vez de reintentar",
  "filas": [
    { "vale": true, "que": "Registrar cada fallo intermitente", "porque": "con su fecha; tres en dos semanas es un defecto, no mala suerte" },
    { "vale": true, "que": "Dar 48 horas", "porque": "se arregla, o la prueba sale de la suite que bloquea" },
    { "vale": true, "que": "Reintentar solo lo que no es tuyo", "porque": "un 503 de una pasarela ajena, y que quede escrito en el informe" },
    { "vale": false, "que": "`retries: 2` en la configuración global", "porque": "apaga la señal de todo, no solo del ruido" },
    { "vale": false, "que": "Guardar los intermitentes «para mirarlos luego»", "porque": "luego no existe; eso es la carpeta donde van a morir" }
  ] }
```

Si quitar los reintentos pone tu suite en rojo permanente, el reintento no era
la solución: era la venda. Lo conté entero en [la suite que lleva un mes en
rojo](/notas/la-suite-que-lleva-un-mes-en-rojo/).

## 4 · Cada prueba se fabrica su dato

Esta es la que decide si puedes paralelizar, y por lo tanto la que decide si
cumples el presupuesto de tiempo. Todo está encadenado.

La regla cabe en una línea: **cada prueba crea por API lo que necesita, con un
identificador único, y no asume que exista nada.** Nada de usuarios de prueba
compartidos, nada de «el pedido 1042», nada de un orden de ejecución.

Lo desarrollé en [el dato de prueba que alguien más está
usando](/notas/el-dato-de-prueba-que-alguien-mas-esta-usando/), así que aquí
solo dejo lo que importa para este argumento: **la mayoría de los fallos
intermitentes que se tapan con reintentos son de datos compartidos**. Arreglas
el dato y el reintento sobra.

## 5 · Tiene un dueño con nombre y apellido

«La suite es de QA» es lo mismo que decir que no es de nadie.

Dueño quiere decir una persona concreta que responde de tres cosas: que el
verde signifique algo, que el tiempo esté dentro del presupuesto, y que los
fallos intermitentes no se acumulen. No quiere decir que la escriba sola: eso
es lo que la mata por otro lado.

Y el otro extremo también falla. Si la suite la escribe solo una persona, se va
esa persona y nadie sabe por qué una prueba comprueba lo que comprueba. He
heredado esas suites. Se borran enteras y se vuelven a escribir, y es la
decisión correcta.

```figura
{ "tipo": "matriz", "titulo": "Dos formas de no tener dueño",
  "celdas": [
    { "rotulo": "Sin dueño", "que": "«Es de QA». Nadie responde del verde, nadie mira el tiempo, los intermitentes se acumulan.", "tono": "alta" },
    { "rotulo": "Un solo dueño", "que": "La escribe una persona. Funciona hasta que esa persona se va, y entonces se borra entera.", "tono": "alta" },
    { "rotulo": "Lo que funciona", "que": "Una persona responde de la salud; la escribe quien escribe el código que se prueba." },
    { "rotulo": "La señal", "que": "Si al preguntar «¿quién arregla esto?» nadie contesta en dos segundos, ya sabes el diagnóstico." }
  ] }
```

## Entonces, ¿las de código no importan?

Claro que importan. Pero importan **para que la suite sea llevadera**, no para
que sobreviva, y conviene saber qué es cada cosa.

De esa lista yo me quedo con cuatro, y no son las más citadas:

```figura
{ "tipo": "marcas", "titulo": "Las de código que sí sostienen",
  "filas": [
    { "vale": true, "que": "Esperar por condición, nunca por reloj", "porque": "un `sleep` es un reintento disfrazado: tapa la misma señal" },
    { "vale": true, "que": "Localizar por rol y texto accesible", "porque": "se rompe cuando cambia lo que ve el usuario, que es cuando debe romperse" },
    { "vale": true, "que": "Una intención por prueba", "porque": "si el nombre necesita un «y», son dos pruebas" },
    { "vale": true, "que": "Que el fallo diga qué pasó", "porque": "«expected true to be false» cuesta veinte minutos cada vez que aparece" },
    { "vale": false, "que": "Page Object por norma", "porque": "ayuda en pantallas que se repiten; en las demás es una capa que mantener" },
    { "vale": false, "que": "No repetir código, siempre", "porque": "la abstracción prematura en pruebas esconde justo lo que querías leer de un vistazo" }
  ] }
```

Las dos últimas son las que más discusión me generan, así que las dejo claras:
no digo que estén mal. Digo que **son decisiones, no reglas**, y que tratarlas
como reglas es lo que produce suites con cuatro capas de abstracción donde
nadie encuentra qué se está comprobando.

En una prueba, un poco de repetición se lee mejor que una abstracción lista. El
código de prueba se lee muchas más veces de las que se escribe, y casi siempre
se lee con prisa, buscando por qué falló.

## El diagnóstico, en cinco preguntas

Ninguna habla de código. Si respondes que no a tres, la suite está enferma
aunque hoy esté verde.

```figura
{ "tipo": "flujo", "titulo": "¿Sigue viva dentro de un año?",
  "pasos": [
    { "que": "¿Corre en cada cambio y bloquea?", "nota": "si hay que lanzarla a mano, no cuenta" },
    { "que": "¿Cuánto tarda, y hay un número acordado?", "nota": "«unos veinte minutos» es un no" },
    { "que": "¿Tienes los reintentos puestos?", "nota": "mira la configuración antes de contestar" },
    { "que": "¿Dos pruebas pueden correr a la vez sin pisarse?", "nota": "decide todo lo anterior" },
    { "que": "¿Quién la arregla cuando falla?", "tono": "bueno", "nota": "si tarda más de dos segundos en contestarse, no hay dueño" }
  ] }
```

---

La paradoja de todo esto es que las buenas prácticas que más se publican son
las más fáciles de cumplir. Poner un Page Object es una tarde. Acordar un
presupuesto de tiempo, quitar los reintentos y conseguir que la suite bloquee
una entrega son conversaciones con gente, y por eso no salen en las listas.

Una suite que nadie espera, que reintenta hasta ponerse verde y que no detiene
nada puede tener el código más limpio del repositorio.

Y da exactamente igual.
