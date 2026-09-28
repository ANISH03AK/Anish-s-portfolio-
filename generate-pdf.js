const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function generateResumePDF() {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 32, bottom: 28, left: 42, right: 42 },
    info: {
      Title: 'ANISH KUMAR - Resume',
      Author: 'ANISH KUMAR',
      Subject: 'Software Developer & BMS Operations Specialist Resume',
      Keywords: 'React JS, Python, SQL, BMS, Software Developer'
    }
  });

  const outputPath = path.join(__dirname, 'Anish_Kumar_Resume.pdf');
  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const leftMargin = 42;
  const rightMargin = 553;
  const contentWidth = rightMargin - leftMargin;

  // Header - Centered ATS Format
  doc.font('Helvetica-Bold').fontSize(16).fillColor('#000000');
  doc.text('ANISH KUMAR', leftMargin, 32, { width: contentWidth, align: 'center' });

  doc.font('Helvetica').fontSize(9.5).fillColor('#000000');
  doc.text('Anna Nagar West, Chennai, 600040', leftMargin, 52, { width: contentWidth, align: 'center' });

  doc.font('Helvetica').fontSize(8.5).fillColor('#000000');
  doc.text('8668183926 | anish03ak@gmail.com | https://github.com/ANISH03AK', leftMargin, 66, { width: contentWidth, align: 'center' });

  let y = 84;

  function drawSectionHeader(title) {
    y += 6;
    doc.font('Helvetica-Bold').fontSize(9.5).fillColor('#000000');
    doc.text(title.toUpperCase(), leftMargin, y);
    y += 12;
    doc.moveTo(leftMargin, y).lineTo(rightMargin, y).lineWidth(0.65).strokeColor('#000000').stroke();
    y += 5;
  }

  // 1. PROFESSIONAL SUMMARY
  drawSectionHeader('Professional Summary');
  doc.font('Helvetica').fontSize(8).fillColor('#000000').lineGap(1.5);
  doc.text(
    '• MCA graduate and Software Developer skilled in React JS, Python, and SQL. Proven experience building responsive web applications, consuming RESTful APIs, and maintaining critical enterprise infrastructure (BMS, Fire Alarms, CCTV) at TCS. Seeking to leverage full-stack development and complex system troubleshooting skills in a fast-paced IT role.',
    leftMargin,
    y,
    { width: contentWidth, align: 'left' }
  );
  y += 32;

  // 2. EDUCATION
  drawSectionHeader('Education');
  const eduItems = [
    {
      degree: 'Master of Computer Applications',
      inst: 'Meenakshi Ramasamy Engineering College - 85%',
      period: 'Aug 2022 – Aug 2024'
    },
    {
      degree: 'B.Sc. in Computer Science',
      inst: 'Meenakshi Ramasamy Arts and Science College - 82%',
      period: 'Jul 2019 – Apr 2022'
    },
    {
      degree: 'Diploma in Computer Hardware',
      inst: 'Meenakshi Ramasamy Arts and Science College - 80%',
      period: 'Jul 2019 – Apr 2020'
    }
  ];

  for (const edu of eduItems) {
    doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000');
    const degreeWidth = doc.widthOfString(edu.degree + ' | ');
    doc.text(edu.degree + ' | ', leftMargin, y, { continued: false });
    
    doc.font('Helvetica').fontSize(8).fillColor('#000000');
    doc.text(edu.inst, leftMargin + degreeWidth, y, { continued: false });

    doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000');
    doc.text(edu.period, leftMargin, y, { width: contentWidth, align: 'right' });
    y += 13;
  }

  // 3. TECHNICAL SKILLS
  drawSectionHeader('Technical Skills');
  const colWidth = 250;
  const col2X = 295;
  const col2Width = rightMargin - col2X;

  const row1Y = y;
  // Left: Languages
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000').text('► Languages: ', leftMargin, row1Y, { continued: true });
  doc.font('Helvetica').text('Python, JavaScript, SQL');

  // Right: Frontend
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000').text('► Frontend: ', col2X, row1Y, { continued: true });
  doc.font('Helvetica').text('HTML5, CSS3, React JS, UI/UX, React Native');
  y += 13;

  const row2Y = y;
  // Left: Backend & DB
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000').text('► Backend & DB: ', leftMargin, row2Y, { continued: true });
  doc.font('Helvetica').text('MYSQL, RESTful APIs, RDBMS, Supabase');

  // Right: Tools
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000').text('► Tools: ', col2X, row2Y, { continued: true });
  doc.font('Helvetica').text('Git, GitHub, MS Office Suite');
  y += 13;

  const row3Y = y;
  // Left: BMS Infrastructure
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000').text('► BMS Infrastructure: ', leftMargin, row3Y, { continued: true });
  doc.font('Helvetica').text('Fire Alarm, WLD, VESDA, AHU, NOVEC');
  doc.text('  System', leftMargin, row3Y + 10);

  // Right: Security Systems
  doc.font('Helvetica-Bold').fontSize(8).fillColor('#000000').text('► Security Systems: ', col2X, row3Y, { continued: true });
  doc.font('Helvetica').text('Rodent Repellent, PA, CCTV, Flap Barrier');
  y += 22;

  // 4. EXPERIENCE
  drawSectionHeader('Experience');
  
  // Job 1: TCS
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor('#000000');
  doc.text('BMS Engineer – Tata Consultancy Services (TCS) (Contract via Johnson Controls)', leftMargin, y, { continued: false });
  doc.text('Sept 2025 – Present', leftMargin, y, { width: contentWidth, align: 'right' });
  y += 11;

  doc.font('Helvetica').fontSize(8).fillColor('#000000').lineGap(1.2);
  const tcsBullets = [
    '• Manage and maintain comprehensive Building Management Systems (BMS) for TCS facilities, ensuring uninterrupted and secure operations.',
    '• Operate and troubleshoot critical infrastructure, including WLD, VESDA, Rodent repellent, PA systems, Air Handling Units (AHU), and NOVEC fire suppression systems.',
    '• Oversee enterprise security hardware and access controls (Fire Alarms, CCTV, Flap Barriers) and execute daily operational database management using SQL.'
  ];
  for (const b of tcsBullets) {
    doc.text(b, leftMargin, y, { width: contentWidth, align: 'left' });
    y += doc.heightOfString(b, { width: contentWidth }) + 1.5;
  }
  y += 2;

  // Job 2: Fino Payment Bank
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor('#000000');
  doc.text('Intern – Fino Payment Bank: Jayankondam', leftMargin, y, { continued: false });
  doc.text('Dec 2024 – June 2025', leftMargin, y, { width: contentWidth, align: 'right' });
  y += 11;

  doc.font('Helvetica').fontSize(8).fillColor('#000000').lineGap(1.2);
  const finoBullets = [
    '• Executed daily banking operations and analyzed customer data to optimize workflow efficiency.',
    '• Completed a comprehensive research study on payment bank services, earning a "Very Good" performance rating from management.'
  ];
  for (const b of finoBullets) {
    doc.text(b, leftMargin, y, { width: contentWidth, align: 'left' });
    y += doc.heightOfString(b, { width: contentWidth }) + 1.5;
  }
  y += 2;

  // 5. PROJECTS
  drawSectionHeader('Projects');

  // Project 1: Dexter
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor('#000000');
  doc.text("Dexter Men's Wear (React JS) | https://dexter-style-elevation.vercel.app/", leftMargin, y, { continued: false });
  doc.text('Apr 2026', leftMargin, y, { width: contentWidth, align: 'right' });
  y += 11;

  doc.font('Helvetica').fontSize(8).fillColor('#000000').lineGap(1.2);
  const dexterBullets = [
    '• Engineered a responsive e-commerce application using React JS, featuring dynamic state management and scalable components.',
    '• Consumed RESTful APIs for dynamic UI rendering and utilized AI tools (Copilot, ChatGPT) to accelerate the development cycle.'
  ];
  for (const b of dexterBullets) {
    doc.text(b, leftMargin, y, { width: contentWidth, align: 'left' });
    y += doc.heightOfString(b, { width: contentWidth }) + 1.5;
  }
  y += 2;

  // Project 2: Fraud Detection
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor('#000000');
  doc.text('Detection of Fake and Fraudulent Faces via Neural Network (Python)', leftMargin, y, { continued: false });
  doc.text('Aug 2024', leftMargin, y, { width: contentWidth, align: 'right' });
  y += 11;

  doc.font('Helvetica').fontSize(8).fillColor('#000000').lineGap(1.2);
  const fraudBullets = [
    '• Trained Convolutional Neural Networks (CNNs) using Python to accurately detect and classify synthesized and realistic fake facial images.',
    '• Developed modular, scalable code optimized for future REST API deployment to address security vulnerabilities.'
  ];
  for (const b of fraudBullets) {
    doc.text(b, leftMargin, y, { width: contentWidth, align: 'left' });
    y += doc.heightOfString(b, { width: contentWidth }) + 1.5;
  }
  y += 2;

  // Project 3: Tourism
  doc.font('Helvetica-Bold').fontSize(8.2).fillColor('#000000');
  doc.text('Online Tourism Management System', leftMargin, y, { continued: false });
  doc.text('Apr 2022', leftMargin, y, { width: contentWidth, align: 'right' });
  y += 11;

  doc.font('Helvetica').fontSize(8).fillColor('#000000').lineGap(1.2);
  const tourismBullets = [
    '• Built a web platform with secure backend API endpoints to efficiently manage user bookings and travel itineraries.',
    '• Developed an intuitive administrator interface for seamless MySQL database interaction and package management.'
  ];
  for (const b of tourismBullets) {
    doc.text(b, leftMargin, y, { width: contentWidth, align: 'left' });
    y += doc.heightOfString(b, { width: contentWidth }) + 1.5;
  }
  y += 2;

  // 6. ACHIEVEMENTS
  drawSectionHeader('Achievements');
  doc.font('Helvetica').fontSize(8).fillColor('#000000').lineGap(1.2);
  const achieveBullets = [
    '• First Place: Code Conversion competition at "Tech Fest 22" (06-06-2022)',
    '• Participant: State-level seminar on "Python for Data Science" via Cognitive Class (29-04-2022)',
    '• Participant: State-level webinar on "Roles and Responsibilities of Database Administrator" via Cognitive Class (20-12-2021)'
  ];
  for (const b of achieveBullets) {
    doc.text(b, leftMargin, y, { width: contentWidth, align: 'left' });
    y += doc.heightOfString(b, { width: contentWidth }) + 1.5;
  }

  doc.end();
  console.log('Anish_Kumar_Resume.pdf successfully generated to match exact resume layout.');
}

generateResumePDF();
