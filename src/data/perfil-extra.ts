// ============================================================================
//  DATOS DE APOYO DE LA PÁGINA DE TRAYECTORIA
//
//  Todo sale del CV (Agente_Searchs_Work/datos/cv/cv-datos.json). Ninguna
//  cifra de aquí se inventa: cada una se puede sustentar en una entrevista.
// ============================================================================

/** Cifras del encabezado. Pocas y verificables. */
export const cifras = [
  { valor: '10', etiqueta: 'años en calidad de software' },
  { valor: '15', etiqueta: 'ingenieros de calidad liderados' },
  { valor: '13', etiqueta: 'etapas profesionales' },
  { valor: '4', etiqueta: 'sectores: banca, fintech, salud y educación' },
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
      'Diseño de escenarios, análisis de cobertura y revisión de estructuras — siempre bajo revisión humana.',
    items: ['GPT', 'Claude', 'Gemini', 'Copilot', 'Diseño de casos', 'Análisis de defectos'],
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

/** Los resultados que más peso tienen, con su contexto. */
export const logrosDestacados = [
  {
    cifra: '−70%',
    titulo: 'Tiempo de validación por release',
    detalle:
      'Ejecución paralela y distribuida en contenedores Docker sobre Jenkins y GitLab CI, en una fintech.',
  },
  {
    cifra: '+70%',
    titulo: 'Cobertura automatizada',
    detalle:
      'Suites en Playwright y Specflow que redujeron de forma notoria los errores críticos que llegaban a producción.',
  },
  {
    cifra: '−40%',
    titulo: 'Tiempo de ejecución de la suite',
    detalle: 'Paralelización y optimización de scripts, sin perder cobertura.',
  },
  {
    cifra: '15',
    titulo: 'Ingenieros coordinados en el BCP',
    detalle:
      'Chapter de calidad al servicio de varias tribus, con estándares comunes y un programa de mentoría propio.',
  },
];

/** Los clientes finales donde se hizo el trabajo. Los logos ya están en public/logos/. */
export const clientes = [
  { nombre: 'Interbank', logo: 'interbank.png' },
  { nombre: 'BCP', logo: null },
  { nombre: 'BBVA', logo: 'bbva.png' },
  { nombre: 'Starbucks', logo: 'starbucks.png' },
  { nombre: 'RedSalud', logo: 'redsalud.png' },
  { nombre: 'Claro', logo: 'claro.svg' },
  { nombre: 'Yanbal', logo: 'yanbal.png' },
  { nombre: 'Pacífico Seguros', logo: 'pacifico.png' },
  { nombre: 'Edulogica', logo: 'edulogica.png' },
  { nombre: 'UTP', logo: null },
];
