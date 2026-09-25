import React, { useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="resume-modal"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="glass-card tech-brackets border border-zinc-800 w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-800/80 flex items-center justify-between telemetry-block">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-red-500/20 border border-red-500/40 text-yellow-400 flex items-center justify-center text-xs font-mono font-bold">
              AK
            </span>
            <div>
              <h3 className="text-white font-bold text-sm font-display">Anish Kumar — Professional Resume Document</h3>
              <span className="text-[10px] font-mono text-zinc-400">Verified Extract from Original PDF</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-red-600/30"
            >
              <i className="fa-solid fa-print" />
              <span>PRINT / SAVE PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-zinc-200 font-sans" id="printable-resume">
          {/* Header / Contact */}
          <div className="border-b border-zinc-800 pb-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl p-1 bg-gradient-to-tr from-red-600 via-red-500 to-yellow-500 shrink-0 shadow-lg shadow-red-500/20">
              <img
                src="profile.jpg"
                alt="Anish Kumar"
                className="w-full h-full rounded-xl object-cover"
                style={{ objectPosition: 'center 36%' }}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.hasFallenBack) {
                    target.dataset.hasFallenBack = 'true';
                    target.src = 'profile.svg';
                  }
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-white font-display tracking-tight">ANISH KUMAR</h1>
              <p className="text-yellow-400 font-mono text-sm font-semibold mt-1">React JS Developer · BMS & ELV Engineer</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-zinc-400 mt-2">
                <span>
                  <i className="fa-solid fa-envelope text-red-400 mr-1" />
                  {PERSONAL_INFO.email}
                </span>
                <span>
                  <i className="fa-solid fa-phone text-yellow-400 mr-1" />
                  {PERSONAL_INFO.phone}
                </span>
                <span>
                  <i className="fa-solid fa-location-dot text-red-400 mr-1" />
                  {PERSONAL_INFO.location}
                </span>
                <span>
                  <i className="fa-brands fa-github text-yellow-400 mr-1" />
                  {PERSONAL_INFO.githubHandle}
                </span>
                <span>
                  <i className="fa-solid fa-passport text-yellow-400 mr-1" />
                  Indian Passport Holder (Relocation Ready)
                </span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase text-yellow-400 font-bold tracking-wider mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-zinc-300 leading-relaxed text-sm">
              MCA graduate and Software Developer skilled in React JS, Python, and SQL. Proven experience building responsive web applications, consuming RESTful APIs, and maintaining critical enterprise infrastructure (BMS, Fire Alarms, CCTV) at Tata Consultancy Services (TCS). Seeking to leverage full-stack development and complex system troubleshooting skills in a fast-paced IT role.
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase text-yellow-400 font-bold tracking-wider mb-3">PROFESSIONAL EXPERIENCE</h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl telemetry-block border border-zinc-800/80">
                <div className="flex justify-between flex-wrap text-xs font-mono mb-1">
                  <strong className="text-white">Tata Consultancy Services (TCS) — BMS Operations Engineer</strong>
                  <span className="text-zinc-400">Chennai, India</span>
                </div>
                <p className="text-[11px] font-mono text-yellow-400 mb-2">Contract via Johnson Controls India Pvt. Ltd.</p>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300">
                  <li>Supervised building management telemetry, HVAC, chillers, and VAV setpoints using Johnson Controls Metasys.</li>
                  <li>Conducted routine diagnostics and emergency responses for addressable fire alarms and multi-zone CCTV.</li>
                  <li>Achieved 100% SLA uptime adherence across mission-critical corporate campus facilities.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl telemetry-block border border-zinc-800/80">
                <div className="flex justify-between flex-wrap text-xs font-mono mb-1">
                  <strong className="text-white">Fino Payment Bank — Operations & Technical Support</strong>
                  <span className="text-zinc-400">Operations</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs text-zinc-300 mt-2">
                  <li>Managed digital banking transactions, query resolution, and merchant account verifications.</li>
                  <li>Monitored database logs and discrepancy reconciliations in fast-paced operational workflows.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase text-yellow-400 font-bold tracking-wider mb-3">EDUCATION</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl telemetry-block border border-zinc-800/80">
                <div className="text-yellow-400 font-mono text-xs font-bold">MCA — 85% DISTINCTION</div>
                <div className="text-white font-bold text-sm">Master of Computer Applications</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">Malla Reddy Engineering College · 2022–2024</div>
              </div>
              <div className="p-3.5 rounded-xl telemetry-block border border-zinc-800/80">
                <div className="text-red-400 font-mono text-xs font-bold">B.Sc. (MPCs) — 71% FIRST CLASS</div>
                <div className="text-white font-bold text-sm">Bachelor of Science (Maths, Physics, CS)</div>
                <div className="text-xs text-zinc-400 font-mono mt-0.5">Pragathi Arts & Science College · 2019–2022</div>
              </div>
            </div>
          </div>

          {/* Technical Skills Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase text-yellow-400 font-bold tracking-wider mb-2">TECHNICAL CAPABILITIES</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-zinc-400 font-mono">Languages:</span> <span className="text-white">Python, JavaScript (ES6+), SQL, C, C++</span>
              </div>
              <div>
                <span className="text-zinc-400 font-mono">Frontend:</span> <span className="text-white">React.js, Tailwind CSS, HTML5, CSS3, REST APIs</span>
              </div>
              <div>
                <span className="text-zinc-400 font-mono">Backend/DB:</span> <span className="text-white">Python, MySQL, Supabase, Relational Modeling</span>
              </div>
              <div>
                <span className="text-zinc-400 font-mono">BMS/ELV:</span> <span className="text-white">Johnson Controls Metasys, Honeywell, CCTV, Fire Alarm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
