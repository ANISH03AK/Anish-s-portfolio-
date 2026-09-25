import React, { useState, useEffect } from 'react';
import { Project } from '../types/portfolio';
import { X, ArrowRight, CheckCircle2, GitBranch, Layers, Sparkles } from 'lucide-react';
import { DexterSimulator } from './simulators/DexterSimulator';
import { DeepfakeSimulator } from './simulators/DeepfakeSimulator';
import { BmsSimulator } from './simulators/BmsSimulator';
import { TourismSimulator } from './simulators/TourismSimulator';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'star' | 'tradeoffs' | 'demo'>('star');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0f17] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-zinc-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-[#121420]">
          <div>
            {/* Zero-Pill unboxed kicker */}
            <div className="text-xs text-blue-400 font-semibold tracking-wide">
              {project.kicker}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            title="Close modal (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center px-6 border-b border-zinc-800/60 bg-[#0f111a] text-xs font-medium gap-4">
          <button
            onClick={() => setActiveTab('star')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'star'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            STAR Method Breakdown
          </button>
          <button
            onClick={() => setActiveTab('tradeoffs')}
            className={`py-3 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'tradeoffs'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Engineering Trade-Offs
          </button>
          <button
            onClick={() => setActiveTab('demo')}
            className={`py-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'demo'
                ? 'border-blue-500 text-blue-400 font-semibold'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Stats Bar */}
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-zinc-400">Headline Impact Metric</div>
              <div className="text-2xl font-bold text-white font-mono mt-0.5">{project.headlineMetric}</div>
              <div className="text-xs text-emerald-400">{project.metricLabel}</div>
            </div>
            {/* Tech Stack Unboxed Text */}
            <div className="space-y-1">
              <div className="text-xs text-zinc-400">Core Technologies</div>
              <div className="text-xs font-mono text-zinc-300 flex flex-wrap items-center gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <React.Fragment key={tech}>
                    <span>{tech}</span>
                    {idx < project.techStack.length - 1 && <span className="text-zinc-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Tab 1: STAR Method */}
          {activeTab === 'star' && (
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-zinc-400 tracking-wider">
                  SITUATION
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/50 p-3.5 rounded-lg border border-zinc-800/80">
                  {project.star.situation}
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-semibold text-zinc-400 tracking-wider">
                  TASK
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-950/50 p-3.5 rounded-lg border border-zinc-800/80">
                  {project.star.task}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-zinc-400 tracking-wider">
                  ENGINEERING ACTIONS
                </h3>
                <div className="space-y-2">
                  {project.star.action.map((act, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-zinc-950/50 border border-zinc-800/80 text-sm text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-zinc-400 tracking-wider">
                  MEASURED RESULTS
                </h3>
                <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-emerald-200 text-sm font-medium">
                  {project.star.result}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {project.star.metrics.map((m, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-zinc-900/80 border border-zinc-800 text-center text-xs font-semibold text-zinc-200"
                    >
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Engineering Trade-Offs */}
          {activeTab === 'tradeoffs' && (
            <div className="space-y-4">
              <div className="text-xs text-zinc-400 mb-2">
                In technical interviews, explaining why you chose one architecture over another proves engineering judgment. Here are the core decisions:
              </div>
              {project.tradeoffs.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800 space-y-3"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/40 text-emerald-200">
                      <div className="text-[10px] text-emerald-400 font-semibold mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>CHOSEN APPROACH</span>
                      </div>
                      <div className="font-semibold text-sm">{item.chosen}</div>
                    </div>
                    <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800 text-zinc-400">
                      <div className="text-[10px] text-zinc-400 font-semibold mb-1 flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        <span>CONSIDERED ALTERNATIVE</span>
                      </div>
                      <div className="font-semibold text-sm text-zinc-300">{item.alternative}</div>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-300 leading-relaxed pt-2 border-t border-zinc-800/80">
                    <strong className="text-zinc-100">Engineering Rationale: </strong>
                    {item.rationale}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Interactive Simulator */}
          {activeTab === 'demo' && (
            <div className="space-y-3">
              <div className="text-xs text-zinc-400 mb-2">
                Live interactive model demonstrating core performance invariants:
              </div>
              {project.type === 'ecommerce' && <DexterSimulator />}
              {project.type === 'deepfake' && <DeepfakeSimulator />}
              {project.type === 'bms' && <BmsSimulator />}
              {project.type === 'tourism' && <TourismSimulator />}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-zinc-800/80 bg-[#121420] text-xs">
          <span className="text-zinc-400">
            Interview Case Study · Anish Kumar
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium transition-colors cursor-pointer"
          >
            Close Deep Dive
          </button>
        </div>
      </div>
    </div>
  );
};
