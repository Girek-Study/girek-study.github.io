// ============================================================================
//  TRAYECTORIA PROFESIONAL — Datos reales. De más reciente a más antigua.
//
//  Sin fechas por decisión propia: el orden cronológico se sostiene solo.
//  Las fechas exactas viven en el CV
//  (Agente_Searchs_Work/datos/cv/cv-datos.json) por si hay que reponerlas.
//
//  `logo` y `clientes[].logo` son nombres de archivo en public/logos/, con
//  extensión. Si vale null, la tarjeta dibuja un monograma con la inicial.
//  Los archivos se descargan con: node scripts/bajar-activos.js
// ============================================================================

export type CodigoPais = 'pe' | 'mx' | 'cl' | 'pr';

export interface Cliente {
  nombre: string;
  logo: string | null;
}

export interface Experiencia {
  empresa: string;
  cargo: string;
  logo: string | null;
  web?: string;
  pais: CodigoPais;
  paisNombre: string;
  modalidad?: string;
  clientes?: Cliente[];
  /** Dos o tres frases: qué era la empresa, qué se me confió y qué estaba en juego. */
  descripcion: string;
  logros: string[];
  stack?: string[];
}

export const experiencias: Experiencia[] = [
  {
    empresa: 'Elipgo Technology',
    cargo: 'Tech Lead IA Automation',
    logo: 'elipgo.png',
    web: 'https://elipgo.com',
    pais: 'mx',
    paisNombre: 'México',
    modalidad: 'Remoto',
    descripcion:
      'Elipgo desarrolla un producto de analítica de video: detección y análisis sobre cámaras con inteligencia artificial. Lidero técnicamente la automatización de calidad de ese producto, un dominio donde la prueba no se limita a que la interfaz responda —hay que verificar que el modelo detecte lo que debe, que los eventos se registren y que la analítica cuadre con lo que ocurrió frente a la cámara.',
    logros: [
      'Lidero la estrategia de automatización y las decisiones de arquitectura de la suite, definiendo qué se automatiza, en qué nivel y con qué criterio de valor.',
      'Diseñé el framework en Playwright con Cucumber y patrón Screenplay sobre TypeScript, separando intención de negocio, interacción y localizadores para que la suite siga siendo mantenible a medida que el producto crece.',
      'Monté la gestión de datos de prueba y la reportería propia, con un tablero de resultados que el equipo consulta después de cada ejecución.',
      'Aplico IA al diseño y al análisis de escenarios, con una regla fija: ninguna salida del modelo se convierte en caso ejecutable sin revisión humana.',
    ],
    stack: ['Playwright', 'TypeScript', 'Cucumber', 'Screenplay', 'IA aplicada'],
  },
  {
    empresa: 'Canvia',
    cargo: 'Quality Engineering & API Testing',
    logo: 'canvia.svg',
    web: 'https://canvia.com',
    pais: 'pe',
    paisNombre: 'Perú',
    modalidad: 'Remoto',
    clientes: [{ nombre: 'Interbank', logo: 'interbank.png' }],
    descripcion:
      'Certifico la calidad de los servicios críticos de Interbank durante su modernización de XML a JSON. Una migración de este tipo no cambia funcionalidad: cambia el contrato. El riesgo no está en lo que se ve, sino en un campo que cambió de tipo, un opcional que dejó de serlo o un error que ahora se devuelve distinto — y todo eso llega a producción sin que la interfaz muestre nada raro.',
    logros: [
      'Valido contratos, mapeo de campos, tipos, reglas de negocio, manejo de errores e integridad de datos entre el servicio legacy y el migrado, comparando ambos respuesta contra respuesta.',
      'Diseño y ejecuto pruebas funcionales, de integración, regresión y E2E sobre APIs y backend, priorizando por riesgo de liberación y no por orden de llegada.',
      'Gestiono los defectos con evidencia técnica —request, response, esperado contra obtenido— para que la discusión sea sobre el dato y no sobre percepciones.',
      'Coordino el análisis y la trazabilidad de la certificación con Desarrollo, Arquitectura, Negocio y QA.',
      'Aplico IA y LLMs al análisis de requerimientos y a la revisión de estructuras JSON y XML, bajo revisión humana.',
    ],
    stack: ['APIs REST y SOAP', 'JSON', 'XML', 'SQL', 'Postman', 'Azure DevOps'],
  },
  {
    empresa: 'Soho Humantech',
    cargo: 'AI Quality Engineering Specialist',
    logo: 'soho.svg',
    web: 'https://soho.cl',
    pais: 'cl',
    paisNombre: 'Chile',
    modalidad: 'Remoto',
    clientes: [{ nombre: 'RedSalud', logo: 'redsalud.png' }],
    descripcion:
      'Soho lleva las iniciativas digitales de RedSalud, una de las mayores redes de salud privada de Chile. Aseguré los procesos de agenda, disponibilidad y agendamiento médico: el flujo donde un error no se traduce en una pantalla fea sino en un paciente que no consigue hora o en una que se reserva dos veces.',
    logros: [
      'Diseñé y ejecuté la estrategia de pruebas E2E de los flujos críticos de agenda y agendamiento, del criterio de aceptación hasta la evidencia.',
      'Automaticé con Playwright y TypeScript bajo patrón Screenplay, priorizando cobertura, estabilidad y mantenibilidad por encima del número de casos.',
      'Validé APIs y consistencia de datos con SQL, y ejecuté pruebas de carga con k6 sobre los servicios de agenda para conocer su punto de quiebre antes que los usuarios.',
      'Construí escenarios BDD en Gherkin y documenté criterios de aceptación, garantizando trazabilidad entre requerimiento, ejecución y evidencia.',
      'Incorporé un flujo asistido por IA para generar casos, analizar cobertura y priorizar escenarios, acortando el tiempo de diseño y el de mantenimiento.',
      'Integré la ejecución a los pipelines de Azure DevOps para tener señal de calidad en cada build.',
    ],
    stack: ['Playwright', 'TypeScript', 'Cucumber', 'Screenplay', 'k6', 'SQL', 'Azure DevOps'],
  },
  {
    empresa: 'IDM Technology',
    cargo: 'SDET — Starbucks Rewards Platform',
    logo: null,
    web: 'https://idmtechnology.com',
    pais: 'pe',
    paisNombre: 'Perú',
    modalidad: 'Híbrido · proyecto temporal',
    clientes: [{ nombre: 'Starbucks', logo: 'starbucks.png' }],
    descripcion:
      'Calidad del programa de recompensas de Starbucks en web, Android e iOS. El reto real no era automatizar tres plataformas, sino garantizar que las tres contaran lo mismo: una estrella acumulada en la app tenía que reflejarse igual en la web y en el historial transaccional.',
    logros: [
      'Automaticé de extremo a extremo los flujos críticos del programa: OTP, beneficios, acumulación de estrellas, canje de rewards e historial transaccional.',
      'Validé APIs REST, integraciones de backend y la consistencia multicanal contra los criterios de aceptación y los diseños del equipo de producto.',
      'Fortalecí el framework, la regresión y el release readiness con evidencia trazable y análisis de defectos.',
      'Trabajé de cerca con Producto, Desarrollo y Diseño para que la testabilidad entrara en la conversación antes de escribir el código.',
    ],
    stack: ['Web', 'Android', 'iOS', 'API Testing', 'Regresión'],
  },
  {
    empresa: 'Prestamype',
    cargo: 'Head Automation QA · QE Lead',
    logo: 'prestamype.svg',
    web: 'https://prestamype.com',
    pais: 'pe',
    paisNombre: 'Perú',
    descripcion:
      'Fintech de financiamiento con garantía hipotecaria y cambio de divisas. Dirigí la práctica de automatización de calidad de sus productos web y móviles: no solo construir la suite, sino formar al equipo que la iba a sostener cuando yo no estuviera.',
    logros: [
      'Dirigí un equipo de 6 ingenieros de calidad, definiendo estrategia, estándares, ownership y el plan de crecimiento técnico de cada uno.',
      'Diseñé el framework de automatización en Playwright con Page Object Model, Data-Driven y BDD, que elevó 50% la eficiencia y la cobertura.',
      'Reduje 70% el tiempo de validación por release con ejecución paralela y distribuida en contenedores Docker sobre Jenkins y GitLab CI.',
      'Implementé dashboards de cobertura, estabilidad, flakiness y readiness para decidir con datos qué automatizar y —lo más difícil— qué desechar.',
      'Incorporé IA y machine learning al mantenimiento de scripts, al análisis predictivo de fallos y a la priorización de pruebas, reduciendo los falsos positivos que hacían que el equipo dejara de mirar los reportes.',
      'Impulsé Shift-Left con desarrollo y producto, definiendo criterios de aceptación antes de escribir código.',
    ],
    stack: ['Playwright', 'TypeScript', 'Jenkins', 'GitLab CI', 'Docker', 'AWS', 'Azure'],
  },
  {
    empresa: 'Nagnoi, LLC',
    cargo: 'Automation Specialist QE',
    logo: 'nagnoi.png',
    web: 'https://nagnoi.com',
    pais: 'pr',
    paisNombre: 'Puerto Rico',
    modalidad: 'Remoto, en inglés',
    clientes: [{ nombre: 'Edulogica', logo: 'edulogica.png' }],
    descripcion:
      'Consultora de datos y analítica con sede en Puerto Rico. Trabajé en remoto y en inglés sobre los productos de sus clientes finales, integrado a sus equipos y a sus ceremonias.',
    logros: [
      'Aumenté 70% la cobertura automatizada desarrollando y manteniendo suites en Playwright y Specflow, con una caída notoria de los errores críticos que llegaban a producción.',
      'Reduje 40% los tiempos de ejecución mediante paralelización y optimización de scripts.',
      'Automaticé pruebas de APIs REST con RestAssured, Karate y Postman, incluyendo validación de contratos y rendimiento de los servicios de backend.',
      'Incorporé análisis de seguridad con OWASP ZAP dentro del ciclo de pruebas, en vez de dejarlo como una auditoría al final.',
      'Participé en refinamientos y ceremonias Scrum para asegurar testabilidad y criterios de aceptación desde el inicio.',
    ],
    stack: ['Playwright', 'Specflow', 'Karate', 'RestAssured', 'JMeter', 'OWASP ZAP'],
  },
  {
    empresa: 'Banco de Crédito BCP',
    cargo: 'Chapter Lead Quality Engineer',
    logo: null,
    web: 'https://www.viabcp.com',
    pais: 'pe',
    paisNombre: 'Perú',
    descripcion:
      'El banco más grande del Perú. Lideré el chapter de calidad que daba servicio a varias tribus de producto digital: un rol donde el trabajo no es escribir pruebas sino conseguir que quince personas, repartidas en equipos distintos, trabajen con el mismo criterio.',
    logros: [
      'Coordiné a 15 ingenieros de calidad distribuidos en múltiples proyectos, definiendo estándares comunes de framework, nomenclatura y reportería.',
      'Definí la estrategia de pruebas, el alcance de cada release y un readiness sustentado en evidencia, no en la sensación del equipo.',
      'Aumenté 20% la cobertura automatizada construyendo y manteniendo frameworks en Selenium, JUnit, Appium y SerenityBDD con patrón Screenplay.',
      'Integré pruebas de rendimiento y seguridad dentro de los pipelines de CI/CD, llevando la calidad a etapas tempranas del ciclo.',
      'Diseñé y ejecuté el programa de mentoría del chapter para ingenieros junior, en habilidades técnicas y de liderazgo.',
      'Hice troubleshooting con logs de AKS en DEV y UAT, y sostuve la trazabilidad de punta a punta en JIRA y Xray.',
    ],
    stack: ['Selenium', 'JUnit', 'Appium', 'SerenityBDD', 'Jenkins', 'AKS', 'JIRA', 'Xray'],
  },
  {
    empresa: 'UTP — Universidad Tecnológica del Perú',
    cargo: 'Senior Quality Engineer',
    logo: null,
    web: 'https://www.utp.edu.pe',
    pais: 'pe',
    paisNombre: 'Perú',
    descripcion:
      'Tribu UTP+Class, la plataforma de clases digitales de la universidad. Un producto con picos de uso brutales y sin margen de error: si falla un lunes a las siete de la mañana, miles de estudiantes se quedan sin clase.',
    logros: [
      'Lideré y coordiné al equipo de QA de la tribu, promoviendo buenas prácticas de testing y trabajo colaborativo con desarrollo.',
      'Gestioné y optimicé la suite de automatización, asegurando estabilidad y escalabilidad en los pipelines.',
      'Automaticé pruebas de APIs con Karate y RestAssured, y flujos web con Cypress, Selenium y TestCafe, con reportería en Cucumber.',
      'Implementé reportes gerenciales en Qmetry y JIRA para el seguimiento de los OKR de calidad.',
      'Participé en mesas Lean impulsando mejora continua en calidad y entrega.',
    ],
    stack: ['Cypress', 'Selenium', 'TestCafe', 'Karate', 'RestAssured', 'JMeter', 'Qmetry'],
  },
  {
    empresa: 'Canvia',
    cargo: 'Technical Lead DevTestOps',
    logo: 'canvia.svg',
    web: 'https://canvia.com',
    pais: 'pe',
    paisNombre: 'Perú',
    clientes: [
      { nombre: 'Claro', logo: 'claro.svg' },
      { nombre: 'Interbank', logo: 'interbank.png' },
      { nombre: 'BBVA', logo: 'bbva.png' },
    ],
    descripcion:
      'Integrador de tecnología para banca, telecomunicaciones y sector público. Pasé por roles sucesivos de DevOps Architect, Lead Technical Specialist y Presales Consultant. Es la etapa donde aprendí la infraestructura por dentro, y la razón por la que hoy puedo discutir un pipeline con desarrollo de igual a igual.',
    logros: [
      'Dirigí equipos multidisciplinarios de hasta 15 personas entre arquitectos, desarrolladores, QA y UX.',
      'En Claro rediseñé el proceso de calidad del área TMO y goberné los ciclos funcionales, de regresión, smoke y UAT de las entregas.',
      'En Interbank Medios de Pago migré pipelines y releases a Jenkins, integré el simulador VISA y capacité a un squad de 35 personas.',
      'En BBVA apoyé la migración a cloud con métricas, dashboards e integración de JIRA con Jenkins.',
      'Implementé CI/CD e infraestructura como código con Jenkins, Kubernetes, Docker, Terraform y Ansible, con monitoreo en Prometheus y Grafana.',
      'Diseñé la propuesta y el roadmap de un Centro de Excelencia de Quality & Automation orientado a gobierno, estandarización y escalabilidad.',
    ],
    stack: ['Jenkins', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'],
  },
  {
    empresa: 'Delaware Perú',
    cargo: 'Consultor de Calidad de Software',
    logo: 'delaware.png',
    web: 'https://www.delaware.pro',
    pais: 'pe',
    paisNombre: 'Perú',
    clientes: [{ nombre: 'Interbank', logo: 'interbank.png' }],
    descripcion:
      'Consultora belga de tecnología empresarial. Lideré servicios de QA y DevOps para clientes del sector financiero y público, en proyectos de implantación donde la calidad se decide en el plan y no en la ejecución.',
    logros: [
      'Definí y ejecuté estrategias de aseguramiento de calidad en proyectos de implantación compleja.',
      'Diseñé planes de prueba funcionales, de regresión, de rendimiento e integración continua de extremo a extremo.',
      'Coordiné y mentoricé equipos de QA multidisciplinarios.',
      'Gestioné suites de automatización con Selenium, Cypress y TestCafe, y pruebas no funcionales con JMeter, Gatling y LoadRunner.',
      'Elaboré métricas y reportes gerenciales en JIRA, Qmetry y TestRail para sustentar decisiones de release ante el cliente.',
    ],
    stack: ['Selenium', 'Cypress', 'TestCafe', 'JMeter', 'Gatling', 'LoadRunner', 'TestRail'],
  },
  {
    empresa: 'Q System',
    cargo: 'Analista QA',
    logo: 'qsystem.png',
    web: 'https://qsystem.com.pe',
    pais: 'pe',
    paisNombre: 'Perú',
    clientes: [
      { nombre: 'Yanbal', logo: 'yanbal.png' },
      { nombre: 'Pacífico Seguros', logo: 'pacifico.png' },
      { nombre: 'Interbank', logo: 'interbank.png' },
    ],
    descripcion:
      'Consultoría de testing. Trabajé como consultor en tres clientes de sectores distintos —cosmética, seguros y banca—, que fue la mejor escuela posible para entender que el riesgo no se parece en ningún dominio al anterior.',
    logros: [
      'En Yanbal automaticé con Selenium las funcionalidades críticas del negocio y validé el sistema core.',
      'En Pacífico Vida diseñé, ejecuté y estimé planes de prueba para el core asegurador, en web, móvil Android y aplicaciones cliente-servidor.',
      'En Interbank certifiqué cajeros automáticos, verificando sincronización y seguridad de la información bancaria según la normativa del sector.',
    ],
    stack: ['Selenium', 'JIRA', 'Pruebas móviles iOS y Android'],
  },
  {
    empresa: 'GMD — Grupo Graña y Montero',
    cargo: 'Programador Java',
    logo: null,
    pais: 'pe',
    paisNombre: 'Perú',
    descripcion:
      'La filial de tecnología del Grupo Graña y Montero. Aquí escribí software antes de dedicarme a probarlo, y esa es la razón de que hoy discuta un pipeline o un contrato de API de igual a igual con desarrollo: sé lo que cuesta el otro lado.',
    logros: [
      'Desarrollé y mantuve servicios de backend en Java y Spring Boot, incluyendo APIs REST de integración entre sistemas.',
      'Escribí pruebas unitarias y de integración con JUnit y Mockito — mi primer contacto real con la idea de que el código se verifica solo.',
      'Trabajé sobre bases de datos relacionales con JPA e Hibernate dentro de un equipo Scrum.',
    ],
    stack: ['Java', 'Spring Boot', 'JUnit', 'Mockito', 'MySQL', 'PostgreSQL', 'Docker'],
  },
  {
    empresa: 'GMD — Grupo Graña y Montero',
    cargo: 'Practicante de Programación',
    logo: null,
    pais: 'pe',
    paisNombre: 'Perú',
    descripcion:
      'Mis primeras prácticas profesionales, en el área de sistemas internos del grupo. El punto de partida de todo lo demás.',
    logros: [
      'Desarrollé y di mantenimiento al ERP de Recursos Humanos, incluyendo la carga de planillas y la integridad de sus datos.',
      'Colaboré en desarrollo web de front-end y back-end para proyectos internos.',
      'Escribí mis primeras pruebas unitarias con JUnit y aprendí control de versiones con Git.',
    ],
    stack: ['Java', 'Spring', 'JUnit', 'MySQL', 'PostgreSQL', 'Git'],
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
