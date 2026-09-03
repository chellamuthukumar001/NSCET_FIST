import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Globe, Sparkles } from 'lucide-react';
import { voiceService } from '../../lib/voiceAssistant';

interface VoiceQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitQuery: (transcript: string) => void;
  selectedLanguage: 'en' | 'ta';
  onSelectLanguage: (lang: 'en' | 'ta') => void;
}

export const VoiceQueryModal: React.FC<VoiceQueryModalProps> = ({
  isOpen,
  onClose,
  onSubmitQuery,
  selectedLanguage,
  onSelectLanguage,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Tap microphone to start speaking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      startListening();
    } else {
      stopListening();
      setTranscript('');
      setError(null);
    }
  }, [isOpen, selectedLanguage]);

  const startListening = () => {
    setError(null);
    setTranscript('');
    setStatus(
      selectedLanguage === 'ta'
        ? 'பேசுங்கள்... (Listening in Tamil)'
        : 'Listening for your college question...'
    );

    voiceService.startListening(selectedLanguage, {
      onResult: (text) => {
        setTranscript(text);
      },
      onError: (err) => {
        setIsListening(false);
        setError(`Microphone notice: ${err}. You can also type your query directly.`);
        setStatus('Ready');
      },
      onEnd: () => {
        setIsListening(false);
        setStatus('Processing speech...');
      },
    });
    setIsListening(true);
  };

  const stopListening = () => {
    voiceService.stopListening();
    setIsListening(false);
  };

  const handleSend = () => {
    if (transcript.trim()) {
      onSubmitQuery(transcript);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
      <div className="relative w-full max-w-md p-6 rounded-3xl dark-glass border border-white/20 shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6E7F45]/30 text-[#C49A55] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#6E7F45]/40">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CampusIQ Voice Intelligence</span>
          </div>
          <h3 className="text-xl font-bold text-white">Speak Your Question</h3>
          <p className="text-xs text-[#A2B6AC]">{status}</p>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-center gap-2 mb-6">
          {(['en', 'ta'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => onSelectLanguage(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                selectedLanguage === lang
                  ? 'bg-[#173B2F] border-[#6FA9C9] text-white font-bold shadow-md'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
              }`}
            >
              {lang === 'en' ? 'English' : 'தமிழ்'}
            </button>
          ))}
        </div>

        {/* Animated Mic Button & Soundwave Equalizer */}
        <div className="flex flex-col items-center justify-center mb-6 space-y-3">
          <button
            onClick={isListening ? stopListening : startListening}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer ${
              isListening
                ? 'bg-rose-600 shadow-2xl shadow-rose-600/50 scale-105 animate-pulse'
                : 'bg-gradient-to-tr from-[#173B2F] to-[#6E7F45] hover:scale-105 shadow-xl shadow-emerald-950/60'
            }`}
          >
            {isListening ? (
              <Mic className="w-10 h-10 text-white" />
            ) : (
              <MicOff className="w-10 h-10 text-white/80" />
            )}
          </button>

          {/* Dynamic Soundwave Bars */}
          {isListening && (
            <div className="flex items-center gap-1.5 h-6">
              {[0.4, 0.8, 1.0, 0.6, 0.9, 0.5, 0.7].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#6FA9C9] rounded-full animate-pulse"
                  style={{
                    height: `${h * 24}px`,
                    animationDelay: `${i * 120}ms`,
                    animationDuration: '600ms',
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Transcript Box */}
        <div className="min-h-[80px] p-3 rounded-2xl bg-black/40 border border-white/10 text-sm text-center flex items-center justify-center text-white/90 italic mb-4">
          {transcript ? (
            `"${transcript}"`
          ) : (
            <span className="text-gray-500 text-xs">
              {selectedLanguage === 'ta'
                ? 'எடுத்துக்காட்டு: "எனக்கு DBMS Unit 3 lectures வேண்டும்"'
                : 'Example: "Show me DBMS Unit 3 lectures or attendance rules"'}
            </span>
          )}
        </div>

        {error && <div className="text-[11px] text-amber-300 mb-4 text-center">{error}</div>}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!transcript.trim()}
            className="flex-1 py-2.5 rounded-xl bg-[#C49A55] hover:bg-[#D97736] disabled:opacity-40 text-xs font-bold text-white shadow-lg cursor-pointer"
          >
            Ask CampusIQ
          </button>
        </div>

      </div>
    </div>
  );
};

