import React, { useState, useRef } from 'react';
import { ColorTheme } from '../data/colorThemes';

interface SkillsSectionProps {
  theme?: ColorTheme;
}

interface SkillItem {
  name: string;
  category: 'frontend' | 'backend' | 'bms' | 'tools';
  categoryLabel: string;
  level: string;
  percentage: number;
  icon: string;
  context: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ theme }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'bms' | 'tools'>('all');
  const [viewMode, setViewMode] = useState<'track' | 'rows'>('track');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const primaryColor = theme?.primary || '#06b6d4';
  const secondaryColor = theme?.secondary || '#6366f1';
  const accentColor = theme?.accent || '#f43f5e';

  const allSkills: SkillItem[] = [
    // Frontend
    { name: 'React.js', category: 'frontend', categoryLabel: 'Frontend', level: 'Advanced', percentage: 92, icon: 'fa-brands fa-react', context: 'Dynamic SPAs, custom hooks, Dexter store' },
    { name: 'JavaScript (ES6+)', category: 'frontend', categoryLabel: 'Frontend', level: 'Advanced', percentage: 90, icon: 'fa-brands fa-js', context: 'Modern asynchronous programming, DOM APIs' },
    { name: 'HTML5 & CSS3', category: 'frontend', categoryLabel: 'Frontend', level: 'Expert', percentage: 95, icon: 'fa-brands fa-html5', context: 'Semantic layout, responsive grid & flexbox' },
    { name: 'Tailwind CSS', category: 'frontend', categoryLabel: 'Frontend', level: 'Advanced', percentage: 90, icon: 'fa-solid fa-wind', context: 'Modern responsive utility-first UI design' },
    { name: 'UI / UX Design', category: 'frontend', categoryLabel: 'Frontend', level: 'Skilled', percentage: 86, icon: 'fa-solid fa-palette', context: 'User-centric accessible interfaces' },
    { name: 'React Native', category: 'frontend', categoryLabel: 'Frontend', level: 'Intermediate', percentage: 82, icon: 'fa-solid fa-mobile-screen', context: 'Cross-platform mobile interfaces' },

    // Backend & Databases
    { name: 'Python', category: 'backend', categoryLabel: 'Backend', level: 'Advanced', percentage: 88, icon: 'fa-brands fa-python', context: 'Backend scripting, CNN models, automation' },
    { name: 'SQL & MySQL', category: 'backend', categoryLabel: 'Database', level: 'Advanced', percentage: 88, icon: 'fa-solid fa-database', context: 'Complex queries, schema design, daily TCS operations' },
    { name: 'RESTful APIs', category: 'backend', categoryLabel: 'Backend', level: 'Advanced', percentage: 90, icon: 'fa-solid fa-network-wired', context: 'API consumption, endpoint design, state syncing' },
    { name: 'Supabase', category: 'backend', categoryLabel: 'Database', level: 'Intermediate', percentage: 84, icon: 'fa-solid fa-bolt', context: 'Cloud relational data and authentication' },
    { name: 'Neural Networks (CNN)', category: 'backend', categoryLabel: 'AI / ML', level: 'Research', percentage: 85, icon: 'fa-solid fa-brain', context: 'Fake facial detection model training' },

    // BMS & Facility Infrastructure
    { name: 'Johnson Controls BMS', category: 'bms', categoryLabel: 'BMS Ops', level: 'Enterprise', percentage: 94, icon: 'fa-solid fa-building-shield', context: 'Johnson Controls Metasys campus monitoring' },
    { name: 'HVAC & AHU Controls', category: 'bms', categoryLabel: 'HVAC Ops', level: 'Enterprise', percentage: 92, icon: 'fa-solid fa-fan', context: 'Chiller plant setpoints, airflow loops' },
    { name: 'Addressable Fire Panels', category: 'bms', categoryLabel: 'Life Safety', level: 'Expert', percentage: 90, icon: 'fa-solid fa-bell', context: 'Critical fire panel testing & emergency alerts' },
    { name: 'VESDA & WLD Systems', category: 'bms', categoryLabel: 'Early Warning', level: 'Expert', percentage: 90, icon: 'fa-solid fa-cloud', context: 'Early warning smoke & water leak detection' },
    { name: 'NOVEC Gas Suppression', category: 'bms', categoryLabel: 'Fire Safety', level: 'Enterprise', percentage: 88, icon: 'fa-solid fa-fire-extinguisher', context: 'Data center & server room fire protection' },
    { name: 'CCTV & Flap Barriers', category: 'bms', categoryLabel: 'Security', level: 'Advanced', percentage: 90, icon: 'fa-solid fa-video', context: 'Multi-zone surveillance & physical access control' },

    // Tools
    { name: 'Git & GitHub', category: 'tools', categoryLabel: 'Workflow', level: 'Advanced', percentage: 92, icon: 'fa-brands fa-github', context: 'Version control, branching, repository management' },
    { name: 'MS Office Suite', category: 'tools', categoryLabel: 'Documentation', level: 'Advanced', percentage: 94, icon: 'fa-solid fa-file-excel', context: 'Reporting, data documentation, operational tracking' },
    { name: 'VS Code & Tooling', category: 'tools', categoryLabel: 'Environment', level: 'Advanced', percentage: 90, icon: 'fa-solid fa-code', context: 'Development environment, bundle optimization' },
    { name: 'System Troubleshooting', category: 'tools', categoryLabel: 'Engineering', level: 'Expert', percentage: 95, icon: 'fa-solid fa-wrench', context: 'Root cause analysis in high-uptime operations' }
  ];

  const filteredSkills = activeTab === 'all'
    ? allSkills
    : allSkills.filter(s => s.category === activeTab);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const categories = [
    { id: 'all', label: 'All', count: allSkills.length },
    { id: 'frontend', label: 'Frontend', count: allSkills.filter(s => s.category === 'frontend').length },
    { id: 'backend', label: 'Backend & DB', count: allSkills.filter(s => s.category === 'backend').length },
    { id: 'bms', label: 'BMS & Infrastructure', count: allSkills.filter(s => s.category === 'bms').length },
    { id: 'tools', label: 'Tools', count: allSkills.filter(s => s.category === 'tools').length }
  ];

  return (
    <section id="skills" className="py-20 sm:py-28 relative z-10 scroll-mt-28 sm:scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Header with Generous Negative Space & Clear Text */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold mb-3 border"
              style={{
                backgroundColor: `${primaryColor}15`,
                color: primaryColor,
                borderColor: `${primaryColor}40`
              }}
            >
              <i className="fa-solid fa-code" />
              <span>01. Technical Competencies</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-display tracking-tight whitespace-nowrap">
              Engineering Proficiencies
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-xl">
              Horizontal streamlined layout across full-stack development, relational databases, and enterprise BMS automation.
            </p>
          </div>

          {/* Right Action: Category Filters + Horizontal Scroll Buttons */}
          <div className="flex flex-wrap items-center gap-3 max-w-full">
            {/* Category Tabs with responsive horizontal swipe */}
            <div className="overflow-x-auto no-scrollbar max-w-full pb-0.5">
              <div className="inline-flex p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-mono shrink-0">
                {categories.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-white shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    style={
                      activeTab === tab.id
                        ? {
                            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
                          }
                        : {}
                    }
                  >
                    {tab.label}
                    <span className="ml-1 opacity-80 text-[10px]">({tab.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Toggle: Horizontal Track vs Horizontal Rows */}
            <div className="hidden sm:inline-flex p-1 bg-zinc-900 rounded-xl border border-zinc-800 text-xs font-mono">
              <button
                onClick={() => setViewMode('track')}
                title="Horizontal Carousel Track"
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'track' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-arrows-left-right mr-1" /> Track
              </button>
              <button
                onClick={() => setViewMode('rows')}
                title="Horizontal Categorized Rows"
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'rows' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <i className="fa-solid fa-bars mr-1" /> Rows
              </button>
            </div>

            {/* Horizontal Track Scroll Controls */}
            {viewMode === 'track' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={scrollLeft}
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md"
                  title="Scroll left"
                >
                  <i className="fa-solid fa-chevron-left text-sm" />
                </button>
                <button
                  onClick={scrollRight}
                  className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-md"
                  title="Scroll right"
                >
                  <i className="fa-solid fa-chevron-right text-sm" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* View Mode 1: Horizontal Sliding Shelf (No Hidden Text, Full Visibility) */}
        {viewMode === 'track' ? (
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex flex-nowrap overflow-x-auto gap-4 pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {filteredSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="w-[280px] sm:w-[310px] shrink-0 snap-start p-5 rounded-2xl bg-zinc-950/90 border border-zinc-800 hover:border-zinc-600 transition-all hover:-translate-y-1 shadow-md group/card relative overflow-hidden flex flex-col justify-between"
                >
                  {/* Subtle top accent gradient */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 opacity-80 group-hover/card:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`
                    }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border transition-colors shrink-0"
                        style={{
                          backgroundColor: `${primaryColor}18`,
                          borderColor: `${primaryColor}40`,
                          color: skill.category === 'bms' ? accentColor : primaryColor
                        }}
                      >
                        <i className={skill.icon} />
                      </div>
                      <span
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded font-semibold border"
                        style={{
                          backgroundColor: `${secondaryColor}15`,
                          color: secondaryColor,
                          borderColor: `${secondaryColor}35`
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>

                    {/* Skill Name: Full, Not Truncated */}
                    <h3 className="font-bold text-white text-base font-display">
                      {skill.name}
                    </h3>
                    {/* Skill Context: Full, Not Clamped */}
                    <p className="text-zinc-300 text-xs mt-1.5 leading-relaxed">
                      {skill.context}
                    </p>
                  </div>

                  {/* Horizontal Mini Proficiency Bar with Tri-Color Palette */}
                  <div className="mt-4 pt-3 border-t border-zinc-900 flex items-center justify-between gap-3">
                    <div className="flex-1 bg-zinc-900 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${skill.percentage}%`,
                          background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor}, ${accentColor})`
                        }}
                      />
                    </div>
                    <span className="font-bold font-mono text-xs text-white shrink-0">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Micro Navigation Footer Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pt-2 px-1">
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-arrows-left-right text-cyan-400" />
                <span>Swipe horizontally or use arrows to view all competencies</span>
              </span>
              <span className="font-semibold text-zinc-300">Showing {filteredSkills.length} skills</span>
            </div>
          </div>
        ) : (
          /* View Mode 2: Compact Categorized Horizontal Rows */
          <div className="space-y-4">
            {[
              { id: 'frontend', title: 'Frontend Development', icon: 'fa-brands fa-react', skills: allSkills.filter(s => s.category === 'frontend') },
              { id: 'backend', title: 'Backend & Databases', icon: 'fa-solid fa-database', skills: allSkills.filter(s => s.category === 'backend') },
              { id: 'bms', title: 'BMS & Infrastructure', icon: 'fa-solid fa-building-shield', skills: allSkills.filter(s => s.category === 'bms') },
              { id: 'tools', title: 'Tools & Workflow', icon: 'fa-solid fa-toolbox', skills: allSkills.filter(s => s.category === 'tools') }
            ]
              .filter(cat => activeTab === 'all' || activeTab === cat.id)
              .map(cat => (
                <div
                  key={cat.id}
                  className="p-4 sm:p-5 rounded-2xl bg-zinc-950/85 border border-zinc-800 flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
                >
                  {/* Category Title Column */}
                  <div className="flex items-center gap-3 w-52 shrink-0">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-base border"
                      style={{
                        backgroundColor: `${primaryColor}18`,
                        borderColor: `${primaryColor}40`,
                        color: primaryColor
                      }}
                    >
                      <i className={cat.icon} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white font-display">{cat.title}</div>
                      <div className="text-xs font-mono text-zinc-400">{cat.skills.length} proficiencies</div>
                    </div>
                  </div>

                  {/* Horizontal Skills Badges Flow */}
                  <div className="flex-1 flex flex-wrap items-center gap-2.5">
                    {cat.skills.map((s, sIdx) => (
                      <div
                        key={sIdx}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-xs font-mono transition-colors shadow-sm"
                      >
                        <i className={`${s.icon} text-xs`} style={{ color: cat.id === 'bms' ? accentColor : primaryColor }} />
                        <span className="text-white font-medium">{s.name}</span>
                        <span
                          className="text-[10px] font-bold px-1.5 py-0.2 rounded"
                          style={{
                            backgroundColor: `${secondaryColor}20`,
                            color: secondaryColor
                          }}
                        >
                          {s.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
};
