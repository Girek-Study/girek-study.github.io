---
titulo: Lo que pregunto cuando entrevisto a alguien de QA
resumen: >-
  La diferencia entre smoke y sanity no separa a nadie: se memoriza en diez
  minutos. Estas seis preguntas sí, y cuento qué busco exactamente en cada
  respuesta.
fecha: 2026-10-10
etiquetas: [Carrera, Entrevistas, Equipos]
portada: entrevista
---

He estado a los dos lados de la mesa suficientes veces, y de un tiempo a esta
parte sobre todo del lado de quien pregunta.

Esta nota es lo que busco de verdad. La escribo por egoísmo —ojalá quien se
presenta llegue preparado para hablar de esto— y porque a mí me habría ahorrado
unas cuantas entrevistas malas.

## Las preguntas que no sirven

Empiezo por aquí porque es la mitad del problema.

```figura
{ "tipo": "marcas", "titulo": "Lo que se pregunta y no separa a nadie",
  "filas": [
    { "vale": false, "que": "«¿Diferencia entre smoke y sanity?»", "porque": "se memoriza en diez minutos y no predice nada sobre cómo trabaja" },
    { "vale": false, "que": "«¿Qué es la pirámide de pruebas?»", "porque": "todo el mundo sabe dibujarla; poca gente sabe decidir con ella" },
    { "vale": false, "que": "«¿Cuántos años de Selenium tienes?»", "porque": "mide calendario, no criterio" },
    { "vale": false, "que": "«¿Qué es severidad y prioridad?»", "porque": "es vocabulario; pregunta mejor por una vez que no estuvieron de acuerdo" },
    { "vale": false, "que": "Acertijos de lógica", "porque": "filtran por haber visto el acertijo antes" }
  ] }
```

Todas comparten el mismo defecto: **tienen una respuesta correcta que se puede
estudiar**. Y lo que quiero saber no tiene respuesta correcta.

Quiero saber **cómo piensa cuando no hay respuesta correcta**, que es el 90 %
del trabajo.

## 1 · «Cuéntame el último defecto importante que encontraste y cómo llegaste a él»

Es con la que abro casi siempre. Parece blanda y es la que más información da.

No me importa el defecto. **Me importa el cómo.** Hay dos tipos de respuesta y
se distinguen en la primera frase.

Unos cuentan el resultado: «encontré que el cálculo del descuento fallaba».
Otros cuentan el camino: «me llamó la atención que el importe cambiara al
volver atrás, así que probé a hacerlo con un cupón ya usado, y ahí…».

El segundo me está enseñando su forma de razonar. El primero me está contando
una anécdota que podría haberle pasado a cualquiera.

**Señal buena:** que haya una corazonada en medio y pueda explicar de dónde
salió. **Señal mala:** que no se acuerde de ninguno. Si llevas tres años y no
recuerdas un defecto que te costó encontrar, o no te dejaron buscar o no
miraste.

## 2 · «¿Qué *no* probarías de esto?»

Si tuviera que quedarme con una, me quedo con esta.

Le doy una funcionalidad concreta —un carrito, una transferencia, un alta— y le
pido que me diga qué dejaría fuera con el tiempo que tiene.

Casi todo el mundo sabe hacer una lista de qué probar. Esa lista es infinita y
no cuesta nada. **Decir qué se queda fuera obliga a tener un criterio de
riesgo**, y además es lo que de verdad se hace cada semana: no tenemos tiempo
para todo, nunca lo hemos tenido.

Lo que escucho: si lo que deja fuera lo justifica por **impacto y
probabilidad** o por «es que eso casi no se usa» sin saber si es verdad.

## 3 · «Te dan esta pantalla de login. ¿Qué haces?»

El clásico. Pero lo que miro no es la lista de casos.

**Miro si pregunta antes de empezar.**

```figura
{ "tipo": "comparar", "titulo": "La misma pregunta, dos respuestas",
  "izq": { "rotulo": "Arranca a enumerar",
    "lineas": [
      "Campo vacío, contraseña corta…",
      "Inyección SQL, XSS…",
      "Una lista larga y genérica"
    ],
    "pie": "Es un catálogo. Serviría para cualquier login del mundo." },
  "der": { "rotulo": "Pregunta primero",
    "lineas": [
      "«¿Hay bloqueo por intentos?»",
      "«¿Esto es banca o es un blog?»",
      "«¿Quién más consume este servicio?»"
    ],
    "pie": "Está buscando el riesgo *de este* producto antes de gastar tiempo." } }
```

El de la derecha va a ser mucho mejor compañero de equipo, y no porque sepa
más: porque ha entendido que el contexto decide qué importa.

Aviso para quien se presenta: **preguntar no es perder puntos**. En mis
entrevistas es lo que más suma.

