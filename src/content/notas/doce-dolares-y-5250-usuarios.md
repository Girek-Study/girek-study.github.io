---
titulo: Un servidor de 12 dólares aguantó 5.250 usuarios a la vez
resumen: >-
  Alguien lo midió con k6 y publicó los números. Lo interesante no es cuánto
  aguantó: es que esa prueba de carga está mejor diseñada que casi todas las
  que he visto en equipos con presupuesto.
fecha: 2026-09-30
etiquetas: [k6, Rendimiento, Arquitectura]
portada: ruptura
---

Circula un experimento que merece la pena mirar con ojos de QA y no de
DevOps: coger el servidor más barato que vende un proveedor —un droplet de
**12 dólares al mes, 1 vCPU y 2 GB de RAM**—, montar encima una red social
completa y apretar hasta que se rompa.

Los números finales son llamativos: **5.250 usuarios concurrentes** en ese
mismo servidor de doce dólares. Pero el resultado es la parte menos
interesante. Lo que me hizo pararlo tres veces es **cómo está diseñada la
prueba**, porque hace bien siete cosas que llevo años echando de menos en
equipos con mucho más presupuesto.

## El montaje: todo en una caja

```figura
{ "tipo": "capas", "titulo": "Una sola máquina de *12 $/mes*, sin nada repartido",
  "capas": [
    { "n": "1", "que": "Nginx como proxy de entrada" },
    { "n": "2", "que": "Node.js con la API: GET /feed, GET /posts/:id, POST /posts/:id/like" },
    { "n": "3", "que": "Postgres en el mismo servidor, sin base de datos aparte" }
  ],
  "pie": "Nada de Redis, nada de réplicas, nada de contenedores repartidos. Una caja." }
```

Y —esto importa más de lo que parece— la base de datos venía **sembrada a
escala realista**: 50.000 usuarios, 497.510 publicaciones y dos millones de
«me gusta». Un total de 140 MB.

Esa es la primera cosa que casi nadie hace. La mayoría de las pruebas de carga
que reviso corren contra una base con veinte filas de prueba, y después nos
sorprende que producción se comporte distinto. Una consulta sin índice sobre
veinte filas responde en un milisegundo. Sobre medio millón, no.

## El escenario tiene forma de persona, no de bucle

Aquí está lo que más veces separa una prueba de carga útil de un número
inventado.

Lo habitual es escribir un bucle que machaca un endpoint lo más rápido que
puede y reportar cuántas peticiones por segundo salieron. Eso no mide tu
sistema: mide tu generador de carga.

El escenario de este experimento es otra cosa:

```figura
{ "tipo": "flujo", "titulo": "Lo que hace *un* usuario virtual, en bucle",
  "pasos": [
    { "que": "Carga el feed", "nota": "GET /feed" },
    { "que": "Espera entre 3 y 7 segundos", "nota": "está leyendo, como cualquiera" },
    { "que": "Abre una publicación", "nota": "y espera otros 3 a 8 s" },
    { "que": "Le da «me gusta»… el 15 % de las veces", "nota": "no siempre" },
    { "que": "Publica algo… el 2 % de las veces", "tono": "bueno", "nota": "la escritura es rara, no constante" },
    { "que": "Espera de 5 a 15 segundos y vuelve al feed", "nota": "el ciclo se reanuda" }
  ],
  "pie": "Tiempos de espera y ramas con probabilidad. Eso es un usuario; lo otro es un martillo." }
```

Dos detalles que valen el artículo entero.

El primero, los **tiempos de espera**. Sin ellos, 1.000 usuarios virtuales
generan la carga de 50.000 personas reales y tu informe es ficción. Con ellos,
1.000 usuarios virtuales se parecen a 1.000 personas.

El segundo, las **ramas con probabilidad**. Un 15 % de «me gusta» y un 2 % de
publicaciones dibuja la proporción real entre lecturas y escrituras. Casi
todas las pruebas de carga que he heredado tratan la escritura como si fuera
tan frecuente como la lectura, o —más común— la ignoran por completo para no
ensuciar la base. Y la escritura es justo la que bloquea.

## La mediana mintió; la cola, no

