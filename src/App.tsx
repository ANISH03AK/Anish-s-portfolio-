import React, { useState, useEffect } from 'react';
import { NetworkParallax } from './components/NetworkParallax';
import { Navbar, BlockTheme } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { FloatingProfileCorner } from './components/FloatingProfileCorner';
import { ResumeModal } from './components/ResumeModal';
import { ColorPaletteModal } from './components/ColorPaletteModal';
import { ColorTheme, getThemeById, DEFAULT_THEME_ID } from './data/colorThemes';

export default function App() {
  const [blockTheme, setBlockThemeState] = useState<BlockTheme>('cyber');
  const [colorThemeId, setColorThemeId] = useState<string>(DEFAULT_THEME_ID);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  const currentTheme: ColorTheme = getThemeById(colorThemeId);

  useEffect(() => {
    let savedBlock: BlockTheme = 'cyber';
    let savedColor: string = DEFAULT_THEME_ID;

    try {
      const storedBlock = localStorage.getItem('blockTheme') as BlockTheme;
      if (['cyber', 'obsidian', 'blueprint', 'frosted'].includes(storedBlock)) {
        savedBlock = storedBlock;
      }
      const storedColor = localStorage.getItem('colorTheme');
      if (storedColor) {
        savedColor = storedColor;
      }
    } catch (e) {}

    setBlockThemeState(savedBlock);
    setColorThemeId(savedColor);

    document.body.setAttribute('data-block-theme', savedBlock);
    document.body.setAttribute('data-color-theme', savedColor);

    const themeObj = getThemeById(savedColor);
    applyCssThemeVariables(themeObj);

    const aos = (window as any).AOS;
    if (aos) {
      aos.init({
        duration: 750,
        easing: 'ease-out-cubic',
        once: true,
        offset: 40
      });
    }
  }, []);

  const applyCssThemeVariables = (theme: ColorTheme) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', theme.primary);
    root.style.setProperty('--theme-secondary', theme.secondary);
    root.style.setProperty('--theme-accent', theme.accent);
    root.style.setProperty('--theme-glow', theme.glowColor);
    root.style.setProperty('--theme-bracket-top', theme.primary);
    root.style.setProperty('--theme-bracket-bot', theme.secondary);
    root.style.setProperty('--bg-base', theme.bgDark);
  };

  const handleSelectBlockTheme = (theme: BlockTheme) => {
    setBlockThemeState(theme);
    document.body.setAttribute('data-block-theme', theme);
    try {
      localStorage.setItem('blockTheme', theme);
    } catch (e) {}
  };

  const handleSelectColorTheme = (themeId: string) => {
    setColorThemeId(themeId);
    document.body.setAttribute('data-color-theme', themeId);
    const themeObj = getThemeById(themeId);
    applyCssThemeVariables(themeObj);
    try {
      localStorage.setItem('colorTheme', themeId);
    } catch (e) {}
  };

  return (
    <div
      className="relative min-h-screen text-slate-100 font-sans transition-colors duration-500"
      style={{
        backgroundColor: currentTheme.bgDark
      }}
    >
      {/* Enterprise Software Networking Parallax Background */}
      <NetworkParallax theme={currentTheme} />

      {/* Top Navigation Bar with Telemetry Ticker and Theme Switcher */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        blockTheme={blockTheme}
        onSelectTheme={handleSelectBlockTheme}
        activeColorThemeId={colorThemeId}
        onSelectColorTheme={handleSelectColorTheme}
        onOpenPaletteModal={() => setIsPaletteOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} theme={currentTheme} />
        <AboutSection theme={currentTheme} />
        <SkillsSection theme={currentTheme} />
        <ExperienceSection theme={currentTheme} />
        <ProjectsSection theme={currentTheme} />
      </main>

      {/* Contact & Relocation Footer */}
      <ContactSection onOpenResume={() => setIsResumeOpen(true)} theme={currentTheme} />

      {/* Critical Fixed Bottom-Right Interactive Profile Element */}
      <FloatingProfileCorner onOpenResume={() => setIsResumeOpen(true)} />

      {/* Printable Professional Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Interactive Color Palette Studio Modal */}
      <ColorPaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        activeThemeId={colorThemeId}
        onSelectTheme={handleSelectColorTheme}
      />
    </div>
  );
}
