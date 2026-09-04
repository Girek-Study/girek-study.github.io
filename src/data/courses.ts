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
  paraQuien: [
    'QA manuales que quieren dar el salto a la automatización sin quedarse en el tutorial.',
    'Automatizadores con una suite que ya cuesta más mantener de lo que aporta.',
    'Desarrolladores que necesitan escribir pruebas que sobrevivan al siguiente refactor.',
    'Líderes técnicos que tienen que decidir qué automatizar y sustentarlo con datos.',
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
