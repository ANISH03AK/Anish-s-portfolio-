export interface ColorTheme {
  id: string;
  name: string;
  category: 'core' | 'optional';
  tagline: string;
  primary: string;       // main accent (e.g. #facc15 or #ef4444)
  secondary: string;     // complementary accent
  accent: string;        // highlight tone
  bgDark: string;        // deep dark base background
  bgCard: string;        // card background
  borderColor: string;   // default border
  borderHover: string;   // hover border
  glowColor: string;     // shadow & aura
  packetColors: string[];// canvas data packet colors
  conduitStroke: string; // canvas conduit stroke
  swatch: string[];      // 3 preview hex colors
  icon: string;
}

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'black-gold',
    name: 'Obsidian & Gold',
    category: 'core',
    tagline: 'Regal Gold on Deep Smoked Obsidian',
    primary: '#facc15',
    secondary: '#eab308',
    accent: '#ffd700',
    bgDark: '#050505',
    bgCard: 'linear-gradient(155deg, rgba(20, 18, 10, 0.92) 0%, rgba(10, 9, 5, 0.97) 100%)',
    borderColor: 'rgba(250, 204, 21, 0.28)',
    borderHover: 'rgba(250, 204, 21, 0.75)',
    glowColor: 'rgba(250, 204, 21, 0.45)',
    packetColors: ['#facc15', '#ffd700', '#fbbf24', '#f59e0b', '#fef08a'],
    conduitStroke: 'rgba(250, 204, 21, 0.2)',
    swatch: ['#050505', '#facc15', '#fbbf24'],
    icon: 'fa-solid fa-crown'
  },
  {
    id: 'crimson-noir',
    name: 'Crimson & Noir',
    category: 'core',
    tagline: 'High-Voltage Crimson Red on Pitch Black',
    primary: '#ef4444',
    secondary: '#dc2626',
    accent: '#f87171',
    bgDark: '#050505',
    bgCard: 'linear-gradient(155deg, rgba(24, 8, 8, 0.92) 0%, rgba(12, 4, 4, 0.97) 100%)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    borderHover: 'rgba(239, 68, 68, 0.8)',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    packetColors: ['#ef4444', '#dc2626', '#f87171', '#b91c1c', '#fca5a5'],
    conduitStroke: 'rgba(239, 68, 68, 0.22)',
    swatch: ['#050505', '#ef4444', '#b91c1c'],
    icon: 'fa-solid fa-fire'
  },
  {
    id: 'trinity-fusion',
    name: 'Black, Red & Gold',
    category: 'core',
    tagline: 'Separated Tri-Tone: Black Base, Red Structure & Gold Telemetry',
    primary: '#ef4444',
    secondary: '#facc15',
    accent: '#f59e0b',
    bgDark: '#050505',
    bgCard: 'linear-gradient(155deg, rgba(22, 10, 12, 0.92) 0%, rgba(10, 8, 8, 0.97) 100%)',
    borderColor: 'rgba(239, 68, 68, 0.35)',
    borderHover: 'rgba(250, 204, 21, 0.8)',
    glowColor: 'rgba(239, 68, 68, 0.45)',
    packetColors: ['#ef4444', '#facc15', '#f87171', '#fbbf24', '#dc2626'],
    conduitStroke: 'rgba(239, 68, 68, 0.2)',
    swatch: ['#050505', '#ef4444', '#facc15'],
    icon: 'fa-solid fa-layer-group'
  },
  {
    id: 'cyber-cyan',
    name: 'Cyber Neon Cyan',
    category: 'optional',
    tagline: 'Electric Cyan Fiber & Deep Midnight Navy',
    primary: '#00f2fe',
    secondary: '#38bdf8',
    accent: '#06b6d4',
    bgDark: '#030712',
    bgCard: 'linear-gradient(155deg, rgba(8, 20, 36, 0.92) 0%, rgba(3, 10, 20, 0.97) 100%)',
    borderColor: 'rgba(56, 189, 248, 0.3)',
    borderHover: 'rgba(0, 242, 254, 0.8)',
    glowColor: 'rgba(0, 242, 254, 0.45)',
    packetColors: ['#00f2fe', '#38bdf8', '#60a5fa', '#06b6d4', '#7dd3fc'],
    conduitStroke: 'rgba(56, 189, 248, 0.22)',
    swatch: ['#030712', '#00f2fe', '#38bdf8'],
    icon: 'fa-solid fa-bolt'
  },
  {
    id: 'emerald-matrix',
    name: 'Emerald Matrix',
    category: 'optional',
    tagline: 'High-Tech Terminal Emerald & Cyber Mint',
    primary: '#10b981',
    secondary: '#34d399',
    accent: '#059669',
    bgDark: '#030a06',
    bgCard: 'linear-gradient(155deg, rgba(6, 24, 16, 0.92) 0%, rgba(2, 12, 8, 0.97) 100%)',
    borderColor: 'rgba(16, 185, 129, 0.3)',
    borderHover: 'rgba(52, 211, 153, 0.8)',
    glowColor: 'rgba(16, 185, 129, 0.45)',
    packetColors: ['#10b981', '#34d399', '#6ee7b7', '#059669', '#a7f3d0'],
    conduitStroke: 'rgba(16, 185, 129, 0.22)',
    swatch: ['#030a06', '#10b981', '#34d399'],
    icon: 'fa-solid fa-terminal'
  },
  {
    id: 'royal-amethyst',
    name: 'Royal Amethyst',
    category: 'optional',
    tagline: 'Electric Galactic Purple & Vivid Violet',
    primary: '#a855f7',
    secondary: '#c084fc',
    accent: '#9333ea',
    bgDark: '#07030e',
    bgCard: 'linear-gradient(155deg, rgba(22, 10, 36, 0.92) 0%, rgba(10, 4, 18, 0.97) 100%)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    borderHover: 'rgba(192, 132, 252, 0.8)',
    glowColor: 'rgba(168, 85, 247, 0.45)',
    packetColors: ['#a855f7', '#c084fc', '#e879f9', '#9333ea', '#d8b4fe'],
    conduitStroke: 'rgba(168, 85, 247, 0.22)',
    swatch: ['#07030e', '#a855f7', '#c084fc'],
    icon: 'fa-solid fa-gem'
  },
  {
    id: 'sunset-rose-gold',
    name: 'Sunset Rose Gold',
    category: 'optional',
    tagline: 'Warm Twilight Rose, Coral & Radiant Champagne',
    primary: '#f43f5e',
    secondary: '#fbbf24',
    accent: '#fb7185',
    bgDark: '#0a0306',
    bgCard: 'linear-gradient(155deg, rgba(28, 10, 18, 0.92) 0%, rgba(14, 5, 10, 0.97) 100%)',
    borderColor: 'rgba(244, 63, 94, 0.3)',
    borderHover: 'rgba(251, 191, 36, 0.8)',
    glowColor: 'rgba(244, 63, 94, 0.45)',
    packetColors: ['#f43f5e', '#fbbf24', '#fda4af', '#f59e0b', '#fb7185'],
    conduitStroke: 'rgba(244, 63, 94, 0.22)',
    swatch: ['#0a0306', '#f43f5e', '#fbbf24'],
    icon: 'fa-solid fa-sun'
  }
];

export const DEFAULT_THEME_ID = 'trinity-fusion';

export function getThemeById(id: string): ColorTheme {
  return COLOR_THEMES.find(t => t.id === id) || COLOR_THEMES[0];
}
