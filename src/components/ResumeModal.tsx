import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA, TECHNICAL_SKILLS, ACHIEVEMENTS_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'pdf' | 'ats'>('pdf');
  const [pdfLoadError, setPdfLoadError] = useState(false);

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
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        className="border border-zinc-700/80 w-full max-w-5xl h-[94vh] max-h-[96vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden bg-zinc-950 text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Control Bar */}
        <div className="px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-zinc-900/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 text-cyan-400 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-file-pdf text-base text-red-400" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base font-display">
                  ANISH KUMAR — Official Resume
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  PDF Available
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Software Developer & BMS Operations Specialist · MCA 85% Distinction
              </span>
            </div>
          </div>

          {/* Action Buttons: Download PDF, View Mode, Print, Close */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:inline-flex p-1 bg-zinc-800 rounded-lg text-xs font-mono border border-zinc-700">
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  viewMode === 'pdf'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-file-lines mr-1.5" />
                PDF Document
              </button>
              <button
                onClick={() => setViewMode('ats')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  viewMode === 'ats'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-align-left mr-1.5" />
                ATS Text View
              </button>
            </div>

            {/* Direct PDF Download Button */}
            <a
              href="/Anish_Kumar_Resume.pdf"
              download="Anish_Kumar_Resume.pdf"
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-red-600/30 active:scale-95"
              title="Download official PDF resume directly"
            >
              <i className="fa-solid fa-download" />
              <span>DOWNLOAD PDF</span>
            </a>

            {/* Open PDF in New Tab */}
            <a
              href="/Anish_Kumar_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono items-center gap-1.5 transition-colors border border-zinc-700"
              title="Open PDF in new tab"
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" />
              <span>Full Tab</span>
            </a>

            {/* Print */}
            <button
              onClick={() => window.print()}
              className="hidden lg:flex px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono items-center gap-1.5 transition-colors border border-zinc-700 cursor-pointer"
              title="Print document"
            >
              <i className="fa-solid fa-print" />
              <span>Print</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Close modal"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>
        </div>

        {/* Modal Body Container */}
        <div className="flex-1 overflow-hidden relative bg-zinc-900/50">
          {viewMode === 'pdf' ? (
            /* PDF Document Viewer Container */
            <div className="w-full h-full flex flex-col overflow-y-auto">
              {/* PDF Toolbar Notice */}
              <div className="px-6 py-2.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs text-zinc-400 font-mono shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-zinc-200 font-medium">Anish_Kumar_Resume.pdf</span>
                  <span>(Generated A4 PDF Document)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline">Use browser controls or click download</span>
                  <a
                    href="/Anish_Kumar_Resume.pdf"
                    download="Anish_Kumar_Resume.pdf"
                    className="text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <i className="fa-solid fa-file-arrow-down" /> Direct Save
                  </a>
                </div>
              </div>

              {/* Embedded PDF iframe with seamless fallback */}
              <div className="flex-1 w-full h-full min-h-[550px] relative">
                <iframe
                  src="/Anish_Kumar_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  title="Anish Kumar Resume PDF"
                  className="w-full h-full min-h-[550px] border-0"
                  onError={() => setPdfLoadError(true)}
                />

                {/* If iframe doesn't render in certain restricted sandboxes, show styled fallback card */}
                {pdfLoadError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-zinc-950 text-center">
                    <i className="fa-solid fa-file-pdf text-5xl text-red-500 mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">Resume PDF Ready to Download</h4>
                    <p className="text-sm text-zinc-400 max-w-md mb-6">
                      Your browser preview is restricted, but the official PDF is ready and can be downloaded or opened directly.
                    </p>
                    <div className="flex gap-4">
                      <a
                        href="/Anish_Kumar_Resume.pdf"
                        download="Anish_Kumar_Resume.pdf"
                        className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm font-mono flex items-center gap-2 shadow-lg"
                      >
                        <i className="fa-solid fa-download" />
                        Download Anish_Kumar_Resume.pdf
                      </a>
                      <button
                        onClick={() => setViewMode('ats')}
                        className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm"
                      >
                        Read Formatted Version
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ATS Structured Text Resume (Clean, printable, formatted) */
            <div className="overflow-y-auto h-full p-6 sm:p-10 space-y-6 text-sm text-zinc-200 font-sans" id="printable-resume">
              {/* Header */}
              <div className="text-center pb-5 border-b border-zinc-800">
                <h1 className="text-3xl font-extrabold text-white tracking-wide font-name-stylish">
                  ANISH KUMAR
                </h1>
                <p className="text-cyan-400 font-mono text-xs sm:text-sm mt-1 font-semibold">
                  Software Developer & BMS Operations Specialist
                </p>
                <p className="text-zinc-400 text-xs mt-1">{PERSONAL_INFO.location}</p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-xs font-mono text-zinc-300 mt-2.5">
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-phone text-cyan-400" />
                    <a href={`tel:${PERSONAL_INFO.phone}`} className="hover:text-cyan-300">{PERSONAL_INFO.phoneFormatted}</a>
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-solid fa-envelope text-indigo-400" />
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-300">{PERSONAL_INFO.email}</a>
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="flex items-center gap-1.5">
                    <i className="fa-brands fa-github text-cyan-400" />
                    <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-cyan-300">{PERSONAL_INFO.githubHandle}</a>
                  </span>
                </div>
              </div>

              {/* Professional Summary */}
              <div>
                <h2 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2 border-b border-zinc-800 pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  PROFESSIONAL SUMMARY
                </h2>
                <p className="text-zinc-300 leading-relaxed text-sm">
                  {PERSONAL_INFO.summary}
                </p>
              </div>

              {/* Technical Skills */}
              <div>
                <h2 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2 border-b border-zinc-800 pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  TECHNICAL SKILLS
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm">
                  <div>
                    <span className="text-zinc-400 font-mono">► Languages:</span>{' '}
                    <span className="text-white font-medium">{TECHNICAL_SKILLS.languages.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono">► Frontend:</span>{' '}
                    <span className="text-white font-medium">{TECHNICAL_SKILLS.frontend.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono">► Backend & DB:</span>{' '}
                    <span className="text-white font-medium">{TECHNICAL_SKILLS.backendAndDb.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono">► Tools:</span>{' '}
                    <span className="text-white font-medium">{TECHNICAL_SKILLS.tools.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono">► BMS Infrastructure:</span>{' '}
                    <span className="text-white font-medium">{TECHNICAL_SKILLS.bmsInfrastructure.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-zinc-400 font-mono">► Security Systems:</span>{' '}
                    <span className="text-white font-medium">{TECHNICAL_SKILLS.securitySystems.join(', ')}</span>
                  </div>
                </div>
              </div>

              {/* Professional Experience */}
              <div>
                <h2 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-3 border-b border-zinc-800 pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  PROFESSIONAL EXPERIENCE
                </h2>
                <div className="space-y-4">
                  {EXPERIENCE_DATA.map((exp, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div className="font-bold text-white text-sm">
                          {exp.role} – {exp.company}
                        </div>
                        <div className="text-cyan-400 font-mono text-xs whitespace-nowrap font-medium">
                          {exp.period}
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-indigo-400">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div>
                <h2 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-3 border-b border-zinc-800 pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  PROJECTS
                </h2>
                <div className="space-y-4">
                  {PROJECTS_DATA.map((proj, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div className="font-bold text-white text-sm">
                          {proj.title}
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-2 text-cyan-400 underline hover:text-cyan-300 font-mono text-xs"
                            >
                              {proj.link}
                            </a>
                          )}
                        </div>
                        <div className="text-cyan-400 font-mono text-xs whitespace-nowrap font-medium">
                          {proj.period}
                        </div>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {proj.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="text-indigo-400">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <h2 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2 border-b border-zinc-800 pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  EDUCATION
                </h2>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  {EDUCATION_DATA.map((edu, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <strong className="text-white font-semibold">{edu.degree}</strong>
                        <span className="text-zinc-300"> | {edu.institution} - <strong className="text-cyan-400">{edu.score}</strong></span>
                      </div>
                      <div className="text-zinc-400 font-mono text-xs whitespace-nowrap">{edu.period}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h2 className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider mb-2 border-b border-zinc-800 pb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  ACHIEVEMENTS & CERTIFICATIONS
                </h2>
                <ul className="space-y-1.5 text-xs sm:text-sm text-zinc-300">
                  {ACHIEVEMENTS_DATA.map((ach, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span>
                        <strong className="text-white">{ach.title}</strong>
                        {ach.date && <span className="text-zinc-400 ml-1">({ach.date})</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 shrink-0">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-400" />
            <span>ATS-Compliant 1-Page Layout · Document Ready for Direct Submission</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Anish_Kumar_Resume.pdf"
              download="Anish_Kumar_Resume.pdf"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <i className="fa-solid fa-file-arrow-down" />
              <span>Download PDF File (Anish_Kumar_Resume.pdf)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
