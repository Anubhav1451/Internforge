import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  MessageSquare, 
  Zap, 
  Compass, 
  ShieldAlert, 
  ChevronRight,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';
import { sound } from '../utils/audio';

export default function AiCopilot({ 
  onNavigate, 
  currentTab, 
  integrityScore, 
  onLaunchChallenge 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Namaste! Main hu ForgeBot — aapka AI Career & Anti-Cheat Copilot. Main aapko InternForge explore karne, ATS scan karne, 5-minute micro challenges launch karne, aur Hackathon Judges ko pitch karne me help kar sakta hu!',
      timestamp: 'Just now'
    }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const speakText = (text) => {
    if (!speechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    sound.playClick();
    const userMsg = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');

    // Generate smart contextual AI response
    setTimeout(() => {
      const botResponse = generateBotResponse(query);
      sound.playSuccess();
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse.text,
          action: botResponse.action,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      speakText(botResponse.text);

      if (botResponse.action) {
        botResponse.action();
      }
    }, 400);
  };

  const generateBotResponse = (q) => {
    const lower = q.toLowerCase();

    // 1. Judge pitch question
    if (lower.includes('hackerrank') || lower.includes('unstop') || lower.includes('judge') || lower.includes('pitch')) {
      return {
        text: 'Judges ko ye bolna hai: "HackerRank/Unstop LeetCode DSA puchte hain jise ChatGPT 1 second me solve kar deta hai. InternForge syntax nahi balki Live Contextual Bug Fixing test karta hai — jaise broken frontend state closure ya API clock skew jo AI prompt karne me 5 minute se zyada lagta hai!"',
        action: () => onNavigate('judges')
      };
    }

    // 2. Mobile phone cheat defense
    if (lower.includes('phone') || lower.includes('mobile') || lower.includes('camera') || lower.includes('cheat')) {
      return {
        text: 'Mobile phone defense: Humara Tier-2 system "Hyper-Time-Boxing (5 min limit)" aur "Keystroke Flight Dynamics" use karta hai. Normal human typing me 150-250ms cadence hota hai. Phone se copy karke block paste karne par Integrity Index drop ho jata hai!',
        action: () => onNavigate('judges')
      };
    }

    // 3. Navigation to ATS
    if (lower.includes('resume') || lower.includes('ats') || lower.includes('scan')) {
      return {
        text: 'Aapko ATS Resume Scanner par le ja raha hu. Waha aap apna resume paste karke ya preset select karke verified skills aur department readiness match dekh sakte hain!',
        action: () => onNavigate('ats')
      };
    }

    // 4. Navigation to Internships
    if (lower.includes('intern') || lower.includes('job') || lower.includes('apply') || lower.includes('hiring')) {
      return {
        text: 'Opening Internship Hub! Yaha Vercel, Razorpay, Linear, Swiggy jaisi companies ki verified internships listed hain jisme direct 5-min challenge se shortlist milta hai.',
        action: () => onNavigate('internships')
      };
    }

    // 5. Start Test / Challenge
    if (lower.includes('test') || lower.includes('arena') || lower.includes('code') || lower.includes('challenge')) {
      return {
        text: 'Launching 5-Minute Micro-Task Arena! Dhyan rahe: screen chhodkar tab switch mat karna, warna anti-cheat visibility sensor strike de dega!',
        action: () => {
          onNavigate('arena');
          onLaunchChallenge('frontend-cart');
        }
      };
    }

    // 6. Readiness / Weak points
    if (lower.includes('readiness') || lower.includes('weak') || lower.includes('strong') || lower.includes('skill')) {
      return {
        text: 'Industry Readiness Dashboard khol diya gaya hai! Yaha aapke strong points (DOM Lifecycle, REST) aur weak points (Floating-Point Precision, Memory Leaks) ke targeted learning roadmaps dikhaye gaye hain.',
        action: () => onNavigate('readiness')
      };
    }

    // 7. Hint request
    if (lower.includes('hint') || lower.includes('solution') || lower.includes('help')) {
      return {
        text: '💡 Hint: Checkout Cart bug me coupon discount ko 10 ki jagah 100 se divide karo, subtotal ko Math.max(0, subtotal - discount) se clamp karo, aur floating point precision ke liye Math.round(val * 100) / 100 lagao!',
        action: null
      };
    }

    // Default
    return {
      text: `Aap InternForge ke kisi bhi section me navigate kar sakte hain ya Hackathon Judge counters samajh sakte hain. Aapka current Anti-Cheat Integrity Index ${integrityScore}% hai.`,
      action: null
    };
  };

  const quickChips = [
    '🏆 Why we beat HackerRank?',
    '📱 How we detect phone cheating?',
    '💼 Show Internships',
    '📄 Scan my Resume',
    '⚡ Start 5-Min Arena'
  ];

  return (
    <>
      {/* Floating Trigger Orb */}
      {!isOpen && (
        <button 
          className="ai-copilot-trigger" 
          onClick={() => {
            sound.playClick();
            setIsOpen(true);
          }}
          title="Open ForgeBot AI Copilot"
        >
          <div className="trigger-pulse-glow" />
          <Bot size={24} className="copilot-icon" />
          <span className="trigger-label">ForgeAI Copilot</span>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="copilot-window">
          {/* Top Bar */}
          <div className="copilot-top-bar">
            <div className="copilot-brand">
              <div className="copilot-avatar">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="copilot-title">ForgeAI Sentinel</h4>
                <div className="copilot-status">
                  <span className="online-dot" />
                  <span>Realtime Autonomous Guide</span>
                </div>
              </div>
            </div>

            <div className="copilot-window-controls">
              <button 
                className="btn-speech-toggle" 
                onClick={() => {
                  sound.playClick();
                  setSpeechEnabled(!speechEnabled);
                }}
                title={speechEnabled ? 'Mute AI Voice' : 'Enable AI Voice Narration'}
              >
                {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
              <button 
                className="btn-copilot-close" 
                onClick={() => {
                  sound.playClick();
                  setIsOpen(false);
                }}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="copilot-messages-area">
            {messages.map((m, idx) => (
              <div key={idx} className={`copilot-bubble-row ${m.sender === 'user' ? 'user' : 'bot'}`}>
                {m.sender === 'bot' && (
                  <div className="bubble-avatar">
                    <Bot size={14} />
                  </div>
                )}
                <div className={`copilot-bubble ${m.sender === 'user' ? 'bubble-user' : 'bubble-bot'}`}>
                  <p>{m.text}</p>
                  <span className="bubble-time">{m.timestamp}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="quick-chips-wrapper">
            {quickChips.map((chip, cIdx) => (
              <button
                key={cIdx}
                className="quick-chip-btn"
                onClick={() => handleSend(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="copilot-input-bar">
            <input
              type="text"
              className="copilot-input"
              placeholder="Ask anything or say 'take me to internships'..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button 
              className="btn-copilot-send" 
              onClick={() => handleSend()}
              disabled={!inputVal.trim()}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
