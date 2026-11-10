import React from 'react';
import { StudentProfile } from '../types';
import { Trophy, Sparkles, CheckCircle2, Lock } from 'lucide-react';

interface BadgeDrawerProps {
  activeStudent: StudentProfile | null;
}

export const BadgeDrawer: React.FC<BadgeDrawerProps> = ({ activeStudent }) => {
  if (!activeStudent) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center space-y-3">
        <span className="text-4xl block">🏆</span>
        <h3 className="text-base font-black text-slate-700">No Student Selected</h3>
        <p className="text-xs font-semibold text-slate-500">
          Select or add a learner to view their trophy shelf.
        </p>
      </div>
    );
  }

  const unlockedCount = activeStudent.badges.filter((b) => b.unlocked).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Trophy Header */}
      <div className="p-6 bg-gradient-to-r from-amber-500/15 via-yellow-500/10 to-orange-500/15 rounded-3xl border-2 border-amber-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 border-2 border-amber-600 flex items-center justify-center text-3xl shadow-md">
            🏆
          </div>
          <div>
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider">
              Student Hall of Courage
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#181445]">
              {activeStudent.name}&apos;s Trophy Shelf
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Unlock heroic math awards by continuing your adventures with Bal Hanuman.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border-2 border-amber-200 shadow-xs">
          <Trophy className="w-6 h-6 text-amber-600" />
          <div className="text-left">
            <span className="text-xs font-bold text-slate-500 block">Badges Earned</span>
            <span className="text-lg font-black text-[#181445] tabular-nums">
              {unlockedCount} of {activeStudent.badges.length}
            </span>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {activeStudent.badges.map((badge) => {
          const progressPercent = Math.min(100, Math.round((badge.progress / badge.max) * 100));

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-3xl border-2 transition-all relative overflow-hidden flex flex-col justify-between ${
                badge.unlocked
                  ? 'bg-gradient-to-b from-amber-50/80 via-white to-orange-50/30 border-amber-300 shadow-md'
                  : 'bg-white/80 border-slate-200 opacity-80'
              }`}
            >
              {badge.unlocked && (
                <div className="absolute top-3 right-3 text-emerald-600 flex items-center gap-1 text-xs font-black">
                  <CheckCircle2 className="w-4 h-4 fill-emerald-100" />
                  <span>Unlocked</span>
                </div>
              )}
              {!badge.unlocked && (
                <div className="absolute top-3 right-3 text-slate-400 flex items-center gap-1 text-xs font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Locked</span>
                </div>
              )}

              <div className="flex items-start gap-3.5 mb-4">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl border-2 shrink-0 ${
                    badge.unlocked
                      ? 'bg-amber-100 border-amber-400 shadow-xs animate-star-pulse'
                      : 'bg-slate-100 border-slate-300 grayscale'
                  }`}
                >
                  {badge.icon}
                </div>
                <div>
                  <h3 className="font-extrabold text-[#181445] text-base leading-snug">
                    {badge.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-600 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2 border-t border-purple-50">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span>Progress</span>
                  <span className="tabular-nums">
                    {badge.progress} / {badge.max}
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      badge.unlocked
                        ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                        : 'bg-slate-400'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Encouragement Footer */}
      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs font-bold text-amber-900 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 fill-amber-300" />
          Tip: Each math quest solved increases your progress towards the Century Champion crown!
        </span>
      </div>
    </div>
  );
};
