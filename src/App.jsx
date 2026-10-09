import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navbar from './components/Navbar';
import InternshipHub from './components/InternshipHub';
import AtsScanner from './components/AtsScanner';
import MicroTaskArena from './components/MicroTaskArena';
import IndustryReadinessDashboard from './components/IndustryReadinessDashboard';
import JudgeBattleDeck from './components/JudgeBattleDeck';
import AiCopilot from './components/AiCopilot';
import { SAMPLE_RESUMES } from './data/mockData';
import { analyzeResume } from './utils/atsEngine';
import { sound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('internships');
  const [selectedDept, setSelectedDept] = useState('all');
  const [activeChallengeId, setActiveChallengeId] = useState('frontend-cart');

  // Anti-cheat Global State
  const [integrityScore, setIntegrityScore] = useState(96);
  const [strikeCount, setStrikeCount] = useState(0);

  // Resume Data State (Pre-loaded with sample so the entire app is alive from start)
  const [atsData, setAtsData] = useState(() => analyzeResume(SAMPLE_RESUMES.frontend_pro.rawText));

  // Micro-task completion state
  const [lastChallengeResult, setLastChallengeResult] = useState(null);

  // Audio mute state
  const [soundMuted, setSoundMuted] = useState(false);

  // Handlers
  const handleLaunchChallenge = (challengeId) => {
    sound.playClick();
    if (challengeId) {
      setActiveChallengeId(challengeId);
    }
    setActiveTab('arena');
  };

  const handleNavigateToInternships = (dept) => {
    sound.playClick();
    if (dept) {
      setSelectedDept(dept);
    }
    setActiveTab('internships');
  };

  const handleChallengeComplete = (result) => {
    setLastChallengeResult(result);
  };

  const triggerMockTabSwitch = () => {
    setStrikeCount(prev => Math.min(3, prev + 1));
    setIntegrityScore(prev => Math.max(20, prev - 8));
  };

  const triggerMockPaste = () => {
    setIntegrityScore(prev => Math.max(20, prev - 12));
  };

  return (
    <div className="app-root">
      {/* 3D WebGL Background */}
      <ThreeBackground stressLevel={strikeCount * 0.4} />

      {/* Main Application Container */}
      <div className="app-foreground">
        {/* Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          soundMuted={soundMuted}
          setSoundMuted={setSoundMuted}
          integrityScore={integrityScore}
          strikeCount={strikeCount}
        />

        {/* Dynamic Main View */}
        <main className="content-container">
          {activeTab === 'internships' && (
            <InternshipHub
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
              onLaunchChallenge={handleLaunchChallenge}
              atsData={atsData}
            />
          )}

          {activeTab === 'ats' && (
            <AtsScanner
              onNavigateToInternships={handleNavigateToInternships}
              onLaunchChallenge={handleLaunchChallenge}
              onScanUpdate={setAtsData}
            />
          )}

          {activeTab === 'arena' && (
            <MicroTaskArena
              currentChallengeId={activeChallengeId}
              onChallengeComplete={handleChallengeComplete}
              integrityScore={integrityScore}
              setIntegrityScore={setIntegrityScore}
              strikeCount={strikeCount}
              setStrikeCount={setStrikeCount}
              onNavigateToReadiness={() => setActiveTab('readiness')}
            />
          )}

          {activeTab === 'readiness' && (
            <IndustryReadinessDashboard
              atsData={atsData}
              lastChallengeResult={lastChallengeResult}
              integrityScore={integrityScore}
              onLaunchChallenge={handleLaunchChallenge}
            />
          )}

          {activeTab === 'judges' && (
            <JudgeBattleDeck
              onLaunchChallenge={handleLaunchChallenge}
              triggerMockTabSwitch={triggerMockTabSwitch}
              triggerMockPaste={triggerMockPaste}
            />
          )}
        </main>

        {/* AI Career & Pitch Copilot Assistant */}
        <AiCopilot
          onNavigate={(tab) => {
            sound.playClick();
            setActiveTab(tab);
          }}
          currentTab={activeTab}
          integrityScore={integrityScore}
          onLaunchChallenge={handleLaunchChallenge}
        />
      </div>
    </div>
  );
}
