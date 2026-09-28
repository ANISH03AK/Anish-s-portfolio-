import React from 'react';
import { ColorTheme } from '../data/colorThemes';
import { TechBrandLogo } from './TechBrandLogo';

interface TechnicalSkillMatrixProps {
  theme?: ColorTheme;
}

interface CompactSkill {
  name: string;
  badge: string;
  level: string;
  color: string;
  note: string;
}

const SOFTWARE_GROUPS: { groupName: string; icon: string; skills: CompactSkill[] }[] = [
  {
    groupName: 'Languages & Core Programming',
    icon: 'fa-solid fa-code',
    skills: [
      { name: 'Python', badge: 'Advanced', level: '3+ Yrs', color: '#3776AB', note: 'CNN & Data Pipelines' },
      { name: 'JavaScript', badge: 'Advanced', level: '3+ Yrs', color: '#F7DF1E', note: 'ES6+ & State Logic' },
      { name: 'SQL', badge: 'Enterprise', level: '3+ Yrs', color: '#00758F', note: 'Queries & RDBMS' }
    ]
  },
  {
    groupName: 'Frontend Architecture & Frameworks',
    icon: 'fa-brands fa-react',
    skills: [
      { name: 'React JS', badge: 'Production', level: '2+ Yrs', color: '#61DAFB', note: "Dexter Men's Wear" },
      { name: 'React Native', badge: 'Advanced', level: '1.5+ Yrs', color: '#0284C7', note: 'Cross-Platform UI' },
      { name: 'HTML5', badge: 'Expert', level: '4+ Yrs', color: '#E34F26', note: 'Semantic & Accessibility' },
      { name: 'CSS3', badge: 'Expert', level: '4+ Yrs', color: '#1572B6', note: 'Tailwind & Flex/Grid' },
      { name: 'UI/UX', badge: 'Advanced', level: '2+ Yrs', color: '#A259FF', note: 'User Journeys & Figma' }
    ]
  },
  {
    groupName: 'Databases & REST APIs',
    icon: 'fa-solid fa-database',
    skills: [
      { name: 'MYSQL', badge: 'Advanced', level: '3+ Yrs', color: '#00758F', note: 'Normalized Schemas' },
      { name: 'Supabase', badge: 'Production', level: '1.5+ Yrs', color: '#3ECF8E', note: 'PostgreSQL & Realtime' },
      { name: 'RESTful APIs', badge: 'Production', level: '2+ Yrs', color: '#0284C7', note: 'JSON Endpoints & CRUD' },
      { name: 'RDBMS', badge: 'Advanced', level: '3+ Yrs', color: '#1E293B', note: 'ACID & Integrity' }
    ]
  },
  {
    groupName: 'Development Tools & Version Control',
    icon: 'fa-solid fa-screwdriver-wrench',
    skills: [
      { name: 'Git', badge: 'Advanced', level: '3+ Yrs', color: '#F05032', note: 'Branching & Commits' },
      { name: 'GitHub', badge: 'Advanced', level: '3+ Yrs', color: '#181717', note: 'CI/CD & Open Source' },
      { name: 'MS Office Suite', badge: 'Expert', level: '4+ Yrs', color: '#D83B01', note: 'Reporting & Analysis' }
    ]
  }
];

const ELV_GROUPS: { groupName: string; icon: string; skills: CompactSkill[] }[] = [
  {
    groupName: 'Life Safety & Fire Suppression',
    icon: 'fa-solid fa-fire-extinguisher',
    skills: [
      { name: 'Fire Alarm', badge: 'TCS Facility', level: 'Active', color: '#DC2626', note: 'Addressable Loop Control' },
      { name: 'NOVEC System', badge: 'TCS Facility', level: 'Active', color: '#B91C1C', note: 'Clean Agent 1230 Release' },
      { name: 'VESDA', badge: 'TCS Facility', level: 'Active', color: '#334155', note: 'Laser Smoke Sampling' }
    ]
  },
  {
    groupName: 'HVAC & Environmental Telemetry',
    icon: 'fa-solid fa-fan',
    skills: [
      { name: 'AHU', badge: 'TCS Facility', level: 'Active', color: '#0284C7', note: 'Air Handling Units' },
      { name: 'WLD', badge: 'TCS Facility', level: 'Active', color: '#0EA5E9', note: 'Water Leak Detection Server Rooms' },
      { name: 'Rodent Repellent', badge: 'TCS Facility', level: 'Active', color: '#475569', note: 'Ultrasonic Perimeter Protection' }
    ]
  },
  {
    groupName: 'Campus Security & Access Automation',
    icon: 'fa-solid fa-shield-halved',
    skills: [
      { name: 'CCTV', badge: 'TCS Facility', level: 'Active', color: '#475569', note: 'IP Surveillance & NVR Recording' },
      { name: 'PA', badge: 'TCS Facility', level: 'Active', color: '#D97706', note: 'Public Address Evacuation' },
      { name: 'Flap Barrier', badge: 'TCS Facility', level: 'Active', color: '#059669', note: 'Biometric Access Gates' }
    ]
  }
];

export const TechnicalSkillMatrix: React.FC<TechnicalSkillMatrixProps> = ({ theme }) => {
  const primaryColor = theme?.primary || '#2563eb';

  return (
    <div className="space-y-8">
      {/* 2-Column Responsive Grid: Software vs ELV Infrastructure */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* ======================================================== */}
        {/* SECTION 1: SOFTWARE & WEB DEVELOPMENT SIDE              */}
        {/* ======================================================== */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                <i className="fa-solid fa-code" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans">
                  Software Engineering Stack
                </h3>
                <p className="text-xs text-slate-400 font-medium">React, Python, SQL & Cloud Technologies</p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-semibold border border-blue-500/20">
              15 Technologies
            </span>
          </div>

          {/* Clean Simple Categories */}
          <div className="space-y-5">
            {SOFTWARE_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  <i className={`${group.icon} text-blue-400 text-xs`} />
                  <span>{group.groupName}</span>
                </div>

                {/* Badges with Authentic Logos */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-600 transition-all cursor-default text-xs"
                      title={`${skill.name} - ${skill.note}`}
                    >
                      <TechBrandLogo name={skill.name} size={18} className="shrink-0" />
                      <span className="font-semibold text-slate-200 font-sans">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-slate-400">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SECTION 2: ELV & CRITICAL BMS INFRASTRUCTURE SIDE       */}
        {/* ======================================================== */}
        <div className="bg-slate-900/80 rounded-3xl border border-slate-800/90 p-6 sm:p-8 shadow-xl backdrop-blur-xl">
          {/* Section Header */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white bg-slate-800 border border-slate-700 shadow-md">
                <i className="fa-solid fa-building-shield text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-sans">
                  Critical BMS & ELV Infrastructure
                </h3>
                <p className="text-xs text-slate-400 font-medium">Tata Consultancy Services (TCS) Facility Operations</p>
              </div>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20">
              9 Enterprise Systems
            </span>
          </div>

          {/* Clean Simple Categories */}
          <div className="space-y-5">
            {ELV_GROUPS.map((group, gIdx) => (
              <div key={gIdx} className="space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  <i className={`${group.icon} text-emerald-400 text-xs`} />
                  <span>{group.groupName}</span>
                </div>

                {/* Badges with Authentic Logos */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 hover:border-slate-600 transition-all cursor-default text-xs"
                      title={`${skill.name} - ${skill.note}`}
                    >
                      <TechBrandLogo name={skill.name} size={18} className="shrink-0" />
                      <span className="font-semibold text-slate-200 font-sans">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-emerald-400">
                        {skill.badge}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