## 4 · «Una prueba falla en el pipeline y pasa en tu máquina. ¿Qué haces?»

Esta separa por método de diagnóstico, que es una habilidad distinta de saber
escribir pruebas.

Lo que espero oír, en algún orden: mirar si falla siempre o a veces, ver qué
dejó la ejecución —traza, captura, vídeo, registro—, comparar las diferencias
entre los dos entornos —datos, versión, zona horaria, paralelismo— y, si es
intermitente, dejarlo registrado antes de tocar nada.

Lo que no quiero oír: **«le pongo un reintento»** o «le subo el tiempo de
espera». Son las dos respuestas que más veces me he encontrado y las dos apagan
la señal en vez de leerla. Escribí por qué en [ninguna suite muere por cómo
está escrita](/notas/ninguna-suite-muere-por-como-esta-escrita/).

## 5 · «¿Qué pasó la última vez que se fue algo a producción que tú habías dado por bueno?»

La pregunta incómoda, y va a propósito.

Busco tres cosas: que **haya pasado** —si dice que nunca, o lleva poco tiempo o
no está contando la verdad—, que pueda explicarlo sin repartir culpa, y sobre
todo **qué cambió después**.

La mejor respuesta que he recibido terminaba así: «y desde entonces siempre
pregunto qué pasa con los pedidos que ya estaban a medias cuando se despliega».
Eso es alguien que convierte un golpe en criterio.

**Bandera roja:** la culpa siempre fue de otro. De desarrollo, de producto, del
entorno. A veces es verdad. Tres veces seguidas, no.

## 6 · «Un desarrollador te dice que eso no es un bug. ¿Qué haces?»

Aquí no evalúo conocimiento técnico. Evalúo cómo se comporta en un desacuerdo,
que es donde se nota si alguien va a sumar o a desgastar.

Las respuestas que me gustan tienen esta forma: primero entender por qué lo
dice —muchas veces tiene razón—, después llevar el caso al requisito o al
contrato, y si no está escrito en ninguna parte, **subirlo a quien decide en
vez de pelearlo en el hilo**.

Las que me preocupan: «lo escalo» como primer movimiento, o «lo dejo pasar». La
primera es una guerra; la segunda es rendirse. Ninguna resuelve nada.

## Lo que miro y no es una pregunta

```figura
{ "tipo": "capas", "titulo": "Lo que pesa de verdad en mi decisión",
  "capas": [
    { "n": "1", "que": "Si distingue lo que sabe de lo que supone. «Creo que…» vale oro." },
    { "n": "2", "que": "Si dice «no lo sé» con naturalidad, y qué hace después de decirlo." },
    { "n": "3", "que": "Si al explicar un problema lo deja más claro de lo que estaba." },
    { "n": "4", "que": "Si tiene curiosidad por el producto, no solo por las herramientas." },
    { "n": "5", "que": "Si ha enseñado a alguien. Quien enseña entendió de verdad.", "tono": "clave" }
  ],
  "pie": "Nada de esto sale en un CV, y todo esto se nota en cuarenta minutos de conversación." }
```

El «no lo sé» merece un párrafo aparte. En este oficio vivimos rodeados de
cosas que no sabemos, y quien no puede decirlo acaba improvisando con seguridad
—que es, con diferencia, lo más caro que puede pasarle a un equipo de calidad.

## Si eres tú quien se presenta

Cuatro cosas que te van a servir más que repasar definiciones:

```figura
{ "tipo": "flujo", "titulo": "Cómo llegar preparado de verdad",
  "pasos": [
    { "que": "Lleva dos historias contadas", "nota": "un defecto que te costó encontrar y un error tuyo; ensaya cómo las cuentas" },
    { "que": "Prepárate para justificar lo que dejas fuera", "nota": "no la lista de qué probarías: la de qué no" },
    { "que": "Ten una opinión y un motivo", "nota": "sobre reintentos, sobre cobertura, sobre lo que sea; con el motivo delante" },
    { "que": "Pregunta tú también", "tono": "bueno", "nota": "qué pasa cuando la suite se pone roja te dice más de la empresa que su web" }
  ] }
```

Esa última es en serio. Las preguntas que haces al final me dicen tanto de ti
como las respuestas, y además te están entrevistando a ti un equipo con el que
vas a pasar ocho horas al día.

---

Si tuviera que resumir qué busco: **alguien que sepa decidir con información
incompleta y pueda explicar por qué decidió eso**.

Las herramientas se aprenden en un mes. Los frameworks cambian cada tres años.
El criterio para saber qué merece una prueba, qué riesgo se asume y cómo se
cuenta lo que encontraste no lo da ninguna certificación, y es lo único que
estoy comprando cuando contrato a alguien.
