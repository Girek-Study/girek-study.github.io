---
titulo: La accesibilidad dejó de ser un extra y se volvió un requisito
resumen: >-
  Desde junio de 2025 es obligatoria por ley en Europa. Para QA cambia algo
  concreto: hay criterios que se comprueban, y la mitad se automatiza.
fecha: 2026-09-20
etiquetas: [Accesibilidad, Buenas prácticas, Automatización]
portada: acceso
---

Durante años la accesibilidad fue lo último de la lista. Se hablaba de ella en
una charla al año y volvía a la carpeta de «cuando haya tiempo».

Eso cambió el **28 de junio de 2025**, cuando entró en vigor la European
Accessibility Act. Ya no es una buena práctica: es una obligación legal para
banca, comercio electrónico, transporte, telecomunicaciones y servicios
digitales que operen en la Unión Europea, con exención solo para
microempresas. En España el régimen sancionador llega a los 100.000 euros por
infracción.

Si tu producto vende en Europa, esto te aplica aunque tu equipo esté en Lima.

## Qué significa para QA, en concreto

La norma de referencia es la EN 301 549, que incorpora las WCAG en nivel AA.
Suena a documento inabarcable y en la práctica se traduce en criterios
verificables. Esa es la buena noticia: **son criterios, y los criterios se
prueban**.

Lo que cambia en tu trabajo es que aparece una familia de defectos que antes
no reportabas. No porque no existieran: porque no los mirabas.

## Lo que la máquina detecta sola

Hay una parte que se automatiza bien, y conviene montarla primero porque es
barata. La biblioteca estándar es `axe-core`, y en Playwright se enchufa
directamente:

```ts
import AxeBuilder from '@axe-core/playwright';

test('la pantalla de pago no tiene fallos de accesibilidad', async ({ page }) => {
  await page.goto('/pago');

  const { violations } = await new AxeBuilder({ page })
    // El alcance importa: analizar la página entera trae ruido de terceros.
    .include('main')
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  expect(violations).toEqual([]);
});
```

Eso detecta contraste insuficiente, imágenes sin texto alternativo, campos sin
etiqueta, encabezados saltados y atributos ARIA mal puestos. Es mucho, y es
**más o menos un tercio** de lo que exige la norma: las herramientas
automáticas no cubren el resto y ningún proveedor serio dice lo contrario.

```figura
{
  "tipo": "barras",
  "titulo": "Lo que cubre un escáner, y lo que queda",
  "barras": [
    {
      "que": "axe-core",
      "valor": 33,
      "etiqueta": "~1/3"
    },
    {
      "que": "criterio",
      "valor": 67,
      "etiqueta": "~2/3",
      "tono": "alarma"
    }
  ],
  "pie": "Teclado, foco, textos que digan algo y errores que se anuncien: eso no lo ve ninguna herramienta."
}
```

## Lo que la máquina no ve, y tú sí

Los otros dos tercios son criterio, que es justo la parte de QA que no se
delega.

**Navegar con el teclado, sin tocar el ratón.** Tabulador desde arriba. ¿Se
llega a todo? ¿Se ve dónde está el foco? ¿Se puede salir de un modal con
Escape? ¿El orden sigue al de la pantalla o salta? Esta prueba tarda dos
minutos y encuentra más que cualquier escaneo.

**Que el texto alternativo diga algo.** `alt="imagen"` pasa el escáner y no
sirve para nada. Un escáner comprueba que el atributo exista; que describa lo
que hay en la imagen no lo puede saber.

**Que el error se anuncie.** Un mensaje en rojo junto al campo es invisible
para quien no ve el color. Tiene que estar asociado al campo y anunciarse.

**Que el tiempo alcance.** Sesiones que expiran, carruseles que avanzan solos,
mensajes que desaparecen en tres segundos.

## Dónde encaja en la suite

Mi recomendación, por orden de lo que más paga:

1. **Escaneo automático en el pipeline**, en las tres o cuatro pantallas
   críticas. Falla el build si aparece una violación nueva.
2. **Un recorrido de teclado** en el flujo principal, escrito como prueba.
   Playwright lo hace con `page.keyboard.press('Tab')` y comprobando
   `document.activeElement`.
3. **Revisión manual** del contenido nuevo: textos alternativos, mensajes de
   error, formularios.

Con eso cubres bastante más de lo que cubre la mayoría, y sobre todo **dejas
de acumular** deuda nueva.

## El argumento que de verdad convence

Si tienes que defenderlo en una reunión, el legal funciona pero deja mal
sabor. El que cambia la conversación es otro: **lo que haces accesible lo
haces también más comprobable**.

Una interfaz con roles y nombres correctos es una interfaz donde los
localizadores son estables. `getByRole('button', { name: 'Pagar' })` funciona
porque alguien puso bien ese nombre accesible. Si tu equipo pelea con
localizadores frágiles, parte del problema es que la interfaz no está bien
etiquetada para nadie: ni para un lector de pantalla ni para tu suite.

Lo mismo vale para los agentes de IA que leen el árbol de accesibilidad en vez
de la pantalla. Cuanto mejor etiquetada está la interfaz, mejor funciona todo
lo demás.

---

La accesibilidad dejó de ser una cuestión de sensibilidad para volverse una de
cumplimiento. Y, de paso, resultó que arreglaba cosas que llevábamos años
arrastrando por otros motivos.
