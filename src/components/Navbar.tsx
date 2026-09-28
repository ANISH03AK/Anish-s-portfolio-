import React, { useState, useEffect } from 'react';
import { COLOR_THEMES, ColorTheme, getThemeById } from '../data/colorThemes';

export type BlockTheme = 'cyber' | 'obsidian' | 'blueprint' | 'frosted';

interface NavbarProps {
  onOpenResume?: () => void;
  blockTheme?: BlockTheme;
  onSelectTheme?: (theme: BlockTheme) => void;
  activeColorThemeId?: string;
  onSelectColorTheme?: (themeId: string) => void;
  onOpenPaletteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume = () => {},
  blockTheme = 'cyber',
  onSelectTheme = () => {},
  activeColorThemeId = 'cyan-indigo-pink',
  onSelectColorTheme = () => {},
  onOpenPaletteModal = () => {}
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const currentTheme: ColorTheme = getThemeById(activeColorThemeId);

  useEffect(() => {
    const sectionRoutes = [
      { id: 'hero', route: 'CORE // OVERVIEW' },
      { id: 'skills', route: 'SKILLS // TECHNICAL' },
      { id: 'education', route: 'ACADEMICS // CREDENTIALS' },
      { id: 'experience', route: 'INFRA // TCS_BMS' },
      { id: 'projects', route: 'SERVICES // DEPLOYMENTS' },
      { id: 'contact', route: 'TERMINATION // DISPATCH' }
    ];

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#hero', label: 'HOME', id: 'hero' },
    { href: '#skills', label: 'SKILLS', id: 'skills' },
    { href: '#education', label: 'EDUCATION', id: 'education' },
    { href: '#experience', label: 'EXPERIENCE', id: 'experience' },
    { href: '#projects', label: 'PROJECTS', id: 'projects' },
    { href: '#contact', label: 'CONTACT', id: 'contact' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070a12]/95 backdrop-blur-md border-b border-zinc-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand Name Typography - STRICTLY ONE SINGLE LINE IN EVERY DEVICE VIEWPORT */}
        <a
          href="#hero"
          className="flex flex-col justify-center shrink-0 py-1 group select-none cursor-pointer"
          title="Anish Kumar · Portfolio Home"
        >
          <span className="text-lg sm:text-2xl font-black tracking-tight font-name-stylish text-white whitespace-nowrap leading-none transition-colors group-hover:text-cyan-400 shrink-0">
            ANISH KUMAR
          </span>
          <span
            className="text-[9px] sm:text-[10px] font-mono tracking-wider uppercase transition-colors font-medium whitespace-nowrap mt-1 hidden min-[480px]:block"
            style={{ color: currentTheme.secondary }}
          >
            Software Developer &amp; BMS Engineer
          </span>
        </a>

        {/* Desktop Navigation Menu */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-mono font-semibold tracking-wider uppercase text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`nav-link py-1 hover:text-white transition-colors ${activeSection === link.id ? 'active text-cyan-400 font-bold' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action CTA & Theme Palette Button - Compact on Mobile to Guarantee Space for Name */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Interactive Palette Studio Trigger Button */}
          <button
            onClick={onOpenPaletteModal}
            className="px-2 sm:px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700/80 hover:border-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 text-zinc-200 hover:text-white transition-all shadow-sm cursor-pointer group shrink-0"
            title="Open Theme Studio: 2 & 3 Color Combinations"
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
            <span className="hidden sm:inline">THEMES</span>
            <i className="fa-solid fa-palette text-[10px] text-cyan-400 group-hover:rotate-12 transition-transform" />
          </button>

          {/* Resume PDF Button - Responsive Text */}
          <button
            onClick={onOpenResume}
            className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 0 14px ${currentTheme.glowColor}`
            }}
          >
            <i className="fa-solid fa-file-pdf text-xs" />
            <span className="hidden sm:inline">RESUME (PDF)</span>
            <span className="sm:hidden text-[11px]">PDF</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
            aria-label="Toggle menu"
          >
            <i className="fa-solid fa-bars text-lg" />
          </button>
        </div>
      </div>

      {/* Telemetry Ticker & Interactive Palette Combinations Bar */}
      <div className="bg-[#05070e]/96 backdrop-blur-md border-t border-zinc-800/80 py-1.5 px-3 sm:px-4 text-[11px] font-mono text-zinc-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Active Color Combination Label */}
          <div className="flex items-center gap-2 sm:gap-3 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: currentTheme.primary }}>
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentTheme.primary }} />
              <span>THEME: {currentTheme.name.toUpperCase()}</span>
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1">
              <span className="text-zinc-400">COLORS:</span>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.primary }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.secondary }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentTheme.accent }} />
            </div>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span className="text-zinc-300 hidden md:inline">
              STATUS: <span className="font-semibold text-emerald-400">PASSPORT READY</span>
            </span>
          </div>

          {/* Right: Quick Color Theme Combination Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] text-zinc-400 font-semibold hidden md:inline whitespace-nowrap">COMBINATIONS:</span>
            <div className="inline-flex p-0.5 rounded-lg bg-black/90 border border-zinc-800 text-[10px] shrink-0">
              <button
                onClick={() => onSelectColorTheme('cyan-indigo-pink')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  activeColorThemeId === 'cyan-indigo-pink'
                    ? 'bg-zinc-800 text-cyan-300 font-bold border border-cyan-500/50 shadow-sm'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
                title="Cyan · Indigo · Pink"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Cyan/Indigo</span>
              </button>
              <button
                onClick={() => onSelectColorTheme('crimson-gold-amber')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  activeColorThemeId === 'crimson-gold-amber'
                    ? 'bg-zinc-800 text-amber-300 font-bold border border-amber-500/50 shadow-sm'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
                title="Crimson · Gold · Amber"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span>Crimson/Gold</span>
              </button>
              <button
                onClick={() => onSelectColorTheme('emerald-teal-lime')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  activeColorThemeId === 'emerald-teal-lime'
                    ? 'bg-zinc-800 text-emerald-300 font-bold border border-emerald-500/50 shadow-sm'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
                title="Emerald · Teal · Lime"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Emerald/Teal</span>
              </button>
              <button
                onClick={() => onSelectColorTheme('violet-magenta-cyan')}
                className={`px-2 py-0.5 rounded transition-all cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                  activeColorThemeId === 'violet-magenta-cyan'
                    ? 'bg-zinc-800 text-purple-300 font-bold border border-purple-500/50 shadow-sm'
                    : 'text-zinc-400 hover:text-white border border-transparent'
                }`}
                title="Violet · Magenta · Cyan"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Violet/Magenta</span>
              </button>
              <button
                onClick={onOpenPaletteModal}
                className="px-1.5 py-0.5 text-zinc-400 hover:text-cyan-300 transition-colors cursor-pointer whitespace-nowrap"
                title="View all 6 color combinations"
              >
                <i className="fa-solid fa-plus text-[9px]" /> More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileNavOpen(false)}
              className="block text-sm font-mono font-semibold text-zinc-300 hover:text-white py-1.5 border-b border-zinc-900"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenPaletteModal();
              }}
              className="text-xs font-mono text-cyan-400 flex items-center gap-1.5"
            >
              <i className="fa-solid fa-palette" />
              <span>Theme Combinations</span>
            </button>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenResume();
              }}
              className="text-xs font-mono text-white bg-cyan-600 px-3 py-1.5 rounded-lg"
            >
              Resume (PDF)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
