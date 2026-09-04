// ============================================================================
//  PORTAFOLIO — Reemplaza con tus proyectos reales (repos, demos, casos).
// ============================================================================

export interface Proyecto {
  titulo: string;
  resumen: string;
  // Etiqueta de categoría
  categoria: 'Automatización' | 'Web' | 'Backend' | 'Enseñanza' | 'Herramienta';
  tags: string[];
  // Enlaces opcionales
  repo?: string;
  demo?: string;
  // Destacar en la portada
  destacado?: boolean;
}

export const proyectos: Proyecto[] = [
  {
    titulo: 'Framework E2E con Screenplay',
    resumen:
      'Framework de automatización de pruebas end-to-end basado en el patrón Screenplay sobre TypeScript y Playwright, pensado para escalar en equipos grandes.',
    categoria: 'Automatización',
    tags: ['Playwright', 'TypeScript', 'Screenplay', 'CI/CD'],
    destacado: true,
  },
  {
    titulo: 'Dashboard de Rewards',
    resumen:
      'Aseguramiento de calidad y validación de datos de un dashboard de programa de recompensas, con generación automatizada de casos de prueba.',
    categoria: 'Web',
    tags: ['JavaScript', 'Data QA', 'Dashboard'],
    destacado: true,
  },
  {
    titulo: 'Generador de Casos de Prueba (QATouch)',
    resumen:
      'Herramienta para generar y organizar casos de prueba automáticamente a partir de requisitos, acelerando el trabajo del equipo QA.',
    categoria: 'Herramienta',
    tags: ['Automatización', 'Productividad', 'QA'],
    destacado: true,
  },
  {
    titulo: 'Suite de API Testing',
    resumen:
      'Colección de pruebas automatizadas para servicios backend en .NET, con validación de contratos y ejecución en CI.',
    categoria: 'Backend',
    tags: ['C# / .NET', 'API Testing', 'CI/CD'],
  },
  {
    titulo: 'Girek Study — Plataforma de cursos',
    resumen:
      'Proyecto de enseñanza de QA y automatización con material práctico, ejercicios y proyectos guiados.',
    categoria: 'Enseñanza',
    tags: ['Educación', 'QA', 'Mentoría'],
  },
  // TODO: agrega tus proyectos reales con sus enlaces a repos y demos.
];
