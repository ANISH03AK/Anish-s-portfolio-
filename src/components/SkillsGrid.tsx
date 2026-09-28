import React from 'react';
import { ColorTheme } from '../data/colorThemes';
import { TECHNICAL_SKILLS } from '../data/portfolioData';

interface SkillsGridProps {
  theme?: ColorTheme;
}

export const SkillsGrid: React.FC<SkillsGridProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#ef4444';
  const secondaryColor = theme?.secondary || '#facc15';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Category 1: Languages */}
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
            <h3 className="font-bold text-white text-base font-display">Languages</h3>
            <p className="text-xs font-mono text-zinc-400">Core Foundations</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECHNICAL_SKILLS.languages.map((skill, idx) => (
            <span key={idx} className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">
              {skill}
            </span>
          ))}
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
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>86%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '86%', backgroundColor: primaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>SQL</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>85%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '85%', backgroundColor: primaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 2: Frontend */}
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
            <h3 className="font-bold text-white text-base font-display">Frontend</h3>
            <p className="text-xs font-mono text-zinc-400">UI/UX & Web Applications</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECHNICAL_SKILLS.frontend.map((skill, idx) => (
            <span
              key={idx}
              className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors"
              style={skill === 'React JS' ? { color: secondaryColor, borderColor: `${secondaryColor}66` } : {}}
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>React JS</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>90%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '90%', backgroundColor: secondaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>HTML5 & CSS3</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>92%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '92%', backgroundColor: secondaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>UI/UX & React Native</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>84%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '84%', backgroundColor: secondaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 3: Backend & DB */}
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
            <h3 className="font-bold text-white text-base font-display">Backend & DB</h3>
            <p className="text-xs font-mono text-zinc-400">Persistence & APIs</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECHNICAL_SKILLS.backendAndDb.map((skill, idx) => (
            <span key={idx} className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>MYSQL & RDBMS</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>86%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '86%', backgroundColor: primaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>RESTful APIs & Supabase</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>84%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '84%', backgroundColor: primaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 4: Tools */}
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
            <i className="fa-solid fa-toolbox" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">Tools</h3>
            <p className="text-xs font-mono text-zinc-400">Workflow & Office</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECHNICAL_SKILLS.tools.map((skill, idx) => (
            <span key={idx} className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>Git & GitHub</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>90%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '90%', backgroundColor: secondaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>MS Office Suite</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>92%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '92%', backgroundColor: secondaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 5: BMS Infrastructure */}
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
            <i className="fa-solid fa-network-wired" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">BMS Infrastructure</h3>
            <p className="text-xs font-mono text-zinc-400">Critical Facility Operations</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECHNICAL_SKILLS.bmsInfrastructure.map((skill, idx) => (
            <span key={idx} className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>AHU & Climate Loops</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>92%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '92%', backgroundColor: primaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>WLD, VESDA & NOVEC</span>
              <span className="font-bold transition-colors" style={{ color: primaryColor }}>90%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '90%', backgroundColor: primaryColor }} />
            </div>
          </div>
        </div>
      </div>

      {/* Category 6: Security Systems */}
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
            <i className="fa-solid fa-shield-halved" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-display">Security Systems</h3>
            <p className="text-xs font-mono text-zinc-400">Surveillance & Physical Access</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECHNICAL_SKILLS.securitySystems.map((skill, idx) => (
            <span key={idx} className="skill-tag px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-200">
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-6 space-y-3 text-xs font-mono">
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>CCTV & Surveillance</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>90%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '90%', backgroundColor: secondaryColor }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-zinc-300 mb-1">
              <span>Flap Barrier, PA & Rodent Repellent</span>
              <span className="font-bold transition-colors" style={{ color: secondaryColor }}>88%</span>
            </div>
            <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
              <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: '88%', backgroundColor: secondaryColor }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
