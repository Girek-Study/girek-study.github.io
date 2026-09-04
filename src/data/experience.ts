// ============================================================================
//  TRAYECTORIA PROFESIONAL — Datos reales. De más reciente a más antigua.
// ============================================================================

export interface Experiencia {
  empresa: string;
  cargo: string;
  periodo: string;
  ubicacion?: string;
  descripcion: string;
  logros: string[];
  stack?: string[];
}

export const experiencias: Experiencia[] = [
  {
    empresa: 'Canvia — cliente Interbank',
    cargo: 'Quality Engineering & API Testing',
    periodo: 'jun. 2026 — actualidad',
    ubicacion: 'Lima, Perú · Remoto',
    descripcion:
      'Certificación de calidad de los servicios críticos del banco en su modernización de XML a JSON.',
    logros: [
      'Valido contratos, mapeo de campos, reglas de negocio e integridad de datos entre el servicio legacy y el migrado.',
      'Diseño y ejecuto pruebas funcionales, de integración, regresión y E2E sobre APIs y backend, priorizando el riesgo de liberación.',
      'Gestiono defectos con evidencia técnica —request/response, esperado contra obtenido— y coordino la resolución con Desarrollo, Arquitectura y Negocio.',
      'Aplico IA y LLMs al análisis de requerimientos y a la revisión de estructuras JSON y XML, siempre bajo revisión humana.',
    ],
    stack: ['APIs REST y SOAP', 'JSON', 'XML', 'SQL', 'Postman', 'Azure DevOps'],
  },
  {
    empresa: 'Soho — cliente RedSalud',
    cargo: 'AI Quality Engineering Specialist',
    periodo: 'jun. 2025 — jun. 2026',
    ubicacion: 'Remoto · Chile',
    descripcion:
      'Aseguramiento de los procesos críticos de agenda y agendamiento médico de una de las mayores redes de salud privada de Chile.',
    logros: [
      'Diseñé y ejecuté la estrategia de pruebas E2E de los flujos de agendamiento, del criterio de aceptación a la evidencia.',
      'Automaticé con Playwright y TypeScript bajo patrón Screenplay, priorizando estabilidad y mantenibilidad de la suite.',
      'Validé APIs y consistencia de datos con SQL, y ejecuté pruebas de carga con k6 sobre los servicios de agenda.',
      'Incorporé un flujo asistido por IA para generar casos de prueba y priorizar escenarios, reduciendo el tiempo de diseño y de mantenimiento.',
    ],
    stack: ['Playwright', 'TypeScript', 'Cucumber', 'Screenplay', 'k6', 'SQL', 'Azure DevOps'],
  },
  {
    empresa: 'Prestamype',
    cargo: 'Head Automation QA · QE Lead',
    periodo: 'jun. 2024 — jun. 2025',
    ubicacion: 'Lima, Perú',
    descripcion:
      'Dirección de la práctica de automatización de calidad para los productos web y móviles de una fintech de financiamiento con garantía hipotecaria.',
    logros: [
      'Dirigí un equipo de 6 ingenieros de calidad, definiendo la estrategia, los estándares y el plan de crecimiento técnico de cada uno.',
      'Diseñé el framework de automatización en Playwright con Page Object Model, Data-Driven y BDD: +50% de eficiencia y cobertura.',
      'Reduje 70% el tiempo de validación por release con ejecución paralela en contenedores Docker sobre Jenkins y GitLab CI.',
      'Implementé dashboards de cobertura, estabilidad, flakiness y readiness para decidir con datos qué automatizar y qué desechar.',
    ],
    stack: ['Playwright', 'TypeScript', 'Jenkins', 'GitLab CI', 'Docker', 'AWS', 'Azure'],
  },
  {
    empresa: 'Nagnoi, LLC',
    cargo: 'Automation Specialist QE',
    periodo: 'nov. 2023 — jun. 2024',
    ubicacion: 'Puerto Rico · Remoto, en inglés',
    descripcion:
      'Automatización de pruebas sobre los productos de los clientes finales de una consultora de datos y analítica.',
    logros: [
      'Aumenté 70% la cobertura automatizada con suites en Playwright y Specflow, reduciendo los errores críticos que llegaban a producción.',
      'Reduje 40% los tiempos de ejecución mediante paralelización y optimización de scripts.',
      'Automaticé pruebas de APIs REST con RestAssured, Karate y Postman, incluyendo validación de contratos.',
      'Incorporé análisis de seguridad con OWASP ZAP dentro del ciclo de pruebas.',
    ],
    stack: ['Playwright', 'Specflow', 'Karate', 'RestAssured', 'JMeter', 'OWASP ZAP', 'Azure DevOps'],
  },
  {
    empresa: 'Banco de Crédito BCP',
    cargo: 'Chapter Lead Quality Engineer',
    periodo: 'oct. 2022 — ago. 2023',
    ubicacion: 'Lima, Perú',
    descripcion:
      'Liderazgo del chapter de calidad al servicio de varias tribus de producto digital del banco más grande del Perú.',
    logros: [
      'Coordiné a 15 ingenieros de calidad en múltiples proyectos, definiendo estándares comunes de framework, nomenclatura y reportería.',
      'Aumenté 20% la cobertura automatizada con frameworks en Selenium, JUnit, Appium y SerenityBDD/Screenplay.',
      'Integré pruebas de rendimiento y seguridad dentro de los pipelines de CI/CD.',
      'Diseñé el programa de mentoría del chapter para ingenieros junior, en lo técnico y en lo profesional.',
    ],
    stack: ['Selenium', 'JUnit', 'Appium', 'SerenityBDD', 'Jenkins', 'AKS', 'JIRA', 'Xray'],
  },
  {
    empresa: 'UTP — Universidad Tecnológica del Perú',
    cargo: 'Senior Quality Engineer',
    periodo: 'feb. 2022 — sept. 2022',
    ubicacion: 'Lima, Perú',
    descripcion: 'Calidad de UTP+Class, la plataforma de clases digitales de la universidad.',
    logros: [
      'Lideré y coordiné al equipo de QA de la tribu, promoviendo buenas prácticas de testing.',
      'Gestioné y optimicé la suite de automatización, asegurando estabilidad y escalabilidad en los pipelines.',
      'Automaticé pruebas de APIs con Karate y RestAssured, con reportes integrados para el equipo técnico.',
      'Implementé reportes gerenciales en Qmetry y JIRA para el seguimiento de los OKR de calidad.',
    ],
    stack: ['Selenium', 'Cypress', 'TestCafe', 'Karate', 'RestAssured', 'JMeter', 'Qmetry'],
  },
  {
    empresa: 'Canvia',
    cargo: 'Technical Lead DevTestOps',
    periodo: 'nov. 2018 — mar. 2022',
    ubicacion: 'Lima, Perú',
    descripcion:
      'Roles sucesivos de DevOps Architect, Lead Technical Specialist y Presales Consultant en un integrador de tecnología para banca, telecomunicaciones y sector público.',
    logros: [
      'Diseñé soluciones DevOps para entornos cloud e híbridos e implementé pipelines de CI/CD de extremo a extremo.',
      'Dirigí un equipo multidisciplinario de 15 personas —arquitectos, desarrollo, QA y UX— en la transformación del proceso de calidad del área TMO de Claro.',
      'Construí frameworks de automatización funcional, de API y de rendimiento integrados a los pipelines de entrega.',
      'En Interbank Medios de Pago migré pipelines y releases a Jenkins, integré el simulador VISA y capacité a un squad de 35 personas.',
    ],
    stack: ['Jenkins', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'],
  },
  {
    empresa: 'Delaware Perú',
    cargo: 'Consultor de Calidad de Software',
    periodo: 'abr. 2017 — nov. 2018',
    ubicacion: 'Lima, Perú',
    descripcion:
      'Servicios de QA y DevOps para clientes del sector financiero y público, entre ellos Interbank, en una consultora belga de tecnología empresarial.',
    logros: [
      'Definí y ejecuté estrategias de aseguramiento de calidad en proyectos de implantación compleja.',
      'Diseñé planes de prueba funcionales, de regresión, de rendimiento e integración continua de extremo a extremo.',
      'Coordiné y mentoricé equipos de QA multidisciplinarios.',
      'Elaboré métricas y reportes gerenciales de calidad para sustentar decisiones de release.',
    ],
    stack: ['Selenium', 'Cypress', 'TestCafe', 'JMeter', 'Gatling', 'LoadRunner', 'TestRail'],
  },
  {
    empresa: 'Q System',
    cargo: 'Analista QA',
    periodo: 'dic. 2015 — mar. 2017',
    ubicacion: 'Lima, Perú',
    descripcion: 'Consultoría de testing en tres clientes: Yanbal, Pacífico Seguros e Interbank.',
    logros: [
      'Automaticé con Selenium las funcionalidades críticas del negocio y validé el sistema core de Yanbal.',
      'Diseñé, ejecuté y estimé planes de prueba para el core asegurador de Pacífico Vida, en web, Android y cliente-servidor.',
      'Ejecuté pruebas funcionales sobre cajeros automáticos de Interbank, verificando sincronización y seguridad de la información según la normativa del sector.',
    ],
    stack: ['Selenium', 'JIRA', 'Pruebas móviles iOS y Android'],
  },
];

export const certificaciones: { nombre: string; emisor: string; anio?: string }[] = [
  { nombre: 'ISTQB® Certified Tester — Foundation Level (CTFL)', emisor: 'iSQI Group' },
  { nombre: 'Holistic Testing: Strategies for Agile Teams', emisor: 'Agile Testing Fellowship' },
  { nombre: 'Scrum Fundamentals Certified (SFC)', emisor: 'VMEdu' },
];

export const educacion: { titulo: string; institucion: string; periodo?: string }[] = [
  {
    titulo: 'Ingeniería de Sistemas',
    institucion: 'Universidad César Vallejo',
    periodo: '2012 — 2018',
  },
];

export const idiomas: { nombre: string; nivel: string }[] = [
  { nombre: 'Español', nivel: 'Nativo' },
  {
    nombre: 'Inglés',
    nivel: 'Profesional — experiencia trabajando en remoto para Puerto Rico y Chile',
  },
];
