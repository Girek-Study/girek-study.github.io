---
titulo: La ruta del Quality Engineer, y por qué no empieza en Playwright
resumen: >-
  El orden en que se aprende decide el techo. Las herramientas son la capa
  visible, y es la última que aguanta si debajo no hay criterio.
fecha: 2026-09-19
etiquetas: [Carrera, Quality Engineering, Aprendizaje]
portada: ruta
---

Casi todas las rutas de QA que circulan son listas de herramientas. Playwright,
Cypress, Postman, Docker, Jenkins. Se pueden marcar como completadas, que es
justo lo que las hace atractivas y lo que las vuelve inútiles.

Llevo diez años en esto y he entrevistado a bastante gente. La diferencia entre
quien lleva dos años y quien lleva ocho casi nunca está en las herramientas: el
de dos años a veces conoce más. Está en el orden en que las aprendió.

Esta es la ruta como yo la ordenaría hoy, con lo que de verdad cambia de nivel
en cada capa.

## Capa 1 · Qué significa probar

Antes que cualquier herramienta: entender que probar no es verificar que
funciona, es buscar dónde deja de funcionar. Suena a frase, y decide todo lo
demás.

Lo concreto de esta capa: qué es un riesgo y cómo se prioriza, por qué existen
las clases de equivalencia y los valores límite, y la diferencia entre un caso
que documenta y un caso que descubre.

**Cómo sabes que la tienes:** te dan una pantalla y sacas diez casos que no
están en el requisito. Sin abrir el editor.

## Capa 2 · El producto y su dominio

Esta capa se salta siempre y es la que más caro se paga. Probar un core
bancario sin entender qué es una conciliación es teclear.

En banca tardé meses en entender por qué un abono podía tardar en reflejarse.
Hasta que lo entendí, reportaba como defectos cosas que eran el negocio
funcionando, y gastaba el crédito del equipo en cada una.

**Cómo sabes que la tienes:** distingues un comportamiento raro de un defecto
sin preguntarle a nadie.

## Capa 3 · Programar de verdad

Un lenguaje, bien. No tres a medias. Estructuras de datos, funciones, control
de errores, asincronía, y saber leer código ajeno, que es lo que más vas a
hacer.

Aquí hay un punto que incomoda: si no sabes programar, no eres Quality
Engineer. Puedes ser muy buen QA manual —y hace falta— pero la ingeniería
empieza aquí.

**Cómo sabes que la tienes:** abres el repositorio del producto y entiendes
qué hace el código que vas a probar.

## Capa 4 · Cómo funciona lo que pruebas por dentro

HTTP de verdad: métodos, códigos, cabeceras, autenticación. SQL suficiente
para verificar en la base lo que la pantalla dice. Y qué es un contrato entre
servicios y qué pasa cuando cambia sin avisar.

**Cómo sabes que la tienes:** ante un fallo, sabes decir si está en el front,
en el back o en los datos antes de abrir la traza.

## Capa 5 · Automatización

Ahora sí. Y fíjate en que llega la quinta.

Lo que importa no es la herramienta, son las cuatro cosas que decides dentro
de ella: **localizadores** que sobreviven al rediseño, **esperas** por
condición y nunca por reloj, **datos** que cada prueba crea y no comparte, y
una **arquitectura** que aguante que la suite crezca.

**Cómo sabes que la tienes:** tu suite corre en paralelo y, cuando se pone
roja, significa algo.

## Capa 6 · El pipeline

Una prueba que no corre sola no existe. Ejecutarla en cada cambio, que el
resultado llegue a quien hizo el cambio, y que una puerta bloquee cuando toca.

**Cómo sabes que la tienes:** nadie te pide que ejecutes las pruebas. Ya
corrieron.

## Capa 7 · Lo que casi nadie cubre

Rendimiento con un umbral en el pipeline. Accesibilidad, que además es ley en
muchos sectores. Seguridad al nivel de saber qué es el OWASP Top 10 y probar
lo evidente. Observabilidad: leer los registros y las trazas de producción,
donde están los defectos que tu suite no vio.

## Capa 8 · La que decide el techo

Escribir un defecto que se entienda y se pueda reproducir. Defender una
decisión de calidad ante alguien que quiere salir el viernes. Decir «esto no
está listo» con datos. Enseñar a otros.

Esta capa es la que separa al que lleva ocho años del que lleva dos con más
herramientas. No hay curso: se practica en cada conversación incómoda.

## Y la IA, ¿dónde va?

Transversal, no como capa. Acelera lo mecánico de la 3 a la 7 y no sustituye
la 1, la 2 ni la 8. Un modelo te escribe la prueba; decidir qué merece una
prueba sigue siendo tuyo.

Cuidado con el atajo: usar IA en la capa 5 sin tener la 1 produce mucha
suite y poca calidad. Es lo que más estoy viendo este año.

---

Si te saltas capas, llegas antes a la primera oferta y te estancas en la
tercera. El orden no es burocracia: cada capa es la que sostiene a la
siguiente.
