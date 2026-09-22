---
titulo: La IA no entiende lo que no está en los datos
resumen: >-
  Frustración, presión comercial, cultura local, impacto en personas. Nada de
  eso aparece en un log, y es justo donde viven los defectos que importan.
fecha: 2026-09-21
etiquetas: [IA, Criterio, Producto]
portada: contexto
---

Un modelo razona sobre lo que puede leer. Código, registros, trazas,
requisitos, historial de defectos. Es muchísimo, y por eso impresiona.

El problema es lo que no deja rastro en ninguno de esos sitios.

## Lo que no está escrito en ninguna parte

**La frustración.** Un flujo de seis pasos que funciona perfectamente puede
ser insoportable. No hay error, no hay excepción, no hay log: hay gente que
abandona en el paso cuatro. Eso solo se detecta usando el producto con la
cabeza de quien lo sufre.

**La presión comercial.** Que esta función salga este mes porque hay un
contrato firmado cambia qué se prueba y hasta dónde. No está en el backlog;
está en una conversación de pasillo.

**La cultura local.** En Perú, un campo de DNI con ocho dígitos y un carné de
extranjería con nueve. Un apellido compuesto que el validador parte en dos.
Un monto que alguien escribe con coma decimal. Un modelo entrenado
mayoritariamente con productos de otro mercado no sabe qué es normal aquí.

**Las prioridades políticas.** Qué área tiene peso, qué defecto se va a
arreglar y cuál va a dormir seis meses. Saber eso decide cómo escribes el
reporte para que el defecto se arregle.

**El impacto en personas.** Un error de cálculo en un agendamiento médico no
es un número mal sumado: es alguien que viaja dos horas para que le digan que
no tiene cita. Esa diferencia no está en la severidad del ticket.

```figura
{
  "tipo": "comparar",
  "titulo": "Lo que un modelo puede leer, y lo que no deja rastro",
  "izq": {
    "rotulo": "No lo ve",
    "lineas": [
      "La frustración del paso cuatro",
      "El contrato firmado que mete prisa",
      "Ocho dígitos de DNI y nueve de carné"
    ],
    "pie": "no está en ningún log"
  },
  "der": {
    "rotulo": "Lo ve",
    "lineas": [
      "Código, trazas y registros",
      "Requisitos e historial de defectos"
    ],
    "pie": "y ahí es buenísimo"
  },
  "pie": "Los defectos que duelen viven casi siempre en la primera columna."
}
```

## Un caso concreto

En banca tuvimos un defecto que ninguna herramienta habría marcado. La
pantalla mostraba el saldo correcto. La transacción se registraba bien. Todo
en verde.

Lo que pasaba es que el abono aparecía con un retraso que, para el usuario,
significaba ver su cuenta en cero durante unos minutos. Técnicamente
impecable; humanamente, una llamada furiosa al call center.

Reportar eso exigía entender que una persona mirando su saldo en cero no
piensa «será un tema de sincronización».

## Qué hacer con esto

No es un argumento contra la IA. Es un argumento sobre **dónde poner tu
atención** ahora que la parte mecánica se abarató.

**Pasa tiempo con el producto, no solo con el repositorio.** Úsalo como lo
usa alguien que no lo construyó.

**Habla con quien atiende al cliente.** Soporte sabe en una tarde lo que tú
tardarías meses en deducir de los logs.

**Aprende el negocio, no solo el sistema.** Por qué existe esa regla rara.
Casi siempre hay un motivo, y casi siempre ahí vive un caso límite.

**Escribe el contexto que sabes.** Si está solo en tu cabeza, no está en
ningún sitio del que el equipo —ni un modelo— pueda sacarlo.

---

Cuanto mejor lee la máquina lo que está escrito, más vale lo que solo sabe
quien estuvo ahí.
