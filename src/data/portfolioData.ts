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

export interface EducationItem {
  degree: string;
  institution: string;
  score: string;
  period: string;
  description?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface ProjectItem {
  title: string;
  tech: string;
  link?: string;
  period: string;
  bullets: string[];
  tags: string[];
}

export interface AchievementItem {
  title: string;
  event: string;
  date: string;
  organization: string;
  badge: string;
  icon: string;
}

export const PERSONAL_INFO = {
  name: "ANISH KUMAR",
  title: "Software Developer & BMS Specialist",
  location: "Anna Nagar West, Chennai, 600040",
  phone: "8668183926",
  phoneFormatted: "+91 8668183926",
  email: "anish03ak@gmail.com",
  github: "https://github.com/ANISH03AK",
  githubHandle: "github.com/ANISH03AK",
  linkedin: "https://www.linkedin.com/in/anish-kumar-14aa01304?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  linkedinHandle: "linkedin.com/in/anish-kumar-14aa01304",
  dexterUrl: "https://dexter-style-elevation.vercel.app/",
  summary: "MCA graduate and Software Developer skilled in React JS, Python, and SQL. Proven experience building responsive web applications, consuming RESTful APIs, and maintaining critical enterprise infrastructure (BMS, Fire Alarms, CCTV) at TCS. Seeking to leverage full-stack development and complex system troubleshooting skills in a fast-paced IT role."
};

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: "Master of Computer Applications",
    institution: "Meenakshi Ramasamy Engineering College",
    score: "85%",
    period: "Aug 2022 – Aug 2024",
    description: "Core specializations in Software Engineering, Web Technologies, Database Systems, Cloud Computing, and Neural Networks."
  },
  {
    degree: "B.Sc. in Computer Science",
    institution: "Meenakshi Ramasamy Arts and Science College",
    score: "82%",
    period: "Jul 2019 – Apr 2022",
    description: "Strong grounding in Computer Science fundamentals, Object-Oriented Programming, Data Structures, and Relational Databases."
  },
  {
    degree: "Diploma in Computer Hardware",
    institution: "Meenakshi Ramasamy Arts and Science College",
    score: "80%",
    period: "Jul 2019 – Apr 2020",
    description: "Practical engineering in computer hardware architecture, network cabling, interface protocols, peripheral devices, and system diagnostics."
  }
];

