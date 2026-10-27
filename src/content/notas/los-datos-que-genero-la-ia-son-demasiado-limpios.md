---
titulo: Los datos de prueba que generó la IA son demasiado limpios
resumen: >-
  Mil registros en un minuto, todos con nombres ASCII, direcciones bien
  formadas y ni un campo vacío. Ejercitan el camino feliz y nada más. Y a
  veces traen dentro algo peor.
fecha: 2026-11-04
etiquetas: [IA, Datos de prueba, Criterio]
portada: sintetico
---

Generar datos de prueba con un modelo es de las cosas que mejor salen a la
primera. Pides mil clientes con sus pedidos y en un minuto tienes un JSON
impecable, variado, con nombres creíbles y fechas coherentes.

Y ahí está el problema: **impecable**.

## Lo que ejercitan esos datos

Un conjunto generado por un modelo tiende a parecerse a la idea que el modelo
tiene de unos datos buenos. Que es, casi por definición, el **camino feliz**.

```figura
{ "tipo": "comparar", "titulo": "Lo que genera frente a lo que hay en producción",
  "izq": { "rotulo": "Lo generado",
    "lineas": [
      "«María López», «Juan Pérez»",
      "Direcciones completas y bien formadas",
      "Ningún campo vacío ni a medias"
    ],
    "pie": "Todo entra sin rozar un solo borde." },
  "der": { "rotulo": "Lo que hay de verdad",
    "lineas": [
      "«Ñuñez», «O'Brien», «李», 200 caracteres",
      "Direcciones con el piso en el campo ciudad",
      "Registros de 2019 con la mitad de campos nulos"
    ],
    "pie": "Y esto es exactamente lo que rompe el sistema." } }
```

La consecuencia es engañosa: tu suite pasa, tu cobertura sube, y no has
ejercitado **ninguno** de los casos que de verdad producen incidencias.

Lo conté desde otro ángulo en [el dato de prueba que alguien más está
usando](/notas/el-dato-de-prueba-que-alguien-mas-esta-usando/): el dato no es
un detalle de la prueba, es la mitad de la prueba. Y aquí vale igual — con un
agravante, que es que ahora da la *sensación* de estar resuelto.

## Las distribuciones también mienten

Esto es más sutil y pasa desapercibido. Si pides mil pedidos, lo normal es que
salgan razonablemente repartidos: importes variados, fechas repartidas por el
año, clientes con dos o tres pedidos cada uno.

La realidad casi nunca es así:

```figura
{ "tipo": "marcas", "titulo": "Lo que la generación suaviza",
  "filas": [
    { "vale": false, "que": "La cola larga", "porque": "el cliente con 4.000 pedidos existe, y es el que tumba la paginación" },
    { "vale": false, "que": "Los picos", "porque": "el 40 % del año concentrado en dos semanas de campaña" },
    { "vale": false, "que": "Los duplicados", "porque": "el mismo cliente dado de alta tres veces con el correo mal escrito" },
    { "vale": false, "que": "Los restos de migraciones", "porque": "registros con un formato que ya no genera nadie y que el código sigue leyendo" },
    { "vale": true, "que": "El reparto bonito", "porque": "es lo único que sale, y es justo lo que no causa problemas" }
  ] }
```

Esto importa sobre todo en pruebas de rendimiento. Un conjunto generado
produce una carga uniforme, y los sistemas no se caen por carga uniforme: se
caen por **el cliente con cuatro mil pedidos** y por los dos días del año en
que entra todo junto.

## Y lo que puede entrar sin que lo veas

Aquí hay un riesgo del que se habla poco y que conviene tener presente desde
el primer día.

```figura
{ "tipo": "capas", "titulo": "Tres cosas que se cuelan",
  "capas": [
    { "n": "1", "que": "Datos reales en el prompt. Para que «parezcan de verdad», alguien pega un extracto de producción." },
    { "n": "2", "que": "Identificadores con significado. Números que validan contra un algoritmo real y podrían existir." },
    { "n": "3", "que": "El sesgo del modelo. Nombres de una región, géneros repartidos de una forma, edades concentradas.", "tono": "clave" }
  ],
  "pie": "El primero es un problema legal. El tercero es el que acaba decidiendo qué prueba tu producto." }
```

**El primero** es el que más me preocupa en equipos con datos sensibles.
«Genérame cien clientes parecidos a estos» con un pegado de producción manda
datos de personas reales a un servicio externo. No hay vuelta atrás y es
exactamente lo que prohíbe cualquier política de protección de datos. Si
necesitas realismo, se consigue describiendo el formato, no pegando el
contenido.

**El tercero** es el más silencioso. Si los nombres que genera son
mayoritariamente de una cultura, tu sistema queda probado contra esa cultura.
El día que entre un apellido con caracteres que tu normalizador no contempla,
lo descubre un usuario.

## Entonces, ¿para qué sí los uso?

Porque los uso, y bastante. Solo que para otra cosa:

```figura
{ "tipo": "matriz", "titulo": "Dónde sí y dónde no",
  "celdas": [
    { "rotulo": "Sí: volumen de relleno", "que": "Llenar una tabla para que la pantalla tenga algo que paginar. Perfecto y barato." },
    { "rotulo": "Sí: textos variados", "que": "Descripciones, comentarios, nombres de producto. Variedad que a mano da pereza." },
    { "rotulo": "No: los casos límite", "que": "Esos se escriben a mano, uno a uno, porque salen de pensar qué puede romper.", "tono": "alta" },
    { "rotulo": "No: lo que la prueba afirma", "que": "El dato del que depende la aserción se fija tú. Si lo inventa él, no controlas la prueba.", "tono": "alta" }
  ] }
```

La cuarta celda es la regla que más defiendo. **El dato sobre el que afirmas
algo no se genera: se fija.** Si tu prueba comprueba que un pedido de 1.000,01
euros entra en el tramo de comisión alta, ese importe lo escribes tú. Lo
demás —el nombre del cliente, su dirección, la descripción— que lo genere
quien quiera.

## La forma que sí funciona

Lo que hago cuando quiero realismo de verdad:

```figura
{ "tipo": "flujo", "titulo": "Generar bien, sin pegar producción",
  "pasos": [
    { "que": "Mira qué hay realmente en producción", "nota": "consultas agregadas: distribuciones, longitudes, porcentaje de nulos" },
    { "que": "Describe el formato, no el contenido", "nota": "«el 12 % tiene el campo dirección vacío», no un extracto real" },
    { "que": "Añade los bordes a mano", "nota": "la ñ, el apóstrofo, los 200 caracteres, el cero, el negativo" },
    { "que": "Fija los datos de los que dependen las aserciones", "tono": "bueno", "nota": "esos nunca los genera el modelo" }
  ],
  "pie": "El primer paso es el que casi nadie hace, y es el que convierte el conjunto en algo parecido a la realidad." }
```

Ese primer paso cambia todo y cuesta media hora: cuatro consultas agregadas
contra producción —sin sacar ni un registro— te dicen qué porcentaje de campos
viene vacío, cuál es la longitud máxima real de cada texto y cómo se reparten
de verdad los importes. Con eso, lo que pidas se parecerá a lo que tienes.

---

Los datos generados son una herramienta buena para lo aburrido: volumen,
variedad, relleno. Lo que no son es un sustituto de pensar qué puede romper el
sistema, porque **un modelo genera lo que es típico, y los defectos viven en
lo que no lo es**.

El conjunto limpio y abundante da una sensación de cobertura que no se
corresponde con nada. Y esa sensación, en calidad, es lo más caro que hay.
