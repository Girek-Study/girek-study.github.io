import type { Bilingue } from '../i18n';

// ============================================================================
//  GIREK STUDY — El proyecto de enseñanza.
//
//  Hoy es material abierto: repositorios con el código a la vista y las
//  decisiones explicadas. Las clases vienen después, y hasta que existan
//  ningún curso figura como disponible.
// ============================================================================

export const girekStudy = {
  titulo: 'Girek Study',
  lema: {
    es: 'Automatización de pruebas en español, con el código a la vista.',
    en: 'Test automation in Spanish, with the code in the open.',
  },
  descripcion: {
    es: 'Casi todo el buen material sobre testing automatizado está en inglés, y casi todo lo que hay en español se queda en el "hola mundo": instalar la herramienta, escribir un test, fin. Lo que falta es lo de después — cómo se sostiene una suite de trescientas pruebas, por qué se vuelve inmantenible y qué decisiones de diseño evitan llegar ahí. Eso es lo que publico: frameworks completos que se pueden clonar y usar, con el porqué de cada decisión.',
    en: 'Almost all the good material on test automation is in English, and almost everything in Spanish stops at hello world: install the tool, write a test, done. What is missing is what comes after — how a suite of three hundred tests holds up, why it becomes unmaintainable, and which design decisions keep it from getting there. That is what I publish: complete frameworks you can clone and use, with the reasoning behind every decision.',
  },
  /**
   * Cada perfil con su puerta de entrada. El destino apunta a material que ya
   * existe hoy, no a un curso que todavía no abre: mandar a alguien a una
   * lista de espera es la forma más rápida de perderlo.
   */
  paraQuien: [
    {
      rol: { es: 'QA manual', en: 'Manual QA' },
      sintoma: { es: 'Sé qué hay que probar, pero no por dónde empezar a automatizarlo.', en: 'I know what needs testing, I just do not know where to start automating it.' },
      texto: { es: 'Quieres dar el salto a la automatización sin quedarte en el tutorial.', en: 'You want to move into automation without stopping at the tutorial.' },
      empieza: { es: 'Un framework completo, clonable', en: 'A complete framework you can clone' },
      href: '/portafolio',
      trazo: 'M4.8 6.4h14.4 M4.8 12h14.4 M4.8 17.6h9.6 M18.2 15.8l1.9 1.9 3.1-3.3',
    },
    {
      rol: { es: 'Automatizador', en: 'Automation engineer' },
      sintoma: { es: 'Cada release se me van dos días arreglando pruebas que se pusieron rojas solas.', en: 'Every release I lose two days fixing tests that went red on their own.' },
      texto: { es: 'Tienes una suite que ya cuesta más mantener de lo que aporta.', en: 'You have a suite that now costs more to maintain than it gives back.' },
      empieza: { es: 'Cuándo Screenplay no vale la pena', en: 'When Screenplay is not worth it' },
      href: '/notas/cuando-screenplay-no-vale-la-pena/',
      trazo:
        'M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z M19.6 15.4a1.9 1.9 0 0 0 .38 2.1l.07.07a2.3 2.3 0 1 1-3.25 3.25l-.07-.07a1.9 1.9 0 0 0-3.22 1.35v.2a2.3 2.3 0 0 1-4.6 0v-.1a1.9 1.9 0 0 0-3.3-1.3l-.07.07a2.3 2.3 0 1 1-3.25-3.25l.07-.07A1.9 1.9 0 0 0 3.4 14a2.3 2.3 0 0 1 0-4.6h.1a1.9 1.9 0 0 0 1.3-3.3l-.07-.07A2.3 2.3 0 1 1 7.98 2.8l.7.07a1.9 1.9 0 0 0 2.1.38h.1a1.9 1.9 0 0 0 1.15-1.73v-.2a2.3 2.3 0 0 1 4.6 0v.1a1.9 1.9 0 0 0 3.3 1.3l.07-.07a2.3 2.3 0 1 1 3.25 3.25l-.7.07a1.9 1.9 0 0 0-.38 2.1v.1a1.9 1.9 0 0 0 1.73 1.15h.2',
    },
    {
      rol: { es: 'Desarrollador', en: 'Developer' },
      sintoma: { es: 'Toco una clase y se caen quince pruebas que no miraban eso.', en: 'I touch one class and fifteen tests fail that were not even looking at it.' },
      texto: { es: 'Necesitas escribir pruebas que sobrevivan al siguiente refactor.', en: 'You need tests that survive the next refactor.' },
      empieza: { es: 'Una suite que no depende de nadie', en: 'A suite that depends on no one' },
      href: '/notas/suite-sin-sitios-de-terceros/',
      trazo: 'm8.4 8.2-4.6 3.8 4.6 3.8 M15.6 8.2l4.6 3.8-4.6 3.8 M13.6 4.6l-3.2 14.8',
    },
    {
      rol: { es: 'Líder técnico', en: 'Tech lead' },
      sintoma: { es: 'Me piden automatizarlo todo y no tengo con qué sustentar qué sí y qué no.', en: 'They ask me to automate everything and I have nothing to back up what should and should not be.' },
      texto: { es: 'Tienes que decidir qué automatizar y sustentarlo con datos.', en: 'You have to decide what to automate and back it with data.' },
      empieza: { es: 'Casos de cliente, con sus cifras', en: 'Client work, with its numbers' },
      href: '/portafolio',
      trazo: 'M4.2 19.4h15.6 M7.4 19.4V11 M12 19.4V5.6 M16.6 19.4v-5.6',
    },
  ],
};

