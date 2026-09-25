import React from 'react';
import { COLOR_THEMES, ColorTheme } from '../data/colorThemes';

interface ColorPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export const ColorPaletteModal: React.FC<ColorPaletteModalProps> = ({
  isOpen,
  onClose,
  activeThemeId,
  onSelectTheme
}) => {
  if (!isOpen) return null;

  const coreThemes = COLOR_THEMES.filter(t => t.category === 'core');
  const optionalThemes = COLOR_THEMES.filter(t => t.category === 'optional');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="glass-card tech-brackets border border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Top Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-amber-500 to-red-600 p-[1.5px] shadow-lg shadow-yellow-500/20">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center text-yellow-400">
                <i className="fa-solid fa-palette text-sm" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <span>Color Palette & Background Studio</span>
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Separated Black, Red & Gold + Optional Pretty Harmonized Schemes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="max-h-[68vh] overflow-y-auto pr-1 py-4 space-y-6">
          {/* Section 1: Separated Core Palettes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-[11px]" />
                <span>Separated Core Palettes (Black, Red & Gold)</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Main User Choice</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {coreThemes.map((theme) => {
                const isActive = activeThemeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onSelectTheme(theme.id)}
                    className={`p-4 rounded-2xl text-left transition-all border relative flex flex-col justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-zinc-900/90 border-yellow-400 shadow-lg shadow-yellow-500/20 scale-[1.02]'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-yellow-400 text-black flex items-center justify-center text-[10px] font-bold shadow-md">
                        <i className="fa-solid fa-check" />
                      </span>
                    )}

                    <div>
                      {/* Swatch preview */}
                      <div className="flex items-center gap-1.5 mb-3">
                        {theme.swatch.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-4 h-4 rounded-full border border-black/40 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <i className={`${theme.icon} text-xs`} style={{ color: theme.primary }} />
                        <h4 className="text-sm font-bold text-white font-display group-hover:text-yellow-400 transition-colors">
                          {theme.name}
                        </h4>
                      </div>

                      <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                        {theme.tagline}
                      </p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-zinc-500">ACCENT</span>
                      <span className="font-bold uppercase" style={{ color: theme.primary }}>
                        {theme.primary}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Optional Harmonized Palettes */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <i className="fa-solid fa-wand-magic-sparkles text-[11px]" />
                <span>Optional Pretty Palettes (Combined with Background)</span>
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Dynamic Harmonized</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {optionalThemes.map((theme) => {
                const isActive = activeThemeId === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => onSelectTheme(theme.id)}
                    className={`p-4 rounded-2xl text-left transition-all border relative flex items-center justify-between cursor-pointer group ${
                      isActive
                        ? 'bg-zinc-900/90 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                        : 'bg-zinc-950/70 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Swatch column */}
                      <div className="flex flex-col gap-1 mt-0.5">
                        {theme.swatch.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-3.5 h-3.5 rounded-full border border-black/40 shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <i className={`${theme.icon} text-xs`} style={{ color: theme.primary }} />
                          <h4 className="text-sm font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                            {theme.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-zinc-400 mt-1 leading-snug">
                          {theme.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 ml-3">
                      {isActive ? (
                        <span className="w-6 h-6 rounded-full bg-cyan-400 text-black flex items-center justify-center text-xs font-bold shadow-md">
                          <i className="fa-solid fa-check" />
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white">
                          Select
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2 text-yellow-400">
            <i className="fa-solid fa-sparkles" />
            <span>Theme seamlessly updates conduits, canvas packets & animations</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs font-mono transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
