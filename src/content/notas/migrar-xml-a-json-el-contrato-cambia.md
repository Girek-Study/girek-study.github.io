---
titulo: Migrar de XML a JSON no cambia la pantalla, cambia el contrato
resumen: >-
  Certifico servicios bancarios en plena migración. Lo que rompe casi nunca se ve
  en la interfaz: se ve tres semanas después, en un reporte que no cuadra.
fecha: 2026-09-05
etiquetas: [API Testing, Contract Testing, Banca]
---

Hay un tipo de proyecto que asusta menos de lo que debería: **la migración que no cambia
funcionalidad**. Nadie agrega botones, nadie mueve flujos, el usuario no debería notar
nada. Y justo por eso suele probarse mal.

Llevo meses certificando servicios críticos de un banco que están pasando de XML a JSON.
La pregunta que hago siempre al empezar no es *"¿funciona?"*, sino **"¿responde exactamente
lo mismo?"**. Son cosas distintas, y la segunda es la que importa.

## Por qué la pantalla no te va a avisar

Si abres la aplicación y todo se ve igual, es tentador dar la migración por buena. Pero la
interfaz es el peor detector posible para este tipo de cambio, por tres motivos.

**Tolera lo que no debería.** Un campo que llega como `"1500.00"` en vez de `1500` se
pinta igual en pantalla. Un `null` donde antes venía `0` puede renderizarse como vacío sin
que nadie se alarme. El front absorbe la diferencia, y el error viaja intacto hasta el
reporte contable del cierre de mes.

**No recorre todos los caminos.** La pantalla te muestra el caso feliz. El servicio, en
cambio, tiene ramas de error, timeouts, campos opcionales y combinaciones que ninguna
prueba manual va a tocar en una tarde.

**Llega tarde.** Cuando el defecto se ve en la interfaz, ya pasó por integración,
certificación y probablemente por un release.

## Lo que sí rompe

Después de un buen número de servicios comparados, los hallazgos se repiten. Estos cinco
concentran casi todo:

**El tipo cambió en silencio.** En XML todo es texto, así que un importe viajaba como
`<monto>1500.00</monto>` y cada consumidor lo convertía. En JSON hay tipos de verdad, y
alguien tiene que decidir si eso es `1500`, `1500.00` o `"1500.00"`. Las tres opciones
"funcionan" hasta que un consumidor compara con `===` o redondea distinto.

**El opcional dejó de serlo.** Un campo que en el legado a veces no venía, en el nuevo llega
siempre como `null`. Suena inocuo. Deja de serlo cuando el consumidor distingue entre "no
me lo mandaron" y "me mandaron vacío" — que en banca es exactamente la diferencia entre *no
tengo el dato* y *el dato es cero*.

**El error se devuelve distinto.** El caso feliz suele estar bien mapeado. Los errores casi
nunca: cambia el código, cambia la estructura, o lo que antes era un error de negocio
explícito ahora llega como un genérico. El consumidor deja de poder distinguir *tarjeta
bloqueada* de *servicio caído*, y los reintenta igual.

**Las listas vacías cambian de forma.** En XML, cero elementos es la ausencia del nodo. En
JSON puede ser `[]`, `null` o que la clave no exista. Tres representaciones para lo mismo,
y cada consumidor reacciona distinto ante cada una.

**El orden y la precisión se mueven.** Fechas que pasan de un formato local a ISO,
decimales que ganan o pierden dígitos, colecciones que dejan de venir ordenadas porque el
nuevo servicio consulta distinto. Nada de eso es un defecto visible el primer día.

## Cómo lo pruebo

La técnica es simple de describir y tediosa de ejecutar: **ejecutar los dos servicios con la
misma entrada y comparar las dos respuestas campo por campo**.

Lo importante es qué se hace con las diferencias. No todas son defectos: algunas son el
cambio deseado. Así que cada una se clasifica en una de tres:

1. **Esperada y documentada** — el cambio de formato de fecha que el equipo acordó. Se
   registra como excepción con su justificación, y deja de aparecer en las siguientes
   comparaciones.
2. **Esperada pero no documentada** — alguien tomó una decisión y no la contó. No es un
   defecto de código; es uno de comunicación, y hay que resolverlo igual antes de liberar.
3. **No esperada** — el defecto de verdad.

La tercera categoría es la que buscas. Las otras dos existen para que la tercera no quede
sepultada bajo cien diferencias de ruido, que es exactamente lo que pasa cuando se compara
sin clasificar.

## La evidencia manda la conversación

Cuando reporto un defecto de este tipo, el ticket lleva siempre lo mismo: la petición
completa, la respuesta del servicio legado, la del migrado, y la diferencia señalada.

No es burocracia. Es lo que evita la discusión de *"a mí me funciona"*: con las dos
respuestas al lado, la conversación deja de ser sobre percepciones y pasa a ser sobre el
dato. He visto defectos que llevaban semanas en disputa resolverse en diez minutos solo por
poner los dos JSON uno junto al otro.

## Dónde ayuda la IA y dónde no

Uso modelos de lenguaje para dos cosas concretas en este trabajo: **leer un requerimiento
largo y sacar la lista de campos y reglas a verificar**, y **revisar dos estructuras
grandes y señalar dónde difieren**. En ambas ahorra horas reales.

Lo que no hago es dejar que decidan. Un modelo no sabe si una diferencia es la excepción
acordada en una reunión de hace tres semanas, y va a explicarte con mucha seguridad por qué
un `null` es equivalente a un `0`. Esa clasificación —la de las tres categorías de arriba—
es humana, y ahí es donde está el criterio que vale.

---

Si estás por entrar a una migración así, la única recomendación que daría es esta: **exige
la comparación automatizada desde el primer servicio**, no desde el décimo. Montarla cuesta
unos días y es lo que convierte una certificación de meses en algo que se puede sostener.
