import type { Bilingue } from '../i18n';

// ============================================================================
//  DATOS DE APOYO DE LA PÁGINA DE TRAYECTORIA
//
//  Todo sale del CV (Agente_Searchs_Work/datos/cv/cv-datos.json). Ninguna
//  cifra de aquí se inventa: cada una se puede sustentar en una entrevista.
// ============================================================================

/**
 * Cifras del encabezado.
 *
 * Criterio: que sean raras (pocos las tienen), de resultado (no de actividad) y
 * verificables. Por eso salieron "etapas profesionales" —que se lee como
 * rotación— y "sectores", que el visitante ya lee dos líneas más abajo.
 */
export const cifras = [
  {
    valor: '10',
    etiqueta: { es: 'años en calidad de software', en: 'years in software quality' },
    detalle: { es: 'De programador Java a líder de práctica', en: 'From Java developer to practice lead' },
    icono: 'reloj',
  },
  {
    valor: '8',
    etiqueta: { es: 'agentes de IA construidos', en: 'AI agents built' },
    detalle: { es: 'En uso por equipos, no demos', en: 'In use by teams, not demos' },
    icono: 'chip',
  },
  {
    valor: '−70%',
    etiqueta: { es: 'tiempo de validación por release', en: 'validation time per release' },
    detalle: { es: 'Ejecución paralela en contenedores', en: 'Parallel execution in containers' },
    icono: 'grafico',
  },
  {
    valor: '4',
    etiqueta: { es: 'países donde he trabajado', en: 'countries I have worked in' },
    detalle: { es: 'Perú, México, Chile y Puerto Rico', en: 'Peru, Mexico, Chile and Puerto Rico' },
    icono: 'globo',
    // Los archivos están en public/paises/, los mismos de la línea de tiempo.
    banderas: [
      { codigo: 'pe', nombre: 'Perú' },
      { codigo: 'mx', nombre: 'México' },
      { codigo: 'cl', nombre: 'Chile' },
      { codigo: 'pr', nombre: 'Puerto Rico' },
    ],
  },
];

export interface Competencia {
  area: string;
  /** Una línea que explique qué significa dominar esa área, no solo la lista. */
  detalle: string;
  items: string[];
}

export const competencias: Competencia[] = [
  {
    area: { es: 'Automatización', en: 'Test automation' },
    detalle: { es: 'Frameworks pensados para que los mantenga otro equipo, no para lucir en una demo.', en: 'Frameworks built so another team can maintain them, not to look good in a demo.' },
    items: [
      'Playwright',
      'TypeScript',
      'Selenium',
      'Cypress',
      'Appium',
      'Screenplay',
      'Page Object Model',
      'Data-Driven',
      'Cucumber / BDD',
      'Gherkin',
    ],
  },
  {
    area: { es: 'APIs e integración', en: 'APIs and integration' },
    detalle: { es: 'Validar el contrato, no solo el código 200: tipos, campos opcionales, errores e integridad de datos.', en: 'Validating the contract, not just the 200: types, optional fields, errors and data integrity.' },
    items: ['RestAssured', 'Karate', 'Postman', 'REST', 'SOAP', 'Contract testing', 'SQL'],
  },
  {
    area: { es: 'Rendimiento y seguridad', en: 'Performance and security' },
    detalle: { es: 'Conocer el punto de quiebre antes que los usuarios, y dentro del pipeline.', en: 'Knowing the breaking point before the users do, and from inside the pipeline.' },
    items: ['k6', 'JMeter', 'Gatling', 'LoadRunner', 'OWASP ZAP', 'SonarQube'],
  },
  {
    area: { es: 'CI/CD y plataformas', en: 'CI/CD and platforms' },
    detalle: { es: 'Base de DevOps real: pipelines, contenedores e infraestructura como código, no solo consumirlos.', en: 'Real DevOps grounding: pipelines, containers and infrastructure as code, not just consuming them.' },
    items: [
      'Jenkins',
      'GitLab CI',
      'Azure DevOps',
      'Docker',
      'Kubernetes / AKS',
      'Terraform',
      'AWS',
      'Azure',
      'Git',
    ],
  },
  {
    area: { es: 'IA aplicada al testing', en: 'AI applied to testing' },
    detalle: { es: 'Desde asistir el diseño de pruebas hasta construir agentes que hacen el trabajo repetitivo del chapter. Siempre bajo revisión humana.', en: 'From assisting test design to building agents that do the chapter\u2019s repetitive work. Always under human review.' },
    items: [
      'GPT',
      'Claude',
      'Gemini',
      'Copilot',
      'Agentes',
      'Machine learning',
      'Análisis predictivo',
      'Automatización de procesos',
    ],
  },
  {
    area: { es: 'Liderazgo y estrategia', en: 'Leadership and strategy' },
    detalle: { es: 'Lo que decide si una práctica de calidad sobrevive al segundo trimestre.', en: 'What decides whether a quality practice survives its second quarter.' },
    items: [
      'Gobierno de QA',
      'Estrategia de pruebas',
      'Risk-based testing',
      'Shift-Left',
      'Quality gates',
      'Release readiness',
      'Métricas y KPIs',
      'Mentoría',
    ],
  },
  {
    area: 'Lenguajes',
    detalle: { es: 'Empecé programando; por eso discuto el código con desarrollo de igual a igual.', en: 'I started out writing code; that is why I discuss it with developers as an equal.' },
    items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'C#'],
  },
  {
    area: 'Metodologías',
    detalle: { es: 'Marcos de trabajo con los que he entregado, no solo estudiado.', en: 'Frameworks I have delivered with, not just studied.' },
    items: ['Scrum', 'Kanban', 'Lean', 'SAFe', 'Agile Testing'],
  },
];

