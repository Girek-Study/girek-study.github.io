import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

/**
 * El feed es lo que convierte al sitio en la fuente y a las redes en copias:
 * se publica aquí primero y desde aquí se sindica. Sin RSS, cada canal nuevo
 * obliga a republicar a mano.
 */
export async function GET(context) {
  const notas = (await getCollection('notas', ({ data }) => !data.borrador)).sort(
    (a, b) => b.data.fecha.getTime() - a.data.fecha.getTime(),
  );

  return rss({
    title: 'Girek Study — Notas',
    description:
      'Automatización de pruebas y calidad de software en español: decisiones de diseño, errores que costaron caro y frameworks con el código a la vista.',
    site: context.site,
    trailingSlash: true,
    items: notas.map((nota) => ({
      title: nota.data.titulo,
      description: nota.data.resumen,
      pubDate: nota.data.fecha,
      link: `/notas/${nota.id}/`,
      categories: nota.data.etiquetas,
    })),
    customData: '<language>es-pe</language>',
  });
}
