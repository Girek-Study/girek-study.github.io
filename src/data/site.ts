// ============================================================================
//  PERFIL — Datos reales, tomados del CV y del perfil de LinkedIn.
//  Regla: aquí no entra ninguna cifra que no se pueda sustentar en una
//  entrevista. Un número inventado desmiente todo lo demás que diga el sitio.
// ============================================================================

export const profile = {
  nombre: 'Giancarlo Palomino',
  nombreCompleto: 'Giancarlo Renato Palomino Huallpa',
  alias: 'Girek',
  titular: 'Ingeniero de calidad que codea',
  cargoActual: 'Quality Engineering & API Testing en Canvia, para Interbank',
  ubicacion: 'Lima, Perú',

  tagline:
    'Diez años haciendo que los equipos entreguen más rápido sin romper producción. Ahora escribo y enseño cómo se hace.',

  bio:
    'Llevo diez años en calidad de software: empecé programando en Java y terminé liderando chapters de QA en banca y fintech. Construyo frameworks de automatización que otros equipos puedan mantener, llevo las pruebas a los pipelines para que el feedback llegue en minutos y no en días, y aplico IA al diseño de escenarios sin soltarle el volante. Girek Study es donde publico todo eso en abierto: el código, las decisiones y el porqué de cada una.',

  email: 'ing.palominoh@gmail.com',

  // Se enlaza por nombre de usuario y no por número: wa.me lo resuelve
  // (redirige a api.whatsapp.com/send/?username=...&type=username) y así el
  // móvil no queda expuesto a los rastreadores de spam que barren páginas
  // públicas. El texto previo ahorra el "hola, ¿con quién hablo?".
  whatsapp: '@ing.palominoh',
  whatsappUrl:
    'https://wa.me/ing.palominoh?text=' +
    encodeURIComponent('Hola Giancarlo, te escribo desde girek-study.com.'),

  links: {
    linkedin: 'https://www.linkedin.com/in/girekpalomino/',
    github: 'https://github.com/Girek-Study',
    youtube: '',
    // Cuando exista el PDF, colócalo en public/cv.pdf y pon aquí '/cv.pdf'.
    cv: '',
  },
};

// Métricas del hero. Las tres son verificables contra la trayectoria.
export const stats = [
  { valor: '10', etiqueta: 'años en QA y automatización' },
  { valor: '15', etiqueta: 'ingenieros de calidad liderados' },
  { valor: '4', etiqueta: 'sectores: banca, fintech, salud y educación' },
];

// Stack que se defiende en una entrevista técnica, no una lista de deseos.
export const stack = [
  'Playwright',
  'TypeScript',
  'Selenium',
  'Cypress',
  'Appium',
  'Screenplay',
  'Cucumber / BDD',
  'RestAssured',
  'Karate',
  'Postman',
  'k6',
  'JMeter',
  'Azure DevOps',
  'Jenkins',
  'GitLab CI',
  'Docker',
  'Kubernetes',
  'SQL',
  'Java',
  'Python',
];

/**
 * Token de Cloudflare Web Analytics.
 *
 * No es un secreto: viaja dentro del HTML de cada página, así que guardarlo en
 * un `.env` solo complicaría el despliegue sin esconder nada. Se saca del panel
 * de Cloudflare, en Analytics & Logs → Web Analytics → Add a site.
 *
 * Vacío significa sin medición: el sitio no carga ningún script y no pasa nada.
 * Se eligió Cloudflare y no Google Analytics por peso y por cookies: son unos
 * 5 KB frente a 50, y al no poner cookies no hace falta banner de
 * consentimiento. Para un sitio cuyo argumento es que las cosas estén bien
 * hechas, el rastreador pesado contradecía el mensaje.
 */
export const analiticaCloudflare = '18a34828424049f49a6084d3825cb574';
