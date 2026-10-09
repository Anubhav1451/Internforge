import React from 'react';
import { 
  ShieldCheck, 
  Briefcase, 
  FileText, 
  Code2, 
  BarChart3, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Radio,
  Zap,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  soundMuted, 
  setSoundMuted, 
  integrityScore, 
  strikeCount 
}) {
  const navItems = [
    { id: 'internships', label: 'Internship Hub', icon: Briefcase },
    { id: 'ats', label: 'ATS Resume Scanner', icon: FileText },
    { id: 'arena', label: '5-Min Micro-Arena', icon: Code2, badge: '5:00' },
    { id: 'readiness', label: 'Industry Readiness', icon: BarChart3 },
    { id: 'judges', label: 'Judge Battle Cards', icon: Award, highlight: true },
  ];

  const handleTabClick = (tabId) => {
    sound.playClick();
    setActiveTab(tabId);
  };

  const handleSoundToggle = () => {
    const isMuted = sound.toggleMute();
    setSoundMuted(isMuted);
    if (!isMuted) sound.playClick();
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="brand-wrapper" onClick={() => handleTabClick('internships')}>
          <div className="brand-logo-glow">
            <Zap className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">INTERN<span className="brand-highlight">FORGE</span></span>
            <span className="brand-subtitle">Anti-Cheat Verification Matrix</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`nav-button ${isActive ? 'active' : ''} ${item.highlight ? 'highlight-deck' : ''}`}
              >
                <Icon className="nav-icon" size={17} />
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge">{item.badge}</span>}
                {item.highlight && <span className="pitch-badge">PITCH</span>}
              </button>
            );
          })}
        </nav>

        {/* Status Telemetry & Controls */}
        <div className="navbar-actions">
          {/* Live Anti-Cheat Indicator */}
          <div 
            className={`telemetry-pill ${strikeCount > 0 ? 'warning' : 'secure'}`}
            title="Real-time Anti-Cheat Integrity Sentinel"
          >
            <Radio className="pulse-dot" size={14} />
            <span className="telemetry-label">
              {strikeCount > 0 ? `STRIKES: ${strikeCount}/3` : 'INTEGRITY SECURE'}
            </span>
            <span className="telemetry-score">{integrityScore}%</span>
          </div>

          {/* Sound Toggle */}
          <button 
            className="sound-toggle-btn"
            onClick={handleSoundToggle}
            title={soundMuted ? 'Unmute Futuristic Audio' : 'Mute Audio'}
          >
            {soundMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
