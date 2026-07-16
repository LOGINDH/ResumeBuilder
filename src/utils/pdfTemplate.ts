import type { Resume } from '../navigation/types';

interface ParsedItem {
  left: string;
  rightHeader: string;
  rightBody: string;
}

// Parses multiline strings (like experience or education) into left-column (date/place) and right-column (header/body) data
const parseMultilineSection = (text?: string): ParsedItem[] => {
  if (!text) return [];
  
  // Split by double newlines to separate different entries
  const blocks = text.split(/\n\s*\n/);
  
  return blocks.map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return { left: '', rightHeader: '', rightBody: '' };
    
    // Matches year/date ranges: "2020-2023", "2018-Present", "2015 - Now", "2014"
    const dateRegex = /(\b\d{4}\s*-\s*(?:\d{4}|NOW|Present|Current)?\b)|(\b\d{4}\b)/i;
    
    let left = '';
    let rightHeader = '';
    let rightBody = '';
    
    let dateLineIndex = -1;
    let matchedDate = '';
    
    // Check the first 3 lines for a date range
    for (let i = 0; i < Math.min(lines.length, 3); i++) {
      const match = lines[i].match(dateRegex);
      if (match) {
        matchedDate = match[0];
        dateLineIndex = i;
        break;
      }
    }
    
    if (dateLineIndex === 0) {
      left = matchedDate;
      const remaining = lines[0].replace(matchedDate, '').trim();
      const cleanedRemaining = remaining.replace(/^[,\s\-|()]+|[,\s\-|()]+$/g, '').trim();
      
      if (cleanedRemaining.length > 2) {
        rightHeader = cleanedRemaining;
        rightBody = lines.slice(1).join('<br/>');
      } else {
        rightHeader = lines[1] || '';
        rightBody = lines.slice(2).join('<br/>');
      }
    } else if (dateLineIndex > 0) {
      left = matchedDate;
      const remainingLines = lines.filter((_, idx) => idx !== dateLineIndex);
      rightHeader = remainingLines[0] || '';
      rightBody = remainingLines.slice(1).join('<br/>');
    } else {
      rightHeader = lines[0];
      rightBody = lines.slice(1).join('<br/>');
    }
    
    // Clean up parenthetical empty pairs and separators
    rightHeader = rightHeader
      .replace(/\(\s*\)/g, '')
      .replace(/^[,\s\-|]+|[,\s\-|]+$/g, '')
      .trim();
      
    return { left, rightHeader, rightBody };
  });
};

const formatText = (text?: string) => {
  if (!text) return '';
  return text.replace(/\n/g, '<br/>');
};