La rampa fue 10, 50, 100, 200, y de ahí un salto a 1.000. Con los primeros
escalones: mediana de 5,2 ms, 4,5 ms y 4,2 ms, y la CPU al 9 %. Cero señal. La
mediana incluso **baja** al añadir carga, porque la caché se calienta y el
motor de JavaScript optimiza.

Si tu informe se queda ahí, concluyes que el servidor es infinito.

Al subir de 1.000 a 2.000 usuarios pasa lo de verdad:

```figura
{ "tipo": "barras", "titulo": "De 1.000 a 2.000 usuarios: cuánto empeora *cada percentil*",
  "barras": [
    { "que": "p50 ×1,3", "valor": 1.3, "etiqueta": "4,7 → 6,3 ms" },
    { "que": "p95 ×8,5", "valor": 8.5, "etiqueta": "19 → 161 ms", "tono": "alarma" },
    { "que": "p99 ×5,5", "valor": 5.5, "etiqueta": "50 → 276 ms", "tono": "alarma" }
  ],
  "pie": "La barra es el factor de empeoramiento, no la latencia. La mediana apenas se mueve; la cola se multiplica por ocho." }
```

Esta figura es la nota entera resumida. **La mediana es la métrica que peor
avisa de una saturación**, porque la saturación no empieza afectando a todo el
mundo: empieza afectando al 5 % que cae en el momento malo.

Y ese 5 %, en un producto con cien mil sesiones diarias, son cinco mil
personas que vieron una pantalla colgada. La media dice 6 ms. Ellas vieron
otra cosa.

Es la misma historia que conté en [la prueba de carga que nadie vuelve a
mirar](/notas/la-prueba-de-carga-que-nadie-mira/): si tu umbral está puesto
sobre la media, no tienes umbral.

## Encontrar el punto de ruptura es una bisección

2.000 usuarios: pasa. 3.000: **se pasa del criterio de fallo del
experimento**. ¿Y ahora? Se prueba a la mitad: 2.500.

Esa frase escondida —«el criterio de fallo de mi experimento»— es la séptima
cosa que hace bien, y va antes que todas las demás: **el umbral estaba escrito
antes de correr la prueba**. Sin él, «3.000 falla» no significa nada, porque
todo sistema responde a 3.000 usuarios; la pregunta es si responde lo bastante
rápido, y eso solo se contesta contra un número acordado de antemano.

Es tan obvio que da vergüenza escribirlo, y sin embargo la mayoría de las
pruebas de carga que veo son **una sola corrida con un número redondo que
alguien eligió en una reunión**. Quinientos usuarios. ¿Por qué quinientos?
Porque sonaba bien.

Una corrida con un número no da un punto de ruptura: da un aprobado o un
suspenso. El punto de ruptura —el número a partir del cual el sistema deja de
cumplir— es lo único que sirve para planificar, y se encuentra buscando, no
adivinando.

El resultado de la bisección, con **2.500 usuarios a la vez**:

- 232 peticiones por segundo
- mediana de 11 ms
- p95 de 288 ms, dentro del límite
- p99 de 764 ms, **fuera del límite**
- **0 errores de 92.799 peticiones**

Ese último dato es el más importante de la corrida y el que menos se mira.
Saturarse y responder lento es degradación. Saturarse y empezar a devolver
errores es caída. Son dos resultados muy distintos, y mucha gente publica el
percentil sin mirar la tasa de error que lo acompaña.

Y un matiz sobre ese umbral: **el p95 entró y el p99 se quedó fuera**, y el
número que se cuenta es el que cumple el p95. Puede estar perfectamente bien
—depende del producto—, pero deja ver que la pregunta no es solo cuál es tu
umbral, sino **qué percentil lo mide**. Con el p95 el servidor aguanta 2.500;
con el p99, bastantes menos. Es la misma prueba y dos titulares distintos.

## Mirar el recurso, no solo la respuesta

Cuando el servidor dijo basta, la pregunta siguiente no fue «¿cuántos
aguanta?» sino **«¿qué se rompió?»**. Y para contestarla hay que estar mirando
dentro mientras la prueba corre:

