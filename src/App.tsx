import { useState, useEffect } from 'react';
import { StudentProfile, RealmId, Quest, ClassId } from './types';
import { storageService, INITIAL_BADGES, CLASS_DEFINITIONS } from './utils/storage';
import { soundManager } from './utils/audio';
import { Header } from './components/Header';
import { ClassSelectorBar } from './components/ClassSelectorBar';
import { QuestArena } from './components/QuestArena';
import { ManipulativeSandbox } from './components/ManipulativeSandbox';
import { BadgeDrawer } from './components/BadgeDrawer';
import { TeacherDashboard } from './components/TeacherDashboard';
import { ProfileModal } from './components/ProfileModal';
import { VictoryModal } from './components/VictoryModal';

export default function App() {
  const [profiles, setProfiles] = useState<StudentProfile[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<ClassId>('class_2');
  const [activeStudent, setActiveStudent] = useState<StudentProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<'quests' | 'sandbox' | 'badges' | 'classroom'>('quests');

  // Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [victoryState, setVictoryState] = useState<{
    isOpen: boolean;
    starsEarned: number;
    streak: number;
    encouragement: string;
  }>({
    isOpen: false,
    starsEarned: 0,
    streak: 0,
    encouragement: '',
  });

  // Sound toggle state
  const [isSoundOn, setIsSoundOn] = useState(true);

  // Load state on mount
  useEffect(() => {
    const loaded = storageService.loadProfiles();
    setProfiles(loaded);
    const savedClass = storageService.getSelectedClassId();
    setSelectedClassId(savedClass);
    const active = storageService.getActiveStudentForClass(savedClass);
    setActiveStudent(active);
    setIsSoundOn(soundManager.isSoundOn());
  }, []);

  const refreshAllProfiles = () => {
    const loaded = storageService.loadProfiles();
    setProfiles(loaded);
    const active = storageService.getActiveStudentForClass(selectedClassId);
    setActiveStudent(active);
  };

  // Prominent Class Switcher Handler
  const handleSelectClass = (newClassId: ClassId) => {
    setSelectedClassId(newClassId);
    storageService.setSelectedClassId(newClassId);
    const activeInNewClass = storageService.getActiveStudentForClass(newClassId);
    setActiveStudent(activeInNewClass);
    const all = storageService.loadProfiles();
    setProfiles(all);
  };

  const handleSelectStudent = (id: string) => {
    const student = profiles.find((p) => p.id === id);
    if (student) {
      storageService.setActiveStudentForClass(student.classId, id);
      setActiveStudent(student);
    }
  };

  const handleAddStudent = (name: string, avatar: string, classId: ClassId) => {
    const created = storageService.addStudent(name, avatar, classId);
    setActiveStudent(created);
    refreshAllProfiles();
  };

  const handleToggleSound = () => {
    const nextState = !isSoundOn;
    setIsSoundOn(nextState);
    soundManager.setSoundOn(nextState);
    if (nextState) {
      soundManager.playPop();
    }
  };

  // On Quest Success: Update stars, streak, level, badges, and show victory drawer
  const handleQuestSuccess = (realmId: RealmId, starsEarned: number, category: Quest['category']) => {
    if (!activeStudent) return;

    const newStreak = activeStudent.streak + 1;
    const newBestStreak = Math.max(activeStudent.bestStreak, newStreak);
    const newTotalStars = activeStudent.totalStars + starsEarned;
    const newQuestsCompleted = activeStudent.questsCompleted + 1;
    const newLevel = Math.max(1, Math.floor(newTotalStars / 15) + 1);

    // Update topic stats
    const currentTopicStat = activeStudent.topicStats[category] || {
      attempted: 0,
      correct: 0,
      starsEarned: 0,
    };
    const updatedTopicStat = {
      attempted: currentTopicStat.attempted + 1,
      correct: currentTopicStat.correct + 1,
      starsEarned: currentTopicStat.starsEarned + starsEarned,
    };

    // Calculate badges progress
    const updatedBadges = activeStudent.badges.map((b) => {
      let progress = b.progress;
      let unlocked = b.unlocked;

      if (b.id === 'first_leap') {
        progress = Math.min(b.max, progress + 1);
        if (progress >= b.max) unlocked = true;
      } else if (b.id === 'sun_fruit_gatherer' && realmId === 'surya') {
        progress = Math.min(b.max, progress + starsEarned);
        if (progress >= b.max) unlocked = true;
      } else if (b.id === 'streak_warrior') {
        progress = Math.max(progress, newStreak);
        if (progress >= b.max) unlocked = true;
      } else if (b.id === 'gada_master' && (category === 'addition' || category === 'subtraction')) {
        progress = Math.min(b.max, progress + 1);
        if (progress >= b.max) unlocked = true;
      } else if (b.id === 'mountain_lifter' && category === 'multiplication') {
        progress = Math.min(b.max, progress + 1);
        if (progress >= b.max) unlocked = true;
      } else if (b.id === 'ocean_architect' && (category === 'division' || category === 'fractions')) {
        progress = Math.min(b.max, progress + 1);
        if (progress >= b.max) unlocked = true;
      } else if (b.id === 'century_champion') {
        progress = Math.min(b.max, newTotalStars);
        if (progress >= b.max) unlocked = true;
      }

      return { ...b, progress, unlocked };
    });

    // Check newly unlocked realms
    const unlockedRealms = [...activeStudent.unlockedRealms];
    if (newTotalStars >= 10 && !unlockedRealms.includes('vayu')) unlockedRealms.push('vayu');
    if (newTotalStars >= 25 && !unlockedRealms.includes('dronagiri')) unlockedRealms.push('dronagiri');
    if (newTotalStars >= 45 && !unlockedRealms.includes('lanka')) unlockedRealms.push('lanka');

    const updatedStudent: StudentProfile = {
      ...activeStudent,
      totalStars: newTotalStars,
      streak: newStreak,
      bestStreak: newBestStreak,
      questsCompleted: newQuestsCompleted,
      level: newLevel,
      unlockedRealms,
      badges: updatedBadges,
      topicStats: {
        ...activeStudent.topicStats,
        [category]: updatedTopicStat,
      },
    };

    storageService.updateStudent(updatedStudent);
    setActiveStudent(updatedStudent);
    refreshAllProfiles();

    // Trigger victory modal
    const encouragements = [
      'Bal Hanuman flies higher with your magnificent math wisdom!',
      'Shandaar! Your mind is as swift as the divine wind!',
      'Bravo! The golden sun shines on your bravery!',
      'Spectacular work! You solved the celestial riddle with pure courage!',
      'Mighty arithmetic power! Bal Hanuman rejoices with you!',
    ];
    const pickedEncouragement =
      encouragements[Math.floor(Math.random() * encouragements.length)];

    setVictoryState({
      isOpen: true,
      starsEarned,
      streak: newStreak,
      encouragement: pickedEncouragement,
    });
  };

  // On Quest Fail: update streak to 0, record attempt
  const handleQuestFail = (_realmId: RealmId, category: Quest['category']) => {
    if (!activeStudent) return;

    const currentTopicStat = activeStudent.topicStats[category] || {
      attempted: 0,
      correct: 0,
      starsEarned: 0,
    };
    const updatedTopicStat = {
      ...currentTopicStat,
      attempted: currentTopicStat.attempted + 1,
    };

    const updatedStudent: StudentProfile = {
      ...activeStudent,
      streak: 0,
      topicStats: {
        ...activeStudent.topicStats,
        [category]: updatedTopicStat,
      },
    };

    storageService.updateStudent(updatedStudent);
    setActiveStudent(updatedStudent);
    refreshAllProfiles();
  };

  const classStudents = profiles.filter((p) => p.classId === selectedClassId);

  return (
    <div className="min-h-screen bg-[#fcf8ff] text-[#181445] flex flex-col font-sans selection:bg-orange-200 selection:text-orange-950">
      {/* 3-Zone Header Contract */}
      <Header
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeStudent={activeStudent}
        onOpenProfileSwitcher={() => setIsProfileModalOpen(true)}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
      />

      {/* Prominent Class Selection Bar on Main Dashboard */}
      <ClassSelectorBar
        selectedClassId={selectedClassId}
        onSelectClass={handleSelectClass}
        activeStudent={activeStudent}
        classStudentsCount={classStudents.length}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
      />

      {/* Main App Content View */}
      <main className="flex-1 pb-16">
        {currentTab === 'quests' && (
          <QuestArena
            activeStudent={activeStudent}
            selectedClassId={selectedClassId}
            onQuestSuccess={handleQuestSuccess}
            onQuestFail={handleQuestFail}
          />
        )}

        {currentTab === 'sandbox' && <ManipulativeSandbox />}

        {currentTab === 'badges' && <BadgeDrawer activeStudent={activeStudent} />}

        {currentTab === 'classroom' && (
          <TeacherDashboard
            profiles={profiles}
            selectedClassId={selectedClassId}
            onSelectClass={handleSelectClass}
            activeStudent={activeStudent}
            onRefreshProfiles={refreshAllProfiles}
            onSelectStudent={handleSelectStudent}
            onOpenAddModal={() => setIsProfileModalOpen(true)}
          />
        )}
      </main>

      {/* Student Profile Switcher Modal (Class-Isolated) */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profiles={profiles}
        selectedClassId={selectedClassId}
        onSelectClass={handleSelectClass}
        activeStudent={activeStudent}
        onSelectStudent={handleSelectStudent}
        onAddStudent={handleAddStudent}
        onOpenClassroomHub={() => {
          setIsProfileModalOpen(false);
          setCurrentTab('classroom');
        }}
      />

      {/* Victory Celebration Modal */}
      <VictoryModal
        isOpen={victoryState.isOpen}
        starsEarned={victoryState.starsEarned}
        streak={victoryState.streak}
        encouragement={victoryState.encouragement}
        onNext={() => {
          setVictoryState((prev) => ({ ...prev, isOpen: false }));
        }}
      />

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-purple-100 bg-white/70 text-center text-xs font-semibold text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🥭</span>
            <span>Bal Hanuman Math Magic Land • Educational Adventure for Ages 5–11</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Offline Multi-Profile Storage</span>
            <span>•</span>
            <span>Grade & Class Isolated Profiles</span>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('classroom')}
              className="text-purple-600 font-bold hover:underline cursor-pointer"
            >
              Teacher Reset Hub
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
