// ============================================================================
//  CASOS DE TRABAJO — Proyectos reales, descritos sin datos confidenciales.
//
//  Los repositorios abiertos NO van aquí: esa lista se lee sola de la API de
//  GitHub (ver src/data/github.ts). Aquí solo entra trabajo de cliente, contado
//  a nivel de problema, decisión y resultado.
// ============================================================================

import type { Bilingue } from '../i18n';

/* `categoria` y `sector` siguen siendo claves en espanol, no texto traducido:
 * son el identificador con el que filtra la pagina y con el que se agrupan los
 * casos. Su traduccion vive en el diccionario (`portafolio.categorias` y
 * `portafolio.sectores`), que es donde se puede cambiar una etiqueta sin tocar
 * el dato ni romper el filtro. */
export interface Proyecto {
  titulo: Bilingue;
  resumen: Bilingue;
  categoria: 'Automatización' | 'APIs y backend' | 'Liderazgo' | 'IA aplicada' | 'Rendimiento';
  /** El dominio donde ocurrió. Ordena la lista mejor que la categoría técnica. */
  sector: 'Banca' | 'Salud' | 'Fintech' | 'Retail' | 'Transversal';
  tags: string[];
  /**
   * La cifra del caso, cuando existe. Sale del propio resumen: si no está ahí,
   * este campo se queda vacío. Un número sin respaldo desmiente todo lo demás.
   */
  metrica?: { valor: string; etiqueta: Bilingue };
  repo?: string;
  demo?: string;
  destacado?: boolean;
}

export const proyectos: Proyecto[] = [
  {
    titulo: {
      es: 'Modernización de servicios XML a JSON — banca',
      en: 'Modernizing XML services to JSON — banking',
    },
    resumen: {
      es: 'Certificación de servicios críticos durante su migración: validación de contratos, mapeo de campos, reglas de negocio e integridad de datos entre el servicio legacy y el migrado, comparando ambos y analizando cada inconsistencia antes de liberar.',
      en:
        'Certification of critical services during their migration: contract validation, field mapping, business rules and data integrity between the legacy service and the migrated one, comparing both and analysing every inconsistency before release.',
    },
    categoria: 'APIs y backend',
    sector: 'Banca',
    tags: ['REST', 'SOAP', 'JSON', 'XML', 'SQL', 'Azure DevOps'],
    destacado: true,
  },
  {
    titulo: {
      es: 'Agendamiento médico — estrategia E2E con Screenplay',
      en: 'Medical scheduling — E2E strategy with Screenplay',
    },
    resumen: {
      es: 'Estrategia y automatización de los flujos de agenda y reserva de una red de salud privada. Playwright y TypeScript bajo patrón Screenplay, validación de datos con SQL y pruebas de carga con k6 sobre los servicios de agenda.',
      en:
        'Strategy and automation of the scheduling and booking flows of a private healthcare network. Playwright and TypeScript under the Screenplay pattern, data validation with SQL and load testing with k6 against the scheduling services.',
    },
    categoria: 'Automatización',
    sector: 'Salud',
    tags: ['Playwright', 'TypeScript', 'Screenplay', 'k6', 'SQL'],
    destacado: true,
  },
  {
    titulo: {
      es: 'Framework de automatización de una fintech',
      en: "A fintech's automation framework",
    },
    resumen: {
      es: 'Diseño del framework para productos web y móviles: Page Object Model, Data-Driven y BDD, con ejecución paralela en contenedores sobre Jenkins y GitLab CI. Redujo 70% el tiempo de validación por release y elevó 50% la eficiencia de la suite.',
      en:
        'Framework design for web and mobile products: Page Object Model, Data-Driven and BDD, running in parallel inside containers on Jenkins and GitLab CI. It cut validation time per release by 70% and raised suite efficiency by 50%.',
    },
    categoria: 'Automatización',
    sector: 'Fintech',
    tags: ['Playwright', 'BDD', 'Docker', 'Jenkins', 'GitLab CI'],
    metrica: { valor: '-70%', etiqueta: { es: 'tiempo de validación por release', en: 'validation time per release' } },
    destacado: true,
  },
  {
    titulo: {
      es: 'Chapter de calidad para banca digital',
      en: 'Quality chapter for digital banking',
    },
    resumen: {
      es: 'Liderazgo de 15 ingenieros de calidad distribuidos en varias tribus de producto: estándares comunes de framework y reportería, +20% de cobertura automatizada, pruebas de rendimiento y seguridad dentro del pipeline, y un programa de mentoría para los ingenieros junior.',
      en:
        'Leading 15 quality engineers spread across several product tribes: shared framework and reporting standards, +20% automated coverage, performance and security testing inside the pipeline, and a mentoring program for the junior engineers.',
    },
    categoria: 'Liderazgo',
    sector: 'Banca',
    tags: ['Estrategia de QA', 'Mentoría', 'Selenium', 'SerenityBDD', 'CI/CD'],
    metrica: { valor: '15', etiqueta: { es: 'ingenieros de calidad liderados', en: 'quality engineers led' } },
  },
  {
    titulo: {
      es: 'Programa de recompensas — automatización multicanal',
      en: 'Rewards program — multichannel automation',
    },
    resumen: {
      es: 'Calidad de una plataforma de rewards en web, Android e iOS: automatización E2E de los flujos críticos —OTP, acumulación, canje e historial transaccional— y validación de la consistencia entre los tres canales contra los criterios de aceptación.',
      en:
        'Quality for a rewards platform on web, Android and iOS: E2E automation of the critical flows —OTP, accrual, redemption and transaction history— and consistency checks across the three channels against the acceptance criteria.',
    },
    categoria: 'Automatización',
    sector: 'Retail',
    tags: ['Web', 'Android', 'iOS', 'API Testing', 'Regresión'],
    metrica: { valor: '3', etiqueta: { es: 'canales: web, Android e iOS', en: 'channels: web, Android and iOS' } },
  },
  {
    titulo: {
      es: 'Diseño de pruebas asistido por IA',
      en: 'AI-assisted test design',
    },
    resumen: {
      es: 'Flujo con LLMs para generar casos de prueba, analizar cobertura y priorizar escenarios, acortando el tiempo de diseño y el mantenimiento de la suite. Toda salida del modelo pasa por revisión humana antes de convertirse en un caso ejecutable.',
      en:
        'An LLM-backed flow to draft test cases, analyse coverage and prioritise scenarios, shortening design time and suite maintenance. Every model output goes through human review before it becomes an executable case.',
    },
    categoria: 'IA aplicada',
    sector: 'Transversal',
    tags: ['LLM', 'Diseño de pruebas', 'Cobertura', 'Revisión humana'],
  },
];
