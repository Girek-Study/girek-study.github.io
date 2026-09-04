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

**5. Español en todo** — contenido, comentarios y commits (conventional commits en español,
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
- No hay sección de notas ni RSS. Es la pieza que falta para publicar contenido propio
  antes de sindicarlo a LinkedIn.
- `profile.links.cv` está vacío; cuando exista el PDF va en `public/cv.pdf`.
- `fuentes-marca/` guarda los logos originales en alta. Están versionados pero fuera del
  despliegue: Astro solo publica `public/`.
