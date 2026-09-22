/**
 * Figuras dentro de las notas.
 *
 * Las notas eran texto y bloques de código. Un texto largo sin nada que mirar
 * se abandona a la mitad, y las ideas de este oficio casi siempre son
 * comparaciones —esto frente a esto—, secuencias o proporciones: cosas que se
 * entienden antes dibujadas que explicadas.
 *
 * Cómo se usa: en el Markdown, un bloque de código con lenguaje `figura` y un
 * JSON dentro.
 *
 *     ```figura
 *     { "tipo": "comparar", "titulo": "…",
 *       "izq": { "rotulo": "Antes", "lineas": ["…"] },
 *       "der": { "rotulo": "Después", "lineas": ["…"] } }
 *     ```
 *
 * Por qué así y no HTML suelto en el Markdown: el HTML se copia mal, envejece
 * peor y llena la nota de ruido. Con datos, el aspecto se cambia en un único
 * sitio y las notas se enteran todas a la vez.
 *
 * **Por qué remark y no rehype**, que fue el primer intento: para cuando el
 * contenido llega a rehype, Shiki ya ha pasado por los bloques de código y ha
 * convertido el lenguaje desconocido `figura` en `plaintext`. El dato que hace
 * falta para reconocerlos ya no existe. En remark todavía está.
 */

/** Lo que va dentro del HTML se escapa; `*texto*` se convierte en el acento. */
const esc = (s = '') =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const conAcento = (s = '') =>
  esc(s).replace(/\*([^*]+)\*/g, '<b class="acento-fig">$1</b>');

const rotulo = (texto, clase = 'rotulo-fig') =>
  texto ? `<p class="${clase}">${esc(texto)}</p>` : '';

/* ---------- Comparar: lo de antes frente a lo de ahora ---------- */

const comparar = (d) => {
  const lado = (l = {}, tono) => `
      <div class="lado-fig es-${tono}">
        ${rotulo(l.rotulo, 'rotulo-lado')}
        ${(l.lineas || []).map((x) => `<p class="linea-fig">${conAcento(x)}</p>`).join('')}
        ${l.pie ? `<p class="pie-lado">${esc(l.pie)}</p>` : ''}
      </div>`;

  return `
    <div class="cuerpo-fig es-comparar">
      ${lado(d.izq, 'malo')}
      <span class="vs-fig" aria-hidden="true">vs</span>
      ${lado(d.der, 'bueno')}
    </div>`;
};

/* ---------- Flujo: pasos encadenados ---------- */

const flujo = (d) => {
  const pasos = (d.pasos || []).map((paso, i) => {
    const p = typeof paso === 'string' ? { que: paso } : paso;
    const caja = `
      <div class="paso-fig es-${p.tono || 'normal'}">
        <span class="n-paso">${String(i + 1).padStart(2, '0')}</span>
        <span class="que-paso">${conAcento(p.que)}</span>
        ${p.nota ? `<span class="nota-paso">${esc(p.nota)}</span>` : ''}
      </div>`;
    // Sin flechas sueltas entre cajas: al envolver en dos filas, la última
    // de la fila quedaba apuntando al margen. El orden lo dice el número y la
    // banda superior, que además no se rompe nunca.
    return caja;
  });

  return `<div class="cuerpo-fig es-flujo">${pasos.join('')}</div>`;
};

/* ---------- Barras: proporciones que se ven de un vistazo ---------- */

const barras = (d) => {
  const maximo = Math.max(...(d.barras || []).map((b) => Number(b.valor) || 0), 1);

  const filas = (d.barras || []).map((b) => {
    const ancho = Math.max(2, Math.round((Number(b.valor) / maximo) * 100));
    return `
      <div class="fila-barra ${b.tono ? `es-${b.tono}` : ''}">
        <span class="rotulo-barra">${esc(b.que)}</span>
        <span class="carril-barra"><i style="width:${ancho}%"></i></span>
        <span class="valor-barra">${esc(b.etiqueta ?? b.valor)}</span>
      </div>`;
  });

  return `<div class="cuerpo-fig es-barras">${filas.join('')}</div>`;
};

/* ---------- Capas: lo que sostiene a lo que ---------- */

const capas = (d) => {
  // El sangrado dibuja la escalera sin tener que explicarla.
  const filas = (d.capas || []).map((c, i) => `
      <div class="capa-fig ${c.tono ? `es-${c.tono}` : ''}" style="margin-left:${i * 1.1}rem">
        ${c.n ? `<span class="n-capa">${esc(c.n)}</span>` : ''}
        <span class="que-capa">${conAcento(c.que)}</span>
      </div>`);

  return `<div class="cuerpo-fig es-capas">${filas.join('')}</div>`;
};

/* ---------- Matriz: dos ejes, cuatro cuadrantes ---------- */

const matriz = (d) => {
  const celdas = (d.celdas || []).map((c) => `
        <div class="celda-fig ${c.tono ? `es-${c.tono}` : ''}">
          ${rotulo(c.rotulo, 'rotulo-celda')}
          <p>${conAcento(c.que)}</p>
        </div>`);

  return `
    <div class="cuerpo-fig es-matriz">
      ${d.ejeY ? `<span class="eje-y">${esc(d.ejeY)}</span>` : ''}
      <div class="rejilla-fig">${celdas.join('')}</div>
      ${d.ejeX ? `<span class="eje-x">${esc(d.ejeX)}</span>` : ''}
    </div>`;
};

/* ---------- Marcas: lo que vale y lo que no, con su motivo ---------- */

const marcas = (d) => {
  const filas = (d.filas || []).map((f) => `
      <div class="fila-marca ${f.vale ? 'es-si' : 'es-no'}">
        <span class="marca-fig" aria-hidden="true">${f.vale ? '✓' : '✕'}</span>
        <span class="que-marca">${conAcento(f.que)}</span>
        ${f.porque ? `<span class="porque-marca">${esc(f.porque)}</span>` : ''}
      </div>`);

  return `<div class="cuerpo-fig es-marcas">${filas.join('')}</div>`;
};

const CONSTRUCTORES = { comparar, flujo, barras, capas, matriz, marcas };

/** Envoltorio común: título arriba, pie abajo, y la pieza en medio. */
function figura(d) {
  const construir = CONSTRUCTORES[d.tipo];
  if (!construir) return null;

  return `
<figure class="figura-nota fig-${d.tipo}">
  ${d.titulo ? `<p class="titulo-fig">${conAcento(d.titulo)}</p>` : ''}
  ${construir(d)}
  ${d.pie ? `<figcaption>${conAcento(d.pie)}</figcaption>` : ''}
</figure>`;
}

/**
 * El plugin. Cambia cada bloque ```figura por su dibujo.
 *
 * Si el JSON está mal, deja el bloque como estaba en vez de romper el build:
 * una figura mal escrita no debería tumbar el sitio, pero sí tiene que verse
 * en la consola.
 */
export function remarkFiguras() {
  return (arbol, archivo) => {
    const recorrer = (nodo) => {
      if (!nodo.children) return;

      nodo.children = nodo.children.map((hijo) => {
        if (hijo.type === 'code' && hijo.lang === 'figura') {
          try {
            const html = figura(JSON.parse(hijo.value));
            if (html) return { type: 'html', value: html };
            console.warn(`[figuras] tipo desconocido en ${archivo?.path ?? '?'}`);
          } catch (e) {
            console.warn(`[figuras] JSON inválido en ${archivo?.path ?? '?'}: ${e.message}`);
          }
        }

        recorrer(hijo);
        return hijo;
      });
    };

    recorrer(arbol);
  };
}
