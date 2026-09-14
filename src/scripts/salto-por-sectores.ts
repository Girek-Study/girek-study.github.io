/**
 * Navegación por sectores.
 *
 * Un gesto lleva al sector siguiente. Los sectores que no caben en una pantalla
 * se recorren primero por dentro y solo saltan cuando se llega a su final: lo
 * contrario obligaría a comprimir el contenido hasta hacerlo ilegible.
 *
 * Va en JavaScript y no con scroll-snap de CSS porque `mandatory` no puede
 * anclar un elemento más alto que la ventana, que es justo el caso de varios de
 * esos sectores, y `proximity` revierte la posición a mitad de lectura.
 *
 * Cada página pasa sus propias paradas: la portada son sus secciones; la
 * trayectoria, sus sectores más las mitades en que algunos se parten en el
 * teléfono.
 */

interface Opciones {
  /** Devuelve las paradas de la página. Se vuelve a llamar al cambiar el tamaño. */
  paradas: () => (Element | null | undefined)[];
}

export function activarSaltoPorSectores({ paradas }: Opciones) {
  let sectores: HTMLElement[] = [];

  const topeDe = (el: HTMLElement) => Math.round(el.getBoundingClientRect().top + window.scrollY);

  function armar() {
    sectores = (paradas().filter(Boolean) as HTMLElement[]).sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top,
    );
  }

  armar();
  // Un cambio de ancho reordena el contenido y, con él, las paradas.
  window.addEventListener('resize', armar);

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
  let navegando = false;

  function sectorActual() {
    /* El último bloque puede ser más bajo que la ventana, así que su tope queda
     * por encima del scroll máximo y nunca llega a cumplirse `tope <= scrollY`:
     * estando en él, la cuenta devolvía el anterior y el gesto hacia atrás
     * saltaba dos paradas. Al fondo de la página el actual es el último, sin
     * más cuentas. */
    const maximo = document.documentElement.scrollHeight - window.innerHeight;
    const ultimo = sectores.length - 1;
    if (ultimo > 0 && window.scrollY >= maximo - 2 && topeDe(sectores[ultimo]) > maximo) {
      return ultimo;
    }

    const y = window.scrollY + 4;
    let indice = 0;
    sectores.forEach((s, i) => {
      if (topeDe(s) <= y) indice = i;
    });
    return indice;
  }

  let destino: number | null = null;
  let vigilante = 0;

  function soltar() {
    navegando = false;
    destino = null;
    clearTimeout(vigilante);
  }

  function irA(altura: number) {
    destino = altura;
    navegando = true;
    clearTimeout(vigilante);
    /* Red de seguridad: si el desplazamiento no llega nunca —lo interrumpió el
     * usuario, o el destino quedó fuera de alcance— el salto no puede dejar la
     * página bloqueada para siempre. */
    vigilante = window.setTimeout(soltar, 1600);
    window.scrollTo({ top: altura, behavior: 'smooth' });
  }

  /* El salto termina cuando se llega, no a los tantos milisegundos. Con un
   * reloj fijo, un desplazamiento largo seguía en curso cuando ya se aceptaban
   * gestos nuevos, y el siguiente se calculaba desde una altura intermedia. */
  window.addEventListener(
    'scroll',
    () => {
      if (!navegando || destino === null) return;
      const maximo = Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);
      if (Math.abs(window.scrollY - Math.min(destino, maximo)) <= 2) soltar();
    },
    { passive: true },
  );

  /** A qué altura lleva el gesto, o null si no hay a dónde ir.
   *
   * Cada gesto avanza una cantidad exacta, nunca una libre: o al sector
   * siguiente, o una pantalla más dentro del sector actual cuando es más alto
   * que la ventana. Así nunca se queda a medio camino de nada.
   *
   * El paso deja un solape de una décima de pantalla para que el renglón donde
   * se quedó la lectura siga a la vista. */
  function alturaDelGesto(direccion: number) {
    const i = sectorActual();
    const actual = sectores[i];
    if (!actual) return null;

    const arriba = topeDe(actual);
    const sobraPorDentro = actual.getBoundingClientRect().height - window.innerHeight;
    const recorrido = window.scrollY - arriba;
    const paso = Math.round(window.innerHeight * 0.9);

    if (direccion > 0) {
      // Todavía queda sector por leer: una pantalla más, sin pasarse.
      if (sobraPorDentro > 8 && recorrido < sobraPorDentro - 8) {
        return arriba + Math.min(recorrido + paso, sobraPorDentro);
      }
      if (i >= sectores.length - 1) return null;
      return topeDe(sectores[i + 1]);
    }

    if (sobraPorDentro > 8 && recorrido > 8) {
      return arriba + Math.max(recorrido - paso, 0);
    }
    if (i <= 0) return null;

    // Al volver a un sector más alto que la ventana se entra por su final, que
    // es donde se dejó de leer, y no por el principio.
    const anterior = sectores[i - 1];
    const sobraAntes = anterior.getBoundingClientRect().height - window.innerHeight;
    return topeDe(anterior) + Math.max(sobraAntes, 0);
  }

  /** Un diálogo o cualquier caja con desplazamiento propio se queda el gesto. */
  function dentroDeAlgoQueSeDesplaza(nodo: Element | null) {
    for (let e = nodo; e && e !== document.body; e = e.parentElement) {
      if (e.tagName === 'DIALOG') return true;
      const desborde = getComputedStyle(e).overflowY;
      const puede = desborde === 'auto' || desborde === 'scroll';
      if (puede && e.scrollHeight > e.clientHeight + 2) return true;
    }
    return false;
  }

  /** Cuándo el gesto no es nuestro y el navegador debe quedárselo entero. */
  function fueraDeJuego(objetivo: EventTarget | null) {
    if (sinMovimiento.matches) return true;
    if (document.querySelector('dialog[open]')) return true;
    return objetivo instanceof Element ? dentroDeAlgoQueSeDesplaza(objetivo) : false;
  }

  window.addEventListener(
    'wheel',
    (evento) => {
      // La rueda manda en cualquier ancho: hay ratón en un portátil con la
      // ventana estrecha y en los navegadores que emulan un móvil.
      if (fueraDeJuego(evento.target)) return;

      /* Con un salto en curso el gesto se descarta, pero cancelándolo: dejarlo
       * pasar hacía que el navegador lo aplicara encima de la animación y el
       * scroll acababa entre dos sectores. Es lo que se veía al girar la rueda
       * en ráfaga sobre una ventana baja, donde los sectores no caben enteros. */
      if (navegando) {
        evento.preventDefault();
        return;
      }

      if (Math.abs(evento.deltaY) < 4) return;

      const altura = alturaDelGesto(evento.deltaY > 0 ? 1 : -1);
      if (altura === null) return;

      evento.preventDefault();
      irA(altura);
    },
    { passive: false },
  );

  /* En táctil, el mismo salto — decidiendo en el primer touchmove.
   *
   * Ese primer evento todavía es cancelable: el navegador espera a que el guion
   * diga algo antes de empezar a desplazar. Ahí ya se conoce la dirección del
   * dedo, así que se decide de una vez qué es este gesto:
   *
   *   · si en esa dirección toca cambiar de sector, se cancela el
   *     desplazamiento nativo y el deslizamiento pasa a ser una orden de pasar
   *     de pantalla, como el golpe de rueda en escritorio;
   *   · si el sector todavía tiene contenido por leer, no se toca nada y el
   *     dedo se comporta como siempre, con su inercia.
   *
   * Decidir en el primer movimiento es lo que evita pelear con la inercia: o el
   * gesto es nuestro desde el principio, o no lo es en absoluto. */
  const UMBRAL_DEDO = 40; // píxeles de recorrido para que el gesto cuente

  let dedoY: number | null = null;
  let dedoRecorrido = 0;
  let dedoDecidido = false;
  let dedoDestino: number | null = null;
  /** Un dedo que aterriza durante un salto: se le cancela hasta que lo levante. */
  let dedoTragado = false;

  document.addEventListener(
    'touchstart',
    (evento) => {
      dedoDecidido = false;
      dedoDestino = null;
      dedoRecorrido = 0;
      dedoTragado = navegando && !fueraDeJuego(evento.target);
      // Con dos dedos el gesto es un zoom, no un desplazamiento.
      dedoY =
        evento.touches.length === 1 && !navegando && !fueraDeJuego(evento.target)
          ? evento.touches[0].clientY
          : null;
    },
    { passive: true },
  );

  document.addEventListener(
    'touchmove',
    (evento) => {
      if (dedoTragado) {
        evento.preventDefault();
        return;
      }
      if (dedoY === null) return;

      dedoRecorrido = dedoY - evento.touches[0].clientY;

      if (!dedoDecidido) {
        if (dedoRecorrido === 0) return;
        dedoDecidido = true;
        dedoDestino = alturaDelGesto(dedoRecorrido > 0 ? 1 : -1);
      }

      // Mientras el gesto sea nuestro, la página no se mueve sola.
      if (dedoDestino !== null) evento.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener(
    'touchend',
    () => {
      const aDonde = dedoDestino;
      const recorrido = dedoRecorrido;
      dedoY = null;
      dedoDestino = null;
      dedoTragado = false;

      // Un roce no cambia de sector; un deslizamiento de verdad, sí.
      if (aDonde !== null && Math.abs(recorrido) >= UMBRAL_DEDO) irA(aDonde);
    },
    { passive: true },
  );
}
