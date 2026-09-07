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
    etiqueta: 'años en calidad de software',
    detalle: 'De programador Java a líder de práctica',
    icono: 'reloj',
  },
  {
    valor: '8',
    etiqueta: 'agentes de IA construidos',
    detalle: 'En uso por equipos, no demos',
    icono: 'chip',
  },
  {
    valor: '−70%',
    etiqueta: 'tiempo de validación por release',
    detalle: 'Ejecución paralela en contenedores',
    icono: 'grafico',
  },
  {
    valor: '4',
    etiqueta: 'países donde he trabajado',
    detalle: 'Perú, México, Chile y Puerto Rico',
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
    area: 'Automatización',
    detalle:
      'Frameworks pensados para que los mantenga otro equipo, no para lucir en una demo.',
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
    area: 'APIs e integración',
    detalle:
      'Validar el contrato, no solo el código 200: tipos, campos opcionales, errores e integridad de datos.',
    items: ['RestAssured', 'Karate', 'Postman', 'REST', 'SOAP', 'Contract testing', 'SQL'],
  },
  {
    area: 'Rendimiento y seguridad',
    detalle: 'Conocer el punto de quiebre antes que los usuarios, y dentro del pipeline.',
    items: ['k6', 'JMeter', 'Gatling', 'LoadRunner', 'OWASP ZAP', 'SonarQube'],
  },
  {
    area: 'CI/CD y plataformas',
    detalle:
      'Base de DevOps real: pipelines, contenedores e infraestructura como código, no solo consumirlos.',
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
    area: 'IA aplicada al testing',
    detalle:
      'Desde asistir el diseño de pruebas hasta construir agentes que hacen el trabajo repetitivo del chapter. Siempre bajo revisión humana.',
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
    area: 'Liderazgo y estrategia',
    detalle:
      'Lo que decide si una práctica de calidad sobrevive al segundo trimestre.',
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
    detalle: 'Empecé programando; por eso discuto el código con desarrollo de igual a igual.',
    items: ['TypeScript', 'JavaScript', 'Java', 'Python', 'C#'],
  },
  {
    area: 'Metodologías',
    detalle: 'Marcos de trabajo con los que he entregado, no solo estudiado.',
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
  titulo: string;
  detalle: string;
  sector: string;
  icono: string;
  barra?: { antes: number; despues: number; etiquetaAntes: string; etiquetaDespues: string };
  /** Alternativa a la barra cuando la cifra es un recuento de personas. */
  puntos?: { cantidad: number; etiqueta: string };
}

