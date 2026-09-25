import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TECHNICAL_SKILLS } from '../data/portfolioData';
import { Code2, Terminal, Check, Copy, Cpu, Database, Shield, Sliders, RotateCcw, Brain, Activity, ExternalLink } from 'lucide-react';

interface DomainItem {
  id: string;
  label: string;
  fullName: string;
  domain?: string;
  value: number;
  baseline: number;
  color: string;
  status: string;
  desc: string;
  project: string;
  projectBadge: string;
  tags: string[];
}

const INITIAL_CORE_DOMAINS: DomainItem[] = [
  {
    id: 'Frontend',
    label: 'Frontend',
    fullName: 'Frontend Engineering',
    value: 90,
    baseline: 90,
    color: '#00f2fe',
    status: 'Production Deployed · 90% Mastery',
    desc: 'Advanced React component architecture, modern hooks, responsive Tailwind CSS layouts, dynamic client-side filtering, state management, and seamless REST API integrations.',
    project: "Dexter Men's Wear (Live E-Commerce on Vercel)",
    projectBadge: 'Vercel Live',
    tags: ['React.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Responsive UI', 'State Management', 'RESTful APIs', 'Custom Hooks']
  },
  {
    id: 'Backend',
    label: 'Backend',
    fullName: 'Backend & Databases',
    value: 85,
    baseline: 85,
    color: '#38bdf8',
    status: 'Relational 3NF & ACID Compliant',
    desc: 'Third normal form (3NF) relational database design in MySQL, parameterized SQL queries against injection vulnerabilities, Supabase backend integration, and row-level locking for atomic booking transactions.',
    project: 'Online Tourism Management System (MySQL 3NF & PHP APIs)',
    projectBadge: 'ACID Guaranteed',
    tags: ['Python', 'SQL', 'MySQL 3NF', 'Supabase', 'Relational Modeling', 'CRUD APIs', 'Row Locking', 'JSON Schemas']
  },
  {
    id: 'BMS',
    label: 'BMS / ELV',
    fullName: 'BMS Infrastructure & ELV Systems',
    value: 92,
    baseline: 92,
    color: '#10b981',
    status: 'TCS Mission-Critical · 99.99% Uptime',
    desc: 'Operational supervision of real-time Building Management Systems for Tata Consultancy Services (TCS) via Johnson Controls Metasys, monitoring AHU climate control loops, WLD water leak ribbons, VESDA sub-micron smoke detection, and NOVEC 1230 clean agent fire suppression.',
    project: 'TCS Enterprise BMS Operations Suite (Johnson Controls Metasys)',
    projectBadge: '99.99% Facilities Uptime',
    tags: ['Metasys BMS', 'Honeywell', 'HVAC / AHU Loops', 'VESDA Detection', 'WLD Water Sensors', 'NOVEC 1230', 'CCTV & Flap Barriers']
  },
  {
    id: 'AI',
    label: 'AI / ML',
    fullName: 'AI Neural Networks & Diagnostics',
    value: 88,
    baseline: 88,
    color: '#c084fc',
    status: 'MCA 85% Distinction · Capstone Research',
    desc: 'Architected Convolutional Neural Networks (CNNs) using Keras and OpenCV to classify synthetic and deepfake facial boundary blending artifacts with high precision, alongside distinguished hardware/software diagnostic troubleshooting.',
    project: 'AI Deepfake & Fraudulent Face Detection (Python CNN Research)',
    projectBadge: '85% MCA Distinction',
    tags: ['Convolutional Neural Networks', 'Deep Learning', 'OpenCV Preprocessing', 'Face Authenticity', 'Model Optimization', 'System Troubleshooting']
  }
];

