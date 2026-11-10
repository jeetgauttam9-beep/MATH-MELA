import React from 'react';
import { StudentProfile } from '../types';
import { StudentAvatarIcon } from './HanumanMascot';
import { Volume2, VolumeX, Sparkles, School } from 'lucide-react';

interface HeaderProps {
  currentTab: 'quests' | 'sandbox' | 'badges' | 'classroom';
  onSelectTab: (tab: 'quests' | 'sandbox' | 'badges' | 'classroom') => void;
  activeStudent: StudentProfile | null;
  onOpenProfileSwitcher: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  activeStudent,
  onOpenProfileSwitcher,
  isSoundOn,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-purple-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single line, Plus Jakarta Sans, Heroic saffron gradient) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('quests')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-orange-300 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition-transform">
              🥭
            </div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#181445] whitespace-nowrap">
              Bal Hanuman <span className="text-[#ff7a00]">Math Land</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (Single line, 1-2 words each) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-600">
          <button
            onClick={() => onSelectTab('quests')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              currentTab === 'quests'
                ? 'text-[#ff7a00] border-[#ff7a00]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Math Quests
          </button>
          <button
            onClick={() => onSelectTab('sandbox')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              currentTab === 'sandbox'
                ? 'text-[#00b4d8] border-[#00b4d8]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Divine Math Lab
          </button>
          <button
            onClick={() => onSelectTab('badges')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
              currentTab === 'badges'
                ? 'text-[#ffc727] border-[#ffc727]'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Trophy Shelf
          </button>
          <button
            onClick={() => onSelectTab('classroom')}
            className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 flex items-center gap-1.5 ${
              currentTab === 'classroom'
                ? 'text-purple-600 border-purple-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <School className="w-4 h-4" />
            Classroom Hub
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area (Student Profile quick-switcher pill + sound toggle) */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Audio toggle button */}
          <button
            onClick={onToggleSound}
            className="w-10 h-10 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 flex items-center justify-center cursor-pointer transition-colors"
            title={isSoundOn ? 'Sound is ON' : 'Sound is MUTED'}
            aria-label="Toggle sound effects"
          >
            {isSoundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
          </button>

          {/* Student Profile Quick-Switch Button */}
          {activeStudent ? (
            <button
              onClick={onOpenProfileSwitcher}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-[#181445] transition-all cursor-pointer group shadow-xs active:translate-y-0.5"
              title="Switch student profile or view progress"
            >
              <StudentAvatarIcon avatar={activeStudent.avatar} className="w-8 h-8 text-base shadow-xs" />
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold leading-tight flex items-center gap-1.5 text-slate-900">
                  <span className="truncate max-w-[90px]">{activeStudent.name}</span>
                  <span className="text-[10px] text-amber-700 bg-amber-200/60 font-extrabold px-1.5 py-0.2 rounded-full">
                    Lvl {activeStudent.level}
                  </span>
                </div>
                <div className="text-[11px] font-extrabold text-[#ff7a00] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span className="tabular-nums">{activeStudent.totalStars}</span> stars
                </div>
              </div>
              <span className="text-xs text-amber-600 font-extrabold ml-0.5 group-hover:translate-x-0.5 transition-transform">
                ▼
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenProfileSwitcher}
              className="tactile-btn-primary px-3 py-1.5 text-xs font-bold"
            >
              Add Student
            </button>
          )}
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-purple-50 bg-[#faf8ff] text-xs font-bold">
        <button
          onClick={() => onSelectTab('quests')}
          className={`px-3 py-1.5 rounded-xl cursor-pointer ${
            currentTab === 'quests' ? 'bg-[#ff7a00] text-white shadow-xs' : 'text-slate-600'
          }`}
        >
          Quests
        </button>
        <button
          onClick={() => onSelectTab('sandbox')}
          className={`px-3 py-1.5 rounded-xl cursor-pointer ${
            currentTab === 'sandbox' ? 'bg-[#00b4d8] text-white shadow-xs' : 'text-slate-600'
          }`}
        >
          Math Lab
        </button>
        <button
          onClick={() => onSelectTab('badges')}
          className={`px-3 py-1.5 rounded-xl cursor-pointer ${
            currentTab === 'badges' ? 'bg-[#ffc727] text-slate-900 shadow-xs' : 'text-slate-600'
          }`}
        >
          Trophies
        </button>
        <button
          onClick={() => onSelectTab('classroom')}
          className={`px-3 py-1.5 rounded-xl cursor-pointer ${
            currentTab === 'classroom' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
          }`}
        >
          Classroom
        </button>
      </div>
    </header>
  );
};