```figura
{ "tipo": "marcas", "titulo": "Lo que se observó dentro de la caja",
  "filas": [
    { "vale": true, "que": "RAM: 863 de 1.967 MB", "porque": "sobraba; la memoria no era el cuello" },
    { "vale": true, "que": "Postgres: consultas de ~1 ms", "porque": "la base de datos estaba tranquila" },
    { "vale": true, "que": "CPU: al 90 %", "porque": "ahí estaba el cuello, y por eso el arreglo va por ahí" },
    { "vale": true, "que": "El generador de carga: 37 % de CPU", "porque": "no estaba saturado, así que los números son del sistema y no del generador" }
  ] }
```

La cuarta fila es la que más veces se olvida y la que más informes invalida.
Si tu máquina generadora está al 95 % de CPU, lo que has medido es tu máquina
generadora. Aquí el generador era un servidor de 4 vCPU y 8 GB, a menos de un
milisegundo de red del objetivo, y llegó al 37 %. Por eso los números valen.

Coste de ese generador, por cierto: 4,5 horas a 0,13 $/hora. **Sesenta
céntimos.** Una prueba de carga seria cuesta menos que un café.

## El arreglo más barato no era infraestructura

Cuando la CPU es el cuello, la salida evidente es pagar más: 12 $ con 1 vCPU,
24 $ con 2, 48 $ con 4, 96 $ con 8.

La otra salida fue una condición de tres líneas:

```figura
{ "tipo": "comparar", "titulo": "Dos formas de sostener el doble de usuarios",
  "izq": { "rotulo": "Escalar la máquina",
    "lineas": [
      "Pasar de 1 vCPU a 8 vCPU",
      "De 12 $ a *96 $* al mes",
      "Ocho veces el coste, para siempre"
    ],
    "pie": "Sin tocar una línea de código." },
  "der": { "rotulo": "Guardar la respuesta un segundo",
    "lineas": [
      "El JSON de /feed en la memoria del proceso Node",
      "Expira al segundo",
      "De 2.500 a *4.000* usuarios: un 60 % más"
    ],
    "pie": "Sin Redis, sin infraestructura nueva, mismo servidor de 12 $." } }
```

Y luego el mismo truco un salto más arriba, en Nginx, que devuelve la
respuesta sin llegar siquiera a molestar a Node: de 4.000 a **5.250**.

```figura
{ "tipo": "capas", "titulo": "La escalera de cachés: cada peldaño ahorra *un salto entero*",
  "capas": [
    { "n": "1", "que": "Base de datos — lo más lejos del usuario, lo más caro de consultar" },
    { "n": "2", "que": "Aplicación — la respuesta ya montada, en la memoria del proceso" },
    { "n": "3", "que": "Nginx — contesta sin despertar a la aplicación" },
    { "n": "4", "que": "CDN — contesta sin que la petición llegue a tu servidor" },
    { "n": "5", "que": "El propio teléfono — la petición ni siquiera existe", "tono": "bueno" }
  ],
  "pie": "La regla, tal cual la enuncia el autor: mueve la caché tan cerca de tus usuarios como razonablemente puedas." }
```

Ese «razonablemente» es suyo y hace falta, porque cada peldaño hacia arriba
compra rendimiento pagando con control. Una caché en el proceso la invalidas
cuando quieras; una en el CDN, no del todo; y la del teléfono no la invalidas
en absoluto.

Total: **×2,1 usuarios con el mismo servidor de 12 dólares**, sin cambiar de
arquitectura y sin añadir una sola pieza nueva.

## Y aquí es donde QA tiene que levantar la mano

Porque esa caché no es gratis. **Una caché es una decisión de producto
disfrazada de decisión técnica**, y trae consigo una clase de defecto que
antes no existía: datos obsoletos.

Durante un segundo, todo el mundo ve exactamente el mismo feed. Si publicas
algo y recargas, puedes no verte. En un feed social eso es aceptable y nadie
se entera. En el saldo de una cuenta, en el stock de un producto o en el
estado de un pedido, es un defecto que llega a soporte.

