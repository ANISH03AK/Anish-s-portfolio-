export type BackgroundStyleId = 
  | 'aurora-mesh'
  | 'constellation'
  | 'blueprint'
  | 'minimal-studio'
  | 'cyber-dark';

export type CanvasMode = 'dark' | 'light';

export interface BackgroundStyleConfig {
  id: BackgroundStyleId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  badge: string;
  previewGradient: string;
}

export const BACKGROUND_STYLES: BackgroundStyleConfig[] = [
  {
    id: 'aurora-mesh',
    name: 'Aurora Fluid Mesh',
    shortName: 'Aurora',
    tagline: 'Smooth ambient colored lighting & micro-dot matrix',
    description: 'Soft organic glowing gradients that shift gently, creating high-end modern depth without visual clutter.',
    icon: 'fa-solid fa-wand-magic-sparkles',
    badge: 'POPULAR',
    previewGradient: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #064e3b 100%)'
  },
  {
    id: 'constellation',
    name: 'Interactive Constellation',
    shortName: 'Constellation',
    tagline: 'Minimalist tech particles & proximity connections',
    description: 'Delicate floating micro-nodes that form subtle hairlines when near, gracefully responding to your mouse cursor.',
    icon: 'fa-solid fa-circle-nodes',
    badge: 'INTERACTIVE',
    previewGradient: 'linear-gradient(135deg, #090d16 0%, #1e293b 100%)'
  },
  {
    id: 'blueprint',
    name: 'Architectural Blueprint',
    shortName: 'Blueprint',
    tagline: 'Engineering grid matrix with coordinate crosses',
    description: 'Clean CAD & BMS engineering matrix with subtle technical coordinates and precision accent lines.',
    icon: 'fa-solid fa-drafting-compass',
    badge: 'ENGINEERING',
    previewGradient: 'linear-gradient(135deg, #021a36 0%, #082f49 100%)'
  },
  {
    id: 'minimal-studio',
    name: 'Executive Studio Sheen',
    shortName: 'Studio',
    tagline: 'Pure minimalist soft vignette & luxury diffused glow',
    description: 'Distraction-free, executive presentation focusing purely on typography, achievements, and credentials.',
    icon: 'fa-solid fa-gem',
    badge: 'CLEAN',
    previewGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
  },
  {
    id: 'cyber-dark',
    name: 'Deep Cyber Obsidian',
    shortName: 'Cyber',
    tagline: 'Ultra-deep midnight space with radiant accent glow',
    description: 'High-contrast tech canvas with glowing perimeter aura and dynamic mouse-tracking spotlight.',
    icon: 'fa-solid fa-microchip',
    badge: 'HIGH-TECH',
    previewGradient: 'linear-gradient(135deg, #030712 0%, #111827 100%)'
  }
];

export const DEFAULT_BG_STYLE: BackgroundStyleId = 'aurora-mesh';
export const DEFAULT_CANVAS_MODE: CanvasMode = 'dark';
