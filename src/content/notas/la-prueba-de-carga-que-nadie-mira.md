---
titulo: La prueba de carga que se corre una vez y nadie vuelve a mirar
resumen: >-
  Mil usuarios virtuales una semana antes de salir a producción no dicen nada.
  Lo que sirve es una prueba pequeña en cada release, con un umbral que falla.
fecha: 2026-09-17
etiquetas: [k6, Rendimiento, CI/CD]
portada: carga
---

El rendimiento se prueba casi siempre igual: una semana antes de salir, alguien
monta un escenario con mil usuarios virtuales, lo lanza una tarde, exporta un
informe con gráficos y lo manda por correo.

El informe dice que el sistema aguanta. Y aguanta, hasta que un mes después deja
de aguantar y nadie sabe qué cambió.

He hecho esa prueba y he montado la otra. La diferencia no está en la
herramienta, está en cuándo se ejecuta y en quién se entera cuando empeora.

## Por qué la prueba grande no sirve para lo que crees

Tiene tres problemas, y ninguno se arregla con más usuarios virtuales.

**Llega tarde.** Si el escenario revienta a una semana de salir, ya no hay
margen: o se sale igual, o se retrasa. Ninguna de las dos es una decisión
técnica.

**No dice qué lo causó.** Entre esa prueba y la anterior hay trescientos
commits. Saber que el percentil 95 subió de 400 a 900 ms no te dice cuál de los
trescientos lo hizo.

**Y nadie la repite.** Montarla cuesta dos días, así que se hace una vez por
proyecto. El rendimiento, mientras tanto, cambia todas las semanas.

## Lo que sí funciona: pequeña, en cada release, con umbral

Le doy la vuelta a las tres cosas. Un escenario corto —dos o tres minutos—, con
la carga que de verdad tiene el sistema, corriendo en el pipeline, y con un
umbral que hace fallar la ejecución.

En k6 eso es literalmente una propiedad:

```js
export const options = {
  stages: [
    { duration: '30s', target: 20 },  // subida
    { duration: '1m', target: 20 },   // meseta
    { duration: '30s', target: 0 },   // bajada
  ],
  thresholds: {
    // Si se incumple, k6 termina con código 1 y el pipeline se pone rojo.
    http_req_duration: ['p(95)<800'],
    http_req_failed: ['rate<0.01'],
  },
};
```

Ese `thresholds` es lo que separa una prueba de carga de un informe de carga.
Sin él, k6 imprime números bonitos y termina en verde pase lo que pase, y los
números bonitos nadie los mira.

Con él, el día que alguien mete una consulta sin índice, el pull request se pone
rojo y el autor se entera mientras todavía tiene el cambio en la cabeza. Ese es
todo el valor: no medir mejor, medir antes.

## De dónde sale el umbral

Aquí está la parte que no es técnica y es la que más cuesta.

**No lo inventes.** Un `p(95)<800` sacado de la nada es una cifra que alguien va
a discutir el primer día que falle, y la discusión la vas a perder porque no
puedes sustentarla.

Las dos fuentes que sí aguantan una reunión:

**Lo que hace hoy el sistema en producción.** Si el percentil 95 real es 600 ms,
el umbral se pone en 800 y lo que estás protegiendo es que no empeore. Eso no se
discute: nadie va a defender que degradar está bien.

**Lo que el negocio ya prometió.** Si hay un acuerdo de nivel de servicio, o una
pantalla que promete «respuesta inmediata», ahí hay un número que alguien firmó.

Y sobre la carga: tampoco la inventes. La sacas de los registros. Cuántas
peticiones por minuto tiene el endpoint en su hora punta real. En un
agendamiento médico eso era un pico muy concreto los lunes por la mañana, y
probar con eso decía mucho más que mil usuarios virtuales a las tres de la
tarde.

## Qué endpoints, y no todos

Meter la suite entera en el pipeline lo hace lento y acaba desactivada. Tres
criterios para elegir, en este orden:

1. **Lo que se usa mucho.** El listado que abre todo el mundo al entrar.
2. **Lo que cuesta caro.** El informe que cruza cuatro tablas, la búsqueda con
   filtros. Suelen ser dos o tres, y ahí está casi toda la degradación.
3. **Lo que no se puede caer.** El pago, el login. Aunque sean rápidos hoy.

Con cinco o seis endpoints tienes el noventa por ciento del valor y una prueba
que cabe en tres minutos.

La prueba grande no desaparece: se queda para antes de un evento especial, una
migración o un cambio de infraestructura. Pero deja de ser la única señal.

## El fallo que más me ha enseñado

En una migración, la prueba de carga pasaba todos los días. El percentil 95
estaba estable en 500 ms y el umbral era 800.

Lo que no miraba era el percentil 99. Estaba en once segundos.

No era ruido: era un uno por ciento de peticiones que caía en una rama sin
caché. Con el volumen real, ese uno por ciento eran varios miles de personas al
día esperando once segundos.

Desde entonces siempre pongo dos umbrales: uno en `p(95)` para la experiencia
normal y otro en `p(99)` más holgado para la cola. El promedio no lo miro nunca:
es el único número que puede estar perfecto mientras una parte de tus usuarios
lo está pasando mal.

---

Una prueba de carga que no puede poner rojo un pipeline no es una prueba: es un
informe. Y los informes se archivan.
