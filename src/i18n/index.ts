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
    changelogContent: `v3.1.0
    Fully redesigned UI - minimalist dark theme with #e8e8e8 accent
    Replaced gold color palette with neutral soft-white system
    Added animated search rings background (CSS-only, no JS)
    Improved input and button UX for mobile and desktop
    Rounded corners across all components (iPhone-style, 20px)
    Removed scrollbar globally for cleaner look
    Fixed search rings jitter on scroll using will-change and translateZ(0)
    Applied modern CSS: @layer, @property, color-mix(), container queries, :has(), text-wrap: balance
    Added env(safe-area-inset-bottom) support for iOS notch devices
    Improved modal on tablet - now renders as bottom sheet
    Added 100dvh for correct mobile viewport handling
    Added touch-action: manipulation and min-height: 44px on all interactive elements
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
    changelogContent: `v3.1.0
    Interfaz de usuario completamente rediseñada: tema oscuro minimalista con acento #e8e8e8
    Paleta de colores dorados reemplazada por un sistema blanco suave neutro
    Fondo de anillos de búsqueda animados añadido (solo CSS, sin JS)
    Experiencia de usuario mejorada para botones y entradas en dispositivos móviles y de escritorio
    Esquinas redondeadas en todos los componentes (estilo iPhone, 20 px)
    Barra de desplazamiento eliminada globalmente para una apariencia más limpia
    Se corrigió la vibración de los anillos de búsqueda al desplazarse con will-change y translateZ(0)
    CSS moderno aplicado: @layer, @property, color-mix(), consultas de contenedor, :has(), text-wrap: balance
    Compatibilidad con env(safe-area-inset-bottom) añadida para dispositivos iOS con notch
    Modal mejorado en tabletas: ahora se renderiza como hoja inferior
    Añadido 100dvh para una correcta gestión de la ventana gráfica en dispositivos móviles
    Añadido touch-action: manipulación y min-height: 44 px en todos los elementos interactivos
    `,
    changelogButton: "Última actualización 🆕",
  },
};

