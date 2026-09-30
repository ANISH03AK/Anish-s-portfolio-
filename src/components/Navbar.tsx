import React, { useState, useEffect } from 'react';
import { COLOR_THEMES, ColorTheme, getThemeById } from '../data/colorThemes';
import { PERSONAL_INFO } from '../data/portfolioData';

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
  const [logoPhoto, setLogoPhoto] = useState<string>(() => {
    return typeof window !== 'undefined'
      ? localStorage.getItem('anish_profile_photo') || '/profile.jpg?v=3'
      : '/profile.jpg?v=3';
  });

  const currentTheme: ColorTheme = getThemeById(activeColorThemeId);

  useEffect(() => {
    const handlePhotoSync = () => {
      const saved = localStorage.getItem('anish_profile_photo');
      setLogoPhoto(saved || '/profile.jpg?v=3');
    };
    window.addEventListener('storage', handlePhotoSync);
    window.addEventListener('profilePhotoUpdated', handlePhotoSync);
    return () => {
      window.removeEventListener('storage', handlePhotoSync);
      window.removeEventListener('profilePhotoUpdated', handlePhotoSync);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const sections = ['hero', 'skills', 'education', 'experience', 'projects', 'achievements', 'contact'];
      
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
    { href: '#achievements', label: 'ACHIEVEMENTS', id: 'achievements' },
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
      {/* Top Bar: Brand (Logo + ANISH KUMAR) & Menu Section at Last Corner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Small Animated Profile Logo + ANISH KUMAR Only */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#hero');
          }}
          className="flex items-center gap-3 shrink-0 py-1 group select-none cursor-pointer"
          title="Anish Kumar · Portfolio Home"
        >
          {/* Small Profile Logo with Smooth Animated Circle Border */}
          <div className="relative shrink-0 flex items-center justify-center">
            {/* Ambient Aura Ring */}
            <div
              className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity blur-sm pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${currentTheme.primary}99 0%, ${currentTheme.secondary}44 70%, transparent 100%)`
              }}
            />

            {/* Rotating Conic Gradient Outer Circle Animation */}
            <div
              className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full p-[2px] flex items-center justify-center transition-transform group-hover:scale-105"
            >
              {/* Spinning Animated Border Ring */}
              <div
                className="navbar-logo-spinning-border absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: `conic-gradient(from 0deg, ${currentTheme.primary}, ${currentTheme.secondary}, #f43f5e, #facc15, ${currentTheme.primary})`
                }}
              />

              {/* Inner Circle Crop with Logo */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-[#070b14] z-10">
                <img
                  src={logoPhoto}
                  alt="Anish Kumar professional profile photo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  style={{ objectPosition: 'center 30%' }}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.hasFallenBack) {
                      target.dataset.hasFallenBack = 'true';
                      target.src = '/profile.png?v=3';
                    } else if (!target.dataset.hasFallenBack2) {
                      target.dataset.hasFallenBack2 = 'true';
                      target.src = '/profile.svg';
                    }
                  }}
                />
              </div>

              {/* Micro Status Dot */}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#070a12] z-20 shadow-sm animate-pulse" />
            </div>
          </div>

          {/* Name Only: ANISH KUMAR */}
          <h1 className="text-xl sm:text-2xl font-black tracking-tight font-name-stylish text-white whitespace-nowrap leading-none transition-colors group-hover:text-cyan-400 shrink-0">
            ANISH KUMAR
          </h1>
        </a>

        {/* Right Corner: Menu Section & Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Desktop Navigation Menu Links */}
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

          {/* Resume PDF Action Button */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex px-3.5 py-1.5 rounded-lg text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-95 items-center gap-1.5 cursor-pointer shrink-0"
            style={{
              background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
              boxShadow: `0 0 14px ${currentTheme.glowColor}`
            }}
          >
            <i className="fa-solid fa-file-pdf text-xs" />
            <span>RESUME</span>
          </button>

          {/* Mobile Menu Toggle Button (In Last Corner on Mobile - Icon Only) */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-lg bg-zinc-900/90 border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center w-10 h-10"
            aria-label="Toggle navigation menu"
          >
            <i className={`fa-solid ${mobileNavOpen ? 'fa-xmark' : 'fa-bars'} text-base text-cyan-400`} />
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

          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2.5">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-[#38bdf8] hover:text-white flex items-center gap-1.5 py-2 px-2.5 rounded-lg bg-[#0077b5]/15 border border-[#0077b5]/40 cursor-pointer"
            >
              <i className="fa-brands fa-linkedin-in text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenPaletteModal();
              }}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 py-2 px-2.5 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer"
            >
              <i className="fa-solid fa-palette" />
              <span>Themes</span>
            </button>
            <button
              onClick={() => {
                setMobileNavOpen(false);
                onOpenResume();
              }}
              className="text-xs font-mono text-white font-bold px-3 py-2 rounded-lg cursor-pointer shadow-md"
              style={{
                background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`
              }}
            >
              Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
