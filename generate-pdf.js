const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateResumePDF() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 36, bottom: 36, left: 40, right: 40 },
    info: {
      Title: 'Anish Kumar - Resume',
      Author: 'Anish Kumar',
      Subject: 'Software Developer & BMS Specialist Resume',
      Keywords: 'React JS, Python, SQL, BMS, Software Developer'
    }
  });

  const outputPath = path.join(__dirname, 'Anish_Kumar_Resume.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const primaryColor = '#1e3a8a'; // Deep Navy
  const secondaryColor = '#0284c7'; // Vivid Cyan/Blue
  const darkText = '#0f172a';
  const bodyText = '#334155';
  const mutedText = '#64748b';
  const lightBg = '#f1f5f9';

  // --- HEADER ---
  doc.rect(40, 36, 515, 78).fill('#f8fafc');
  doc.rect(40, 36, 4, 78).fill(primaryColor);

  doc.font('Helvetica-Bold').fontSize(22).fillColor(primaryColor);
  doc.text('ANISH KUMAR', 56, 46);

  doc.font('Helvetica-Bold').fontSize(10).fillColor(secondaryColor);
  doc.text('SOFTWARE DEVELOPER  |  BMS & ELV OPERATIONS SPECIALIST', 56, 72);

  doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
  const contactLine = 'Anna Nagar West, Chennai, 600040   |   +91 8668183926   |   anish03ak@gmail.com   |   github.com/ANISH03AK';
  doc.text(contactLine, 56, 88);

  let currentY = 126;

  function drawSectionHeading(title, y) {
    doc.rect(40, y, 515, 18).fill(lightBg);
    doc.rect(40, y, 3, 18).fill(primaryColor);
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor(primaryColor);
    doc.text(title.toUpperCase(), 50, y + 4.5);
    return y + 24;
  }

  // --- PROFESSIONAL SUMMARY ---
  currentY = drawSectionHeading('Professional Summary', currentY);
  doc.font('Helvetica').fontSize(8.5).fillColor(bodyText).lineGap(2.5);
  doc.text(
    'MCA graduate (85% Distinction) and Software Developer skilled in React JS, Python, and SQL. Proven experience building responsive web applications, consuming RESTful APIs, and maintaining critical enterprise infrastructure (BMS, Fire Alarms, CCTV) at TCS. Seeking to leverage full-stack development and complex system troubleshooting skills in a fast-paced IT role.',
    40,
    currentY,
    { width: 515, align: 'justify' }
  );
  currentY += 46;

  // --- TECHNICAL SKILLS ---
  currentY = drawSectionHeading('Technical Skills', currentY);
  const skills = [
    { label: 'Languages', items: 'Python, JavaScript (ES6+), SQL' },
    { label: 'Frontend', items: 'HTML5, CSS3, React JS, UI/UX, React Native, Tailwind CSS' },
    { label: 'Backend & DB', items: 'MYSQL, RESTful APIs, RDBMS, Supabase' },
    { label: 'Tools', items: 'Git, GitHub, MS Office Suite, VS Code' },
    { label: 'BMS Infrastructure', items: 'Fire Alarm Systems, WLD, VESDA, AHU, NOVEC Fire Suppression' },
    { label: 'Security & Access', items: 'CCTV Surveillance, Access Control (ACS), Flap Barriers, PA Systems, Rodent Repellent' }
  ];

  skills.forEach((s) => {
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(darkText);
    doc.text(s.label + ':', 40, currentY, { width: 110, continued: false });
    doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
    doc.text(s.items, 155, currentY, { width: 400 });
    currentY += 13.5;
  });
  currentY += 6;

  // --- WORK EXPERIENCE ---
  currentY = drawSectionHeading('Professional Experience', currentY);

  // TCS Job
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(darkText);
  doc.text('BMS Engineer', 40, currentY);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(primaryColor);
  doc.text('Tata Consultancy Services (TCS) (Contract via Johnson Controls)', 125, currentY);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(mutedText);
  doc.text('Sept 2025 – Present | Chennai, India', 40, currentY + 12);
  currentY += 25;

  const tcsBullets = [
    'Manage and maintain comprehensive Building Management Systems (BMS) for TCS facilities, ensuring uninterrupted and secure operations.',
    'Operate and troubleshoot critical infrastructure, including WLD, VESDA, Rodent repellent, PA systems, Air Handling Units (AHU), and NOVEC fire suppression systems.',
    'Oversee enterprise security hardware and access controls (Fire Alarms, CCTV, Flap Barriers) and execute daily operational database management using SQL.'
  ];
  tcsBullets.forEach(b => {
    doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
    doc.text('•  ' + b, 50, currentY, { width: 505, lineGap: 1.5 });
    currentY += 21;
  });
  currentY += 4;

  // Fino Bank Job
  doc.font('Helvetica-Bold').fontSize(9.5).fillColor(darkText);
  doc.text('Intern', 40, currentY);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(primaryColor);
  doc.text('Fino Payment Bank', 85, currentY);
  doc.font('Helvetica-Oblique').fontSize(8.5).fillColor(mutedText);
  doc.text('Dec 2024 – June 2025 | Jayankondam, India', 40, currentY + 12);
  currentY += 25;

  const finoBullets = [
    'Executed daily banking operations and analyzed customer data to optimize workflow efficiency.',
    'Completed a comprehensive research study on payment bank services, earning a "Very Good" performance rating from management.'
  ];
  finoBullets.forEach(b => {
    doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
    doc.text('•  ' + b, 50, currentY, { width: 505, lineGap: 1.5 });
    currentY += 15;
  });
  currentY += 6;

  // --- KEY PROJECTS ---
  currentY = drawSectionHeading('Projects', currentY);

  // Project 1: Dexter
  doc.font('Helvetica-Bold').fontSize(9).fillColor(darkText);
  doc.text('Dexter Men\'s Wear (React JS)', 40, currentY);
  doc.font('Helvetica').fontSize(8).fillColor(secondaryColor);
  doc.text('Live: https://dexter-style-elevation.vercel.app/', 210, currentY, { link: 'https://dexter-style-elevation.vercel.app/' });
  doc.font('Helvetica-Oblique').fontSize(8).fillColor(mutedText);
  doc.text('Apr 2026', 500, currentY, { align: 'right' });
  currentY += 13;

  doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
  doc.text('•  Engineered a responsive e-commerce web application using React JS, featuring dynamic state management and scalable components.', 50, currentY, { width: 505 });
  currentY += 14;
  doc.text('•  Consumed RESTful APIs for dynamic UI rendering and utilized AI tools (Copilot, ChatGPT) to accelerate the development cycle.', 50, currentY, { width: 505 });
  currentY += 18;

  // Project 2: Fake faces
  doc.font('Helvetica-Bold').fontSize(9).fillColor(darkText);
  doc.text('Detection of Fake and Fraudulent Faces via Neural Network (Python)', 40, currentY);
  doc.font('Helvetica-Oblique').fontSize(8).fillColor(mutedText);
  doc.text('Aug 2024', 500, currentY, { align: 'right' });
  currentY += 13;

  doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
  doc.text('•  Trained Convolutional Neural Networks (CNNs) using Python to accurately detect and classify synthesized and realistic fake facial images.', 50, currentY, { width: 505 });
  currentY += 14;
  doc.text('•  Developed modular, scalable code optimized for future REST API deployment to address security vulnerabilities.', 50, currentY, { width: 505 });
  currentY += 18;

  // Project 3: Tourism
  doc.font('Helvetica-Bold').fontSize(9).fillColor(darkText);
  doc.text('Online Tourism Management System (Web / MySQL)', 40, currentY);
  doc.font('Helvetica-Oblique').fontSize(8).fillColor(mutedText);
  doc.text('Apr 2022', 500, currentY, { align: 'right' });
  currentY += 13;

  doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
  doc.text('•  Built a web platform with secure backend API endpoints to efficiently manage user bookings and travel itineraries.', 50, currentY, { width: 505 });
  currentY += 14;
  doc.text('•  Developed an intuitive administrator interface for seamless MySQL database interaction and package management.', 50, currentY, { width: 505 });
  currentY += 18;

  // --- EDUCATION ---
  currentY = drawSectionHeading('Education', currentY);
  const eduList = [
    { degree: 'Master of Computer Applications (MCA)', inst: 'Meenakshi Ramasamy Engineering College', grade: '85% Distinction', year: 'Aug 2022 – Aug 2024' },
    { degree: 'B.Sc. in Computer Science', inst: 'Meenakshi Ramasamy Arts and Science College', grade: '82%', year: 'Jul 2019 – Apr 2022' },
    { degree: 'Diploma in Computer Hardware', inst: 'Meenakshi Ramasamy Arts and Science College', grade: '80%', year: 'Jul 2019 – Apr 2020' }
  ];

  eduList.forEach(e => {
    doc.font('Helvetica-Bold').fontSize(8.5).fillColor(darkText);
    doc.text(e.degree, 40, currentY);
    doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
    doc.text('  |  ' + e.inst + '  —  ', { continued: true });
    doc.font('Helvetica-Bold').fillColor(primaryColor);
    doc.text(e.grade);
    doc.font('Helvetica-Oblique').fontSize(8).fillColor(mutedText);
    doc.text(e.year, 460, currentY, { align: 'right' });
    currentY += 14;
  });
  currentY += 4;

  // --- ACHIEVEMENTS & CERTIFICATIONS ---
  currentY = drawSectionHeading('Achievements & Certifications', currentY);
  const achievements = [
    'First Place: Code Conversion competition at "Tech Fest 22" (06-06-2022)',
    'Participant: State-level seminar on "Python for Data Science" via Cognitive Class (29-04-2022)',
    'Participant: State-level webinar on "Roles and Responsibilities of Database Administrator" via Cognitive Class (20-12-2021)'
  ];
  achievements.forEach(a => {
    doc.font('Helvetica').fontSize(8.5).fillColor(bodyText);
    doc.text('•  ' + a, 50, currentY, { width: 505 });
    currentY += 13;
  });

  doc.end();

  stream.on('finish', () => {
    console.log('Anish_Kumar_Resume.pdf generated successfully at:', outputPath);
  });
}

generateResumePDF();
