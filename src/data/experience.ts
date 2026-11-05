import type { Bilingue } from '../i18n';

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
  cargo: Bilingue;
  logo: string | null;
  web?: string;
  pais: CodigoPais;
  paisNombre: Bilingue;
  modalidad?: Bilingue;
  /** Matiz del puesto que no cabe en la tabla: se ve en el detalle. */
  nota?: Bilingue;
  clientes?: Cliente[];
  /**
   * Productos sobre los que trabajé dentro de la empresa. No son clientes:
   * son las piezas del propio negocio que me tocó asegurar. `logo` en null
   * cuando la marca no publica uno verificable; dibuja monograma.
   */
  productos?: Cliente[];
  /** Dos o tres frases: qué era la empresa, qué se me confió y qué estaba en juego. */
  descripcion: Bilingue;
  logros: Bilingue[];
  stack?: string[];
  /**
   * Capas de prueba que cubrí en esa etapa. Se deducen de su propio stack y de
   * sus logros; sirven para el mapa de cobertura del detalle.
   */
  capas?: string[];
}

export const experiencias: Experiencia[] = [
  {
    empresa: 'Canvia',
    cargo: { es: 'Quality Engineering & API Testing', en: 'Quality Engineering & API Testing' },
    logo: 'canvia.svg',
    web: 'https://canvia.com',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    modalidad: { es: 'Remoto', en: 'Remote' },
    clientes: [{ nombre: 'Interbank', logo: 'interbank.png' }],
    descripcion: {
      es: 'Certifico la calidad de los servicios críticos de Interbank durante su modernización de XML a JSON. Una migración de este tipo no cambia funcionalidad: cambia el contrato. El riesgo no está en lo que se ve, sino en un campo que cambió de tipo, un opcional que dejó de serlo o un error que ahora se devuelve distinto — y todo eso llega a producción sin que la interfaz muestre nada raro.',
      en: 'I certify the quality of Interbank’s critical services during their migration from XML to JSON. A migration like this does not change functionality: it changes the contract. The risk is not in what you can see, but in a field that changed type, an optional one that stopped being optional, or an error now returned differently — and all of that reaches production without the interface showing anything odd.',
    },
    logros: [
      { es: 'Valido contratos, mapeo de campos, tipos, reglas de negocio, manejo de errores e integridad de datos entre el servicio legacy y el migrado, comparando ambos respuesta contra respuesta.', en: 'I validate contracts, field mapping, types, business rules, error handling and data integrity between the legacy service and the migrated one, comparing the two response against response.' },
      { es: 'Diseño y ejecuto pruebas funcionales, de integración, regresión y E2E sobre APIs y backend, priorizando por riesgo de liberación y no por orden de llegada.', en: 'I design and run functional, integration, regression and E2E tests over APIs and backend, prioritising by release risk rather than by order of arrival.' },
      { es: 'Gestiono los defectos con evidencia técnica —request, response, esperado contra obtenido— para que la discusión sea sobre el dato y no sobre percepciones.', en: 'I manage defects with technical evidence — request, response, expected against actual — so the discussion is about the data and not about perceptions.' },
      { es: 'Coordino el análisis y la trazabilidad de la certificación con Desarrollo, Arquitectura, Negocio y QA.', en: 'I coordinate the analysis and traceability of the certification with Development, Architecture, Business and QA.' },
      { es: 'Aplico IA y LLMs al análisis de requerimientos y a la revisión de estructuras JSON y XML, bajo revisión humana.', en: 'I apply AI and LLMs to requirements analysis and to reviewing JSON and XML structures, under human review.' },
    ],
    stack: ['APIs REST y SOAP', 'JSON', 'XML', 'SQL', 'Postman', 'Azure DevOps'],
    capas: ['API', 'Datos'],
  },
  {
    empresa: 'Elipgo Technology',
    cargo: { es: 'Tech Lead IA Automation', en: 'Tech Lead, AI Automation' },
    logo: 'elipgo.png',
    web: 'https://elipgo.com',
    pais: 'mx',
    paisNombre: { es: 'México', en: 'Mexico' },
    modalidad: { es: 'Remoto', en: 'Remote' },
    clientes: [
      { nombre: 'Starlink México', logo: 'starlink.png' },
      { nombre: 'Elipgo Analytics Engineering', logo: 'elipgo.png' },
    ],
    descripcion: {
      es: 'Elipgo desarrolla un producto de analítica de video: detección y análisis sobre cámaras con inteligencia artificial. Lidero técnicamente la automatización de calidad de ese producto, un dominio donde la prueba no se limita a que la interfaz responda —hay que verificar que el modelo detecte lo que debe, que los eventos se registren y que la analítica cuadre con lo que ocurrió frente a la cámara.',
      en: 'Elipgo builds a video analytics product: AI-driven detection and analysis over camera feeds. I lead the quality automation of that product technically, a domain where testing is not just about the interface responding — you have to verify that the model detects what it should, that events are recorded, and that the analytics match what actually happened in front of the camera.',
    },
    logros: [
      { es: 'Lidero la estrategia de automatización y las decisiones de arquitectura de la suite, definiendo qué se automatiza, en qué nivel y con qué criterio de valor.', en: 'I lead the automation strategy and the suite’s architecture decisions, defining what gets automated, at which level, and against what measure of value.' },
      { es: 'Automatizo la cuenta de Starlink México en sus cuatro frentes —web, escritorio, móvil y APIs— con una sola suite y los mismos criterios, para que un fallo se detecte en la capa más barata y no al final del flujo.', en: 'I automate the Starlink Mexico account across its four fronts — web, desktop, mobile and APIs — with a single suite and the same criteria, so a failure is caught in the cheapest layer and not at the end of the flow.' },
      { es: 'Diseñé el framework en Playwright con Cucumber y patrón Screenplay sobre TypeScript, separando intención de negocio, interacción y localizadores para que la suite siga siendo mantenible a medida que el producto crece.', en: 'I designed the framework in Playwright with Cucumber and the Screenplay pattern over TypeScript, separating business intent, interaction and locators so the suite stays maintainable as the product grows.' },
      { es: 'Monté la gestión de datos de prueba y la reportería propia, con un tablero de resultados que el equipo consulta después de cada ejecución.', en: 'I set up test data management and our own reporting, with a results dashboard the team checks after every run.' },
      { es: 'Aplico IA al diseño y al análisis de escenarios, con una regla fija: ninguna salida del modelo se convierte en caso ejecutable sin revisión humana.', en: 'I apply AI to scenario design and analysis, with one fixed rule: no model output becomes an executable case without human review.' },
    ],
    stack: ['Playwright', 'TypeScript', 'Cucumber', 'Screenplay', 'Appium', 'IA aplicada'],
    capas: ['Web', 'Escritorio', 'Móvil', 'API'],
  },
  {
    empresa: 'Soho Humantech',
    cargo: { es: 'AI Quality Engineering Specialist', en: 'AI Quality Engineering Specialist' },
    logo: 'soho.svg',
    web: 'https://soho.cl',
    pais: 'cl',
    paisNombre: { es: 'Chile', en: 'Chile' },
    modalidad: { es: 'Remoto', en: 'Remote' },
    clientes: [{ nombre: 'RedSalud', logo: 'redsalud.png' }],
    descripcion: {
      es: 'Soho lleva las iniciativas digitales de RedSalud, una de las mayores redes de salud privada de Chile. Aseguré los procesos de agenda, disponibilidad y agendamiento médico: el flujo donde un error no se traduce en una pantalla fea sino en un paciente que no consigue hora o en una que se reserva dos veces.',
      en: 'Soho runs the digital initiatives of RedSalud, one of the largest private healthcare networks in Chile. I covered the scheduling, availability and medical booking processes: the flow where a bug does not mean an ugly screen but a patient who cannot get an appointment, or one booked twice.',
    },
    logros: [
      { es: 'Diseñé y ejecuté la estrategia de pruebas E2E de los flujos críticos de agenda y agendamiento, del criterio de aceptación hasta la evidencia.', en: 'I designed and ran the E2E test strategy for the critical scheduling and booking flows, from the acceptance criteria through to the evidence.' },
      { es: 'Automaticé con Playwright y TypeScript bajo patrón Screenplay, priorizando cobertura, estabilidad y mantenibilidad por encima del número de casos.', en: 'I automated with Playwright and TypeScript under the Screenplay pattern, prioritising coverage, stability and maintainability over the number of cases.' },
      { es: 'Validé APIs y consistencia de datos con SQL, y ejecuté pruebas de carga con k6 sobre los servicios de agenda para conocer su punto de quiebre antes que los usuarios.', en: 'I validated APIs and data consistency with SQL, and ran load tests with k6 against the scheduling services to find their breaking point before the users did.' },
      { es: 'Construí escenarios BDD en Gherkin y documenté criterios de aceptación, garantizando trazabilidad entre requerimiento, ejecución y evidencia.', en: 'I built BDD scenarios in Gherkin and documented acceptance criteria, keeping traceability between requirement, execution and evidence.' },
      { es: 'Incorporé un flujo asistido por IA para generar casos, analizar cobertura y priorizar escenarios, acortando el tiempo de diseño y el de mantenimiento.', en: 'I introduced an AI-assisted flow to draft cases, analyse coverage and prioritise scenarios, shortening both design and maintenance time.' },
      { es: 'Integré la ejecución a los pipelines de Azure DevOps para tener señal de calidad en cada build.', en: 'I wired the runs into the Azure DevOps pipelines so there was a quality signal on every build.' },
    ],
    stack: ['Playwright', 'TypeScript', 'Cucumber', 'Screenplay', 'k6', 'SQL', 'Azure DevOps'],
    capas: ['Web', 'API', 'Datos', 'Rendimiento'],
  },
  {
    empresa: 'IDM Technology',
    cargo: { es: 'SDET — Starbucks Rewards Platform', en: 'SDET — Starbucks Rewards Platform' },
    logo: 'idm.png',
    web: 'https://idmtechnology.com',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    modalidad: { es: 'Híbrido', en: 'Hybrid' },
    nota: { es: 'Proyecto temporal', en: 'Fixed-term project' },
    clientes: [{ nombre: 'Starbucks', logo: 'starbucks.png' }],
    descripcion: {
      es: 'Calidad del programa de recompensas de Starbucks en web, Android e iOS. El reto real no era automatizar tres plataformas, sino garantizar que las tres contaran lo mismo: una estrella acumulada en la app tenía que reflejarse igual en la web y en el historial transaccional.',
      en: 'Quality for the Starbucks rewards program on web, Android and iOS. The real challenge was not automating three platforms, but guaranteeing that all three told the same story: a star earned in the app had to show up identically on the web and in the transaction history.',
    },
    logros: [
      { es: 'Automaticé de extremo a extremo los flujos críticos del programa: OTP, beneficios, acumulación de estrellas, canje de rewards e historial transaccional.', en: 'I automated the program’s critical flows end to end: OTP, benefits, star accrual, reward redemption and transaction history.' },
      { es: 'Validé APIs REST, integraciones de backend y la consistencia multicanal contra los criterios de aceptación y los diseños del equipo de producto.', en: 'I validated REST APIs, backend integrations and cross-channel consistency against the acceptance criteria and the product team’s designs.' },
      { es: 'Fortalecí el framework, la regresión y el release readiness con evidencia trazable y análisis de defectos.', en: 'I strengthened the framework, the regression suite and release readiness with traceable evidence and defect analysis.' },
      { es: 'Trabajé de cerca con Producto, Desarrollo y Diseño para que la testabilidad entrara en la conversación antes de escribir el código.', en: 'I worked closely with Product, Development and Design so testability entered the conversation before the code was written.' },
    ],
    stack: ['Web', 'Android', 'iOS', 'API Testing', 'Regresión'],
    capas: ['Web', 'Móvil', 'API'],
  },
  {
    empresa: 'Prestamype',
    cargo: { es: 'Head Automation QA · QE Lead', en: 'Head of QA Automation · QE Lead' },
    logo: 'prestamype.svg',
    web: 'https://prestamype.com',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    productos: [
      // Préstamos y Factoring son líneas de la propia Prestamype y usan su
      // marca; las otras tres tienen la suya.
      { nombre: 'Prestamype Préstamos', logo: 'prestamype.svg' },
      { nombre: 'Prestamype Factoring', logo: 'prestamype.svg' },
      { nombre: 'Cambio Seguro', logo: 'cambioseguro.png' },
      { nombre: 'Tandia', logo: 'tandia.svg' },
      { nombre: 'Recadia', logo: 'recadia.svg' },
    ],
    descripcion: {
      es: 'Fintech de financiamiento con garantía hipotecaria y cambio de divisas. Dirigí la práctica de automatización de calidad de sus productos web y móviles: no solo construir la suite, sino formar al equipo que la iba a sostener cuando yo no estuviera.',
      en: 'A fintech for mortgage-backed lending and currency exchange. I ran the quality automation practice for its web and mobile products: not only building the suite, but training the team that would keep it alive once I was gone.',
    },
    logros: [
      { es: 'Dirigí un equipo de 6 ingenieros de calidad, definiendo estrategia, estándares, ownership y el plan de crecimiento técnico de cada uno.', en: 'I led a team of 6 quality engineers, defining strategy, standards, ownership and each person’s technical growth plan.' },
      { es: 'Diseñé el framework de automatización en Playwright con Page Object Model, Data-Driven y BDD, que elevó 50% la eficiencia y la cobertura.', en: 'I designed the automation framework in Playwright with Page Object Model, Data-Driven and BDD, which raised efficiency and coverage by 50%.' },
      { es: 'Reduje 70% el tiempo de validación por release con ejecución paralela y distribuida en contenedores Docker sobre Jenkins y GitLab CI.', en: 'I cut validation time per release by 70% with parallel, distributed runs in Docker containers on Jenkins and GitLab CI.' },
      { es: 'Implementé dashboards de cobertura, estabilidad, flakiness y readiness para decidir con datos qué automatizar y —lo más difícil— qué desechar.', en: 'I built dashboards for coverage, stability, flakiness and readiness so we could decide with data what to automate and — the hard part — what to throw away.' },
      { es: 'Incorporé IA y machine learning al mantenimiento de scripts, al análisis predictivo de fallos y a la priorización de pruebas, reduciendo los falsos positivos que hacían que el equipo dejara de mirar los reportes.', en: 'I brought AI and machine learning into script maintenance, predictive failure analysis and test prioritisation, cutting the false positives that were making the team stop looking at the reports.' },
      { es: 'Impulsé Shift-Left con desarrollo y producto, definiendo criterios de aceptación antes de escribir código.', en: 'I pushed Shift-Left with development and product, defining acceptance criteria before any code was written.' },
    ],
    stack: ['Playwright', 'TypeScript', 'Jenkins', 'GitLab CI', 'Docker', 'AWS', 'Azure'],
    capas: ['Web', 'Móvil', 'CI/CD'],
  },
  {
    empresa: 'Nagnoi, LLC',
    cargo: { es: 'Automation Specialist QE', en: 'Automation Specialist QE' },
    logo: 'nagnoi.png',
    web: 'https://nagnoi.com',
    pais: 'pr',
    paisNombre: { es: 'Puerto Rico', en: 'Puerto Rico' },
    modalidad: { es: 'Remoto', en: 'Remote' },
    nota: { es: 'En inglés', en: 'In English' },
    clientes: [{ nombre: 'Edulogica', logo: 'edulogica.png' }],
    descripcion: {
      es: 'Consultora de datos y analítica con sede en Puerto Rico. Trabajé en remoto y en inglés sobre los productos de sus clientes finales, integrado a sus equipos y a sus ceremonias.',
      en: 'A data and analytics consultancy based in Puerto Rico. I worked remotely and in English on their end clients’ products, embedded in their teams and their ceremonies.',
    },
    logros: [
      { es: 'Aumenté 70% la cobertura automatizada desarrollando y manteniendo suites en Playwright y Specflow, con una caída notoria de los errores críticos que llegaban a producción.', en: 'I raised automated coverage by 70% building and maintaining suites in Playwright and Specflow, with a marked drop in the critical bugs reaching production.' },
      { es: 'Reduje 40% los tiempos de ejecución mediante paralelización y optimización de scripts.', en: 'I cut run times by 40% through parallelisation and script optimisation.' },
      { es: 'Automaticé pruebas de APIs REST con RestAssured, Karate y Postman, incluyendo validación de contratos y rendimiento de los servicios de backend.', en: 'I automated REST API testing with RestAssured, Karate and Postman, including contract validation and backend service performance.' },
      { es: 'Incorporé análisis de seguridad con OWASP ZAP dentro del ciclo de pruebas, en vez de dejarlo como una auditoría al final.', en: 'I brought security analysis with OWASP ZAP into the test cycle, instead of leaving it as an audit at the end.' },
      { es: 'Participé en refinamientos y ceremonias Scrum para asegurar testabilidad y criterios de aceptación desde el inicio.', en: 'I took part in refinements and Scrum ceremonies to secure testability and acceptance criteria from the start.' },
    ],
    stack: ['Playwright', 'Specflow', 'Karate', 'RestAssured', 'JMeter', 'OWASP ZAP'],
    capas: ['Web', 'API', 'Rendimiento', 'Seguridad'],
  },
  {
    empresa: 'Banco de Crédito BCP',
    cargo: { es: 'Chapter Lead Quality Engineer', en: 'Chapter Lead Quality Engineer' },
    logo: 'bcp.png',
    web: 'https://www.viabcp.com',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    descripcion: {
      es: 'El banco más grande del Perú. Lideré el chapter de calidad que daba servicio a varias tribus de producto digital: un rol donde el trabajo no es escribir pruebas sino conseguir que quince personas, repartidas en equipos distintos, trabajen con el mismo criterio.',
      en: 'The largest bank in Peru. I led the quality chapter serving several digital product tribes: a role where the job is not writing tests but getting fifteen people, spread across different teams, to work to the same standard.',
    },
    logros: [
      { es: 'Coordiné a 15 ingenieros de calidad distribuidos en múltiples proyectos, definiendo estándares comunes de framework, nomenclatura y reportería.', en: 'I coordinated 15 quality engineers spread across multiple projects, defining shared standards for framework, naming and reporting.' },
      { es: 'Definí la estrategia de pruebas, el alcance de cada release y un readiness sustentado en evidencia, no en la sensación del equipo.', en: 'I defined the test strategy, the scope of each release, and a readiness call backed by evidence rather than by how the team felt.' },
      { es: 'Aumenté 20% la cobertura automatizada construyendo y manteniendo frameworks en Selenium, JUnit, Appium y SerenityBDD con patrón Screenplay.', en: 'I raised automated coverage by 20% building and maintaining frameworks in Selenium, JUnit, Appium and SerenityBDD with the Screenplay pattern.' },
      { es: 'Integré pruebas de rendimiento y seguridad dentro de los pipelines de CI/CD, llevando la calidad a etapas tempranas del ciclo.', en: 'I integrated performance and security testing into the CI/CD pipelines, moving quality into the early stages of the cycle.' },
      { es: 'Diseñé y ejecuté el programa de mentoría del chapter para ingenieros junior, en habilidades técnicas y de liderazgo.', en: 'I designed and ran the chapter’s mentoring program for junior engineers, covering both technical and leadership skills.' },
      { es: 'Hice troubleshooting con logs de AKS en DEV y UAT, y sostuve la trazabilidad de punta a punta en JIRA y Xray.', en: 'I troubleshot with AKS logs in DEV and UAT, and kept end-to-end traceability in JIRA and Xray.' },
    ],
    stack: ['Selenium', 'JUnit', 'Appium', 'SerenityBDD', 'Jenkins', 'AKS', 'JIRA', 'Xray'],
    capas: ['Web', 'Móvil', 'CI/CD'],
  },
  {
    empresa: 'UTP — Universidad Tecnológica del Perú',
    cargo: { es: 'Senior Quality Engineer', en: 'Senior Quality Engineer' },
    logo: 'utp.png',
    web: 'https://www.utp.edu.pe',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    descripcion: {
      es: 'Tribu UTP+Class, la plataforma de clases digitales de la universidad. Un producto con picos de uso brutales y sin margen de error: si falla un lunes a las siete de la mañana, miles de estudiantes se quedan sin clase.',
      en: 'The UTP+Class tribe, the university’s digital classroom platform. A product with brutal usage peaks and no margin for error: if it fails on a Monday at seven in the morning, thousands of students have no class.',
    },
    logros: [
      { es: 'Lideré y coordiné al equipo de QA de la tribu, promoviendo buenas prácticas de testing y trabajo colaborativo con desarrollo.', en: 'I led and coordinated the tribe’s QA team, promoting good testing practice and close collaboration with development.' },
      { es: 'Gestioné y optimicé la suite de automatización, asegurando estabilidad y escalabilidad en los pipelines.', en: 'I managed and optimised the automation suite, keeping it stable and scalable inside the pipelines.' },
      { es: 'Automaticé pruebas de APIs con Karate y RestAssured, y flujos web con Cypress, Selenium y TestCafe, con reportería en Cucumber.', en: 'I automated API testing with Karate and RestAssured, and web flows with Cypress, Selenium and TestCafe, reporting through Cucumber.' },
      { es: 'Implementé reportes gerenciales en Qmetry y JIRA para el seguimiento de los OKR de calidad.', en: 'I built management reporting in Qmetry and JIRA to track the quality OKRs.' },
      { es: 'Participé en mesas Lean impulsando mejora continua en calidad y entrega.', en: 'I took part in Lean sessions driving continuous improvement in quality and delivery.' },
    ],
    stack: ['Cypress', 'Selenium', 'TestCafe', 'Karate', 'RestAssured', 'JMeter', 'Qmetry'],
    capas: ['Web', 'API', 'Rendimiento'],
  },
  {
    empresa: 'Canvia',
    cargo: { es: 'Technical Lead DevTestOps', en: 'Technical Lead DevTestOps' },
    logo: 'canvia.svg',
    web: 'https://canvia.com',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    clientes: [
      { nombre: 'Claro', logo: 'claro.svg' },
      { nombre: 'Interbank', logo: 'interbank.png' },
      { nombre: 'BBVA', logo: 'bbva.png' },
    ],
    descripcion: {
      es: 'Integrador de tecnología para banca, telecomunicaciones y sector público. Pasé por roles sucesivos de DevOps Architect, Lead Technical Specialist y Presales Consultant. Es la etapa donde aprendí la infraestructura por dentro, y la razón por la que hoy puedo discutir un pipeline con desarrollo de igual a igual.',
      en: 'A technology integrator for banking, telecoms and the public sector. I moved through successive roles as DevOps Architect, Lead Technical Specialist and Presales Consultant. This is where I learned infrastructure from the inside, and the reason I can discuss a pipeline with developers as an equal today.',
    },
    logros: [
      { es: 'Dirigí equipos multidisciplinarios de hasta 15 personas entre arquitectos, desarrolladores, QA y UX.', en: 'I led cross-functional teams of up to 15 people across architects, developers, QA and UX.' },
      { es: 'En Claro rediseñé el proceso de calidad del área TMO y goberné los ciclos funcionales, de regresión, smoke y UAT de las entregas.', en: 'At Claro I redesigned the quality process for the TMO area and governed the functional, regression, smoke and UAT cycles of each delivery.' },
      { es: 'En Interbank Medios de Pago migré pipelines y releases a Jenkins, integré el simulador VISA y capacité a un squad de 35 personas.', en: 'At Interbank Payment Methods I migrated pipelines and releases to Jenkins, integrated the VISA simulator and trained a squad of 35 people.' },
      { es: 'En BBVA apoyé la migración a cloud con métricas, dashboards e integración de JIRA con Jenkins.', en: 'At BBVA I supported the cloud migration with metrics, dashboards and a JIRA-to-Jenkins integration.' },
      { es: 'Implementé CI/CD e infraestructura como código con Jenkins, Kubernetes, Docker, Terraform y Ansible, con monitoreo en Prometheus y Grafana.', en: 'I implemented CI/CD and infrastructure as code with Jenkins, Kubernetes, Docker, Terraform and Ansible, monitored through Prometheus and Grafana.' },
      { es: 'Diseñé la propuesta y el roadmap de un Centro de Excelencia de Quality & Automation orientado a gobierno, estandarización y escalabilidad.', en: 'I designed the proposal and roadmap for a Quality & Automation Centre of Excellence focused on governance, standardisation and scale.' },
    ],
    stack: ['Jenkins', 'Kubernetes', 'Docker', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'],
    capas: ['CI/CD', 'Infraestructura'],
  },
  {
    empresa: 'Delaware Perú',
    cargo: { es: 'Consultor de Calidad de Software', en: 'Software Quality Consultant' },
    logo: 'delaware.png',
    web: 'https://www.delaware.pro',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    clientes: [
      { nombre: 'Interbank', logo: 'interbank.png' },
      { nombre: 'SMV', logo: 'smv.png' },
      { nombre: 'SUNAT', logo: 'sunat.png' },
      { nombre: 'Distriluz', logo: 'distriluz.png' },
      { nombre: 'Contraloría', logo: 'contraloria.png' },
    ],
    descripcion: {
      es: 'Consultora belga de tecnología empresarial. Lideré servicios de QA y DevOps para clientes del sector financiero y público, en proyectos de implantación donde la calidad se decide en el plan y no en la ejecución.',
      en: 'A Belgian enterprise technology consultancy. I led QA and DevOps services for financial and public sector clients, on rollout projects where quality is decided in the plan and not in the execution.',
    },
    logros: [
      { es: 'Definí y ejecuté estrategias de aseguramiento de calidad en proyectos de implantación compleja.', en: 'I defined and executed quality assurance strategies on complex rollout projects.' },
      { es: 'Diseñé planes de prueba funcionales, de regresión, de rendimiento e integración continua de extremo a extremo.', en: 'I designed functional, regression, performance and continuous integration test plans, end to end.' },
      { es: 'Coordiné y mentoricé equipos de QA multidisciplinarios.', en: 'I coordinated and mentored cross-functional QA teams.' },
      { es: 'Gestioné suites de automatización con Selenium, Cypress y TestCafe, y pruebas no funcionales con JMeter, Gatling y LoadRunner.', en: 'I managed automation suites with Selenium, Cypress and TestCafe, and non-functional testing with JMeter, Gatling and LoadRunner.' },
      { es: 'Elaboré métricas y reportes gerenciales en JIRA, Qmetry y TestRail para sustentar decisiones de release ante el cliente.', en: 'I produced metrics and management reports in JIRA, Qmetry and TestRail to back release decisions in front of the client.' },
    ],
    stack: ['Selenium', 'Cypress', 'TestCafe', 'JMeter', 'Gatling', 'LoadRunner', 'TestRail'],
    capas: ['Web', 'Rendimiento'],
  },
  {
    empresa: 'Q System',
    cargo: { es: 'Analista QA', en: 'QA Analyst' },
    logo: 'qsystem.png',
    web: 'https://qsystem.com.pe',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    clientes: [
      { nombre: 'Yanbal', logo: 'yanbal.png' },
      { nombre: 'Pacífico Seguros', logo: 'pacifico.png' },
      { nombre: 'Interbank', logo: 'interbank.png' },
      { nombre: 'Citibank', logo: 'citibank.png' },
      { nombre: 'Scotiabank', logo: 'scotiabank.png' },
    ],
    descripcion: {
      es: 'Consultoría de testing. Trabajé como consultor en cinco clientes de tres sectores —cosmética, seguros y banca—, que fue la mejor escuela posible para entender que el riesgo no se parece en ningún dominio al anterior.',
      en: 'A testing consultancy. I worked as a consultant across five clients in three sectors — cosmetics, insurance and banking — which was the best possible school for understanding that risk looks nothing alike from one domain to the next.',
    },
    logros: [
      { es: 'En Yanbal automaticé con Selenium las funcionalidades críticas del negocio y validé el sistema core.', en: 'At Yanbal I automated the business-critical features with Selenium and validated the core system.' },
      { es: 'En Pacífico Vida diseñé, ejecuté y estimé planes de prueba para el core asegurador, en web, móvil Android y aplicaciones cliente-servidor.', en: 'At Pacífico Vida I designed, ran and estimated test plans for the insurance core, across web, Android mobile and client-server applications.' },
      { es: 'En Interbank certifiqué cajeros automáticos, verificando sincronización y seguridad de la información bancaria según la normativa del sector.', en: 'At Interbank I certified ATMs, verifying synchronisation and security of banking data against the sector’s regulations.' },
    ],
    stack: ['Selenium', 'JIRA', 'Pruebas móviles iOS y Android'],
    capas: ['Web', 'Móvil'],
  },
  {
    empresa: 'GMD — Grupo Graña y Montero',
    cargo: { es: 'Programador Java', en: 'Java Developer' },
    logo: 'gmd.png',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    descripcion: {
      es: 'La filial de tecnología del Grupo Graña y Montero. Aquí escribí software antes de dedicarme a probarlo, y esa es la razón de que hoy discuta un pipeline o un contrato de API de igual a igual con desarrollo: sé lo que cuesta el otro lado.',
      en: 'The technology arm of Grupo Graña y Montero. This is where I wrote software before I moved to testing it, and the reason I can discuss a pipeline or an API contract with developers as an equal: I know what the other side costs.',
    },
    logros: [
      { es: 'Desarrollé y mantuve servicios de backend en Java y Spring Boot, incluyendo APIs REST de integración entre sistemas.', en: 'I developed and maintained backend services in Java and Spring Boot, including REST APIs integrating systems.' },
      { es: 'Escribí pruebas unitarias y de integración con JUnit y Mockito — mi primer contacto real con la idea de que el código se verifica solo.', en: 'I wrote unit and integration tests with JUnit and Mockito — my first real contact with the idea that code can verify itself.' },
      { es: 'Trabajé sobre bases de datos relacionales con JPA e Hibernate dentro de un equipo Scrum.', en: 'I worked on relational databases with JPA and Hibernate inside a Scrum team.' },
    ],
    stack: ['Java', 'Spring Boot', 'JUnit', 'Mockito', 'MySQL', 'PostgreSQL', 'Docker'],
    capas: ['Desarrollo', 'Datos'],
  },
  {
    empresa: 'GMD — Grupo Graña y Montero',
    cargo: { es: 'Practicante de Programación', en: 'Software Development Intern' },
    logo: 'gmd.png',
    pais: 'pe',
    paisNombre: { es: 'Perú', en: 'Peru' },
    descripcion: {
      es: 'Mis primeras prácticas profesionales, en el área de sistemas internos del grupo. El punto de partida de todo lo demás.',
      en: 'My first professional internship, in the group’s internal systems team. The starting point for everything else.',
    },
    logros: [
      { es: 'Desarrollé y di mantenimiento al ERP de Recursos Humanos, incluyendo la carga de planillas y la integridad de sus datos.', en: 'I developed and maintained the HR ERP, including payroll loading and the integrity of its data.' },
      { es: 'Colaboré en desarrollo web de front-end y back-end para proyectos internos.', en: 'I contributed to front-end and back-end web development for internal projects.' },
      { es: 'Escribí mis primeras pruebas unitarias con JUnit y aprendí control de versiones con Git.', en: 'I wrote my first unit tests with JUnit and learned version control with Git.' },
    ],
    stack: ['Java', 'Spring', 'JUnit', 'MySQL', 'PostgreSQL', 'Git'],
    capas: ['Desarrollo', 'Datos'],
  },
];

export const certificaciones: { nombre: string; emisor: string; anio?: string }[] = [
  { nombre: 'ISTQB® Certified Tester — Foundation Level (CTFL)', emisor: 'iSQI Group' },
  { nombre: 'Holistic Testing: Strategies for Agile Teams', emisor: 'Agile Testing Fellowship' },
  { nombre: 'Scrum Fundamentals Certified (SFC)', emisor: 'VMEdu' },
];

export const educacion: { titulo: Bilingue; institucion: string; periodo?: string }[] = [
  {
    titulo: { es: 'Ingeniería de Sistemas', en: 'Systems Engineering' },
    institucion: 'Universidad César Vallejo',
    periodo: '2012 — 2018',
  },
];

export const idiomas: { nombre: Bilingue; nivel: Bilingue }[] = [
  {
    nombre: { es: 'Español', en: 'Spanish' },
    nivel: { es: 'Nativo', en: 'Native' },
  },
  {
    nombre: { es: 'Inglés', en: 'English' },
    nivel: {
      es: 'Profesional — experiencia trabajando en remoto para Puerto Rico y Chile',
      en: 'Professional — experience working remotely for Puerto Rico and Chile',
    },
  },
];
