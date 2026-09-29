---
titulo: Un prompt no es un control de seguridad
resumen: >-
  Cuando un agente puede ejecutar comandos y tocar tus credenciales, pedirle
  por favor deja de servir. La gobernanza se mudó al sitio donde ejecuta.
fecha: 2026-09-28
etiquetas: [IA, Seguridad, Agentes]
portada: techo
---

Durante dos años, «gobernar» un agente ha querido decir escribirle
instrucciones. No toques producción. No borres nada. Pregunta antes de
ejecutar.

Eso funciona mientras el agente solo escribe texto. En cuanto puede ejecutar
comandos, tocar el sistema de archivos, llamar a servicios y seguir trabajando
cuando tú no estás mirando, deja de funcionar. No porque el modelo sea
malicioso, sino porque **una instrucción es una petición, y una petición se
puede malinterpretar**.

Un permiso, no.

```figura
{ "tipo": "comparar", "titulo": "La diferencia que importa cuando el agente ejecuta",
  "izq": { "rotulo": "Un prompt", "lineas": ["«no toques ~/.aws»"],
    "pie": "una petición: depende de que la interprete bien" },
  "der": { "rotulo": "Un permiso", "lineas": ["~/.aws *no existe* para su proceso"],
    "pie": "un hecho: no hay nada que interpretar" } }
```

## Lo que me hizo mirar esto con atención

Estuve leyendo la documentación de seguridad de Kiro Crew, el entorno de
agentes de AWS, y hay una decisión de diseño que me parece más interesante
que toda la lista de capacidades.

Para proteger las credenciales no deniegan el acceso a `~/.aws` y `~/.ssh`:
**montan un directorio vacío encima**. El agente no recibe un «permiso
denegado» que pueda reintentar, rodear o interpretar como un problema
temporal. Simplemente mira ahí y no hay nada.

Esa diferencia es enorme, y es la misma que conocemos de probar cualquier
sistema: un error se maneja, y a veces se maneja mal. Lo que no existe no
tiene ruta alternativa.

Lo mismo con el aislamiento: no es una regla escrita en un fichero de
configuración que el agente lee, es el sandbox del sistema operativo
—namespaces en Linux, Seatbelt en macOS— aplicado al proceso. El agente no
puede desobedecerlo porque no está en su mano.

## El techo, que es la idea que se queda

La pieza que más me interesa se llama *governance ceiling*, y se resume en
una fórmula: **política ∩ perfil, y gana lo más estricto**.

La política de la organización fija el máximo. El perfil de cada agente puede
estrecharlo. Ni el agente ni una aplicación de terceros pueden ensancharlo.

```figura
{ "tipo": "capas", "titulo": "Quién puede estrechar y quién no",
  "capas": [
    { "n": "01", "que": "Política de la organización", "tono": "techo" },
    { "n": "02", "que": "Perfil del agente: solo puede *estrechar*", "tono": "clave" },
    { "n": "03", "que": "El agente: no puede ampliar nada", "tono": "base" }
  ],
  "pie": "Un techo con muchas puertas más estrechas, y ninguna puerta lo ensancha." }
```

Suena a detalle de arquitectura y es justo lo contrario: es lo que convierte
la gobernanza en algo **comprobable**. Si el límite está en el entorno, se
puede escribir una prueba que lo verifique. Si está en un prompt, lo único que
puedes hacer es leerlo y confiar.

## Qué significa esto para quien prueba

Aquí es donde me toca, y donde creo que hay trabajo nuevo que casi nadie está
haciendo.

**La gobernanza pasa a ser un caso de prueba.** «Pídele al agente que lea las
credenciales y comprueba que no las ve» es una prueba con resultado binario.
Igual que «pídele que ejecute un comando fuera de la lista permitida y
comprueba que no se ejecuta». Eso antes no se podía escribir: no había nada
determinista que afirmar.

**Los registros de auditoría son tu evidencia.** Si cada decisión queda
registrada, tienes con qué reconstruir qué hizo el agente y por qué. Es el
equivalente a las trazas de producción: el sitio donde están los defectos que
tu suite no vio.

**Y aparece un riesgo nuevo que sí es nuestro**: el techo mal puesto. Una
política demasiado ancha no da un error; da un agente que puede hacer más de
lo que nadie pretendía, y eso no se nota hasta que pasa algo. Verificar que
el techo está donde se acordó es exactamente el tipo de comprobación que
nadie hace hasta que hay un incidente.

## Lo que no arregla, que conviene decir

La documentación es honesta en un punto que el entusiasmo suele saltarse: los
permisos de las aplicaciones de terceros, más allá de la API, son **de
momento orientativos**. Revisar qué hace una app antes de conectarla sigue
siendo trabajo humano.

Es decir: el entorno te da límites duros en lo que controla, y sigue habiendo
un perímetro donde lo único que hay es criterio. El mismo sitio de siempre.

---

Esto es la otra mitad de lo que escribí sobre [gobernanza de IA en tres
reglas](/notas/gobernanza-de-ia-en-tres-reglas/). Aquella es organizativa:
qué se acuerda, qué se revisa, quién responde. Esta es la que vive en el
runtime, y llega justo cuando los acuerdos dejan de bastar.

Las dos hacen falta. Pero solo una se puede probar.
