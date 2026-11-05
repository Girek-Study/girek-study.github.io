import type { Idioma } from '../i18n';

/**
 * "5 de septiembre de 2026" en español, "5 September 2026" en inglés. Una sola
 * definición para todo el sitio.
 *
 * `timeZone: 'UTC'` no es decorativo: sin él, una fecha guardada como
 * 2026-09-05 se pinta como el 4 en cualquier huso al oeste de Greenwich.
 */
export function formatearFecha(fecha: Date, idioma: Idioma = 'es'): string {
  return fecha.toLocaleDateString(idioma === 'en' ? 'en-GB' : 'es-PE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Minutos de lectura a 200 palabras por minuto, redondeando hacia arriba. */
export function minutosDeLectura(texto: string): number {
  const palabras = texto.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(palabras / 200));
}