Y es un defecto que **ninguna prueba de carga detecta**, porque la prueba de
carga solo pregunta cuánto tardó, no si lo que devolvió era cierto. Hace falta
una prueba funcional escrita a propósito: escribo, leo inmediatamente, y
compruebo qué me devuelve dentro de la ventana de caché. Si nadie escribe esa
prueba, la caché entra en producción sin que nadie haya decidido cuánta
obsolescencia es tolerable.

Dos preguntas que hago siempre que alguien propone una caché, y que no son
técnicas: cuántos segundos de desfase acepta el negocio en este dato
concreto, y qué acción del usuario tiene que invalidarla al instante.

## 5.250 concurrentes no son 5.250 usuarios

El último tramo del experimento es el que convierte el número técnico en una
respuesta que sirve para una reunión: **solo entre el 5 % y el 10 % de los
usuarios de un producto están conectados a la vez**.

Con esa conversión, 5.250 concurrentes sostienen del orden de **25.000 a
30.000 usuarios activos al día**. En un servidor de doce dólares.

Me gusta esta parte porque es la traducción que casi ninguna prueba de carga
hace. Entregamos percentiles y peticiones por segundo a gente que necesita
saber **cuántos clientes caben**. Esa conversión —con el porcentaje de
concurrencia que tenga tu producto, que sale de tu analítica y no de una regla
general— es lo que hace que la prueba se lea fuera del equipo técnico.

## Lo que este experimento sigue sin probar

Nada de lo anterior significa que puedas montar tu producto en doce dólares.
Significa que la conversación sobre escalar debería empezar midiendo, no
eligiendo arquitectura. Estas son las diferencias que yo apuntaría antes de
citar el número en ningún sitio:

```figura
{ "tipo": "marcas", "titulo": "Lo que la simulación *no* incluye",
  "filas": [
    { "vale": false, "que": "Latencia de red real", "porque": "el generador estaba a menos de 1 ms; un usuario de verdad está a 80-200 ms, y eso cambia cuántas conexiones hay abiertas a la vez" },
    { "vale": false, "que": "TLS y conexiones nuevas", "porque": "el apretón de manos consume CPU, y la CPU era justo el cuello" },
    { "vale": false, "que": "Imágenes y ficheros", "porque": "un feed real mueve megabytes, no JSON de kilobytes" },
    { "vale": false, "que": "Una base que crece", "porque": "140 MB caben en la memoria del servidor; 140 GB no, y ahí Postgres deja de responder en 1 ms" },
    { "vale": false, "que": "Picos, no meseta", "porque": "la carga real llega a golpes; una campaña no es una rampa suave" },
    { "vale": false, "que": "Que no haya nada más corriendo", "porque": "en producción ese servidor también hace copias, registros y tareas programadas" }
  ] }
```

Ninguna invalida el ejercicio: lo acotan, que es distinto. Y ponerle límites
por escrito a lo que una prueba mide es la parte del trabajo que más separa un
informe que se usa de uno que se archiva.

## Lo que me llevo

Siete prácticas, y ninguna necesita herramientas caras:

```figura
{ "tipo": "flujo", "titulo": "Cómo se hace una prueba de carga que sirve",
  "pasos": [
    { "que": "Escribe el criterio de fallo antes de correr", "nota": "si no, ningún resultado significa nada" },
    { "que": "Siembra datos a escala real", "nota": "medio millón de filas, no veinte" },
    { "que": "Escribe el escenario como una persona", "nota": "esperas y ramas con probabilidad" },
    { "que": "Lee la cola, no la mediana", "nota": "p95 y p99, con la tasa de error al lado" },
    { "que": "Busca el punto de ruptura por bisección", "nota": "no una corrida con un número redondo" },
    { "que": "Observa el recurso, y también el generador", "nota": "para saber qué se rompe y que los datos sean tuyos" },
    { "que": "Traduce a usuarios antes de contarlo", "tono": "bueno", "nota": "concurrentes no son registrados" }
  ] }
```

---

La conclusión del experimento era que no siempre hace falta una arquitectura
repartida. La mía, desde el lado de calidad, va en paralelo: **casi nadie sabe
cuánto aguanta su sistema, porque la prueba que lo diría cuesta sesenta
céntimos y una tarde, y aun así no se hace**.

Se decide escalar por intuición, se paga ocho veces más, y el cuello sigue
donde estaba.
