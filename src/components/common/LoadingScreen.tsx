import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  minDurationMs = 2400,
}) => {
  const [progress, setProgress] = useState(15);
  const [statusIndex, setStatusIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const statusMessages = [
    'Connecting to NSCET Institutional Server...',
    'Loading Department of Computer Science & Engineering Hub...',
    'Indexing Anna University Regulation 2021 Syllabi...',
    'Synchronizing YouTube Lecture Transcripts & Timestamps...',
    'Activating Student Voice PII Shield & Hybrid RAG...',
    'Welcome to CampusIQ — Platform Ready'
  ];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));
      setProgress(pct);

      const msgIdx = Math.min(
        statusMessages.length - 1,
        Math.floor((pct / 100) * statusMessages.length)
      );
      setStatusIndex(msgIdx);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 500);
        }, 300);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700 select-none cursor-pointer ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #173B2F 0%, #101815 85%, #080D0B 100%)',
      }}
      title="Click anywhere to skip"
    >
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#6E7F45] blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#C49A55] blur-3xl"></div>
      </div>

      {/* Main Container */}
      <div className="relative flex flex-col items-center max-w-lg mx-auto px-6 text-center z-10">
        
        {/* Glowing Logo Container */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Outer rotating dashed ring */}
          <div className="absolute w-56 h-56 rounded-full border-2 border-dashed border-[#C49A55]/40 animate-spin-slow"></div>
          
          {/* Glowing pulse ring */}
          <div className="absolute w-44 h-44 rounded-full bg-[#6E7F45]/20 animate-pulse-glow"></div>
          
          {/* Official CampusIQ Emblem */}
          <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-[#173B2F] via-[#C49A55] to-[#6FA9C9] shadow-2xl shadow-emerald-950/80 overflow-hidden border border-white/20">
            <img
              src="/assets/campusiq-logo.png"
              alt="CAMPUSIQ Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Brand Typography */}
        <div className="space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-widest text-[#C49A55]">
            <span>NSCET</span>
            <span className="w-1 h-1 rounded-full bg-[#6FA9C9]"></span>
            <span>Autonomous Ecosystem</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white flex items-center justify-center gap-1">
            <span>CAMPUS</span>
            <span className="text-[#6FA9C9]">IQ</span>
          </h1>

          <p className="text-[#C49A55] font-medium text-sm md:text-base tracking-widest uppercase">
            Learn. Connect. Be Heard.
          </p>

          <p className="text-xs text-[#9BB1A6] max-w-sm pt-1">
            Nadar Saraswathi College of Engineering & Technology, Theni
          </p>
        </div>

        {/* Progress Bar & Status Text */}
        <div className="w-full max-w-xs space-y-3">
          <div className="w-full bg-black/40 h-2 rounded-full p-0.5 border border-white/10 overflow-hidden shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-150 ease-out bg-gradient-to-r from-[#285443] via-[#6E7F45] to-[#C49A55]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-[11px] text-[#A2B6AC] px-1 font-mono">
            <span className="truncate max-w-[200px] text-left">
              {statusMessages[statusIndex]}
            </span>
            <span className="font-bold text-[#C49A55]">{progress}%</span>
          </div>
        </div>

      </div>

      {/* Footer subtle accreditation */}
      <div className="absolute bottom-6 text-center text-[11px] text-white/40 tracking-wider uppercase font-medium">
        Department of Computer Science & Engineering
      </div>
    </div>
  );
};

