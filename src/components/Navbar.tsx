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
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const sections = ['hero', 'skills', 'education', 'experience', 'projects', 'contact'];
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
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

  const handleNavClick = (href: string) => {
    setMobileNavOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const topOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#070a12]/95 backdrop-blur-md border-b border-zinc-800/80 transition-colors duration-300">
      {/* Top Bar: Brand & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Brand Name Typography - Locked to ONE SINGLE LINE across every device */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="flex flex-col justify-center shrink-0 py-1 group select-none cursor-pointer"
          title="Anish Kumar · Portfolio Home"
        >
          <span className="text-xl sm:text-2xl font-black tracking-tight font-name-stylish text-white whitespace-nowrap leading-none transition-colors group-hover:text-cyan-400 shrink-0">
            ANISH KUMAR
          </span>
          <span
            className="text-[10px] font-mono tracking-wider uppercase transition-colors font-medium whitespace-nowrap mt-1 hidden sm:block"
            style={{ color: currentTheme.secondary }}
          >
            Software Developer &amp; BMS Engineer
          </span>
        </a>

        {/* Desktop Navigation Menu (Visible on lg screens and up) */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-6 xl:gap-7 text-xs font-mono font-semibold tracking-wider uppercase text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`nav-link py-1 hover:text-white transition-colors cursor-pointer ${
                activeSection === link.id ? 'active text-cyan-400 font-bold' : ''
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action CTA & Theme Palette Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Interactive Palette Studio Trigger Button */}
          <button
            onClick={onOpenPaletteModal}
            className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700/80 hover:border-cyan-400 text-xs font-mono font-bold flex items-center gap-1.5 sm:gap-2 text-zinc-200 hover:text-white transition-all shadow-sm cursor-pointer group shrink-0"
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

          {/* Resume PDF Button */}
          <button
            onClick={onOpenResume}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 0 14px ${currentTheme.glowColor}`
            }}
          >
            <i className="fa-solid fa-file-pdf text-xs" />
            <span className="hidden sm:inline">RESUME (PDF)</span>
            <span className="sm:hidden text-xs">RESUME</span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${mobileNavOpen ? 'fa-xmark' : 'fa-bars'} text-lg`} />
          </button>
        </div>
      </div>

      {/* Sub-bar: Compact Single-Row Palette Ticker (Never Wraps awkwardly) */}
      <div className="bg-[#05070e]/96 backdrop-blur-md border-t border-zinc-800/80 py-1.5 px-4 text-[11px] font-mono text-zinc-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 overflow-x-auto no-scrollbar">
          {/* Left: Active Color Theme Indicator */}
          <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
            <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: currentTheme.primary }}>
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentTheme.primary }} />
              <span>THEME: {currentTheme.name.toUpperCase()}</span>
            </span>
            <span className="text-zinc-600 hidden md:inline">|</span>
            <span className="text-zinc-300 hidden md:inline">
              STATUS: <span className="font-semibold text-emerald-400">PASSPORT READY</span>
            </span>
          </div>

          {/* Right: Quick Color Theme Combination Pills */}
          <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <span className="text-[10px] text-zinc-400 font-semibold hidden sm:inline">PALETTES:</span>
            <div className="inline-flex p-0.5 rounded-lg bg-black/90 border border-zinc-800 text-[10px]">
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
                <span>Cyan</span>
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
                <span>Crimson</span>
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
                <span>Emerald</span>
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
                <span>Violet</span>
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

      {/* Mobile Drawer Menu (Accessible, Full Height, Smooth Navigation) */}
      {mobileNavOpen && (
        <div className="lg:hidden bg-zinc-950/98 border-b border-zinc-800 px-6 py-5 space-y-4 shadow-2xl backdrop-blur-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`block text-sm font-mono font-semibold py-2.5 px-3 rounded-xl transition-all cursor-pointer ${
                  activeSection === link.id
                    ? 'bg-zinc-900 text-cyan-400 font-bold border border-zinc-800'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenPaletteModal();
              }}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-2 py-2 px-3 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
            >
              <i className="fa-solid fa-palette" />
              <span>Theme Studio</span>
            </button>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenResume();
              }}
              className="text-xs font-mono text-white font-bold px-4 py-2 rounded-lg cursor-pointer shadow-md"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
              }}
            >
              Resume (PDF)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
