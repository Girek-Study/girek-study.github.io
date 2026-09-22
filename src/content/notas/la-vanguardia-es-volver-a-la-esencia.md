---
titulo: La vanguardia, en 2026, es volver a lo básico
resumen: >-
  Modelado de dominio, diseño formal de pruebas, buenas prácticas de
  ingeniería. Lo que parecía anticuado resultó ser lo que la IA no reemplaza.
fecha: 2026-09-23
etiquetas: [Fundamentos, Quality Engineering, Criterio]
portada: esencia
---

Hay una ironía en lo que está pasando. Cuanto más avanza la herramienta, más
valor tiene lo que se enseñaba hace veinte años y dejamos de practicar porque
parecía burocrático.

No es nostalgia. Es que cuando escribir código deja de ser el cuello de
botella, el cuello de botella pasa a ser **saber qué escribir**, y eso nunca
se resolvió con herramientas.

## Modelar el dominio antes de probarlo

Dibujar las entidades, sus estados y las transiciones válidas entre ellos.
Suena a diagrama de universidad y es la herramienta más rentable que conozco.

Un pedido que puede estar creado, pagado, preparado, enviado y entregado tiene
transiciones válidas y transiciones que no deberían poder ocurrir. En cuanto
lo dibujas, aparecen solas las preguntas: ¿se puede cancelar uno ya enviado?,
¿qué pasa si el pago se confirma después de cancelar?

Ninguna de esas preguntas está en el requisito. Todas salen del modelo. Y un
modelo lo hace alguien que entendió el negocio.

## Diseño formal de casos, que no es papeleo

Clases de equivalencia y valores límite tienen mala fama porque se enseñaron
como relleno de plantillas. Pero son la diferencia entre probar quince veces
lo mismo y probar quince cosas distintas.

Un campo que acepta de 1 a 999: probar 1, 999, 0, 1000 y una letra cubre más
que treinta valores al azar en medio. Un modelo te genera los treinta del
medio sin pestañear; los cuatro que importan salen de saber dónde están los
bordes.

**Tablas de decisión** para las reglas cruzadas. **Transición de estados**
para los flujos. Son cuatro técnicas, se aprenden en una tarde, y siguen
siendo lo que separa una suite que cubre de una que abulta.

```figura
{
  "tipo": "comparar",
  "titulo": "Un campo que acepta de 1 a 999",
  "izq": {
    "rotulo": "Treinta valores al azar",
    "lineas": [
      "312, 447, 88, 501, 276…"
    ],
    "pie": "treinta veces la misma clase"
  },
  "der": {
    "rotulo": "Los bordes",
    "lineas": [
      "1 · 999 · 0 · 1000 · *una letra*"
    ],
    "pie": "cinco casos, cinco comportamientos distintos"
  },
  "pie": "Un modelo genera los treinta del medio sin pestañear. Los cinco que importan salen de saber dónde están los bordes."
}
```

## Buenas prácticas de ingeniería, también en las pruebas

El código de pruebas es código. Nombres que digan algo, funciones cortas, sin
repetición absurda, con control de errores. Cuando la IA genera el borrador,
esto importa más y no menos: lo que llega es plausible y uniforme, y lo
plausible y uniforme se revisa peor que lo torpe.

## Calidad preventiva, que es la que no se ve

La prueba más barata es la que evita el defecto antes de que exista. Leer un
requisito y preguntar «¿qué pasa si esto llega vacío?» cuesta cinco minutos y
ahorra el ciclo entero de encontrarlo, reportarlo, arreglarlo y verificarlo.

Esa reunión de treinta minutos con negocio y desarrollo antes de construir es
la actividad con mejor retorno de todo el oficio, y es la primera que se cae
cuando hay prisa.

## Por qué ahora esto vale más

Cuando la ejecución era cara, la habilidad escasa era ejecutar: quien
automatizaba rápido destacaba.

Ahora la ejecución es barata. Lo escaso pasó a ser **saber qué pedir, y
reconocer si lo que volvió está bien**. Las dos cosas se apoyan en
fundamentos.

Y hay un detalle práctico: para revisar el código que genera un modelo hay que
poder leerlo mejor que él. Eso no se consigue usando la herramienta. Se
consigue habiendo escrito mucho a mano antes.

---

Lo básico dejó de ser el punto de partida que se supera. Ahora es la ventaja
que no se puede automatizar.
