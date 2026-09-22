---
titulo: La IA que sí mira la página, y dónde le pongo el freno
resumen: >-
  Con MCP el modelo dejó de adivinar el DOM y pasó a leerlo. Eso cambia qué se
  le puede pedir, y también deja más claro qué no hay que delegarle nunca.
fecha: 2026-09-16
etiquetas: [IA, Playwright, MCP, Buenas prácticas]
portada: mcp
codigo:
  repo: playwright-screenplay-ts
  titulo: Dónde se apoya lo que el modelo escribe
  archivos:
    - ruta: src/screens/LoginScreen.ts
      que: Los localizadores con nombre de negocio, que el modelo puede reutilizar
    - ruta: src/tasks/IniciarSesion.ts
      que: La tarea a la que se traduce lo que el agente exploró
    - ruta: src/screenplay/Ensure.ts
      que: La aserción con reintento, que es lo que nunca se autogenera a ciegas
---

Durante dos años, pedirle a un modelo que escribiera una prueba tenía siempre el
mismo final: el código estaba bien escrito y los selectores eran inventados. El
modelo no había visto la página. Escribía lo que suele haber en una página de
login, no lo que hay en la tuya.

Eso es lo que cambió, y conviene entender por qué antes de decidir qué delegarle.

## Qué es MCP y por qué importa aquí

MCP es un protocolo para que un modelo use herramientas externas con un contrato
estable. Lo relevante para nosotros es que existe un servidor MCP oficial de
Playwright, `@playwright/mcp`, mantenido por Microsoft en el mismo repositorio
que el resto del proyecto.

Lo que hace es dar al modelo un navegador de verdad. Puede navegar, pulsar,
escribir y leer lo que hay, en la aplicación que tú le indiques.

La diferencia con lo anterior no es de grado. El modelo deja de completar texto
plausible y pasa a operar sobre lo que existe: si el botón se llama «Ingresar»,
lo sabe porque lo leyó, no porque sea el nombre más probable.

## El detalle que cambia el resultado: el árbol de accesibilidad

La decisión de diseño que hace que esto funcione es que **no usa capturas de
pantalla**. Lee el árbol de accesibilidad: la misma estructura que usa un lector
de pantalla, con roles, nombres y estados.

Esto tiene tres consecuencias prácticas:

**No hace falta un modelo de visión.** Trabaja sobre datos estructurados, así
que sale más barato y más rápido.

**Es determinista.** «El botón con rol *button* y nombre *Ingresar*» es una
referencia exacta. «El botón azul de abajo a la derecha» es una interpretación,
y dos ejecuciones pueden interpretarla distinto.

**Empuja hacia los localizadores correctos.** Lo que el modelo ve son roles y
nombres accesibles, así que lo que propone tiende a ser `getByRole` en vez de un
XPath de siete niveles. Eso, que parece un efecto secundario, es la mitad del
valor: son los localizadores que sobreviven al siguiente rediseño.

```figura
{
  "tipo": "comparar",
  "titulo": "Lo que el modelo recibe de cada forma",
  "izq": {
    "rotulo": "Con una captura",
    "lineas": [
      "«el botón azul de abajo»"
    ],
    "pie": "una interpretación: dos ejecuciones pueden entenderla distinto"
  },
  "der": {
    "rotulo": "Con el árbol de accesibilidad",
    "lineas": [
      "button · name=*\"Ingresar\"*"
    ],
    "pie": "una referencia exacta, y de paso el localizador que sobrevive al rediseño"
  }
}
```

## MCP o CLI: lo que dice el propio equipo

Aquí hay un matiz que casi nadie menciona, y está escrito en el README del
proyecto.

Para **agentes de código** —los que viven dentro del editor y tienen que
repartir su contexto entre el navegador, tu repositorio y las pruebas—
recomiendan el CLI con skills en vez de MCP, porque MCP carga esquemas de
herramientas y árboles de accesibilidad enteros en el contexto, y eso se paga en
tokens.

MCP sigue siendo lo indicado para **bucles agénticos con estado persistente**:
automatización exploratoria, pruebas que se reparan solas, flujos autónomos
largos donde mantener el navegador vivo compensa el coste.

Traducido a decisiones: si lo que quieres es que tu asistente te ayude a escribir
la suite mientras programas, el CLI. Si quieres un agente que explore la
aplicación durante veinte minutos, MCP.

## Dónde gana de verdad

Después de un tiempo usándolo, estos son los cuatro sitios donde me ahorra horas
reales, en orden de cuánto:

**Reconocer una aplicación que no conozco.** Dejar al agente recorrer los flujos
principales y devolver el mapa: qué pantallas hay, qué campos, qué validaciones
saltan. Lo que antes eran dos días de clicar y tomar notas.

**El primer borrador de una prueba.** No el código final: el esqueleto con los
localizadores reales ya puestos. Corregir un borrador con selectores correctos
cuesta mucho menos que escribirlo desde cero.

**Datos de prueba que cumplan las reglas.** Combinaciones válidas e inválidas de
un formulario con quince campos y reglas cruzadas. Es tedioso, es mecánico y el
modelo no se cansa.

**Leer un fallo.** Pegar la traza, la captura y el log, y pedir las tres
hipótesis más probables. No te dice cuál es, pero te ahorra la media hora de
mirar lo que no era.

## Las pruebas que se reparan solas

Es lo que más se vende y donde más despacio voy.

La idea es tentadora: cuando un localizador deja de encontrar su elemento, el
modelo busca el equivalente y sigue. Cero rojos por rediseños.

El problema es de fondo. **Un localizador que se rompe es información.** A veces
significa que movieron un botón, y ahí reparar está bien. Y a veces significa que
ese botón ya no existe, o que ahora dice otra cosa, o que aparece solo para
algunos usuarios. En esos casos, «repararlo» es tapar el hallazgo con una
aserción nueva que ya no comprueba lo mismo.

Dónde le pongo el freno, en concreto:

1. **Que proponga, no que aplique.** La reparación entra como sugerencia en el
   pull request, con el antes y el después del localizador. La revisa una
   persona.
2. **Nunca en la rama principal sin revisión.** Una suite que se arregla sola en
   la rama que protege producción deja de proteger nada.
3. **Que quede registro de cada reparación.** Si un mismo localizador se repara
   tres veces en un mes, el problema no es el localizador: es que esa parte de la
   interfaz no tiene contrato estable, y eso hay que hablarlo con quien la
   desarrolla.

## La regla que uso

La misma de siempre, que no ha cambiado con nada de esto: **el modelo puede
hacer lo mecánico, y decidir lo decido yo.**

Explorar, mapear, generar el borrador, proponer datos, sugerir hipótesis: todo
eso es mecánico y lo hace mejor y más rápido. Decidir qué es un defecto, qué se
automatiza, qué riesgo se cubre primero y qué reparación se acepta: eso es
criterio, y es exactamente la parte por la que te contratan.

Lo que MCP cambió no es la frontera. Es que ahora el lado mecánico da mucho más
de sí, porque el modelo por fin mira la página en vez de imaginársela.
