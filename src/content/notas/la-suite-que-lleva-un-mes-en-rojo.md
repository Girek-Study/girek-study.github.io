---
titulo: La suite lleva un mes en rojo y ya nadie la mira
resumen: >-
  El rojo permanente no es un problema de calidad: es un problema de señal.
  Cuando fallar es lo normal, el pipeline deja de avisar de nada.
fecha: 2026-09-18
etiquetas: [CI/CD, Automatización, Equipos]
portada: rojo
---

Nadie decide que la suite se quede en rojo. Se llega por acumulación, y el
camino es siempre el mismo.

Un martes falla una prueba por un cambio legítimo que nadie avisó. Se arregla
la semana que viene, porque hoy hay una salida. El jueves falla otra por un
entorno caído. El lunes siguiente ya son cuatro, y alguien dice en la reunión
la frase que lo sella: «sí, esas siempre fallan».

A partir de ahí el pipeline ya no informa de nada. Sigue corriendo, sigue
gastando minutos, y el rojo pasó de ser una alarma a ser el color de fondo.

## El problema no es que fallen: es que ya no significan

Una suite con cuatro fallos conocidos y una con cinco se ven exactamente
igual. Ese quinto puede ser el defecto que buscabas, y no hay forma de
distinguirlo sin abrir el informe y compararlo de memoria con el de ayer.

Eso tiene tres consecuencias que aparecen en este orden.

**El conocimiento se vuelve personal.** Saber cuáles fallan «de siempre» está
en la cabeza de una o dos personas. Cuando entra alguien nuevo y pregunta si
puede desplegar, la respuesta no está en el pipeline: está en preguntarle a
quien lleva más tiempo.

**Las revisiones se saltan.** Si el pull request se pone rojo pase lo que
pase, el rojo deja de bloquear nada. Y una vez que se aprende a aprobar con la
suite en rojo, ya no hay puerta.

**Y llega el día en que alguien las borra.** Cuando el ruido es insoportable,
la salida fácil es quitar de en medio las que molestan. Se pierden en el mismo
lote las que fallaban por una tontería y las que llevaban meses gritando un
defecto real.

## La cuarentena, que es lo contrario de mirar hacia otro lado

Lo que funciona no es arreglarlas todas un viernes. Es separar las dos
poblaciones y hacer que cada una tenga sus reglas.

**Uno: congela la lista hoy.** No la que crees, la que es. Una ejecución
limpia y anotas exactamente qué falla. Esa lista, cerrada y con fecha, es el
único punto de partida honesto.

**Dos: saca esas de la puerta, marcándolas.** No con un `skip` suelto en medio
del archivo, que en tres semanas nadie sabe por qué está ahí, sino con una
etiqueta que se pueda contar y filtrar:

```ts
// El motivo y el ticket van en el código, no en la memoria de nadie.
test('@cuarentena el listado pagina al final', async ({ page }) => {
  // QA-412 — el endpoint devuelve 500 con más de 200 registros.
});
```

Y el gate deja de ejecutarlas:

```bash
# La puerta corre solo lo que de verdad bloquea. El resto, en otro trabajo.
npx playwright test --grep-invert @cuarentena
```

**Tres: ahora el verde vuelve a significar algo.** Puede que te quedes con la
mitad de la suite en la puerta. No pasa nada: media suite en la que confías
vale más que una entera que nadie lee.

**Cuatro: que la cuarentena duela.** Este es el paso que casi nunca se da, y
sin él lo anterior solo es una forma ordenada de esconder la basura. La
cuarentena necesita tres cosas: un número visible en algún sitio donde se
mire, un dueño por cada entrada, y una fecha. Se revisa cada semana, y la
única regla es que no crece.

```figura
{
  "tipo": "flujo",
  "titulo": "Separar las dos poblaciones",
  "pasos": [
    {
      "que": "Congela la lista de hoy",
      "nota": "la que es, no la que crees"
    },
    {
      "que": "Etiqueta y saca del gate",
      "nota": "--grep-invert @cuarentena"
    },
    {
      "que": "El verde vuelve a significar algo",
      "tono": "bueno",
      "nota": "media suite fiable > una entera que nadie lee"
    },
    {
      "que": "Que la cuarentena duela",
      "nota": "número visible, dueño y fecha"
    }
  ]
}
```

## Lo que hay que decidir en cada entrada

Cuando revisas una prueba en cuarentena, solo hay tres finales, y conviene
decir cuál es en voz alta:

**Se arregla.** El fallo era real y se corrige, en la prueba o en el producto.

**Se reescribe.** La prueba estaba mal planteada —dependía de un dato de otro,
esperaba por tiempo, tocaba un tercero—. No se parchea: se rehace.

**Se borra.** Y esta es la que más cuesta. Si lleva tres meses en cuarentena,
nadie la ha reclamado y no sabes decir qué defecto atraparía, esa prueba no
está protegiendo nada. Borrarla es más honesto que mantener el `skip`, porque
un `skip` eterno sigue contando en el total y hace que la suite parezca más
grande de lo que es.

## El fallo que más me ha enseñado

En un equipo tuvimos la suite en rojo lo suficiente como para que yo mismo
dejara de abrir el informe. Cuando por fin nos sentamos a separar la lista,
una de las que llevaba semanas fallando no era un problema de la prueba: el
cálculo de un descuento estaba mal en un caso de borde, y llevaba ahí desde
antes de que empezara el ruido.

La prueba había hecho su trabajo el primer día. Fuimos nosotros los que
dejamos de escucharla.

Desde entonces trato el rojo permanente como lo que es: no una deuda técnica
de la automatización, sino una avería del canal por el que el equipo se entera
de las cosas.

---

Una suite en la que no confías no es una red de seguridad: es un gasto fijo
con aspecto de red de seguridad.
