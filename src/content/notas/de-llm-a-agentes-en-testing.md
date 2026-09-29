---
titulo: De un modelo que escribe a un sistema que ejecuta
resumen: >-
  LLM, RAG, agente, varios agentes. Cada escalón añade una capacidad y una
  forma nueva de fallar en silencio. Y debajo de todos, la suite de siempre.
fecha: 2026-09-29
etiquetas: [IA, Agentes, Quality Engineering]
portada: escalones
---

Circula una escalera para explicar la IA en testing: primero un modelo que
genera, luego uno que consulta tus documentos, luego un agente que actúa, y al
final varios agentes coordinados.

La escalera está bien, pero se cuenta como si fuera **madurez**: como si estar
en el cuarto escalón fuera mejor que estar en el segundo. Y no lo es. Son
capacidades distintas, cada una con su coste y su forma propia de romperse.

Lo que sigue es cómo la veo yo, con la pregunta que a mí me importa en cada
escalón: **qué falla aquí, y cómo lo pruebo**.

```figura
{ "tipo": "capas", "titulo": "Cuatro capacidades, no cuatro grados de madurez",
  "capas": [
    { "n": "01", "que": "LLM · genera", "tono": "base" },
    { "n": "02", "que": "RAG · recupera y genera", "tono": "clave" },
    { "n": "03", "que": "Agente · razona, usa herramientas y actúa" },
    { "n": "04", "que": "Varios agentes · se coordinan", "tono": "techo" }
  ],
  "pie": "Y debajo de los cuatro, el *harness*: la suite que ejecuta de verdad. No es un escalón; es el suelo." }
```

## 01 · El modelo que genera

Lo que añade es evidente: escribes lo que quieres y sale texto o código. Casos
de prueba, datos, validaciones, el esqueleto de una automatización.

**Lo que falla:** el modelo no conoce tu producto. Sabe lo que suele haber en
un login, no lo que hay en el tuyo. Genera treinta casos plausibles, y ninguno
sabe que ese formulario alimenta una comisión que se liquida los viernes.

**Cómo se prueba:** aquí no hay nada que probar automáticamente, y conviene
decirlo. Lo que hay es **revisión humana**, caso por caso, la primera vez. Si
tu equipo pega la salida del modelo sin leerla, el problema no es la
herramienta.

## 02 · Recuperar antes de generar

El salto que más valor da, y el que menos equipos tienen montado. Antes de
preguntar al modelo se le pasan los documentos que importan: la historia de
Jira, los criterios de aceptación, el repositorio de casos, los defectos
anteriores.

Deja de inventarse el contexto y empieza a usar el tuyo.

**Lo que falla, y es lo que nadie cuenta:** la recuperación. Si el buscador
trae los tres documentos equivocados, el modelo responde con una seguridad
idéntica a cuando trae los correctos. **No hay señal de error.** El fallo se
parece muchísimo a una respuesta buena.

Y hay uno peor, más callado: el documento correcto **existe pero está
desactualizado**. La respuesta entonces es coherente, está fundamentada, cita
su fuente, y describe un producto que ya no es el tuyo.

**Cómo se prueba:** separando las dos mitades. Por un lado, si lo recuperado
era lo pertinente —eso se mide con un conjunto de preguntas cuya respuesta
correcta ya conoces—; por otro, si la respuesta se apoya de verdad en lo
recuperado o el modelo rellenó huecos por su cuenta. Son dos defectos
distintos y se arreglan en sitios distintos.

```figura
{ "tipo": "comparar", "titulo": "El fallo silencioso del segundo escalón",
  "izq": { "rotulo": "Lo que se ve", "lineas": ["Una respuesta segura", "Con sus fuentes citadas"],
    "pie": "indistinguible de una buena" },
  "der": { "rotulo": "Lo que pasó", "lineas": ["Se recuperó el documento *equivocado*", "o el correcto, pero de hace un año"],
    "pie": "y el modelo respondió igual de convencido" } }
```

## 03 · El agente que actúa

Aquí cambia la naturaleza del problema. El agente mantiene estado, decide el
siguiente paso, llama a herramientas, ejecuta, mira el resultado y vuelve a
decidir.

Deja de producir texto y empieza a **producir efectos**.

**Lo que falla:** tres cosas, y ninguna se parece a un defecto clásico.

