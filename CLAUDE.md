# Girek Study — sitio web

Sitio de **Girek Study**, la marca de enseñanza de automatización de pruebas de Giancarlo
Renato Palomino Huallpa. Es a la vez su carta de presentación profesional y el punto de
partida para publicar contenido de QA y, más adelante, cursos.

- **En producción:** https://girek-study.com
- **Repositorio:** `Girek-Study/girek-study.github.io`
- **Stack:** Astro 5 + Tailwind CSS v4, estático, sin framework de UI

## Reglas que no se rompen

**1. Aquí no entra nada inventado.** Ni una cifra, ni un testimonio, ni un curso que no
exista. La plantilla original traía "100+ estudiantes", un testimonio de "Estudiante de
ejemplo" y cursos marcados como disponibles; todo eso se eliminó. Si una métrica no se
puede sustentar en una entrevista, no va. La credibilidad del sitio es su único activo.

**2. Los cursos son "Próximamente" hasta que existan.** Cuando alguno abra de verdad, se
cambia `estado` en `src/data/courses.ts` y se agrega su `enlace`.

**3. Los testimonios están vacíos a propósito.** La sección aparece sola cuando el array
tenga entradas reales. No rellenar.

**4. Trabajo de cliente sin datos confidenciales.** En `projects.ts` los casos se cuentan a
nivel de problema, decisión y resultado. Nada de credenciales, capturas internas, nombres
de personas ni enlaces a sistemas del cliente.

**5. La trayectoria va sin fechas**, por decisión del autor (2026-09-04). El orden
cronológico se sostiene solo. Las fechas exactas siguen en `cv-datos.json` por si hay que
reponerlas.

**6. Español en todo** — contenido, comentarios y commits (conventional commits en español,
sin `Co-Authored-By`).

## Dónde se edita el contenido

Todo el texto vive en `src/data/`. Las páginas no llevan contenido embebido.

| Archivo | Qué contiene |
| --- | --- |
| `site.ts` | Nombre, nombre completo, titular, bio, stats, stack, enlaces |
| `experience.ts` | Experiencia, certificaciones, educación, idiomas |
| `projects.ts` | Casos de trabajo de cliente (NO los repos) |
| `courses.ts` | Girek Study: descripción, cursos, testimonios |
| `github.ts` | Lectura de la API de GitHub — no se edita a mano |

Cada experiencia lleva logo, bandera del país, enlace a la web de la empresa y sus clientes,
también con logo. Todo se descarga con `node scripts/bajar-activos.js` y queda versionado en
`public/logos/` y `public/paises/`: la página no depende de servidores ajenos al cargar, y si
una empresa cambia su logo el sitio no se altera solo.

- `logo` guarda el **nombre de archivo con extensión** (`canvia.svg`, `interbank.jpg`),
  porque cada fuente devuelve un formato distinto.
- **Los logos hay que verlos antes de darlos por buenos.** Los favicons mienten: el de
  idmtechnology.com no es el logo de IDM y el de Interbank devolvía una imagen ajena. El
  método que funciona es descargar candidatos, montarlos en una hoja de contactos HTML,
  capturarla con Playwright y revisarla a ojo.
- Sin logo verificado y con monograma: **IDM Technology, UTP, BCP y GMD**. Si aparece el
  archivo correcto, se copia a `public/logos/` y se pone su nombre en `logo`.
- Las banderas son PNG de 80px de flagcdn, no SVG ni emoji: el SVG de México pesa 143 KB por
  el escudo y a 18px no se distingue, y Windows no dibuja los emoji de bandera.

