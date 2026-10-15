---
titulo: Enseñamos a la IA a construir más rápido de lo que sabemos verificarla
resumen: >-
  Una IA escribe el código, otra lo prueba y otra lo revisa. La pregunta que
  nadie contesta es quién valida esas decisiones, y los números de adopción
  dicen que la confianza va muy por detrás de la capacidad.
fecha: 2026-10-15
etiquetas: [IA, Quality Engineering, Agentes]
portada: auditoria
---

Esta semana se armó un debate en una comunidad de testers peruanos que llevo
días dándole vueltas. La pregunta de partida era sencilla: con agentes
generando código y orquestando pruebas, ¿hacia dónde va el perfil de quien se
dedica a la calidad?

Salieron las respuestas que uno espera —que el QA se acerca al análisis
funcional, que acaba orquestando, que tendrá que entender más de negocio— y
también una incomodidad honesta: alguien dijo sin rodeos que el ritmo al que
avanza esto le parece peligroso.

Pero la frase que me ordenó la cabeza fue otra, de un compañero que lleva años
en esto: **hace tiempo que no es mejor QA quien ejecuta más, sino quien mitiga
mejor el riesgo del producto**.

Si eso es cierto —y lo es—, entonces el riesgo ya no está solo en el software.
Está en quién lo escribe.

## El escenario que ya existe

No hablo de futurología. Hoy mismo puedes montar esto:

```figura
{ "tipo": "flujo", "titulo": "La cadena sin humanos en medio",
  "pasos": [
    { "que": "Un agente escribe el código", "nota": "a partir de un requisito en lenguaje natural" },
    { "que": "Otro genera las pruebas", "nota": "sobre ese mismo código" },
    { "que": "Otro las ejecuta y las repara", "nota": "self-healing cuando el selector cambia" },
    { "que": "Otro revisa el pull request", "tono": "bueno", "nota": "y aprueba" }
  ],
  "pie": "Cuatro decisiones técnicas seguidas, y ninguna persona ha mirado por qué se tomó ninguna." }
```

Y aquí está la pregunta que llevo semanas haciéndome: **¿quién valida la
calidad de las decisiones que toma una IA cuando otra IA desarrolla y otra IA
prueba?**

Porque hay una diferencia que se pasa por alto todo el rato, y es la que
sostiene el resto de esta nota: **generar código que funciona no es lo mismo
que generar código correcto.**

```figura
{ "tipo": "comparar", "titulo": "Dos cosas que llamamos igual",
  "izq": { "rotulo": "Funciona",
    "lineas": [
      "Pasa las pruebas",
      "Resuelve el caso de hoy",
      "Se entrega y nadie se queja"
    ],
    "pie": "Es lo que un agente ya hace muy bien." },
  "der": { "rotulo": "Es correcto",
    "lineas": [
      "Es *mantenible* dentro de seis meses",
      "Escala con el producto",
      "No hipoteca decisiones futuras"
    ],
    "pie": "Es lo que sigue necesitando criterio, y donde los modelos flojean." } }
```

Trabajo a diario con estas herramientas y la limitación la veo clara: resuelven
muy bien lo puntual, y se les escapa lo estructural. Arquitectura, continuidad
del contexto, consecuencias a medio plazo. Muchas veces la solución que
entregan **cierra el ticket y abre deuda técnica**, y la deuda no aparece en
ninguna prueba que pase en verde.

## Lo que dicen los números de adopción

En el mismo debate alguien trajo unas cifras sobre el uso de IA en entornos de
trabajo. No venían con fuente —cosa que, siendo la nota que es, conviene decir
en voz alta—, así que las tomo como lo que son: un orden de magnitud que
coincide con lo que veo. El patrón importa más que el decimal.

```figura
{ "tipo": "barras", "titulo": "De lo que se pide a lo que *de verdad* está en producción",
  "barras": [
    { "que": "lo piden", "valor": 89, "etiqueta": "89 %" },
    { "que": "experimentan", "valor": 43, "etiqueta": "43 %" },
    { "que": "en producción", "valor": 15, "etiqueta": "15 %", "tono": "alarma" },
    { "que": "mejora real", "valor": 19, "etiqueta": "19 %", "tono": "alarma" }
  ],
  "pie": "Organizaciones que piden trabajar con IA en calidad, las que siguen experimentando y las que lo tienen desplegado. La última barra es la mejora de productividad medida." }
```

Esa distancia entre el 89 % que lo pide y el 15 % que lo tiene funcionando es
la nota entera. **Lo que frena la adopción no es la capacidad técnica: es la
desconfianza.** En las mismas cifras, casi la mitad declaraba desconfiar de lo
que la IA le devuelve, y dos tercios vivían en un «confío, pero no del todo».

Y ese 19 % de mejora merece un párrafo. Es una ganancia real y nada
despreciable. Pero está a años luz del discurso de que vas a recortar la mitad
del trabajo. Quien te venda eso hoy, te está vendiendo algo.

## Ya hemos visto esta película

La comparación la hizo otro participante y me pareció exacta: **esto se parece
mucho a lo que pasó con la agilidad.**

Llegó, aceleró las entregas, y se aceleró tanto que el sistema no aguantó el
ritmo. Entonces aparecieron los híbridos, los marcos mezclados, los ajustes. Lo
que nunca llegó a implantarse del todo acabó fundiéndose con el proceso que ya
había.