export const TECHNICAL_SKILLS = {
  languages: ["Python", "JavaScript", "SQL"],
  frontend: ["HTML5", "CSS3", "React JS", "UI/UX", "React Native"],
  backendAndDb: ["MYSQL", "RESTful APIs", "RDBMS", "Supabase"],
  tools: ["Git", "GitHub", "MS Office Suite"],
  bmsInfrastructure: ["Fire Alarm", "WLD", "VESDA", "AHU", "NOVEC System"],
  securitySystems: ["Rodent Repellent", "PA", "CCTV", "Flap Barrier"]
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "BMS Engineer",
    company: "Tata Consultancy Services (TCS) (Contract via Johnson Controls)",
    location: "Chennai, India",
    period: "Sept 2025 – Present",
    bullets: [
      "Manage and maintain comprehensive Building Management Systems (BMS) for TCS facilities, ensuring uninterrupted and secure operations.",
      "Operate and troubleshoot critical infrastructure, including WLD, VESDA, Rodent repellent, PA systems, Air Handling Units (AHU), and NOVEC fire suppression systems.",
      "Oversee enterprise security hardware and access controls (Fire Alarms, CCTV, Flap Barriers) and execute daily operational database management using SQL."
    ],
    tags: ["Johnson Controls", "BMS", "AHU", "WLD", "VESDA", "NOVEC System", "Fire Alarm", "CCTV", "Flap Barriers", "SQL"]
  },
  {
    role: "Intern",
    company: "Fino Payment Bank: Jayankondam",
    location: "Jayankondam, India",
    period: "Dec 2024 – June 2025",
    bullets: [
      "Executed daily banking operations and analyzed customer data to optimize workflow efficiency.",
      "Completed a comprehensive research study on payment bank services, earning a \"Very Good\" performance rating from management."
    ],
    tags: ["Banking Operations", "Customer Data Analysis", "Workflow Optimization", "Payment Bank Services", "Performance: Very Good"]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "Dexter Men's Wear (React JS)",
    tech: "React JS",
    link: "https://dexter-style-elevation.vercel.app/",
    period: "Apr 2026",
    bullets: [
      "Engineered a responsive e-commerce application using React JS, featuring dynamic state management and scalable components.",
      "Consumed RESTful APIs for dynamic UI rendering and utilized AI tools (Copilot, ChatGPT) to accelerate the development cycle."
    ],
    tags: ["React JS", "Tailwind CSS", "RESTful APIs", "State Management", "Vercel", "AI Tools (Copilot, ChatGPT)"]
  },
  {
    title: "Detection of Fake and Fraudulent Faces via Neural Network (Python)",
    tech: "Python",
    period: "Aug 2024",
    bullets: [
      "Trained Convolutional Neural Networks (CNNs) using Python to accurately detect and classify synthesized and realistic fake facial images.",
      "Developed modular, scalable code optimized for future REST API deployment to address security vulnerabilities."
    ],
    tags: ["Python", "Convolutional Neural Networks (CNN)", "Neural Networks", "Deep Learning", "REST API Ready", "Computer Vision"]
  },
  {
    title: "Online Tourism Management System",
    tech: "Web / MySQL",
    period: "Apr 2022",
    bullets: [
      "Built a web platform with secure backend API endpoints to efficiently manage user bookings and travel itineraries.",
      "Developed an intuitive administrator interface for seamless MySQL database interaction and package management."
    ],
    tags: ["Web Platform", "MySQL", "Backend APIs", "Booking Management", "Admin Dashboard", "RDBMS"]
  }
];

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  {
    title: "First Place: Code Conversion competition",
    event: "Tech Fest 22",
    date: "06-06-2022",
    organization: "Tech Fest 22",
    badge: "1ST PLACE WINNER",
    icon: "fa-solid fa-trophy"
  },
  {
    title: "Participant: State-level seminar on \"Python for Data Science\"",
    event: "Python for Data Science",
    date: "29-04-2022",
    organization: "Cognitive Class",
    badge: "STATE LEVEL SEMINAR",
    icon: "fa-brands fa-python"
  },
  {
    title: "Participant: State-level webinar on \"Roles and Responsibilities of Database Administrator\"",
    event: "Roles and Responsibilities of Database Administrator",
    date: "20-12-2021",
    organization: "Cognitive Class",
    badge: "STATE LEVEL WEBINAR",
    icon: "fa-solid fa-database"
  }
];

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
    desc: 'HTML5, CSS3, React JS, UI/UX, and React Native component architecture, consuming RESTful APIs for dynamic UI rendering with state management.',
    project: "Dexter Men's Wear (React JS | Vercel Live)",
    projectBadge: 'React JS Live',
    tags: ['React JS', 'HTML5', 'CSS3', 'UI/UX', 'React Native', 'RESTful APIs', 'State Management']
  },
  {
    id: 'Backend',
    label: 'Backend',
    fullName: 'Backend & Databases',
    value: 86,
    baseline: 86,
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    icon: 'fa-solid fa-database',
    status: 'RDBMS & Daily SQL Management',
    desc: 'MYSQL, RESTful APIs, RDBMS, Supabase, and executing daily operational database management using SQL at TCS.',
    project: 'Online Tourism Management System (MySQL Backend)',
    projectBadge: 'MySQL Backed',
    tags: ['Python', 'SQL', 'MYSQL', 'RESTful APIs', 'RDBMS', 'Supabase', 'Daily SQL Mgmt']
  },
  {
    id: 'BMS',
    label: 'BMS',
    fullName: 'BMS Infrastructure & Security Systems',
    value: 94,
    baseline: 94,
    color: '#dc2626',
    glowColor: 'rgba(220, 38, 38, 0.6)',
    icon: 'fa-solid fa-network-wired',
    status: 'TCS BMS Engineer · Uninterrupted Uptime',
    desc: 'Managing Building Management Systems (BMS) for TCS facilities: WLD, VESDA, Rodent repellent, PA systems, AHU, NOVEC fire suppression, Fire Alarms, CCTV, and Flap Barriers.',
    project: 'TCS Facilities BMS & Critical Infrastructure',
    projectBadge: 'TCS Facility BMS',
    tags: ['Fire Alarm', 'WLD', 'VESDA', 'AHU', 'NOVEC System', 'Rodent Repellent', 'PA', 'CCTV', 'Flap Barrier']
  },
  {
    id: 'AI',
    label: 'AI',
    fullName: 'Neural Networks & Python AI',
    value: 88,
    baseline: 88,
    color: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.6)',
    icon: 'fa-solid fa-brain',
    status: 'MCA 85% · Neural Network Research',
    desc: 'Trained Convolutional Neural Networks (CNNs) using Python to accurately detect and classify synthesized and realistic fake facial images, with modular code for REST API deployment.',
    project: 'Detection of Fake and Fraudulent Faces via Neural Network',
    projectBadge: 'Python CNN',
    tags: ['Python', 'Convolutional Neural Networks (CNN)', 'Neural Networks', 'AI Tools', 'Copilot', 'ChatGPT']
  }
];

