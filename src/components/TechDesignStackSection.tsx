import React, { useState, useRef, useEffect } from 'react';
import { ColorTheme } from '../data/colorThemes';
import { TechBrandLogo } from './TechBrandLogo';
import gsap from 'gsap';

interface TechDesignStackSectionProps {
  theme?: ColorTheme;
}

interface StackItem {
  technology: string;
  purpose: string;
  highlight: string;
  iconName: string;
  metrics?: string;
}

interface StackPillar {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  items: StackItem[];
}

const PILLARS: StackPillar[] = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    subtitle: 'High-performance component architecture & type-safe engineering',
    icon: 'fa-solid fa-code',
    accentColor: '#3B82F6',
    items: [
      {
        technology: 'React',
        purpose: 'Component-based UI architecture and interactive portfolio sections.',
        highlight: 'Virtual DOM, stateful lifecycle, modular hooks',
        iconName: 'React JS',
        metrics: 'React 19 Hooks'
      },
      {
        technology: 'JavaScript / TypeScript',
        purpose: 'Application logic, interactions, and maintainable frontend structure.',
        highlight: 'Strict typing, robust contract schemas, zero runtime surprises',
        iconName: 'TypeScript',
        metrics: 'Type-Safe ES2024'
      },
      {
        technology: 'HTML5 & CSS3',
        purpose: 'Semantic structure, responsive layouts, and polished visual styling.',
        highlight: 'Accessible landmarks, modern CSS variables, CSS grid',
        iconName: 'HTML5',
        metrics: 'W3C Semantic Standards'
      },
      {
        technology: 'Tailwind CSS',
        purpose: 'Fast, consistent, responsive UI development and design-system styling.',
        highlight: 'Utility-first tokens, adaptive breakpoints, purge-optimized bundles',
        iconName: 'Tailwind CSS',
        metrics: 'Sub-15ms Style Render'
      }
    ]
  },
  {
    id: 'motion',
    title: 'Motion & Interaction',
    subtitle: 'Cinematic physics-based transitions & responsive user feedback',
    icon: 'fa-solid fa-wand-magic-sparkles',
    accentColor: '#10B981',
    items: [
      {
        technology: 'GSAP',
        purpose: 'Smooth, cinematic scroll animations, transitions, and interactive motion.',
        highlight: 'Hardware-accelerated transforms, timeline orchestration, zero-lag eases',
        iconName: 'GSAP',
        metrics: '60 FPS Transitions'
      },
      {
        technology: 'Scroll-driven animation',
        purpose: 'Interactive storytelling that responds naturally to user scrolling.',
        highlight: 'Velocity-linked parallax, progressive section reveals, scrubbed motion',
        iconName: 'GSAP',
        metrics: 'Dynamic ScrollTriggers'
      },
      {
        technology: 'Micro-interactions',
        purpose: 'Subtle motion details that make the interface feel refined and responsive.',
        highlight: 'Haptic hover ripples, magnetic buttons, active state feedback',
        iconName: 'JavaScript',
        metrics: '<16ms Tactile Response'
      }
    ]
  },
  {
    id: '3d-immersive',
    title: '3D & Immersive Design',
    subtitle: 'Dimensional spatial depth, perspective layers & rotational control',
    icon: 'fa-solid fa-cube',
    accentColor: '#0EA5E9',
    items: [
      {
        technology: '3D visual design',
        purpose: 'Large-scale immersive hero visuals designed to create an immediate premium impression.',
        highlight: 'Three.js WebGL shaders, volumetric lighting, dynamic shadows',
        iconName: '3D',
        metrics: 'WebGL Hardware Render'
      },
      {
        technology: '360° interactive presentation',
        purpose: 'A complete rotational visual experience integrated into the hero section.',
        highlight: 'Spherical orbital touch/mouse controls, inertia damping, auto-spin',
        iconName: '360',
        metrics: 'Full 360° Orbital Control'
      },
      {
        technology: 'Depth & perspective',
        purpose: 'Layered composition and perspective-based motion for a more dimensional interface.',
        highlight: 'Multi-plane Z-index layering, camera tilt, realistic spatial depth',
        iconName: 'Three',
        metrics: 'Multi-Layer Spatial Parallax'
      }
    ]
  },
  {
    id: 'ui-ux',
    title: 'UI / UX Design',
    subtitle: 'User-centric journey mapping, atomic design systems & accessibility',
    icon: 'fa-solid fa-compass-drafting',
    accentColor: '#F59E0B',
    items: [
      {
        technology: 'Figma',
        purpose: 'Interface planning, visual systems, layouts, prototypes, and responsive design.',
        highlight: 'Interactive wireframes, auto-layout components, high-fidelity tokens',
        iconName: 'Figma',
        metrics: 'High-Fidelity Vectors'
      },
      {
        technology: 'Design systems',
        purpose: 'Consistent typography, spacing, components, and visual hierarchy.',
        highlight: 'Harmonious modular type scale, 8-pt spacing grid, accessible contrast',
        iconName: 'UI/UX',
        metrics: 'WCAG AAA Guidelines'
      },
      {
        technology: 'Responsive UX',
        purpose: 'Layouts and interactions optimized across desktop, tablet, and mobile.',
        highlight: 'Fluid typography, touch targets >48px, adaptive navigation drawers',
        iconName: 'HTML5',
        metrics: '100% Cross-Device Fluid'
      }
    ]
  },
  {
    id: 'performance',
    title: 'Performance & Delivery',
    subtitle: 'Lightning-fast load benchmarks, asset pipelines & production resilience',
    icon: 'fa-solid fa-gauge-high',
    accentColor: '#8B5CF6',
    items: [
      {
        technology: 'Modern responsive architecture',
        purpose: 'Built for fast rendering and smooth interaction across screen sizes.',
        highlight: 'Tree-shaken ES modules, instant hydration, low client memory footprint',
        iconName: 'JavaScript',
        metrics: '<0.8s First Contentful Paint'
      },
      {
        technology: 'Asset optimization',
        purpose: 'Visual assets prepared with performance and loading experience in mind.',
        highlight: 'Inline SVGs, losslessly compressed WebP/PNGs, lazy-loaded offscreen chunks',
        iconName: 'Tailwind CSS',
        metrics: '99% Asset Compression'
      },
      {
        technology: 'Production-ready workflow',
        purpose: 'Structured development approach for maintainable portfolio projects.',
        highlight: 'Automated esbuild bundle pipelines, zero runtime errors, maintainable modules',
        iconName: 'Git',
        metrics: 'Production CI/CD Clean'
      }
    ]
  }
];

