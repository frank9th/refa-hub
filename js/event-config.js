/**
 * Event Configuration & Theme Engine
 * Handles dynamic event loading, themes, and configuration overrides.
 */

const BUILT_IN_THEMES = {
  'royal-gold': {
    name: 'Royal Gold (Original)',
    colors: {
      primary: '#08172E',
      primaryMid: '#0D2145',
      primaryLight: '#152D5A',
      accent: '#D4AF37',
      accentLight: '#F0D060',
      accentPale: '#FBF5D8'
    }
  },
  'crimson-glory': {
    name: 'Crimson Glory',
    colors: {
      primary: '#2B0E11',
      primaryMid: '#4A151A',
      primaryLight: '#7A1C24',
      accent: '#E63946',
      accentLight: '#FF5E6B',
      accentPale: '#FFD9DC'
    }
  },
  'emerald-grace': {
    name: 'Emerald Grace',
    colors: {
      primary: '#064E3B',
      primaryMid: '#065F46',
      primaryLight: '#047857',
      accent: '#10B981',
      accentLight: '#34D399',
      accentPale: '#D1FAE5'
    }
  },
  'midnight-steel': {
    name: 'Midnight Steel',
    colors: {
      primary: '#0F172A',
      primaryMid: '#1E293B',
      primaryLight: '#334155',
      accent: '#38BDF8',
      accentLight: '#7DD3FC',
      accentPale: '#E0F2FE'
    }
  },
  'sunset-fire': {
    name: 'Sunset Fire',
    colors: {
      primary: '#450A0A',
      primaryMid: '#7F1D1D',
      primaryLight: '#991B1B',
      accent: '#F97316',
      accentLight: '#FB923C',
      accentPale: '#FFEDD5'
    }
  },
  'violet-kingdom': {
    name: 'Violet Kingdom',
    colors: {
      primary: '#2E1065',
      primaryMid: '#4C1D95',
      primaryLight: '#5B21B6',
      accent: '#8B5CF6',
      accentLight: '#A78BFA',
      accentPale: '#EDE9FE'
    }
  }
};

let activeEventConfig = null;
let eventConfigListeners = [];

function applyTheme(themeId) {
  const theme = BUILT_IN_THEMES[themeId] || BUILT_IN_THEMES['royal-gold'];
  const root = document.documentElement;
  
  root.style.setProperty('--brand-primary', theme.colors.primary);
  root.style.setProperty('--brand-primary-mid', theme.colors.primaryMid);
  root.style.setProperty('--brand-primary-light', theme.colors.primaryLight);
  root.style.setProperty('--brand-accent', theme.colors.accent);
  root.style.setProperty('--brand-accent-light', theme.colors.accentLight);
  root.style.setProperty('--brand-accent-pale', theme.colors.accentPale);
}

function setActiveEvent(eventData) {
  activeEventConfig = eventData;
  window.ACTIVE_EVENT_CONFIG = eventData;
  if (eventData && eventData.theme) {
    applyTheme(eventData.theme);
  }
  
  // Notify listeners
  eventConfigListeners.forEach(fn => fn(eventData));
  
  // Dispatch a global event for decoupling
  const event = new CustomEvent('active-event-changed', { detail: eventData });
  window.dispatchEvent(event);
}

function getActiveEvent() {
  return activeEventConfig;
}

function subscribeToEventConfig(callback) {
  eventConfigListeners.push(callback);
  if (activeEventConfig) {
    callback(activeEventConfig);
  }
  return () => {
    eventConfigListeners = eventConfigListeners.filter(fn => fn !== callback);
  };
}

// Expose globally
window.REFA_EVENTS = {
  BUILT_IN_THEMES,
  applyTheme,
  setActiveEvent,
  getActiveEvent,
  subscribeToEventConfig
};
