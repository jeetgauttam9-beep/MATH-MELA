import React, { useState } from 'react';
import { StudentProfile, ClassId } from '../types';
import { CLASS_DEFINITIONS } from '../utils/storage';
import { StudentAvatarIcon } from './HanumanMascot';
import { soundManager } from '../utils/audio';
import { X, Plus, Sparkles, Trophy, Flame, UserCheck, School, BookOpen } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: StudentProfile[];
  selectedClassId: ClassId;
  onSelectClass: (classId: ClassId) => void;
  activeStudent: StudentProfile | null;
  onSelectStudent: (id: string) => void;
  onAddStudent: (name: string, avatar: string, classId: ClassId) => void;
  onOpenClassroomHub: () => void;
}

const AVAILABLE_AVATARS = [
  { id: 'hanuman', label: 'Bal Hanuman', icon: '🐵' },
  { id: 'gada', label: 'Golden Gada', icon: '🛡️' },
  { id: 'sun', label: 'Surya Sun', icon: '☀️' },
  { id: 'mountain', label: 'Dronagiri Peak', icon: '⛰️' },
  { id: 'lotus', label: 'Sacred Lotus', icon: '🪷' },
  { id: 'peacock', label: 'Swift Peacock', icon: '🦚' },
  { id: 'lion', label: 'Brave Lion', icon: '🦁' },
  { id: 'cloud', label: 'Cloud Leaper', icon: '☁️' },
];

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  profiles,
  selectedClassId,
  onSelectClass,
  activeStudent,
  onSelectStudent,
  onAddStudent,
  onOpenClassroomHub,
}) => {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAvatar, setNewAvatar] = useState('hanuman');

  if (!isOpen) return null;

  const currentClassDef = CLASS_DEFINITIONS[selectedClassId];
  const classList: ClassId[] = ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'];

  // FILTER PROFILES STRICTLY BY CURRENT CLASS
  const classProfiles = profiles.filter((p) => p.classId === selectedClassId);

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    soundManager.playPop();
    onAddStudent(newName.trim(), newAvatar, selectedClassId);
    setNewName('');
    setIsAddingNew(false);
  };

  const handleSelect = (id: string) => {
    soundManager.playPop();
    onSelectStudent(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181445]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border-4 border-purple-100 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 via-orange-50 to-purple-50 border-b-2 border-purple-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#ff7a00] text-white flex items-center justify-center text-xl shadow-xs">
              👥
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#181445]">
                {currentClassDef.label} Student Profiles
              </h2>
              <p className="text-xs font-semibold text-slate-500">
                Class-isolated student roster • {currentClassDef.ageGroup}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prominent Class Selector Row within the Modal */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-purple-100 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider pr-1">
              Class:
            </span>
            {classList.map((cId) => {
              const cDef = CLASS_DEFINITIONS[cId];
              const isSelected = selectedClassId === cId;
              const count = profiles.filter((p) => p.classId === cId).length;
              return (
                <button
                  key={cId}
                  onClick={() => {
                    soundManager.playPop();
                    onSelectClass(cId);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{cDef.label}</span>
                  <span className={`text-[10px] px-1 rounded-full ${
                    isSelected ? 'bg-purple-800 text-purple-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Active Student Highlight Banner (if in this class) */}
          {activeStudent && activeStudent.classId === selectedClassId ? (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-amber-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <StudentAvatarIcon avatar={activeStudent.avatar} className="w-14 h-14 shadow-sm" />
                <div>
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-amber-600" /> Active in {currentClassDef.label}
                  </div>
                  <div className="text-lg font-black text-[#181445]">{activeStudent.name}</div>
                  <div className="text-xs font-semibold text-slate-600">
                    Level {activeStudent.level} • {currentClassDef.name}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-xs font-bold text-slate-500">Stars</div>
                  <div className="text-base font-extrabold text-[#ff7a00] flex items-center gap-1 justify-end">
                    <Sparkles className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span className="tabular-nums">{activeStudent.totalStars}</span>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500">Streak</div>
                  <div className="text-base font-extrabold text-orange-600 flex items-center gap-1 justify-end">
                    <Flame className="w-4 h-4 fill-orange-500 text-orange-600" />
                    <span className="tabular-nums">{activeStudent.streak}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
              <span>
                Select a student from <strong>{currentClassDef.label}</strong> below to begin their grade-specific math quests.
              </span>
            </div>
          )}

          {/* Student Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
                {currentClassDef.label} Students ({classProfiles.length})
              </h3>
              {!isAddingNew && (
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="tactile-btn-primary px-3.5 py-1.5 text-xs flex items-center gap-1.5 shadow-xs"
                >
                  <Plus className="w-4 h-4" /> Add Student to {currentClassDef.label}
                </button>
              )}
            </div>

            {/* Add New Student Form Drawer (Scoped directly to selectedClassId) */}
            {isAddingNew && (
              <form
                onSubmit={handleCreateStudent}
                className="p-5 mb-4 rounded-2xl bg-orange-50/70 border-2 border-orange-200 space-y-4 animate-in fade-in"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-[#ff7a00] text-white px-2 py-0.5 rounded-lg">
                      {currentClassDef.label}
                    </span>
                    <h4 className="text-sm font-bold text-orange-950">
                      Add New Student to {currentClassDef.name}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya, Dev, Kabir, Arya"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border-2 border-orange-300 bg-white font-bold text-slate-900 focus:outline-none focus:border-orange-500"
                    autoFocus
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    This student will be enrolled exclusively in {currentClassDef.label} with difficulty tailored for {currentClassDef.ageGroup}.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Pick Hero Avatar
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {AVAILABLE_AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setNewAvatar(av.id)}
                        className={`p-2 rounded-xl flex flex-col items-center gap-1 border-2 transition-all cursor-pointer ${
                          newAvatar === av.id
                            ? 'border-[#ff7a00] bg-orange-100 scale-105 shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-2xl">{av.icon}</span>
                        <span className="text-[10px] font-bold text-slate-600 truncate w-full text-center">
                          {av.label.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="tactile-btn-primary px-5 py-2 text-xs font-bold cursor-pointer"
                  >
                    Save & Enroll in {currentClassDef.label}
                  </button>
                </div>
              </form>
            )}

            {/* Profiles Cards for Current Class */}
            {classProfiles.length === 0 ? (
              <div className="p-8 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-300 text-center space-y-3">
                <span className="text-4xl block">🎒</span>
                <h4 className="text-sm font-black text-slate-700">
                  No students in {currentClassDef.label} yet!
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Add student profiles to {currentClassDef.label} to keep their learning records separate from other classes.
                </p>
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="tactile-btn-primary px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add First Student to {currentClassDef.label}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {classProfiles.map((student) => {
                  const isActive = activeStudent?.id === student.id;
                  return (
                    <button
                      key={student.id}
                      onClick={() => handleSelect(student.id)}
                      className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer group ${
                        isActive
                          ? 'border-[#ff7a00] bg-orange-50/80 shadow-md ring-2 ring-orange-200'
                          : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <StudentAvatarIcon avatar={student.avatar} className="w-12 h-12 shadow-xs" />
                        <div>
                          <div className="font-extrabold text-[#181445] text-base group-hover:text-[#ff7a00] transition-colors flex items-center gap-1.5">
                            {student.name}
                            {isActive && (
                              <span className="text-[10px] bg-[#ff7a00] text-white px-1.5 py-0.2 rounded-full font-bold">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-slate-500">
                            {currentClassDef.label} • Level {student.level}
                          </div>
                          <div className="text-[11px] font-bold text-orange-600 mt-0.5 flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-orange-500 text-orange-600" />
                            <span>{student.streak} streak</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-extrabold text-[#ff7a00] flex items-center gap-1 justify-end">
                          <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          <span className="tabular-nums font-black">{student.totalStars}</span>
                        </div>
                        <div className="text-[11px] font-bold text-slate-500 mt-0.5 flex items-center gap-1 justify-end">
                          <Trophy className="w-3 h-3 text-amber-600" />
                          <span>{student.badges.filter((b) => b.unlocked).length} badges</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer with quick link to Classroom Hub */}
        <div className="px-6 py-4 bg-slate-50 border-t border-purple-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenClassroomHub();
            }}
            className="flex items-center gap-2 text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
          >
            <School className="w-4 h-4" />
            <span>Open Teacher & Admin Hub (Class Roster & Data Reset)</span>
          </button>

          <button
            onClick={() => {
              soundManager.playPop();
              onClose();
            }}
            className="tactile-btn-white px-5 py-2 text-xs font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
