---
titulo: El sleep que metiste para salir del paso sigue ahí
resumen: >-
  Playwright espera solo casi siempre. Cuando no lo hace, la salida rápida es un
  sleep, y esa salida rápida se queda en la suite durante años.
fecha: 2026-09-15
etiquetas: [Playwright, Flakiness, Buenas prácticas]
portada: espera
codigo:
  repo: playwright-screenplay-ts
  titulo: Esperar por condición, no por reloj
  archivos:
    - ruta: src/screenplay/Ensure.ts
      que: La aserción que reintenta hasta que se cumple o vence el plazo
    - ruta: src/questions/Visibility.ts
      que: Una pregunta que devuelve booleano, para poder reintentarla
    - ruta: src/tasks/AgregarTarea.ts
      que: Una acción que no devuelve el control hasta garantizar su efecto
    - ruta: demo/app.js
      que: El retardo de 250 ms que obliga a la suite a esperar de verdad
---

Todos los sleeps de una suite entraron igual. Una prueba fallaba una de cada
cinco veces, alguien tenía que entregar, y `await page.waitForTimeout(2000)` lo
arregló en treinta segundos. Nadie volvió a mirarlo.

Lo escribo porque lo he hecho. La diferencia entre un equipo que acaba con
cuarenta sleeps y uno que no tiene ninguno no es la disciplina: es saber qué
hacer en ese momento concreto, cuando la prueba falla y hay prisa.

## Playwright ya espera, y por eso duele más

Antes de escribir una espera conviene saber qué te viene gratis. Cada acción de
Playwright comprueba, antes de ejecutarse, que el elemento esté en el DOM, sea
visible, esté estable —que no se esté moviendo—, reciba eventos y esté
habilitado. Si algo de eso falla, reintenta hasta agotar el plazo.

Lo mismo con las aserciones de `expect(locator)`: reintentan. `toBeVisible`,
`toHaveText` y compañía no miran una vez y fallan; vuelven a mirar hasta que se
cumplen o vence el tiempo.

Esto significa que la mayoría de los sleeps que ves en una suite de Playwright
no arreglan nada: tapan un problema distinto que casualmente también se resuelve
esperando. Y como lo tapan, nadie llega a saber cuál era.

## Dónde falla la espera automática

Hay tres casos donde Playwright no puede adivinar, y son los tres donde de
verdad hay que escribir algo.

**El elemento ya existe y lo que cambia es su contenido.** Una tabla que se
refresca sola, un contador que baja. El nodo está ahí desde el principio, así
que la comprobación de visibilidad pasa de inmediato y lees el valor viejo. Aquí
no hace falta esperar: hace falta **afirmar sobre el valor**, que es lo que
reintenta.

**Lo que esperas ocurre fuera de la pantalla.** Un pago que se confirma por
webhook, un correo que sale, una cola que se procesa. Ninguna comprobación de
DOM te va a decir que terminó.

**La aplicación hace algo después de responder.** Guarda y luego recalcula, o
cierra el modal con una animación de 300 ms. La acción terminó, pero el efecto
todavía no está.

## Qué escribir en su lugar

Para el primer caso, la aserción que reintenta:

```ts
// No: lee una vez y reza.
await page.waitForTimeout(2000);
expect(await total.textContent()).toBe('3 tareas');

// Sí: vuelve a mirar hasta que se cumpla o venza el plazo.
await expect(total).toHaveText('3 tareas');
```

Para el segundo, esperar el evento concreto en vez del reloj:

```ts
// El tiempo que tarde: ni uno más, ni uno menos.
const respuesta = page.waitForResponse((r) => r.url().includes('/api/pagos') && r.ok());
await pagar.click();
await respuesta;
```

Y para lo que no se puede observar de ninguna otra forma, `expect.toPass`, que
reintenta un bloque entero:

```ts
await expect(async () => {
  const estado = await consultarEnBaseDeDatos(idPedido);
  expect(estado).toBe('CONFIRMADO');
}).toPass({ timeout: 30_000 });
```

La diferencia no es de estilo. Un sleep de dos segundos tarda dos segundos
siempre, incluso cuando la condición se cumplió a los cincuenta milisegundos. Y
si un día tarda dos mil cien, falla igual. Una espera por condición sale en
cuanto se cumple y aguanta el día que el servidor va lento.

## Lo que cuesta de verdad

La cuenta que convence a quien decide no es la de la elegancia.

Cuarenta sleeps de dos segundos son ochenta segundos por ejecución. Con una
suite que corre en cada pull request, veinte veces al día, son casi media hora
diaria de máquina esperando a nada. Al mes, quince horas.

Pero lo caro no es eso. Lo caro es que **un sleep no falla: aguanta**. Cuando la
aplicación se vuelve más lenta, la espera por condición te avisa en cuanto pasa
del plazo, y sabes el día que empezó. El sleep sigue en verde hasta que un día
no llega, y para entonces la degradación lleva semanas ahí y nadie sabe cuándo
empezó.

## Sacarlos de una suite que ya los tiene

No los borres todos de golpe: la mitad está tapando algo real y vas a llenar el
canal de rojos sin saber cuál es cuál.

Por orden:

1. **Búscalos y cuéntalos.** Un `grep` de `waitForTimeout` y ya tienes la lista.
   Que sea un número visible cambia la conversación.
2. **Empieza por los que están justo antes de una aserción.** Casi todos salen
   con cambiar la aserción por su versión que reintenta, y no rompen nada.
3. **Los que quedan son los interesantes.** Cada uno esconde una condición que
   nadie supo expresar. Ahí es donde vas a encontrar los defectos de verdad: una
   petición que no se estaba esperando, un estado que se lee antes de tiempo.
4. **Prohíbelo en el linter** cuando ya no queden. `no-restricted-syntax` sobre
   `waitForTimeout` y se acabó la discusión en cada revisión.

Del paso 3 es de donde salen los hallazgos. Los dos últimos sleeps que quité en
una suite escondían el mismo defecto: la aplicación respondía antes de terminar
de escribir, y en producción pasaba lo mismo con los usuarios rápidos.

---

Si tu suite tiene sleeps, no es un problema de disciplina del equipo: es que en
el momento de la prisa nadie tenía a mano la alternativa. Ten las tres de arriba
escritas en algún sitio y la próxima vez se resuelve igual de rápido, pero bien.
