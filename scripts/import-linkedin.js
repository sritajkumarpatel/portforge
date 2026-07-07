/**
 * LinkedIn Profile Importer
 *
 * Paste your LinkedIn profile text (from "More" → "Save to PDF" or copy-paste)
 * and this script generates all the JSON files for your portfolio.
 *
 * Usage:
 *   node scripts/import-linkedin.js < profile.txt
 *   # or: cat linkedin.txt | node scripts/import-linkedin.js
 *
 * Output:
 *   Generates JSON files in the current directory, ready to copy into template/src/data/
 */

import fs from 'fs';
import path from 'path';
import { createInterface } from 'readline';

const OUTPUT_DIR = process.argv[2] || '.';

function parseLinkedIn(text) {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const data = {
    name: '',
    headline: '',
    summary: '',
    skills: [],
    experience: [],
    certifications: [],
    education: [],
    awards: [],
    languages: [],
  };
  let section = null;
  let currentCompany = null;
  let currentRole = null;

  for (const line of lines) {
    const lower = line.toLowerCase();

    if (lower.startsWith('top skills')) {
      section = 'skills';
      continue;
    }
    if (lower.startsWith('certifications')) {
      section = 'certifications';
      continue;
    }
    if (lower.startsWith('honors') || lower.startsWith('awards')) {
      section = 'awards';
      continue;
    }
    if (lower.startsWith('languages')) {
      section = 'languages';
      continue;
    }
    if (lower.startsWith('education')) {
      section = 'education';
      continue;
    }
    if (lower.startsWith('experience') && !lower.includes('summary')) {
      section = 'experience';
      continue;
    }
    if (lower.startsWith('summary')) {
      section = 'summary';
      continue;
    }

    if (!section) {
      if (!data.name && line.length < 60 && !line.includes('@') && !line.includes('http')) {
        data.name = line;
      } else if (line.length < 100 && line.includes('|')) {
        data.headline = line;
      }
      continue;
    }

    switch (section) {
      case 'summary':
        data.summary += (data.summary ? ' ' : '') + line;
        break;

      case 'skills':
        if (!line.toLowerCase().includes('continuous') && line.length > 2) {
          data.skills.push(line.replace(/^[•\-–—]\s*/, ''));
        }
        break;

      case 'experience': {
        if (
          /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(line) &&
          line.includes('-')
        ) {
          if (currentRole) currentCompany.roles.push(currentRole);
          const parts = line.split('-').map((s) => s.trim());
          currentRole = { title: '', period: line.replace(/^[•\-–—]\s*/, ''), highlights: [] };
        } else if (line.toLowerCase().startsWith('•') || line.toLowerCase().startsWith('-')) {
          if (currentRole) currentRole.highlights.push(line.replace(/^[•\-–—]\s*/, ''));
        } else if (currentRole && currentRole.title === '') {
          currentRole.title = line;
        } else if (line.length < 60 && !line.toLowerCase().includes('page') && !line.match(/^\d/)) {
          if (currentCompany) {
            if (currentRole) currentCompany.roles.push(currentRole);
            data.experience.push(currentCompany);
          }
          currentCompany = { company: line, roles: [], highlights: [], location: '' };
          currentRole = null;
        }
        break;
      }

      case 'certifications': {
        if (line.includes('Issued') || line.includes('Issued')) {
          if (data.certifications.length > 0) {
            data.certifications[data.certifications.length - 1].date = line;
          }
        } else if (line.length > 5 && line.length < 120 && !line.includes('Credential')) {
          data.certifications.push({ name: line, issuer: '', date: '' });
        }
        break;
      }

      case 'education': {
        if (line.length > 5 && line.length < 100 && !line.match(/^\d/) && !line.includes('Grade')) {
          data.education.push({ degree: line, institution: '', period: '' });
        }
        break;
      }

      case 'awards':
        if (line.length > 5 && line.length < 80) {
          data.awards.push({
            title: line.replace(/^[•\-–—]\s*/, ''),
            year: 0,
            company: '',
            description: '',
          });
        }
        break;

      case 'languages':
        try {
          const [lang, prof] = line.split('(').map((s) => s.trim().replace(')', ''));
          data.languages.push({ language: lang || line, proficiency: prof || '' });
        } catch {
          data.languages.push({ language: line, proficiency: '' });
        }
        break;
    }
  }

  if (currentCompany) {
    if (currentRole) currentCompany.roles.push(currentRole);
    data.experience.push(currentCompany);
  }

  return data;
}

