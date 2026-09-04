// ============================================================================
//  CASOS DE TRABAJO — Proyectos reales, descritos sin datos confidenciales.
//
//  Los repositorios abiertos NO van aquí: esa lista se lee sola de la API de
//  GitHub (ver src/data/github.ts). Aquí solo entra trabajo de cliente, contado
//  a nivel de problema, decisión y resultado.
// ============================================================================

export interface Proyecto {
  titulo: string;
  resumen: string;
  categoria: 'Automatización' | 'APIs y backend' | 'Liderazgo' | 'IA aplicada' | 'Rendimiento';
  tags: string[];
  repo?: string;
  demo?: string;
  destacado?: boolean;
}

export const proyectos: Proyecto[] = [
  {
    titulo: 'Modernización de servicios XML a JSON — banca',
    resumen:
      'Certificación de servicios críticos durante su migración: validación de contratos, mapeo de campos, reglas de negocio e integridad de datos entre el servicio legacy y el migrado, comparando ambos y analizando cada inconsistencia antes de liberar.',
    categoria: 'APIs y backend',
    tags: ['REST', 'SOAP', 'JSON', 'XML', 'SQL', 'Azure DevOps'],
    destacado: true,
  },
  {
    titulo: 'Agendamiento médico — estrategia E2E con Screenplay',
    resumen:
      'Estrategia y automatización de los flujos de agenda y reserva de una red de salud privada. Playwright y TypeScript bajo patrón Screenplay, validación de datos con SQL y pruebas de carga con k6 sobre los servicios de agenda.',
    categoria: 'Automatización',
    tags: ['Playwright', 'TypeScript', 'Screenplay', 'k6', 'SQL'],
    destacado: true,
  },
  {
    titulo: 'Framework de automatización de una fintech',
    resumen:
      'Diseño del framework para productos web y móviles: Page Object Model, Data-Driven y BDD, con ejecución paralela en contenedores sobre Jenkins y GitLab CI. Redujo 70% el tiempo de validación por release y elevó 50% la eficiencia de la suite.',
    categoria: 'Automatización',
    tags: ['Playwright', 'BDD', 'Docker', 'Jenkins', 'GitLab CI'],
    destacado: true,
  },
  {
    titulo: 'Chapter de calidad para banca digital',
    resumen:
      'Liderazgo de 15 ingenieros de calidad distribuidos en varias tribus de producto: estándares comunes de framework y reportería, +20% de cobertura automatizada, pruebas de rendimiento y seguridad dentro del pipeline, y un programa de mentoría para los ingenieros junior.',
    categoria: 'Liderazgo',
    tags: ['Estrategia de QA', 'Mentoría', 'Selenium', 'SerenityBDD', 'CI/CD'],
  },
  {
    titulo: 'Programa de recompensas — automatización multicanal',
    resumen:
      'Calidad de una plataforma de rewards en web, Android e iOS: automatización E2E de los flujos críticos —OTP, acumulación, canje e historial transaccional— y validación de la consistencia entre los tres canales contra los criterios de aceptación.',
    categoria: 'Automatización',
    tags: ['Web', 'Android', 'iOS', 'API Testing', 'Regresión'],
  },
  {
    titulo: 'Diseño de pruebas asistido por IA',
    resumen:
      'Flujo con LLMs para generar casos de prueba, analizar cobertura y priorizar escenarios, acortando el tiempo de diseño y el mantenimiento de la suite. Toda salida del modelo pasa por revisión humana antes de convertirse en un caso ejecutable.',
    categoria: 'IA aplicada',
    tags: ['LLM', 'Diseño de pruebas', 'Cobertura', 'Revisión humana'],
  },
];