/**
 * Los resultados que más peso tienen, con su contexto.
 *
 * `barra` representa la misma métrica antes y después, en relativo: un −70%
 * es pasar de 100 a 30. No son valores absolutos —esos son del cliente— sino
 * la proporción que la cifra ya declara.
 */
export interface LogroDestacado {
  cifra: string;
  titulo: Bilingue;
  detalle: Bilingue;
  sector: string;
  icono: string;
  barra?: {
    antes: number;
    despues: number;
    etiquetaAntes: Bilingue;
    etiquetaDespues: Bilingue;
  };
  /** Alternativa a la barra cuando la cifra es un recuento de personas. */
  puntos?: { cantidad: number; etiqueta: Bilingue };
}

export const logrosDestacados: LogroDestacado[] = [
  {
    cifra: '−70%',
    titulo: { es: 'Tiempo de validación por release', en: 'Validation time per release' },
    detalle: { es: 'Ejecución paralela y distribuida en contenedores Docker sobre Jenkins y GitLab CI.', en: 'Parallel, distributed runs in Docker containers on Jenkins and GitLab CI.' },
    sector: 'Fintech',
    icono: 'M12 7v5l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    barra: { antes: 100, despues: 30, etiquetaAntes: { es: 'Antes', en: 'Before' },
      etiquetaDespues: { es: 'Después', en: 'After' } },
  },
  {
    cifra: '+70%',
    titulo: { es: 'Cobertura automatizada', en: 'Automated coverage' },
    detalle: { es: 'Suites en Playwright y Specflow que redujeron de forma notoria los errores críticos que llegaban a producción.', en: 'Suites in Playwright and Specflow that markedly cut the critical bugs reaching production.' },
    sector: 'Datos y analítica',
    icono: 'M3 17l6-6 4 4 8-8 M21 7v5h-5',
    barra: { antes: 30, despues: 100, etiquetaAntes: { es: 'Al llegar', en: 'On arrival' },
      etiquetaDespues: { es: 'Al salir', en: 'On leaving' } },
  },
  {
    cifra: '−40%',
    titulo: { es: 'Tiempo de ejecución de la suite', en: 'Suite run time' },
    detalle: { es: 'Paralelización y optimización de scripts, sin perder cobertura.', en: 'Parallelisation and script optimisation, without losing coverage.' },
    sector: 'Datos y analítica',
    icono: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
    barra: { antes: 100, despues: 60, etiquetaAntes: { es: 'Antes', en: 'Before' },
      etiquetaDespues: { es: 'Después', en: 'After' } },
  },
  {
    cifra: '15',
    titulo: { es: 'Ingenieros de calidad coordinados', en: 'Quality engineers coordinated' },
    detalle: { es: 'Chapter al servicio de varias tribus del banco más grande del Perú, con estándares comunes y un programa de mentoría propio.', en: 'A chapter serving several tribes of the largest bank in Peru, with shared standards and its own mentoring program.' },
    sector: 'Banca',
    icono: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    puntos: {
      cantidad: 15,
      etiqueta: { es: 'Un chapter, varias tribus', en: 'One chapter, several tribes' },
    },
  },
];

