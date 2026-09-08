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
  // El servicio de favicons devolvía marcas equivocadas para estas cuatro, así
  // que se fija la URL del logotipo real de cada web.
  { slug: 'idm', url: 'https://idmtechnology.com.pe/wp-content/uploads/2026/03/Logo-IDM-26-Blanco-6-1.png' },
  { slug: 'gmd', url: 'https://media.licdn.com/dms/image/v2/C510BAQGLfVo2GnNp1Q/company-logo_200_200/company-logo_200_200/0/1631374783940?e=2147483647&v=beta&t=HD-iX66E-csEd1QyRJpvtPq4MDTuqfUuaAUKBnmf9YU' },
  { slug: 'prestamype', dominio: 'prestamype.com' },
  { slug: 'nagnoi', url: 'https://static.wixstatic.com/media/e91250_5dd6cc8268cd408ea12007a836db08e6.png/v1/fill/w_129,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e91250_5dd6cc8268cd408ea12007a836db08e6.png' },
  { slug: 'utp', dominio: 'utp.edu.pe' },
  // La versión '-blanco' solo se ve sobre fondo oscuro; aquí va la de color.
  { slug: 'delaware', url: 'https://dlwlatam.com/wp-content/uploads/2023/03/delaware-logotipo.png' },
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
  // Productos de Prestamype. Los tres exponen su logotipo en una URL fija; el
  // servicio de favicons devolvía el globo gris para Tandia y una plantilla
  // ajena para Recadia.
  { slug: 'cambioseguro', url: 'https://cambioseguro.com/favicon.png' },
  { slug: 'tandia', url: 'https://client.tandia.pe/static/img/logo-normal.svg' },
  { slug: 'recadia', url: 'https://recadiapagos.com/logo-recadia-green.svg' },
];

// BCP no expone ningún icono servible: su tarjeta usa monograma a propósito.
//
// IDM solo publica su logotipo en blanco, porque en su web va sobre fondo
// oscuro. public/logos/idm.png es ese archivo montado sobre un fondo oscuro,
// para que se baste solo y no haya que darle trato especial a una loseta entre
// trece. Si se vuelve a bajar, hay que repetir ese montaje.

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
