import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Las notas viven en `src/content/notas/*.md`. Una nota por archivo; el nombre
 * del archivo es la URL.
 *
 * El esquema no es burocracia: si falta un campo o la fecha está mal escrita,
 * el build falla en vez de publicar una nota rota. Es la misma idea que
 * validar un contrato de API antes de liberarlo.
 */
const notas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notas' }),
  schema: z.object({
    titulo: z.string().max(90),
    resumen: z.string().max(220),
    fecha: z.coerce.date(),
    /** Aparece bajo el título; conviene que diga de qué trata sin adornos. */
    etiquetas: z.array(z.string()).default([]),
    /** Minutos de lectura. Si no se pone, se calcula al renderizar. */
    minutos: z.number().optional(),
    /** Una nota en borrador se ve en local pero no se publica. */
    borrador: z.boolean().default(false),
  }),
});

export const collections = { notas };