El bucle que no termina, porque interpreta un fallo como algo temporal y
reintenta. Cada vuelta cuesta dinero.

La acción correcta en el sitio equivocado: ejecuta exactamente lo que debía,
contra el entorno que no era.

Y el no determinismo: la misma entrada, dos caminos distintos. Eso convierte
«no reproducible» en una respuesta frecuente, y ya sabemos lo que eso
significa para un informe de defecto.

**Cómo se prueba:** dejando de esperar determinismo donde no lo hay. Lo que se
afirma no es el camino, es el **resultado y los límites**: que llegó al
objetivo, que no tocó lo que no debía, que no gastó más de X pasos. Esa última
es la que casi nadie pone, y es la que avisa de los bucles.

Y algo que no es opcional: **poder ver el estado en cada paso**. Sin eso, cada
fallo es arqueología.

## 04 · Varios agentes coordinados

Un agente por especialidad —diseño de casos, automatización, ejecución,
análisis de fallos, informes— trabajando hacia un objetivo común.

**Lo que falla:** los mismos fallos del escalón anterior, pero ahora se
propagan. Un agente que entiende mal el requisito se lo pasa al que diseña,
que se lo pasa al que automatiza. Al final hay doscientas pruebas
impecablemente escritas sobre una premisa falsa, y el informe dice que todo
está bien.

Es el juego del teléfono, con presupuesto.

**Cómo se prueba:** en las **juntas**. Cada traspaso entre agentes es un
contrato —esto es lo que te doy, esto es lo que espero— y ahí es donde se
prueba, igual que se prueba la integración entre dos servicios. Comprobar solo
el extremo final es enterarse tarde.

Y conviene decirlo: este escalón está de moda y **casi ningún equipo lo
necesita todavía**. Es bastante frecuente ver a alguien montando una orquesta
de agentes sobre una suite que tarda cuarenta minutos y falla tres veces por
semana.

## Y debajo de todo, el harness

Esta es la parte que más me interesa, y la que suele quedarse fuera del
dibujo.

El *test harness* —el entorno de ejecución, los datos, las utilidades, las
aserciones, las trazas, los informes— **no es un quinto escalón**. Es el suelo
sobre el que se apoyan los cuatro.

```figura
{ "tipo": "flujo", "titulo": "Quién decide y quién ejecuta",
  "pasos": [
    { "que": "La IA decide", "nota": "qué probar y qué acción tomar" },
    { "que": "El harness ejecuta", "tono": "bueno", "nota": "y captura la evidencia" },
    { "que": "La IA interpreta", "nota": "lo que el harness devolvió" }
  ],
  "pie": "Si el paso de en medio no es de fiar, los otros dos dan igual." }
```

La consecuencia es incómoda, y por eso conviene decirla clara: **tu capacidad
de usar IA en pruebas está limitada por la calidad de tu suite, no por el
modelo que uses.**

Si tus pruebas comparten datos, dependen del orden y fallan de forma
intermitente, un agente encima de eso no arregla nada: va a recibir resultados
que no significan lo que dicen, y va a decidir sobre ellos. Tendrás las mismas
mentiras, generadas más deprisa.

Un harness que sirve para esto tiene cuatro propiedades, y ninguna es nueva:

**Determinista.** La misma entrada da el mismo resultado. Sin eso, el agente
no puede distinguir un defecto de un fallo intermitente, igual que no puedes
tú.

**Aislado.** Cada ejecución crea lo que necesita y no depende de lo que dejó
la anterior.

**Observable.** Trazas, capturas, estado. No para el informe: para que lo que
decida el siguiente paso tenga algo que leer.

**Con un límite.** Qué puede tocar y qué no. Esto era una buena práctica
cuando quien ejecutaba eras tú; con un agente que decide solo, es un
requisito.

## Entonces, ¿en qué escalón conviene estar?

Mi respuesta es menos emocionante que la escalera: **en el segundo, bien
hecho**, antes que en el cuarto a medias.

Un RAG sobre tus historias y tus defectos, con la recuperación medida, le da a
tu equipo más valor esta semana que una orquesta de agentes montada sobre una
suite que no es de fiar.

Y el orden para subir no es el del dibujo. Es este: primero el harness,
después el contexto, después la acción, y la coordinación al final, si hace
falta.

---

La escalera describe capacidades. El suelo decide si sostienen algo.