function generateConfig(data) {
  return {
    personal: {
      name: data.name || 'Your Name',
      email: 'your@email.com',
      github: 'your-github',
      linkedin: 'your-linkedin',
      medium: 'your-medium',
      languages: data.languages.map((l) => `${l.language} (${l.proficiency})`),
    },
    bio: {
      headline: data.headline || 'Your Headline',
      subtitle: data.summary.split('.').slice(0, 2).join('.') + '.' || 'Your bio here.',
    },
    titles: [
      data.headline || 'Your Title',
      ...data.skills.slice(0, 4).map((s) => s.replace(/\(.*\)/, '').trim()),
    ],
    sections: [
      { id: 'about', label: 'About', navLabel: 'About', enabled: true },
      { id: 'experience', label: 'Experience', navLabel: 'Experience', enabled: true },
      { id: 'tech', label: 'What I Work With', navLabel: 'Skills', enabled: true },
      { id: 'articles', label: 'Thoughts & Ideas', navLabel: 'Thoughts', enabled: true },
      { id: 'projects', label: 'Projects', navLabel: 'Projects', enabled: true },
      { id: 'awards', label: 'Awards', navLabel: 'Awards', enabled: data.awards.length > 0 },
      { id: 'certifications', label: 'Certifications', navLabel: 'Certs', enabled: true },
      {
        id: 'education',
        label: 'Education',
        navLabel: 'Education',
        enabled: data.education.length > 0,
      },
    ],
    theme: { primary: 'slate', accent: 'amber', mode: 'dark', presets: {} },
  };
}

function generateAboutMe(data) {
  const areas = data.skills.filter((s) => s.length < 40).slice(0, 8);
  const chunk = (arr, n) => {
    const r = [];
    for (let i = 0; i < arr.length; i += n) r.push(arr.slice(i, i + n));
    return r;
  };
  const groups = chunk(areas, 2);
  const colors = ['#8b5cf6', '#10b981', '#3b82f6', '#f59e0b'];
  const icons = ['Brain', 'Shield', 'Terminal', 'Users'];

  return {
    shortBio: data.headline || 'Professional with expertise in building quality systems.',
    fullBio: data.summary || 'Your bio goes here.',
    whatIdo: groups.slice(0, 4).map((group, i) => ({
      title: group[0] || 'Area ' + (i + 1),
      icon: icons[i],
      color: colors[i],
      capabilities: group,
    })),
    philosophy: "Quality is not a phase — it's a discipline.",
  };
}

function generateExperience(data) {
  return data.experience.slice(0, 4).map((company) => ({
    company: company.company,
    roles: company.roles.map((r) => ({ title: r.title, period: r.period })),
    duration:
      company.roles.length > 0
        ? (() => {
            const periods = company.roles.map((r) => r.period);
            const starts = periods.map((p) => p.split('-')[0]?.trim()).filter(Boolean);
            const ends = periods.map((p) => p.split('-')[1]?.trim()).filter(Boolean);
            return `${starts[0] || ''} - ${ends[ends.length - 1] || 'Present'}`;
          })()
        : '',
    current: company.roles.some((r) => r.period?.toLowerCase().includes('present')),
    location: company.location || '',
    highlights: company.highlights.slice(0, 5),
  }));
}

function generateCertifications(data) {
  return data.certifications.map((cert) => ({
    name: cert.name,
    issuer: cert.issuer || 'Unknown',
    date: cert.date || '',
  }));
}

function generateEducation(data) {
  return data.education.map((edu) => ({
    degree: edu.degree,
    institution: edu.institution || '',
    period: edu.period || '',
    focus: [],
  }));
}

function generateAwards(data) {
  return data.awards.map((award) => ({
    title: award.title,
    year: award.year || 0,
    company: award.company || '',
    description: award.description || '',
  }));
}

// Main
async function main() {
  const rl = createInterface({ input: process.stdin });
  const lines = [];
  for await (const line of rl) lines.push(line);
  const text = lines.join('\n');

  console.error('Parsing LinkedIn profile...');
  const data = parseLinkedIn(text);

  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'src', 'config.json'),
    JSON.stringify(generateConfig(data), null, 2),
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'src', 'data', 'aboutMe.json'),
    JSON.stringify(generateAboutMe(data), null, 2),
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'src', 'data', 'experience.json'),
    JSON.stringify(generateExperience(data), null, 2),
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'src', 'data', 'certifications.json'),
    JSON.stringify(generateCertifications(data), null, 2),
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'src', 'data', 'education.json'),
    JSON.stringify(generateEducation(data), null, 2),
  );
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'src', 'data', 'awards.json'),
    JSON.stringify(generateAwards(data), null, 2),
  );

  console.error(
    `Generated JSON files in ${OUTPUT_DIR}/src/data/ and ${OUTPUT_DIR}/src/config.json`,
  );
}

main().catch(console.error);