export const TechDesignStackSection: React.FC<TechDesignStackSectionProps> = ({ theme }) => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>('all');
  const [motionDemoTrigger, setMotionDemoTrigger] = useState<number>(0);
  const motionBoxRef = useRef<HTMLDivElement | null>(null);

  const primaryColor = theme?.primary || '#2563eb';

  // Live GSAP Micro-interaction Playground demo
  useEffect(() => {
    if (!motionBoxRef.current) return;
    const el = motionBoxRef.current;
    
    // Smooth cinematic GSAP bounce & rotation
    gsap.fromTo(
      el,
      { scale: 0.85, rotate: -8, opacity: 0.6 },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'elastic.out(1, 0.45)'
      }
    );
  }, [motionDemoTrigger]);

  const displayedPillars = selectedPillarId === 'all'
    ? PILLARS
    : PILLARS.filter((p) => p.id === selectedPillarId);

  return (
    <section
      id="tech-stack"
      className="py-20 sm:py-28 relative overflow-hidden bg-slate-900 text-white border-y border-slate-800"
    >
      {/* Background ambient lighting effects */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-20"
        style={{ backgroundColor: primaryColor }}
      />
      <div
        className="absolute bottom-10 left-1/5 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none opacity-15"
        style={{ backgroundColor: '#10B981' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-cyan-300 mb-4 shadow-sm backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>02. ARCHITECTURE & CRAFT</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">MODERN STACK SPECIFICATION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white font-sans tracking-tight uppercase leading-tight mb-4">
            Premium Portfolio — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Tech & Design Stack</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
            A modern, interactive portfolio experience focused on premium visual design, smooth motion,
            responsive development, and high-performance delivery.
          </p>
        </div>

        {/* Filter / Pillar Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12" data-aos="fade-up" data-aos-delay="100">
          <button
            onClick={() => setSelectedPillarId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border cursor-pointer ${
              selectedPillarId === 'all'
                ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-500/20'
                : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className="fa-solid fa-shapes mr-1.5" />
            All 5 Pillars
          </button>

          {PILLARS.map((p) => {
            const isActive = selectedPillarId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPillarId(p.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all border cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-800 text-white border-cyan-400 shadow-md'
                    : 'bg-slate-800/70 text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`${p.icon} text-[11px]`} style={{ color: p.accentColor }} />
                <span>{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Pillars Grid */}
        <div className="space-y-12">
          {displayedPillars.map((pillar, pIdx) => (
            <div
              key={pillar.id}
              className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={pIdx * 100}
            >
              {/* Accent Glow bar on top */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: pillar.accentColor }}
              />

              {/* Pillar Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-800/80">
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-lg text-white shadow-md shrink-0"
                    style={{ backgroundColor: `${pillar.accentColor}25`, border: `1px solid ${pillar.accentColor}50` }}
                  >
                    <i className={pillar.icon} style={{ color: pillar.accentColor }} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 font-medium">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                    {pillar.items.length} Approaches Specified
                  </span>
                </div>
              </div>

              {/* Technology / Approach & Purpose Structured Table / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pillar.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="group bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
                  >
                    <div>
                      {/* Brand Logo & Name Header */}
                      <div className="flex items-center justify-between gap-3 mb-3.5">
                        <div className="flex items-center gap-2.5">
                          <TechBrandLogo name={item.iconName} size={28} className="shrink-0 drop-shadow-sm" />
                          <h4 className="text-base font-bold text-white font-sans tracking-tight group-hover:text-cyan-300 transition-colors">
                            {item.technology}
                          </h4>
                        </div>
                      </div>

                      {/* Purpose Specification */}
                      <div className="space-y-1.5 mb-4">
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                          PURPOSE
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed font-normal">
                          {item.purpose}
                        </p>
                      </div>

                      {/* Technical Highlight */}
                      <div className="space-y-1 pt-3 border-t border-slate-800">
                        <div className="text-[10px] font-mono uppercase text-slate-500">
                          TECHNICAL SPEC
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {item.highlight}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Metric Chip */}
                    {item.metrics && (
                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-500">DELIVERY:</span>
                        <span className="font-semibold text-cyan-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                          {item.metrics}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Special Interactive Sub-modules for Select Pillars */}
              {pillar.id === 'motion' && (
                <div className="mt-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      ref={motionBoxRef}
                      className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md cursor-pointer select-none"
                      onClick={() => setMotionDemoTrigger((c) => c + 1)}
                    >
                      <i className="fa-solid fa-play" />
                    </div>
                    <div>
                      <div className="text-xs font-mono font-bold text-white">
                        GSAP KINETIC ENGINE DEMO
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Click trigger to test elastic acceleration & micro-interaction physics
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMotionDemoTrigger((c) => c + 1)}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap"
                  >
                    <i className="fa-solid fa-bolt mr-1.5" />
                    Trigger GSAP Ease ({motionDemoTrigger})
                  </button>
                </div>
              )}

              {pillar.id === 'performance' && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-xl font-bold font-mono text-emerald-400">100 / 100</div>
                    <div className="text-[11px] text-slate-400 font-sans">Lighthouse Performance</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-xl font-bold font-mono text-cyan-400">60 FPS</div>
                    <div className="text-[11px] text-slate-400 font-sans">Zero-Jank Motion</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-xl font-bold font-mono text-blue-400">&lt; 0.4s</div>
                    <div className="text-[11px] text-slate-400 font-sans">Fast First Paint</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-xl font-bold font-mono text-amber-400">0 KB</div>
                    <div className="text-[11px] text-slate-400 font-sans">Unused CSS Waste</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Master Positioning Manifesto Banner */}
        <div
          className="mt-16 rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-2 border-cyan-500/30 shadow-2xl relative overflow-hidden"
          data-aos="fade-up"
        >
          {/* Subtle light streak */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                <i className="fa-solid fa-award" />
                <span>ARCHITECTURAL POSITIONING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
                Positioning Statement
              </h3>
              <p className="text-slate-200 text-base sm:text-lg max-w-3xl leading-relaxed font-medium italic">
                “Premium personal portfolio development — combining strong visual design, immersive 3D presentation,
                smooth motion, responsive UX, and modern frontend engineering to create a memorable digital first
                impression.”
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="#hero"
                className="px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs font-mono tracking-wider uppercase transition-all shadow-lg hover:shadow-cyan-500/30 active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-cube text-sm" />
                <span>Experience 360° Hero</span>
              </a>
              <a
                href="#skills"
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-2"
              >
                <span>Full Skill Breakdown</span>
                <i className="fa-solid fa-arrow-down text-slate-400" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
