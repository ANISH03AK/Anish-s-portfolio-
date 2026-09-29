import React, { useState, useEffect } from 'react';
import { NetworkParallax } from './components/NetworkParallax';
import { Navbar, BlockTheme } from './components/Navbar';
import { Hero } from './components/Hero';
import { SkillsSection } from './components/SkillsSection';
import { EducationSection } from './components/EducationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ContactSection } from './components/ContactSection';
import { SectionDivider } from './components/SectionDivider';
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
        duration: 650,
        easing: 'ease-out-cubic',
        once: true,
        offset: 30
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
      {/* Animated Constellation & Ambient Mesh Parallax Background */}
      <NetworkParallax theme={currentTheme} />

      {/* Sticky Navigation Bar with Interactive Palette Switcher (No Logo, No About) */}
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

        {/* Subtle Animated Gradient Divider: Hero -> Skills */}
        <SectionDivider theme={currentTheme} />

        {/* Horizontal Technical Skills Section */}
        <SkillsSection theme={currentTheme} />

        {/* Subtle Animated Gradient Divider: Skills -> Education */}
        <SectionDivider theme={currentTheme} />

        {/* Education Section matching Resume */}
        <EducationSection theme={currentTheme} />

        {/* Subtle Animated Gradient Divider: Education -> Experience */}
        <SectionDivider theme={currentTheme} />

        {/* Experience Section with 3-Color Combination Themes */}
        <ExperienceSection theme={currentTheme} />

        {/* Subtle Animated Gradient Divider: Experience -> Projects */}
        <SectionDivider theme={currentTheme} />

        {/* Projects Section with 3-Color Combination Themes */}
        <ProjectsSection theme={currentTheme} />

        {/* Subtle Animated Gradient Divider: Projects -> Achievements */}
        <SectionDivider theme={currentTheme} />

        {/* Achievements Section matching Resume */}
        <AchievementsSection theme={currentTheme} />
      </main>

      {/* Subtle Animated Gradient Divider: Achievements -> Contact */}
      <SectionDivider theme={currentTheme} />

      {/* Contact Section */}
      <ContactSection onOpenResume={() => setIsResumeOpen(true)} theme={currentTheme} />

      {/* Floating Profile Action Corner */}
      <FloatingProfileCorner onOpenResume={() => setIsResumeOpen(true)} />

      {/* Printable Professional Resume PDF Modal */}
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
