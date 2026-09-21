---
titulo: Tu próximo usuario puede no ser humano
resumen: >-
  Cada vez más tareas las hace un agente. No se queja, no llama a soporte y no
  te da una segunda oportunidad: se va a la competencia.
fecha: 2026-09-24
etiquetas: [Agentes, IA, Producto]
portada: agente
---

Durante toda la historia del software probamos para una persona. Alguien con
ojos, con paciencia limitada y con la capacidad de deducir que ese botón gris
de abajo es el que continúa.

Esa suposición se está rompiendo. Cada vez más, quien completa una compra,
rellena un formulario o consulta un saldo es un agente actuando por encargo de
alguien.

## Qué cambia cuando el usuario es un agente

**No deduce, lee.** Una persona entiende que el icono del carrito es el
carrito. Un agente necesita que ese elemento tenga un rol y un nombre. Si tu
botón es un `div` con una imagen dentro, para él no existe.

**No tiene paciencia, tiene presupuesto.** Cada paso adicional, cada reintento
y cada pantalla intermedia consumen tokens, y los tokens cuestan dinero. Un
flujo de nueve pasos no le resulta «pesado»: le resulta *caro*.

**No se queja.** Y esta es la parte incómoda. Una persona que se atasca
escribe a soporte, deja una reseña, llama. Tienes una señal. Un agente que se
atasca abandona en silencio y prueba en otro sitio. No hay ticket, no hay
queja, no hay dato. Solo una venta que no ocurrió.

**No perdona la ambigüedad.** Dos botones que dicen «Continuar» son un
problema menor para un humano, que mira el contexto. Para un agente son una
bifurcación sin criterio.

## La señal que no vas a tener

Lo que más me preocupa de esto no es técnico. Es que **el fallo es
invisible**.

Con usuarios humanos, un flujo roto genera ruido: reclamos, tickets, caída en
el embudo que alguien acaba mirando. Con agentes, el mismo flujo roto genera
exactamente nada. La curva baja un poco y se atribuye a la estacionalidad.

Cuando una parte relevante de tus transacciones venga de agentes —y va a
venir— vas a necesitar detectar ese fallo antes, porque después no hay nadie
que lo cuente.

## Lo bueno: no hay que empezar de cero

Casi todo lo que hace un sistema navegable para un agente es lo mismo que lo
hace accesible y comprobable:

Roles y nombres correctos. Estados anunciados de forma explícita. Mensajes de
error asociados a su campo. Flujos sin pasos decorativos. Respuestas
predecibles.

Es la misma lista de la [accesibilidad](/notas/la-accesibilidad-dejo-de-ser-opcional/),
y la misma que hace que tus localizadores no se rompan en cada rediseño. Tres
motivos distintos, una sola inversión.

## Por dónde se empieza

**Recorre tu flujo principal con un agente.** Con el MCP de Playwright, sin
darle pistas: que navegue solo. Donde se trabe, hay un problema que tus
usuarios humanos están sorteando con paciencia.

**Cuenta los pasos.** Cuántas acciones necesita desde que entra hasta que
completa. Ese número es tu factura.

**Mira si puede saber que terminó.** Muchos flujos acaban con un cambio visual
que un humano interpreta y un agente no: sin confirmación explícita, no sabe
si compró o no.

---

No hace falta rediseñar el producto para las máquinas. Hace falta dejar de
asumir que al otro lado siempre hay alguien dispuesto a adivinar.
