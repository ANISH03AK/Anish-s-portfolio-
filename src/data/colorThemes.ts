export interface ColorTheme {
  id: string;
  name: string;
  category: 'core' | 'optional';
  tagline: string;
  primary: string;       // Color 1 (e.g. Cyan #06b6d4)
  secondary: string;     // Color 2 (e.g. Indigo #6366f1)
  accent: string;        // Color 3 (e.g. Pink #f43f5e)
  bgDark: string;        // Deep space background
  bgCard: string;        // Card background
  borderColor: string;   // Clean subtle border
  borderHover: string;   // Hover border
  glowColor: string;     // Multi-color ambient glow
  packetColors: string[];// Background packet colors
  conduitStroke: string; // Network conduit stroke
  swatch: string[];      // 3 colors displayed in theme UI
  icon: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'cyan-indigo-pink',
    name: 'Cyan · Indigo · Pink',
    category: 'core',
    tagline: 'Vibrant Tri-Color: Electric Cyan, Royal Indigo & Radiant Hot Pink',
    primary: '#06b6d4',
    secondary: '#6366f1',
    accent: '#f43f5e',
    bgDark: '#070a14',
    bgCard: 'rgba(12, 17, 30, 0.88)',
    borderColor: 'rgba(6, 182, 212, 0.2)',
    borderHover: 'rgba(6, 182, 212, 0.55)',
    glowColor: 'rgba(6, 182, 212, 0.28)',
    packetColors: ['#06b6d4', '#6366f1', '#f43f5e'],
    conduitStroke: 'rgba(6, 182, 212, 0.08)',
    swatch: ['#06b6d4', '#6366f1', '#f43f5e'],
    icon: 'fa-solid fa-bolt'
  },
  {
    id: 'crimson-gold-amber',
    name: 'Crimson · Gold · Amber',
    category: 'core',
    tagline: 'Warm Energy: Crimson Flame, Solar Gold & Radiant Amber',
    primary: '#ef4444',
    secondary: '#f59e0b',
    accent: '#facc15',
    bgDark: '#0e0807',
    bgCard: 'rgba(24, 14, 12, 0.88)',
    borderColor: 'rgba(239, 68, 68, 0.22)',
    borderHover: 'rgba(245, 158, 11, 0.55)',
    glowColor: 'rgba(239, 68, 68, 0.28)',
    packetColors: ['#ef4444', '#f59e0b', '#facc15'],
    conduitStroke: 'rgba(239, 68, 68, 0.08)',
    swatch: ['#ef4444', '#f59e0b', '#facc15'],
    icon: 'fa-solid fa-fire'
  },
  {
    id: 'emerald-teal-lime',
    name: 'Emerald · Teal · Lime',
    category: 'core',
    tagline: 'Bio-Tech Glow: Vivid Emerald, Aqua Teal & Electric Lime',
    primary: '#10b981',
    secondary: '#06b6d4',
    accent: '#84cc16',
    bgDark: '#060d09',
    bgCard: 'rgba(11, 22, 16, 0.88)',
    borderColor: 'rgba(16, 185, 129, 0.22)',
    borderHover: 'rgba(16, 185, 129, 0.55)',
    glowColor: 'rgba(16, 185, 129, 0.28)',
    packetColors: ['#10b981', '#06b6d4', '#84cc16'],
    conduitStroke: 'rgba(16, 185, 129, 0.08)',
    swatch: ['#10b981', '#06b6d4', '#84cc16'],
    icon: 'fa-solid fa-seedling'
  },
  {
    id: 'violet-magenta-cyan',
    name: 'Violet · Magenta · Cyan',
    category: 'optional',
    tagline: 'Cyber Synth: Royal Violet, Vivid Magenta & Neon Cyan',
    primary: '#8b5cf6',
    secondary: '#d946ef',
    accent: '#38bdf8',
    bgDark: '#0b0714',
    bgCard: 'rgba(19, 12, 32, 0.88)',
    borderColor: 'rgba(139, 92, 246, 0.22)',
    borderHover: 'rgba(217, 70, 239, 0.55)',
    glowColor: 'rgba(139, 92, 246, 0.28)',
    packetColors: ['#8b5cf6', '#d946ef', '#38bdf8'],
    conduitStroke: 'rgba(139, 92, 246, 0.08)',
    swatch: ['#8b5cf6', '#d946ef', '#38bdf8'],
    icon: 'fa-solid fa-wand-magic-sparkles'
  },
  {
    id: 'orange-rose-gold',
    name: 'Orange · Rose · Gold',
    category: 'optional',
    tagline: 'Sunset Horizon: Tangerine Orange, Twilight Rose & Gold',
    primary: '#f97316',
    secondary: '#f43f5e',
    accent: '#eab308',
    bgDark: '#0f0806',
    bgCard: 'rgba(26, 14, 11, 0.88)',
    borderColor: 'rgba(249, 115, 22, 0.22)',
    borderHover: 'rgba(244, 63, 94, 0.55)',
    glowColor: 'rgba(249, 115, 22, 0.28)',
    packetColors: ['#f97316', '#f43f5e', '#eab308'],
    conduitStroke: 'rgba(249, 115, 22, 0.08)',
    swatch: ['#f97316', '#f43f5e', '#eab308'],
    icon: 'fa-solid fa-sun'
  },
  {
    id: 'blue-mint-purple',
    name: 'Sapphire · Mint · Purple',
    category: 'optional',
    tagline: 'Deep Ocean Aurora: Sapphire Blue, Fresh Mint & Neon Purple',
    primary: '#3b82f6',
    secondary: '#10b981',
    accent: '#a855f7',
    bgDark: '#070b14',
    bgCard: 'rgba(12, 18, 32, 0.88)',
    borderColor: 'rgba(59, 130, 246, 0.22)',
    borderHover: 'rgba(16, 185, 129, 0.55)',
    glowColor: 'rgba(59, 130, 246, 0.28)',
    packetColors: ['#3b82f6', '#10b981', '#a855f7'],
    conduitStroke: 'rgba(59, 130, 246, 0.08)',
    swatch: ['#3b82f6', '#10b981', '#a855f7'],
    icon: 'fa-solid fa-water'
  }
];

export const DEFAULT_THEME_ID = 'cyan-indigo-pink';

export function getThemeById(id: string): ColorTheme {
  return COLOR_THEMES.find(t => t.id === id) || COLOR_THEMES[0];
}
