// ============================================================================
//  GIREK STUDY — Proyecto de enseñanza. Edita cursos, temario y testimonios.
// ============================================================================

export const girekStudy = {
  titulo: 'Girek Study',
  lema: 'Aprende QA y automatización de pruebas con proyectos reales.',
  descripcion:
    'Girek Study es mi proyecto de enseñanza: formo a futuros QA y desarrolladores en automatización de pruebas con un enfoque 100% práctico, partiendo de cero hasta construir frameworks listos para producción.',
  paraQuien: [
    'Personas que quieren iniciar su carrera en QA.',
    'Desarrolladores que buscan dominar la automatización de pruebas.',
    'Equipos que necesitan escalar su estrategia de testing.',
  ],
};

export interface Curso {
  titulo: string;
  nivel: 'Inicial' | 'Intermedio' | 'Avanzado';
  duracion: string;
  descripcion: string;
  temas: string[];
  // 'Disponible' | 'Próximamente'
  estado: 'Disponible' | 'Próximamente';
  enlace?: string;
}

export const cursos: Curso[] = [
  {
    titulo: 'Fundamentos de QA',
    nivel: 'Inicial',
    duracion: '4 semanas',
    descripcion:
      'Bases del aseguramiento de calidad: tipos de pruebas, ciclo de vida del bug, diseño de casos de prueba y mentalidad QA.',
    temas: ['Tipos de pruebas', 'Casos de prueba', 'Gestión de defectos', 'Metodologías ágiles'],
    estado: 'Próximamente',
  },
  {
    titulo: 'Automatización Web con Playwright',
    nivel: 'Intermedio',
    duracion: '6 semanas',
    descripcion:
      'Construye un framework de pruebas E2E desde cero con Playwright y TypeScript, aplicando buenas prácticas.',
    temas: ['Playwright', 'TypeScript', 'Page Object / Screenplay', 'Reportes', 'CI/CD'],
    estado: 'Próximamente',
  },
  {
    titulo: 'API Testing & Backend QA',
    nivel: 'Intermedio',
    duracion: '4 semanas',
    descripcion:
      'Pruebas de servicios REST, validación de contratos y automatización de APIs con Postman y código.',
    temas: ['REST', 'Postman', 'Validación de contratos', 'Automatización de APIs'],
    estado: 'Próximamente',
  },
  {
    titulo: 'Patrón Screenplay Avanzado',
    nivel: 'Avanzado',
    duracion: '5 semanas',
    descripcion:
      'Diseño de suites mantenibles y escalables aplicando el patrón Screenplay en proyectos reales.',
    temas: ['Screenplay', 'Arquitectura de pruebas', 'Escalabilidad', 'Patrones de diseño'],
    estado: 'Próximamente',
  },
];

export interface Testimonio {
  nombre: string;
  rol: string;
  texto: string;
}

// Vacío a propósito. Un testimonio inventado se nota, y cuesta más credibilidad
// de la que aporta. La sección aparece sola cuando haya alumnos reales que citar.
export const testimonios: Testimonio[] = [];
