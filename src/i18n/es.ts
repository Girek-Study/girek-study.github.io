// ============================================================================
//  DICCIONARIO — Español. Es el original: lo que ya decía el sitio.
//
//  `en.ts` tiene exactamente la misma forma, y TypeScript lo comprueba en el
//  build. Si alguien añade una cadena aquí y se olvida de traducirla, el
//  despliegue falla en lugar de publicar media página en español.
// ============================================================================

export const es = {
  // ---------------------------------------------------------------- navegación
  nav: {
    inicio: 'Inicio',
    trayectoria: 'Trayectoria',
    girekStudy: 'Girek Study',
    notas: 'Notas',
    portafolio: 'Portafolio',
    abrirMenu: 'Abrir menú',
    irAInicio: 'Girek Study — Inicio',
    saltarAlContenido: 'Saltar al contenido',
    idioma: 'Idioma',
    cambiarIdioma: 'Cambiar idioma',
  },

  // ---------------------------------------------------------------------- pie
  pie: {
    navega: 'Navega',
    conecta: 'Conecta',
    hablamos: '¿Hablamos?',
    invitacion: 'Cuéntame en qué punto está la calidad de lo que estás construyendo.',
    escribeme: 'Escríbeme',
    disponible: 'Abierto a propuestas · Remoto',
    descripcion: 'Automatización de pruebas y enseñanza de QA con Girek Study.',
    hechoCon: 'Hecho con Astro + Tailwind · Desplegado en GitHub Pages',
  },

  // ------------------------------------------------------------------ cabecera
  meta: {
    titulo: 'Girek Study — Automatización de pruebas y QA en español',
    descripcion:
      'La calidad no se repite: se programa. Frameworks abiertos que puedes clonar, con las decisiones de diseño explicadas. Por Giancarlo Palomino, Quality Engineer con 10 años en banca, fintech y salud.',
  },





  // ----------------------------------------------------------- trayectoria
  trayectoria: {
    meta: {
      titulo: 'Trayectoria',
      descripcion: (nombre: string) =>
        `Trayectoria profesional de ${nombre} en QA, automatización de pruebas y liderazgo de equipos de calidad.`,
    },
    decisionUnoTexto:
      'Si para tocar una prueba hay que preguntarme, el diseño falló. Nombres de negocio, capas separadas y decisiones explicadas.',
    decisionDosTexto:
      'Una prueba que alguien tiene que acordarse de ejecutar no protege nada. Corre en cada build o no cuenta.',
    decisionTresTexto:
      'Ningún modelo sabe si una diferencia es el cambio acordado o el defecto. Esa clasificación es donde está el criterio.',
    indice: {
      presentacion: 'Presentación',
      resultados: 'Resultados',
      clientes: 'Clientes',
      ia: 'IA aplicada',
      competencias: 'Competencias',
      recorrido: 'Recorrido',
      formacion: 'Formación',
    },
    iaCapas: 'capas donde la aplico, sin mezclarlas',
    iaUsos: 'usos dentro del ciclo de pruebas',
    iaRevision: 'bajo revisión humana, sin excepciones',
    /* Etiquetas de `competencias[].items` que no son nombre propio. Una que no
     * este aqui sale tal cual, que es lo correcto para 'Playwright'. */
    habilidades: {
      'Gobierno de QA': 'Gobierno de QA',
      'Estrategia de pruebas': 'Estrategia de pruebas',
      'Quality gates': 'Quality gates',
      'Release readiness': 'Release readiness',
      'Métricas y KPIs': 'Métricas y KPIs',
      'Mentoría': 'Mentoría',
      'Análisis predictivo': 'Análisis predictivo',
      'Automatización de procesos': 'Automatización de procesos',
      'Diseño de pruebas': 'Diseño de pruebas',
      'Contract testing': 'Contract testing',
      'Cobertura': 'Cobertura',
      'Revisión humana': 'Revisión humana',
    } as Record<string, string>,
    cierreNotas: 'Las notas',
    cierreEstudio: 'Girek Study',
    cierrePortafolio: 'El portafolio',
    rotulo: 'Trayectoria',
    entradillaUno:
      'Diseño la infraestructura de calidad de productos donde fallar cuesta caro: frameworks que otro equipo pueda mantener, pruebas que corren en cada build y agentes de IA que absorben el trabajo repetitivo.',
    entradillaDos: ' Empecé escribiendo código y nunca lo solté.',
    banderaDe: (pais: string) => `Bandera de ${pais}`,
    cvEnPdf: 'CV en PDF',
    enEstaPagina: 'En esta página',
    seccionesDeLaPagina: 'Secciones de la página',
    cerrar: 'Cerrar',
    visitarSitio: 'Visitar el sitio',
    desde: 'Desde',
    productos: 'Productos',

    presentacionRotulo: 'Presentación',
    presentacionTitulo: 'Cómo trabajo',
    presentacionBajada:
      'Diez años, cuatro países y una forma de trabajar que no depende de la herramienta de turno.',
    presentacionCita:
      'Empecé escribiendo código y nunca lo solté. Por eso discuto un pipeline o un contrato de API con desarrollo de igual a igual.',
    presentacionUno:
      'Empecé programando en Java y terminé liderando chapters de calidad en banca y fintech. En el camino aprendí que una suite no vale por cuántas pruebas tiene, sino por cuántas siguen corriendo dos años después sin que nadie las pelee.',
    presentacionDos:
      'Hoy construyo frameworks que otro equipo pueda mantener, llevo las pruebas al pipeline para que el feedback llegue en minutos y no en días, y aplico IA al diseño y al análisis sin soltarle el volante.',
    conQueConstruyo: 'Con lo que construyo a diario',
    tresDecisiones: 'Tres decisiones que tomo en todo proyecto',
    decisionUno: 'Construyo para que lo mantenga el equipo',
    decisionDos: 'Lo que no está en el pipeline no existe',
    decisionTres: 'La IA propone, la decisión es humana',

    resultadosRotulo: 'Resultados',
    resultadosTitulo: 'Lo que se movió cuando estuve',
    resultadosBajada: 'Cifras del CV, cada una con el contexto en el que ocurrió.',

    clientesRotulo: 'Dónde',
    clientesTitulo: 'Productos que pasaron por mis manos',
    clientesBajada:
      'Pulsa cualquier logotipo para ver desde qué empresa trabajé para ese cliente y qué se hizo ahí.',

    iaRotulo: 'IA aplicada',
    iaTitulo: 'Dónde entra la IA en mi trabajo',
    iaBajada:
      'Tres capas distintas, y conviene no mezclarlas: construir herramientas propias, meter modelos dentro del ciclo de pruebas, y probar productos que llevan IA por dentro.',
    iaModelos: 'Modelos',
    iaAgentes: 'Agentes y herramientas que construí',
    iaSoftwarePropio: 'software propio, en producción',
    iaVerModelo: 'Ver el modelo',
    iaComoFunciona: 'Cómo funciona',
    iaElAgente: 'El agente',
    iaDondeActua: 'Dónde actúa en el ciclo',
    iaBajoRevision: 'Bajo revisión humana',
    iaEnElCicloTitulo: 'IA dentro del ciclo de pruebas',
    iaEnElCicloTexto:
      'Aplicado en proyectos de cliente, con una regla fija: ninguna salida del modelo se convierte en un caso ejecutable ni en un defecto reportado sin revisión humana.',

    competenciasRotulo: 'Qué sé hacer',
    competenciasTitulo: 'Competencias',
    competenciasBajada:
      'Lo que defiendo en una entrevista técnica, agrupado por para qué sirve.',

    recorridoRotulo: 'Recorrido',
    recorridoTitulo: 'Etapa por etapa',
    recorridoBajada:
      'De las primeras prácticas al liderazgo técnico. Pulsa una etapa para ver qué hice ahí.',
    queHiceAhi: 'Qué hice ahí',
    queCubri: 'Qué cubrí',
    herramientas: 'Herramientas',
    dondeCae: 'Dónde cae en el recorrido',
    primerasPracticas: 'Primeras prácticas',

    formacionRotulo: 'Formación',
    formacionTitulo: 'Estudios y certificaciones',
    formacionBajada: 'Lo que está acreditado por un tercero, no lo que digo yo.',
    educacion: 'Educación',
    certificaciones: 'Certificaciones',
    idiomas: 'Idiomas',

    cierreTitulo: 'Todo esto lo publico en abierto',
    cierreTexto:
      'Los frameworks que construyo, las decisiones de diseño detrás de cada uno y lo que aprendo por el camino. El código se puede clonar y las notas se leen sin registrarse. Las clases vienen después.',
    cierreNotasDetalle: 'Lo que aprendo por el camino, sin registro ni muro de pago.',
    cierreEstudioDetalle: 'El plan de las clases: qué se enseña y en qué orden.',
    cierrePortafolioDetalle: 'Los repositorios abiertos, listos para clonar y leer.',
  },

  // ---------------------------------------------------------------- portada
  inicio: {
    heroCredencial: '10 años de experiencia en QA · IA',
    heroCargo: 'QE Automation Lead · ISTQB',
    cierreTextoDos: 'Respondo con lo que haría yo, aunque no acabemos trabajando juntos.',
    bienvenida: 'Bienvenido a Girek Study',
    titularUno: 'La calidad no se repite.',
    titularDos: 'Se programa.',
    entradilla:
      'Probar no es seguir un guion paso a paso. Es escribir el código que recorre lo que ningún guion alcanzaría, y que lo vuelve a hacer en cada release sin cansarse.',
    cita: 'Lo que no está en el pipeline no es una prueba: es una esperanza.',
    verCodigo: 'Ver el código',
    conoceme: 'Conoce a Girek',
    stackRotulo: 'El stack con el que construyo',
    hayMas: 'Hay más abajo',

    puertasRotulo: 'Qué vas a encontrar',
    puertasTitulo: 'Lo que falta es lo de después',
    puertasTexto:
      'Casi todo el buen material sobre automatización está en inglés, y lo que hay en español se queda en el «hola mundo»: instalar la herramienta, escribir un test, fin. Lo que falta es cómo se sostiene una suite de trescientas pruebas, por qué se vuelve inmantenible y qué decisiones evitan llegar ahí. Eso es lo que publico acá, con el código a la vista y el porqué de cada decisión.',

    codigoEtiqueta: 'Código',
    codigoContador: (n: number) => (n === 1 ? '1 repositorio abierto' : `${n} repositorios abiertos`),
    codigoTitulo: 'Frameworks que puedes clonar',
    codigoTexto:
      'Implementaciones completas y funcionando, con su CI en verde. No fragmentos de tutorial: el esqueleto que uso para arrancar una suite de verdad.',
    escrituraEtiqueta: 'Escritura',
    escrituraContador: (n: number) => (n === 1 ? '1 nota publicada' : `${n} notas publicadas`),
    escrituraTitulo: 'Decisiones y errores caros',
    escrituraTexto:
      'Por qué una suite se vuelve inmantenible, cuándo un patrón no vale la pena y qué se rompe en producción sin que la interfaz muestre nada.',
    leerNotas: 'Leer las notas',
    ensenanzaEtiqueta: 'Enseñanza',
    enPreparacion: 'En preparación',
    ensenanzaTitulo: 'Clases en vivo',
    ensenanzaTexto:
      'Rutas guiadas de automatización, de los fundamentos a un framework listo para producción. Todavía no abren; el material abierto ya está aquí.',
    verTemario: 'Ver el temario',

    portafolioRotulo: 'Portafolio',
    portafolioTitulo: 'Proyectos destacados',
    portafolioNota: 'Una selección de trabajo en automatización, calidad y producto.',
    verTodos: 'Ver todos',

    notasRotulo: 'Notas',
    notasTitulo: 'Lo último que escribí',
    notasNota: 'Decisiones de diseño y errores que costaron caro, sin relleno.',
    todasLasNotas: 'Todas las notas',

    bandaRotulo: 'Proyecto de enseñanza',
    explorarCursos: 'Explorar cursos',
    piezaFrameworks: 'Frameworks abiertos',
    piezaFrameworksDetalle: 'Playwright, Screenplay y TypeScript, listos para clonar.',
    piezaDecisiones: 'Las decisiones, explicadas',
    piezaDecisionesDetalle: 'Por qué cada pieza está donde está, y qué pasa si no.',
    piezaRutas: 'Rutas guiadas',
    piezaRutasDetalle: 'De los fundamentos a una suite que aguanta en producción.',
    disponible: 'Disponible',

    cierreDisponible: 'Abierto a propuestas · Remoto',
    cierreTituloUno: 'Hablemos de tu próximo',
    cierreTituloResalte: 'proyecto de calidad',
    cierreTexto:
      'Cuéntame qué estás construyendo y en qué punto está la calidad. Respondo con lo que haría',
    canalEscribeme: 'Escríbeme',
    canalLinkedin: 'Perfil y publicaciones',
  },

  // ---------------------------------------------------------------- notas
  notas: {
    meta: {
      titulo: 'Notas — Girek Study',
      descripcion:
        'Apuntes sobre automatización de pruebas, calidad de software y las decisiones de diseño que sostienen una suite a lo largo del tiempo.',
    },
    notaEnArchivo: (n: number) => (n === 1 ? 'nota en el archivo' : 'notas en el archivo'),
    leer: 'Leer',
    encontrada: (n: number) => (n === 1 ? 'nota encontrada' : 'notas encontradas'),
    rotulo: 'Notas',
    titular: 'Lo que aprendo escribiendo pruebas',
    bajada:
      'Decisiones de diseño, errores que costaron caro y cosas que ojalá me hubieran contado antes. Escritas desde el proyecto en el que ocurrieron, sin relleno.',
    unaNota: (n: number) => (n === 1 ? 'nota' : 'notas'),
    temas: 'temas',
    deLectura: 'de lectura',
    minutos: 'min',
    minutosDeLectura: (n: number) => `${n} min de lectura`,
    rss: 'Suscribirse por RSS · sin registro ni muro de pago',

    ultimo: 'Lo último',
    loQueHayDentro: 'Lo que hay dentro',
    leerLaNota: 'Leer la nota',
    filtrarPorTema: 'Filtrar por tema',
    todas: 'Todas',

    archivoRotulo: 'El archivo',
    archivoTitulo: 'Todo lo demás',
    archivoNota: 'Busca por título, por tema o por lo que hay dentro de cada nota.',
    buscarEntre: (n: number) => `Buscar entre ${n} notas…`,
    buscarNotas: 'Buscar notas',
    limpiarBusqueda: 'Limpiar la búsqueda',
    sinNotas: 'Todavía no hay notas publicadas.',
    borrador: 'borrador',
    sinCoincidencias: 'Ninguna nota coincide con',
    verTodas: 'Ver todas las notas',
    verMas: 'Ver más notas',

    cierreRotulo: '¿Hablamos?',
    cierreTitulo: 'Si algo de esto te suena, cuéntamelo',
    cierreTexto:
      'Cada una de estas notas salió de un proyecto real. Si estás en uno parecido, escríbeme y te cuento qué haría yo, aunque no acabemos trabajando juntos.',
    cierreEscribeme: 'Escríbeme',
    cierreCodigo: 'El código',
    cierreCodigoDetalle: 'Los repositorios abiertos, listos para clonar.',
    cierreRss: 'Por RSS',
    cierreRssDetalle: 'El canal avisa cuando sale una nueva.',

    /* Solo se pinta en la version inglesa. Decirlo de frente cuesta menos que
     * un lector que abre una nota y se encuentra otro idioma sin aviso. */
    avisoIdioma: '',
  },

  // ------------------------------------------------------------ girek study
  estudio: {
    meta: { titulo: 'Girek Study — Enseñanza de QA y automatización' },
    rotulo: ['Aprende', 'Practica', 'Avanza'],
    lemaAntes: 'Automatización de pruebas en',
    lemaResalte: 'español',
    bajada:
      'Lo que falta es lo de después: cómo se sostiene una suite de trescientas pruebas y qué decisiones de diseño evitan que se vuelva inmantenible.',
    verTemario: 'Ver el temario',
    verCodigo: 'Ver el código abierto',
    sinClases: 'Las clases todavía no abren',
    cursosAbiertos: (n: number) => `${n} cursos abiertos`,
    conQueSeTrabaja: 'Con lo que se trabaja',
    repositorios: (n: number) => (n === 1 ? 'repositorio abierto' : 'repositorios abiertos'),
    notasPublicadas: (n: number) => (n === 1 ? 'nota publicada' : 'notas publicadas'),
    rutas: (n: number) => (n === 1 ? 'ruta en preparación' : 'rutas en preparación'),
    empezarPorNotas: 'Empezar por las notas',

    paraQuienRotulo: 'Para quién es',
    paraQuienTitulo: 'A quién le sirve esto',
    paraQuienNota:
      'Cuatro puntos de partida distintos. El material es el mismo; lo que cambia es por dónde conviene entrar.',
    empiezaPor: 'Empieza por',

    programaRotulo: 'Programa',
    programaTitulo: 'Cursos y rutas',
    programaNota:
      'De los fundamentos hasta frameworks listos para producción. Ninguno ha abierto todavía.',
    niveles: {
      Inicial: 'Inicial',
      Intermedio: 'Intermedio',
      Avanzado: 'Avanzado',
    } as Record<string, string>,
    abierto: 'Abierto',
    codigoYa: 'El código, ya',

    comunidadRotulo: 'Comunidad',
    comunidadTitulo: 'Lo que dicen mis estudiantes',

    cierreRotulo: 'Mientras tanto',
    cierreTitulo: 'El material abierto ya está publicado',
    cierreTexto:
      'No hace falta esperar a que abran las clases. Los frameworks se pueden clonar hoy y las notas explican las decisiones de diseño detrás de cada uno. Escríbeme si quieres que te avise cuando abra la primera cohorte.',
    cierreCodigo: 'El código',
    cierreCodigoDetalle: 'Los repositorios abiertos, listos para clonar y leer.',
    cierreNotas: 'Las notas',
    cierreNotasDetalle: 'Lo que aprendo por el camino, sin registro ni muro de pago.',
    cierreAviso: 'Avísame',
    cierreAvisoDetalle: 'Te escribo cuando abra la primera cohorte.',
    asuntoCorreo: 'Quiero%20info%20de%20Girek%20Study',
  },

  // ----------------------------------------------------------------- portafolio
  portafolio: {
    meta: {
      titulo: 'Portafolio',
      descripcion:
        'Portafolio de proyectos de automatización, QA, web y enseñanza de Giancarlo (Girek) Palomino.',
    },

    /* Las claves son los valores de `categoria`, `sector` y `tags` en
     * src/data/projects.ts. Aquí solo se traducen: el dato no cambia, así que
     * el filtro sigue funcionando igual en los dos idiomas. */
    categorias: {
      'Automatización': 'Automatización',
      'APIs y backend': 'APIs y backend',
      Liderazgo: 'Liderazgo',
      'IA aplicada': 'IA aplicada',
      Rendimiento: 'Rendimiento',
    } as Record<string, string>,
    sectores: {
      Banca: 'Banca',
      Salud: 'Salud',
      Fintech: 'Fintech',
      Retail: 'Retail',
      Transversal: 'Transversal',
    } as Record<string, string>,
    /* Solo las etiquetas que son español y no nombre propio. Una que no esté
     * aquí se muestra tal cual, que es lo que debe pasar con 'Playwright'. */
    etiquetas: {
      'Estrategia de QA': 'Estrategia de QA',
      'Mentoría': 'Mentoría',
      'Diseño de pruebas': 'Diseño de pruebas',
      Cobertura: 'Cobertura',
      'Revisión humana': 'Revisión humana',
      'Regresión': 'Regresión',
    } as Record<string, string>,
    rotulo: 'Portafolio',
    titular: 'Lo que he construido',
    entradilla:
      'Casos de cliente contados a nivel de problema, decisión y resultado —sin datos ni material confidencial— y el código abierto que cualquiera puede clonar y leer.',
    cifras: { casos: 'Casos', repos: 'Repos', sectores: 'Sectores' },
    notaApi:
      'La lista de repositorios no se mantiene a mano: sale de la API de GitHub en cada despliegue.',
    verCuenta: 'Ver la cuenta en GitHub',

    casosRotulo: 'Casos de trabajo',
    casosTitulo: 'Proyectos de cliente',
    casosNota: 'Cada uno con el sector donde ocurrió y, cuando la hay, la cifra que quedó.',
    filtrarPorCategoria: 'Filtrar por categoría',
    todos: 'Todos',
    destacado: 'Destacado',
    codigo: 'Código',
    demo: 'Demo',
    sinCasos: 'No hay casos en esta categoría todavía.',

    reposRotulo: 'Código abierto',
    reposTitulo: 'Repositorios',
    reposNota: 'Todo lo que publico en GitHub, con el código a la vista y licencia permisiva.',
    repositorio: 'Repositorio',
    verCodigo: 'Ver código',
    verCodigoDe: (nombre: string) => `Ver el código de ${nombre} en GitHub`,
    documentacion: 'Documentación de calidad',
    sinGitHub: 'No se pudo consultar GitHub en este momento.',
    verDirectamente: 'Ver la cuenta directamente →',
  },

  // ------------------------------------------------------------------- tiempos
  tiempo: {
    hoy: 'hoy',
    ayer: 'ayer',
    haceDias: (n: number) => `hace ${n} días`,
    haceMeses: (n: number) => (n === 1 ? 'hace un mes' : `hace ${n} meses`),
    haceAnios: (n: number) => (n === 1 ? 'hace un año' : `hace ${n} años`),
  },
};

/**
 * La forma del diccionario sale del español, que es el original. Sin `as
 * const`: con él, cada cadena sería su propio tipo literal y `en.ts` no podría
 * declararse `Diccionario` —'Home' no es asignable a 'Inicio'—. Así las claves
 * se comprueban y los valores quedan libres, que es justo lo que hace falta.
 */
export type Diccionario = typeof es;
