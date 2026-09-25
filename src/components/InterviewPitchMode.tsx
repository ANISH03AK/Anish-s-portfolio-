import React from 'react';
import { UserCheck, Code, Cpu, Eye } from 'lucide-react';
import { InterviewLens } from '../types/portfolio';

interface InterviewPitchModeProps {
  currentLens: InterviewLens;
  onSelectLens: (lens: InterviewLens) => void;
  onOpenResume: () => void;
}

export const InterviewPitchMode: React.FC<InterviewPitchModeProps> = ({
  currentLens,
  onSelectLens,
}) => {
  return (
    <div className="bg-[#0e1019] border-b border-zinc-800/80 py-2.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-zinc-300">Target Role Lens:</span>
          <span className="text-zinc-500 hidden sm:inline">Customize emphasis for your specific technical interview loop</span>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-zinc-950/80 rounded-xl border border-zinc-800 text-xs">
          <button
            onClick={() => onSelectLens('all')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              currentLens === 'all'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Complete Profile</span>
          </button>

          <button
            onClick={() => onSelectLens('recruiter')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              currentLens === 'recruiter'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Recruiter (Quick Scan)</span>
          </button>

          <button
            onClick={() => onSelectLens('tech-lead')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              currentLens === 'tech-lead'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Full-Stack & React</span>
          </button>

          <button
            onClick={() => onSelectLens('bms-systems')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-colors cursor-pointer ${
              currentLens === 'bms-systems'
                ? 'bg-blue-600 text-white font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>TCS BMS & Systems</span>
          </button>
        </div>
      </div>
    </div>
  );
};
