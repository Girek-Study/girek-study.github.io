// ============================================================================
//  IDIOMAS — Español por defecto, inglés como capa de presentación.
//
//  Decisión del 2026-11-05: se traducen las cinco páginas de sitio (inicio,
//  trayectoria, Girek Study, notas y portafolio), que son 7.314 palabras. Las
//  notas NO se traducen: son 59.024 palabras, el 89% del contenido, y su valor
//  está en cómo están escritas. Una traducción automática de un ensayo pierde
//  justo lo que lo hacía distinto del resto.
//
//  Eso no es un hueco que haya que tapar luego: el español es el
//  posicionamiento de la marca —"automatización de pruebas en español"— y el
//  inglés existe para que alguien de fuera entienda quién escribe y qué ha
//  publicado. El selector lo dice en voz alta en lugar de disimularlo.
// ============================================================================

import { es } from './es';
import { en } from './en';
import type { Diccionario } from './es';

export const IDIOMAS = ['es', 'en'] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_POR_DEFECTO: Idioma = 'es';

/** Cómo se nombra cada idioma en el selector, en su propia lengua. */
export const NOMBRE_IDIOMA: Record<Idioma, string> = {
  es: 'Español',
  en: 'English',
};

/** El código BCP 47 que va en `<html lang>` y en `og:locale`. */
export const ETIQUETA_LANG: Record<Idioma, string> = { es: 'es', en: 'en' };
export const LOCALE_OG: Record<Idioma, string> = { es: 'es_PE', en: 'en_US' };

/**
 * Equivalencias de ruta entre los dos idiomas.
 *
 * Las rutas en inglés se escriben en inglés (`/en/experience`, no
 * `/en/trayectoria`): si alguien llega por un buscador anglófono, la URL es
 * parte de lo que lee antes de hacer clic.
 *
 * `/girek-study` se queda igual en los dos porque es un nombre propio.
 */
export const PAREJAS: ReadonlyArray<{ es: string; en: string }> = [
  { es: '/', en: '/en/' },
  { es: '/trayectoria', en: '/en/experience' },
  { es: '/girek-study', en: '/en/girek-study' },
  { es: '/notas', en: '/en/notes' },
  { es: '/portafolio', en: '/en/portfolio' },
];

/** Quita la barra final salvo que la ruta sea la raíz. */
function normalizar(ruta: string): string {
  if (ruta.length > 1 && ruta.endsWith('/')) return ruta.slice(0, -1);
  return ruta;
}

/** El idioma que corresponde a una URL. Todo lo que no cuelga de /en/ es español. */
export function idiomaDe(pathname: string): Idioma {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

/**
 * La misma página en el otro idioma, o `null` si no existe.
 *
 * Devolver `null` es la parte importante: las notas solo existen en español,
 * así que en una nota el selector no puede ofrecer inglés. Si lo ofreciera,
 * llevaría a un 404 — y un `hreflang` que apunta a una página que no existe le
 * dice a Google que el sitio está roto.
 */
export function rutaAlterna(pathname: string, destino: Idioma): string | null {
  const ruta = normalizar(pathname);
  const origen = idiomaDe(ruta);
  if (origen === destino) return ruta;

  const pareja = PAREJAS.find((p) => normalizar(p[origen]) === ruta);
  return pareja ? pareja[destino] : null;
}

/** Las dos URL de una página, para los `hreflang` de la cabecera. */
export function alternativas(pathname: string): Array<{ idioma: Idioma; ruta: string }> {
  const salida: Array<{ idioma: Idioma; ruta: string }> = [];
  for (const idioma of IDIOMAS) {
    const ruta = rutaAlterna(pathname, idioma);
    if (ruta) salida.push({ idioma, ruta });
  }
  // Una sola entrada significa que la página existe en un idioma nada más. En
  // ese caso no se emite nada: `hreflang` describe una relación entre dos
  // páginas, y con una no hay relación que describir.
  return salida.length > 1 ? salida : [];
}

// ----------------------------------------------------------------------------

const DICCIONARIOS: Record<Idioma, Diccionario> = { es, en };

/**
 * Los textos de un idioma.
 *
 * Se usa `const t = textos(idioma)` al principio de cada página y después
 * `t.portafolio.titular`. No hay búsqueda por cadena ni claves sueltas tipo
 * `t('portafolio.titular')`: así TypeScript avisa de un nombre mal escrito en
 * el build, en vez de dejar un hueco en la página.
 */
export function textos(idioma: Idioma): Diccionario {
  return DICCIONARIOS[idioma];
}

export type { Diccionario };

/**
 * Elige la variante de un dato que existe en los dos idiomas.
 *
 * Los datos de `src/data/` estaban escritos en español a secas. En lugar de
 * convertirlos todos de golpe, un campo puede ser `string` —y entonces se
 * muestra igual en los dos idiomas, que es lo correcto para un nombre propio o
 * una tecnología— o `{ es, en }` cuando hay que traducirlo.
 */
export type Bilingue<T = string> = T | Record<Idioma, T>;

export function elegir<T>(valor: Bilingue<T>, idioma: Idioma): T {
  if (valor !== null && typeof valor === 'object' && 'es' in (valor as object)) {
    return (valor as Record<Idioma, T>)[idioma];
  }
  return valor as T;
}

/**
 * A dónde lleva el selector cuando esta página no existe en el otro idioma.
 *
 * Caso real: las notas. Solo hay versión en español, así que desde una nota el
 * selector no puede quedarse quieto ni llevar a un 404. Lleva al índice de
 * notas del otro idioma, que es donde se explica por qué están en español.
 *
 * Devuelve también si el destino es la misma página o un sustituto, para que
 * el selector pueda avisarlo en el `title` en vez de mover al visitante sin
 * explicación.
 */
export function destinoDelSelector(
  pathname: string,
  destino: Idioma,
): { ruta: string; mismaPagina: boolean } {
  const exacta = rutaAlterna(pathname, destino);
  if (exacta) return { ruta: exacta, mismaPagina: true };

  const indiceNotas = PAREJAS.find((p) => p.es === '/notas');
  if (normalizar(pathname).startsWith('/notas/') && indiceNotas) {
    return { ruta: indiceNotas[destino], mismaPagina: false };
  }

  return { ruta: destino === 'es' ? '/' : '/en/', mismaPagina: false };
}

/**
 * Resuelve de golpe todos los `{ es, en }` de una estructura.
 *
 * Trayectoria serializa sus datos a JSON y un script del navegador rellena
 * con ellos los diálogos. Ese script no sabe de idiomas, y no debería: si le
 * llegara un `{ es, en }` pintaría «[object Object]».
 *
 * La salida es la misma estructura con cada campo bilingue ya convertido en
 * una cadena del idioma pedido, así que lo que viaja al navegador está en un
 * solo idioma y el script sigue igual que antes.
 */
export function aplanar<T>(valor: T, idioma: Idioma): unknown {
  if (Array.isArray(valor)) return valor.map((v) => aplanar(v, idioma));

  if (valor !== null && typeof valor === 'object') {
    const objeto = valor as Record<string, unknown>;
    const claves = Object.keys(objeto);
    if (claves.length === 2 && claves.includes('es') && claves.includes('en')) {
      return objeto[idioma];
    }
    return Object.fromEntries(
      Object.entries(objeto).map(([clave, v]) => [clave, aplanar(v, idioma)]),
    );
  }

  return valor;
}
