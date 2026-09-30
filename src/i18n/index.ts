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
    changelogContent: `v4.0.0
    Reorganized the frontend architecture
    Separated API communication from the main App.tsx component
    Added a dedicated search API layer
    Added structured TypeScript types for search results
    Added reusable URL truncation utility
    Improved separation between UI components, API communication, and result processing
    Added asynchronous search processing with asyncio.gather()
    Added concurrent parsing across multiple search and knowledge sources
    Added support for Bing, Yahoo, DuckDuckGo, Wikipedia, Reddit, Qwant, and Stack Exchange
    Added automatic result classification: news, technical, knowledge, discussion, and general
    Added URL normalization and duplicate result merging
    Added visual category badges to search results
    Improved search result layout and presentation
    Added Flask async view support
    Added Flask-Limiter request rate limiting
    Updated CORS configuration for the deployed frontend
    Updated frontend API communication with the deployed Flask backend
    Added Progressive Web App (PWA) support
    Added service worker registration and application installation support
    Improved overall project architecture for future AI-assisted classification and result ranking`,
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
    changelogContent: `v4.0.0
    Arquitectura del frontend reorganizada
    Comunicación con la API separada del componente principal App.tsx
    Añadida una capa dedicada para la API de búsqueda
    Añadidos tipos TypeScript estructurados para los resultados de búsqueda
    Añadida una utilidad reutilizable para truncar URLs
    Mejorada la separación entre componentes de UI, comunicación con la API y procesamiento de resultados
    Añadido procesamiento asíncrono de búsquedas con asyncio.gather()
    Añadido procesamiento concurrente de múltiples fuentes de búsqueda y conocimiento
    Añadido soporte para Bing, Yahoo, DuckDuckGo, Wikipedia, Reddit, Qwant y Stack Exchange
    Añadida clasificación automática de resultados: news, technical, knowledge, discussion y general
    Añadida normalización de URLs y combinación de resultados duplicados
    Añadidas etiquetas visuales de categorías en los resultados de búsqueda
    Mejorado el diseño y la presentación de los resultados
    Añadido soporte para vistas asíncronas de Flask
    Añado Flask-Limiter para limitar solicitudes
    Actualizada la configuración CORS para el frontend desplegado
    Actualizada la comunicación entre el frontend y el backend Flask desplegado
    Añadido soporte para Progressive Web App (PWA)
    Añadido registro del service worker y soporte para instalación de la aplicación
    Mejorada la arquitectura general del proyecto como base para futuras funciones de clasificación y ranking asistidos por IA
    `,
    changelogButton: "Última actualización 🆕",
  },
};

