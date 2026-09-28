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
        <div className="px-4 sm:px-6 py-3.5 border-b border-zinc-800 bg-zinc-900/95 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center text-sm font-bold">
              <i className="fa-solid fa-file-pdf text-base" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-white font-bold text-sm sm:text-base font-display">
                  ANISH KUMAR — Official Resume (PDF)
                </h3>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold">
                  Original Document
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Software Developer &amp; BMS Operations Specialist · 8668183926
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
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-file-pdf mr-1.5" />
                Original PDF
              </button>
              <button
                onClick={() => setViewMode('ats')}
                className={`px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  viewMode === 'ats'
                    ? 'bg-red-600 text-white shadow-sm'
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
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-md shadow-red-600/30 active:scale-95"
              title="Download exact official PDF resume"
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
              <span>Open Tab</span>
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
                  <span>(Exact 1-Page Document)</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="/Anish_Kumar_Resume.pdf"
                    download="Anish_Kumar_Resume.pdf"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
                  >
                    <i className="fa-solid fa-file-arrow-down" /> Click to Save File
                  </a>
                </div>
              </div>

              {/* Embedded PDF iframe */}
              <div className="flex-1 w-full h-full min-h-[550px] relative bg-zinc-900">
                <iframe
                  src="/Anish_Kumar_Resume.pdf#toolbar=1&navpanes=0&scrollbar=1"
                  title="Anish Kumar Resume PDF"
                  className="w-full h-full min-h-[550px] border-0"
                  onError={() => setPdfLoadError(true)}
                />

                {/* Seamless Fallback Card */}
                {pdfLoadError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-zinc-950 text-center">
                    <i className="fa-solid fa-file-pdf text-5xl text-red-500 mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">Resume PDF Ready to Download</h4>
                    <p className="text-sm text-zinc-400 max-w-md mb-6">
                      Click below to download or open the exact original resume PDF file directly.
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* ATS Structured Text Resume (Exact Match to Image & Order) */
            <div className="overflow-y-auto h-full p-6 sm:p-12 text-black bg-white font-sans max-w-3xl mx-auto shadow-xl" id="printable-resume">
              {/* Header */}
              <div className="text-center pb-4">
                <h1 className="text-2xl font-black text-black tracking-wide font-display">
                  ANISH KUMAR
                </h1>
                <p className="text-xs text-gray-800 mt-1">Anna Nagar West, Chennai, 600040</p>
                <p className="text-xs text-gray-800 mt-1">
                  8668183926 | anish03ak@gmail.com | <a href="https://github.com/ANISH03AK" target="_blank" rel="noreferrer" className="text-black underline">https://github.com/ANISH03AK</a>
                </p>
              </div>

              {/* 1. PROFESSIONAL SUMMARY */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                  PROFESSIONAL SUMMARY
                </h2>
                <div className="h-[1px] bg-black w-full mt-1 mb-2" />
                <p className="text-xs leading-relaxed text-gray-900">
                  • MCA graduate and Software Developer skilled in React JS, Python, and SQL. Proven experience building responsive web applications, consuming RESTful APIs, and maintaining critical enterprise infrastructure (BMS, Fire Alarms, CCTV) at TCS. Seeking to leverage full-stack development and complex system troubleshooting skills in a fast-paced IT role.
                </p>
              </div>

              {/* 2. EDUCATION */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                  EDUCATION
                </h2>
                <div className="h-[1px] bg-black w-full mt-1 mb-2" />
                <div className="space-y-1.5 text-xs text-gray-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold">Master of Computer Applications</span> | Meenakshi Ramasamy Engineering College - 85%
                    </div>
                    <div className="font-bold whitespace-nowrap">Aug 2022 – Aug 2024</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold">B.Sc. in Computer Science</span> | Meenakshi Ramasamy Arts and Science College - 82%
                    </div>
                    <div className="font-bold whitespace-nowrap">Jul 2019 – Apr 2022</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold">Diploma in Computer Hardware</span> | Meenakshi Ramasamy Arts and Science College - 80%
                    </div>
                    <div className="font-bold whitespace-nowrap">Jul 2019 – Apr 2020</div>
                  </div>
                </div>
              </div>

              {/* 3. TECHNICAL SKILLS */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                  TECHNICAL SKILLS
                </h2>
                <div className="h-[1px] bg-black w-full mt-1 mb-2" />
                <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-gray-900">
                  <div>
                    <span className="font-bold">► Languages:</span> Python, JavaScript, SQL
                  </div>
                  <div>
                    <span className="font-bold">► Frontend:</span> HTML5, CSS3, React JS, UI/UX, React Native
                  </div>
                  <div>
                    <span className="font-bold">► Backend &amp; DB:</span> MYSQL, RESTful APIs, RDBMS, Supabase
                  </div>
                  <div>
                    <span className="font-bold">► Tools:</span> Git, GitHub, MS Office Suite
                  </div>
                  <div>
                    <span className="font-bold">► BMS Infrastructure:</span> Fire Alarm, WLD, VESDA, AHU, NOVEC System
                  </div>
                  <div>
                    <span className="font-bold">► Security Systems:</span> Rodent Repellent, PA, CCTV, Flap Barrier
                  </div>
                </div>
              </div>

              {/* 4. EXPERIENCE */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                  EXPERIENCE
                </h2>
                <div className="h-[1px] bg-black w-full mt-1 mb-2" />
                <div className="space-y-3 text-xs text-gray-900">
                  <div>
                    <div className="flex items-center justify-between font-bold">
                      <span>BMS Engineer – Tata Consultancy Services (TCS) (Contract via Johnson Controls)</span>
                      <span>Sept 2025 – Present</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 leading-relaxed">
                      <li>• Manage and maintain comprehensive Building Management Systems (BMS) for TCS facilities, ensuring uninterrupted and secure operations.</li>
                      <li>• Operate and troubleshoot critical infrastructure, including WLD, VESDA, Rodent repellent, PA systems, Air Handling Units (AHU), and NOVEC fire suppression systems.</li>
                      <li>• Oversee enterprise security hardware and access controls (Fire Alarms, CCTV, Flap Barriers) and execute daily operational database management using SQL.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-bold">
                      <span>Intern – Fino Payment Bank: Jayankondam</span>
                      <span>Dec 2024 – June 2025</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 leading-relaxed">
                      <li>• Executed daily banking operations and analyzed customer data to optimize workflow efficiency.</li>
                      <li>• Completed a comprehensive research study on payment bank services, earning a "Very Good" performance rating from management.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 5. PROJECTS */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                  PROJECTS
                </h2>
                <div className="h-[1px] bg-black w-full mt-1 mb-2" />
                <div className="space-y-3 text-xs text-gray-900">
                  <div>
                    <div className="flex items-center justify-between font-bold">
                      <span>Dexter Men's Wear (React JS) | <a href="https://dexter-style-elevation.vercel.app/" target="_blank" rel="noreferrer" className="underline">https://dexter-style-elevation.vercel.app/</a></span>
                      <span>Apr 2026</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 leading-relaxed">
                      <li>• Engineered a responsive e-commerce application using React JS, featuring dynamic state management and scalable components.</li>
                      <li>• Consumed RESTful APIs for dynamic UI rendering and utilized AI tools (Copilot, ChatGPT) to accelerate the development cycle.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-bold">
                      <span>Detection of Fake and Fraudulent Faces via Neural Network (Python)</span>
                      <span>Aug 2024</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 leading-relaxed">
                      <li>• Trained Convolutional Neural Networks (CNNs) using Python to accurately detect and classify synthesized and realistic fake facial images.</li>
                      <li>• Developed modular, scalable code optimized for future REST API deployment to address security vulnerabilities.</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center justify-between font-bold">
                      <span>Online Tourism Management System</span>
                      <span>Apr 2022</span>
                    </div>
                    <ul className="mt-1 space-y-0.5 leading-relaxed">
                      <li>• Built a web platform with secure backend API endpoints to efficiently manage user bookings and travel itineraries.</li>
                      <li>• Developed an intuitive administrator interface for seamless MySQL database interaction and package management.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 6. ACHIEVEMENTS */}
              <div className="mt-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                  ACHIEVEMENTS
                </h2>
                <div className="h-[1px] bg-black w-full mt-1 mb-2" />
                <ul className="space-y-0.5 text-xs text-gray-900 leading-relaxed">
                  <li>• First Place: Code Conversion competition at "Tech Fest 22" (06-06-2022)</li>
                  <li>• Participant: State-level seminar on "Python for Data Science" via Cognitive Class (29-04-2022)</li>
                  <li>• Participant: State-level webinar on "Roles and Responsibilities of Database Administrator" via Cognitive Class (20-12-2021)</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="px-6 py-3 border-t border-zinc-800 bg-zinc-950 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 shrink-0">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-circle-check text-emerald-400" />
            <span>Exact 1-Page Official Resume PDF Ready</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Anish_Kumar_Resume.pdf"
              download="Anish_Kumar_Resume.pdf"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <i className="fa-solid fa-download" />
              <span>Download PDF File (Anish_Kumar_Resume.pdf)</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
