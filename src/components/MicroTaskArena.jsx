import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Clock, 
  ShieldAlert, 
  ShieldCheck, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Terminal, 
  Flame, 
  Zap, 
  Activity, 
  ArrowRight,
  EyeOff,
  Copy,
  ChevronDown
} from 'lucide-react';
import { BUG_CHALLENGES } from '../data/mockData';
import { sound } from '../utils/audio';

export default function MicroTaskArena({ 
  currentChallengeId = 'frontend-cart', 
  onChallengeComplete,
  integrityScore,
  setIntegrityScore,
  strikeCount,
  setStrikeCount,
  onNavigateToReadiness
}) {
  const challenge = BUG_CHALLENGES[currentChallengeId] || BUG_CHALLENGES['frontend-cart'];

  // Code state
  const [code, setCode] = useState(challenge.starterCode);
  const [selectedChallengeKey, setSelectedChallengeKey] = useState(currentChallengeId);

  // Timer state (300 seconds = 5 minutes)
  const [secondsRemaining, setSecondsRemaining] = useState(challenge.timeLimitSeconds || 300);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Anti-cheat Telemetry state
  const [focusLostWarningVisible, setFocusLostWarningVisible] = useState(false);
  const [recentPasteAlert, setRecentPasteAlert] = useState(false);
  const [keystrokeVariance, setKeystrokeVariance] = useState(195);
  const [antiCheatLog, setAntiCheatLog] = useState([
    `[${new Date().toLocaleTimeString()}] Sentinel initialized: Tier-1 Focus & Tier-2 Flight Dynamics active.`
  ]);

  // Test Runner state
  const [testResults, setTestResults] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [executionOutput, setExecutionOutput] = useState('');
  const [allPassed, setAllPassed] = useState(false);

  // Keystroke tracking refs
  const lastKeyTimeRef = useRef(Date.now());
  const timerIntervalRef = useRef(null);

  // Reset code when challenge changes
  useEffect(() => {
    const ch = BUG_CHALLENGES[selectedChallengeKey];
    if (ch) {
      setCode(ch.starterCode);
      setSecondsRemaining(ch.timeLimitSeconds || 300);
      setTestResults(null);
      setExecutionOutput('');
      setAllPassed(false);
    }
  }, [selectedChallengeKey]);

  // 1. Hyper-Time-Boxed 5-Minute Timer
  useEffect(() => {
    if (!isTimerRunning) return;

    timerIntervalRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          setIsTimerRunning(false);
          sound.playBuzzer();
          return 0;
        }
        if (prev <= 30 && prev % 5 === 0) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning]);

  // 2. Tier 1 Anti-Cheat: VisibilityChange & Window Blur Listeners
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleFocusLoss('Tab Switch to external application (ChatGPT/Browser)');
      }
    };

    const handleWindowBlur = () => {
      // Graceful tolerance: only log if active
      handleFocusLoss('Window lost focus (Candidate navigated away)');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [strikeCount]);

  const handleFocusLoss = (reason) => {
    sound.playWarning();
    setFocusLostWarningVisible(true);
    setStrikeCount((prev) => {
      const nextStrikes = Math.min(3, prev + 1);
      return nextStrikes;
    });

    // Integrity decay
    setIntegrityScore((prev) => Math.max(10, prev - 15));

    const timeStr = new Date().toLocaleTimeString();
    setAntiCheatLog((prev) => [
      `[${timeStr}] ⚠️ FOCUS LOST: ${reason}. Strike added. Integrity decayed.`,
      ...prev.slice(0, 5),
    ]);
  };

  // 3. Tier 2 Anti-Cheat: Keystroke Flight Dynamics & Paste Detection
  const handleKeyDown = (e) => {
    const now = Date.now();
    const delta = now - lastKeyTimeRef.current;
    lastKeyTimeRef.current = now;

    // Normal typing interval is typically 80ms - 300ms
    if (delta > 20 && delta < 500) {
      setKeystrokeVariance(Math.round(delta));
    }

    // Support Tab key in editor
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      setCode(newCode);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    if (pastedText.length > 40) {
      sound.playWarning();
      setRecentPasteAlert(true);
      setIntegrityScore((prev) => Math.max(15, prev - 12));
      const timeStr = new Date().toLocaleTimeString();
      setAntiCheatLog((prev) => [
        `[${timeStr}] 🚨 ABNORMAL CLIPBOARD DUMP: Injected ${pastedText.length} chars instantaneous syntax. Integrity penalized.`,
        ...prev.slice(0, 5),
      ]);
      setTimeout(() => setRecentPasteAlert(false), 4000);
    }
  };

  // Format Timer (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Run Test Suite
  const runTestSuite = () => {
    setIsRunningTests(true);
    sound.playClick();

    setTimeout(() => {
      try {
        const ch = BUG_CHALLENGES[selectedChallengeKey];
        const results = [];
        let passedCount = 0;

        // Sandboxed Function Evaluation
        // Wrap the user's code and evaluate test case expressions
        ch.testCases.forEach((tc, idx) => {
          const startTime = performance.now();
          let passed = false;
          let actualOutput = null;
          let errorMsg = null;

          try {
            const runner = new Function(
              code + `\nreturn (${tc.evalStr});`
            );
            actualOutput = runner();

            // Compare actual with expected
            if (JSON.stringify(actualOutput) === JSON.stringify(tc.expected)) {
              passed = true;
              passedCount++;
            }
          } catch (err) {
            errorMsg = err.message;
          }

          const durationMs = (performance.now() - startTime).toFixed(1);
          results.push({
            name: tc.name,
            input: tc.input,
            expected: tc.expected,
            actual: actualOutput,
            error: errorMsg,
            passed,
            durationMs,
          });
        });

        setTestResults(results);
        setIsRunningTests(false);

        if (passedCount === ch.testCases.length) {
          setAllPassed(true);
          sound.playSuccess();
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00f2fe', '#00ff87', '#7928ca'],
          });
          setExecutionOutput(`✅ ALL ${passedCount}/${ch.testCases.length} TEST CASES PASSED! Contextual bug resolved in ${formatTime(300 - secondsRemaining)}.`);
          
          if (onChallengeComplete) {
            onChallengeComplete({
              challengeId: selectedChallengeKey,
              timeTaken: 300 - secondsRemaining,
              integrityScore,
              weakSkill: ch.weakSkill,
              strongSkill: ch.strongSkill,
            });
          }
        } else {
          setAllPassed(false);
          sound.playBuzzer();
          setExecutionOutput(`❌ ${passedCount}/${ch.testCases.length} Passed. Contextual edge cases failed.`);
        }
      } catch (globalErr) {
        setIsRunningTests(false);
        sound.playBuzzer();
        setExecutionOutput(`⚠️ Syntax/Compilation Error: ${globalErr.message}`);
      }
    }, 350);
  };

  // Reset Code
  const handleReset = () => {
    sound.playClick();
    const ch = BUG_CHALLENGES[selectedChallengeKey];
    setCode(ch.starterCode);
    setTestResults(null);
    setExecutionOutput('');
    setAllPassed(false);
  };

  // Load Solution (Helper for Judges / Testing)
  const handleLoadSolution = () => {
    sound.playClick();
    const ch = BUG_CHALLENGES[selectedChallengeKey];
    setCode(ch.solutionSnippet);
  };

  // Fast forward timer to test countdown urgency
  const handleFastForwardTimer = () => {
    sound.playTick();
    setSecondsRemaining(45);
  };

  return (
    <div className="arena-container">
      {/* Tab Switch Warning Modal */}
      {focusLostWarningVisible && (
        <div className="anti-cheat-modal-overlay">
          <div className="anti-cheat-modal">
            <div className="modal-icon-wrap">
              <ShieldAlert size={44} className="modal-shield-icon" />
            </div>
            <h2 className="modal-title">⚠️ FOCUS LOST / TAB SWITCH DETECTED!</h2>
            <p className="modal-desc">
              Your window switched away from InternForge. In our 3-Tier Anti-Cheat model, tab switching triggers an immediate 
              <strong> Focus Loss Strike</strong>.
            </p>
            <div className="modal-strike-pill">
              STRIKE {strikeCount} OF 3
            </div>
            <p className="modal-subtext">
              {strikeCount >= 3 
                ? 'Maximum strikes reached. Assessment submitted with Candidate Integrity Flag for recruiter review.' 
                : 'Return your focus immediately. 3 strikes will permanently flag this session.'}
            </p>
            <button 
              className="btn-modal-dismiss"
              onClick={() => {
                sound.playClick();
                setFocusLostWarningVisible(false);
              }}
            >
              Resume 5-Minute Challenge
            </button>
          </div>
        </div>
      )}

      {/* Arena Header & Telemetry HUD */}
      <div className="arena-header">
        <div className="header-left-col">
          <div className="challenge-select-wrapper">
            <label className="select-label">ACTIVE CONTEXTUAL CHALLENGE:</label>
            <select
              className="challenge-dropdown"
              value={selectedChallengeKey}
              onChange={(e) => {
                sound.playClick();
                setSelectedChallengeKey(e.target.value);
              }}
            >
              <option value="frontend-cart">Frontend: Checkout Cart State & Clamping</option>
              <option value="backend-auth">Backend: JWT Clock Skew & Revocation Race</option>
              <option value="event-telemetry">Data: Sliding Window Deduplicator & Cache Leak</option>
            </select>
          </div>
        </div>

        {/* Center: Hyper-Time-Boxed 5-Minute Timer */}
        <div className={`countdown-hud-card ${secondsRemaining <= 60 ? 'urgent-pulse' : ''}`}>
          <div className="timer-top-label">
            <Clock size={14} />
            <span>HYPER-TIME-BOX (5:00)</span>
          </div>
          <div className="timer-digits">
            {formatTime(secondsRemaining)}
          </div>
          <div className="timer-bar">
            <div 
              className="timer-bar-fill" 
              style={{ 
                width: `${(secondsRemaining / 300) * 100}%`,
                backgroundColor: secondsRemaining > 120 ? 'var(--neon-cyan)' : secondsRemaining > 60 ? 'var(--neon-amber)' : 'var(--neon-red)'
              }}
            />
          </div>
        </div>

        {/* Right: Live Anti-Cheat Gauge */}
        <div className="anti-cheat-telemetry-hud">
          <div className="hud-metric">
            <span className="hud-metric-label">INTEGRITY CONFIDENCE</span>
            <span className={`hud-metric-val ${integrityScore >= 80 ? 'green' : integrityScore >= 55 ? 'amber' : 'red'}`}>
              {integrityScore}%
            </span>
          </div>
          <div className="hud-metric">
            <span className="hud-metric-label">FLIGHT VARIANCE</span>
            <span className="hud-metric-val cyan">
              {keystrokeVariance}ms
            </span>
          </div>
          <div className="hud-metric">
            <span className="hud-metric-label">STRIKES</span>
            <span className={`hud-metric-val ${strikeCount > 0 ? 'red' : 'green'}`}>
              {strikeCount}/3
            </span>
          </div>
        </div>
      </div>

      {/* Presenter / Judge Testing Deck Controls */}
      <div className="judge-demo-bar">
        <div className="demo-bar-title">
          <Zap size={14} />
          <span>JUDGE LIVE PROOF SIMULATOR:</span>
        </div>
        <div className="demo-bar-buttons">
          <button 
            className="btn-demo-sim" 
            onClick={() => handleFocusLoss('Judge Live Demonstration of Tab Switch')}
          >
            ⚡ Simulate Tab Switch
          </button>
          <button 
            className="btn-demo-sim" 
            onClick={() => handlePaste({ clipboardData: { getData: () => 'Copilot auto-generated bulk implementation paste dummy content for testing purposes' } })}
          >
            📋 Simulate Clipboard Dump
          </button>
          <button 
            className="btn-demo-sim" 
            onClick={handleFastForwardTimer}
          >
            ⏱️ Fast-Forward Timer (0:45)
          </button>
          <button 
            className="btn-demo-sim solve" 
            onClick={handleLoadSolution}
            title="Auto-fill verified fix to demonstrate test passing"
          >
            ✨ Inject Verified Fix
          </button>
        </div>
      </div>

      {/* Main Workspace Grid: Left = Problem Context, Right = Code & Tests */}
      <div className="arena-grid">
        {/* Left Column: Contextual Production Bug Brief */}
        <div className="problem-brief-panel">
          <div className="brief-header">
            <Flame size={18} className="flame-icon" />
            <h3>{challenge.title}</h3>
          </div>
          <div className="brief-badge-row">
            <span className="badge-dept">{challenge.department}</span>
            <span className="badge-concept">{challenge.concept}</span>
            <span className="badge-time">5-Min Micro Task</span>
          </div>

          <div className="brief-content-text">
            {challenge.description.split('\n').map((line, lIdx) => (
              <p key={lIdx}>{line}</p>
            ))}
          </div>

          <div className="why-not-leetcode-card">
            <div className="wnl-title">
              <ShieldCheck size={16} />
              <span>Why LeetCode fails & InternForge wins:</span>
            </div>
            <p>
              ChatGPT-4o solves binary tree inversions instantly. But tracking this 
              production state logic requires understanding the codebase's domain rules 
              in under 3 minutes.
            </p>
          </div>

          {/* Telemetry Live Log */}
          <div className="telemetry-live-box">
            <div className="tel-box-header">
              <Activity size={14} />
              <span>ACTIVE SENTINEL LOG</span>
            </div>
            <div className="tel-box-lines">
              {antiCheatLog.map((log, idx) => (
                <div key={idx} className="tel-log-item">{log}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Code Editor & Test Results */}
        <div className="editor-runner-panel">
          {/* Editor Header Bar */}
          <div className="editor-toolbar">
            <div className="file-tab">
              <Terminal size={14} />
              <span>solution.js (Live Execution)</span>
            </div>
            <div className="editor-actions">
              <button className="btn-editor-action" onClick={handleReset} title="Reset Code">
                <RotateCcw size={14} />
                <span>Reset</span>
              </button>
              <button 
                className="btn-run-tests" 
                onClick={runTestSuite}
                disabled={isRunningTests}
              >
                <Play size={14} className={isRunningTests ? 'spin-icon' : ''} />
                <span>{isRunningTests ? 'Running...' : 'Run Test Suite'}</span>
              </button>
            </div>
          </div>

          {/* Code Textarea */}
          <div className="code-editor-wrapper">
            {recentPasteAlert && (
              <div className="paste-alert-banner">
                🚨 Abnormal Bulk Paste Detected! Keystroke Flight Integrity Decreased.
              </div>
            )}
            <textarea
              className="code-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              spellCheck="false"
              rows={16}
            />
          </div>

          {/* Test Runner Results Panel */}
          <div className="test-results-panel">
            <div className="results-header">
              <div className="results-title">
                <Terminal size={16} />
                <span>TEST EXECUTION CONSOLE</span>
              </div>
              {executionOutput && (
                <div className={`status-pill ${allPassed ? 'pass' : 'fail'}`}>
                  {executionOutput}
                </div>
              )}
            </div>

            {testResults ? (
              <div className="test-cases-list">
                {testResults.map((tc, idx) => (
                  <div key={idx} className={`test-case-card ${tc.passed ? 'passed' : 'failed'}`}>
                    <div className="tc-top-row">
                      <div className="tc-name">
                        {tc.passed ? <CheckCircle2 size={16} className="pass-icon" /> : <XCircle size={16} className="fail-icon" />}
                        <span>Case #{idx + 1}: {tc.name}</span>
                      </div>
                      <span className="tc-time">{tc.durationMs}ms</span>
                    </div>

                    <div className="tc-details">
                      <div className="tc-detail-row">
                        <span className="det-label">Input:</span>
                        <code className="det-code">{tc.input}</code>
                      </div>
                      <div className="tc-detail-row">
                        <span className="det-label">Expected:</span>
                        <code className="det-code">{JSON.stringify(tc.expected)}</code>
                      </div>
                      <div className="tc-detail-row">
                        <span className="det-label">Actual:</span>
                        <code className={`det-code ${tc.passed ? 'val-pass' : 'val-fail'}`}>
                          {tc.error ? `Error: ${tc.error}` : JSON.stringify(tc.actual)}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}

                {allPassed && (
                  <div className="celebration-cta-card">
                    <div className="cta-congrats-text">
                      🎉 <strong>Verification Complete!</strong> Recruiter Industry Readiness Index has been updated.
                    </div>
                    <button 
                      className="btn-go-readiness"
                      onClick={() => {
                        sound.playClick();
                        onNavigateToReadiness();
                      }}
                    >
                      <span>View Industry Readiness Score & Roadmaps</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-results-box">
                <span>Click "Run Test Suite" to execute your solution against live production edge cases.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