/**
 * Los clientes finales donde se hizo el trabajo, agrupados por sector.
 * Los logos viven en public/logos/; `logo: null` dibuja un monograma.
 */
export type CodigoPais = 'pe' | 'mx' | 'cl' | 'pr';

export const NOMBRE_PAIS: Record<CodigoPais, string> = {
  pe: 'Perú',
  mx: 'México',
  cl: 'Chile',
  pr: 'Puerto Rico',
};

export interface Cliente {
  nombre: string;
  sector: string;
  logo: string | null;
  web: string;
  /** País donde se hizo el trabajo, no la sede del cliente. */
  pais: CodigoPais;
  /** Empresa o consultora desde la que se trabajó para ese cliente. */
  via?: string;
  /**
   * Marca los logos que son solo símbolo, sin texto. Un isotipo cuadrado
   * necesita más altura que un logotipo largo para pesar lo mismo en la
   * página; sin esto unos se ven diminutos junto a otros.
   */
  iso?: boolean;
  /** Qué se hizo ahí. Solo lo documentado en el CV; nunca se rellena a ojo. */
  logros?: string[];
}

/** Ordenados por sector para que la rejilla los agrupe sin cortar filas. */
export const clientes: Cliente[] = [
  {
    nombre: 'Interbank',
    sector: 'Banca',
    logo: 'interbank.png',
    web: 'https://interbank.pe',
    pais: 'pe',
    via: 'Canvia · Delaware · Q System',
    logros: [
      'Certificación de los servicios críticos en su modernización de XML a JSON: contratos, mapeo de campos, reglas de negocio e integridad de datos entre el servicio legado y el migrado.',
      'En Medios de Pago, migración de pipelines y releases a Jenkins, integración del simulador VISA y capacitación de un squad de 35 personas.',
      'Certificación funcional de cajeros automáticos, verificando sincronización y seguridad de la información según la normativa del sector.',
    ],
  },
  {
    nombre: 'BCP',
    sector: 'Banca',
    logo: 'bcp.png',
    web: 'https://www.viabcp.com',
    pais: 'pe',
    via: 'Chapter Lead Quality Engineer',
    logros: [
      'Coordinación de 15 ingenieros de calidad repartidos en varias tribus de producto digital, con estándares comunes de framework, nomenclatura y reportería.',
      'Un 20% más de cobertura automatizada con frameworks en Selenium, JUnit, Appium y SerenityBDD con patrón Screenplay.',
      'Integración de pruebas de rendimiento y seguridad dentro de los pipelines, y un programa de mentoría propio para los ingenieros junior.',
    ],
  },
  {
    nombre: 'BBVA',
    sector: 'Banca',
    iso: true,
    logo: 'bbva.png',
    web: 'https://www.bbva.pe',
    pais: 'pe',
    via: 'Canvia',
    logros: ['Apoyo a la migración a cloud con métricas, tableros e integración de JIRA con Jenkins.'],
  },
  {
    nombre: 'Scotiabank',
    sector: 'Banca',
    iso: true,
    logo: 'scotiabank.png',
    web: 'https://www.scotiabank.com.pe',
    pais: 'pe',
  },
  {
    nombre: 'Citibank',
    sector: 'Banca',
    logo: 'citibank.png',
    web: 'https://www.citibank.com',
    pais: 'pe',
  },
  {
    nombre: 'MiBanco',
    sector: 'Banca',
    iso: true,
    logo: 'mibanco.png',
    web: 'https://www.mibanco.com.pe',
    pais: 'pe',
  },
  { nombre: 'SUNAT', sector: 'Gobierno', iso: true, logo: 'sunat.png', web: 'https://www.sunat.gob.pe', pais: 'pe' },
  { nombre: 'SMV', sector: 'Gobierno', logo: 'smv.png', web: 'https://www.smv.gob.pe', pais: 'pe' },
  {
    nombre: 'Contraloría',
    sector: 'Gobierno',
    logo: 'contraloria.png',
    web: 'https://www.gob.pe/contraloria',
    pais: 'pe',
  },
  {
    nombre: 'Pacífico',
    sector: 'Seguros',
    logo: 'pacifico.png',
    web: 'https://www.pacifico.com.pe',
    pais: 'pe',
    via: 'Q System',
    logros: [
      'Diseño, ejecución y estimación de los planes de prueba del core asegurador de Pacífico Vida, en web, móvil Android y aplicaciones cliente-servidor.',
    ],
  },
  {
    nombre: 'Claro',
    sector: 'Telecomunicaciones',
    logo: 'claro.svg',
    web: 'https://www.claro.com.pe',
    pais: 'pe',
    via: 'Canvia',
    logros: [
      'Rediseño del proceso de calidad de software del área TMO, adaptando las metodologías a su operación real.',
      'Gobierno de los ciclos funcionales, de regresión, smoke y UAT de las entregas, dirigiendo un equipo multidisciplinario de 15 personas.',
    ],
  },
  {
    nombre: 'Starlink',
    sector: 'Telecomunicaciones',
    iso: true,
    logo: 'starlink.png',
    web: 'https://www.starlink.com',
    pais: 'mx',
  },
  {
    nombre: 'Distriluz',
    sector: 'Energía',
    iso: true,
    logo: 'distriluz.png',
    web: 'https://www.distriluz.com.pe',
    pais: 'pe',
  },
  {
    nombre: 'Starbucks',
    sector: 'Retail',
    iso: true,
    logo: 'starbucks.png',
    web: 'https://www.starbucks.com',
    pais: 'pe',
    via: 'IDM Technology',
    logros: [
      'Automatización de extremo a extremo de los flujos críticos del programa de recompensas en web, Android e iOS: OTP, beneficios, acumulación de estrellas, canje e historial transaccional.',
      'Validación de APIs REST, integraciones de backend y consistencia entre los tres canales contra los criterios de aceptación.',
    ],
  },
  {
    nombre: 'Yanbal',
    sector: 'Retail',
    iso: true,
    logo: 'yanbal.png',
    web: 'https://www.yanbal.com',
    pais: 'pe',
    via: 'Q System',
    logros: [
      'Automatización con Selenium de las funcionalidades críticas del negocio y validación del sistema core.',
    ],
  },
  {
    nombre: 'RedSalud',
    sector: 'Salud',
    iso: true,
    logo: 'redsalud.png',
    web: 'https://www.redsalud.cl',
    pais: 'cl',
    via: 'Soho Humantech',
    logros: [
      'Estrategia y automatización E2E de los flujos de agenda, disponibilidad y agendamiento médico, con Playwright y TypeScript bajo patrón Screenplay.',
      'Validación de APIs y consistencia de datos con SQL, y pruebas de carga con k6 sobre los servicios de agenda.',
      'Flujo asistido por IA para generar casos, analizar cobertura y priorizar escenarios.',
    ],
  },
  {
    nombre: 'Elipgo',
    sector: 'Tecnología',
    iso: true,
    logo: 'elipgo.png',
    web: 'https://elipgo.com',
    pais: 'mx',
    via: 'Tech Lead IA Automation',
    logros: [
      'Liderazgo técnico de la automatización de calidad de un producto de analítica de video con inteligencia artificial.',
      'Framework en Playwright con Cucumber y patrón Screenplay sobre TypeScript, con gestión de datos de prueba y tablero de resultados propio.',
    ],
  },
  {
    nombre: 'UTP',
    sector: 'Educación',
    logo: 'utp.png',
    web: 'https://www.utp.edu.pe',
    pais: 'pe',
    via: 'Senior Quality Engineer',
    logros: [
      'Calidad de UTP+Class, la plataforma de clases digitales: coordinación del equipo de QA de la tribu y optimización de la suite de automatización.',
      'Automatización de APIs con Karate y RestAssured, y de flujos web con Cypress, Selenium y TestCafe.',
    ],
  },
  {
    nombre: 'Edulogika',
    sector: 'Educación',
    logo: 'edulogica.png',
    web: 'https://www.edulogika.com',
    pais: 'pr',
    via: 'Nagnoi, LLC',
    logros: [
      'Un 70% más de cobertura automatizada con suites en Playwright y Specflow, con una caída notoria de los errores críticos que llegaban a producción.',
      'Un 40% menos de tiempo de ejecución mediante paralelización y optimización de scripts.',
    ],
  },
];


