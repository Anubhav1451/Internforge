// High-Precision ATS Resume Analyzer Engine

const SKILL_DICTIONARY = {
  frontend: [
    'react', 'next.js', 'vue', 'angular', 'javascript', 'typescript', 'html5', 'css3',
    'tailwind', 'redux', 'framer motion', 'vite', 'webpack', 'dom', 'web vitals', 'canvas', 'three.js'
  ],
  backend: [
    'node.js', 'express', 'python', 'django', 'fastapi', 'go', 'golang', 'sql', 'postgresql',
    'mongodb', 'redis', 'kafka', 'rest', 'graphql', 'grpc', 'idempotency', 'microservices', 'jwt'
  ],
  aiml: [
    'python', 'pytorch', 'tensorflow', 'machine learning', 'deep learning', 'nlp', 'llm',
    'rag', 'langchain', 'huggingface', 'vector', 'embeddings', 'pandas', 'numpy', 'scikit-learn'
  ],
  devops: [
    'docker', 'kubernetes', 'aws', 'ci/cd', 'github actions', 'terraform', 'linux', 'bash',
    'nginx', 'prometheus', 'grafana', 'helm', 'cloud', 'gcp', 'azure'
  ],
  cyber: [
    'cybersecurity', 'owasp', 'penetration testing', 'jwt', 'auth', 'oauth', 'cryptography',
    'firewall', 'burp suite', 'siem', 'vulnerability', 'wireshark', 'network security'
  ],
  data: [
    'sql', 'spark', 'hadoop', 'etl', 'pandas', 'snowflake', 'bigquery', 'data pipeline',
    'airflow', 'dbt', 'kafka', 'data warehouse', 'tableau', 'powerbi'
  ],
  uiux: [
    'figma', 'ui/ux', 'wireframe', 'prototyping', 'design system', 'design tokens',
    'accessibility', 'wcag', 'user research', 'information architecture'
  ]
};

const ACTION_VERBS = [
  'engineered', 'implemented', 'spearheaded', 'optimized', 'reduced', 'architected',
  'built', 'developed', 'designed', 'orchestrated', 'streamlined', 'deployed', 'scaled', 'debugged'
];

export function analyzeResume(text) {
  if (!text || text.trim().length === 0) {
    return {
      score: 0,
      skillsFound: [],
      missingKeywords: ['React', 'Node.js', 'Docker', 'TypeScript'],
      actionVerbsCount: 0,
      quantifiedMetricsCount: 0,
      departmentMatch: {},
      strengths: [],
      weaknesses: ['Empty resume content provided'],
      recommendations: ['Paste or upload a valid resume to begin analysis.']
    };
  }

  const lower = text.toLowerCase();

  // 1. Scan Skills by Department
  const detectedSkills = [];
  const deptScores = {};

  Object.entries(SKILL_DICTIONARY).forEach(([dept, skills]) => {
    let matches = 0;
    skills.forEach(skill => {
      // Word boundary regex
      const regex = new RegExp(`\\b${skill.replace('.', '\\.')}\\b`, 'i');
      if (regex.test(lower)) {
        if (!detectedSkills.includes(skill)) {
          detectedSkills.push(skill);
        }
        matches++;
      }
    });

    const score = Math.min(98, Math.round((matches / (skills.length * 0.45)) * 100));
    deptScores[dept] = Math.max(12, score);
  });

  // 2. Action Verbs
  let verbMatches = 0;
  ACTION_VERBS.forEach(verb => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (regex.test(lower)) verbMatches++;
  });

  // 3. Quantified Metrics (e.g. 42%, 2,500, 10x, 95%+)
  const metricMatches = (text.match(/(\d+[\d,.]*\s*(%|\+|x|k|ms|req\/sec|users|sec))/gi) || []).length;

  // 4. Contact & Section Completeness
  const hasEmail = /[\w.-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /(\+?\d[\d -]{8,}\d)/.test(text);
  const hasEducation = /(education|b\.tech|btech|degree|cgpa|university|college)/i.test(text);
  const hasProjects = /(projects|project experience|built|github)/i.test(text);

  // 5. Overall ATS Score Calculation
  let baseScore = 20;
  if (hasEmail) baseScore += 5;
  if (hasPhone) baseScore += 5;
  if (hasEducation) baseScore += 10;
  if (hasProjects) baseScore += 10;
  
  // Skill count weight (up to 25 pts)
  baseScore += Math.min(25, detectedSkills.length * 3);

  // Action verbs weight (up to 15 pts)
  baseScore += Math.min(15, verbMatches * 3);

  // Metrics weight (up to 10 pts)
  baseScore += Math.min(10, metricMatches * 3);

  const finalScore = Math.min(98, Math.max(25, baseScore));

  // Strengths & Weaknesses
  const strengths = [];
  const weaknesses = [];
  const recommendations = [];

  if (metricMatches >= 2) {
    strengths.push(`High Impact: Found ${metricMatches} quantified engineering metrics (e.g., latency, %, throughput).`);
  } else {
    weaknesses.push('Low Quantifiable Impact: Projects lack concrete numbers and benchmarks.');
    recommendations.push('Add metrics: e.g. "Reduced API latency by 35%" or "Handled 10k concurrent requests".');
  }

  if (verbMatches >= 3) {
    strengths.push(`Strong Action Voice: Detected ${verbMatches} senior engineering action verbs.`);
  } else {
    weaknesses.push('Passive Language: Uses generic phrasing like "Responsible for" or "Made in".');
    recommendations.push('Replace passive statements with strong verbs like "Architected", "Engineered", "Orchestrated".');
  }

  if (detectedSkills.length >= 8) {
    strengths.push(`Rich Tech Stack: ${detectedSkills.length} industry-standard technologies verified.`);
  } else {
    weaknesses.push('Narrow Keyword Footprint: Missing key enterprise keywords.');
    recommendations.push('Include modern frameworks, testing libraries (Jest/Cypress), and containerization (Docker).');
  }

  // Missing high-value keywords based on top dept
  const topDept = Object.entries(deptScores).sort((a, b) => b[1] - a[1])[0][0];
  const missingKeywords = SKILL_DICTIONARY[topDept]
    .filter(s => !detectedSkills.includes(s))
    .slice(0, 5);

  return {
    score: finalScore,
    skillsFound: detectedSkills,
    missingKeywords,
    topDept,
    actionVerbsCount: verbMatches,
    quantifiedMetricsCount: metricMatches,
    departmentMatch: deptScores,
    strengths,
    weaknesses,
    recommendations
  };
}
