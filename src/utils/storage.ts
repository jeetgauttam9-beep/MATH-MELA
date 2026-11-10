import { StudentProfile, Badge, ClassId, ClassDefinition, RealmId } from '../types';

const STORAGE_PROFILES_KEY = 'bal_hanuman_classroom_profiles_v3';
const STORAGE_SELECTED_CLASS_KEY = 'bal_hanuman_selected_class_v3';
const STORAGE_ACTIVE_STUDENT_PER_CLASS_PREFIX = 'bal_hanuman_active_student_class_';

export const CLASS_DEFINITIONS: Record<ClassId, ClassDefinition> = {
  class_1: {
    id: 'class_1',
    label: 'Class 1',
    name: 'Class 1: Sun Explorers',
    gradeName: 'Grade 1',
    ageGroup: 'Ages 5–6',
    curriculumSummary: 'Counting 1–20, Single-Digit Addition, Number Bonds & Visual Counters',
    badge: '☀️ Sun Leapers',
    color: '#ff7a00',
    bgGradient: 'from-orange-500/15 via-amber-500/10 to-yellow-500/5',
  },
  class_2: {
    id: 'class_2',
    label: 'Class 2',
    name: 'Class 2: Cloud Leapers',
    gradeName: 'Grade 2',
    ageGroup: 'Ages 6–7',
    curriculumSummary: '2-Digit Addition & Subtraction, Missing Addends & Skip Counting',
    badge: '💨 Cloud Navigators',
    color: '#00b4d8',
    bgGradient: 'from-sky-500/15 via-cyan-500/10 to-blue-500/5',
  },
  class_3: {
    id: 'class_3',
    label: 'Class 3',
    name: 'Class 3: Mountain Giants',
    gradeName: 'Grade 3',
    ageGroup: 'Ages 7–8',
    curriculumSummary: 'Times Tables (2–9), Equal Sharing Division, Regrouping & Arrays',
    badge: '⛰️ Mountain Lifters',
    color: '#10b981',
    bgGradient: 'from-emerald-500/15 via-teal-500/10 to-green-500/5',
  },
  class_4: {
    id: 'class_4',
    label: 'Class 4',
    name: 'Class 4: Ocean Voyagers',
    gradeName: 'Grade 4',
    ageGroup: 'Ages 8–9',
    curriculumSummary: 'Multi-Digit Multiplication, Division Tables, Basic Fractions & Remainders',
    badge: '🌊 Ocean Masters',
    color: '#6366f1',
    bgGradient: 'from-indigo-500/15 via-blue-500/10 to-violet-500/5',
  },
  class_5: {
    id: 'class_5',
    label: 'Class 5',
    name: 'Class 5: Celestial Champions',
    gradeName: 'Grade 5',
    ageGroup: 'Ages 9–11',
    curriculumSummary: 'Long Division, Equivalent Fractions, Mixed Operations & Decimals',
    badge: '👑 Cosmic Champions',
    color: '#8b5cf6',
    bgGradient: 'from-purple-500/15 via-fuchsia-500/10 to-pink-500/5',
  },
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_leap',
    title: 'First Cosmic Leap',
    description: 'Complete your first math quest with courage',
    icon: '⚡',
    unlocked: false,
    progress: 0,
    max: 1,
  },
  {
    id: 'sun_fruit_gatherer',
    title: 'Sun Fruit Gatherer',
    description: 'Gather 10 golden stars in Surya Loka',
    icon: '🥭',
    unlocked: false,
    progress: 0,
    max: 10,
  },
  {
    id: 'streak_warrior',
    title: 'Bravery Streak',
    description: 'Achieve a continuous 5-question answer streak',
    icon: '🔥',
    unlocked: false,
    progress: 0,
    max: 5,
  },
  {
    id: 'gada_master',
    title: 'Gada of Wisdom',
    description: 'Solve 20 addition or subtraction problems correctly',
    icon: '🛡️',
    unlocked: false,
    progress: 0,
    max: 20,
  },
  {
    id: 'mountain_lifter',
    title: 'Mountain Lifter',
    description: 'Conquer Dronagiri Peak with 10 multiplication wins',
    icon: '⛰️',
    unlocked: false,
    progress: 0,
    max: 10,
  },
  {
    id: 'ocean_architect',
    title: 'Ocean Bridge Builder',
    description: 'Master floating rock division and fractions',
    icon: '🌊',
    unlocked: false,
    progress: 0,
    max: 10,
  },
  {
    id: 'century_champion',
    title: 'Century Champion',
    description: 'Earn 100 shining celestial stars',
    icon: '👑',
    unlocked: false,
    progress: 0,
    max: 100,
  },
];