export const generateResumeHtml = (resume: Resume): string => {
  const isShowcase = !resume.name && !resume.email && !resume.phone;

  const name = resume.name || (isShowcase ? 'YOUR NAME' : '');
  const role = resume.role || (isShowcase ? 'Job Title/ Target Role' : '');
  const email = resume.email || (isShowcase ? 'email@example.com' : '');
  const phone = resume.phone || (isShowcase ? 'Phone' : '');
  const location = resume.location || (isShowcase ? 'Location' : '');
  const linkedin = resume.linkedin;
  const portfolio = resume.portfolio;
  const summary = resume.summary || (isShowcase ? 'Short 2-3 lines summary' : '');
  const education = resume.education || (isShowcase ? 'School Name\nDuration\nDegree and achievements' : '');
  const experience = resume.experience || (isShowcase ? 'Company Name\nJob Title\nDuration\nAdd description of the job and achievements.' : '');
  const projects = resume.projects;
  const certifications = resume.certifications;
  const languages = resume.languages || (isShowcase ? 'English, Spanish' : '');
  const skills = resume.skills?.length ? resume.skills : (isShowcase ? ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4', 'Skill 5'] : []);
  const templateId = resume.templateId || 1;

  let bodyContent = '';

  if (templateId === 2) {
    // ==========================================
    // CLASSIC TEMPLATE
    // ==========================================
    const parsedExperience = parseMultilineSection(experience);
    const parsedEducation = parseMultilineSection(education);

    const contactParts = [
      phone ? `<span>Phone: ${phone}</span>` : '',
      location ? `<span>Loc: ${location}</span>` : '',
      email ? `<span>Email: ${email}</span>` : '',
      linkedin ? `<span>LinkedIn: ${linkedin}</span>` : '',
      portfolio ? `<span>Web: ${portfolio}</span>` : ''
    ].filter(Boolean);

    bodyContent = `
      <div class="classic-container">
        <div class="classic-header">
          <h1>${name}</h1>
          <div class="role">${role.toUpperCase()}</div>
          
          <div class="classic-contact-bar">
            ${contactParts.join(' &nbsp;&bull;&nbsp; ')}
          </div>
        </div>

        ${summary ? `
          <div class="classic-section">
            <div class="classic-title">About Me</div>
            <div class="body-text">${formatText(summary)}</div>
          </div>
        ` : ''}

        ${experience ? `
          <div class="classic-section">
            <div class="classic-title">Experience</div>
            ${parsedExperience.map(item => `
              <div class="two-col-row">
                <div class="left-col">
                  <div class="date-text">${item.left || 'Duration'}</div>
                </div>
                <div class="right-col">
                  <div class="header-bold">${item.rightHeader}</div>
                  <div class="body-text">${item.rightBody}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${education ? `
          <div class="classic-section">
            <div class="classic-title">Education</div>
            ${parsedEducation.map(item => `
              <div class="two-col-row">
                <div class="left-col">
                  <div class="date-text">${item.left || 'Duration'}</div>
                </div>
                <div class="right-col">
                  <div class="header-bold">${item.rightHeader}</div>
                  <div class="body-text">${item.rightBody}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${projects ? `
          <div class="classic-section">
            <div class="classic-title">Projects</div>
            <div class="body-text">${formatText(projects)}</div>
          </div>
        ` : ''}

        ${skills.length > 0 ? `
          <div class="classic-section">
            <div class="classic-title">Skills</div>
            <div class="classic-skills-grid">
              ${skills.map(s => `<div class="classic-skill-item">&bull; ${s}</div>`).join('')}
            </div>
          </div>
        ` : ''}

        ${certifications || languages ? `
          <div class="classic-section">
            <div class="classic-title">Certifications & Languages</div>
            <div class="two-col-row">
              <div class="left-col">
                ${languages ? `
                  <div class="header-bold">Languages</div>
                  <div class="body-text">${formatText(languages)}</div>
                ` : ''}
              </div>
              <div class="right-col">
                ${certifications ? `
                  <div class="header-bold">Certifications</div>
                  <div class="body-text">${formatText(certifications)}</div>
                ` : ''}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  } else if (templateId === 3) {
    // ==========================================
    // PROFESSIONAL TEMPLATE
    // ==========================================
    const parsedExperience = parseMultilineSection(experience);
    const parsedEducation = parseMultilineSection(education);

    bodyContent = `
      <div class="prof-container">
        <div class="prof-header-wrap">
          <div class="prof-header-left">
            <h1 class="prof-name">${name}</h1>
            <div class="prof-role">${role.toUpperCase()}</div>
          </div>
          <div class="prof-header-right">
            ${phone ? `<p>Phone: ${phone}</p>` : ''}
            ${email ? `<p>Email: ${email}</p>` : ''}
            ${location ? `<p>Loc: ${location}</p>` : ''}
            ${linkedin ? `<p>LinkedIn: ${linkedin}</p>` : ''}
            ${portfolio ? `<p>Web: ${portfolio}</p>` : ''}
          </div>
        </div>

        ${summary ? `
          <div class="prof-section">
            <div class="prof-title">More About Me</div>
            <div class="body-text">${formatText(summary)}</div>
          </div>
        ` : ''}

        ${experience ? `
          <div class="prof-section">
            <div class="prof-title">Experience</div>
            ${parsedExperience.map(item => `
              <div class="two-col-row">
                <div class="left-col">
                  <div class="date-text">${item.left || 'Duration'}</div>
                </div>
                <div class="right-col">
                  <div class="header-bold">${item.rightHeader}</div>
                  <div class="body-text">${item.rightBody}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${education ? `
          <div class="prof-section">
            <div class="prof-title">Education</div>
            ${parsedEducation.map(item => `
              <div class="two-col-row">
                <div class="left-col">
                  <div class="date-text">${item.left || 'Duration'}</div>
                </div>
                <div class="right-col">
                  <div class="header-bold">${item.rightHeader}</div>
                  <div class="body-text">${item.rightBody}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${projects ? `
          <div class="prof-section">
            <div class="prof-title">Projects</div>
            <div class="body-text">${formatText(projects)}</div>
          </div>
        ` : ''}

        ${skills.length > 0 ? `
          <div class="prof-section">
            <div class="prof-title">Skills & Expertise</div>
            <div class="prof-skills-line">
              ${skills.join(' &nbsp;&bull;&nbsp; ')}
            </div>
          </div>
        ` : ''}

        ${certifications || languages ? `
          <div class="prof-section">
            <div class="prof-title">Additional Information</div>
            <div class="two-col-row">
              <div class="left-col">
                ${languages ? `
                  <div class="header-bold">Languages</div>
                  <p class="body-text">${formatText(languages)}</p>
                ` : ''}
              </div>
              <div class="right-col">
                ${certifications ? `
                  <div class="header-bold">Certifications</div>
                  <p class="body-text">${formatText(certifications)}</p>
                ` : ''}
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  } else {
    // ==========================================
    // MODERN TEMPLATE (Default / 1)
    // ==========================================
    const parsedExperience = parseMultilineSection(experience);
    const parsedEducation = parseMultilineSection(education);
    
    // Split skills in half for SKILL vs TOOLS layout
    const mid = Math.ceil(skills.length / 2);
    const leftSkills = skills.slice(0, mid);
    const rightSkills = skills.slice(mid);

    bodyContent = `
      <div class="modern-container">
        <div class="modern-header-wrap">
          <div class="modern-header-left">
            <h1 class="modern-name">${name}</h1>
            <div class="modern-role">${role}</div>
          </div>
          <div class="modern-header-right">
            ${phone ? `<p>Phone: ${phone}</p>` : ''}
            ${email ? `<p>Email: ${email}</p>` : ''}
            ${location ? `<p>Loc: ${location}</p>` : ''}
            ${linkedin ? `<p>LinkedIn: ${linkedin}</p>` : ''}
            ${portfolio ? `<p>Web: ${portfolio}</p>` : ''}
          </div>
        </div>

        ${summary ? `
          <div class="modern-section">
            <div class="modern-title">Profile</div>
            <div class="body-text">${formatText(summary)}</div>
          </div>
        ` : ''}

        ${experience ? `
          <div class="modern-section">
            <div class="modern-title">Work Experience</div>
            ${parsedExperience.map(item => `
              <div class="two-col-row">
                <div class="left-col">
                  <div class="header-bold">${item.left || 'Duration'}</div>
                </div>
                <div class="right-col">
                  <div class="header-bold">${item.rightHeader}</div>
                  <div class="body-text">${item.rightBody}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${education ? `
          <div class="modern-section">
            <div class="modern-title">Education</div>
            ${parsedEducation.map(item => `
              <div class="two-col-row">
                <div class="left-col">
                  <div class="header-bold">${item.left || 'Duration'}</div>
                </div>
                <div class="right-col">
                  <div class="header-bold">${item.rightHeader}</div>
                  <div class="body-text">${item.rightBody}</div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${projects ? `
          <div class="modern-section">
            <div class="modern-title">Projects</div>
            <div class="body-text">${formatText(projects)}</div>
          </div>
        ` : ''}

        ${languages ? `
          <div class="modern-section">
            <div class="modern-title">Languages</div>
            <div class="body-text">${formatText(languages)}</div>
          </div>
        ` : ''}

        <div class="modern-section">
          <div class="two-col-row">
            <div class="left-col">
              <div class="modern-sub-title">Skill</div>
              <ul class="modern-skills-list">
                ${leftSkills.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
            <div class="right-col">
              <div class="modern-sub-title">Tools</div>
              <ul class="modern-skills-list">
                ${rightSkills.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>

        ${certifications ? `
          <div class="modern-section">
            <div class="modern-title">Interests (Optional)</div>
            <div class="body-text">${formatText(certifications)}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          color: #222222;
          margin: 0;
          padding: 0;
          line-height: 1.5;
          background-color: #ffffff;
          font-size: 12px;
        }
        h1, h2, h3, h4 {
          margin: 0;
          font-weight: 700;
          color: #111111;
        }
        p {
          margin: 0 0 6px 0;
        }
        ul {
          margin: 0;
          padding-left: 16px;
        }
        
        .body-text {
          font-size: 11.5px;
          color: #4b5563;
          line-height: 1.5;
          margin-top: 4px;
          margin-bottom: 8px;
          word-wrap: break-word;
        }

        .header-bold {
          font-size: 12px;
          font-weight: 700;
          color: #111827;
        }

        .date-text {
          font-size: 11.5px;
          font-weight: 700;
          color: #111827;
        }

        /* Two Column Layout Row */
        .two-col-row {
          display: flex;
          flex-direction: row;
          margin-bottom: 12px;
          width: 100%;
        }
        .left-col {
          width: 30%;
          padding-right: 15px;
          box-sizing: border-box;
        }
        .right-col {
          width: 70%;
          box-sizing: border-box;
        }

        /* ==========================================
           MODERN TEMPLATE STYLES
           ========================================== */
        .modern-container {
          padding: 30px;
        }
        .modern-header-wrap {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          border-bottom: 2px solid #111827;
          padding-bottom: 15px;
          margin-bottom: 20px;
        }
        .modern-header-left {
          width: 60%;
        }
        .modern-header-right {
          width: 40%;
          text-align: right;
          font-size: 11px;
          color: #4b5563;
          line-height: 1.4;
        }
        .modern-name {
          font-size: 26px;
          font-weight: 700;
          letter-spacing: 0.5px;
          line-height: 1.1;
        }
        .modern-role {
          font-size: 13px;
          color: #6b7280;
          margin-top: 5px;
          font-weight: 500;
        }
        .modern-section {
          margin-bottom: 16px;
        }
        .modern-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #111827;
          margin-bottom: 8px;
        }
        .modern-sub-title {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          color: #111827;
          margin-bottom: 6px;
        }
        .modern-skills-list {
          list-style-type: none;
          padding-left: 0;
        }
        .modern-skills-list li {
          font-size: 11.5px;
          color: #4b5563;
          margin-bottom: 4px;
        }

        /* ==========================================
           CLASSIC TEMPLATE STYLES
           ========================================== */
        .classic-container {
          border: 1px solid #d1d5db;
          padding: 40px;
          margin: 15px;
        }
        .classic-header {
          text-align: center;
          margin-bottom: 20px;
        }
        .classic-header h1 {
          font-size: 26px;
          font-weight: 700;
          color: #1a253c;
          letter-spacing: 0.5px;
        }
        .classic-header .role {
          font-size: 13px;
          color: #4b5563;
          font-weight: 600;
          letter-spacing: 0.8px;
          margin-top: 4px;
        }
        .classic-contact-bar {
          border-top: 1px solid #1a253c;
          border-bottom: 1px solid #1a253c;
          padding: 8px 0;
          margin-top: 12px;
          font-size: 10.5px;
          color: #4b5563;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        }
        .classic-section {
          margin-bottom: 16px;
        }
        .classic-title {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          color: #111827;
          border-bottom: 1px solid #d1d5db;
          padding-bottom: 3px;
          margin-bottom: 10px;
          letter-spacing: 0.5px;
        }
        .classic-skills-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .classic-skill-item {
          font-size: 11.5px;
          color: #374151;
        }

        /* ==========================================
           PROFESSIONAL TEMPLATE STYLES
           ========================================== */
        .prof-container {
          padding: 35px;
        }
        .prof-header-wrap {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .prof-header-left {
          width: 65%;
        }
        .prof-header-right {
          width: 35%;
          text-align: right;
          font-size: 11px;
          color: #4b5563;
          line-height: 1.4;
        }
        .prof-name {
          font-family: Georgia, serif;
          font-size: 28px;
          font-weight: 700;
          line-height: 1.1;
          color: #000000;
        }
        .prof-role {
          font-family: Georgia, serif;
          font-size: 11.5px;
          color: #4b5563;
          letter-spacing: 1px;
          margin-top: 6px;
          font-weight: 600;
        }
        .prof-section {
          margin-bottom: 18px;
        }
        .prof-title {
          font-size: 12.5px;
          font-weight: 700;
          text-transform: uppercase;
          color: #000000;
          border-top: 1px solid #000000;
          position: relative;
          padding-top: 6px;
          margin-bottom: 10px;
        }
        .prof-title::before {
          content: '';
          position: absolute;
          top: -2px;
          left: 0;
          width: 100px;
          height: 4px;
          background-color: #000000;
        }
        .prof-skills-line {
          font-size: 11.5px;
          color: #374151;
          margin-top: 5px;
        }
      </style>
    </head>
    <body>
      ${bodyContent}
    </body>
    </html>
  `;
};
