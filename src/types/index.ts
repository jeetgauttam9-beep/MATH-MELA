export type ClassId = 'class_1' | 'class_2' | 'class_3' | 'class_4' | 'class_5';

export interface ClassDefinition {
  id: ClassId;
  label: string; // "Class 1", "Class 2", "Class 3", "Class 4", "Class 5"
  name: string; // "Class 1: Sun Explorers"
  gradeName: string; // "Grade 1"
  ageGroup: string; // "Age 5-6"
  curriculumSummary: string;
  badge: string;
  color: string;
  bgGradient: string;
}

export type GradeLevel = 'K-1' | '2-3' | '4-5';

export type RealmId = 'surya' | 'vayu' | 'dronagiri' | 'lanka';

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  max: number;
}

export interface TopicStat {
  attempted: number;
  correct: number;
  starsEarned: number;
}

export interface QuestHistoryEntry {
  id: string;
  timestamp: string;
  realmId: RealmId;
  question: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  starsEarned: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  avatar: string; // 'hanuman' | 'gada' | 'sun' | 'mountain' | 'lotus' | 'peacock' | 'lion' | 'cloud'
  classId: ClassId;
  className: string;
  grade: GradeLevel;
  classroom: string;
  totalStars: number;
  streak: number;
  bestStreak: number;
  questsCompleted: number;
  level: number;
  unlockedRealms: RealmId[];
  badges: Badge[];
  topicStats: {
    addition: TopicStat;
    subtraction: TopicStat;
    multiplication: TopicStat;
    division: TopicStat;
    fractions: TopicStat;
    word_problem: TopicStat;
  };
  history: QuestHistoryEntry[];
  createdAt: string;
  lastActive: string;
}

export interface ClassroomGroup {
  id: string;
  classId: ClassId;
  name: string;
  grade: GradeLevel;
}

export interface Quest {
  id: string;
  realmId: RealmId;
  realmTitle: string;
  level: number;
  title: string;
  story: string;
  question: string;
  expression: string;
  options: number[];
  correctAnswer: number;
  category: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'fractions' | 'word_problem';
  difficulty: 'easy' | 'medium' | 'hard';
  visualType: 'mango' | 'sun' | 'herb' | 'rock' | 'gem';
  visualCountA: number;
  visualCountB?: number;
  visualOp?: '+' | '-' | '×' | '÷';
  hint: string;
  encouragement: string;
}

export type InputMode = 'choices' | 'keypad';