export interface Curso {
  titulo: Bilingue;
  /* `nivel` y `estado` son claves, no texto: su traduccion vive en el
   * diccionario para que la clase CSS del color siga saliendo del dato. */
  nivel: 'Inicial' | 'Intermedio' | 'Avanzado';
  duracion: Bilingue;
  descripcion: Bilingue;
  temas: string[];
  estado: 'Disponible' | 'Próximamente';
  enlace?: string;
}

export const cursos: Curso[] = [
  {
    titulo: { es: 'Automatización web con Playwright y TypeScript', en: 'Web automation with Playwright and TypeScript' },
    nivel: 'Intermedio',
    duracion: { es: 'En preparación', en: 'In preparation' },
    descripcion: {
      es: 'Construir un framework E2E desde cero: arquitectura, localizadores que no se rompen, datos de prueba, paralelismo y ejecución en CI.',
      en: 'Building an E2E framework from scratch: architecture, locators that do not break, test data, parallelism and running it in CI.',
    },
    temas: ['Playwright', 'TypeScript', 'Arquitectura de suites', 'CI/CD', 'Reportería'],
    estado: 'Próximamente',
  },
  {
    titulo: { es: 'El patrón Screenplay, en serio', en: 'The Screenplay pattern, properly' },
    nivel: 'Avanzado',
    duracion: { es: 'En preparación', en: 'In preparation' },
    descripcion: {
      es: 'Actor, tasks, questions y abilities aplicados a una suite real. Cuándo el patrón paga y cuándo es sobreingeniería.',
      en: 'Actor, tasks, questions and abilities on a real suite. When the pattern pays off and when it is over-engineering.',
    },
    temas: ['Screenplay', 'Diseño de pruebas', 'Mantenibilidad', 'Patrones'],
    estado: 'Próximamente',
    enlace: 'https://github.com/Girek-Study/playwright-screenplay-ts',
  },
  {
    titulo: { es: 'Pruebas de APIs y contract testing', en: 'API testing and contract testing' },
    nivel: 'Intermedio',
    duracion: { es: 'En preparación', en: 'In preparation' },
    descripcion: {
      es: 'Validar servicios REST y SOAP más allá del código 200: contratos, mapeo de campos, reglas de negocio e integridad de datos en migraciones.',
      en: 'Validating REST and SOAP services beyond the 200: contracts, field mapping, business rules and data integrity during migrations.',
    },
    temas: ['REST', 'SOAP', 'Contract testing', 'Postman', 'RestAssured', 'Karate'],
    estado: 'Próximamente',
  },
  {
    titulo: { es: 'IA aplicada al testing, sin soltar el volante', en: 'AI applied to testing, without letting go of the wheel' },
    nivel: 'Intermedio',
    duracion: { es: 'En preparación', en: 'In preparation' },
    descripcion: {
      es: 'Usar LLMs para diseñar escenarios, analizar cobertura y priorizar pruebas — y dónde está el límite en el que la revisión humana deja de ser opcional.',
      en: 'Using LLMs to design scenarios, analyse coverage and prioritise tests — and where the line is at which human review stops being optional.',
    },
    temas: ['LLM', 'Diseño de escenarios', 'Cobertura', 'Riesgo', 'Revisión humana'],
    estado: 'Próximamente',
  },
];

export interface Testimonio {
  nombre: string;
  rol: string;
  texto: string;
}

// Vacío a propósito. Un testimonio inventado se nota y cuesta más credibilidad
// de la que aporta. La sección aparece sola cuando haya alumnos reales que citar.
export const testimonios: Testimonio[] = [];
