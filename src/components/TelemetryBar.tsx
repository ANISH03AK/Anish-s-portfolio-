import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Layers, Sparkles, Terminal } from 'lucide-react';

export type BlockTheme = 'cyber' | 'obsidian' | 'blueprint' | 'frosted';

export const TelemetryBar: React.FC = () => {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [activeRoute, setActiveRoute] = useState('CORE // OVERVIEW');
  const [theme, setTheme] = useState<BlockTheme>('cyber');

  useEffect(() => {
    // Load persisted theme
    const savedTheme = localStorage.getItem('block-theme') as BlockTheme | null;
    if (savedTheme && ['cyber', 'obsidian', 'blueprint', 'frosted'].includes(savedTheme)) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-block-theme', savedTheme);
    } else {
      document.documentElement.setAttribute('data-block-theme', 'cyber');
    }

    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setScrollDepth(Math.round(scrollY));

      // Calculate active route segment
      if (scrollY < 600) {
        setActiveRoute('CORE // OVERVIEW');
      } else if (scrollY < 1600) {
        setActiveRoute('FABRIC // DEPLOYMENTS');
      } else if (scrollY < 2600) {
        setActiveRoute('INFRA // TCS_BMS');
      } else if (scrollY < 3600) {
        setActiveRoute('SDN // SKILLS_MATRIX');
      } else if (scrollY < 4600) {
        setActiveRoute('ACADEMICS // MCA_DISTINCTION');
      } else {
        setActiveRoute('DISPATCH // CONTACT');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleThemeChange = (newTheme: BlockTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-block-theme', newTheme);
    localStorage.setItem('block-theme', newTheme);
  };

  return (
    <div
      role="region"
      aria-label="Enterprise Telemetry & Theme Switcher Bar"
      className="sticky top-0 z-50 w-full border-b border-cyan-500/20 bg-[#040711]/95 backdrop-blur-md text-[11px] font-mono text-zinc-400 select-none shadow-sm shadow-cyan-950/30"
    >
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-3 sm:px-6">
        {/* Left: Live Telemetry Metrics */}
        <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto no-scrollbar py-1">
          {/* Uptime Indicator */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-zinc-200 font-semibold">TCS BMS:</span>
            <span className="text-emerald-400">99.99% UPTIME</span>
          </div>

          <span className="text-zinc-700 hidden sm:inline">|</span>

          {/* Active Route */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Activity className="w-3 h-3 text-cyan-400" />
            <span className="text-zinc-500">ROUTE:</span>
            <span className="text-cyan-300 font-semibold">{activeRoute}</span>
          </div>

          <span className="text-zinc-700 hidden md:inline">|</span>

          {/* Scroll Depth in Pixels */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0">
            <span className="text-zinc-500">DEPTH:</span>
            <span className="text-zinc-300">{scrollDepth}PX</span>
          </div>

          <span className="text-zinc-700 hidden lg:inline">|</span>

          {/* Latency */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0">
            <span className="text-zinc-500">LATENCY:</span>
            <span className="text-emerald-400">12ms (NOMINAL)</span>
          </div>
        </div>

        {/* Right: Interactive 4-Mode Block Background Switcher */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 pl-2">
          <div className="flex items-center gap-1 text-zinc-400 mr-1 hidden sm:flex">
            <Layers className="w-3 h-3 text-cyan-400" />
            <span className="text-[10px] uppercase tracking-wider text-zinc-400">BLOCK BG:</span>
          </div>

          {(['cyber', 'obsidian', 'blueprint', 'frosted'] as BlockTheme[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleThemeChange(mode)}
              className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                theme === mode
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_8px_rgba(0,242,254,0.3)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent'
              }`}
              title={`Switch to ${mode} block background`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
