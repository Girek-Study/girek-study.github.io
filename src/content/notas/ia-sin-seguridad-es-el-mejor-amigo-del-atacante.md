---
titulo: Generar código diez veces más rápido también genera los fallos diez veces más rápido
resumen: >-
  La IA multiplica lo que ya hacías. Si no había pruebas de robustez ni
  revisión de seguridad, ahora hay diez veces más superficie sin ellas.
fecha: 2026-09-22
etiquetas: [Seguridad, IA, Buenas prácticas]
portada: seguridad
---

Hay una frase que se repite sobre la IA y el código: que escribe tan bien como
el equipo que la usa. Es optimista. Lo que hace es **escribir tanto como el
equipo la deje**, y eso no es lo mismo.

Si tu proceso no tenía revisión de seguridad, ahora tienes la misma ausencia
de revisión sobre diez veces más código.

## Qué cambia en concreto

**El volumen.** Más código es más superficie. Más endpoints, más
dependencias, más formularios, más sitios donde algo no se valida.

**La procedencia.** Antes cada línea la escribió alguien que podía explicar
por qué está ahí. Ahora hay bloques que nadie escribió, que funcionan, y que
nadie ha mirado con la pregunta «¿y si aquí meto esto?».

**Las dependencias.** Un modelo sugiere paquetes con naturalidad, y a veces
paquetes que no existen. Ese hueco ya tiene nombre —alguien registra el
nombre inventado y le pone dentro lo que quiere—, y es exactamente el tipo de
cosa que no se te ocurre revisar.

## Lo que deja de ser opcional

**Validación de entradas, de verdad.** No que el formulario rechace letras en
un campo numérico, sino qué pasa cuando la petición llega sin pasar por el
formulario. Ese es el escenario, y se prueba con la API en la mano.

**El OWASP Top 10 como lista de casos.** No hace falta ser especialista en
seguridad para probar lo evidente: control de acceso roto —¿puedo ver el
pedido de otro cambiando el identificador de la URL?—, autenticación floja,
exposición de datos en las respuestas. Un QA con criterio encuentra bastante
solo con eso.

**Robustez y resiliencia.** Qué pasa si el servicio de al lado tarda treinta
segundos, si devuelve un 500, si devuelve un JSON a medias. Esas pruebas casi
nunca existen y son las que separan una caída de una degradación.

**Revisión de dependencias en el pipeline.** Automático, y que bloquee.

## El caso que más me ha enseñado

En un producto financiero encontramos que un endpoint devolvía el objeto
completo del cliente cuando solo se pedía el nombre para un saludo. Datos
personales viajando al navegador de cualquiera que abriera las herramientas
de desarrollo.

Nadie lo hizo con mala intención: alguien devolvió el objeto entero porque era
lo cómodo, y nadie lo miró.

Hoy ese patrón aparece más, porque devolver el objeto entero es justo lo que
sale por defecto cuando el código se genera rápido y nadie pregunta qué sobra.

## Dónde encaja QA en esto

No te conviertes en pentester. Pero hay una franja que te corresponde y que
casi nadie cubre: **probar lo que un usuario malintencionado haría sin
herramientas**. Cambiar un identificador. Quitar una cabecera. Repetir una
petición dos veces. Mandar el formulario sin pasar por la pantalla.

Y hay algo que sí es tuyo por completo: **pedir que se revise lo que la
máquina escribió con el mismo criterio con el que se revisa lo demás**. Si el
argumento para no hacerlo es que la IA lo generó, ese es exactamente el
argumento que no vale.

---

La IA no trajo vulnerabilidades nuevas. Trajo mucha más de la misma
superficie, y se la entregó a equipos que ya iban justos revisando la que
tenían.
