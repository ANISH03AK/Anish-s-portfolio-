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

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="border border-zinc-800 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden bg-zinc-950 text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-zinc-800/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 p-[1.5px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center text-cyan-400">
                <i className="fa-solid fa-palette text-sm" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
                <span>Theme Color Combinations</span>
              </h3>
              <p className="text-xs font-mono text-zinc-300">
                Vibrant 2-to-3 harmonious color combinations applied live across the entire portfolio
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

        {/* Modal Theme Grid */}
        <div className="max-h-[68vh] overflow-y-auto pr-1 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {COLOR_THEMES.map((theme) => {
              const isActive = activeThemeId === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => onSelectTheme(theme.id)}
                  className={`p-4 rounded-2xl text-left transition-all border relative flex flex-col justify-between cursor-pointer group ${
                    isActive
                      ? 'bg-zinc-900/95 border-cyan-400 shadow-xl shadow-cyan-500/20 scale-[1.02]'
                      : 'bg-zinc-950/80 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900/60'
                  }`}
                >
                  {isActive && (
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center text-[10px] font-bold shadow-md">
                      <i className="fa-solid fa-check" />
                    </span>
                  )}

                  <div>
                    {/* 3-Color Swatch Preview */}
                    <div className="flex items-center gap-2 mb-3">
                      {theme.swatch.map((color, idx) => (
                        <span
                          key={idx}
                          className="w-5 h-5 rounded-full border border-black/60 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={`Color ${idx + 1}: ${color}`}
                        />
                      ))}
                      <span className="text-[10px] font-mono text-zinc-400 ml-1">3 Colors</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <i className={`${theme.icon} text-sm`} style={{ color: theme.primary }} />
                      <h4 className="text-sm font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {theme.name}
                      </h4>
                    </div>

                    <p className="text-xs text-zinc-300 mt-1 leading-snug">
                      {theme.tagline}
                    </p>
                  </div>

                  <div className="mt-3.5 pt-2.5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-400">Palette:</span>
                    <span className="font-bold flex items-center gap-1.5">
                      <span style={{ color: theme.primary }}>●</span>
                      <span style={{ color: theme.secondary }}>●</span>
                      <span style={{ color: theme.accent }}>●</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300 font-mono">
          <span>Colors update live on backgrounds, borders, and text</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors cursor-pointer"
          >
            Apply &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
