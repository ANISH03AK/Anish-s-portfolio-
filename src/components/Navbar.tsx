import React, { useState, useEffect } from 'react';
import { COLOR_THEMES, ColorTheme, getThemeById } from '../data/colorThemes';

export type BlockTheme = 'cyber' | 'obsidian' | 'blueprint' | 'frosted';

interface NavbarProps {
  onOpenResume: () => void;
  blockTheme: BlockTheme;
  onSelectTheme: (theme: BlockTheme) => void;
  activeColorThemeId: string;
  onSelectColorTheme: (themeId: string) => void;
  onOpenPaletteModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  blockTheme,
  onSelectTheme,
  activeColorThemeId,
  onSelectColorTheme,
  onOpenPaletteModal
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrollPx, setScrollPx] = useState(0);
  const [activeRoute, setActiveRoute] = useState('CORE // OVERVIEW');

  const currentTheme: ColorTheme = getThemeById(activeColorThemeId);

  useEffect(() => {
    const sectionRoutes = [
      { id: 'hero', route: 'CORE // OVERVIEW' },
      { id: 'about', route: 'FABRIC // ARCHITECTURE' },
      { id: 'skills', route: 'SDN // SKILLS_MATRIX' },
      { id: 'experience', route: 'INFRA // TCS_BMS' },
      { id: 'projects', route: 'SERVICES // LIVE_DEPLOYMENTS' },
      { id: 'contact', route: 'TERMINATION // DISPATCH' }
    ];

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setScrollPx(Math.round(scrollY));

      const sections = document.querySelectorAll('section[id]');
      let current = 'hero';
      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        const top = el.offsetTop - 120;
        const height = el.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          current = el.getAttribute('id') || 'hero';
        }
      });
      setActiveSection(current);

      for (let i = sectionRoutes.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sectionRoutes[i].id);
        if (sec && scrollY >= sec.offsetTop - 200) {
          setActiveRoute(sectionRoutes[i].route);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'HOME', id: 'hero' },
    { href: '#about', label: 'ABOUT', id: 'about' },
    { href: '#skills', label: 'SKILLS', id: 'skills' },
    { href: '#experience', label: 'EXPERIENCE', id: 'experience' },
    { href: '#projects', label: 'PROJECTS', id: 'projects' },
    { href: '#contact', label: 'CONTACT', id: 'contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-zinc-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo with User Image & Active Theme Glow */}
        <a href="#hero" className="flex items-center gap-3 group" title="Anish Kumar · Portfolio Home">
          <div className="relative flex items-center justify-center shrink-0">
            <div
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl p-[2px] transition-all duration-300 shadow-lg group-hover:scale-105 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
                boxShadow: `0 0 16px ${currentTheme.glowColor}`
              }}
            >
              <div className="w-full h-full bg-[#050505] rounded-[9px] overflow-hidden flex items-center justify-center relative">
                <img
                  src="profile.jpg"
                  alt="Anish Kumar"
                  className="w-full h-full object-cover rounded-[9px] group-hover:scale-110 transition-transform duration-300"
                  style={{ objectPosition: 'center 28%' }}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.hasFallenBack) {
                      target.dataset.hasFallenBack = 'true';
                      target.src = 'IMG_20260904_140606_442.jpg';
                    } else if (target.dataset.hasFallenBack === 'true') {
                      target.dataset.hasFallenBack = 'second';
                      target.src = 'profile.svg';
                    }
                  }}
                />
              </div>
            </div>
            {/* Live Telemetry Online Indicator */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-black animate-pulse"
              style={{
                backgroundColor: currentTheme.secondary,
                boxShadow: `0 0 8px ${currentTheme.secondary}`
              }}
              title="Online & Ready for Global Relocation"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-tight font-display text-white group-hover:text-yellow-400 transition-colors">
              ANISH KUMAR
            </span>
            <span
              className="text-[9px] font-mono -mt-1 hidden sm:block tracking-widest uppercase transition-colors"
              style={{ color: currentTheme.primary }}
            >
              Software Engineer & BMS Specialist
            </span>
          </div>
        </a>

        {/* Desktop Navigation Menu */}
        <nav id="desktop-nav" className="hidden md:flex items-center gap-7 text-xs font-mono font-semibold tracking-wider uppercase text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link py-1 hover:text-white transition-colors ${activeSection === link.id ? 'active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action CTA & Theme Palette Button */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Interactive Palette Studio Trigger Button */}
          <button
            onClick={onOpenPaletteModal}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700/80 hover:border-yellow-400 text-xs font-mono font-bold flex items-center gap-2 text-zinc-200 hover:text-white transition-all shadow-sm cursor-pointer group"
            title="Open Color Palette Studio: Choose separated Black, Red & Gold or Optional pretty colors"
          >
            <span className="flex items-center -space-x-1">
              {currentTheme.swatch.map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-black/80"
                  style={{ backgroundColor: c }}
                />
              ))}
            </span>
            <span className="hidden sm:inline">PALETTE</span>
            <i className="fa-solid fa-sparkles text-[10px] text-yellow-400 group-hover:rotate-12 transition-transform" />
          </button>

          <button
            onClick={onOpenResume}
            className="px-3.5 sm:px-4 py-2 rounded-lg text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 0 14px ${currentTheme.glowColor}`
            }}
          >
            <i className="fa-solid fa-file-pdf" />
            <span>RESUME</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white"
            aria-label="Toggle menu"
          >
            <i className="fa-solid fa-bars text-lg" />
          </button>
        </div>
      </div>

      {/* Telemetry Ticker & Interactive Palette / Background Switcher */}
      <div className="bg-[#070707]/94 backdrop-blur-md border-t border-zinc-800/80 py-1.5 px-4 text-[11px] font-mono text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Telemetry */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: currentTheme.primary }}>
              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: currentTheme.primary }} />
              <span>THEME: {currentTheme.name.toUpperCase()}</span>
            </span>
            <span className="text-zinc-700 hidden sm:inline">|</span>
            <span className="text-zinc-300 hidden md:inline">
              FABRIC: <span className="font-semibold text-emerald-400">ONLINE</span>
            </span>
            <span className="text-zinc-700 hidden lg:inline">|</span>
            <span id="active-route-indicator" className="text-zinc-300 hidden sm:inline">
              ROUTE: <span className="text-white font-semibold">{activeRoute}</span>
            </span>
          </div>

          {/* Right: Quick Color Theme Selector + Block BG */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Core Color Pills */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-zinc-500 font-semibold hidden md:inline">COLORS:</span>
              <div className="inline-flex p-0.5 rounded-lg bg-black/90 border border-zinc-800 text-[10px]">
                <button
                  onClick={() => onSelectColorTheme('black-gold')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    activeColorThemeId === 'black-gold'
                      ? 'bg-yellow-500/25 text-yellow-300 font-bold border border-yellow-400/60 shadow-sm'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                  title="👑 Pure Obsidian & Gold (Separated Black & Gold)"
                >
                  Gold
                </button>
                <button
                  onClick={() => onSelectColorTheme('crimson-noir')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    activeColorThemeId === 'crimson-noir'
                      ? 'bg-red-500/25 text-red-300 font-bold border border-red-500/60 shadow-sm'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                  title="🔥 Crimson & Noir (Separated Black & Red)"
                >
                  Red
                </button>
                <button
                  onClick={() => onSelectColorTheme('trinity-fusion')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                    activeColorThemeId === 'trinity-fusion'
                      ? 'bg-red-500/25 text-yellow-300 font-bold border border-red-400/50 shadow-sm'
                      : 'text-zinc-400 hover:text-white border border-transparent'
                  }`}
                  title="🛡️ Black, Red & Gold Trinity"
                >
                  Trinity
                </button>
                <button
                  onClick={onOpenPaletteModal}
                  className="px-1.5 py-0.5 text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  title="View all 7 pretty color options"
                >
                  <i className="fa-solid fa-plus text-[9px]" /> More
                </button>
              </div>
            </div>

            <span className="text-zinc-700 hidden sm:inline">|</span>

            {/* Block BG Theme Selector */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-zinc-500 hidden sm:inline">SURFACE:</span>
              <div className="inline-flex p-0.5 rounded-lg bg-black/90 border border-zinc-800 text-[10px]">
                <button
                  onClick={() => onSelectTheme('cyber')}
                  className={`px-1.5 sm:px-2 py-0.5 rounded transition-all cursor-pointer ${
                    blockTheme === 'cyber'
                      ? 'text-white bg-zinc-800 font-bold border border-zinc-700'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Cyber
                </button>
                <button
                  onClick={() => onSelectTheme('obsidian')}
                  className={`px-1.5 sm:px-2 py-0.5 rounded transition-all cursor-pointer ${
                    blockTheme === 'obsidian'
                      ? 'text-white bg-zinc-800 font-bold border border-zinc-700'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Obsidian
                </button>
                <button
                  onClick={() => onSelectTheme('blueprint')}
                  className={`px-1.5 sm:px-2 py-0.5 rounded transition-all cursor-pointer ${
                    blockTheme === 'blueprint'
                      ? 'text-white bg-zinc-800 font-bold border border-zinc-700'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Blueprint
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileNavOpen && (
        <div id="mobile-nav" className="md:hidden bg-[#0a0a0a] border-b border-zinc-800 px-6 py-4 space-y-4 font-mono text-xs uppercase">
          {/* Mobile Profile Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
            <img
              src="profile.jpg"
              alt="Anish Kumar"
              className="w-10 h-10 rounded-xl object-cover border"
              style={{
                objectPosition: 'center 28%',
                borderColor: currentTheme.primary
              }}
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-extrabold text-white text-sm">ANISH KUMAR</div>
              <div className="text-[10px] text-zinc-400 font-sans normal-case">React Developer & BMS Engineer</div>
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileNavOpen(false)}
              className="block text-zinc-300 hover:text-yellow-400 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] text-zinc-400">COLOR PALETTES:</span>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenPaletteModal();
              }}
              className="px-3 py-1 rounded bg-zinc-800 text-yellow-300 font-bold"
            >
              Select Color
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
