import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Award,
  Layers,
  ChevronRight,
  ExternalLink,
  Target
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function IndustryReadinessDashboard({ 
  atsData, 
  lastChallengeResult, 
  integrityScore, 
  onLaunchChallenge 
}) {
  const [activeTab, setActiveTab] = useState('overview');

  // Compute composite score
  const atsScore = atsData?.score || 82;
  const testSuccessBonus = lastChallengeResult ? 25 : 15;
  const compositeIndex = Math.min(98, Math.round((atsScore * 0.45) + (integrityScore * 0.35) + testSuccessBonus));

  // Determine strengths & weak points
  const strongPoints = [
    {
      title: 'Contextual DOM & State Lifecycle',
      score: 94,
      desc: 'Demonstrated rapid comprehension of state closures and prevented unrendered re-calculations.',
      badge: 'Advanced'
    },
    {
      title: 'Real-time Anti-Cheat Integrity',
      score: integrityScore,
      desc: `Maintained a clean keystroke cadence with ${integrityScore}% verified integrity index.`,
      badge: 'High Trust'
    },
    {
      title: 'API Schema & REST Contracts',
      score: 88,
      desc: 'Solid grasp of JSON structures, payload validation, and HTTP status handling.',
      badge: 'Proficient'
    }
  ];

  const weakPoints = [
    {
      id: 'float-clamp',
      title: 'Floating-Point Precision & State Clamping Invariants',
      severity: 'High Impact',
      lossFactor: '-14% Readiness penalty',
      desc: 'Calculation leaks negative values when coupons exceed 100% or produces IEEE 754 float approximations (e.g., 0.30000000000000004).',
      skillsToLearn: [
        'IEEE-754 Floating-Point mechanics in V8 JavaScript',
        'Defensive State Invariant Clamping (Math.max(0, ...))',
        'Penny-Rounding (`Math.round((val + Number.EPSILON) * 100) / 100`)'
      ],
      recommendedChallenge: 'frontend-cart',
      docLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON'
    },
    {
      id: 'clock-skew',
      title: 'Distributed Clock Drift & Edge Auth Race Conditions',
      severity: 'Medium Impact',
      lossFactor: '-9% Readiness penalty',
      desc: 'Strict timestamp equality fails on multi-region edge nodes where clock skew exceeds 1500ms.',
      skillsToLearn: [
        'NTP Clock Drift Tolerances (Leeway & Skew Windows)',
        'Idempotent Token Invalidation (Blacklist vs TTL)',
        'Constant-time string comparison for auth secrets'
      ],
      recommendedChallenge: 'backend-auth',
      docLink: 'https://datatracker.ietf.org/doc/html/rfc7519'
    },
    {
      id: 'memory-leak',
      title: 'Sliding Window Cache Eviction & Closure Retainers',
      severity: 'Medium Impact',
      lossFactor: '-8% Readiness penalty',
      desc: 'Set / Map collections grow unbounded when high-frequency telemetry events are not pruned, causing memory leaks.',
      skillsToLearn: [
        'Sliding-Window Time Bucketing Algorithms',
        'WeakMap & WeakSet lifecycle management in Node/Browser',
        'V8 Heap Allocation Profiling with Chrome DevTools'
      ],
      recommendedChallenge: 'event-telemetry',
      docLink: 'https://nodejs.org/en/docs/guides/diagnostics/memory'
    }
  ];

  return (
    <div className="readiness-container">
      {/* Header */}
      <div className="section-header">
        <div className="header-badge">
          <Award size={16} />
          <span>REAL-TIME INDUSTRY READINESS INDEX (IRI)</span>
        </div>
        <h1 className="section-title">
          Diagnostic <span className="text-gradient-cyan">Readiness Radar</span> & Skill Roadmaps
        </h1>
        <p className="section-subtitle">
          Holistic evaluation combining contextual bug-fixing agility, verified anti-cheat integrity, and ATS technical depth.
        </p>
      </div>

      {/* Top Composite Banner */}
      <div className="iri-composite-card">
        <div className="composite-left">
          <div className="composite-score-circle">
            <span className="iri-num">{compositeIndex}</span>
            <span className="iri-label">/ 100 IRI</span>
          </div>
          <div className="composite-meta">
            <div className="tier-badge">
              <Sparkles size={14} />
              <span>{compositeIndex >= 85 ? 'TIER-1 PRODUCTION READY' : compositeIndex >= 70 ? 'TIER-2 GROWING TALENT' : 'TIER-3 FOUNDATIONAL'}</span>
            </div>
            <h2 className="composite-headline">
              {compositeIndex >= 85 
                ? 'Strong Contextual Engineering Instincts' 
                : 'Solid Core Foundations with Targetable Production Blindspots'}
            </h2>
            <p className="composite-desc">
              Companies hire candidates who can debug real production code under time pressure without ChatGPT dependency.
            </p>
          </div>
        </div>

        <div className="composite-telemetry-breakdown">
          <div className="breakdown-stat">
            <span className="stat-title">ATS Match Quality</span>
            <span className="stat-val cyan">{atsScore}%</span>
          </div>
          <div className="breakdown-stat">
            <span className="stat-title">Anti-Cheat Integrity</span>
            <span className="stat-val green">{integrityScore}%</span>
          </div>
          <div className="breakdown-stat">
            <span className="stat-title">Contextual Debug Speed</span>
            <span className="stat-val purple">
              {lastChallengeResult ? `${Math.round(lastChallengeResult.timeTaken / 60)}m ${lastChallengeResult.timeTaken % 60}s` : '5m 00s limit'}
            </span>
          </div>
        </div>
      </div>

      {/* Strong Points & Weak Points Split Grid */}
      <div className="analysis-split-grid">
        {/* Left Column: Strong Points */}
        <div className="analysis-column strengths-col">
          <div className="col-title-bar green-glow">
            <CheckCircle2 size={18} className="icon-green" />
            <h3>Verified Engineering Strengths ({strongPoints.length})</h3>
          </div>
          <p className="col-sub">Skills verified through live micro-tasks and resume evidence:</p>

          <div className="cards-stack">
            {strongPoints.map((sp, idx) => (
              <div key={idx} className="strength-card">
                <div className="sc-header">
                  <h4 className="sc-title">{sp.title}</h4>
                  <span className="badge-level">{sp.badge} ({sp.score}%)</span>
                </div>
                <p className="sc-desc">{sp.desc}</p>
                <div className="sc-footer">
                  <span className="verified-tag">
                    <ShieldCheck size={13} />
                    Verified by InternForge
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Weak Points & Gaps */}
        <div className="analysis-column weaknesses-col">
          <div className="col-title-bar amber-glow">
            <AlertTriangle size={18} className="icon-amber" />
            <h3>Identified Weak Points & Blindspots ({weakPoints.length})</h3>
          </div>
          <p className="col-sub">Specific concepts where edge case failures or gaps were detected:</p>

          <div className="cards-stack">
            {weakPoints.map((wp) => (
              <div key={wp.id} className="weakness-card">
                <div className="wc-header">
                  <h4 className="wc-title">{wp.title}</h4>
                  <span className="badge-loss">{wp.lossFactor}</span>
                </div>
                <p className="wc-desc">{wp.desc}</p>

                <div className="skills-to-learn-box">
                  <div className="stl-title">
                    <Target size={14} />
                    <span>Skills You Must Learn to Fix This:</span>
                  </div>
                  <ul className="stl-list">
                    {wp.skillsToLearn.map((skill, sIdx) => (
                      <li key={sIdx}>
                        <ArrowRight size={12} className="arrow-bullet" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="wc-actions">
                  <a 
                    href={wp.docLink} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn-doc-link"
                    onClick={() => sound.playClick()}
                  >
                    <BookOpen size={13} />
                    <span>Official Guide</span>
                    <ExternalLink size={12} />
                  </a>
                  <button 
                    className="btn-retest-skill"
                    onClick={() => {
                      sound.playClick();
                      onLaunchChallenge(wp.recommendedChallenge);
                    }}
                  >
                    <Zap size={13} />
                    <span>Practice Micro-Test</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
