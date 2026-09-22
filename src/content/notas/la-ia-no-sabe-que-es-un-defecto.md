---
titulo: La IA no sabe qué es un defecto
resumen: >-
  Un modelo encuentra diferencias, no defectos. La distancia entre las dos cosas
  es criterio, y es exactamente la parte que no se puede delegar.
fecha: 2026-09-15
etiquetas: [IA, Criterio, API Testing]
portada: criterio
---

Uso modelos de lenguaje todos los días en trabajo de calidad. No escribo esto desde la
desconfianza: lo escribo porque he visto de cerca en qué punto dejan de ayudar, y ese punto
llega antes de lo que la gente espera.

La frase que lo resume: **un modelo encuentra diferencias; un defecto lo declara una
persona.** Entre esas dos cosas hay una decisión que casi nunca está escrita en ningún
requerimiento, y que es justamente por lo que te contratan.

## El espejismo

Lo que hace peligrosa a la IA en testing no es que se equivoque. Es que **produce algo que
se parece mucho al trabajo terminado**.

Pides casos de prueba y recibes treinta, bien redactados, con su precondición y su
resultado esperado. Pides que compare dos respuestas y recibe una lista ordenada de
diferencias. Pides tests automatizados y te llegan compilando. Todo tiene el aspecto de
estar hecho.

El problema aparece cuando alguien pregunta qué riesgo cubre eso. Porque treinta casos
correctos pueden dejar fuera el único flujo donde la plata se mueve, y una lista de
diferencias impecable puede no contener ni un solo defecto.

<aside class="aviso pieza es-ojo">
<span class="aviso-icono"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/></svg></span>
<div>
<span class="aviso-rotulo">Lo que un modelo no puede saber</span>
<p>Que el cambio de formato de fecha se acordó en una reunión hace tres semanas. Que ese <code>null</code> es tolerable en consulta pero no en el cierre contable. Que el módulo de transferencias se toca en el release y el de ayuda no. Nada de eso está en el código ni en el ticket: está en la cabeza de cuatro personas.</p>
</div>
</aside>

## Dónde sí compensa, con nombre y apellido

No es una nota en contra. Estos tres usos me ahorran horas reales todas las semanas, y los
tres tienen algo en común: **el modelo produce material de entrada, no conclusiones**.

<figure class="pieza">
<p class="pieza-titulo">Dónde entra el modelo y dónde entra la persona</p>
<div class="flujo">
<div class="paso">
<span class="paso-marca">Entrada</span>
<p class="paso-titulo">Un requerimiento de cuarenta páginas</p>
<p>Leerlo entero y sacar la lista de campos, tipos y reglas es trabajo mecánico. Ahí el modelo va cinco veces más rápido que yo.</p>
</div>
<div class="paso">
<span class="paso-marca">Propuesta</span>
<p class="paso-titulo">Una lista de escenarios candidatos</p>
<p>Incluidos los aburridos que uno olvida: campo vacío, máximo, cero, negativo, caracteres raros. La cobertura de lo obvio sale barata.</p>
</div>
<div class="paso es-clave">
<span class="paso-marca">Criterio</span>
<p class="paso-titulo">Qué se prueba primero y qué no se prueba</p>
<p>Aquí entro yo. El riesgo no se deduce del texto: se deduce de saber qué se rompió el trimestre pasado y qué mira el negocio el día del cierre.</p>
</div>
<div class="paso">
<span class="paso-marca">Salida</span>
<p class="paso-titulo">Un plan que alguien puede defender</p>
<p>Si me preguntan por qué ese orden, hay una respuesta. Esa respuesta nunca la escribió el modelo.</p>
</div>
</div>
<figcaption>El modelo acelera los extremos —leer mucho, escribir mucho— y no toca el centro, que es donde se decide.</figcaption>
</figure>

Los otros dos usos que sí valen: **comparar dos estructuras grandes y señalar dónde
difieren** —con XML y JSON de cientos de campos, es puro ahorro de vista— y **redactar el
primer borrador de un caso o un reporte**, que después reescribo.

```figura
{
  "tipo": "marcas",
  "titulo": "Dónde delego en un modelo y dónde no",
  "filas": [
    {
      "vale": true,
      "que": "El primer borrador de una prueba",
      "porque": "mecánico, y se revisa en un minuto"
    },
    {
      "vale": true,
      "que": "Datos con reglas cruzadas",
      "porque": "tedioso, y no se cansa"
    },
    {
      "vale": false,
      "que": "Decidir si esa diferencia es un defecto",
      "porque": "eso es criterio, y necesita contexto"
    },
    {
      "vale": false,
      "que": "Elegir el alcance de una regresión",
      "porque": "depende de lo que nadie escribió"
    }
  ]
}
```

## Los cuatro errores que he visto de cerca