export const logrosDestacados: LogroDestacado[] = [
  {
    cifra: '−70%',
    titulo: 'Tiempo de validación por release',
    detalle:
      'Ejecución paralela y distribuida en contenedores Docker sobre Jenkins y GitLab CI.',
    sector: 'Fintech',
    icono: 'M12 7v5l3 2 M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    barra: { antes: 100, despues: 30, etiquetaAntes: 'Antes', etiquetaDespues: 'Después' },
  },
  {
    cifra: '+70%',
    titulo: 'Cobertura automatizada',
    detalle:
      'Suites en Playwright y Specflow que redujeron de forma notoria los errores críticos que llegaban a producción.',
    sector: 'Datos y analítica',
    icono: 'M3 17l6-6 4 4 8-8 M21 7v5h-5',
    barra: { antes: 30, despues: 100, etiquetaAntes: 'Al llegar', etiquetaDespues: 'Al salir' },
  },
  {
    cifra: '−40%',
    titulo: 'Tiempo de ejecución de la suite',
    detalle: 'Paralelización y optimización de scripts, sin perder cobertura.',
    sector: 'Datos y analítica',
    icono: 'M13 2 3 14h9l-1 8 10-12h-9l1-8Z',
    barra: { antes: 100, despues: 60, etiquetaAntes: 'Antes', etiquetaDespues: 'Después' },
  },
  {
    cifra: '15',
    titulo: 'Ingenieros de calidad coordinados',
    detalle:
      'Chapter al servicio de varias tribus del banco más grande del Perú, con estándares comunes y un programa de mentoría propio.',
    sector: 'Banca',
    icono: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    puntos: { cantidad: 15, etiqueta: 'Un chapter, varias tribus' },
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
  titulo: string;
  detalle: string;
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
    titulo: 'Panel de agentes para un chapter de QA',
    detalle:
      'Consola web local desde la que el equipo lanza los agentes, sigue el progreso en vivo y consulta el historial, sin tocar una terminal. Los agentes comparten una sola fuente de credenciales y se interconectan entre sí.',
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
    titulo: 'Agente auditor de casos de prueba',
    detalle:
      'Audita la sección de validación de un documento de requerimientos, redacta los casos, los inserta en su tabla y publica el resumen en la herramienta de gestión del equipo. Lo que antes era una tarde de copiar y pegar.',
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
    titulo: 'Agente de estado de ejecución',
    detalle:
      'Lee el resultado y la evidencia de cada caso ejecutado, informa el avance y mueve el tícket a certificación o a correctivo según lo encontrado.',
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
    titulo: 'Generador de casos para la herramienta de gestión',
    detalle:
      'Convierte criterios de aceptación, historias de usuario e imágenes de flujo en casos estructurados, y los empaqueta listos para importación masiva. Versiona cada entrega por tícket y genera el diff contra la anterior, así se ve qué cambió y por qué.',
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
    titulo: 'Agente de análisis de historias de usuario',
    detalle:
      'Lee la historia y sus criterios de aceptación, señala ambigüedades y vacíos, y propone los escenarios que faltan — antes de que alguien escriba código. Es Shift-Left hecho herramienta.',
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
    titulo: 'Agente generador de datos de prueba',
    detalle:
      'Produce los datos válidos, de borde y de error que cada flujo necesita, respetando las reglas del dominio. Deja de depender de un juego de datos que alguien preparó a mano hace meses.',
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
    titulo: 'Agente de rendimiento con k6',
    detalle:
      'Genera los escenarios de carga a partir de los servicios a probar y analiza los resultados: dónde está el punto de quiebre, qué percentil se degrada primero y si el hallazgo es del sistema o del entorno.',
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
    titulo: 'Agente depurador de fallos web',
    detalle:
      'Cuando un test se pone rojo, investiga la causa raíz: si el selector dejó de existir tras un cambio de la aplicación, si el fallo es intermitente o si es un defecto real. Ataca el mayor consumo de tiempo de cualquier suite grande.',
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
    titulo: 'Análisis de requerimientos',
    detalle:
      'Leer un documento largo y extraer los campos, las reglas y los criterios que hay que verificar, antes de escribir un solo caso.',
    contexto: 'Banca',
    etapa: 'Requisitos',
  },
  {
    titulo: 'Diseño de casos y análisis de cobertura',
    detalle:
      'Generar escenarios a partir de los criterios de aceptación y detectar qué quedó sin cubrir, acortando el tiempo de diseño y el de mantenimiento.',
    contexto: 'Salud',
    etapa: 'Diseño',
  },
  {
    titulo: 'Priorización basada en riesgo',
    detalle:
      'Decidir qué se ejecuta primero y qué se automatiza, en función del riesgo de liberación y no del orden en que llegaron los requerimientos.',
    contexto: 'Salud y fintech',
    etapa: 'Priorización',
  },
  {
    titulo: 'Revisión de estructuras JSON y XML',
    detalle:
      'Comparar el contrato del servicio legado contra el migrado y señalar dónde difieren, campo por campo, en migraciones de cientos de servicios.',
    contexto: 'Banca',
    etapa: 'Verificación',
  },
  {
    titulo: 'Análisis de defectos',
    detalle:
      'Agrupar fallos, acelerar el diagnóstico y separar el defecto real del ruido de infraestructura.',
    contexto: 'Banca y fintech',
    etapa: 'Defectos',
  },
  {
    titulo: 'Mantenimiento predictivo de la suite',
    detalle:
      'Machine learning aplicado al mantenimiento de scripts y al análisis predictivo de fallos, que redujo los falsos positivos que hacían que el equipo dejara de mirar los reportes.',
    contexto: 'Fintech',
    etapa: 'Mantenimiento',
  },
  {
    titulo: 'Probar productos que llevan IA dentro',
    detalle:
      'Analítica de video con inteligencia artificial: aquí la prueba no termina en que la interfaz responda — hay que verificar que el modelo detecte lo que debe y que la analítica cuadre con lo que pasó frente a la cámara.',
    contexto: 'Producto propio',
    etapa: 'Caso aparte',
  },
];
