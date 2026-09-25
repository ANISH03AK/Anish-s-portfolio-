import React from 'react';
import { ColorTheme } from '../data/colorThemes';

interface SkillsGridProps {
  theme?: ColorTheme;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#ef4444';
  const secondaryColor = theme?.secondary || '#facc15';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Category 1: Programming Languages */}
      <div className="glass-card tech-brackets p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="100">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-colors"
            style={{
              backgroundColor: `${primaryColor}18`,
              borderColor: `${primaryColor}40`,
              color: primaryColor
            }}
          >
            <i className="fa-solid fa-code" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">Programming Languages</h3>
            <p className="text-xs font-mono text-zinc-400">Core Foundations</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Python</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">JavaScript (ES6+)</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">SQL</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">C Language</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">C++ Basics</span>
        </div>
        {/* Skill level bars */}
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>Python</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>88%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '88%', backgroundColor: primaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>JavaScript</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>85%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '85%', backgroundColor: primaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>SQL Queries</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>82%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '82%', backgroundColor: primaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 2: Frontend Engineering */}
      <div className="glass-card tech-brackets p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="200">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-colors"
            style={{
              backgroundColor: `${secondaryColor}18`,
              borderColor: `${secondaryColor}40`,
              color: secondaryColor
            }}
          >
            <i className="fa-brands fa-react" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">Frontend Engineering</h3>
            <p className="text-xs font-mono text-zinc-400">Web App Architecture</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors"
            style={{ color: secondaryColor, borderColor: `${secondaryColor}66` }}
          >
            React.js
          </span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">HTML5</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">CSS3</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Tailwind CSS</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Responsive UI</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">RESTful APIs</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">State Management</span>
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>React Architecture</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>90%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '90%', backgroundColor: secondaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>Tailwind CSS</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>92%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '92%', backgroundColor: secondaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>REST API Integration</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>86%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '86%', backgroundColor: secondaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 3: Backend & Database */}
      <div className="glass-card tech-brackets p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="300">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-colors"
            style={{
              backgroundColor: `${primaryColor}18`,
              borderColor: `${primaryColor}40`,
              color: primaryColor
            }}
          >
            <i className="fa-solid fa-database" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">Backend & Database</h3>
            <p className="text-xs font-mono text-zinc-400">Data Persistence & Logic</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">MySQL</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Supabase</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Relational Modeling</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">CRUD Operations</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">JSON APIs</span>
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>MySQL & Schema Design</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>84%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '84%', backgroundColor: primaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>Supabase Backend</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>80%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '80%', backgroundColor: primaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 4: BMS Infrastructure */}
      <div className="glass-card tech-brackets p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="400">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-colors"
            style={{
              backgroundColor: `${secondaryColor}18`,
              borderColor: `${secondaryColor}40`,
              color: secondaryColor
            }}
          >
            <i className="fa-solid fa-network-wired" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">BMS Infrastructure</h3>
            <p className="text-xs font-mono text-zinc-400">Enterprise Automation</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors"
            style={{ color: secondaryColor, borderColor: `${secondaryColor}66` }}
          >
            Johnson Controls Metasys
          </span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Honeywell BMS</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">HVAC Plant Supervision</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">DDC Field Controllers</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Sensor Telemetry</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">BACnet / Modbus</span>
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>Metasys Operations</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>92%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '92%', backgroundColor: secondaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>HVAC Telemetry & Alerts</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>89%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '89%', backgroundColor: secondaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 5: Security & ELV Systems */}
      <div className="glass-card tech-brackets p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="500">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-colors"
            style={{
              backgroundColor: `${primaryColor}18`,
              borderColor: `${primaryColor}40`,
              color: primaryColor
            }}
          >
            <i className="fa-solid fa-video" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">Security & ELV Systems</h3>
            <p className="text-xs font-mono text-zinc-400">Facility Protection</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">CCTV Multi-Tier Systems</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Addressable Fire Alarm Panels</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Access Control (ACS)</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Public Address (PA)</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Emergency Protocol SLAs</span>
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>CCTV & Surveillance</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>90%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '90%', backgroundColor: primaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>Fire Alarm Protocols</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>88%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '88%', backgroundColor: primaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 6: AI / ML & Tools */}
      <div className="glass-card tech-brackets p-6 rounded-2xl" data-aos="fade-up" data-aos-delay="600">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition-colors"
            style={{
              backgroundColor: `${secondaryColor}18`,
              borderColor: `${secondaryColor}40`,
              color: secondaryColor
            }}
          >
            <i className="fa-solid fa-brain" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">AI / ML & Developer Tools</h3>
            <p className="text-xs font-mono text-zinc-400">Research & Workflows</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Convolutional Neural Networks (CNN)</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Deep Learning</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Git & GitHub</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">VS Code</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Vercel Deployment</span>
          <span className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">Troubleshooting</span>
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>CNN Model Implementation</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>85%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '85%', backgroundColor: secondaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>System Troubleshooting</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>95%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '95%', backgroundColor: secondaryColor }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
