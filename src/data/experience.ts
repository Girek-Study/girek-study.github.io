// ============================================================================
//  TRAYECTORIA PROFESIONAL — Reemplaza con tu experiencia real de LinkedIn.
//  Orden: de más reciente a más antigua.
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
    empresa: 'Elipgo',
    cargo: 'QA Automation Engineer',
    periodo: '2024 — Presente',
    ubicacion: 'Remoto',
    descripcion:
      'Diseño y mantenimiento del framework de automatización de pruebas E2E con el patrón Screenplay sobre TypeScript.',
    logros: [
      'Implementación del patrón Screenplay para suites de pruebas legibles y escalables.',
      'Integración de pruebas automatizadas en pipelines de CI/CD.',
      'Reducción del tiempo de regresión y aumento de la cobertura de pruebas.',
    ],
    stack: ['Playwright', 'TypeScript', 'Screenplay', 'CI/CD'],
  },
  {
    empresa: 'RedSalud',
    cargo: 'QA Automation Engineer',
    periodo: '2023 — 2024',
    ubicacion: 'Remoto',
    descripcion:
      'Automatización de pruebas para el ecosistema de agendamiento médico (frontend React y backend .NET).',
    logros: [
      'Pruebas E2E sobre frontends en React y servicios backend en .NET.',
      'Validación de flujos críticos de agenda y reservas de pacientes.',
    ],
    stack: ['C# / .NET', 'React', 'Selenium', 'API Testing'],
  },
  {
    empresa: 'Delosi — Starbucks Rewards',
    cargo: 'QA Engineer',
    periodo: '2022 — 2023',
    ubicacion: 'Lima, Perú',
    descripcion:
      'Aseguramiento de calidad del programa de recompensas y su dashboard de datos.',
    logros: [
      'Pruebas funcionales y de datos sobre el dashboard de Rewards.',
      'Generación y validación de casos de prueba automatizados.',
    ],
    stack: ['JavaScript', 'API Testing', 'SQL'],
  },
  // TODO: agrega o ajusta experiencias según tu LinkedIn real.
];

// Certificaciones (edítalas)
export const certificaciones: { nombre: string; emisor: string; anio?: string }[] = [
  { nombre: 'ISTQB Certified Tester — Foundation Level', emisor: 'ISTQB', anio: '2023' },
  // TODO: agrega tus certificaciones reales.
];

// Educación (edítala)
export const educacion: { titulo: string; institucion: string; periodo?: string }[] = [
  {
    titulo: 'Ingeniería de Sistemas / Software',
    institucion: 'Tu universidad',
    periodo: '20XX — 20XX',
  },
  // TODO: completa con tu formación real.
];
