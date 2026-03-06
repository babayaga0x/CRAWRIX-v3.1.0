type Translation = {
  title: string;
  subheading: string;
  placeholder: string;
  parseButton: string;
  results: string;
  noLinks: string;
  backButton: string;
  modalTitle: string;
  modalContent: string;
  supportTitle: string;
  supportContent: string;
  connectTitle: string;
  aggressiveModeText: string;
  normalModeText: string;
  changelogContent: string;
  changelogButton: string;
};

type Translations = {
  en: Translation;
  es: Translation;
};

export const translations: Translations = {
  en: {
    title: "Crawrix",
    subheading: "Look for everything you need",
    placeholder: "Enter keywords (separated by commas)",
    parseButton: "Parse",
    results: "Results:",
    noLinks: "No links found",
    backButton: "Back to Search",
    modalTitle: "About the service",
    modalContent:
      "Crawrix is an all-in-one SEO tool designed to improve keyword analysis, discover relevant backlinks, and boost your online visibility. By simplifying link building and keyword research, Crawrix helps SEO specialists, content creators, and digital marketers save time, grow traffic, and achieve higher rankings in search engines.",
    supportTitle: "Support the developer",
    supportContent:
      "If you find Crawrix valuable and want to support its development, consider making a donation. Your contribution helps us improve the tool, release new features, and keep Crawrix growing for the SEO community.",
    connectTitle: "Connect with the developer",
    aggressiveModeText: "Look for everything MORE you need",
    normalModeText: "Look for everything you need",
    changelogContent: `
    Version 3.0.0 – Changes Overview
    - Removed

    Aggressive mode from both frontend and backend.

    OpenLibrary API (no longer used for link fetching).

    Any UI components related to aggressive mode.

    Yahoo search included only as a basic fallback;

    Aggressive combined queries were removed.

    - Added

    Integration with Qwant API for keyword-specific searches.

    Integration with Hacker News API to fetch relevant posts.

    Integration with StackExchange API to search questions and answers exactly matching keywords.

    DuckDuckGo, Bing, Wikipedia, Reddit remain as search sources.

    Frontend automatically sends keywords and language to backend without any aggressive mode parameters.

    Exact keyword search for all APIs where possible to improve relevance.

    - Modified / Improved

    Refactored backend to synchronous requests (removed async) to simplify fetching from multiple APIs.

    Simplified frontend UI: removed aggressive mode toggle and related labels.

    Improved URL safety checks:

    Validate scheme (http/https)

    Block private, reserved, loopback, multicast IPs

    Block localhost domains

    Standardized maximum links per keyword to 15 across all sources.

    Backend enforces keywords list <=10 and keyword length <=50 characters.

    Added safer requests.Session() usage for all API calls.

    Improved error handling for fetch failures (returns empty list instead of crashing).

    Limiting API calls: 10 requests per minute per client IP via Flask-Limiter.

    Frontend now sends only safe parameters (keywords, lang) and uses Suspense for lazy-loaded components.

    Reduced dependency on IP for safety (more focus on URL validity and safe parsing).

    All previous aggressive mode CSS / UI classes removed.
    `,
    changelogButton: "Latest update 🆕",
  },
  es: {
    title: "Crawrix",
    subheading: "Busca todo lo que necesitas",
    placeholder: "Ingresa palabras clave (separadas por comas)",
    parseButton: "Parsear",
    results: "Resultados:",
    noLinks: "No se encontraron enlaces",
    backButton: "Volver a la búsqueda",
    modalTitle: "Sobre el servicio",
    modalContent: `Crawrix es una herramienta SEO todo en uno diseñada para mejorar el análisis de palabras clave, descubrir backlinks relevantes y aumentar tu visibilidad online.
    Al simplificar el link building y la investigación de palabras clave, Crawrix ayuda a especialistas en SEO, creadores de contenido y marketers digitales a ahorrar tiempo, aumentar el tráfico y lograr mejores posiciones en los motores de búsqueda.`,
    supportTitle: "Apoya al desarrollador",
    supportContent:
      "Si encuentras útil Crawrix y quieres apoyar su desarrollo, considera hacer una donación. Tu contribución nos ayuda a mejorar la herramienta, lanzar nuevas funciones y seguir haciendo crecer Crawrix para la comunidad SEO",
    connectTitle: "Conéctate con el desarrollador",
    aggressiveModeText: "Busca todo lo que MÁS necesitas",
    normalModeText: "Busca todo lo que necesitas",
    changelogContent: `
    Versión 3.0.0 - Resumen de cambios
    - Eliminado

    Modo agresivo tanto desde el frontend como desde el backend.

    API de OpenLibrary (ya no se usa para buscar enlaces).

    Cualquier componente de la interfaz de usuario relacionado con el modo agresivo (por ejemplo, AggressiveModeToggle en React).

    Yahoo search se incluyó solo como alternativa básica; se eliminaron las consultas combinadas agresivas.

    - Añadido

    Integración con la API de Qwant (motor de búsqueda gratuito) para búsquedas específicas de palabras clave.

    Integración con Hacker News API para obtener publicaciones relevantes.

    Integración con la API de StackExchange para buscar preguntas y respuestas que coincidan exactamente con las palabras clave.

    DuckDuckGo, Bing, Wikipedia, Reddit permanecen como fuentes de búsqueda.

    La interfaz envía automáticamente palabras clave e idioma al backend sin ningún parámetro de modo agresivo.

    Búsqueda exacta de palabras clave para todas las API siempre que sea posible para mejorar la relevancia.

    - Modificado / mejorado

    Backend refactorizado para solicitudes síncronas (eliminado asíncrono) para simplificar la obtención de múltiples API.

    Interfaz de usuario simplificada: se eliminó el interruptor de modo agresivo y las etiquetas relacionadas.

    Comprobaciones de seguridad de URL mejoradas:

    Validar esquema (http / https)

    Bloquear direcciones IP privadas, reservadas, de bucle invertido y multidifusión

    Bloquear dominios localhost

    Enlaces máximos estandarizados por palabra clave a 15 en todas las fuentes.

    El backend impone una lista de palabras clave < = 10 y una longitud de palabra clave <=50 caracteres.

    Se agregaron solicitudes más seguras.Uso de Session () para todas las llamadas API.

    Manejo de errores mejorado para fallas de recuperación (devuelve una lista vacía en lugar de fallar).

    Limitación de llamadas API: 10 solicitudes por minuto por IP de cliente a través de Flask-Limiter.

    La interfaz ahora envía solo parámetros seguros (palabras clave, idioma) y usa Suspenso para componentes cargados de forma diferida.

    Dependencia reducida de la IP para mayor seguridad (más énfasis en la validez de la URL y el análisis seguro).

    Se eliminaron todas las clases CSS / UI de modo agresivo anteriores.
    `,
    changelogButton: "Última actualización 🆕",
  },
};
