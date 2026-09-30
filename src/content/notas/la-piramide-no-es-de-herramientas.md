---
titulo: La pirámide no te dice qué herramienta usar
resumen: >-
  Te dice dónde no poner una prueba. El catálogo de frameworks es la parte
  fácil; lo difícil es a qué nivel va cada riesgo, y qué ejes faltan.
fecha: 2026-09-29
etiquetas: [Estrategia, Herramientas, Quality Engineering]
portada: piramide
---

Cada pocas semanas circula el mismo carrusel: la pirámide de pruebas con un
catálogo de herramientas por nivel. JUnit, TestNG, pytest, Jest, Vitest,
Mocha, Jasmine para la base. REST Assured, Karate, Postman en medio. Selenium,
Cypress, Playwright arriba.

Es información correcta y sirve de poco. Elegir el framework unitario es la
decisión **menos importante** que vas a tomar: usas el de tu lenguaje, el que
ya usa tu equipo, y se acabó. Nadie ha fracasado nunca por elegir TestNG en
vez de JUnit.

Se fracasa por otra cosa: por poner la prueba en el nivel equivocado, y por
no tener nada que cubra tres o cuatro riesgos que en esa pirámide ni aparecen.

## Lo que la pirámide dice en realidad

No es una jerarquía de herramientas. Es una de **coste y de señal**.

```figura
{ "tipo": "barras", "titulo": "El mismo riesgo, comprobado en tres sitios",
  "barras": [
    { "que": "unitaria", "valor": 40, "etiqueta": "40 ms" },
    { "que": "API", "valor": 800, "etiqueta": "0,8 s" },
    { "que": "interfaz", "valor": 25000, "etiqueta": "25 s", "tono": "alarma" }
  ],
  "pie": "Y el de arriba, además, falla por motivos que no tienen que ver con lo que querías comprobar." }
```

Cada escalón hacia arriba cuesta más tiempo, se rompe más veces por motivos
ajenos y tarda más en decirte qué pasó. A cambio, se parece más a lo que hace
un usuario.

De ahí sale la única regla que uso, y no habla de herramientas: **cada
comprobación, en el nivel más bajo donde siga significando algo**.

Un cálculo de comisión se prueba con una función, no con un navegador. Que el
mensaje de error salga junto al campo se prueba con un navegador, porque en
ningún otro sitio existe eso.

## Nivel por nivel, pero con el criterio

**Unitarias.** La herramienta viene dada por el lenguaje. Lo que sí decides es
qué aíslas: si tu prueba unitaria necesita seis dobles para arrancar, el
problema es el diseño del código, no el framework.

Y una que casi nadie usa: **pruebas de mutación** —Stryker en JavaScript, PIT
en Java—. Cambian tu código a propósito y comprueban si alguna prueba se pone
roja. Es la única forma honesta de saber si tus unitarias comprueban algo o
solo ejecutan líneas. La primera vez que la corres duele.

**Integración.** Aquí está el error más caro que veo: llamar «integración» a
lanzar la aplicación entera. Integración es comprobar que dos piezas hablan
bien, y para eso hace falta que el resto sea predecible.

Las herramientas que cambian esto no son clientes de API: son
**Testcontainers** —una base de datos real, en un contenedor, levantada y
destruida por la propia prueba— y los dobles de servicios como **WireMock** o
**MSW**. Con eso dejas de depender de que el entorno compartido esté sano.

**Contratos.** Y este nivel, que en el carrusel no existe, es el que más
defectos caros atrapa. Un consumidor y un proveedor acuerdan una forma; cuando
el proveedor la cambia, el consumidor se entera en producción. **Pact** para
contratos dirigidos por el consumidor, o validar las respuestas contra el
esquema **OpenAPI** en cada ejecución, que es la versión pobre y ya sirve.

**Sistema.** Playwright, Cypress, Selenium. Aquí sí hay decisión real, y el
criterio no es cuál es más rápido: es en qué lenguaje está tu equipo, qué
navegadores necesitas de verdad, y si te hace falta paralelismo propio.

Y arriba hay menos sitio del que parece. Si tienes cuatrocientas pruebas de
interfaz, no tienes una buena suite: tienes una pirámide invertida y
cuarenta minutos de espera.

## Los ejes que la pirámide no tiene

Esta es la parte que falta en casi todos esos carruseles, y la que separa una
estrategia de un catálogo. No son niveles: **son ejes que la cruzan entera**.

```figura
{ "tipo": "marcas", "titulo": "Lo que la pirámide clásica no cubre",
  "filas": [
    { "vale": true, "que": "Seguridad", "porque": "dependencias, secretos, y el OWASP Top 10 como casos" },
    { "vale": true, "que": "Rendimiento", "porque": "y son dos cosas distintas: el servidor y el navegador" },
    { "vale": true, "que": "Accesibilidad", "porque": "obligatoria por ley en la UE desde junio de 2025" },
    { "vale": true, "que": "Datos de prueba", "porque": "decide si tu suite puede correr en paralelo" },
    { "vale": false, "que": "Doce frameworks unitarios", "porque": "usas el de tu lenguaje y se acabó" }
  ] }
```

