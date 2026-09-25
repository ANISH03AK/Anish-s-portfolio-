export interface RadarDomain {
  id: string;
  label: string;
  fullName: string;
  domain?: string;
  value: number;
  baseline: number;
  color: string;
  glowColor: string;
  icon: string;
  status: string;
  desc: string;
  project: string;
  projectBadge: string;
  tags: string[];
}

export const RADAR_CORE_DOMAINS: RadarDomain[] = [
  {
    id: 'Frontend',
    label: 'Frontend',
    fullName: 'Frontend Engineering',
    value: 90,
    baseline: 90,
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    icon: 'fa-brands fa-react',
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
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    icon: 'fa-solid fa-database',
    status: 'Relational 3NF & ACID Compliant',
    desc: 'Third normal form (3NF) relational database design in MySQL, parameterized SQL queries against injection vulnerabilities, Supabase backend integration, and row-level locking for atomic booking transactions.',
    project: 'Online Tourism Management System (MySQL 3NF & PHP APIs)',
    projectBadge: 'ACID Guaranteed',
    tags: ['Python', 'SQL', 'MySQL 3NF', 'Supabase', 'Relational Modeling', 'CRUD APIs', 'Row Locking', 'JSON Schemas']
  },
  {
    id: 'BMS',
    label: 'BMS',
    fullName: 'BMS Infrastructure & ELV Systems',
    value: 92,
    baseline: 92,
    color: '#dc2626',
    glowColor: 'rgba(220, 38, 38, 0.6)',
    icon: 'fa-solid fa-network-wired',
    status: 'TCS Mission-Critical · 99.99% Uptime',
    desc: 'Operational supervision of real-time Building Management Systems for Tata Consultancy Services (TCS) via Johnson Controls Metasys, monitoring AHU climate control loops, WLD water leak ribbons, VESDA sub-micron smoke detection, and NOVEC 1230 clean agent fire suppression.',
    project: 'TCS Enterprise BMS Operations Suite (Johnson Controls Metasys)',
    projectBadge: '99.99% Facilities Uptime',
    tags: ['Metasys BMS', 'Honeywell', 'HVAC / AHU Loops', 'VESDA Detection', 'WLD Water Sensors', 'NOVEC 1230', 'CCTV & Flap Barriers']
  },
  {
    id: 'AI',
    label: 'AI',
    fullName: 'AI Neural Networks & Diagnostics',
    value: 88,
    baseline: 88,
    color: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.6)',
    icon: 'fa-solid fa-brain',
    status: 'MCA 85% Distinction · Capstone Research',
    desc: 'Architected Convolutional Neural Networks (CNNs) using Keras and OpenCV to classify synthetic and deepfake facial boundary blending artifacts with high precision, alongside distinguished hardware/software diagnostic troubleshooting.',
    project: 'AI Deepfake & Fraudulent Face Detection (Python CNN Research)',
    projectBadge: '85% MCA Distinction',
    tags: ['Convolutional Neural Networks', 'Deep Learning', 'OpenCV Preprocessing', 'Face Authenticity', 'Model Optimization', 'System Troubleshooting']
  }
];

export const RADAR_8_AXES: RadarDomain[] = [
  {
    id: 'React',
    label: 'React Architecture',
    fullName: 'React Component Architecture',
    domain: 'Frontend',
    value: 90,
    baseline: 90,
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    icon: 'fa-brands fa-react',
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
    color: '#f87171',
    glowColor: 'rgba(248, 113, 113, 0.6)',
    icon: 'fa-brands fa-css3-alt',
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
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    icon: 'fa-brands fa-python',
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
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    icon: 'fa-solid fa-database',
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
    color: '#dc2626',
    glowColor: 'rgba(220, 38, 38, 0.6)',
    icon: 'fa-solid fa-network-wired',
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
    color: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    icon: 'fa-solid fa-video',
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
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    icon: 'fa-solid fa-brain',
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
    color: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.6)',
    icon: 'fa-solid fa-wrench',
    status: 'Distinguished Diagnostic Skill',
    desc: 'Rigorous root-cause analysis across software exceptions, hardware sensory drifts, and network protocol anomalies under tight SLAs.',
    project: 'Enterprise Telemetry & Server Hall Diagnostics',
    projectBadge: 'Rapid SLA',
    tags: ['Root Cause Analysis', 'Hardware Interlocks', 'Log Audits', 'Telemetry']
  }
];

export const PERSONAL_INFO = {
  name: "Anish Kumar",
  title: "React JS Developer & BMS/ELV Engineer",
  location: "Anna Nagar West, Chennai, 600040",
  phone: "+91 8668183926",
  email: "anish03ak@gmail.com",
  github: "https://github.com/ANISH03AK",
  githubHandle: "github.com/ANISH03AK",
  dexterUrl: "https://dexter-style-elevation.vercel.app/"
};