```figura
{ "tipo": "capas", "titulo": "El mismo patrón, veinte años después",
  "capas": [
    { "n": "1", "que": "Llega algo que multiplica la capacidad de producir." },
    { "n": "2", "que": "La producción se dispara y el resto del sistema no sigue el ritmo." },
    { "n": "3", "que": "Se acumula lo construido que no se puede desplegar con confianza." },
    { "n": "4", "que": "Se frena, se ajusta y acaba fundiéndose con el proceso que ya existía.", "tono": "clave" }
  ],
  "pie": "Con la IA vamos por el escalón dos, y el cuello de botella no es cuánto se construye." }
```

Puedes generar diez veces más código. Si no tienes cómo confiar en él, no vas a
desplegar diez veces más. Se te va a acumular.

Y eso cambia dónde está el trabajo de calidad: **el cuello de botella ya no es
producir, es poder confiar en lo producido**.

## De validar el producto a auditar al que lo construye

Aquí es donde veo el próximo salto del Quality Engineering, y no es una idea
cómoda porque nos saca del sitio conocido.

Hasta ahora nuestro objeto de estudio era el software. Si el agente toma
decisiones técnicas, **el objeto de estudio pasa a incluir al agente**.

```figura
{ "tipo": "marcas", "titulo": "Qué habría que poder auditar de un agente que decide",
  "filas": [
    { "vale": true, "que": "Por qué eligió eso", "porque": "una decisión sin motivo registrado no se puede revisar ni discutir" },
    { "vale": true, "que": "Hasta dónde puede llegar solo", "porque": "qué toca sin preguntar y qué exige una persona; un prompt no es un permiso" },
    { "vale": true, "que": "Si sigue acertando con el tiempo", "porque": "lo que se evaluó una vez no queda evaluado: el modelo cambia bajo tus pies" },
    { "vale": true, "que": "Cuánta deuda deja detrás", "porque": "es la métrica que delata al agente que cierra tickets y empeora el sistema" },
    { "vale": false, "que": "Que las pruebas estén en verde", "porque": "si otro agente las escribió sobre el mismo código, el verde no es independiente" }
  ] }
```

Esa última fila es la trampa más seria del montaje entero. Cuando quien escribe
el código y quien escribe la prueba salen del mismo sitio, **el verde deja de
ser una comprobación y pasa a ser un eco**. Comparten el mismo malentendido, y
coinciden.

Por eso la pieza que de verdad sostiene todo esto no es el modelo: es tu
andamiaje de pruebas. Si tus datos se pisan y tu suite falla a ratos, un agente
no te va a arreglar nada — te va a producir las mismas mentiras, más deprisa.
Lo desarrollé en [de un modelo que escribe a un sistema que
ejecuta](/notas/de-llm-a-agentes-en-testing/).

## Y la parte local, que nadie dice en voz alta

En el debate salió algo que agradezco, porque es incómodo: la distancia entre
lo que se lee en LinkedIn y lo que se vive aquí.

En Perú, y me atrevo a decir que en buena parte de la región, seguimos usando
la IA sobre todo como **asistente de productividad**. Ayuda a escribir, a
resumir, a desatascar. Eso ya es valioso. Pero está lejos de un ecosistema de
agentes autónomos y gobernados, que es de lo que se habla en las conferencias.

No lo digo como lamento. Faltan madurez técnica, infraestructura, estándares y
—sobre todo— una estrategia clara para llevarlo a escala, y eso no se compra
con una licencia.

Lo que sí me parece un error es cualquiera de las dos reacciones fáciles:

```figura
{ "tipo": "matriz", "titulo": "Dos formas de perder el tren",
  "celdas": [
    { "rotulo": "Negarlo", "que": "«Aquí eso no va a pasar». Pasa, solo que más tarde, y te pilla sin criterio formado.", "tono": "alta" },
    { "rotulo": "Fingirlo", "que": "Decir que ya orquestas agentes cuando usas un asistente. Se nota en la primera pregunta técnica.", "tono": "alta" },
    { "rotulo": "Lo que sí sirve", "que": "Montar lo que falta: trazas, límites, evaluación continua. Se puede empezar hoy y con poco." },
    { "rotulo": "La ventaja rara", "que": "Ir detrás permite llegar con los mecanismos de control puestos, que es lo que allá se saltaron." }
  ] }
```

Esa última celda la digo en serio. La prisa de otros mercados se está pagando
en deuda y en desconfianza. Llegar un poco después, con la gobernanza montada,
no es una desventaja: es la única forma de que esto escale sin reventar.

---

Vuelvo a la pregunta del principio, la de hacia dónde va el perfil.

No creo que seamos menos. Creo que vamos a dedicarnos a otra cosa. Menos
ejecutar casos y más **diseñar los mecanismos que permiten confiar**: la traza
que explica una decisión, el límite que un agente no cruza solo, la evaluación
que se repite, el criterio de cuándo hace falta una persona.

Porque conseguir que una IA escriba código ya no impresiona a nadie. **Lo
difícil, y lo que todavía no sabemos hacer bien, es demostrar que sus
decisiones siguen siendo correctas, seguras y sostenibles cuando nadie la está
mirando.**

Ese es el trabajo. Y me parece bastante más interesante que el anterior.
