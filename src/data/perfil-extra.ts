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
export interface Cliente {
  nombre: string;
  sector: string;
  logo: string | null;
}

export const clientes: Cliente[] = [
  { nombre: 'Interbank', sector: 'Banca', logo: 'interbank.png' },
  { nombre: 'BCP', sector: 'Banca', logo: 'bcp.png' },
  { nombre: 'BBVA', sector: 'Banca', logo: 'bbva.png' },
  { nombre: 'Scotiabank', sector: 'Banca', logo: 'scotiabank.png' },
  { nombre: 'Citibank', sector: 'Banca', logo: 'citibank.png' },
  { nombre: 'MiBanco', sector: 'Banca', logo: 'mibanco.png' },
  { nombre: 'Pacífico Seguros', sector: 'Seguros', logo: 'pacifico.png' },
  { nombre: 'SUNAT', sector: 'Gobierno', logo: 'sunat.png' },
  { nombre: 'SMV', sector: 'Gobierno', logo: 'smv.png' },
  { nombre: 'Contraloría', sector: 'Gobierno', logo: 'contraloria.png' },
  { nombre: 'Claro', sector: 'Telecomunicaciones', logo: 'claro.svg' },
  { nombre: 'Starlink', sector: 'Telecomunicaciones', logo: 'starlink.png' },
  { nombre: 'Distriluz', sector: 'Energía', logo: 'distriluz.png' },
  { nombre: 'Starbucks', sector: 'Retail', logo: 'starbucks.png' },
  { nombre: 'Yanbal', sector: 'Retail', logo: 'yanbal.png' },
  { nombre: 'RedSalud', sector: 'Salud', logo: 'redsalud.png' },
  { nombre: 'UTP', sector: 'Educación', logo: 'utp.png' },
  { nombre: 'Edulogika', sector: 'Educación', logo: 'edulogica.png' },
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
}

/** Herramientas y agentes construidos, no solo modelos consumidos. */
export const agentesIA: AplicacionIA[] = [
  {
    titulo: 'Panel de agentes para un chapter de QA',
    detalle:
      'Consola web local desde la que el equipo lanza los agentes, sigue el progreso en vivo y consulta el historial, sin tocar una terminal. Los agentes comparten una sola fuente de credenciales y se interconectan entre sí.',
    contexto: 'Sector salud',
  },
  {
    titulo: 'Agente auditor de casos de prueba',
    detalle:
      'Audita la sección de validación de un documento de requerimientos, redacta los casos, los inserta en su tabla y publica el resumen en la herramienta de gestión del equipo. Lo que antes era una tarde de copiar y pegar.',
    contexto: 'Sector salud',
  },
  {
    titulo: 'Agente de estado de ejecución',
    detalle:
      'Lee el resultado y la evidencia de cada caso ejecutado, informa el avance y mueve el tícket a certificación o a correctivo según lo encontrado.',
    contexto: 'Sector salud',
  },
  {
    titulo: 'Generador de casos para la herramienta de gestión',
    detalle:
      'Convierte criterios de aceptación, historias de usuario e imágenes de flujo en casos estructurados, y los empaqueta listos para importación masiva. Versiona cada entrega por tícket y genera el diff contra la anterior, así se ve qué cambió y por qué.',
    contexto: 'Sector retail',
  },
  {
    titulo: 'Agente de análisis de historias de usuario',
    detalle:
      'Lee la historia y sus criterios de aceptación, señala ambigüedades y vacíos, y propone los escenarios que faltan — antes de que alguien escriba código. Es Shift-Left hecho herramienta.',
    contexto: 'Producto de IA',
  },
  {
    titulo: 'Agente generador de datos de prueba',
    detalle:
      'Produce los datos válidos, de borde y de error que cada flujo necesita, respetando las reglas del dominio. Deja de depender de un juego de datos que alguien preparó a mano hace meses.',
    contexto: 'Sector salud',
  },
  {
    titulo: 'Agente de rendimiento con k6',
    detalle:
      'Genera los escenarios de carga a partir de los servicios a probar y analiza los resultados: dónde está el punto de quiebre, qué percentil se degrada primero y si el hallazgo es del sistema o del entorno.',
    contexto: 'Sector salud',
  },
  {
    titulo: 'Agente depurador de fallos web',
    detalle:
      'Cuando un test se pone rojo, investiga la causa raíz: si el selector dejó de existir tras un cambio de la aplicación, si el fallo es intermitente o si es un defecto real. Ataca el mayor consumo de tiempo de cualquier suite grande.',
    contexto: 'Producto de IA',
  },
];

/** IA dentro del ciclo de pruebas, en proyectos de cliente. */
export const iaEnElCiclo: AplicacionIA[] = [
  {
    titulo: 'Análisis de requerimientos',
    detalle:
      'Leer un documento largo y extraer los campos, las reglas y los criterios que hay que verificar, antes de escribir un solo caso.',
    contexto: 'Banca',
  },
  {
    titulo: 'Revisión de estructuras JSON y XML',
    detalle:
      'Comparar el contrato del servicio legado contra el migrado y señalar dónde difieren, campo por campo, en migraciones de cientos de servicios.',
    contexto: 'Banca',
  },
  {
    titulo: 'Diseño de casos y análisis de cobertura',
    detalle:
      'Generar escenarios a partir de los criterios de aceptación y detectar qué quedó sin cubrir, acortando el tiempo de diseño y el de mantenimiento.',
    contexto: 'Salud',
  },
  {
    titulo: 'Priorización basada en riesgo',
    detalle:
      'Decidir qué se ejecuta primero y qué se automatiza, en función del riesgo de liberación y no del orden en que llegaron los requerimientos.',
    contexto: 'Salud y fintech',
  },
  {
    titulo: 'Mantenimiento predictivo de la suite',
    detalle:
      'Machine learning aplicado al mantenimiento de scripts y al análisis predictivo de fallos, que redujo los falsos positivos que hacían que el equipo dejara de mirar los reportes.',
    contexto: 'Fintech',
  },
  {
    titulo: 'Análisis de defectos',
    detalle:
      'Agrupar fallos, acelerar el diagnóstico y separar el defecto real del ruido de infraestructura.',
    contexto: 'Banca y fintech',
  },
  {
    titulo: 'Probar productos que llevan IA dentro',
    detalle:
      'Analítica de video con inteligencia artificial: aquí la prueba no termina en que la interfaz responda — hay que verificar que el modelo detecte lo que debe y que la analítica cuadre con lo que pasó frente a la cámara.',
    contexto: 'Producto propio',
  },
];