// Helper to create blank/starter stats
const createInitialStats = () => ({
  addition: { attempted: 0, correct: 0, starsEarned: 0 },
  subtraction: { attempted: 0, correct: 0, starsEarned: 0 },
  multiplication: { attempted: 0, correct: 0, starsEarned: 0 },
  division: { attempted: 0, correct: 0, starsEarned: 0 },
  fractions: { attempted: 0, correct: 0, starsEarned: 0 },
  word_problem: { attempted: 0, correct: 0, starsEarned: 0 },
});

export const INITIAL_STUDENTS: StudentProfile[] = [
  // Class 1 Students
  {
    id: 'std_c1_aarav',
    name: 'Aarav',
    avatar: 'hanuman',
    classId: 'class_1',
    className: 'Class 1: Sun Explorers',
    grade: 'K-1',
    classroom: 'Class 1',
    totalStars: 42,
    streak: 3,
    bestStreak: 6,
    questsCompleted: 18,
    level: 3,
    unlockedRealms: ['surya', 'vayu'],
    badges: INITIAL_BADGES.map((b) =>
      b.id === 'first_leap'
        ? { ...b, unlocked: true, progress: 1 }
        : b.id === 'sun_fruit_gatherer'
        ? { ...b, unlocked: true, progress: 10 }
        : { ...b }
    ),
    topicStats: {
      addition: { attempted: 12, correct: 11, starsEarned: 26 },
      subtraction: { attempted: 6, correct: 5, starsEarned: 12 },
      multiplication: { attempted: 0, correct: 0, starsEarned: 0 },
      division: { attempted: 0, correct: 0, starsEarned: 0 },
      fractions: { attempted: 0, correct: 0, starsEarned: 0 },
      word_problem: { attempted: 2, correct: 2, starsEarned: 4 },
    },
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 'std_c1_priya',
    name: 'Priya',
    avatar: 'lotus',
    classId: 'class_1',
    className: 'Class 1: Sun Explorers',
    grade: 'K-1',
    classroom: 'Class 1',
    totalStars: 28,
    streak: 4,
    bestStreak: 5,
    questsCompleted: 12,
    level: 2,
    unlockedRealms: ['surya'],
    badges: INITIAL_BADGES.map((b) =>
      b.id === 'first_leap' ? { ...b, unlocked: true, progress: 1 } : { ...b }
    ),
    topicStats: {
      addition: { attempted: 10, correct: 9, starsEarned: 22 },
      subtraction: { attempted: 3, correct: 2, starsEarned: 6 },
      multiplication: { attempted: 0, correct: 0, starsEarned: 0 },
      division: { attempted: 0, correct: 0, starsEarned: 0 },
      fractions: { attempted: 0, correct: 0, starsEarned: 0 },
      word_problem: { attempted: 0, correct: 0, starsEarned: 0 },
    },
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 'std_c1_kabir',
    name: 'Kabir',
    avatar: 'sun',
    classId: 'class_1',
    className: 'Class 1: Sun Explorers',
    grade: 'K-1',
    classroom: 'Class 1',
    totalStars: 18,
    streak: 2,
    bestStreak: 4,
    questsCompleted: 8,
    level: 2,
    unlockedRealms: ['surya'],
    badges: INITIAL_BADGES.map((b) =>
      b.id === 'first_leap' ? { ...b, unlocked: true, progress: 1 } : { ...b }
    ),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    lastActive: new Date().toISOString(),
  },

  // Class 2 Students
  {
    id: 'std_c2_ananya',
    name: 'Ananya',
    avatar: 'peacock',
    classId: 'class_2',
    className: 'Class 2: Cloud Leapers',
    grade: '2-3',
    classroom: 'Class 2',
    totalStars: 58,
    streak: 5,
    bestStreak: 7,
    questsCompleted: 26,
    level: 4,
    unlockedRealms: ['surya', 'vayu', 'dronagiri'],
    badges: INITIAL_BADGES.map((b) =>
      ['first_leap', 'sun_fruit_gatherer', 'streak_warrior'].includes(b.id)
        ? { ...b, unlocked: true, progress: b.max }
        : { ...b }
    ),
    topicStats: {
      addition: { attempted: 14, correct: 13, starsEarned: 28 },
      subtraction: { attempted: 12, correct: 11, starsEarned: 24 },
      multiplication: { attempted: 4, correct: 3, starsEarned: 6 },
      division: { attempted: 0, correct: 0, starsEarned: 0 },
      fractions: { attempted: 0, correct: 0, starsEarned: 0 },
      word_problem: { attempted: 2, correct: 2, starsEarned: 4 },
    },
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 'std_c2_rohan',
    name: 'Rohan',
    avatar: 'gada',
    classId: 'class_2',
    className: 'Class 2: Cloud Leapers',
    grade: '2-3',
    classroom: 'Class 2',
    totalStars: 46,
    streak: 3,
    bestStreak: 5,
    questsCompleted: 20,
    level: 4,
    unlockedRealms: ['surya', 'vayu', 'dronagiri'],
    badges: INITIAL_BADGES.map((b) =>
      ['first_leap', 'sun_fruit_gatherer'].includes(b.id)
        ? { ...b, unlocked: true, progress: b.max }
        : { ...b }
    ),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 'std_c2_vihaan',
    name: 'Vihaan',
    avatar: 'cloud',
    classId: 'class_2',
    className: 'Class 2: Cloud Leapers',
    grade: '2-3',
    classroom: 'Class 2',
    totalStars: 32,
    streak: 2,
    bestStreak: 4,
    questsCompleted: 14,
    level: 3,
    unlockedRealms: ['surya', 'vayu'],
    badges: INITIAL_BADGES.map((b) =>
      b.id === 'first_leap' ? { ...b, unlocked: true, progress: 1 } : { ...b }
    ),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastActive: new Date().toISOString(),
  },

  // Class 3 Students
  {
    id: 'std_c3_dev',
    name: 'Dev',
    avatar: 'lion',
    classId: 'class_3',
    className: 'Class 3: Mountain Giants',
    grade: '2-3',
    classroom: 'Class 3',
    totalStars: 82,
    streak: 6,
    bestStreak: 8,
    questsCompleted: 38,
    level: 6,
    unlockedRealms: ['surya', 'vayu', 'dronagiri'],
    badges: INITIAL_BADGES.map((b) =>
      ['first_leap', 'sun_fruit_gatherer', 'streak_warrior', 'mountain_lifter'].includes(b.id)
        ? { ...b, unlocked: true, progress: b.max }
        : { ...b }
    ),
    topicStats: {
      addition: { attempted: 12, correct: 12, starsEarned: 28 },
      subtraction: { attempted: 10, correct: 9, starsEarned: 20 },
      multiplication: { attempted: 14, correct: 13, starsEarned: 32 },
      division: { attempted: 4, correct: 3, starsEarned: 6 },
      fractions: { attempted: 0, correct: 0, starsEarned: 0 },
      word_problem: { attempted: 4, correct: 4, starsEarned: 8 },
    },
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 'std_c3_zara',
    name: 'Zara',
    avatar: 'sun',
    classId: 'class_3',
    className: 'Class 3: Mountain Giants',
    grade: '2-3',
    classroom: 'Class 3',
    totalStars: 95,
    streak: 8,
    bestStreak: 11,
    questsCompleted: 44,
    level: 7,
    unlockedRealms: ['surya', 'vayu', 'dronagiri', 'lanka'],
    badges: INITIAL_BADGES.map((b) =>
      ['first_leap', 'sun_fruit_gatherer', 'streak_warrior', 'gada_master'].includes(b.id)
        ? { ...b, unlocked: true, progress: b.max }
        : { ...b }
    ),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 'std_c3_meera',
    name: 'Meera',
    avatar: 'lotus',
    classId: 'class_3',
    className: 'Class 3: Mountain Giants',
    grade: '2-3',
    classroom: 'Class 3',
    totalStars: 64,
    streak: 4,
    bestStreak: 7,
    questsCompleted: 28,
    level: 5,
    unlockedRealms: ['surya', 'vayu', 'dronagiri'],
    badges: INITIAL_BADGES.map((b) =>
      ['first_leap', 'sun_fruit_gatherer'].includes(b.id)
        ? { ...b, unlocked: true, progress: b.max }
        : { ...b }
    ),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    lastActive: new Date().toISOString(),
  },

  // Class 4 Students
  {
    id: 'std_c4_arjun',
    name: 'Arjun',
    avatar: 'hanuman',
    classId: 'class_4',
    className: 'Class 4: Ocean Voyagers',
    grade: '4-5',
    classroom: 'Class 4',
    totalStars: 104,
    streak: 7,
    bestStreak: 10,
    questsCompleted: 48,
    level: 7,
    unlockedRealms: ['surya', 'vayu', 'dronagiri', 'lanka'],
    badges: INITIAL_BADGES.map((b) =>
      ['first_leap', 'sun_fruit_gatherer', 'streak_warrior', 'ocean_architect', 'century_champion'].includes(b.id)
        ? { ...b, unlocked: true, progress: b.max }
        : { ...b }
    ),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 'std_c4_diya',
    name: 'Diya',
    avatar: 'gada',
    classId: 'class_4',
    className: 'Class 4: Ocean Voyagers',
    grade: '4-5',
    classroom: 'Class 4',
    totalStars: 88,
    streak: 5,
    bestStreak: 9,
    questsCompleted: 40,
    level: 6,
    unlockedRealms: ['surya', 'vayu', 'dronagiri', 'lanka'],
    badges: INITIAL_BADGES.map((b) =>
      ['first_leap', 'sun_fruit_gatherer', 'streak_warrior'].includes(b.id)
        ? { ...b, unlocked: true, progress: b.max }
        : { ...b }
    ),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    lastActive: new Date().toISOString(),
  },

  // Class 5 Students
  {
    id: 'std_c5_aryan',
    name: 'Aryan',
    avatar: 'lion',
    classId: 'class_5',
    className: 'Class 5: Celestial Champions',
    grade: '4-5',
    classroom: 'Class 5',
    totalStars: 142,
    streak: 9,
    bestStreak: 14,
    questsCompleted: 62,
    level: 9,
    unlockedRealms: ['surya', 'vayu', 'dronagiri', 'lanka'],
    badges: INITIAL_BADGES.map((b) => ({ ...b, unlocked: true, progress: b.max })),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    lastActive: new Date().toISOString(),
  },
  {
    id: 'std_c5_tanvi',
    name: 'Tanvi',
    avatar: 'peacock',
    classId: 'class_5',
    className: 'Class 5: Celestial Champions',
    grade: '4-5',
    classroom: 'Class 5',
    totalStars: 128,
    streak: 8,
    bestStreak: 12,
    questsCompleted: 56,
    level: 8,
    unlockedRealms: ['surya', 'vayu', 'dronagiri', 'lanka'],
    badges: INITIAL_BADGES.map((b) => ({ ...b, unlocked: true, progress: b.max })),
    topicStats: createInitialStats(),
    history: [],
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    lastActive: new Date().toISOString(),
  },
];