const INITIAL_8_AXES: DomainItem[] = [
  {
    id: 'React',
    label: 'React Architecture',
    fullName: 'React Component Architecture',
    domain: 'Frontend',
    value: 90,
    baseline: 90,
    color: '#00f2fe',
    status: 'Production Deployed',
    desc: 'Modular React 18 component design, custom hooks for catalog state and filter management, and optimal rendering performance.',
    project: "Dexter Men's Wear (Vercel Live)",
    projectBadge: 'React 18',
    tags: ['React.js', 'State Hooks', 'Custom Filters', 'Context API']
  },
  {
    id: 'Tailwind',
    label: 'UI/UX & Tailwind',
    fullName: 'UI/UX & Tailwind CSS Systems',
    domain: 'Frontend',
    value: 92,
    baseline: 92,
    color: '#38bdf8',
    status: 'Responsive & Pixel-Perfect',
    desc: 'Mobile-first responsive design, modern dark-mode palettes, glassmorphism UI tags, and micro-interactions.',
    project: "Dexter Men's Wear & Portfolio Design",
    projectBadge: 'Tailwind CSS',
    tags: ['Tailwind CSS', 'Responsive UI', 'Glassmorphism', 'Flexbox/Grid']
  },
  {
    id: 'Python',
    label: 'Python Scripting',
    fullName: 'Python Scripting & Data Logic',
    domain: 'Backend',
    value: 88,
    baseline: 88,
    color: '#60a5fa',
    status: 'Core Foundation',
    desc: 'Object-oriented Python programming, data transformation scripts, model training, and algorithmic pipelines.',
    project: 'Deepfake CNN Model Training Pipeline',
    projectBadge: 'Python 3',
    tags: ['Python', 'OOP', 'Data Pipelines', 'Algorithms']
  },
  {
    id: 'SQL',
    label: 'MySQL & Relational DB',
    fullName: 'MySQL & Relational Database Design',
    domain: 'Backend',
    value: 84,
    baseline: 84,
    color: '#818cf8',
    status: '3NF Normalization & ACID',
    desc: 'Third normal form relational database modeling, foreign key constraints, atomic transactions, and Supabase integration.',
    project: 'Online Tourism Management System',
    projectBadge: 'MySQL 3NF',
    tags: ['MySQL', 'RDBMS', 'ACID Transactions', 'Row Locks', 'Supabase']
  },
  {
    id: 'Metasys',
    label: 'Metasys BMS Operations',
    fullName: 'Johnson Controls Metasys BMS',
    domain: 'BMS',
    value: 92,
    baseline: 92,
    color: '#10b981',
    status: 'TCS Mission-Critical',
    desc: 'Operational supervision of HVAC chillers, AHU temperature/humidity envelopes, DDC field controllers, and sensor telemetry.',
    project: 'Tata Consultancy Services Enterprise Facilities',
    projectBadge: '99.99% Uptime',
    tags: ['Johnson Controls Metasys', 'AHU Loops', 'DDC Controllers', 'Telemetry']
  },
  {
    id: 'Security',
    label: 'CCTV & ELV Security',
    fullName: 'CCTV, Fire Alarms & ELV Protocols',
    domain: 'BMS',
    value: 89,
    baseline: 89,
    color: '#34d399',
    status: 'Enterprise Certified',
    desc: 'Managing multi-tier CCTV networks, addressable fire alarm panels, VESDA early smoke detection, and NOVEC 1230 clean agent systems.',
    project: 'TCS Campus Access & Life Safety Systems',
    projectBadge: 'Zero Incidents',
    tags: ['CCTV Surveillance', 'VESDA Detection', 'NOVEC 1230', 'Flap Turnstiles']
  },
  {
    id: 'CNN',
    label: 'CNN & Deep Learning',
    fullName: 'Convolutional Neural Networks',
    domain: 'AI',
    value: 85,
    baseline: 85,
    color: '#c084fc',
    status: 'MCA Capstone Research',
    desc: 'Architecting multi-layer CNNs for facial authenticity classification and spatial artifact detection with OpenCV.',
    project: 'AI-Based Deepfake & Face Authenticity Detection',
    projectBadge: 'MCA 85%',
    tags: ['CNN Layers', 'Keras/TensorFlow', 'OpenCV', 'Face Detection']
  },
  {
    id: 'Troubleshooting',
    label: 'System Troubleshooting',
    fullName: 'System Diagnostics & SLA Response',
    domain: 'AI',
    value: 95,
    baseline: 95,
    color: '#e879f9',
    status: 'Distinguished Diagnostic Skill',
    desc: 'Rigorous root-cause analysis across software exceptions, hardware sensory drifts, and network protocol anomalies under tight SLAs.',
    project: 'Enterprise Telemetry & Server Hall Diagnostics',
    projectBadge: 'Rapid SLA',
    tags: ['Root Cause Analysis', 'Hardware Interlocks', 'Log Audits', 'Telemetry']
  }
];

