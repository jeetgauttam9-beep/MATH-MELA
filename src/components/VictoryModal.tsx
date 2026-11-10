import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { HanumanMascot } from './HanumanMascot';
import { soundManager } from '../utils/audio';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

interface VictoryModalProps {
  isOpen: boolean;
  starsEarned: number;
  streak: number;
  encouragement: string;
  onNext: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  starsEarned,
  streak,
  encouragement,
  onNext,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundManager.playCorrect();

      // Launch delightful colorful confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF7A00', '#FFC727', '#00B4D8', '#10B981', '#F43F5E'],
        });
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181445]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-300 relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Golden celebratory sunburst background glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Celebrating Mascot */}
        <div className="mx-auto mb-2">
          <HanumanMascot pose="celebrating" size="lg" />
        </div>

        {/* Victory Badges / Star Splash */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-900 font-black text-sm border-2 border-amber-300 mb-3 shadow-xs">
          <Sparkles className="w-4 h-4 text-amber-600 fill-amber-400" />
          <span>Shandaar! Correct Answer!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-[#181445] mb-2 tracking-tight">
          Jai Hanuman! Victory!
        </h2>

        <p className="text-sm font-bold text-slate-600 mb-6 max-w-sm mx-auto">
          {encouragement}
        </p>

        {/* Reward Pill stats */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
          <div className="text-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Stars Collected</span>
            <div className="text-2xl font-black text-[#ff7a00] flex items-center justify-center gap-1.5 mt-0.5">
              <Sparkles className="w-5 h-5 fill-amber-400 text-amber-500" />
              <span>+{starsEarned}</span>
            </div>
          </div>

          <div className="text-center border-l-2 border-amber-200">
            <span className="text-xs font-bold text-slate-500 uppercase">Bravery Streak</span>
            <div className="text-2xl font-black text-orange-600 flex items-center justify-center gap-1.5 mt-0.5">
              <Flame className="w-5 h-5 fill-orange-500 text-orange-600" />
              <span>{streak} in a row</span>
            </div>
          </div>
        </div>

        {/* Chunky Tactile Next Button */}
        <button
          onClick={() => {
            soundManager.playPop();
            onNext();
          }}
          className="tactile-btn-primary w-full py-3.5 text-base font-black flex items-center justify-center gap-2 shadow-lg"
        >
          <span>Continue Journey</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
