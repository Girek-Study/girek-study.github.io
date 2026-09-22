---
titulo: Las métricas de QA que no dicen nada
resumen: >-
  Casos ejecutados, porcentaje de cobertura y defectos encontrados se pueden
  subir sin mejorar nada. Las que sí informan miden el resultado, no el esfuerzo.
fecha: 2026-09-18
etiquetas: [Métricas, Liderazgo, Calidad]
portada: metricas
---

Cada cierto tiempo alguien pide «los indicadores de calidad». Casi siempre
acaban siendo los mismos tres: cuántos casos se ejecutaron, qué porcentaje de
cobertura hay y cuántos defectos se encontraron.

Los tres se pueden subir en una tarde sin que el producto mejore lo más
mínimo. Eso no los hace inútiles, pero sí los hace peligrosos: en cuanto se
convierten en objetivo, el equipo aprende a moverlos.

## Por qué las tres de siempre se rompen solas

**Casos ejecutados.** Partes un caso en tres y el número sube un doscientos
por ciento sin haber probado nada nuevo. Mide el troceo de la documentación,
no el alcance de las pruebas.

**Porcentaje de cobertura.** Una prueba que recorre una función y no comprueba
nada la cubre igual que una que valida el resultado. La cobertura dice qué
líneas se ejecutaron, y eso no es lo mismo que qué comportamiento se verificó.
Sirve para lo contrario de lo que se usa: es buena señalando lo que nadie ha
tocado nunca, y mala como objetivo.

**Defectos encontrados.** Esta es la peor de las tres, porque premia
justamente lo que no quieres. Un equipo que encuentra muchos defectos puede
ser uno muy bueno probando o uno que trabaja sobre un producto muy malo. Y
sobre todo: castiga a quien los previene. Si haces bien la parte de revisar
requisitos ambiguos antes de que se construyan, tu número baja.

```figura
{
  "tipo": "marcas",
  "titulo": "Esfuerzo o resultado",
  "filas": [
    {
      "vale": false,
      "que": "Casos ejecutados",
      "porque": "partes un caso en tres y sube un 200%"
    },
    {
      "vale": false,
      "que": "Porcentaje de cobertura",
      "porque": "una prueba sin asserts cubre igual"
    },
    {
      "vale": false,
      "que": "Defectos encontrados",
      "porque": "castiga a quien los previene"
    },
    {
      "vale": true,
      "que": "Defectos escapados a producción",
      "porque": "lo único que nota quien usa el producto"
    },
    {
      "vale": true,
      "que": "Minutos hasta el primer rojo",
      "porque": "si son diez, el autor aún lo tiene en la cabeza"
    },
    {
      "vale": true,
      "que": "Proporción de ejecuciones flaky",
      "porque": "dice si la suite es creíble"
    }
  ]
}
```

## Las que sí aguantan

El cambio es mirar el resultado en vez del esfuerzo. Cuatro que sí he visto
sostener una conversación con negocio:

**Defectos que llegaron a producción.** El único número que le importa a quien
usa el producto. Se cuenta por período y, si se puede, con la severidad al
lado. No mide cuánto trabajó QA: mide qué se escapó.

**Tiempo desde que se sube el cambio hasta el primer rojo.** Si son diez
minutos, el autor todavía tiene el cambio en la cabeza. Si son dos días, ya
está en otra cosa y arreglarlo cuesta el triple. Esta métrica no habla de
calidad, habla de lo rápido que el equipo se entera, que es lo que de verdad
determina el coste.

**Proporción de ejecuciones inestables.** Playwright ya te la da: cuando una
prueba falla y pasa al reintentar, la marca como `flaky` en el informe.

```bash
# Del informe en JSON salen los tres estados que importan.
npx playwright test --reporter=json > informe.json
```

```js
// Inestables sobre el total: la cifra que dice si la suite es creíble.
const total = informe.suites.flatMap(recorrer);
const inestables = total.filter((t) => t.status === 'flaky').length;
```

Si ese cociente sube, da igual lo verde que esté el resto: el equipo está
aprendiendo a reintentar en vez de a leer.

**Tiempo que la suite pasa en rojo.** No cuántas veces se pone roja —eso es
bueno, para eso está—, sino cuánto tarda en volver al verde. Es la medida más
directa de si el equipo la trata como una alarma o como decoración.

## Cómo evitar que estas también se rompan

Ninguna de las cuatro sobrevive sola a que la conviertan en objetivo. Tres
cosas que ayudan:

**Nunca una sola.** Los defectos escapados bajan solos si dejas de liberar. El
tiempo de feedback baja si borras pruebas. Se leen juntas o mienten por
separado.

**Con la tendencia, no con el valor.** «Doce escapados» no dice nada sin saber
si el mes pasado fueron cinco o veinte. Y la tendencia aguanta mucho mejor la
pregunta de «¿comparado con qué?».

**Sin usarlas para evaluar personas.** En cuanto el número aparece en una
evaluación individual, deja de medir el producto y empieza a medir la
habilidad de cada uno para presentarlo.

## La que no se puede graficar

La señal más fiable que conozco no es un número: es si el equipo despliega un
viernes por la tarde.

Cuando la respuesta es «mejor el lunes», hay algo que las métricas no están
capturando, y suele ser lo importante. Nadie retrasa un despliegue por un
porcentaje de cobertura bajo. Lo retrasa porque, en el fondo, no se fía de lo
que el pipeline acaba de decirle.

---

Un indicador que puedes mejorar sin tocar el producto no está midiendo el
producto. Está midiendo cuánto te esfuerzas en el indicador.