// ============================================================================
//  IA APLICADA
//
//  Tres capas distintas, y conviene no mezclarlas: usar modelos dentro del
//  ciclo de pruebas, construir herramientas propias que hagan el trabajo
//  repetitivo, y probar productos que llevan IA dentro.
// ============================================================================

export interface AplicacionIA {
  titulo: Bilingue;
  detalle: Bilingue;
  contexto: string;
  /** Clave del icono de línea con que se rotula la tarjeta. */
  icono?: string;
  /** Fase del ciclo de pruebas en la que entra. */
  etapa?: string;
  /** Fases del ciclo en las que actúa, para el mapa del diálogo. */
  fases?: string[];
  /** Modelo conceptual: qué entra, qué hace y qué sale. */
  flujo?: {
    entrada: string[];
    proceso: string[];
    salida: string[];
  };
}

/** Herramientas y agentes construidos, no solo modelos consumidos. */
export const agentesIA: AplicacionIA[] = [
  {
    titulo: { es: 'Panel de agentes para un chapter de QA', en: 'Agent console for a QA chapter' },
    detalle: { es: 'Consola web local desde la que el equipo lanza los agentes, sigue el progreso en vivo y consulta el historial, sin tocar una terminal. Los agentes comparten una sola fuente de credenciales y se interconectan entre sí.', en: 'A local web console from which the team launches the agents, follows progress live and checks the history, without touching a terminal. The agents share a single source of credentials and talk to each other.' },
    contexto: 'Sector salud',
    icono: 'panel',
    fases: ['Requisitos', 'Diseño', 'Priorización', 'Verificación', 'Defectos', 'Mantenimiento'],
    flujo: {
      entrada: ['Orden lanzada desde la consola', 'Una sola fuente de credenciales'],
      proceso: ['Arranca el agente pedido', 'Transmite el progreso en vivo', 'Archiva la corrida'],
      salida: ['Estado de cada agente', 'Historial consultable', 'Agentes encadenados entre sí'],
    },
  },
  {
    titulo: { es: 'Agente auditor de casos de prueba', en: 'Test case auditing agent' },
    detalle: { es: 'Audita la sección de validación de un documento de requerimientos, redacta los casos, los inserta en su tabla y publica el resumen en la herramienta de gestión del equipo. Lo que antes era una tarde de copiar y pegar.', en: 'It audits the validation section of a requirements document, drafts the cases, inserts them into its table and posts the summary to the team\u2019s management tool. What used to be an afternoon of copy and paste.' },
    contexto: 'Sector salud',
    icono: 'auditoria',
    fases: ['Requisitos', 'Diseño'],
    flujo: {
      entrada: ['Documento de requerimientos', 'Su sección de validación'],
      proceso: ['Audita la sección', 'Redacta los casos', 'Los inserta en su tabla'],
      salida: ['Casos ya en la tabla', 'Resumen publicado al equipo'],
    },
  },
  {
    titulo: { es: 'Agente de estado de ejecución', en: 'Execution status agent' },
    detalle: { es: 'Lee el resultado y la evidencia de cada caso ejecutado, informa el avance y mueve el tícket a certificación o a correctivo según lo encontrado.', en: 'It reads the result and the evidence of each executed case, reports progress and moves the ticket to certification or to fixing, depending on what it found.' },
    contexto: 'Sector salud',
    icono: 'ejecucion',
    fases: ['Verificación', 'Defectos'],
    flujo: {
      entrada: ['Resultado de cada caso', 'Evidencia adjunta'],
      proceso: ['Lee resultado y evidencia', 'Calcula el avance', 'Decide el destino del tícket'],
      salida: ['Informe de avance', 'Tícket en certificación o en correctivo'],
    },
  },
  {
    titulo: { es: 'Generador de casos para la herramienta de gestión', en: 'Case generator for the management tool' },
    detalle: { es: 'Convierte criterios de aceptación, historias de usuario e imágenes de flujo en casos estructurados, y los empaqueta listos para importación masiva. Versiona cada entrega por tícket y genera el diff contra la anterior, así se ve qué cambió y por qué.', en: 'It turns acceptance criteria, user stories and flow images into structured cases, packaged for bulk import. It versions each delivery by ticket and produces the diff against the previous one, so you can see what changed and why.' },
    contexto: 'Sector retail',
    icono: 'generador',
    fases: ['Diseño'],
    flujo: {
      entrada: ['Criterios de aceptación', 'Historias de usuario', 'Imágenes de flujo'],
      proceso: ['Convierte a casos estructurados', 'Versiona la entrega por tícket', 'Compara contra la anterior'],
      salida: ['Paquete para importación masiva', 'Diff de qué cambió y por qué'],
    },
  },
  {
    titulo: { es: 'Agente de análisis de historias de usuario', en: 'User story analysis agent' },
    detalle: { es: 'Lee la historia y sus criterios de aceptación, señala ambigüedades y vacíos, y propone los escenarios que faltan — antes de que alguien escriba código. Es Shift-Left hecho herramienta.', en: 'It reads the story and its acceptance criteria, flags ambiguities and gaps, and proposes the missing scenarios \u2014 before anyone writes code. Shift-Left turned into a tool.' },
    contexto: 'Producto de IA',
    icono: 'lupa',
    fases: ['Requisitos'],
    flujo: {
      entrada: ['La historia de usuario', 'Sus criterios de aceptación'],
      proceso: ['Señala ambigüedades', 'Detecta vacíos', 'Propone lo que falta'],
      salida: ['Ambigüedades y vacíos listados', 'Escenarios propuestos, antes del código'],
    },
  },
  {
    titulo: { es: 'Agente generador de datos de prueba', en: 'Test data generation agent' },
    detalle: { es: 'Produce los datos válidos, de borde y de error que cada flujo necesita, respetando las reglas del dominio. Deja de depender de un juego de datos que alguien preparó a mano hace meses.', en: 'It produces the valid, boundary and error data each flow needs, respecting the domain rules. No more depending on a dataset someone prepared by hand months ago.' },
    contexto: 'Sector salud',
    icono: 'datos',
    fases: ['Diseño'],
    flujo: {
      entrada: ['El flujo a probar', 'Las reglas del dominio'],
      proceso: ['Deriva los datos válidos', 'Deriva los de borde', 'Deriva los de error'],
      salida: ['Juego de datos por flujo', 'Sin depender de lo preparado a mano'],
    },
  },
  {
    titulo: { es: 'Agente de rendimiento con k6', en: 'Performance agent with k6' },
    detalle: { es: 'Genera los escenarios de carga a partir de los servicios a probar y analiza los resultados: dónde está el punto de quiebre, qué percentil se degrada primero y si el hallazgo es del sistema o del entorno.', en: 'It generates the load scenarios from the services under test and analyses the results: where the breaking point is, which percentile degrades first, and whether the finding belongs to the system or to the environment.' },
    contexto: 'Sector salud',
    icono: 'rendimiento',
    fases: ['Verificación'],
    flujo: {
      entrada: ['Los servicios a probar', 'Resultados de la corrida'],
      proceso: ['Genera los escenarios de carga', 'Busca el punto de quiebre', 'Compara percentiles'],
      salida: ['Escenarios k6 listos', 'Si el hallazgo es del sistema o del entorno'],
    },
  },
  {
    titulo: { es: 'Agente depurador de fallos web', en: 'Web failure debugging agent' },
    detalle: { es: 'Cuando un test se pone rojo, investiga la causa raíz: si el selector dejó de existir tras un cambio de la aplicación, si el fallo es intermitente o si es un defecto real. Ataca el mayor consumo de tiempo de cualquier suite grande.', en: 'When a test goes red, it investigates the root cause: whether the selector stopped existing after an application change, whether the failure is intermittent, or whether it is a real defect. It attacks the biggest time sink of any large suite.' },
    contexto: 'Producto de IA',
    icono: 'bug',
    fases: ['Defectos', 'Mantenimiento'],
    flujo: {
      entrada: ['Un test en rojo', 'Su traza y su evidencia'],
      proceso: ['Contrasta el selector con la app', 'Distingue intermitencia de defecto', 'Ubica la causa raíz'],
      salida: ['Causa raíz clasificada', 'El defecto real, separado del ruido'],
    },
  },
];

