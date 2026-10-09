import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  ArrowRight, 
  Cpu, 
  Briefcase,
  FileCheck2,
  RefreshCw
} from 'lucide-react';
import { SAMPLE_RESUMES } from '../data/mockData';
import { analyzeResume } from '../utils/atsEngine';
import { sound } from '../utils/audio';

export default function AtsScanner({ onNavigateToInternships, onLaunchChallenge, onScanUpdate }) {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUMES.frontend_pro.rawText);
  const [selectedSample, setSelectedSample] = useState('frontend_pro');
  const [analysisResult, setAnalysisResult] = useState(() => analyzeResume(SAMPLE_RESUMES.frontend_pro.rawText));
  const [isScanning, setIsScanning] = useState(false);

  const handleSampleClick = (key) => {
    sound.playClick();
    setSelectedSample(key);
    const text = SAMPLE_RESUMES[key].rawText;
    setResumeText(text);
    triggerScan(text);
  };

  const triggerScan = (textToScan) => {
    setIsScanning(true);
    sound.playClick();
    setTimeout(() => {
      const res = analyzeResume(textToScan || resumeText);
      setAnalysisResult(res);
      setIsScanning(false);
      sound.playSuccess();
      if (onScanUpdate) {
        onScanUpdate(res);
      }
    }, 450);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    sound.playClick();
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setResumeText(text);
      setSelectedSample('custom');
      triggerScan(text);
    };
    reader.readAsText(file);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'var(--neon-green)';
    if (score >= 65) return 'var(--neon-cyan)';
    if (score >= 50) return 'var(--neon-amber)';
    return 'var(--neon-red)';
  };

  return (
    <div className="ats-container">
      {/* Header */}
      <div className="section-header">
        <div className="header-badge">
          <FileCheck2 size={16} />
          <span>REAL-TIME ATS COMPATIBILITY ENGINE</span>
        </div>
        <h1 className="section-title">
          Contextual <span className="text-gradient-cyan">Resume Scanner</span> & Department Match
        </h1>
        <p className="section-subtitle">
          Scans for high-impact technical keywords, quantified metrics, action verbs, and maps your profile directly to active internship roles.
        </p>
      </div>

      {/* Preset Selector & Upload Bar */}
      <div className="sample-selector-bar">
        <div className="preset-label">Quick Sample Candidate:</div>
        <div className="preset-buttons">
          <button 
            className={`preset-btn ${selectedSample === 'frontend_pro' ? 'active' : ''}`}
            onClick={() => handleSampleClick('frontend_pro')}
          >
            Frontend Specialist (Aman)
          </button>
          <button 
            className={`preset-btn ${selectedSample === 'backend_pro' ? 'active' : ''}`}
            onClick={() => handleSampleClick('backend_pro')}
          >
            Backend & Systems (Priya)
          </button>
          <button 
            className={`preset-btn ${selectedSample === 'generic_fresher' ? 'active' : ''}`}
            onClick={() => handleSampleClick('generic_fresher')}
          >
            Generic Fresher (Rohan)
          </button>
        </div>

        <div className="upload-btn-wrapper">
          <input 
            type="file" 
            id="resume-file-input" 
            accept=".txt,.md,.json" 
            onChange={handleFileUpload} 
            style={{ display: 'none' }}
          />
          <label htmlFor="resume-file-input" className="btn-file-upload">
            <Upload size={16} />
            <span>Upload Resume (.txt/.md)</span>
          </label>
        </div>
      </div>

      {/* Main Grid: Input on Left, Live ATS Scorecard on Right */}
      <div className="ats-main-grid">
        {/* Left: Resume Text Viewer / Editor */}
        <div className="ats-editor-card">
          <div className="card-top-header">
            <div className="header-left">
              <FileText size={18} />
              <span>Resume Content (Editable)</span>
            </div>
            <button 
              className="btn-rescan" 
              onClick={() => triggerScan(resumeText)}
              disabled={isScanning}
            >
              <RefreshCw size={14} className={isScanning ? 'spin-icon' : ''} />
              <span>{isScanning ? 'Scanning...' : 'Re-Analyze'}</span>
            </button>
          </div>
          <textarea
            className="resume-textarea"
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your raw resume text here..."
            rows={18}
          />
        </div>

        {/* Right: Live ATS Scorecard */}
        <div className="ats-scorecard-card">
          <div className="scorecard-top-row">
            {/* Circular Gauge */}
            <div className="circular-score-box">
              <div 
                className="score-circle" 
                style={{ borderColor: getScoreColor(analysisResult.score) }}
              >
                <span className="score-number" style={{ color: getScoreColor(analysisResult.score) }}>
                  {analysisResult.score}
                </span>
                <span className="score-max">/ 100</span>
              </div>
              <div className="score-summary-text">
                <span className="score-label">ATS Compatibility Index</span>
                <span className="score-status" style={{ color: getScoreColor(analysisResult.score) }}>
                  {analysisResult.score >= 85 ? 'Highly Competitive' : analysisResult.score >= 65 ? 'Moderate Match' : 'High Risk of Rejection'}
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="quick-metrics-row">
              <div className="metric-cell">
                <span className="cell-num">{analysisResult.skillsFound.length}</span>
                <span className="cell-title">Skills Verified</span>
              </div>
              <div className="metric-cell">
                <span className="cell-num">{analysisResult.actionVerbsCount}</span>
                <span className="cell-title">Action Verbs</span>
              </div>
              <div className="metric-cell">
                <span className="cell-num">{analysisResult.quantifiedMetricsCount}</span>
                <span className="cell-title">Impact Metrics</span>
              </div>
            </div>
          </div>

          {/* Department Match Percentages */}
          <div className="dept-match-section">
            <h4 className="sub-title">Department Readiness Alignment</h4>
            <div className="dept-bars-list">
              {Object.entries(analysisResult.departmentMatch).map(([dept, score]) => (
                <div key={dept} className="dept-bar-item">
                  <div className="bar-labels">
                    <span className="bar-dept-name">{dept.toUpperCase()}</span>
                    <span className="bar-pct">{score}%</span>
                  </div>
                  <div className="progress-track">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${score}%`,
                        backgroundColor: score >= 80 ? 'var(--neon-green)' : score >= 60 ? 'var(--neon-cyan)' : 'var(--neon-amber)'
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Skills Tags */}
          <div className="skills-tags-section">
            <h4 className="sub-title">Detected Technical Keywords ({analysisResult.skillsFound.length})</h4>
            <div className="skills-badge-wrap">
              {analysisResult.skillsFound.map((skill, sIdx) => (
                <span key={sIdx} className="skill-chip">
                  <CheckCircle2 size={12} />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing Keywords & Recommendations */}
          <div className="recommendations-box">
            <h4 className="sub-title text-amber">
              <AlertCircle size={15} />
              <span>Recommended Keyword Injections</span>
            </h4>
            <div className="missing-chips-wrap">
              {analysisResult.missingKeywords.map((kw, kIdx) => (
                <span key={kIdx} className="missing-chip">
                  + {kw}
                </span>
              ))}
            </div>

            <div className="critique-list">
              {analysisResult.recommendations.map((rec, rIdx) => (
                <div key={rIdx} className="critique-item">
                  <Sparkles size={14} className="spark-icon" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Footer */}
          <div className="scorecard-actions">
            <button 
              className="btn-apply-matched"
              onClick={() => onNavigateToInternships(analysisResult.topDept)}
            >
              <Briefcase size={16} />
              <span>Explore {analysisResult.topDept?.toUpperCase()} Internships</span>
            </button>
            <button 
              className="btn-test-arena"
              onClick={() => onLaunchChallenge('frontend-cart')}
            >
              <span>Verify in 5-Min Arena</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
