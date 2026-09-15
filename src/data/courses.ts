// ============================================================================
//  GIREK STUDY — El proyecto de enseñanza.
//
//  Hoy es material abierto: repositorios con el código a la vista y las
//  decisiones explicadas. Las clases vienen después, y hasta que existan
//  ningún curso figura como disponible.
// ============================================================================

export const girekStudy = {
  titulo: 'Girek Study',
  lema: 'Automatización de pruebas en español, con el código a la vista.',
  descripcion:
    'Casi todo el buen material sobre testing automatizado está en inglés, y casi todo lo que hay en español se queda en el "hola mundo": instalar la herramienta, escribir un test, fin. Lo que falta es lo de después — cómo se sostiene una suite de trescientas pruebas, por qué se vuelve inmantenible y qué decisiones de diseño evitan llegar ahí. Eso es lo que publico: frameworks completos que se pueden clonar y usar, con el porqué de cada decisión.',
  /**
   * Cada perfil con su puerta de entrada. El destino apunta a material que ya
   * existe hoy, no a un curso que todavía no abre: mandar a alguien a una
   * lista de espera es la forma más rápida de perderlo.
   */
  paraQuien: [
    {
      rol: 'QA manual',
      sintoma: 'Sé qué hay que probar, pero no por dónde empezar a automatizarlo.',
      texto: 'Quieres dar el salto a la automatización sin quedarte en el tutorial.',
      empieza: 'Un framework completo, clonable',
      href: '/portafolio',
      trazo: 'M4.8 6.4h14.4 M4.8 12h14.4 M4.8 17.6h9.6 M18.2 15.8l1.9 1.9 3.1-3.3',
    },
    {
      rol: 'Automatizador',
      sintoma: 'Cada release se me van dos días arreglando pruebas que se pusieron rojas solas.',
      texto: 'Tienes una suite que ya cuesta más mantener de lo que aporta.',
      empieza: 'Cuándo Screenplay no vale la pena',
      href: '/notas/cuando-screenplay-no-vale-la-pena/',
      trazo:
        'M12 15.4a3.4 3.4 0 1 0 0-6.8 3.4 3.4 0 0 0 0 6.8Z M19.6 15.4a1.9 1.9 0 0 0 .38 2.1l.07.07a2.3 2.3 0 1 1-3.25 3.25l-.07-.07a1.9 1.9 0 0 0-3.22 1.35v.2a2.3 2.3 0 0 1-4.6 0v-.1a1.9 1.9 0 0 0-3.3-1.3l-.07.07a2.3 2.3 0 1 1-3.25-3.25l.07-.07A1.9 1.9 0 0 0 3.4 14a2.3 2.3 0 0 1 0-4.6h.1a1.9 1.9 0 0 0 1.3-3.3l-.07-.07A2.3 2.3 0 1 1 7.98 2.8l.7.07a1.9 1.9 0 0 0 2.1.38h.1a1.9 1.9 0 0 0 1.15-1.73v-.2a2.3 2.3 0 0 1 4.6 0v.1a1.9 1.9 0 0 0 3.3 1.3l.07-.07a2.3 2.3 0 1 1 3.25 3.25l-.7.07a1.9 1.9 0 0 0-.38 2.1v.1a1.9 1.9 0 0 0 1.73 1.15h.2',
    },
    {
      rol: 'Desarrollador',
      sintoma: 'Toco una clase y se caen quince pruebas que no miraban eso.',
      texto: 'Necesitas escribir pruebas que sobrevivan al siguiente refactor.',
      empieza: 'Una suite que no depende de nadie',
      href: '/notas/suite-sin-sitios-de-terceros/',
      trazo: 'm8.4 8.2-4.6 3.8 4.6 3.8 M15.6 8.2l4.6 3.8-4.6 3.8 M13.6 4.6l-3.2 14.8',
    },
    {
      rol: 'Líder técnico',
      sintoma: 'Me piden automatizarlo todo y no tengo con qué sustentar qué sí y qué no.',
      texto: 'Tienes que decidir qué automatizar y sustentarlo con datos.',
      empieza: 'Casos de cliente, con sus cifras',
      href: '/portafolio',
      trazo: 'M4.2 19.4h15.6 M7.4 19.4V11 M12 19.4V5.6 M16.6 19.4v-5.6',
    },
  ],
};

export interface Curso {
  titulo: string;
  nivel: 'Inicial' | 'Intermedio' | 'Avanzado';
  duracion: string;
  descripcion: string;
  temas: string[];
  estado: 'Disponible' | 'Próximamente';
  enlace?: string;
}

export const cursos: Curso[] = [
  {
    titulo: 'Automatización web con Playwright y TypeScript',
    nivel: 'Intermedio',
    duracion: 'En preparación',
    descripcion:
      'Construir un framework E2E desde cero: arquitectura, localizadores que no se rompen, datos de prueba, paralelismo y ejecución en CI.',
    temas: ['Playwright', 'TypeScript', 'Arquitectura de suites', 'CI/CD', 'Reportería'],
    estado: 'Próximamente',
  },
  {
    titulo: 'El patrón Screenplay, en serio',
    nivel: 'Avanzado',
    duracion: 'En preparación',
    descripcion:
      'Actor, tasks, questions y abilities aplicados a una suite real. Cuándo el patrón paga y cuándo es sobreingeniería.',
    temas: ['Screenplay', 'Diseño de pruebas', 'Mantenibilidad', 'Patrones'],
    estado: 'Próximamente',
    enlace: 'https://github.com/Girek-Study/playwright-screenplay-ts',
  },
  {
    titulo: 'Pruebas de APIs y contract testing',
    nivel: 'Intermedio',
    duracion: 'En preparación',
    descripcion:
      'Validar servicios REST y SOAP más allá del código 200: contratos, mapeo de campos, reglas de negocio e integridad de datos en migraciones.',
    temas: ['REST', 'SOAP', 'Contract testing', 'Postman', 'RestAssured', 'Karate'],
    estado: 'Próximamente',
  },
  {
    titulo: 'IA aplicada al testing, sin soltar el volante',
    nivel: 'Intermedio',
    duracion: 'En preparación',
    descripcion:
      'Usar LLMs para diseñar escenarios, analizar cobertura y priorizar pruebas — y dónde está el límite en el que la revisión humana deja de ser opcional.',
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
