/** "5 de septiembre de 2026". Una sola definición para todo el sitio. */
export function formatearFecha(fecha: Date): string {
  return fecha.toLocaleDateString('es-PE', {
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