/** IA dentro del ciclo de pruebas, en proyectos de cliente. */
export const iaEnElCiclo: AplicacionIA[] = [
  {
    titulo: { es: 'Análisis de requerimientos', en: 'Requirements analysis' },
    detalle: { es: 'Leer un documento largo y extraer los campos, las reglas y los criterios que hay que verificar, antes de escribir un solo caso.', en: 'Reading a long document and extracting the fields, rules and criteria that need verifying, before writing a single case.' },
    contexto: 'Banca',
    etapa: 'Requisitos',
  },
  {
    titulo: { es: 'Diseño de casos y análisis de cobertura', en: 'Case design and coverage analysis' },
    detalle: { es: 'Generar escenarios a partir de los criterios de aceptación y detectar qué quedó sin cubrir, acortando el tiempo de diseño y el de mantenimiento.', en: 'Generating scenarios from the acceptance criteria and spotting what was left uncovered, shortening both design and maintenance time.' },
    contexto: 'Salud',
    etapa: 'Diseño',
  },
  {
    titulo: { es: 'Priorización basada en riesgo', en: 'Risk-based prioritisation' },
    detalle: { es: 'Decidir qué se ejecuta primero y qué se automatiza, en función del riesgo de liberación y no del orden en que llegaron los requerimientos.', en: 'Deciding what runs first and what gets automated, based on release risk rather than the order the requirements arrived in.' },
    contexto: 'Salud y fintech',
    etapa: 'Priorización',
  },
  {
    titulo: { es: 'Revisión de estructuras JSON y XML', en: 'Reviewing JSON and XML structures' },
    detalle: { es: 'Comparar el contrato del servicio legado contra el migrado y señalar dónde difieren, campo por campo, en migraciones de cientos de servicios.', en: 'Comparing the legacy service contract against the migrated one and flagging where they differ, field by field, across migrations of hundreds of services.' },
    contexto: 'Banca',
    etapa: 'Verificación',
  },
  {
    titulo: { es: 'Análisis de defectos', en: 'Defect analysis' },
    detalle: { es: 'Agrupar fallos, acelerar el diagnóstico y separar el defecto real del ruido de infraestructura.', en: 'Clustering failures, speeding up diagnosis and separating the real defect from infrastructure noise.' },
    contexto: 'Banca y fintech',
    etapa: 'Defectos',
  },
  {
    titulo: { es: 'Mantenimiento predictivo de la suite', en: 'Predictive suite maintenance' },
    detalle: { es: 'Machine learning aplicado al mantenimiento de scripts y al análisis predictivo de fallos, que redujo los falsos positivos que hacían que el equipo dejara de mirar los reportes.', en: 'Machine learning applied to script maintenance and predictive failure analysis, which cut the false positives that were making the team stop looking at the reports.' },
    contexto: 'Fintech',
    etapa: 'Mantenimiento',
  },
  {
    titulo: { es: 'Probar productos que llevan IA dentro', en: 'Testing products with AI inside' },
    detalle: { es: 'Analítica de video con inteligencia artificial: aquí la prueba no termina en que la interfaz responda — hay que verificar que el modelo detecte lo que debe y que la analítica cuadre con lo que pasó frente a la cámara.', en: 'AI-driven video analytics: here testing does not end with the interface responding \u2014 you have to verify that the model detects what it should and that the analytics match what happened in front of the camera.' },
    contexto: 'Producto propio',
    etapa: 'Caso aparte',
  },
];
