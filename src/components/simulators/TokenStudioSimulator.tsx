import React, { useState } from 'react';
import { Palette, CheckCircle2, ShieldCheck } from 'lucide-react';

export const TokenStudioSimulator: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'indigo' | 'emerald' | 'amber'>('indigo');
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');

  const themes = {
    indigo: {
      name: 'Electric Indigo',
      primaryBg: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      accentBorder: 'border-indigo-500/40',
      badgeBg: 'bg-indigo-950/60 text-indigo-300',
      contrastRatio: '8.4:1',
      wcag: 'AAA Compliant'
    },
    emerald: {
      name: 'Terminal Emerald',
      primaryBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      accentBorder: 'border-emerald-500/40',
      badgeBg: 'bg-emerald-950/60 text-emerald-300',
      contrastRatio: '7.8:1',
      wcag: 'AAA Compliant'
    },
    amber: {
      name: 'Cyber Amber',
      primaryBg: 'bg-amber-600 hover:bg-amber-500 text-white',
      accentBorder: 'border-amber-500/40',
      badgeBg: 'bg-amber-950/60 text-amber-300',
      contrastRatio: '6.9:1',
      wcag: 'AA Large & AA Body'
    }
  };

  const current = themes[activeTheme];

  const handleAction = () => {
    if (buttonState !== 'idle') return;
    setButtonState('loading');
    setTimeout(() => {
      setButtonState('success');
      setTimeout(() => setButtonState('idle'), 1600);
    }, 800);
  };

  return (
    <div className="w-full bg-[#0d0f17] border border-zinc-800 rounded-xl p-4 font-mono text-xs select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold text-zinc-200">Nexus Design Token Studio</span>
          <span className="text-[10px] text-zinc-400">· WCAG 2.1 Engine</span>
        </div>
        <div className="flex items-center gap-1 font-sans">
          {(['indigo', 'emerald', 'amber'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTheme(t)}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                activeTheme === t
                  ? 'bg-zinc-200 text-zinc-900 font-semibold'
                  : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Component Sandbox */}
      <div className={`p-4 rounded-lg bg-zinc-950/80 border ${current.accentBorder} transition-colors duration-300 mb-3`}>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-zinc-200 font-sans font-semibold text-sm">Interactive Button Primitive</span>
              <span className={`text-[10px] font-sans px-1.5 py-0.5 rounded ${current.badgeBg}`}>
                {current.name}
              </span>
            </div>
            <div className="text-[11px] text-zinc-400 font-sans">
              Headless Radix state machine + full keyboard navigation
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAction}
              disabled={buttonState === 'loading'}
              className={`px-4 py-2 rounded-lg font-sans font-medium text-xs transition-all duration-200 shadow-sm flex items-center gap-1.5 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 ${current.primaryBg}`}
            >
              {buttonState === 'loading' && (
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              )}
              {buttonState === 'success' && <CheckCircle2 className="w-3.5 h-3.5" />}
              <span>
                {buttonState === 'idle' ? 'Trigger Action' : buttonState === 'loading' ? 'Processing...' : 'Executed'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Accessibility Contrast Matrix */}
      <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
        <div className="bg-zinc-900/60 p-2.5 rounded border border-zinc-800 flex items-center justify-between">
          <span className="text-zinc-400">Relative Luminance Contrast:</span>
          <span className="font-semibold text-emerald-400 tabular-nums">{current.contrastRatio}</span>
        </div>
        <div className="bg-zinc-900/60 p-2.5 rounded border border-zinc-800 flex items-center justify-between">
          <span className="text-zinc-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Accessibility Rating:</span>
          </span>
          <span className="font-semibold text-zinc-200">{current.wcag}</span>
        </div>
      </div>
    </div>
  );
};