### Seguridad

Lo más rentable no es un escáner: es lo que corre en cada cambio sin que nadie
lo pida.

**Dependencias vulnerables** —`npm audit`, Snyk, Trivy— bloqueando el
pipeline, no informando. **Secretos** que se cuelan en el repositorio
—gitleaks, o el escaneo del propio GitHub—. **Análisis estático** con Semgrep,
que además admite reglas propias para los patrones que te importan a ti.

Y del lado dinámico, **OWASP ZAP** tiene un modo de escaneo pasivo que cabe en
un pipeline. No sustituye a un pentest, pero atrapa lo evidente.

Lo que no automatiza ninguna herramienta, y es lo que más encuentro: **cambiar
un identificador en la URL** y ver si te devuelve el pedido de otro. Eso es
control de acceso roto, es el número uno del OWASP Top 10, y se prueba con la
API en la mano y un poco de mala idea.

### Rendimiento, que son dos cosas

Aquí se confunden dos problemas distintos, y por eso muchos equipos miden uno
y sufren el otro.

**El servidor**: cuánto tarda en responder bajo carga. **k6** si quieres
escribirlo en JavaScript y meterlo en el pipeline; **Gatling** si vienes de
JVM; **JMeter** si ya lo tienes montado, aunque su formato envejece mal.

**El navegador**: cuánto tarda la pantalla en ser usable. Eso no lo ve ninguna
prueba de carga. Se mide con **Lighthouse** en CI o leyendo los Core Web
Vitals desde la propia prueba de Playwright.

Los dos con un umbral que ponga rojo el pipeline. Sin umbral, es un informe.

### Accesibilidad

**axe-core** dentro de tu suite de Playwright o Cypress cubre en torno a un
tercio de los criterios. **Pa11y** si prefieres una herramienta aparte.

El resto —navegar con teclado, que el foco se vea, que el texto alternativo
diga algo— no lo automatiza nadie. Y desde junio de 2025 no es una buena
práctica: es obligación legal en la Unión Europea.

### Datos y entornos

El eje más invisible y el que más suites rompe. **Faker** para generar,
factories para construir, y sobre todo la regla: cada prueba crea lo suyo por
API. Lo conté en detalle en [el dato de prueba que alguien más está
usando](/notas/el-dato-de-prueba-que-alguien-mas-esta-usando/).

Y **Testcontainers** otra vez, porque resuelve el problema de raíz: si la base
de datos nace y muere con la prueba, no hay estado compartido que limpiar.

### Visual

**Playwright** trae comparación de capturas integrada, que para la mayoría es
suficiente. **Applitools** o **Percy** cuando el producto es visual de verdad
y necesitas comparación inteligente en muchos navegadores.

Aviso: la comparación visual es la que más falsos positivos genera de todas.
Si la metes sin acotar el área, la vas a desactivar en un mes.

## Cómo se elige de verdad

Cuatro preguntas, en este orden. Ninguna es «¿cuál es más popular?».

```figura
{ "tipo": "flujo", "titulo": "Antes de abrir la comparativa de frameworks",
  "pasos": [
    { "que": "¿Qué riesgo quiero cubrir?", "nota": "no qué pantalla quiero tocar" },
    { "que": "¿Cuál es el nivel más bajo donde se ve?", "nota": "ahí va la prueba" },
    { "que": "¿En qué lenguaje está mi equipo?", "nota": "esto decide el 80% de la herramienta" },
    { "que": "¿Corre en el pipeline y bloquea?", "tono": "bueno", "nota": "si no, no cuenta" }
  ] }
```

La tercera es la que más discusiones ahorra. Una suite en un lenguaje que tu
equipo no domina la mantiene una persona, y esa persona un día se va.

Y la cuarta es la que descarta la mitad de las herramientas bonitas: si no
puede correr sin que alguien la lance a mano, no forma parte de tu estrategia.
Es una demo.

## La trampa de la pirámide

Para terminar, lo que más me he encontrado: equipos que usan la pirámide como
coartada.

Tres mil pruebas unitarias, una cobertura preciosa, cero pruebas de contrato,
ninguna de seguridad, ninguna de rendimiento, y los defectos apareciendo en
producción exactamente en las junturas que nadie cubre.

La pirámide estaba perfecta. El producto no.

Porque la forma no es el objetivo. La pirámide es una consecuencia de poner
cada comprobación donde cuesta menos, no una figura que haya que dibujar.

---

El catálogo de herramientas es la parte fácil: está a un buscador de
distancia. Lo difícil es decidir qué riesgo merece una prueba, en qué nivel, y
qué eje llevas sin cubrir desde hace dos años.