export const SkillsMatrix: React.FC = () => {
  const [radarMode, setRadarMode] = useState<'4-domain' | '8-axis'>('4-domain');
  const [activeDomainId, setActiveDomainId] = useState<string>('Frontend');
  const [coreDomains, setCoreDomains] = useState<DomainItem[]>(INITIAL_CORE_DOMAINS);
  const [granularAxes, setGranularAxes] = useState<DomainItem[]>(INITIAL_8_AXES);

  const [activeSnippetTab, setActiveSnippetTab] = useState<'react_state' | 'python_cnn' | 'sql_transaction'>('react_state');
  const [copied, setCopied] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ item: DomainItem; x: number; y: number } | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

  const activeDataset = radarMode === '4-domain' ? coreDomains : granularAxes;
  const selectedDomainData = coreDomains.find(d => d.id === activeDomainId) || coreDomains[0];

  // D3 Radar Chart Rendering and Animation
  useEffect(() => {
    if (!svgRef.current) return;

    const width = 480;
    const height = 440;
    const radius = 150;
    const levels = 5;
    const totalAxes = activeDataset.length;
    const angleSlice = (Math.PI * 2) / totalAxes;

    const rScale = d3.scaleLinear().domain([0, 100]).range([0, radius]);

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Defs: Filters & Radial Gradients
    const defs = svg.append('defs');

    // Cyber glow filter
    const filter = defs.append('filter')
      .attr('id', 'react-radar-glow')
      .attr('x', '-30%')
      .attr('y', '-30%')
      .attr('width', '160%')
      .attr('height', '160%');
    filter.append('feGaussianBlur').attr('stdDeviation', '4').attr('result', 'coloredBlur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Area Radial Gradient
    const radialGrad = defs.append('radialGradient')
      .attr('id', 'reactRadarAreaGrad')
      .attr('cx', '50%')
      .attr('cy', '50%')
      .attr('r', '50%');
    radialGrad.append('stop').attr('offset', '0%').attr('stop-color', '#00f2fe').attr('stop-opacity', '0.45');
    radialGrad.append('stop').attr('offset', '65%').attr('stop-color', '#2563eb').attr('stop-opacity', '0.28');
    radialGrad.append('stop').attr('offset', '100%').attr('stop-color', '#070a13').attr('stop-opacity', '0.05');

    const g = svg.append('g')
      .attr('class', 'radar-root-group')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // 1. Concentric Grid Polygons & Circular Tracks
    const axisGrid = g.append('g').attr('class', 'axis-grid-group');

    for (let level = 1; level <= levels; level++) {
      const lvlRadius = (radius / levels) * level;
      const pct = (level / levels) * 100;

      // Dotted circular track
      axisGrid.append('circle')
        .attr('r', lvlRadius)
        .attr('fill', 'none')
        .attr('stroke', 'rgba(56, 189, 248, 0.08)')
        .attr('stroke-width', 1)
        .attr('stroke-dasharray', '2, 3');

      // Concentric polygonal web
      const polyPoints = activeDataset.map((_, i) => {
        const x = lvlRadius * Math.cos(angleSlice * i - Math.PI / 2);
        const y = lvlRadius * Math.sin(angleSlice * i - Math.PI / 2);
        return `${x},${y}`;
      }).join(' ');

      axisGrid.append('polygon')
        .attr('points', polyPoints)
        .attr('fill', level === levels ? 'rgba(12, 19, 34, 0.45)' : 'none')
        .attr('stroke', level === levels ? 'rgba(0, 242, 254, 0.28)' : 'rgba(56, 189, 248, 0.14)')
        .attr('stroke-width', level === levels ? 1.5 : 1);

      // Level percentage indicator (on top vertical axis)
      axisGrid.append('text')
        .attr('x', 5)
        .attr('y', -lvlRadius + 4)
        .attr('fill', level === levels ? '#00f2fe' : 'rgba(148, 163, 184, 0.55)')
        .attr('font-size', '9px')
        .attr('font-family', 'monospace')
        .attr('font-weight', level === levels ? 'bold' : 'normal')
        .text(`${pct}%`);
    }

    // 2. Radial Spoke Lines & Axis Labels
    const axes = g.selectAll('.radar-axis')
      .data(activeDataset)
      .enter()
      .append('g')
      .attr('class', 'radar-axis cursor-pointer')
      .on('click', (_, d) => {
        setActiveDomainId(d.domain || d.id);
      });

    // Spoke lines
    axes.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (_, i) => radius * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (_, i) => radius * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('stroke', (d) => (d.domain || d.id) === activeDomainId ? d.color : 'rgba(56, 189, 248, 0.22)')
      .attr('stroke-width', (d) => (d.domain || d.id) === activeDomainId ? 2 : 1)
      .attr('stroke-dasharray', '4, 2');

    // Outer Axis Labels
    axes.append('text')
      .attr('class', 'radar-axis-label font-mono')
      .attr('text-anchor', (_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = Math.cos(angle);
        if (Math.abs(x) < 0.15) return 'middle';
        return x > 0 ? 'start' : 'end';
      })
      .attr('dy', (_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const y = Math.sin(angle);
        if (Math.abs(y) > 0.85) return y < 0 ? '-0.8em' : '1.3em';
        return '0.35em';
      })
      .attr('x', (_, i) => (radius + 24) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (_, i) => (radius + 24) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('fill', (d) => (d.domain || d.id) === activeDomainId ? '#00f2fe' : '#e2e8f0')
      .attr('font-size', radarMode === '4-domain' ? '12px' : '10px')
      .attr('font-weight', (d) => (d.domain || d.id) === activeDomainId ? 'bold' : '600')
      .attr('filter', (d) => (d.domain || d.id) === activeDomainId ? 'url(#react-radar-glow)' : 'none')
      .text((d) => d.label);

    // Percentage value text
    axes.append('text')
      .attr('class', 'radar-pct-label font-mono')
      .attr('text-anchor', (_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const x = Math.cos(angle);
        if (Math.abs(x) < 0.15) return 'middle';
        return x > 0 ? 'start' : 'end';
      })
      .attr('dy', (_, i) => {
        const angle = angleSlice * i - Math.PI / 2;
        const y = Math.sin(angle);
        if (Math.abs(y) > 0.85) return y < 0 ? '0.35em' : '2.3em';
        return '1.45em';
      })
      .attr('x', (_, i) => (radius + 24) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (_, i) => (radius + 24) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('fill', (d) => d.color)
      .attr('font-size', '10px')
      .attr('font-weight', 'bold')
      .text((d) => `${d.value}%`);

    // 3. Radar Polygon Area
    const polygonPoints = activeDataset.map((d, i) => {
      const r = rScale(d.value);
      const x = r * Math.cos(angleSlice * i - Math.PI / 2);
      const y = r * Math.sin(angleSlice * i - Math.PI / 2);
      return [x, y];
    });

    const targetPointsStr = polygonPoints.map(p => `${p[0]},${p[1]}`).join(' ');

    g.append('polygon')
      .attr('class', 'radar-polygon')
      .attr('points', targetPointsStr)
      .attr('fill', 'url(#reactRadarAreaGrad)')
      .attr('stroke', '#00f2fe')
      .attr('stroke-width', 2.5)
      .attr('stroke-linejoin', 'round')
      .attr('filter', 'url(#react-radar-glow)');

    // 4. Data Vertex Markers
    const verticesGroup = g.append('g').attr('class', 'radar-vertices-group');

    const vertexGroups = verticesGroup.selectAll('.vertex-group')
      .data(activeDataset)
      .enter()
      .append('g')
      .attr('class', 'vertex-group cursor-pointer')
      .attr('transform', (d, i) => {
        const r = rScale(d.value);
        const x = r * Math.cos(angleSlice * i - Math.PI / 2);
        const y = r * Math.sin(angleSlice * i - Math.PI / 2);
        return `translate(${x}, ${y})`;
      });

    // Outer pulse ring
    vertexGroups.append('circle')
      .attr('class', 'pulse-ring')
      .attr('r', 6)
      .attr('fill', 'none')
      .attr('stroke', (d) => d.color)
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.8);

    // Inner vertex dot
    vertexGroups.append('circle')
      .attr('class', 'vertex-dot')
      .attr('r', (d) => (d.domain || d.id) === activeDomainId ? 7.5 : 5.5)
      .attr('fill', (d) => d.color)
      .attr('stroke', '#070a13')
      .attr('stroke-width', 2)
      .attr('filter', 'url(#react-radar-glow)');

    // Tooltip and hover handlers
    vertexGroups
      .on('mouseenter', function (event, d) {
        d3.select(this).select('.vertex-dot')
          .transition()
          .duration(150)
          .attr('r', 9);

        const [mX, mY] = d3.pointer(event, svgRef.current);
        setHoveredPoint({ item: d, x: mX, y: mY });
        setActiveDomainId(d.domain || d.id);
      })
      .on('mousemove', function (event, d) {
        const [mX, mY] = d3.pointer(event, svgRef.current);
        setHoveredPoint({ item: d, x: mX, y: mY });
      })
      .on('mouseleave', function (_, d) {
        d3.select(this).select('.vertex-dot')
          .transition()
          .duration(150)
          .attr('r', (d.domain || d.id) === activeDomainId ? 7.5 : 5.5);

        setHoveredPoint(null);
      })
      .on('click', (_, d) => {
        setActiveDomainId(d.domain || d.id);
      });

    // Center Anchor
    g.append('circle')
      .attr('r', 4)
      .attr('fill', '#00f2fe')
      .attr('filter', 'url(#react-radar-glow)');

  }, [activeDataset, activeDomainId, radarMode]);

  // Handle interactive slider re-weighting
  const handleSliderChange = (newVal: number) => {
    setCoreDomains(prev => prev.map(d => d.id === activeDomainId ? { ...d, value: newVal } : d));
    setGranularAxes(prev => prev.map(d => d.domain === activeDomainId ? { ...d, value: newVal } : d));
  };

  const handleResetBaseline = () => {
    setCoreDomains(INITIAL_CORE_DOMAINS);
    setGranularAxes(INITIAL_8_AXES);
  };

  const compositeIndex = (
    coreDomains.reduce((acc, curr) => acc + curr.value, 0) / coreDomains.length
  ).toFixed(1);

  const snippets = {
    react_state: {
      title: "Dexter Men's Wear: Dynamic Client Filter & Cart Context Hook",
      language: 'javascript',
      code: `// React Custom Hook for Instant Client-Side Catalog Filtering
export function useProductCatalog(products, activeCategory, priceRange) {
  return useMemo(() => {
    return products.filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchPrice = item.price >= priceRange[0] && item.price <= priceRange[1];
      return matchCat && matchPrice;
    });
  }, [products, activeCategory, priceRange]);
}`
    },
    python_cnn: {
      title: 'Python / Keras: Convolutional Layers for Spatial Boundary Artifacts',
      language: 'python',
      code: `import tensorflow as tf
from tensorflow.keras import layers, models

def build_face_authenticity_cnn(input_shape=(224, 224, 3)):
    model = models.Sequential([
        # Layer 1: Detect edge anomalies & color channel shifts
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        
        # Layer 2: Extract deeper blending & textural frequencies
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.25),
        
        # Classification Head: Synthetic vs Authentic
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(1, activation='sigmoid') # Binary decision
    ])
    return model`
    },
    sql_transaction: {
      title: 'SQL / MySQL: ACID Reservation Transaction with Row Locking',
      language: 'sql',
      code: `-- Atomic Package Booking Transaction with Concurrency Guard
START TRANSACTION;

-- Verify inventory with exclusive lock to prevent double-booking
SELECT seats_remaining 
FROM tour_packages 
WHERE package_id = 101 
FOR UPDATE;

-- Insert validated itinerary reservation
INSERT INTO bookings (customer_id, package_id, booking_date, guests, status)
VALUES (402, 101, '2026-05-15', 2, 'CONFIRMED');

-- Decrement real-time inventory
UPDATE tour_packages 
SET seats_remaining = seats_remaining - 2 
WHERE package_id = 101;

COMMIT;`
    }
  };

  const currentSnippet = snippets[activeSnippetTab];

  const copyCode = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="skills" className="py-16 sm:py-24 border-b border-zinc-800/80 bg-[#07080d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="pb-8 border-b border-zinc-800/60 mb-10">
          <div className="text-xs font-semibold text-cyan-400 tracking-wide font-mono">
            02. CAPABILITIES & CODE CRAFT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 font-display">
            Technical Skills Matrix
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mt-2 leading-relaxed">
            Dynamic vector proficiency visualization across Frontend, Backend, BMS, and AI synthesized directly from verified production code and TCS enterprise telemetry.
          </p>
        </div>

        {/* ==========================================================================
             D3.js Dynamic Domain Competency Radar Chart Widget
             ========================================================================== */}
        <div className="bg-[#0b101c]/80 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 lg:p-10 mb-12 shadow-2xl relative overflow-hidden backdrop-blur-md">
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Bar with Mode Switcher & Reset */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  <Activity className="w-3 h-3 mr-1.5 text-cyan-400" /> D3.js Vector Radar Engine
                </span>
                <span className="text-xs font-mono text-zinc-400">Dynamic Multi-Domain Mapping</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Domain Proficiency Radar
              </h3>
              <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
                Dynamically visualizes technical proficiencies across <strong className="text-cyan-300">Frontend</strong>, <strong className="text-blue-400">Backend</strong>, <strong className="text-emerald-400">BMS</strong>, and <strong className="text-purple-400">AI</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex p-1 bg-zinc-900/90 rounded-xl border border-zinc-800 text-xs font-mono">
                <button
                  onClick={() => setRadarMode('4-domain')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    radarMode === '4-domain'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Core 4 Domains
                </button>
                <button
                  onClick={() => setRadarMode('8-axis')}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    radarMode === '8-axis'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Granular 8 Axes
                </button>
              </div>

              <button
                onClick={handleResetBaseline}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono border border-zinc-700 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset Baseline</span>
              </button>
            </div>
          </div>

          {/* Radar Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6 relative z-10">
            {/* D3 Canvas Left */}
            <div className="lg:col-span-7 flex flex-col items-center relative">
              {/* Domain Quick Select Pills */}
              <div className="flex flex-wrap justify-center gap-2 mb-4 w-full">
                {coreDomains.map(d => (
                  <button
                    key={d.id}
                    onClick={() => setActiveDomainId(d.id)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                      activeDomainId === d.id
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                    <span>{d.label}</span>
                    <span className="text-zinc-400 font-bold">{d.value}%</span>
                  </button>
                ))}
              </div>

              {/* D3 SVG Container */}
              <div className="w-full flex justify-center items-center relative min-h-[380px] sm:min-h-[440px]">
                <svg
                  ref={svgRef}
                  viewBox="-240 -220 480 440"
                  className="w-full h-full max-w-[500px] max-h-[460px] overflow-visible select-none"
                />

                {/* Hover Tooltip */}
                {hoveredPoint && (
                  <div
                    className="absolute pointer-events-none z-30 p-3 rounded-xl bg-slate-950/95 border border-cyan-400/50 shadow-2xl backdrop-blur-md max-w-xs text-xs font-mono"
                    style={{
                      left: Math.min(Math.max(10, hoveredPoint.x + 15), 260),
                      top: Math.min(Math.max(10, hoveredPoint.y - 30), 320)
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1.5 pb-1.5 border-b border-zinc-800">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredPoint.item.color }} />
                      <span className="text-white font-bold">{hoveredPoint.item.fullName || hoveredPoint.item.label}</span>
                      <span className="ml-auto text-cyan-400 font-bold">{hoveredPoint.item.value}%</span>
                    </div>
                    <div className="text-[11px] text-zinc-300 leading-snug">{hoveredPoint.item.desc}</div>
                    <div className="text-[10px] text-cyan-300 mt-1">{hoveredPoint.item.project}</div>
                  </div>
                )}
              </div>

              <div className="text-[11px] font-mono text-zinc-400 text-center mt-2 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>Hover or tap radar vertices to inspect domain telemetry</span>
              </div>
            </div>

            {/* Dynamic Inspector Right */}
            <div className="lg:col-span-5 flex flex-col gap-4 bg-zinc-950/70 p-6 rounded-2xl border border-zinc-800 shadow-inner">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border"
                    style={{
                      backgroundColor: `${selectedDomainData.color}15`,
                      borderColor: `${selectedDomainData.color}40`,
                      color: selectedDomainData.color
                    }}
                  >
                    {selectedDomainData.id === 'Frontend' && <Code2 className="w-5 h-5" />}
                    {selectedDomainData.id === 'Backend' && <Database className="w-5 h-5" />}
                    {selectedDomainData.id === 'BMS' && <Shield className="w-5 h-5" />}
                    {selectedDomainData.id === 'AI' && <Brain className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg font-display">
                      {selectedDomainData.fullName}
                    </h4>
                    <span className="text-[11px] font-mono" style={{ color: selectedDomainData.color }}>
                      {selectedDomainData.status}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-extrabold font-mono" style={{ color: selectedDomainData.color }}>
                    {selectedDomainData.value}%
                  </span>
                  <p className="text-[10px] font-mono text-zinc-400">domain score</p>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed min-h-[48px]">
                {selectedDomainData.desc}
              </p>

              {/* Applied in Production */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Applied In Production:</div>
                <div className="p-2.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 flex items-center justify-between">
                  <span className="font-medium text-white">{selectedDomainData.project}</span>
                  <span className="text-[10px] font-mono text-cyan-400 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                    {selectedDomainData.projectBadge}
                  </span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Domain Stack Elements:</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDomainData.tags.map((tag, idx) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${
                        idx === 0
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/40'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interactive Proficiency Simulator */}
              <div className="pt-3 border-t border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Test Dynamic Re-Weighting:</span>
                  </span>
                  <span className="font-bold" style={{ color: selectedDomainData.color }}>
                    {selectedDomainData.value}%
                  </span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  value={selectedDomainData.value}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
                  className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>Baseline (40%)</span>
                  <span>Balanced (70%)</span>
                  <span>Mastery (100%)</span>
                </div>
              </div>

              {/* Composite Polymath Badge */}
              <div className="mt-2 p-3 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/30 border border-cyan-500/20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-cyan-300 uppercase">Composite Polymath Index</div>
                  <div className="text-xs text-zinc-300 mt-0.5">Dual-Discipline: Software + BMS Physical Systems</div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-white">{compositeIndex}%</span>
                  <div className="text-[9px] font-mono text-emerald-400">Verified 100%</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Existing Domain Cards & Code Spotlight */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Skill Domains (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Languages & Frontend */}
            <div className="bg-[#0d0f17] border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-400" />
                <span className="text-base font-bold text-white">Languages & Frontend</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-zinc-300">
                {[...TECHNICAL_SKILLS.languages, ...TECHNICAL_SKILLS.frontend].map((s, idx, arr) => (
                  <React.Fragment key={s}>
                    <span className="hover:text-blue-400 transition-colors">{s}</span>
                    {idx < arr.length - 1 && <span className="text-zinc-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800/60 leading-relaxed">
                Responsive layouts, dynamic client-side state, modern React JS hooks, and UI/UX design.
              </p>
            </div>

            {/* Backend & Databases */}
            <div className="bg-[#0d0f17] border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-400" />
                <span className="text-base font-bold text-white">Backend, APIs & Databases</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-zinc-300">
                {[...TECHNICAL_SKILLS.backendDb, ...TECHNICAL_SKILLS.tools].map((s, idx, arr) => (
                  <React.Fragment key={s}>
                    <span className="hover:text-emerald-400 transition-colors">{s}</span>
                    {idx < arr.length - 1 && <span className="text-zinc-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800/60 leading-relaxed">
                MySQL 3NF relational schemas, RESTful CRUD endpoints, Supabase, Git version control, and AI-accelerated workflows.
              </p>
            </div>

            {/* BMS Infrastructure & Enterprise Security */}
            <div className="bg-[#0d0f17] border border-zinc-800 rounded-2xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-400" />
                <span className="text-base font-bold text-white">BMS Infrastructure & Security (TCS)</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-zinc-300">
                {[...TECHNICAL_SKILLS.bmsInfrastructure, ...TECHNICAL_SKILLS.securitySystems].map((s, idx, arr) => (
                  <React.Fragment key={s}>
                    <span className="hover:text-amber-400 transition-colors">{s}</span>
                    {idx < arr.length - 1 && <span className="text-zinc-600">·</span>}
                  </React.Fragment>
                ))}
              </div>
              <p className="text-xs text-zinc-400 pt-2 border-t border-zinc-800/60 leading-relaxed">
                Water Leak Detection (WLD), VESDA early smoke detection, AHU climate loops, NOVEC 1230 fire suppression, CCTV, and flap barrier turnstiles.
              </p>
            </div>
          </div>

          {/* Code Snippet Spotlight (6 cols) */}
          <div className="lg:col-span-6 bg-[#0f111a] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="p-4 bg-[#121420] border-b border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-semibold text-zinc-200">
                  Project Code Implementation Spotlight
                </span>
              </div>
              <button
                onClick={copyCode}
                className="flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Pattern Switcher */}
            <div className="flex items-center px-4 pt-2 gap-2 bg-[#0d0f17] border-b border-zinc-800/60 text-xs overflow-x-auto">
              <button
                onClick={() => setActiveSnippetTab('react_state')}
                className={`pb-2 px-2 font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeSnippetTab === 'react_state'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                React Catalog Filter
              </button>
              <button
                onClick={() => setActiveSnippetTab('python_cnn')}
                className={`pb-2 px-2 font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeSnippetTab === 'python_cnn'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Python CNN Architecture
              </button>
              <button
                onClick={() => setActiveSnippetTab('sql_transaction')}
                className={`pb-2 px-2 font-medium border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeSnippetTab === 'sql_transaction'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                MySQL ACID Lock
              </button>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-[#090a0f] overflow-x-auto min-h-[260px]">
              <div className="text-xs text-zinc-400 mb-2 font-mono">{currentSnippet.title}</div>
              <pre className="text-xs font-mono text-zinc-300 leading-relaxed select-text">
                <code>{currentSnippet.code}</code>
              </pre>
            </div>

            <div className="p-3 bg-[#121420] border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Shipped in Anish's production capstone projects</span>
              <span className="font-mono text-blue-400">clean code standards</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
