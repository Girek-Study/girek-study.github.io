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
    /**
     * La pieza que ilustra la cabecera. No es una foto de archivo: cada una
     * dibuja el problema del que trata la nota, así que solo valen las que
     * están dibujadas en PortadaNota.astro. Una nota sin portada abre con el
     * titular solo, como antes.
     */
    portada: z.enum(['contrato', 'capas', 'pipeline', 'criterio', 'espera']).optional(),
    /**
     * El código de lo que cuenta la nota. Se apunta a archivos concretos y no
     * a la raíz del repositorio: «esto que acabas de leer está en esta línea»
     * vale más que «aquí tienes un repo, búscate la vida».
     *
     * No hay un repositorio por nota a propósito. Cada repo arrastra README,
     * CI y dependencias que caducan, y uno abandonado resta más credibilidad
     * que la que suma el enlace.
     */
    codigo: z
      .object({
        repo: z.string(),
        titulo: z.string(),
        archivos: z
          .array(z.object({ ruta: z.string(), que: z.string() }))
          .default([]),
      })
      .optional(),
  }),
});

export const collections = { notas };
