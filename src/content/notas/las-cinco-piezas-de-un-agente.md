---
titulo: Las cinco piezas de un agente, y qué se rompe en cada una
resumen: >-
  Los diagramas dibujan el modelo, las herramientas y poco más. Faltan dos
  piezas, y una de ellas —el criterio de parada— es la que te vacía el
  presupuesto un domingo por la noche.
fecha: 2026-10-23
etiquetas: [Agentes, IA, Quality Engineering]
portada: anatomia
---

Casi todos los diagramas de agentes que circulan dibujan lo mismo: un modelo,
unas herramientas, una flecha que vuelve. Es bonito y no sirve para gran cosa,
porque **un agente no falla por donde está dibujado**.

Después de montar unos cuantos y ver romperse unos cuantos más, esta es la
anatomía que uso. Cinco piezas, y lo que importa de cada una no es qué hace,
sino **cómo se rompe**.

```figura
{ "tipo": "capas", "titulo": "Un agente, por dentro",
  "capas": [
    { "n": "1", "que": "El modelo — decide el siguiente paso" },
    { "n": "2", "que": "El contexto — lo que sabe cuando decide" },
    { "n": "3", "que": "Las herramientas — lo que puede hacer en el mundo" },
    { "n": "4", "que": "El bucle — qué ocurre después de cada paso" },
    { "n": "5", "que": "El criterio de parada — cuándo deja de intentarlo", "tono": "clave" }
  ],
  "pie": "Las dos últimas son las que no salen en los diagramas, y las que más caro salen." }
```

## 1 · El modelo

Es la pieza en la que todo el mundo se fija, y en mi experiencia la que menos
decide el resultado. Si tu agente funciona mal, cambiar de modelo rara vez lo
arregla; normalmente mueve el problema.

**Cómo se rompe:** no determinismo. El mismo encargo, dos caminos distintos. No
es un defecto, es la naturaleza de la herramienta, pero convierte «no
reproducible» en una respuesta frecuente, y eso contamina todo el diagnóstico.

**Qué hago:** fijar lo que se pueda fijar —temperatura baja, versión del modelo
anclada— y aceptar que el resto hay que afirmarlo por resultado, no por
camino. Si tu prueba exige que pase por los mismos cuatro pasos, va a fallar
por motivos que no te importan.

## 2 · El contexto

Lo que el agente sabe en el momento de decidir: la instrucción, el historial,
los documentos que recuperó, lo que devolvieron las herramientas.

Esta es, de largo, la pieza que más resultado explica. Y tiene dos averías
distintas que se confunden todo el rato:

```figura
{ "tipo": "comparar", "titulo": "Dos averías de contexto que no son la misma",
  "izq": { "rotulo": "Le falta",
    "lineas": [
      "No sabe cómo se hacen las cosas aquí",
      "No tiene el ejemplo que necesitaba",
      "Ignora una regla de negocio"
    ],
    "pie": "Se arregla dándole lo que falta. Es la fácil." },
  "der": { "rotulo": "Le sobra",
    "lineas": [
      "Veinte ficheros cuando necesitaba dos",
      "Historial largo de una tarea anterior",
      "Instrucciones que se contradicen"
    ],
    "pie": "Se arregla quitando, y casi nadie lo intenta." } }
```

La segunda columna es contraintuitiva: **más contexto no es mejor contexto**.
Un agente con demasiado delante se despista, mezcla tareas y arrastra
decisiones viejas que ya no valen. Cuando algo va mal, mi primer movimiento ya
no es añadir instrucciones: es mirar qué puedo quitar.

## 3 · Las herramientas

Lo que puede hacer de verdad: leer un fichero, llamar a una API, ejecutar un
comando, escribir en una base de datos.

Aquí el agente deja de producir texto y empieza a **producir efectos**, y por
eso cambia la naturaleza del riesgo.

