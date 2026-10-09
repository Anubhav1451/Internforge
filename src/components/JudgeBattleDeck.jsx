import React, { useState } from 'react';
import { 
  Award, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  Cpu, 
  Sparkles, 
  Flame, 
  Crosshair, 
  Layers, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Terminal,
  AlertTriangle
} from 'lucide-react';
import { JUDGE_BATTLE_CARDS } from '../data/mockData';
import { sound } from '../utils/audio';

export default function JudgeBattleDeck({ onLaunchChallenge, triggerMockTabSwitch, triggerMockPaste }) {
  const [selectedCardId, setSelectedCardId] = useState(JUDGE_BATTLE_CARDS[0].id);
  const [simulatedLog, setSimulatedLog] = useState([]);

  const activeCard = JUDGE_BATTLE_CARDS.find(c => c.id === selectedCardId) || JUDGE_BATTLE_CARDS[0];

  const handleSelect = (id) => {
    sound.playClick();
    setSelectedCardId(id);
  };

  const handleSimulate = (type) => {
    sound.playClick();
    const timestamp = new Date().toLocaleTimeString();
    if (type === 'flight-dynamics') {
      sound.playWarning();
      setSimulatedLog(prev => [
        `[${timestamp}] ⚠️ FLIGHT ANOMALY: Typing speed surged from 180ms to 8ms per char (Paste Burst Detected). Candidate Integrity flagged -12%.`,
        ...prev.slice(0, 4)
      ]);
      triggerMockPaste();
    } else if (type === 'decay-curve') {
      sound.playTick();
      setSimulatedLog(prev => [
        `[${timestamp}] 🟡 GRACE DECAY: Mouse flickered outside boundary for 1.8s. Graceful yellow warning dispatched. Zero disqualification.`,
        ...prev.slice(0, 4)
      ]);
      triggerMockTabSwitch();
    } else if (type === 'bug-engine') {
      onLaunchChallenge('frontend-cart');
    } else if (type === 'corporate-masterstroke') {
      sound.playSuccess();
      setSimulatedLog(prev => [
        `[${timestamp}] 🎯 MASTERSTROKE: "Google/MS engineers use Copilot daily. Solving production bugs in 3 minutes proves real engineering context."`,
        ...prev.slice(0, 4)
      ]);
    }
  };

  return (
    <div className="battle-deck-container">
      {/* Hero Banner */}
      <div className="deck-hero">
        <div className="deck-hero-badge">
          <Award size={16} />
          <span>HACKATHON WINNER ARSENAL & JUDGE BATTLE DECK</span>
        </div>
        <h1 className="deck-title">
          The <span className="text-gradient-cyan">Unbeatable Defense</span>: Winning Over Hackathon Judges
        </h1>
        <p className="deck-subtitle">
          Every critical counter-question judges will throw at you regarding AI cheating, LeetCode vs Micro-Tasks, and false positives — answered with live technical telemetry.
        </p>
      </div>

      {/* Main Layout: Cards on Left, Active Deep-Dive on Right */}
      <div className="deck-grid">
        {/* Left Column: Question Selectors */}
        <div className="deck-nav-col">
          <div className="col-header">
            <Crosshair size={18} />
            <span>Select Judge Counter-Question</span>
          </div>

          <div className="question-cards-list">
            {JUDGE_BATTLE_CARDS.map((card) => {
              const isSelected = card.id === selectedCardId;
              return (
                <div
                  key={card.id}
                  onClick={() => handleSelect(card.id)}
                  className={`judge-selector-card ${isSelected ? 'selected' : ''}`}
                >
                  <div className="card-top-meta">
                    <span className="card-num">QUESTION {card.number}</span>
                    <span className="card-tag">{card.badge}</span>
                  </div>
                  <h3 className="card-question-title">{card.question}</h3>
                  <div className="card-bottom-row">
                    <span className="metric-preview">{card.proofMetric}</span>
                    <ChevronRight size={16} className="arrow-icon" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Live Telemetry Log */}
          <div className="simulation-log-box">
            <div className="log-header">
              <Terminal size={15} />
              <span>LIVE DEFENSE SIMULATION FEED</span>
            </div>
            <div className="log-content">
              {simulatedLog.length === 0 ? (
                <span className="log-empty">Click "Run Live Proof Simulation" to verify anti-cheat mechanics live.</span>
              ) : (
                simulatedLog.map((log, idx) => (
                  <div key={idx} className="log-line">{log}</div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: In-Depth Battle Response */}
        <div className="deck-detail-col">
          <div className="detail-card-panel">
            <div className="detail-header">
              <div className="detail-badge-row">
                <span className="detail-q-pill">Q{activeCard.number}</span>
                <span className="detail-category">{activeCard.badge}</span>
              </div>
              <h2 className="detail-question">{activeCard.question}</h2>
            </div>

            <div className="pitch-answer-box">
              <div className="pitch-answer-title">
                <Flame size={18} className="flame-icon" />
                <span>PITCH RESPONSE (Judges ko ye bolna hai):</span>
              </div>
              <div className="pitch-answer-text">
                {activeCard.answer.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Technical Proof Breakdown */}
            <div className="proof-container">
              <div className="proof-header">
                <ShieldAlert size={18} />
                <span>Under The Hood Technical Architecture</span>
              </div>

              {activeCard.id === 'counter-1' && (
                <div className="comparison-table-wrapper">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th>Platform</th>
                        <th>Question Type</th>
                        <th>ChatGPT-4o Vulnerability</th>
                        <th>Recruiter Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="row-legacy">
                        <td>HackerRank / Unstop</td>
                        <td>LeetCode DSA (Reverse List, 2Sum)</td>
                        <td><span className="tag-red">100% Solvable in 1s</span></td>
                        <td>Low (Tests memorized syntax)</td>
                      </tr>
                      <tr className="row-forge">
                        <td>InternForge</td>
                        <td>Contextual Production Bug Fixes</td>
                        <td><span className="tag-green">AI Prompting takes &gt; 5 min</span></td>
                        <td>High (Tests real production debugging)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {activeCard.id === 'counter-2' && (
                <div className="telemetry-demo-card">
                  <div className="telemetry-bar-row">
                    <span className="tel-label">Normal Human Typing Cadence:</span>
                    <span className="tel-val val-green">150ms - 240ms interval variance</span>
                  </div>
                  <div className="telemetry-bar-row">
                    <span className="tel-label">Phone Copy-Paste / Copilot Injection:</span>
                    <span className="tel-val val-red">&lt; 15ms instantaneous burst mutation</span>
                  </div>
                  <div className="flight-explanation">
                    Keystroke Flight Dynamics records the delta timestamp between keydown and keyup events. Even with external camera or phone transcription, abnormal latency distribution triggers an automated Integrity Decay without interrupting the test.
                  </div>
                </div>
              )}

              {activeCard.id === 'counter-3' && (
                <div className="decay-curve-box">
                  <div className="decay-steps">
                    <div className="decay-step">
                      <div className="step-num">Tier 1</div>
                      <div className="step-desc"><strong>1-2 Mouse Excursions</strong>: Dispatches gentle yellow warning toast. Zero point deduction.</div>
                    </div>
                    <div className="decay-step">
                      <div className="step-num">Tier 2</div>
                      <div className="step-desc"><strong>&gt; 5s Focus Loss</strong>: Triggers Strike 1/3 and gentle -5% confidence decay.</div>
                    </div>
                    <div className="decay-step">
                      <div className="step-num">Tier 3</div>
                      <div className="step-desc"><strong>Focus Loss + Bulk Code Paste</strong>: Hard flag. Proves ChatGPT tab hop.</div>
                    </div>
                  </div>
                </div>
              )}

              {activeCard.id === 'counter-4' && (
                <div className="corporate-box">
                  <div className="quote-callout">
                    "We don't punish developers for being fast; we test if they can comprehend messy production state under 5 minutes. Real engineering is contextual debugging, not memorizing Dijkstra's algorithm on a whiteboard."
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Simulation CTA */}
            <div className="detail-action-footer">
              <button
                className="btn-proof-sim"
                onClick={() => handleSimulate(activeCard.testTriggerType)}
              >
                <Sparkles size={16} />
                <span>Test & Prove This Live In-App</span>
              </button>

              <button
                className="btn-launch-arena"
                onClick={() => onLaunchChallenge('frontend-cart')}
              >
                <span>Open 5-Min Challenge Arena</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