// Offline Storage Service
export const storageService = {
  loadProfiles(): StudentProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_PROFILES_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Normalize legacy entries if missing classId
          return parsed.map((p: any) => {
            if (!p.classId) {
              const guessedClass: ClassId =
                p.grade === 'K-1' ? 'class_1' : p.grade === '4-5' ? 'class_4' : 'class_2';
              return {
                ...p,
                classId: guessedClass,
                className: CLASS_DEFINITIONS[guessedClass].name,
              };
            }
            return p;
          });
        }
      }
    } catch (e) {
      console.warn('Failed to parse profiles, restoring defaults', e);
    }
    this.saveProfiles(INITIAL_STUDENTS);
    return INITIAL_STUDENTS;
  },

  saveProfiles(profiles: StudentProfile[]) {
    try {
      localStorage.setItem(STORAGE_PROFILES_KEY, JSON.stringify(profiles));
    } catch (e) {
      console.error('Failed to save profiles', e);
    }
  },

  // Current selected class in dashboard
  getSelectedClassId(): ClassId {
    try {
      const saved = localStorage.getItem(STORAGE_SELECTED_CLASS_KEY);
      if (saved && (saved in CLASS_DEFINITIONS)) {
        return saved as ClassId;
      }
    } catch {}
    return 'class_2'; // Default to Class 2
  },

  setSelectedClassId(classId: ClassId) {
    try {
      localStorage.setItem(STORAGE_SELECTED_CLASS_KEY, classId);
    } catch {}
  },

  // Retrieve profiles ONLY for the specified class
  getProfilesForClass(classId: ClassId): StudentProfile[] {
    const all = this.loadProfiles();
    return all.filter((p) => p.classId === classId);
  },

  // Get active student specifically for a class
  getActiveStudentForClass(classId: ClassId): StudentProfile | null {
    const classProfiles = this.getProfilesForClass(classId);
    if (classProfiles.length === 0) return null;

    try {
      const savedId = localStorage.getItem(STORAGE_ACTIVE_STUDENT_PER_CLASS_PREFIX + classId);
      if (savedId) {
        const found = classProfiles.find((p) => p.id === savedId);
        if (found) return found;
      }
    } catch {}

    const first = classProfiles[0];
    this.setActiveStudentForClass(classId, first.id);
    return first;
  },

  setActiveStudentForClass(classId: ClassId, studentId: string) {
    try {
      localStorage.setItem(STORAGE_ACTIVE_STUDENT_PER_CLASS_PREFIX + classId, studentId);
    } catch {}
  },

  // Add a new student specifically assigned to classId
  addStudent(name: string, avatar: string, classId: ClassId): StudentProfile {
    const profiles = this.loadProfiles();
    const classDef = CLASS_DEFINITIONS[classId];

    const gradeMap: Record<ClassId, 'K-1' | '2-3' | '4-5'> = {
      class_1: 'K-1',
      class_2: '2-3',
      class_3: '2-3',
      class_4: '4-5',
      class_5: '4-5',
    };

    const newStudent: StudentProfile = {
      id: `std_${classId}_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
      name: name.trim(),
      avatar: avatar || 'hanuman',
      classId,
      className: classDef.name,
      grade: gradeMap[classId],
      classroom: classDef.label,
      totalStars: 0,
      streak: 0,
      bestStreak: 0,
      questsCompleted: 0,
      level: 1,
      unlockedRealms: ['surya'],
      badges: INITIAL_BADGES.map((b) => ({ ...b })),
      topicStats: createInitialStats(),
      history: [],
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    const updated = [...profiles, newStudent];
    this.saveProfiles(updated);
    this.setActiveStudentForClass(classId, newStudent.id);
    return newStudent;
  },

  updateStudent(student: StudentProfile) {
    const profiles = this.loadProfiles();
    const updated = profiles.map((p) =>
      p.id === student.id ? { ...student, lastActive: new Date().toISOString() } : p
    );
    this.saveProfiles(updated);
  },

  deleteStudent(id: string) {
    const profiles = this.loadProfiles();
    const target = profiles.find((p) => p.id === id);
    const filtered = profiles.filter((p) => p.id !== id);
    this.saveProfiles(filtered);

    if (target) {
      const remainingInClass = filtered.filter((p) => p.classId === target.classId);
      if (remainingInClass.length > 0) {
        this.setActiveStudentForClass(target.classId, remainingInClass[0].id);
      }
    }
  },

  // Reset a specific student's progress back to level 1 with 0 stars
  resetStudentProgress(id: string): StudentProfile | null {
    const profiles = this.loadProfiles();
    let updatedProfile: StudentProfile | null = null;
    const updated = profiles.map((p) => {
      if (p.id === id) {
        updatedProfile = {
          ...p,
          totalStars: 0,
          streak: 0,
          bestStreak: 0,
          questsCompleted: 0,
          level: 1,
          unlockedRealms: ['surya'] as RealmId[],
          badges: INITIAL_BADGES.map((b) => ({ ...b })),
          topicStats: createInitialStats(),
          history: [],
          lastActive: new Date().toISOString(),
        };
        return updatedProfile;
      }
      return p;
    });

    this.saveProfiles(updated);
    return updatedProfile;
  },

  // Reset ONLY students in the specified class
  resetClassProgress(classId: ClassId) {
    const profiles = this.loadProfiles();
    const updated = profiles.map((p) => {
      if (p.classId === classId) {
        return {
          ...p,
          totalStars: 0,
          streak: 0,
          bestStreak: 0,
          questsCompleted: 0,
          level: 1,
          unlockedRealms: ['surya'] as RealmId[],
          badges: INITIAL_BADGES.map((b) => ({ ...b })),
          topicStats: createInitialStats(),
          history: [],
          lastActive: new Date().toISOString(),
        };
      }
      return p;
    });
    this.saveProfiles(updated);
  },

  // Complete local data reset for the entire classroom dataset
  resetAllClassroomData() {
    try {
      localStorage.removeItem(STORAGE_PROFILES_KEY);
      localStorage.removeItem(STORAGE_SELECTED_CLASS_KEY);
      this.saveProfiles(INITIAL_STUDENTS);
      this.setSelectedClassId('class_2');
    } catch (e) {
      console.error('Failed to reset classroom data', e);
    }
  },

  // Export full classroom state to JSON
  exportClassroomJson(): string {
    const profiles = this.loadProfiles();
    const payload = {
      app: 'Bal Hanuman Math Magic Land',
      version: '3.0',
      exportedAt: new Date().toISOString(),
      studentCount: profiles.length,
      selectedClass: this.getSelectedClassId(),
      profiles,
    };
    return JSON.stringify(payload, null, 2);
  },

  // Import classroom state from JSON file
  importClassroomJson(jsonStr: string): { success: boolean; count?: number; error?: string } {
    try {
      const data = JSON.parse(jsonStr);
      if (!data || !Array.isArray(data.profiles) || data.profiles.length === 0) {
        return { success: false, error: 'Invalid file format. No student profiles found.' };
      }
      const validProfiles = data.profiles.filter(
        (p: StudentProfile) => p && typeof p.name === 'string' && typeof p.id === 'string'
      );
      if (validProfiles.length === 0) {
        return { success: false, error: 'Profiles did not match the expected student format.' };
      }
      this.saveProfiles(validProfiles);
      if (data.selectedClass && data.selectedClass in CLASS_DEFINITIONS) {
        this.setSelectedClassId(data.selectedClass);
      }
      return { success: true, count: validProfiles.length };
    } catch {
      return { success: false, error: 'Could not read file. Please ensure it is valid JSON.' };
    }
  },
};
