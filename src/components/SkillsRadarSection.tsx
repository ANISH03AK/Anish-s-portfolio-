import React, { useState, useEffect, useRef } from 'react';
import { RADAR_CORE_DOMAINS, RADAR_8_AXES, RadarDomain } from '../data/portfolioData';
import { ColorTheme } from '../data/colorThemes';

declare const d3: any;

interface SkillsRadarSectionProps {
  theme?: ColorTheme;
}

export const SkillsRadarSection: React.FC<SkillsRadarSectionProps> = ({ theme }) => {
  const [radarMode, setRadarMode] = useState<'4-domain' | '8-axis'>('4-domain');
  const [activeDomainId, setActiveDomainId] = useState<string>('Frontend');
  const [coreDomains, setCoreDomains] = useState<RadarDomain[]>(RADAR_CORE_DOMAINS.map(d => ({ ...d })));
  const [eightAxes, setEightAxes] = useState<RadarDomain[]>(RADAR_8_AXES.map(d => ({ ...d })));

  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<any>(null);
  const gRef = useRef<any>(null);

  const activeDataset = radarMode === '4-domain' ? coreDomains : eightAxes;
  const activeDomain = coreDomains.find(d => d.id === activeDomainId) || coreDomains[0];

  const compositeIndex = (
    coreDomains.reduce((acc, curr) => acc + curr.value, 0) / coreDomains.length
  ).toFixed(1);

  // Re-render D3 Radar Chart
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const d3Instance = (window as any).d3 || (typeof d3 !== 'undefined' ? d3 : null);
    if (!d3Instance) return;

    container.innerHTML = '';

    const width = 480;
    const height = 440;
    const radius = 150;
    const levels = 5;
    const dataset = activeDataset;
    const totalAxes = dataset.length;
    const angleSlice = (Math.PI * 2) / totalAxes;

    const rScale = d3Instance.scaleLinear().domain([0, 100]).range([0, radius]);

    const svg = d3Instance.select(container)
      .append('svg')
      .attr('viewBox', `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('style', 'max-width: 500px; max-height: 460px; overflow: visible;')
      .attr('class', 'select-none');

    svgRef.current = svg;

    const defs = svg.append('defs');

    // Glow filter
    const filter = defs.append('filter')
      .attr('id', 'radar-glow')
      .attr('x', '-30%')
      .attr('y', '-30%')
      .attr('width', '160%')
      .attr('height', '160%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Gradient
    const radialGrad = defs.append('radialGradient')
      .attr('id', 'radarAreaGrad')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    radialGrad.append('stop').attr('offset', '0%').attr('stop-color', theme?.primary || '#ef4444').attr('stop-opacity', '0.45');
    radialGrad.append('stop').attr('offset', '65%').attr('stop-color', theme?.secondary || '#eab308').attr('stop-opacity', '0.28');
    radialGrad.append('stop').attr('offset', '100%').attr('stop-color', theme?.bgDark || '#050505').attr('stop-opacity', '0.05');

    const g = svg.append('g').attr('class', 'radar-root-group');
    gRef.current = g;

    // 1. Concentric Grid
    const axisGrid = g.append('g').attr('class', 'axis-grid-group');
    for (let level = 1; level <= levels; level++) {
      const lvlRadius = (radius / levels) * level;
      const pct = (level / levels) * 100;

      axisGrid.append('circle')
        .attr('r', lvlRadius)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(239, 68, 68, 0.12)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2, 3');

      const polyPoints = dataset.map((_, i) => {
        const x = lvlRadius * Math.cos(angleSlice * i - Math.PI / 2);
        const y = lvlRadius * Math.sin(angleSlice * i - Math.PI / 2);
        return `${x},${y}`;
      }).join(' ');

      axisGrid.append('polygon')
        .attr('points', polyPoints)
        .attr('fill', level === levels ? 'rgba(20, 10, 10, 0.45)' : 'none')
        .attr('stroke', level === levels ? 'rgba(239, 68, 68, 0.35)' : 'rgba(234, 179, 8, 0.15)')
        .attr('stroke-width', level === levels ? 1.5 : 1);

      axisGrid.append('text')
        .attr('x', 5)
        .attr('y', -lvlRadius + 4)
        .attr('fill', level === levels ? '#facc15' : 'rgba(161, 161, 170, 0.55)')
        .attr('font-size', '9px')
        .attr('font-family', 'JetBrains Mono, monospace')
        .attr('font-weight', level === levels ? 'bold' : 'normal')
        .text(`${pct}%`);
    }

    // 2. Radial Spokes & Outer Labels
    const axes = g.selectAll('.radar-axis')
      .data(dataset)
      .enter()
      .append('g')
      .attr('class', 'radar-axis cursor-pointer')
      .on('click', (_event: any, d: any) => {
        setActiveDomainId(d.domain || d.id);
      });

    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (_d: any, i: number) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (_d: any, i: number) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('stroke', (d: any) => (d.domain || d.id) === activeDomainId ? d.color : 'rgba(239, 68, 68, 0.22)')
      .attr('stroke-width', (d: any) => (d.domain || d.id) === activeDomainId ? 2 : 1)
      .attr('stroke-dasharray', '4, 2');

    axes.append('text')
      .attr('class', 'radar-axis-label font-mono')
      .attr('text-anchor', (_d: any, i: number) => {
        const x = Math.cos(angleSlice * i - Math.PI / 2);
        if (Math.abs(x) < 0.15) return 'middle';
        return x > 0 ? 'start' : 'end';
      })
      .attr('dy', (_d: any, i: number) => {
        const y = Math.sin(angleSlice * i - Math.PI / 2);
        if (Math.abs(y) > 0.85) return y < 0 ? '-0.8em' : '1.3em';
        return '0.35em';
      })
      .attr('x', (_d: any, i: number) => (radius + 24) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (_d: any, i: number) => (radius + 24) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('fill', (d: any) => (d.domain || d.id) === activeDomainId ? '#facc15' : '#e4e4e7')
      .attr('font-size', radarMode === '4-domain' ? '12px' : '10px')
      .attr('font-weight', (d: any) => (d.domain || d.id) === activeDomainId ? 'bold' : '600')
      .attr('filter', (d: any) => (d.domain || d.id) === activeDomainId ? 'url(#radar-glow)' : 'none')
      .text((d: any) => d.label);

    axes.append('text')
      .attr('class', 'radar-pct-label font-mono')
      .attr('text-anchor', (_d: any, i: number) => {
        const x = Math.cos(angleSlice * i - Math.PI / 2);
        if (Math.abs(x) < 0.15) return 'middle';
        return x > 0 ? 'start' : 'end';
      })
      .attr('dy', (_d: any, i: number) => {
        const y = Math.sin(angleSlice * i - Math.PI / 2);
        if (Math.abs(y) > 0.85) return y < 0 ? '0.35em' : '2.3em';
        return '1.45em';
      })
      .attr('x', (_d: any, i: number) => (radius + 24) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (_d: any, i: number) => (radius + 24) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('fill', (d: any) => d.color)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text((d: any) => `${d.value}%`);

    // 3. Radar Polygon
    const polygonPoints = dataset.map((d, i) => {
      const r = rScale(d.value);
      const x = r * Math.cos(angleSlice * i - Math.PI / 2);
      const y = r * Math.sin(angleSlice * i - Math.PI / 2);
      return [x, y];
    });
    const targetPointsStr = polygonPoints.map(p => `${p[0]},${p[1]}`).join(' ');

    g.append('polygon')
      .attr('class', 'radar-polygon')
      .attr('points', targetPointsStr)
      .attr('fill', 'url(#radarAreaGrad)')
      .attr('stroke', theme?.primary || '#ef4444')
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('filter', 'url(#radar-glow)');

    // 4. Data Vertices
    const tooltip = tooltipRef.current;
    const verticesGroup = g.append('g').attr('class', 'radar-vertices-group');

    const vertexGroups = verticesGroup.selectAll('.vertex-group')
      .data(dataset)
      .enter()
      .append('g')
      .attr('class', 'vertex-group cursor-pointer')
      .attr('transform', (d: any, i: number) => {
        const r = rScale(d.value);
        const x = r * Math.cos(angleSlice * i - Math.PI / 2);
        const y = r * Math.sin(angleSlice * i - Math.PI / 2);
        return `translate(${x}, ${y})`;
      });

    vertexGroups.append('circle')
      .attr('class', 'radar-pulse-ring')
      .attr('r', 6)
      .attr('fill', 'none')
      .attr('stroke', (d: any) => d.color)
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.8);

    vertexGroups.append('circle')
      .attr('class', 'radar-vertex-node')
      .attr('r', (d: any) => (d.domain || d.id) === activeDomainId ? 7.5 : 5.5)
      .attr('fill', (d: any) => d.color)
      .attr('stroke', '#050505')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#radar-glow)');

    vertexGroups
      .on('mouseenter', function (this: any, _event: any, d: any) {
        d3Instance.select(this).select('.radar-vertex-node')
          .transition()
          .duration(200)
          .attr('r', 9);

        if (tooltip) {
          tooltip.style.opacity = '1';
          tooltip.innerHTML = `
            <div class="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-zinc-800">
              <span class="w-2.5 h-2.5 rounded-full" style="background:${d.color}; box-shadow: 0 0 8px ${d.color}"></span>
              <span class="text-white font-bold text-xs">${d.fullName || d.label}</span>
              <span class="ml-auto text-yellow-400 font-bold font-mono text-sm">${d.value}%</span>
            </div>
            <div class="text-[11px] text-zinc-300 mb-1 leading-snug">${d.desc}</div>
            <div class="text-[10px] text-red-400 font-mono mt-1"><i class="fa-solid fa-code-commit mr-1"></i>${d.project}</div>
          `;
        }
      })
      .on('mousemove', function (event: MouseEvent) {
        if (!tooltip || !container) return;
        const containerRect = container.getBoundingClientRect();
        const left = event.clientX - containerRect.left + 15;
        const top = event.clientY - containerRect.top - 20;
        tooltip.style.left = `${Math.min(Math.max(10, left), containerRect.width - 240)}px`;
        tooltip.style.top = `${Math.min(Math.max(10, top), containerRect.height - 120)}px`;
      })
      .on('mouseleave', function (this: any, _event: any, d: any) {
        d3Instance.select(this).select('.radar-vertex-node')
          .transition()
          .duration(200)
          .attr('r', (d.domain || d.id) === activeDomainId ? 7.5 : 5.5);

        if (tooltip) {
          tooltip.style.opacity = '0';
        }
      })
      .on('click', (_event: any, d: any) => {
        setActiveDomainId(d.domain || d.id);
      });

    g.append('circle').attr('r', 4).attr('fill', '#facc15').attr('filter', 'url(#radar-glow)');
  }, [radarMode, activeDataset, activeDomainId, theme]);

  const [isTurbo, setIsTurbo] = useState(false);

  const primaryColor = theme?.primary || '#ef4444';
  const secondaryColor = theme?.secondary || '#facc15';

  const handleSliderChange = (newVal: number) => {
    setIsTurbo(false);
    setCoreDomains(prev =>
      prev.map(d => (d.id === activeDomainId ? { ...d, value: newVal } : d))
    );
    setEightAxes(prev =>
      prev.map(d => (d.domain === activeDomainId ? { ...d, value: newVal } : d))
    );
  };

  const handleResetBaseline = () => {
    setIsTurbo(false);
    setCoreDomains(prev => prev.map(d => ({ ...d, value: d.baseline })));
    setEightAxes(prev => prev.map(d => ({ ...d, value: d.baseline })));
  };

  const handleToggleTurbo = () => {
    if (!isTurbo) {
      setCoreDomains(prev => prev.map(d => ({ ...d, value: Math.min(100, Math.max(92, d.baseline + 8)) })));
      setEightAxes(prev => prev.map(d => ({ ...d, value: Math.min(100, Math.max(92, d.baseline + 8)) })));
      setIsTurbo(true);
    } else {
      handleResetBaseline();
    }
  };

  return (
    <div className="glass-card tech-brackets rounded-3xl p-6 sm:p-8 lg:p-10 mb-14 border border-red-500/20 shadow-2xl relative overflow-hidden" data-aos="fade-up">
      {/* Ambient Radial Glow Accent */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium border transition-colors"
              style={{
                backgroundColor: `${primaryColor}18`,
                color: primaryColor,
                borderColor: `${primaryColor}40`
              }}
            >
              <i className="fa-solid fa-chart-radar mr-1.5" style={{ color: secondaryColor }} /> D3.js Vector Radar Engine
            </span>
            <span className="text-xs font-mono text-zinc-400">Dynamic Multi-Domain Mapping</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
            Domain Proficiency Radar
          </h3>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Dynamically visualizes technical proficiencies across{' '}
            <strong className="font-semibold transition-colors" style={{ color: primaryColor }}>Frontend</strong>,{' '}
            <strong className="font-semibold transition-colors" style={{ color: secondaryColor }}>Backend</strong>,{' '}
            <strong className="font-semibold transition-colors" style={{ color: primaryColor }}>BMS</strong>, and{' '}
            <strong className="font-semibold transition-colors" style={{ color: secondaryColor }}>AI</strong>, synthesized directly from production code and enterprise telemetry.
          </p>
        </div>

        {/* Controls: Mode Switcher & Reset Baseline */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex p-1 telemetry-block rounded-xl border border-zinc-800 text-xs font-mono">
            <button
              onClick={() => setRadarMode('4-domain')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                radarMode === '4-domain'
                  ? 'border shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              style={
                radarMode === '4-domain'
                  ? {
                      backgroundColor: `${primaryColor}20`,
                      color: secondaryColor,
                      borderColor: `${secondaryColor}66`
                    }
                  : {}
              }
            >
              Core 4 Domains
            </button>
            <button
              onClick={() => setRadarMode('8-axis')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                radarMode === '8-axis'
                  ? 'border shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
              style={
                radarMode === '8-axis'
                  ? {
                      backgroundColor: `${primaryColor}20`,
                      color: secondaryColor,
                      borderColor: `${secondaryColor}66`
                    }
                  : {}
              }
            >
              Granular 8 Axes
            </button>
          </div>
          {/* Turbo Bolt Benchmark Button whose color dynamically matches the active theme */}
          <button
            onClick={handleToggleTurbo}
            id="radar-bolt-button"
            title="Turbo Boost: Benchmark peak proficiency levels"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md active:scale-95 cursor-pointer border group"
            style={{
              backgroundColor: isTurbo ? `${primaryColor}25` : 'rgba(0, 0, 0, 0.6)',
              borderColor: isTurbo ? secondaryColor : `${primaryColor}66`,
              color: isTurbo ? secondaryColor : '#e4e4e7',
              boxShadow: isTurbo ? `0 0 16px ${theme?.glowColor || 'rgba(239, 68, 68, 0.35)'}` : 'none'
            }}
          >
            <i
              className={`fa-solid fa-bolt transition-transform ${isTurbo ? 'scale-125 animate-pulse' : 'group-hover:scale-110'}`}
              style={{ color: secondaryColor }}
            />
            <span className="bolt-heading" style={{ color: secondaryColor }}>{isTurbo ? 'TURBO ON' : 'TURBO BOOST'}</span>
          </button>
          <button
            onClick={handleResetBaseline}
            title="Reset to verified resume ratings"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl telemetry-block text-zinc-300 hover:text-white text-xs font-mono border border-zinc-700/70 transition-all cursor-pointer"
          >
            <i className="fa-solid fa-rotate-left text-xs" style={{ color: secondaryColor }} />
            <span>Reset Baseline</span>
          </button>
        </div>
      </div>

      {/* Radar Main Grid: D3 Chart + Dynamic Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6 relative z-10">
        {/* D3 Chart Canvas (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col items-center relative">
          {/* Quick Domain Selector Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-4 w-full">
            {coreDomains.map(d => (
              <button
                key={d.id}
                onClick={() => setActiveDomainId(d.id)}
                className={`radar-filter-pill group flex items-center gap-2 px-3 py-1.5 rounded-xl telemetry-block text-xs font-mono transition-all cursor-pointer ${
                  activeDomainId === d.id ? 'active border-yellow-400/50 text-yellow-300' : 'text-zinc-300'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color, boxShadow: `0 0 8px ${d.color}` }} />
                <span>{d.label}</span>
                <span className="text-zinc-400 group-hover:text-white font-bold">{d.value}%</span>
              </button>
            ))}
          </div>

          {/* SVG Container for D3 */}
          <div ref={containerRef} id="d3-skills-radar-container" className="w-full flex justify-center items-center relative min-h-[380px] sm:min-h-[440px]" />

          {/* Chart Hover Floating Tooltip Container */}
          <div
            ref={tooltipRef}
            id="radar-tooltip"
            className="absolute pointer-events-none opacity-0 transition-opacity duration-200 z-30 p-3 rounded-xl bg-zinc-950/95 border border-red-500/50 shadow-2xl backdrop-blur-md max-w-xs text-xs font-mono"
          />

          <div className="text-[11px] font-mono text-zinc-400 text-center mt-2 flex items-center justify-center gap-2">
            <i className="fa-solid fa-hand-pointer text-yellow-400 animate-pulse" />
            <span>Hover or tap radar vertices to inspect domain telemetry</span>
          </div>
        </div>

        {/* Dynamic Domain Inspector Panel (5 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4 telemetry-block p-6 rounded-2xl border border-zinc-800/90 shadow-inner">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl bg-red-500/10 border flex items-center justify-center text-lg"
                style={{ color: activeDomain.color, borderColor: `${activeDomain.color}44` }}
              >
                <i className={activeDomain.icon} />
              </div>
              <div>
                <h4 className="font-bold text-white text-lg font-display">{activeDomain.fullName || activeDomain.label}</h4>
                <span className="text-[11px] font-mono" style={{ color: activeDomain.color }}>
                  {activeDomain.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold font-mono" style={{ color: activeDomain.color }}>
                {activeDomain.value}%
              </span>
              <p className="text-[10px] font-mono text-zinc-400">domain score</p>
            </div>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed min-h-[48px]">
            {activeDomain.desc}
          </p>

          {/* Key Applied Projects */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Applied In Production:</div>
            <div className="p-2.5 rounded-lg telemetry-block border border-zinc-800 text-xs text-zinc-200 flex items-center justify-between">
              <span className="font-medium text-white">
                <i className={`${activeDomain.icon} text-yellow-400 mr-2`} />
                {activeDomain.project}
              </span>
              <span className="text-[10px] font-mono text-yellow-400 border border-yellow-500/30 px-1.5 py-0.5 rounded">
                {activeDomain.projectBadge}
              </span>
            </div>
          </div>

          {/* Sub-skills list tags */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Domain Stack Elements:</div>
            <div className="flex flex-wrap gap-1.5">
              {activeDomain.tags.map((tag, idx) => (
                <span
                  key={tag}
                  className={`skill-tag px-2.5 py-1 rounded-md text-[11px] font-mono ${
                    idx === 0 ? 'text-yellow-300 border-yellow-500/40' : 'text-zinc-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Proficiency Simulator Slider */}
          <div className="pt-3 border-t border-zinc-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <i className="fa-solid fa-sliders text-yellow-400 text-[10px]" />
                <span>Test Dynamic Re-Weighting:</span>
              </span>
              <span className="font-bold" style={{ color: activeDomain.color }}>
                {activeDomain.value}%
              </span>
            </div>
            <input
              type="range"
              min="40"
              max="100"
              value={activeDomain.value}
              onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>Baseline (40%)</span>
              <span>Balanced (70%)</span>
              <span>Mastery (100%)</span>
            </div>
          </div>

          {/* Composite Polymath Score Badge */}
          <div className="mt-2 p-3 rounded-xl telemetry-block border border-yellow-500/30 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono text-yellow-300 uppercase">Composite Polymath Index</div>
              <div className="text-xs text-zinc-300 mt-0.5">Dual-Discipline: Software + BMS Physical Systems</div>
            </div>
            <div className="text-right">
              <span className="text-xl font-bold font-mono text-white">{compositeIndex}%</span>
              <div className="text-[9px] font-mono text-yellow-400">Verified 100%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
