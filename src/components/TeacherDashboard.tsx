import React, { useState, useRef } from 'react';
import { StudentProfile, ClassId } from '../types';
import { StudentAvatarIcon } from './HanumanMascot';
import { storageService, CLASS_DEFINITIONS } from '../utils/storage';
import { soundManager } from '../utils/audio';
import {
  RotateCcw,
  Download,
  Upload,
  Printer,
  Trash2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Flame,
  UserCheck,
  Plus,
  School,
  BookOpen,
} from 'lucide-react';

interface TeacherDashboardProps {
  profiles: StudentProfile[];
  selectedClassId: ClassId;
  onSelectClass: (classId: ClassId) => void;
  activeStudent: StudentProfile | null;
  onRefreshProfiles: () => void;
  onSelectStudent: (id: string) => void;
  onOpenAddModal: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  profiles,
  selectedClassId,
  onSelectClass,
  activeStudent,
  onRefreshProfiles,
  onSelectStudent,
  onOpenAddModal,
}) => {
  const [resetConfirmId, setResetConfirmId] = useState<string | null>(null);
  const [showResetClassConfirm, setShowResetClassConfirm] = useState(false);
  const [showResetAllConfirm, setShowResetAllConfirm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const classList: ClassId[] = ['class_1', 'class_2', 'class_3', 'class_4', 'class_5'];
  const currentClassDef = CLASS_DEFINITIONS[selectedClassId];

  // Students in currently selected class
  const classProfiles = profiles.filter((p) => p.classId === selectedClassId);

  // Classroom high-level KPIs for selected class
  const totalStars = classProfiles.reduce((acc, p) => acc + p.totalStars, 0);
  const totalQuests = classProfiles.reduce((acc, p) => acc + p.questsCompleted, 0);
  const allAttempted = classProfiles.reduce(
    (acc, p) =>
      acc +
      Object.values(p.topicStats).reduce((sum, s) => sum + s.attempted, 0),
    0
  );
  const allCorrect = classProfiles.reduce(
    (acc, p) =>
      acc +
      Object.values(p.topicStats).reduce((sum, s) => sum + s.correct, 0),
    0
  );
  const overallAccuracy = allAttempted > 0 ? Math.round((allCorrect / allAttempted) * 100) : 0;

  // Handler to reset a single student's data
  const handleResetStudent = (id: string, name: string) => {
    storageService.resetStudentProgress(id);
    onRefreshProfiles();
    soundManager.playPop();
    setResetConfirmId(null);
    setFeedbackMessage({
      type: 'success',
      text: `Reset progress for ${name}. Stars, streak, and badges set back to 0.`,
    });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Handler to reset ONLY the current selected class
  const handleResetClass = () => {
    storageService.resetClassProgress(selectedClassId);
    onRefreshProfiles();
    soundManager.playPop();
    setShowResetClassConfirm(false);
    setFeedbackMessage({
      type: 'success',
      text: `Reset all student progress in ${currentClassDef.label} without altering other classes.`,
    });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Handler to delete a single student
  const handleDeleteStudent = (id: string, name: string) => {
    storageService.deleteStudent(id);
    onRefreshProfiles();
    soundManager.playPop();
    setFeedbackMessage({
      type: 'success',
      text: `Removed ${name} from ${currentClassDef.label} roster.`,
    });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Handler to reset entire classroom data
  const handleResetAllClassroom = () => {
    storageService.resetAllClassroomData();
    onRefreshProfiles();
    soundManager.playPop();
    setShowResetAllConfirm(false);
    setFeedbackMessage({
      type: 'success',
      text: 'All classes and student datasets restored to fresh starter profiles.',
    });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Export JSON backup locally (works offline)
  const handleExportJson = () => {
    const jsonStr = storageService.exportClassroomJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bal_hanuman_classroom_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    soundManager.playPop();
    setFeedbackMessage({
      type: 'success',
      text: 'Classroom backup JSON downloaded offline successfully.',
    });
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // Import JSON backup locally
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const res = storageService.importClassroomJson(content);
      if (res.success) {
        onRefreshProfiles();
        soundManager.playCorrect();
        setFeedbackMessage({
          type: 'success',
          text: `Successfully imported ${res.count} student profiles from backup!`,
        });
      } else {
        soundManager.playGentleRetry();
        setFeedbackMessage({
          type: 'error',
          text: res.error || 'Failed to import classroom backup.',
        });
      }
      setTimeout(() => setFeedbackMessage(null), 5000);
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Print Report Card
  const handlePrint = () => {
    soundManager.playPop();
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto px-4 py-6">
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-[#181445] rounded-3xl text-white shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold tracking-wider uppercase mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Offline Multi-Classroom Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Teacher & Admin Dashboard
          </h1>
          <p className="text-sm text-purple-200 mt-1 max-w-xl">
            Select a class to manage its isolated student roster, track difficulty and accuracy, or reset
            class data without affecting other grades.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={onOpenAddModal}
            className="tactile-btn-primary px-4 py-2 text-xs flex items-center gap-1.5 shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Student
          </button>
          <button
            onClick={handleExportJson}
            className="tactile-btn-secondary px-4 py-2 text-xs flex items-center gap-1.5 shadow-md"
            title="Download offline JSON backup file"
          >
            <Download className="w-4 h-4" /> Export Backup
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="tactile-btn-white px-4 py-2 text-xs flex items-center gap-1.5 shadow-md text-slate-800"
            title="Upload previously saved JSON backup file"
          >
            <Upload className="w-4 h-4" /> Import Backup
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportFile}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            onClick={handlePrint}
            className="px-3 py-2 text-xs font-bold bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Print Classroom Roster Report"
          >
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>

      {/* Prominent Class Selection Bar on Dashboard */}
      <div className="tactile-card p-4 sm:p-5 bg-gradient-to-r from-white via-purple-50/40 to-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-purple-600" />
            <h2 className="text-sm font-black text-[#181445] uppercase tracking-wider">
              Select Active Class to Manage
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            Currently Viewing: <strong className="text-purple-900">{currentClassDef.name}</strong>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3">
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
                className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#ff7a00] bg-orange-50 shadow-md ring-2 ring-orange-200'
                    : 'border-slate-200 bg-white hover:border-purple-300 hover:bg-purple-50/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-[#181445]">{cDef.label}</span>
                  <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-md bg-purple-100 text-purple-800">
                    {count} {count === 1 ? 'student' : 'students'}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-1 truncate">
                  {cDef.ageGroup}
                </div>
              </button>
            );
          })}
        </div>

        {/* Curriculum overview of selected class */}
        <div className="mt-3 p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center gap-2 text-xs font-semibold text-purple-900">
          <BookOpen className="w-4 h-4 text-purple-600 shrink-0" />
          <span>
            <strong>{currentClassDef.label} Focus:</strong> {currentClassDef.curriculumSummary}
          </span>
        </div>
      </div>

      {/* Notification Toast */}
      {feedbackMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 border text-sm font-bold animate-in fade-in ${
            feedbackMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
              : 'bg-red-50 text-red-800 border-red-300'
          }`}
        >
          {feedbackMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
          )}
          <span>{feedbackMessage.text}</span>
        </div>
      )}

      {/* Class KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="tactile-card p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {currentClassDef.label} Students
          </div>
          <div className="text-3xl font-black text-[#181445] mt-1 tabular-nums">{classProfiles.length}</div>
          <div className="text-xs text-slate-500 mt-1">Enrolled in {currentClassDef.label}</div>
        </div>

        <div className="tactile-card p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Celestial Stars</div>
          <div className="text-3xl font-black text-[#ff7a00] mt-1 flex items-center gap-1 tabular-nums">
            <Sparkles className="w-6 h-6 fill-amber-400 text-amber-500" />
            {totalStars}
          </div>
          <div className="text-xs text-slate-500 mt-1">{currentClassDef.label} total stars</div>
        </div>

        <div className="tactile-card p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quests Solved</div>
          <div className="text-3xl font-black text-sky-600 mt-1 tabular-nums">{totalQuests}</div>
          <div className="text-xs text-slate-500 mt-1">{currentClassDef.label} problems solved</div>
        </div>

        <div className="tactile-card p-5">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Class Accuracy</div>
          <div className="text-3xl font-black text-emerald-600 mt-1 tabular-nums">{overallAccuracy}%</div>
          <div className="text-xs text-slate-500 mt-1">
            {allCorrect} of {allAttempted} correct
          </div>
        </div>
      </div>

      {/* Selected Class Roster Table */}
      <div className="tactile-card overflow-hidden">
        <div className="p-5 border-b border-purple-100 bg-[#faf8ff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-[#181445]">
              {currentClassDef.name} — Student Roster
            </h2>
            <p className="text-xs text-slate-500">
              Only displaying students enrolled in {currentClassDef.label}. Progress is completely isolated from other classes.
            </p>
          </div>

          <button
            onClick={onOpenAddModal}
            className="tactile-btn-primary px-3.5 py-1.5 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Student to {currentClassDef.label}
          </button>
        </div>

        {classProfiles.length === 0 ? (
          <div className="p-10 text-center space-y-3">
            <span className="text-4xl block">🎒</span>
            <h3 className="text-base font-black text-slate-700">
              No students enrolled in {currentClassDef.label} yet!
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Add your first learner to {currentClassDef.label} to start tracking math progress for this grade.
            </p>
            <button
              onClick={onOpenAddModal}
              className="tactile-btn-primary px-4 py-2 text-xs font-bold"
            >
              + Add First Student to {currentClassDef.label}
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-purple-50/50 text-slate-600 font-extrabold text-xs border-b border-purple-100">
                <tr>
                  <th className="py-3.5 px-5">Student Learner</th>
                  <th className="py-3.5 px-4 text-center">Class & Level</th>
                  <th className="py-3.5 px-4 text-center">Stars Earned</th>
                  <th className="py-3.5 px-4 text-center">Streak</th>
                  <th className="py-3.5 px-4 text-center">Accuracy</th>
                  <th className="py-3.5 px-5 text-right">Student Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/60 font-semibold">
                {classProfiles.map((student) => {
                  const isActive = activeStudent?.id === student.id;
                  const attempted = Object.values(student.topicStats).reduce(
                    (sum, s) => sum + s.attempted,
                    0
                  );
                  const correct = Object.values(student.topicStats).reduce(
                    (sum, s) => sum + s.correct,
                    0
                  );
                  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

                  return (
                    <tr
                      key={student.id}
                      className={`hover:bg-purple-50/30 transition-colors ${
                        isActive ? 'bg-orange-50/40' : ''
                      }`}
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <StudentAvatarIcon avatar={student.avatar} className="w-10 h-10 shadow-2xs" />
                          <div>
                            <div className="font-extrabold text-[#181445] flex items-center gap-1.5">
                              {student.name}
                              {isActive && (
                                <span className="text-[10px] bg-[#ff7a00] text-white px-1.5 py-0.2 rounded-full font-bold">
                                  Active
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              {student.badges.filter((b) => b.unlocked).length} badges unlocked
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-xl bg-purple-100 text-purple-900 text-xs font-bold">
                          {currentClassDef.label} • Lvl {student.level}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="font-extrabold text-[#ff7a00] flex items-center justify-center gap-1 tabular-nums">
                          <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                          {student.totalStars}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-orange-600 flex items-center justify-center gap-1 tabular-nums">
                          <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-600" />
                          {student.streak}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <div className="flex flex-col items-center">
                          <span
                            className={`font-extrabold tabular-nums ${
                              accuracy >= 80
                                ? 'text-emerald-600'
                                : accuracy >= 60
                                ? 'text-amber-600'
                                : 'text-slate-500'
                            }`}
                          >
                            {accuracy}%
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {correct}/{attempted}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {!isActive ? (
                            <button
                              onClick={() => {
                                soundManager.playPop();
                                onSelectStudent(student.id);
                              }}
                              className="tactile-btn-primary px-3 py-1.5 text-xs font-bold"
                              title="Set as active student in this class"
                            >
                              Switch To
                            </button>
                          ) : (
                            <span className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 rounded-full flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5" /> Learning Now
                            </span>
                          )}

                          {/* Reset Single Student Progress */}
                          {resetConfirmId === student.id ? (
                            <div className="inline-flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-300">
                              <span className="text-[11px] font-bold text-red-700 px-1">Reset?</span>
                              <button
                                onClick={() => handleResetStudent(student.id, student.name)}
                                className="px-2 py-0.5 text-xs font-bold bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => setResetConfirmId(null)}
                                className="px-2 py-0.5 text-xs font-bold bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 cursor-pointer"
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setResetConfirmId(student.id)}
                              className="p-1.5 rounded-xl text-slate-500 hover:text-amber-700 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-colors cursor-pointer"
                              title={`Reset ${student.name}'s stars and level back to 0`}
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}

                          {/* Delete Student */}
                          <button
                            onClick={() => {
                              if (window.confirm(`Remove ${student.name} from ${currentClassDef.label}?`)) {
                                handleDeleteStudent(student.id, student.name);
                              }
                            }}
                            className="p-1.5 rounded-xl text-slate-400 hover:text-red-700 hover:bg-red-50 border border-slate-200 hover:border-red-300 transition-colors cursor-pointer"
                            title="Remove student profile"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Class-Specific Reset & Global Reset Center */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reset ONLY Selected Class */}
        <div className="tactile-card p-5 bg-amber-50/40 border-amber-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-amber-950 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-700" />
              Reset {currentClassDef.label} Progress Only
            </h3>
            <p className="text-xs text-amber-900/80 mt-1">
              Clears stars, streaks, and levels for students in <strong>{currentClassDef.label}</strong> only.
              Other classes remain completely untouched.
            </p>
          </div>

          <div className="pt-4">
            {showResetClassConfirm ? (
              <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-amber-400">
                <span className="text-xs font-bold text-amber-900">Reset {currentClassDef.label}?</span>
                <button
                  onClick={handleResetClass}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Yes, Reset {currentClassDef.label}
                </button>
                <button
                  onClick={() => setShowResetClassConfirm(false)}
                  className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetClassConfirm(true)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-amber-100 text-amber-800 border-2 border-amber-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset {currentClassDef.label} Data
              </button>
            )}
          </div>
        </div>

        {/* Global Reset All Classes */}
        <div className="tactile-card p-5 bg-red-50/40 border-red-200 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-black text-red-950 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Reset All Classes (Factory Reset)
            </h3>
            <p className="text-xs text-red-900/80 mt-1">
              Restores all classes (Class 1 to 5) to fresh default starter student rosters.
            </p>
          </div>

          <div className="pt-4">
            {showResetAllConfirm ? (
              <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-2 border-red-400">
                <span className="text-xs font-bold text-red-900">Wipe all classes?</span>
                <button
                  onClick={handleResetAllClassroom}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                  Yes, Reset All
                </button>
                <button
                  onClick={() => setShowResetAllConfirm(false)}
                  className="px-3 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowResetAllConfirm(true)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-red-50 text-red-700 border-2 border-red-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
              >
                <Trash2 className="w-3.5 h-3.5" /> Full Factory Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