**La fuente de verdad de los datos profesionales está fuera de este repo**, en
`c:\Works\Girek.Study\Agente_Searchs_Work\datos\` (`cv/cv-datos.json`, `perfil/*.json`).
Si cambia la trayectoria, se actualiza allá primero y se vuelca aquí.

## El portafolio se actualiza solo

`src/data/github.ts` consulta la API de GitHub **durante el build** y lista los
repositorios públicos de la cuenta `Girek-Study`. Publicas un repo y aparece en el
siguiente despliegue: no hay lista que mantener a mano.

- Excluye forks, archivados y el repo homónimo del perfil.
- Nunca lanza: si la API falla, devuelve `[]` y la página muestra su mensaje de respaldo.
  Un despliegue no debe caerse porque un servicio ajeno tuvo un mal minuto.
- En CI usa `GITHUB_TOKEN` para subir el límite de peticiones de 60 a 1000 por hora.

## Despliegue

`.github/workflows/deploy.yml` construye y publica en GitHub Pages:

- En cada push a `main`.
- Por cron diario a las 09:00 UTC, para que los repos nuevos aparezcan sin tocar nada.
- A mano con `workflow_dispatch`.

El dominio se sostiene en dos piezas: `public/CNAME` (que GitHub lee en cada despliegue) y
los registros DNS en Cloudflare —cuatro `A`, cuatro `AAAA` y un `CNAME` para `www`—, todos
en **DNS only**. Si alguien activa el proxy naranja, GitHub no puede renovar el certificado
y el sitio queda con error de HTTPS.

## Notas y RSS

Las notas viven en `src/content/notas/*.md`. Una nota por archivo; el nombre del archivo
es la URL. El esquema está en `src/content.config.ts` y es estricto a propósito: si falta
un campo o la fecha está mal escrita, **el build falla** en vez de publicar una nota rota.

```yaml
---
titulo: Máximo 90 caracteres
resumen: Máximo 220. Se usa en el listado, en el RSS y en la vista previa al compartir.
fecha: 2026-09-05
etiquetas: [Playwright, CI/CD]
borrador: false # true = se ve en `npm run dev` pero no se publica
---
```

`/rss.xml` se genera solo desde la colección. **El orden importa**: se publica primero aquí
y desde aquí se sindica a LinkedIn con un enlace de vuelta. Publicar solo en LinkedIn
regala el contenido a una plataforma de la que no se puede recuperar ni indexar.

Regla de contenido: si una nota no sale de trabajo real de esa semana, no se publica.

## SEO

El sitio se descubre por su nombre de marca, así que lo que importa es que Google entienda
que "Girek Study" es una entidad:

- `sitemap-index.xml` lo genera `@astrojs/sitemap` en cada build; `public/robots.txt` lo
  apunta.
- `Layout.astro` emite JSON-LD con un `WebSite` llamado Girek Study y una `Person` con
  `sameAs` hacia LinkedIn y GitHub. Ese `sameAs` es lo que une los tres perfiles como una
  sola entidad — no quitarlo.
- `public/og.png` (1200x630) es la vista previa al compartir el enlace. Se generó a mano
  renderizando un HTML con Playwright; si hay que rehacerla, mismo tamaño y mismo nombre.
- Cada página emite `canonical` y `og:url` absolutos, que dependen de `site` en
  `astro.config.mjs`. Si el dominio cambia, se cambia ahí y todo lo demás sigue.

Lo que no está en el repo y hay que hacer una vez: verificar el dominio en Google Search
Console y en Bing Webmaster Tools, y enviar el sitemap.

## Comandos

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera /dist
npm run preview
```

## Pendientes conocidos

- `public/brand/girek-fox-full.png` pesa 799 KB sin optimizar. Pasarlo por `<Image />` de
  Astro reduciría alrededor del 90%.
- El pipeline de contenido (cosecha de ideas desde los commits, borradores por lote y
  publicación asistida a LinkedIn) todavía no existe; las notas se escriben a mano.
- `profile.links.cv` está vacío; cuando exista el PDF va en `public/cv.pdf`.
- `fuentes-marca/` guarda los logos originales en alta. Están versionados pero fuera del
  despliegue: Astro solo publica `public/`.
