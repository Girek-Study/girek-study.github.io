// ============================================================================
//  DICTIONARY — English.
//
//  Not a machine translation. The Spanish is written in a particular voice and
//  a literal rendering loses it, so these strings are rewritten rather than
//  converted word for word.
//
//  Must mirror the shape of `es.ts` exactly: `Diccionario` enforces it at
//  build time, so a missing key fails the deploy instead of shipping half a
//  page in the wrong language.
// ============================================================================

import type { Diccionario } from './es';

export const en: Diccionario = {
  // --------------------------------------------------------------- navigation
  nav: {
    inicio: 'Home',
    trayectoria: 'Experience',
    girekStudy: 'Girek Study',
    notas: 'Notes',
    portafolio: 'Portfolio',
    abrirMenu: 'Open menu',
    irAInicio: 'Girek Study — Home',
    saltarAlContenido: 'Skip to content',
    idioma: 'Language',
    cambiarIdioma: 'Change language',
  },

  // ------------------------------------------------------------------- footer
  pie: {
    navega: 'Browse',
    conecta: 'Connect',
    hablamos: "Let's talk",
    invitacion: "Tell me where quality stands in whatever you're building.",
    escribeme: 'Email me',
    disponible: 'Open to opportunities · Remote',
    descripcion: 'Test automation and QA teaching, under Girek Study.',
    hechoCon: 'Built with Astro + Tailwind · Deployed on GitHub Pages',
  },

  // -------------------------------------------------------------------- head
  meta: {
    titulo: 'Girek Study — Test automation and QA, written in Spanish',
    descripcion:
      "Quality doesn't come from repetition — it's written in code. Open frameworks you can clone, with the design decisions explained. By Giancarlo Palomino, Quality Engineer with 10 years in banking, fintech and healthcare.",
  },





  // ------------------------------------------------------------- experience
  trayectoria: {
    meta: {
      titulo: 'Experience',
      descripcion: (nombre: string) =>
        `Professional background of ${nombre} in QA, test automation and leading quality teams.`,
    },
    decisionUnoTexto:
      'If someone has to ask me before touching a test, the design failed. Business names, separate layers and decisions written down.',
    decisionDosTexto:
      'A test someone has to remember to run protects nothing. It runs on every build or it does not count.',
    decisionTresTexto:
      'No model knows whether a difference is the agreed change or the defect. That call is where the judgement lives.',
    indice: {
      presentacion: 'Introduction',
      resultados: 'Results',
      clientes: 'Clients',
      ia: 'Applied AI',
      competencias: 'Skills',
      recorrido: 'Path',
      formacion: 'Education',
    },
    iaCapas: 'layers where I apply it, without mixing them',
    iaUsos: 'uses inside the test cycle',
    iaRevision: 'under human review, no exceptions',
    habilidades: {
      'Gobierno de QA': 'QA governance',
      'Estrategia de pruebas': 'Test strategy',
      'Quality gates': 'Quality gates',
      'Release readiness': 'Release readiness',
      'Métricas y KPIs': 'Metrics and KPIs',
      'Mentoría': 'Mentoring',
      'Análisis predictivo': 'Predictive analysis',
      'Automatización de procesos': 'Process automation',
      'Diseño de pruebas': 'Test design',
      'Contract testing': 'Contract testing',
      'Cobertura': 'Coverage',
      'Revisión humana': 'Human review',
    } as Record<string, string>,
    cierreNotas: 'The notes',
    cierreEstudio: 'Girek Study',
    cierrePortafolio: 'The portfolio',
    rotulo: 'Experience',
    entradillaUno:
      'I design the quality infrastructure of products where failing is expensive: frameworks another team can maintain, tests that run on every build, and AI agents that absorb the repetitive work.',
    entradillaDos: ' I started out writing code and never let go of it.',
    banderaDe: (pais: string) => `Flag of ${pais}`,
    cvEnPdf: 'CV as PDF',
    enEstaPagina: 'On this page',
    seccionesDeLaPagina: 'Page sections',
    cerrar: 'Close',
    visitarSitio: 'Visit the site',
    desde: 'Through',
    productos: 'Products',

    presentacionRotulo: 'Introduction',
    presentacionTitulo: 'How I work',
    presentacionBajada:
      'Ten years, four countries and a way of working that does not depend on the tool of the moment.',
    presentacionCita:
      'I started out writing code and never let go of it. That is why I can discuss a pipeline or an API contract with developers as an equal.',
    presentacionUno:
      'I started programming in Java and ended up leading quality chapters in banking and fintech. Along the way I learned that a suite is not worth what it has in number of tests, but in how many are still running two years later without anyone fighting them.',
    presentacionDos:
      'Today I build frameworks another team can maintain, move the tests into the pipeline so feedback arrives in minutes instead of days, and apply AI to design and analysis without letting go of the wheel.',
    conQueConstruyo: 'What I build with day to day',
    tresDecisiones: 'Three decisions I make on every project',
    decisionUno: 'I build it so the team can maintain it',
    decisionDos: 'What is not in the pipeline does not exist',
    decisionTres: 'AI proposes, the decision is human',

    resultadosRotulo: 'Results',
    resultadosTitulo: 'What moved while I was there',
    resultadosBajada: 'Figures from the CV, each with the context it happened in.',

    clientesRotulo: 'Where',
    clientesTitulo: 'Products that passed through my hands',
    clientesBajada:
      'Click any logo to see which company I worked through for that client, and what was done there.',

    iaRotulo: 'Applied AI',
    iaTitulo: 'Where AI fits into my work',
    iaBajada:
      'Three distinct layers, and it pays not to mix them: building my own tools, putting models inside the test cycle, and testing products that have AI inside them.',
    iaModelos: 'Models',
    iaAgentes: 'Agents and tools I built',
    iaSoftwarePropio: 'my own software, in production',
    iaVerModelo: 'See the model',
    iaComoFunciona: 'How it works',
    iaElAgente: 'The agent',
    iaDondeActua: 'Where it acts in the cycle',
    iaBajoRevision: 'Under human review',
    iaEnElCicloTitulo: 'AI inside the test cycle',
    iaEnElCicloTexto:
      'Applied on client projects, with one fixed rule: no model output becomes an executable case or a reported defect without human review.',

    competenciasRotulo: 'What I can do',
    competenciasTitulo: 'Skills',
    competenciasBajada:
      'What I can defend in a technical interview, grouped by what it is for.',

    recorridoRotulo: 'Path',
    recorridoTitulo: 'Stage by stage',
    recorridoBajada:
      'From my first internship to technical leadership. Click a stage to see what I did there.',
    queHiceAhi: 'What I did there',
    queCubri: 'What I covered',
    herramientas: 'Tools',
    dondeCae: 'Where it falls in the path',
    primerasPracticas: 'First internship',

    formacionRotulo: 'Education',
    formacionTitulo: 'Studies and certifications',
    formacionBajada: 'What a third party has accredited, not what I say about myself.',
    educacion: 'Education',
    certificaciones: 'Certifications',
    idiomas: 'Languages',

    cierreTitulo: 'I publish all of this in the open',
    cierreTexto:
      'The frameworks I build, the design decisions behind each one, and what I learn along the way. The code can be cloned and the notes are read without signing up. The classes come later.',
    cierreNotasDetalle: 'What I learn along the way, with no sign-up and no paywall.',
    cierreEstudioDetalle: 'The plan for the classes: what is taught and in what order.',
    cierrePortafolioDetalle: 'The open repositories, ready to clone and read.',
  },

  // ----------------------------------------------------------------- home
  inicio: {
    heroCredencial: '10 years in QA and AI',
    heroCargo: 'QE Automation Lead · ISTQB',
    cierreTextoDos: 'I reply with what I would do, even if we never end up working together.',
    bienvenida: 'Welcome to Girek Study',
    titularUno: "Quality doesn't come from repeating.",
    titularDos: "It's written in code.",
    entradilla:
      'Testing is not following a script step by step. It is writing the code that covers what no script would reach, and that does it again on every release without getting tired.',
    cita: 'What is not in the pipeline is not a test: it is a hope.',
    verCodigo: 'See the code',
    conoceme: 'Meet Girek',
    stackRotulo: 'The stack I build with',
    hayMas: 'There is more below',

    puertasRotulo: 'What you will find',
    puertasTitulo: 'What is missing is what comes after',
    puertasTexto:
      'Almost all the good material on test automation is in English, and what exists in Spanish stops at hello world: install the tool, write a test, done. What is missing is how a suite of three hundred tests holds up, why it becomes unmaintainable, and which decisions keep it from getting there. That is what I publish here, with the code in the open and the reasoning behind every decision.',

    codigoEtiqueta: 'Code',
    codigoContador: (n: number) => (n === 1 ? '1 open repository' : `${n} open repositories`),
    codigoTitulo: 'Frameworks you can clone',
    codigoTexto:
      'Complete implementations that actually run, with their CI green. Not tutorial fragments: the skeleton I use to start a real suite.',
    escrituraEtiqueta: 'Writing',
    escrituraContador: (n: number) => (n === 1 ? '1 note published' : `${n} notes published`),
    escrituraTitulo: 'Decisions and expensive mistakes',
    escrituraTexto:
      'Why a suite becomes unmaintainable, when a pattern is not worth it, and what breaks in production without the interface showing a thing.',
    leerNotas: 'Read the notes',
    ensenanzaEtiqueta: 'Teaching',
    enPreparacion: 'In preparation',
    ensenanzaTitulo: 'Live classes',
    ensenanzaTexto:
      'Guided automation tracks, from the fundamentals to a production-ready framework. They have not opened yet; the open material is already here.',
    verTemario: 'See the syllabus',

    portafolioRotulo: 'Portfolio',
    portafolioTitulo: 'Featured projects',
    portafolioNota: 'A selection of work in automation, quality and product.',
    verTodos: 'See all',

    notasRotulo: 'Notes',
    notasTitulo: 'The latest thing I wrote',
    notasNota: 'Design decisions and expensive mistakes, with no filler. In Spanish.',
    todasLasNotas: 'All the notes',

    bandaRotulo: 'Teaching project',
    explorarCursos: 'Explore the courses',
    piezaFrameworks: 'Open frameworks',
    piezaFrameworksDetalle: 'Playwright, Screenplay and TypeScript, ready to clone.',
    piezaDecisiones: 'The decisions, explained',
    piezaDecisionesDetalle: 'Why each piece sits where it sits, and what happens if it does not.',
    piezaRutas: 'Guided tracks',
    piezaRutasDetalle: 'From the fundamentals to a suite that survives production.',
    disponible: 'Available',

    cierreDisponible: 'Open to opportunities · Remote',
    cierreTituloUno: "Let's talk about your next",
    cierreTituloResalte: 'quality project',
    cierreTexto:
      'Tell me what you are building and where quality stands. I reply with what I would do',
    canalEscribeme: 'Email me',
    canalLinkedin: 'Profile and posts',
  },

  // ---------------------------------------------------------------- notes
  notas: {
    meta: {
      titulo: 'Notes — Girek Study',
      descripcion:
        'Notes on test automation, software quality and the design decisions that keep a suite alive over time. Written in Spanish.',
    },
    notaEnArchivo: (n: number) => (n === 1 ? 'note in the archive' : 'notes in the archive'),
    leer: 'Read',
    encontrada: (n: number) => (n === 1 ? 'note found' : 'notes found'),
    rotulo: 'Notes',
    titular: 'What I learn writing tests',
    bajada:
      'Design decisions, mistakes that cost me dearly, and things I wish someone had told me earlier. Written from the project where they happened, with no filler.',
    unaNota: (n: number) => (n === 1 ? 'note' : 'notes'),
    temas: 'topics',
    deLectura: 'of reading',
    minutos: 'min',
    minutosDeLectura: (n: number) => `${n} min read`,
    rss: 'Subscribe by RSS · no sign-up, no paywall',

    ultimo: 'Latest',
    loQueHayDentro: 'What is inside',
    leerLaNota: 'Read the note',
    filtrarPorTema: 'Filter by topic',
    todas: 'All',

    archivoRotulo: 'The archive',
    archivoTitulo: 'Everything else',
    archivoNota: 'Search by title, by topic, or by what is inside each note.',
    buscarEntre: (n: number) => `Search ${n} notes…`,
    buscarNotas: 'Search notes',
    limpiarBusqueda: 'Clear the search',
    sinNotas: 'No notes published yet.',
    borrador: 'draft',
    sinCoincidencias: 'No note matches',
    verTodas: 'Show all notes',
    verMas: 'Show more notes',

    cierreRotulo: "Let's talk",
    cierreTitulo: 'If any of this sounds familiar, tell me about it',
    cierreTexto:
      'Every one of these notes came out of a real project. If you are in a similar one, email me and I will tell you what I would do, even if we never end up working together.',
    cierreEscribeme: 'Email me',
    cierreCodigo: 'The code',
    cierreCodigoDetalle: 'The open repositories, ready to clone.',
    cierreRss: 'By RSS',
    cierreRssDetalle: 'The feed tells you when a new one is out.',

    avisoIdioma:
      'The notes themselves are in Spanish. That is the whole point of this project: the good material on test automation is already in English, and what exists in Spanish stops at hello world. Titles and topics are translated here so you can see what is covered.',
  },

  // ------------------------------------------------------------ girek study
  estudio: {
    meta: { titulo: 'Girek Study — Teaching QA and test automation' },
    rotulo: ['Learn', 'Practise', 'Move up'],
    lemaAntes: 'Test automation in',
    lemaResalte: 'Spanish',
    bajada:
      'What is missing is what comes after: how a suite of three hundred tests holds up, and which design decisions keep it from becoming unmaintainable.',
    verTemario: 'See the syllabus',
    verCodigo: 'See the open source',
    sinClases: 'Classes have not opened yet',
    cursosAbiertos: (n: number) => `${n} courses open`,
    conQueSeTrabaja: 'What you work with',
    repositorios: (n: number) => (n === 1 ? 'open repository' : 'open repositories'),
    notasPublicadas: (n: number) => (n === 1 ? 'note published' : 'notes published'),
    rutas: (n: number) => (n === 1 ? 'track in preparation' : 'tracks in preparation'),
    empezarPorNotas: 'Start with the notes',

    paraQuienRotulo: 'Who it is for',
    paraQuienTitulo: 'Who this helps',
    paraQuienNota:
      'Four different starting points. The material is the same; what changes is where it makes sense to come in.',
    empiezaPor: 'Start with',

    programaRotulo: 'Program',
    programaTitulo: 'Courses and tracks',
    programaNota:
      'From the fundamentals to production-ready frameworks. None of them has opened yet.',
    niveles: {
      Inicial: 'Beginner',
      Intermedio: 'Intermediate',
      Avanzado: 'Advanced',
    } as Record<string, string>,
    abierto: 'Open',
    codigoYa: 'The code, now',

    comunidadRotulo: 'Community',
    comunidadTitulo: 'What my students say',

    cierreRotulo: 'In the meantime',
    cierreTitulo: 'The open material is already published',
    cierreTexto:
      'There is no need to wait for the classes. The frameworks can be cloned today and the notes explain the design decisions behind each one. Email me if you want a heads-up when the first cohort opens.',
    cierreCodigo: 'The code',
    cierreCodigoDetalle: 'The open repositories, ready to clone and read.',
    cierreNotas: 'The notes',
    cierreNotasDetalle: 'What I learn along the way, with no sign-up and no paywall.',
    cierreAviso: 'Let me know',
    cierreAvisoDetalle: 'I will email you when the first cohort opens.',
    asuntoCorreo: 'Girek%20Study%20—%20more%20info',
  },

  // --------------------------------------------------------------- portfolio
  portafolio: {
    meta: {
      titulo: 'Portfolio',
      descripcion:
        'Test automation, QA, web and teaching work by Giancarlo (Girek) Palomino.',
    },

    categorias: {
      'Automatización': 'Test automation',
      'APIs y backend': 'APIs and backend',
      Liderazgo: 'Leadership',
      'IA aplicada': 'Applied AI',
      Rendimiento: 'Performance',
    } as Record<string, string>,
    sectores: {
      Banca: 'Banking',
      Salud: 'Healthcare',
      Fintech: 'Fintech',
      Retail: 'Retail',
      Transversal: 'Cross-industry',
    } as Record<string, string>,
    etiquetas: {
      'Estrategia de QA': 'QA strategy',
      'Mentoría': 'Mentoring',
      'Diseño de pruebas': 'Test design',
      Cobertura: 'Coverage',
      'Revisión humana': 'Human review',
      'Regresión': 'Regression',
    } as Record<string, string>,
    rotulo: 'Portfolio',
    titular: "What I've built",
    entradilla:
      'Client work told as problem, decision and result — no confidential data or material — and the open source anyone can clone and read.',
    cifras: { casos: 'Cases', repos: 'Repos', sectores: 'Sectors' },
    notaApi:
      "This list isn't maintained by hand: it comes from the GitHub API on every deploy.",
    verCuenta: 'View the GitHub account',

    casosRotulo: 'Client work',
    casosTitulo: 'Client projects',
    casosNota: 'Each one with the sector it happened in and, where there is one, the number it left behind.',
    filtrarPorCategoria: 'Filter by category',
    todos: 'All',
    destacado: 'Featured',
    codigo: 'Code',
    demo: 'Demo',
    sinCasos: 'Nothing in this category yet.',

    reposRotulo: 'Open source',
    reposTitulo: 'Repositories',
    reposNota: 'Everything I publish on GitHub, with the code in the open and a permissive license.',
    repositorio: 'Repository',
    verCodigo: 'View code',
    verCodigoDe: (nombre: string) => `View the code for ${nombre} on GitHub`,
    documentacion: 'QA documentation',
    sinGitHub: "Couldn't reach GitHub right now.",
    verDirectamente: 'Open the account directly →',
  },

  // -------------------------------------------------------------------- time
  tiempo: {
    hoy: 'today',
    ayer: 'yesterday',
    haceDias: (n: number) => `${n} days ago`,
    haceMeses: (n: number) => (n === 1 ? 'a month ago' : `${n} months ago`),
    haceAnios: (n: number) => (n === 1 ? 'a year ago' : `${n} years ago`),
  },
};
