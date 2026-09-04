// ============================================================================
//  REPOSITORIOS — Se leen de la API de GitHub al construir el sitio.
//
//  El portafolio no se mantiene a mano: publicas un repositorio en la cuenta
//  y aparece aquí en el siguiente build. El sitio sigue siendo estático, así
//  que el visitante no paga ninguna llamada a la API.
// ============================================================================

const USUARIO = 'Girek-Study';

export interface RepoPublico {
  nombre: string;
  descripcion: string;
  url: string;
  temas: string[];
  lenguaje: string | null;
  estrellas: number;
  actualizado: string;
}

interface RepoApi {
  name: string;
  description: string | null;
  html_url: string;
  topics?: string[];
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  private: boolean;
}

/**
 * Devuelve los repositorios públicos de la cuenta, del más reciente al más
 * antiguo.
 *
 * Nunca lanza: si GitHub responde mal o se agota el límite de peticiones,
 * devuelve una lista vacía y la página muestra su mensaje de respaldo. Un
 * despliegue no debe caerse porque un servicio ajeno tuvo un mal minuto.
 */
export async function obtenerRepos(): Promise<RepoPublico[]> {
  const cabeceras: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'girek-study-web',
  };

  // En CI el token sube el límite de 60 a 1000 peticiones por hora.
  const token = process.env.GITHUB_TOKEN;
  if (token) cabeceras.Authorization = `Bearer ${token}`;

  try {
    const respuesta = await fetch(
      `https://api.github.com/users/${USUARIO}/repos?sort=pushed&per_page=100`,
      { headers: cabeceras },
    );

    if (!respuesta.ok) {
      console.warn(`[github] la API respondió ${respuesta.status}; el portafolio queda vacío`);
      return [];
    }

    const datos = (await respuesta.json()) as RepoApi[];

    return datos
      .filter((r) => !r.fork && !r.archived && !r.private)
      // El repositorio homónimo solo contiene el README del perfil.
      .filter((r) => r.name.toLowerCase() !== USUARIO.toLowerCase())
      .map((r) => ({
        nombre: r.name,
        descripcion: r.description ?? 'Sin descripción todavía.',
        url: r.html_url,
        temas: r.topics ?? [],
        lenguaje: r.language,
        estrellas: r.stargazers_count,
        actualizado: r.pushed_at,
      }));
  } catch (error) {
    console.warn('[github] no se pudo consultar la API:', error);
    return [];
  }
}

/** "hace 3 días", "hace 2 meses". Para que se note que el sitio está vivo. */
export function haceCuanto(iso: string): string {
  const dias = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);

  if (dias <= 0) return 'hoy';
  if (dias === 1) return 'ayer';
  if (dias < 30) return `hace ${dias} días`;

  const meses = Math.floor(dias / 30);
  if (meses === 1) return 'hace un mes';
  if (meses < 12) return `hace ${meses} meses`;

  const anios = Math.floor(meses / 12);
  return anios === 1 ? 'hace un año' : `hace ${anios} años`;
}