**Tomar la diferencia por el defecto.** Es el más común y el que da nombre a esta nota.
Certificando una migración de servicios, el modelo lista cincuenta diferencias entre el
servicio legado y el migrado. No son cincuenta defectos: hay cambios acordados, decisiones
que alguien tomó sin contarlas y, entre todo eso, los pocos que de verdad rompen algo.
Clasificar esas tres categorías exige conocer acuerdos que no están escritos.

**Aceptar tests que nunca han fallado.** Un test generado que pasa a la primera no prueba
nada todavía. Puede estar afirmando sobre un elemento que siempre existe, esperando un
texto que nunca cambia, o capturando su propia excepción. La prueba de que una prueba sirve
es **verla fallar cuando el código está mal**, y eso hay que provocarlo a mano.

**Pedirle veredictos.** «¿Esto está bien?» es la peor pregunta que se le puede hacer a un
modelo: va a responder que sí con una seguridad notable, porque su trabajo es sonar
coherente, no tener razón. «Lístame las diferencias» sí es una buena pregunta.

**Pegar lo que no se puede pegar.** Respuestas con datos de clientes reales, credenciales,
identificadores internos. Aquí el criterio no es técnico sino de oficio: si no lo pondrías
en una diapositiva para gente de fuera, no va a un prompt.

<figure class="pieza">
<p class="pieza-titulo">La misma lista, dos lecturas</p>
<div class="comparativa">
<div class="lado es-flojo">
<p class="lado-rotulo">Lo que devuelve el modelo</p>
<p class="lado-titulo">Tres diferencias</p>
<ul>
<li>fecha en formato distinto</li>
<li>campo opcional que ahora llega como null</li>
<li>lista vacía que cambió de forma</li>
</ul>
</div>
<div class="lado es-bueno">
<p class="lado-rotulo">Lo que decide la persona</p>
<p class="lado-titulo">Un defecto y dos avisos</p>
<ul>
<li>acordada en diseño: se documenta y se cierra</li>
<li>nadie la contó: defecto de comunicación</li>
<li>rompe al consumidor: <b>defecto real</b></li>
</ul>
</div>
</div>
<figcaption>El modelo hizo la parte tediosa sin equivocarse. La parte que importa —cuál de las tres despierta a alguien un viernes— sigue siendo humana.</figcaption>
</figure>

## Cómo lo trabajo hoy

Cuatro reglas, y ninguna es teórica: las cuatro salieron de que algo se me pasó.

1. **El modelo propone, nunca cierra.** Ningún resultado suyo entra en un entregable sin
   que yo lo haya leído línea por línea. Si no tengo tiempo de revisarlo, no tengo tiempo
   de usarlo.
2. **Todo test generado se ve fallar antes de aceptarse.** Rompo el código a propósito. Si
   la prueba sigue en verde, la prueba no existe.
3. **Las preguntas se hacen en forma de tarea, no de juicio.** Extraer, comparar, listar,
   reescribir. Nunca «¿está bien?», «¿es un bug?», «¿puedo liberar?».
4. **Queda registrado dónde se usó.** En el reporte digo qué parte salió de un modelo y qué
   validé yo. Cuando alguien cuestione un hallazgo dentro de seis meses, esa línea ahorra
   una discusión larga.

<aside class="aviso pieza">
<span class="aviso-icono"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.2 20.5 6v6.1c0 4.4-3.5 7.5-8.5 8.7-5-1.2-8.5-4.3-8.5-8.7V6L12 3.2Z"/><path d="m8.8 12 2.3 2.3 4.1-4.4"/></svg></span>
<div>
<span class="aviso-rotulo">La prueba de fuego</span>
<p>Si mañana te piden explicar por qué diste por buena una entrega, ¿tu respuesta se sostiene sin decir «me lo dijo la herramienta»? Si no, ahí falta criterio, no falta modelo.</p>
</div>
</aside>

## Lo que esto significa para quien empieza

Hay una lectura pesimista de todo esto: si la IA escribe los casos y los tests, ¿para qué
hace falta un QA junior?

Yo la veo al revés, y con una condición. La parte mecánica del oficio —escribir el caso
número cuarenta, comparar dos respuestas a ojo— se está abaratando rápido. La parte que
sube de valor es la que nunca fue automatizable: **entender el negocio lo suficiente como
para saber qué merece atención**.

La condición es incómoda: ese criterio se construye haciendo el trabajo mecánico durante un
tiempo. Quien salta directo a pedirle todo a un modelo no está acelerando su aprendizaje,
está saltándose la parte donde se aprende a distinguir. Y eso se nota en la primera reunión
donde hay que defender una decisión.

---

En una entrevista nadie te va a pedir que generes treinta casos de prueba. Te van a poner
un escenario ambiguo y ver qué priorizas. Ahí no hay prompt que te salve, y por eso sigue
siendo el trabajo.
