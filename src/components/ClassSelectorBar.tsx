import React from 'react';
import { ClassId, StudentProfile } from '../types';
import { CLASS_DEFINITIONS } from '../utils/storage';
import { soundManager } from '../utils/audio';
import { StudentAvatarIcon } from './HanumanMascot';
import { School, Sparkles, Users, BookOpen, ChevronDown } from 'lucide-react';

interface ClassSelectorBarProps {
  selectedClassId: ClassId;
  onSelectClass: (classId: ClassId) => void;
  activeStudent: StudentProfile | null;
  classStudentsCount: number;
  onOpenProfileModal: () => void;
}

export const ClassSelectorBar: React.FC<ClassSelectorBarProps> = ({
  selectedClassId,
  onSelectClass,
  activeStudent,
  classStudentsCount,
  onOpenProfileModal,
}) => {
  const currentClassDef = CLASS_DEFINITIONS[selectedClassId];
  const classList: ClassId[] = ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'];

  return (
    <div className="bg-white border-b-2 border-purple-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        {/* Main Row: Prominent Class Switcher */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Label & Class Toggles */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 pr-2 border-r border-slate-200">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold shadow-2xs">
                <School className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block leading-none">
                  Teacher Mode
                </span>
                <span className="text-xs font-black text-[#181445]">
                  Select Class:
                </span>
              </div>
            </div>

            {/* Desktop / Tablet Chunky Tactile Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {classList.map((cId) => {
                const cDef = CLASS_DEFINITIONS[cId];
                const isSelected = selectedClassId === cId;
                return (
                  <button
                    key={cId}
                    onClick={() => {
                      if (!isSelected) {
                        soundManager.playPop();
                        onSelectClass(cId);
                      }
                    }}
                    className={`px-3 sm:px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'tactile-btn-primary shadow-sm ring-2 ring-orange-200'
                        : 'bg-slate-50 hover:bg-purple-50 text-slate-700 border-2 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <span>{cDef.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? 'bg-orange-800/40 text-amber-100' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {cDef.ageGroup.replace('Ages ', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Student & Class Info Chip */}
          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            {/* Class Curriculum Summary Tooltip Chip */}
            <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-600 bg-purple-50/70 px-3 py-1.5 rounded-xl border border-purple-200">
              <BookOpen className="w-3.5 h-3.5 text-purple-600 shrink-0" />
              <span className="font-bold text-purple-950 truncate max-w-[280px]">
                {currentClassDef.curriculumSummary}
              </span>
            </div>

            {/* Student Count in this Class */}
            <div className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-xl">
              <Users className="w-3.5 h-3.5 text-slate-600" />
              <span className="tabular-nums font-extrabold text-slate-800">
                {classStudentsCount}
              </span>
              <span className="hidden sm:inline">in {currentClassDef.label}</span>
            </div>

            {/* Active Class Student Trigger */}
            {activeStudent ? (
              <button
                onClick={onOpenProfileModal}
                className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 transition-colors cursor-pointer group shadow-2xs"
                title={`Manage or switch students in ${currentClassDef.label}`}
              >
                <StudentAvatarIcon avatar={activeStudent.avatar} className="w-7 h-7 text-sm" />
                <div className="text-left">
                  <div className="text-xs font-black text-[#181445] flex items-center gap-1">
                    <span className="truncate max-w-[80px]">{activeStudent.name}</span>
                    <span className="text-[10px] text-amber-700 bg-amber-200/60 font-extrabold px-1.5 py-0.2 rounded-full">
                      Lvl {activeStudent.level}
                    </span>
                  </div>
                  <div className="text-[10px] font-extrabold text-[#ff7a00] flex items-center gap-0.5">
                    <Sparkles className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{activeStudent.totalStars} stars</span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-amber-700 group-hover:translate-y-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={onOpenProfileModal}
                className="tactile-btn-primary px-3 py-1.5 text-xs font-bold shadow-xs"
              >
                + Add Student to {currentClassDef.label}
              </button>
            )}
          </div>
        </div>

        {/* Informative Sub-banner for Currently Selected Class */}
        <div className="mt-2.5 pt-2 border-t border-purple-50 flex flex-wrap items-center justify-between text-[11px] font-bold text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-800 font-extrabold">
              Active: {currentClassDef.name} ({currentClassDef.ageGroup})
            </span>
            <span>•</span>
            <span className="text-purple-700">{currentClassDef.curriculumSummary}</span>
          </div>

          <div className="text-slate-400 italic">
            Questions & progress are strictly locked to {currentClassDef.label}
          </div>
        </div>
      </div>
    </div>
  );
};
