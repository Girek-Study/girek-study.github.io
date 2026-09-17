---
titulo: El dato de prueba que alguien más está usando
resumen: >-
  La suite pasa en tu máquina y falla en el pipeline. No es el entorno: es que
  dos pruebas están tocando el mismo registro y una llegó primero.
fecha: 2026-09-17
etiquetas: [Datos de prueba, Automatización, Flakiness]
portada: datos
codigo:
  repo: playwright-screenplay-ts
  titulo: Cada prueba con lo suyo
  archivos:
    - ruta: tests/fixtures.ts
      que: La fixture que entrega un actor ya equipado a cada prueba
    - ruta: tests/tareas.spec.ts
      que: Pruebas que crean su propio estado en vez de heredarlo
    - ruta: demo/app.js
      que: La app de ejemplo, con su estado en memoria y sin base compartida
---

Hay un fallo que todos hemos perseguido: la prueba pasa sola, pasa en tu
máquina, y falla cuando corre con las demás. La primera sospecha siempre es el
entorno. Casi nunca es el entorno.

Es que dos pruebas están tocando el mismo registro, y en paralelo una llegó
primero.

## La cuenta de siempre

Casi todas las suites empiezan igual. Alguien crea un usuario para probar, lo
llama `qa_test_01`, y funciona. La siguiente prueba lo reutiliza porque ya
existe. A los seis meses hay cuarenta pruebas usando esa cuenta.

Entonces empiezan los síntomas, y en este orden:

**Las pruebas dejan de poder correr en paralelo.** Alguien lo descubre el día
que activa los workers de Playwright y la mitad se pone roja. La solución
habitual es volver a ponerlo en uno. Con eso, la suite que tardaba cuatro
minutos pasa a tardar veinte, y nadie vuelve a tocarlo.

**Hay que ejecutarlas en un orden concreto.** La de «crear» tiene que ir antes
que la de «editar», que tiene que ir antes que la de «eliminar». Ya no son
pruebas: es un guion que se representa entero o no funciona.

**Cuando falla una, fallan todas las demás.** El informe da treinta rojos y
ninguno dice nada. El defecto está en el primero; los otros veintinueve son
daño colateral.

**Y alguien la toca a mano.** Un martes, un compañero entra a ese usuario para
reproducir un caso, le cambia el estado y se va a comer. La suite lleva tres
días en rojo por eso.

## La regla que ordena todo esto

Una prueba debe crear lo que necesita, usarlo y no depender de que nadie más lo
deje como estaba.

Suena obvio y casi nunca se cumple, porque crear el dato cuesta más que
reutilizarlo. Pero ese costo se paga una vez, y el otro se paga en cada
ejecución durante años.

En la práctica son tres decisiones:

**Cada prueba con su propio dato, generado al vuelo.** Nada de `qa_test_01`:
`qa_1726502841_a7f3`. Si dos pruebas corren a la vez, no se ven.

**Que lo cree la propia prueba, no un script previo.** Un `seed` que se ejecuta
antes es otra dependencia de orden, y cuando falla nadie sabe si fue el seed o
la prueba.

**Y que se limpie sola, o que no haga falta limpiar.** Lo segundo es mejor. Si
el dato es único y nadie más lo busca, puede quedarse ahí.

## Dónde se pone eso en Playwright

Las fixtures son el sitio. No un `beforeEach`, que corre siempre lo mismo para
todas, sino una fixture que cada prueba pide si la necesita:

```ts
export const test = base.extend<Fixtures>({
  // Cada prueba que pida `cuenta` recibe una suya, recién creada.
  cuenta: async ({ request }, use) => {
    const correo = `qa_${Date.now()}_${Math.random().toString(36).slice(2, 6)}@ejemplo.test`;
    const creada = await crearCuenta(request, correo);

    await use(creada);

    // Lo de después del `use` corre al terminar, pase lo que pase.
    await borrarCuenta(request, creada.id);
  },
});
```

Dos cosas que importan de esa forma. La primera es que solo se ejecuta para las
pruebas que la piden: las que no necesitan cuenta no pagan el tiempo de
crearla. La segunda es que lo que va después del `use` se ejecuta aunque la
prueba falle, así que la limpieza no depende de que todo haya ido bien.

**Créalo por API, no por la interfaz.** Registrar un usuario clicando el
formulario para poder probar otra cosa es lento y frágil: si el registro se
rompe, se cae todo lo demás por un motivo que no tiene nada que ver.

## Lo que no se puede aislar

Hay cosas que no se pueden duplicar por prueba, y conviene reconocerlas antes
de pelearse con ellas.

En banca me encontré con el caso claro: un producto que solo admite una
solicitud activa por cliente. No puedes tener dos pruebas creando solicitudes
para el mismo cliente, y crear clientes nuevos implicaba un alta con validación
externa que tardaba minutos.

Ahí lo que funciona es un **pool**: un conjunto de clientes preparados, y un
mecanismo que reparte uno a cada prueba y lo devuelve al acabar. No es elegante,
pero convierte un recurso escaso en uno que se puede pedir sin que dos pruebas
se lo disputen.

La otra salida es aceptar que ese grupo de pruebas corre en serie, y marcarlo
explícitamente en vez de descubrirlo por fallos. En Playwright, un
`test.describe.serial` en ese bloque concreto dice justo eso, y deja el resto de
la suite en paralelo.

## Por dónde empezar si ya la tienes así

Nadie va a parar dos semanas a rehacer los datos de una suite. Lo que sí
funciona:

1. **Sube los workers a dos y mira qué se rompe.** Lo que falle son exactamente
   las pruebas que comparten estado. Ya tienes la lista, y no te la ha dado una
   auditoría sino la propia suite.
2. **Empieza por las que más fallan.** Suelen ser las mismas que más comparten.
3. **Cada prueba nueva, con su dato propio.** Aunque las viejas sigan como
   están, deja de crecer el problema.
4. **Prohíbe el usuario compartido en la revisión.** Cuesta menos rechazarlo en
   un pull request que quitarlo dentro de un año.

---

El día que la suite corre en paralelo sin tocar nada más, no has ganado
velocidad: has ganado que cuando algo se ponga rojo signifique lo que dice.
