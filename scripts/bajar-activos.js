// Descarga los logos de empresas y clientes, y las banderas de los países de
// la trayectoria. Se ejecuta a mano; los archivos quedan versionados en el repo.
//
// Así la página no depende de servidores ajenos al cargar, y si mañana una
// empresa cambia su logo el sitio no se altera solo sin que nadie se entere.
//
//   node scripts/bajar-activos.js

import { writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const LOGOS = join(RAIZ, 'public', 'logos');
const BANDERAS = join(RAIZ, 'public', 'paises');

// `url` fuerza una fuente concreta cuando el sitio no expone un icono decente.
const MARCAS = [
  // Empresas
  { slug: 'elipgo', dominio: 'elipgo.com' },
  { slug: 'canvia', url: 'https://canvia.com/wp-content/uploads/2021/09/favicon.svg' },
  { slug: 'soho', dominio: 'soho.cl' },
  { slug: 'idm', dominio: 'idmtechnology.com' },
  { slug: 'prestamype', dominio: 'prestamype.com' },
  { slug: 'nagnoi', dominio: 'nagnoi.com' },
  { slug: 'utp', dominio: 'utp.edu.pe' },
  { slug: 'delaware', dominio: 'delaware.pro' },
  { slug: 'qsystem', dominio: 'qsystem.com.pe' },
  // Clientes
  { slug: 'interbank', dominio: 'interbank.pe' },
  { slug: 'starbucks', dominio: 'starbucks.com' },
  { slug: 'redsalud', dominio: 'redsalud.cl' },
  { slug: 'claro', dominio: 'claro.com.pe' },
  { slug: 'yanbal', dominio: 'yanbal.com' },
  { slug: 'edulogica', dominio: 'edulogica.com' },
  { slug: 'bbva', dominio: 'bbva.pe' },
  { slug: 'pacifico', dominio: 'pacifico.com.pe' },
];

// BCP no expone ningún icono servible: su tarjeta usa monograma a propósito.

const PAISES = ['pe', 'mx', 'cl', 'pr'];

const EXTENSIONES = {
  'image/svg+xml': 'svg',
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'image/x-icon': 'ico',
};

/**
 * Descarga una URL de imagen. Devuelve {bytes, extension} o null. Nunca lanza.
 *
 * `minimo` descarta descargas demasiado pequeñas para ser el archivo buscado.
 * Los logos usan un umbral alto porque el servicio de favicons devuelve un
 * globo gris de 16px cuando no encuentra nada; las banderas usan uno bajo
 * porque a 80px de ancho la del Perú son 300 bytes y es correcta.
 */
async function bajar(url, minimo = 500) {
  try {
    const respuesta = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (girek-study-web)' },
      signal: AbortSignal.timeout(20_000),
    });
    if (!respuesta.ok) return null;

    const tipo = (respuesta.headers.get('content-type') ?? '').split(';')[0].trim();
    const extension = EXTENSIONES[tipo];
    if (!extension) return null;

    const bytes = Buffer.from(await respuesta.arrayBuffer());
    return bytes.length > minimo ? { bytes, extension } : null;
  } catch {
    return null;
  }
}

async function bajarMarcas() {
  await mkdir(LOGOS, { recursive: true });
  const resultado = [];

  for (const { slug, dominio, url } of MARCAS) {
    // En orden de calidad: una fuente explícita gana; luego el apple-touch-icon,
    // que suele ser el logo real a 180px; el servicio de favicons es el respaldo.
    const candidatos = url
      ? [url]
      : [
          `https://${dominio}/apple-touch-icon.png`,
          `https://www.google.com/s2/favicons?domain=${dominio}&sz=128`,
        ];

    let mejor = null;
    for (const candidato of candidatos) {
      const descarga = await bajar(candidato);
      if (descarga && (!mejor || descarga.bytes.length > mejor.bytes.length)) mejor = descarga;
    }

    if (!mejor) {
      console.log(`${slug.padEnd(12)} sin logo — usará monograma`);
      continue;
    }

    const archivo = `${slug}.${mejor.extension}`;
    await writeFile(join(LOGOS, archivo), mejor.bytes);
    resultado.push(archivo);
    console.log(`${slug.padEnd(12)} ${archivo.padEnd(18)} ${mejor.bytes.length} bytes`);
  }

  console.log('\nNombres para usar en experience.ts:\n  ' + resultado.join('\n  '));
}

async function bajarBanderas() {
  await mkdir(BANDERAS, { recursive: true });
  console.log('');

  for (const codigo of PAISES) {
    // PNG de 80px en vez del SVG: se dibujan a 18px y el SVG de México pesa
    // 143 KB por el escudo. A ese tamaño no se distingue, y sí se nota al cargar.
    const descarga = await bajar(`https://flagcdn.com/w80/${codigo}.png`, 80);
    if (!descarga) {
      console.log(`bandera ${codigo}  no se pudo descargar`);
      continue;
    }
    await writeFile(join(BANDERAS, `${codigo}.png`), descarga.bytes);
    console.log(`bandera ${codigo}  ${descarga.bytes.length} bytes`);
  }
}

await bajarMarcas();
await bajarBanderas();