export const RADAR_8_AXES: RadarDomain[] = [
  {
    id: 'React',
    label: 'React JS & Frontend',
    fullName: 'React JS & UI/UX Architecture',
    domain: 'Frontend',
    value: 90,
    baseline: 90,
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    icon: 'fa-brands fa-react',
    status: 'Production Deployed',
    desc: 'Engineered responsive e-commerce web applications with React JS, featuring dynamic state management and scalable components.',
    project: "Dexter Men's Wear (Apr 2026)",
    projectBadge: 'React JS',
    tags: ['React JS', 'HTML5', 'CSS3', 'UI/UX', 'React Native']
  },
  {
    id: 'Python',
    label: 'Python Programming',
    fullName: 'Python Scripting & CNN Neural Networks',
    domain: 'Backend',
    value: 88,
    baseline: 88,
    color: '#eab308',
    glowColor: 'rgba(234, 179, 8, 0.6)',
    icon: 'fa-brands fa-python',
    status: 'Core Skill & AI Research',
    desc: 'Python programming for training Convolutional Neural Networks and building backend logic and data pipelines.',
    project: 'Fake Face Detection via Neural Network (Aug 2024)',
    projectBadge: 'Python CNN',
    tags: ['Python', 'Data Science', 'Cognitive Class', 'OOP']
  },
  {
    id: 'SQL',
    label: 'MYSQL & SQL Management',
    fullName: 'MYSQL & Operational Database Management',
    domain: 'Backend',
    value: 86,
    baseline: 86,
    color: '#f59e0b',
    glowColor: 'rgba(245, 158, 11, 0.6)',
    icon: 'fa-solid fa-database',
    status: 'Daily SQL Management at TCS',
    desc: 'MYSQL, RESTful APIs, RDBMS, Supabase, and executing daily operational database management using SQL at TCS.',
    project: 'Online Tourism Management System & TCS SQL Ops',
    projectBadge: 'MYSQL / RDBMS',
    tags: ['MYSQL', 'SQL', 'RDBMS', 'RESTful APIs', 'Supabase']
  },
  {
    id: 'BMS',
    label: 'BMS & AHU Infrastructure',
    fullName: 'BMS Infrastructure & AHU Systems',
    domain: 'BMS',
    value: 94,
    baseline: 94,
    color: '#dc2626',
    glowColor: 'rgba(220, 38, 38, 0.6)',
    icon: 'fa-solid fa-network-wired',
    status: 'TCS Mission-Critical',
    desc: 'Operating and troubleshooting critical infrastructure: WLD, VESDA, Rodent repellent, PA systems, AHU, and NOVEC fire suppression systems.',
    project: 'TCS BMS Facilities (Sept 2025 – Present)',
    projectBadge: 'TCS Facility',
    tags: ['AHU', 'WLD', 'VESDA', 'NOVEC System', 'Fire Alarm']
  },
  {
    id: 'Security',
    label: 'Security & Access Control',
    fullName: 'Enterprise Security Systems & Access Control',
    domain: 'BMS',
    value: 90,
    baseline: 90,
    color: '#ea580c',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    icon: 'fa-solid fa-video',
    status: 'CCTV & Flap Barriers',
    desc: 'Oversee enterprise security hardware and access controls (Fire Alarms, CCTV, Flap Barriers, Rodent Repellent, PA systems).',
    project: 'TCS Security Infrastructure',
    projectBadge: 'Access Control',
    tags: ['CCTV', 'Flap Barrier', 'Fire Alarms', 'Rodent Repellent', 'PA']
  },
  {
    id: 'CNN',
    label: 'CNN Neural Networks',
    fullName: 'Convolutional Neural Networks (CNN)',
    domain: 'AI',
    value: 88,
    baseline: 88,
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    icon: 'fa-solid fa-brain',
    status: 'Face Verification Research',
    desc: 'Trained Convolutional Neural Networks using Python to accurately detect and classify synthesized and realistic fake facial images.',
    project: 'Detection of Fake and Fraudulent Faces (Aug 2024)',
    projectBadge: 'CNN Research',
    tags: ['CNN', 'Python', 'Face Detection', 'REST API Ready']
  },
  {
    id: 'Tools',
    label: 'Tools & Workflow',
    fullName: 'Git, GitHub, MS Office & AI Tools',
    domain: 'Frontend',
    value: 92,
    baseline: 92,
    color: '#f87171',
    glowColor: 'rgba(248, 113, 113, 0.6)',
    icon: 'fa-brands fa-github',
    status: 'Version Control & AI Acceleration',
    desc: 'Proficient with Git, GitHub, MS Office Suite, and utilizing AI tools (Copilot, ChatGPT) to accelerate the development cycle.',
    project: 'Development Workflows & Production Deployments',
    projectBadge: 'Git / GitHub',
    tags: ['Git', 'GitHub', 'MS Office Suite', 'Copilot', 'ChatGPT']
  },
  {
    id: 'Troubleshooting',
    label: 'System Troubleshooting',
    fullName: 'Complex System Troubleshooting & Operations',
    domain: 'BMS',
    value: 95,
    baseline: 95,
    color: '#facc15',
    glowColor: 'rgba(250, 204, 21, 0.6)',
    icon: 'fa-solid fa-wrench',
    status: 'Zero Downtime Maintenance',
    desc: 'Operating and troubleshooting critical infrastructure for TCS facilities, ensuring uninterrupted and secure operations under strict SLAs.',
    project: 'TCS Enterprise Operations & Fino Bank Operations',
    projectBadge: 'Uninterrupted Ops',
    tags: ['System Troubleshooting', 'SLA Adherence', 'Operations', 'Diagnostics']
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'First Place Winner: Code Conversion Competition',
    event: 'Tech Fest 22 Inter-Collegiate Coding Championship',
    date: '06-06-2022',
    organization: 'Tech Fest Academic Council',
    badge: '1st Place / Gold Trophy',
    icon: 'fa-solid fa-trophy'
  },
  {
    title: 'State-Level Seminar: Python for Data Science',
    event: 'Advanced Computing & Statistical Analysis Seminar',
    date: '29-04-2022',
    organization: 'Cognitive Class',
    badge: 'State-Level Certificate',
    icon: 'fa-solid fa-award'
  },
  {
    title: 'Roles & Responsibilities of Database Administrator (DBA)',
    event: 'State-Level RDBMS Architecture & Operations Webinar',
    date: '20-12-2021',
    organization: 'Cognitive Class',
    badge: 'State-Level Certificate',
    icon: 'fa-solid fa-database'
  }
];

