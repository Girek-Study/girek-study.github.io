// Descarga los logos de las empresas de la trayectoria a public/logos/.
//
// Se ejecuta a mano, no en cada build: las imágenes quedan versionadas en el
// repo. Así el sitio no depende de que los servidores de terceros respondan, y
// un logo que cambie no altera el despliegue sin que nadie se entere.
//
//   node scripts/bajar-logos.js

import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = join(fileURLToPath(import.meta.url), '..');

const DESTINO = join(__dirname, '..', 'public', 'logos');

const EMPRESAS = [
  { slug: 'elipgo', dominio: 'elipgo.com' },
  { slug: 'canvia', dominio: 'canvia.com' },
  { slug: 'soho', dominio: 'soho.cl' },
  { slug: 'idm', dominio: 'idmtechnology.com' },
  { slug: 'prestamype', dominio: 'prestamype.com' },
  { slug: 'nagnoi', dominio: 'nagnoi.com' },
  { slug: 'bcp', dominio: 'viabcp.com' },
  { slug: 'utp', dominio: 'utp.edu.pe' },
  { slug: 'delaware', dominio: 'delaware.pro' },
  { slug: 'qsystem', dominio: 'qsystem.com.pe' },
];

/** Devuelve el contenido de la URL, o null si falla. Nunca lanza. */
async function bajar(url) {
  try {
    const respuesta = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (girek-study-web)' },
      signal: AbortSignal.timeout(20_000),
    });
    if (!respuesta.ok) return null;

    const tipo = respuesta.headers.get('content-type') ?? '';
    if (!tipo.startsWith('image/')) return null;

    const bytes = Buffer.from(await respuesta.arrayBuffer());
    // Menos de 500 bytes casi siempre es un favicon de 16px o un pixel vacío.
    return bytes.length > 500 ? bytes : null;
  } catch {
    return null;
  }
}

async function main() {
  await mkdir(DESTINO, { recursive: true });

  for (const { slug, dominio } of EMPRESAS) {
    // Se prueban en orden de calidad: el apple-touch-icon suele ser el logo
    // real a 180px; el servicio de favicons es el respaldo.
    const candidatos = [
      `https://${dominio}/apple-touch-icon.png`,
      `https://${dominio}/apple-touch-icon-precomposed.png`,
      `https://www.google.com/s2/favicons?domain=${dominio}&sz=128`,
    ];

    let mejor = null;
    for (const url of candidatos) {
      const bytes = await bajar(url);
      if (bytes && (!mejor || bytes.length > mejor.length)) mejor = bytes;
    }

    if (!mejor) {
      console.log(`${slug.padEnd(12)} sin logo — la tarjeta usará el monograma`);
      continue;
    }

    await writeFile(join(DESTINO, `${slug}.png`), mejor);
    console.log(`${slug.padEnd(12)} ${String(mejor.length).padStart(7)} bytes`);
  }
}

main();
