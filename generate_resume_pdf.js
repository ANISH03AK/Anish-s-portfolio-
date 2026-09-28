const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  
  // Standard A4: 595.28 x 841.89 points
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const darkNavy = rgb(15/255, 23/255, 42/255);
  const primaryBlue = rgb(37/255, 99/255, 235/255);
  const textDark = rgb(30/255, 41/255, 59/255);
  const textMuted = rgb(100/255, 116/255, 139/255);
  const borderLight = rgb(226/255, 232/255, 240/255);
  const bgLight = rgb(248/255, 250/255, 252/255);

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  function checkPageBreak(neededHeight) {
    if (y - neededHeight < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
      return true;
    }
    return false;
  }

  // Header Box
  const headerHeight = 88;
  page.drawRectangle({
    x: margin,
    y: y - headerHeight,
    width: contentWidth,
    height: headerHeight,
    color: bgLight,
    borderColor: borderLight,
    borderWidth: 1,
  });

  // Top accent bar
  page.drawRectangle({
    x: margin,
    y: y - 4,
    width: contentWidth,
    height: 4,
    color: primaryBlue,
  });

  // Name
  page.drawText('ANISH KUMAR', {
    x: margin + 18,
    y: y - 28,
    size: 20,
    font: fontBold,
    color: darkNavy,
  });

  // Subtitle
  page.drawText('REACT JS DEVELOPER  |  BMS & ELV INFRASTRUCTURE SPECIALIST', {
    x: margin + 18,
    y: y - 44,
    size: 9,
    font: fontBold,
    color: primaryBlue,
  });

  // Contact details
  const contactText = 'Location: Jayankondam / Chennai, Tamil Nadu  |  Phone: +91 9360877964  |  Email: anish03ak@gmail.com';
  page.drawText(contactText, {
    x: margin + 18,
    y: y - 62,
    size: 8.5,
    font: fontRegular,
    color: textMuted,
  });

  const linksText = 'GitHub: https://github.com/ANISH03AK  |  Live App: https://dexter-style-elevation.vercel.app/';
  page.drawText(linksText, {
    x: margin + 18,
    y: y - 76,
    size: 8.5,
    font: fontRegular,
    color: textDark,
  });

  y -= headerHeight + 14;

  function drawSectionTitle(title) {
    checkPageBreak(35);
    page.drawText(title.toUpperCase(), {
      x: margin,
      y: y,
      size: 11,
      font: fontBold,
      color: primaryBlue,
    });
    
    // Underline
    page.drawLine({
      start: { x: margin, y: y - 4 },
      end: { x: pageWidth - margin, y: y - 4 },
      thickness: 1,
      color: borderLight,
    });
    
    // Dot indicator
    page.drawCircle({
      x: margin - 6,
      y: y + 3,
      size: 2.5,
      color: primaryBlue,
    });

    y -= 16;
  }

  // 1. PROFESSIONAL SUMMARY
  drawSectionTitle('Professional Summary');
  const summaryLines = [
    'MCA graduate and Software Developer skilled in React JS, Python, and SQL. Proven experience building responsive web',
    'applications, consuming RESTful APIs, and maintaining critical enterprise infrastructure (BMS, Fire Alarms, CCTV) at TCS.',
    'Seeking to leverage full-stack development and complex system troubleshooting skills in a fast-paced IT role.'
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: margin + 8,
      y: y,
      size: 9,
      font: fontRegular,
      color: textDark,
    });
    y -= 13;
  }
  y -= 6;

  // 2. EDUCATION
  drawSectionTitle('Education');
  const educationItems = [
    {
      degree: 'Master of Computer Applications (MCA) — 85% Distinction',
      school: 'Meenakshi Ramasamy Engineering College',
      period: 'Aug 2022 - Aug 2024'
    },
    {
      degree: 'B.Sc. in Computer Science — 82%',
      school: 'Meenakshi Ramasamy Arts and Science College',
      period: 'Jul 2019 - Apr 2022'
    },
    {
      degree: 'Diploma in Computer Hardware — 80%',
      school: 'Meenakshi Ramasamy Arts and Science College',
      period: 'Jul 2019 - Apr 2020'
    }
  ];

  for (const edu of educationItems) {
    checkPageBreak(30);
    page.drawText(edu.degree, {
      x: margin + 8,
      y: y,
      size: 9.5,
      font: fontBold,
      color: darkNavy,
    });
    page.drawText(edu.period, {
      x: pageWidth - margin - 100,
      y: y,
      size: 8.5,
      font: fontOblique,
      color: textMuted,
    });
    y -= 12;
    page.drawText(edu.school, {
      x: margin + 8,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: textMuted,
    });
    y -= 12;
  }
  y -= 4;

  // 3. TECHNICAL SKILLS
  drawSectionTitle('Technical Skills');
  const skillCategories = [
    { title: 'Programming & Query Languages:', skills: 'Python, JavaScript, SQL (PostgreSQL & MySQL)' },
    { title: 'Frontend Technologies:', skills: 'React JS, React Native, UI/UX Design, HTML5, CSS3, Tailwind CSS' },
    { title: 'Backend & Databases:', skills: 'MySQL, RESTful APIs, Supabase, Relational Database Management' },
    { title: 'Tools & Workflow:', skills: 'Git, GitHub, VS Code, MS Office Suite, Linux CLI' },
    { title: 'BMS Infrastructure:', skills: 'Fire Alarm System, WLD, VESDA, AHU, NOVEC Fire Suppression' },
    { title: 'Security Systems:', skills: 'CCTV Surveillance, Flap Barrier, Public Address (PA), Rodent Repellent' }
  ];

  for (const cat of skillCategories) {
    checkPageBreak(16);
    page.drawText(cat.title, {
      x: margin + 8,
      y: y,
      size: 8.5,
      font: fontBold,
      color: darkNavy,
    });
    page.drawText(cat.skills, {
      x: margin + 175,
      y: y,
      size: 8.5,
      font: fontRegular,
      color: textDark,
    });
    y -= 13;
  }
  y -= 6;

  // 4. PROFESSIONAL EXPERIENCE
  drawSectionTitle('Professional Experience');
  
  // Job 1
  checkPageBreak(65);
  page.drawText('BMS Engineer — Tata Consultancy Services (TCS)', {
    x: margin + 8,
    y: y,
    size: 10,
    font: fontBold,
    color: darkNavy,
  });
  page.drawText('Sept 2025 - Present', {
    x: pageWidth - margin - 100,
    y: y,
    size: 8.5,
    font: fontBold,
    color: primaryBlue,
  });
  y -= 12;
  page.drawText('Contract via Johnson Controls  |  Enterprise Campus Facility Operations', {
    x: margin + 8,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: textMuted,
  });
  y -= 12;

  const tcsBullets = [
    'Manage and maintain comprehensive Building Management Systems (BMS) for TCS facilities, ensuring 100% operational uptime.',
    'Operate and troubleshoot critical infrastructure: Water Leak Detection (WLD), VESDA, AHU, and NOVEC gas suppression.',
    'Oversee enterprise security hardware (Fire Alarms, CCTV, Flap Barriers) and perform daily database tracking via SQL.'
  ];
  for (const b of tcsBullets) {
    checkPageBreak(16);
    page.drawText('•', { x: margin + 12, y: y, size: 8, font: fontBold, color: primaryBlue });
    page.drawText(b, { x: margin + 22, y: y, size: 8.5, font: fontRegular, color: textDark });
    y -= 12;
  }
  y -= 6;

  // Job 2
  checkPageBreak(50);
  page.drawText('Intern — Fino Payment Bank', {
    x: margin + 8,
    y: y,
    size: 10,
    font: fontBold,
    color: darkNavy,
  });
  page.drawText('Dec 2024 - June 2025', {
    x: pageWidth - margin - 100,
    y: y,
    size: 8.5,
    font: fontBold,
    color: primaryBlue,
  });
  y -= 12;
  page.drawText('Jayankondam Branch  |  Banking Operations & Financial Workflow Analysis', {
    x: margin + 8,
    y: y,
    size: 8.5,
    font: fontOblique,
    color: textMuted,
  });
  y -= 12;

  const finoBullets = [
    'Executed daily banking operations and analyzed customer data to optimize transactional workflow efficiency.',
    'Authored a comprehensive research study on payment bank services, earning a "Very Good" evaluation from management.'
  ];
  for (const b of finoBullets) {
    checkPageBreak(16);
    page.drawText('•', { x: margin + 12, y: y, size: 8, font: fontBold, color: primaryBlue });
    page.drawText(b, { x: margin + 22, y: y, size: 8.5, font: fontRegular, color: textDark });
    y -= 12;
  }
  y -= 6;

  // 5. KEY PROJECTS
  drawSectionTitle('Featured Projects');

  const projects = [
    {
      name: "Dexter Men's Wear (React JS Production E-Commerce)",
      date: 'Apr 2026',
      link: 'https://dexter-style-elevation.vercel.app/',
      bullets: [
        'Built a dynamic, responsive e-commerce application using React JS with modular component hierarchy.',
        'Integrated RESTful APIs, cart state logic, and modern responsive layouts optimized across devices.'
      ]
    },
    {
      name: 'Detection of Fake & Fraudulent Faces via Neural Network (Python / CNN)',
      date: 'Aug 2024',
      link: 'Deep Learning & Computer Vision',
      bullets: [
        'Trained Convolutional Neural Networks (CNNs) in Python to identify deepfake and synthesized facial imagery.',
        'Engineered modular pre-processing pipelines with clean REST interface readiness.'
      ]
    },
    {
      name: 'Online Tourism Management System (Full-Stack / MySQL)',
      date: 'Apr 2022',
      link: 'Web Application & RDBMS',
      bullets: [
        'Developed end-to-end booking platform with administrator control console and relational MySQL schemas.'
      ]
    }
  ];

  for (const proj of projects) {
    checkPageBreak(40);
    page.drawText(proj.name, {
      x: margin + 8,
      y: y,
      size: 9.5,
      font: fontBold,
      color: darkNavy,
    });
    page.drawText(proj.date, {
      x: pageWidth - margin - 80,
      y: y,
      size: 8.5,
      font: fontBold,
      color: primaryBlue,
    });
    y -= 12;
    page.drawText(proj.link, {
      x: margin + 8,
      y: y,
      size: 8,
      font: fontOblique,
      color: textMuted,
    });
    y -= 11;
    for (const b of proj.bullets) {
      checkPageBreak(15);
      page.drawText('•', { x: margin + 12, y: y, size: 8, font: fontBold, color: primaryBlue });
      page.drawText(b, { x: margin + 22, y: y, size: 8.5, font: fontRegular, color: textDark });
      y -= 11;
    }
    y -= 4;
  }

  // 6. ACHIEVEMENTS & CERTIFICATIONS
  drawSectionTitle('Achievements & Seminars');
  const achievements = [
    'First Place: Code Conversion competition at "Tech Fest 22" (06-06-2022)',
    'Participant: State-level seminar on "Python for Data Science" via Cognitive Class (29-04-2022)',
    'Participant: State-level webinar on "Roles and Responsibilities of Database Administrator" (20-12-2021)'
  ];
  for (const ach of achievements) {
    checkPageBreak(15);
    page.drawText('*', { x: margin + 12, y: y, size: 8, font: fontBold, color: primaryBlue });
    page.drawText(ach, { x: margin + 24, y: y, size: 8.5, font: fontRegular, color: textDark });
    y -= 12;
  }

  // Footer on each page
  const pageCount = pdfDoc.getPageCount();
  for (let i = 0; i < pageCount; i++) {
    const p = pdfDoc.getPage(i);
    p.drawText(`Anish Kumar — Resume | Page ${i + 1} of ${pageCount}`, {
      x: margin,
      y: 20,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
    });
    p.drawText('Verified Document — Contact: anish03ak@gmail.com | +91 9360877964', {
      x: pageWidth - margin - 240,
      y: 20,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
    });
  }

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, 'Anish_Kumar_Resume.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Resume PDF successfully written to ${outputPath} (${pdfBytes.length} bytes, ${pageCount} pages)`);
}

createResume().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