```figura
{ "tipo": "marcas", "titulo": "Lo que decide si una herramienta es segura",
  "filas": [
    { "vale": true, "que": "Hace una sola cosa", "porque": "una herramienta que hace tres es tres decisiones que no viste" },
    { "vale": true, "que": "Su descripción dice cuándo NO usarla", "porque": "la mitad de los usos indebidos salen de una descripción optimista" },
    { "vale": true, "que": "Devuelve el error, no lo esconde", "porque": "si le devuelves un éxito vacío, sigue adelante sobre una mentira" },
    { "vale": true, "que": "Lo irreversible pide confirmación", "porque": "borrar, cobrar y enviar no se deshacen con un reintento" },
    { "vale": false, "que": "Una herramienta «ejecuta lo que quieras»", "porque": "ahí dejaste de tener un agente acotado y tienes una consola" }
  ] }
```

La tercera es la que más me ha mordido. Una herramienta que atrapa su propio
error y devuelve «ok» deja al agente avanzando sobre una premisa falsa, y el
fallo aparece cinco pasos después, donde ya no se parece a su causa.

## 4 · El bucle

Qué pasa después de cada paso: si observa el resultado, si replanifica, si
reintenta.

**Cómo se rompe:** el agente interpreta un fallo permanente como algo temporal
y vuelve a intentarlo. Y otra vez. El servicio devuelve 403 porque faltan
permisos —eso no se arregla esperando— y él lo trata como un parpadeo de red.

Cada vuelta consume tokens, tiempo y a veces dinero real. Y desde fuera no se
ve: el agente «está trabajando».

**Qué hago:** distinguir en las propias herramientas lo que merece reintento
—tiempo de espera agotado, 503— de lo que no —403, 404, validación—. Si el
error dice que no vas a poder, reintentar es quemar presupuesto.

## 5 · El criterio de parada

La pieza que no sale en ningún diagrama y la que vacía la cuenta.

**¿Cuándo deja de intentarlo?** No cuando termina bien —eso es fácil— sino
cuando no está consiguiéndolo.

```figura
{ "tipo": "flujo", "titulo": "Los cuatro frenos que pongo siempre",
  "pasos": [
    { "que": "Tope de pasos", "nota": "un número duro; si lo alcanza, para y avisa" },
    { "que": "Tope de gasto", "nota": "en tokens o en dinero, por tarea, no por mes" },
    { "que": "Detección de vueltas", "nota": "si repite la misma acción con el mismo resultado, no está avanzando" },
    { "que": "Salida a una persona", "tono": "bueno", "nota": "parar y preguntar es un final válido, no un fallo" }
  ],
  "pie": "El tercero es el que más veces se salta, y el que distingue «va lento» de «está atascado»." }
```

El cuarto freno es cultural más que técnico. Un agente que se detiene y
pregunta se percibe como que «no funciona», y hay presión para quitarle esa
puerta. Es justo al revés: **el que no sabe parar es el peligroso**, porque va
a hacer algo para no quedarse quieto.

## Qué afirmo en cada pieza

Si me preguntas qué pruebo de un agente, es esto, y no «si la respuesta es
buena»:

```figura
{ "tipo": "matriz", "titulo": "Una afirmación por pieza",
  "celdas": [
    { "rotulo": "Contexto", "que": "Que lo recuperado era pertinente. Si entra basura, lo demás da igual." },
    { "rotulo": "Herramientas", "que": "Que llamó a la que tocaba, con los parámetros que tocaba, y que un error llegó como error.", "tono": "alta" },
    { "rotulo": "Efectos", "que": "Que tocó lo que debía y NADA más. El «nada más» es la mitad de la prueba." },
    { "rotulo": "Parada", "que": "Que ante un caso imposible se detiene dentro del presupuesto, en vez de girar.", "tono": "alta" }
  ],
  "pie": "Ninguna de las cuatro mira si el texto quedó bonito. Las cuatro miran si el sistema se comportó." }
```

Lo desarrollé más en [orquestar a mano o gestionar el
estado](/notas/probar-un-agente-con-estado/), que va de cómo se prueba cada
paso por separado sin tener que repetir el viaje entero.

---

Si el diagrama que tienes del agente solo lleva el modelo y las herramientas,
te faltan las dos piezas que de verdad deciden si esto es sostenible: **lo que
sabe cuando decide, y cuándo acepta que no puede**.

La primera explica casi todos los resultados malos. La segunda explica casi
todas las facturas raras.
