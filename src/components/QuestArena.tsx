import React, { useState, useEffect } from 'react';
import { Quest, RealmId, StudentProfile, InputMode, ClassId } from '../types';
import { REALMS, generateProceduralQuest } from '../data/quests';
import { CLASS_DEFINITIONS } from '../utils/storage';
import { HanumanMascot } from './HanumanMascot';
import { soundManager } from '../utils/audio';
import {
  Volume2,
  Sparkles,
  ShieldAlert,
  Flame,
  Delete,
  Send,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';

interface QuestArenaProps {
  activeStudent: StudentProfile | null;
  selectedClassId: ClassId;
  onQuestSuccess: (realmId: RealmId, starsEarned: number, category: Quest['category']) => void;
  onQuestFail: (realmId: RealmId, category: Quest['category']) => void;
}

export const QuestArena: React.FC<QuestArenaProps> = ({
  activeStudent,
  selectedClassId,
  onQuestSuccess,
  onQuestFail,
}) => {
  const [selectedRealm, setSelectedRealm] = useState<RealmId>('surya');
  const [currentQuestIndex, setCurrentQuestIndex] = useState<number>(0);
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);

  // Answering states
  const [inputMode, setInputMode] = useState<InputMode>('choices');
  const [keypadInput, setKeypadInput] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [usedGadaHint, setUsedGadaHint] = useState<boolean>(false);
  const [showHintText, setShowHintText] = useState<boolean>(false);

  // Click-to-count items state
  const [countedItemsA, setCountedItemsA] = useState<Set<number>>(new Set());
  const [countedItemsB, setCountedItemsB] = useState<Set<number>>(new Set());

  // Mascot pose
  const [mascotPose, setMascotPose] = useState<'idle' | 'thinking' | 'celebrating' | 'flying'>('idle');

  // Load or generate quest for current realm & selected class
  const loadNextQuest = (realmId: RealmId = selectedRealm) => {
    setKeypadInput('');
    setSelectedOption(null);
    setFeedbackState('idle');
    setEliminatedOptions([]);
    setUsedGadaHint(false);
    setShowHintText(false);
    setCountedItemsA(new Set());
    setCountedItemsB(new Set());
    setMascotPose('idle');

    // Generate procedural quest tailored specifically to the selected class
    const generated = generateProceduralQuest(realmId, selectedClassId, currentQuestIndex + 1);
    setCurrentQuest(generated);
  };

  useEffect(() => {
    loadNextQuest(selectedRealm);
  }, [selectedRealm, currentQuestIndex, selectedClassId]);

  // Read problem aloud
  const handleReadAloud = () => {
    if (!currentQuest) return;
    soundManager.speakText(
      `${currentQuest.story}. ${currentQuest.question}. What is ${currentQuest.expression}?`,
      () => setMascotPose('thinking'),
      () => setMascotPose('idle')
    );
  };

  // Submit answer
  const handleSubmitAnswer = (chosenAnswer: number) => {
    if (!currentQuest || feedbackState !== 'idle') return;

    if (chosenAnswer === currentQuest.correctAnswer) {
      // Victory!
      setFeedbackState('correct');
      setMascotPose('celebrating');
      const starsEarned = currentQuest.difficulty === 'hard' ? 5 : currentQuest.difficulty === 'medium' ? 3 : 2;
      onQuestSuccess(currentQuest.realmId, starsEarned, currentQuest.category);
    } else {
      // Wrong attempt
      soundManager.playGentleRetry();
      setFeedbackState('wrong');
      setMascotPose('thinking');
      onQuestFail(currentQuest.realmId, currentQuest.category);
      setTimeout(() => {
        setFeedbackState('idle');
        setSelectedOption(null);
        setKeypadInput('');
      }, 1500);
    }
  };

  // Multiple Choice click handler
  const handleOptionClick = (opt: number) => {
    if (eliminatedOptions.includes(opt) || feedbackState !== 'idle') return;
    soundManager.playPop();
    setSelectedOption(opt);
    handleSubmitAnswer(opt);
  };

  // Keypad click handler
  const handleKeypadPress = (val: string) => {
    soundManager.playPop();
    if (val === 'clear') {
      setKeypadInput('');
    } else if (val === 'backspace') {
      setKeypadInput((prev) => prev.slice(0, -1));
    } else if (val === 'submit') {
      const num = parseInt(keypadInput, 10);
      if (!isNaN(num)) {
        handleSubmitAnswer(num);
      }
    } else {
      if (keypadInput.length < 4) {
        setKeypadInput((prev) => prev + val);
      }
    }
  };

  // Divine Gada Power-up: eliminates up to 2 incorrect choices
  const handleUseGada = () => {
    if (!currentQuest || usedGadaHint) return;
    soundManager.playStarSparkle();
    setUsedGadaHint(true);
    setShowHintText(true);
    setMascotPose('flying');

    const wrongOptions = currentQuest.options.filter((o) => o !== currentQuest.correctAnswer);
    const toEliminate = wrongOptions.slice(0, Math.min(2, wrongOptions.length));
    setEliminatedOptions(toEliminate);

    setTimeout(() => {
      setMascotPose('idle');
    }, 1200);
  };

  // Countable item click
  const toggleCountItemA = (idx: number) => {
    soundManager.playPop();
    setCountedItemsA((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleCountItemB = (idx: number) => {
    soundManager.playPop();
    setCountedItemsB((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  if (!currentQuest) return null;

  const currentRealmMeta = REALMS[selectedRealm];

  const getVisualIcon = (type: Quest['visualType']) => {
    switch (type) {
      case 'mango':
        return '🥭';
      case 'sun':
        return '☀️';
      case 'herb':
        return '🌿';
      case 'gem':
        return '💎';
      case 'rock':
      default:
        return '🪨';
    }
  };

  const visualIcon = getVisualIcon(currentQuest.visualType);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Realm Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {(Object.keys(REALMS) as RealmId[]).map((realmKey) => {
          const r = REALMS[realmKey];
          const isSelected = selectedRealm === realmKey;
          return (
            <button
              key={r.id}
              onClick={() => {
                soundManager.playPop();
                setSelectedRealm(r.id);
                setCurrentQuestIndex(0);
              }}
              className={`p-3 sm:p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-2.5 sm:gap-3 ${
                isSelected
                  ? 'border-[#ff7a00] bg-orange-50/90 shadow-md ring-2 ring-orange-200'
                  : 'border-purple-100 bg-white hover:border-purple-200 hover:bg-purple-50/40'
              }`}
            >
              <div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0"
                style={{ backgroundColor: `${r.themeColor}15` }}
              >
                {r.icon}
              </div>
              <div className="overflow-hidden">
                <div className="font-extrabold text-[#181445] text-xs sm:text-sm truncate">
                  {r.name}
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-slate-500 truncate">
                  {r.badge}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Quest Playground Arena Card */}
      <div className="tactile-card p-5 sm:p-8 bg-gradient-to-b from-white via-white to-[#faf8ff] relative overflow-hidden">
        {/* Top Quest Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-purple-100">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-black text-[#181445] bg-purple-100 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ff7a00]"></span>
              {CLASS_DEFINITIONS[selectedClassId].label} • {currentRealmMeta.name} (Lvl {currentQuestIndex + 1})
            </span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden sm:inline">
              Category: {currentQuest.category.replace('_', ' ')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Read Aloud Button */}
            <button
              onClick={handleReadAloud}
              className="tactile-btn-white px-3.5 py-1.5 text-xs font-bold flex items-center gap-1.5 text-purple-800"
              title="Read math question aloud"
            >
              <Volume2 className="w-4 h-4 text-purple-600" />
              <span>Read Aloud</span>
            </button>

            {/* Input Mode Switcher (Choices vs Keypad) */}
            <div className="flex items-center p-1 bg-purple-50 rounded-xl border border-purple-200 text-xs font-bold">
              <button
                onClick={() => {
                  soundManager.playPop();
                  setInputMode('choices');
                }}
                className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                  inputMode === 'choices'
                    ? 'bg-white text-purple-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Choices
              </button>
              <button
                onClick={() => {
                  soundManager.playPop();
                  setInputMode('keypad');
                }}
                className={`px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                  inputMode === 'keypad'
                    ? 'bg-white text-purple-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Keypad
              </button>
            </div>
          </div>
        </div>

        {/* Narrative & Bal Hanuman Mascot Split */}
        <div className="py-6 flex flex-col md:flex-row items-center gap-6">
          {/* Mascot Container */}
          <div className="shrink-0 flex flex-col items-center">
            <HanumanMascot pose={mascotPose} size="lg" />
            <div className="text-[11px] font-extrabold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-full mt-1">
              Courage & Wisdom
            </div>
          </div>

          {/* Story Prompt Card */}
          <div className="flex-1 w-full text-center md:text-left space-y-3">
            <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200">
              <p className="text-xs sm:text-sm font-semibold text-amber-950 leading-relaxed">
                &ldquo;{currentQuest.story}&rdquo;
              </p>
              <h2 className="text-base sm:text-lg font-black text-[#181445] mt-2">
                {currentQuest.question}
              </h2>
            </div>

            {/* Interactive Manipulative Counters Area */}
            {currentQuest.visualCountA <= 30 && (
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200">
                <div className="flex items-center justify-between text-xs font-bold text-sky-900 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-sky-600" />
                    Touch or click items to count them!
                  </span>
                  <span className="text-slate-500">
                    Counted: {countedItemsA.size + countedItemsB.size}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  {/* Group A items */}
                  <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-white border border-sky-200 shadow-2xs">
                    {Array.from({ length: Math.min(20, currentQuest.visualCountA) }).map((_, i) => {
                      const isCounted = countedItemsA.has(i);
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => toggleCountItemA(i)}
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer relative ${
                            isCounted
                              ? 'bg-amber-200 border-2 border-amber-400 scale-105 shadow-xs'
                              : 'bg-slate-50 border border-slate-200 hover:bg-sky-100'
                          }`}
                          title={`Click to count (${i + 1})`}
                        >
                          <span>{visualIcon}</span>
                          {isCounted && (
                            <span className="absolute -top-1.5 -right-1.5 bg-[#ff7a00] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                              {i + 1}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Operator glyph */}
                  {currentQuest.visualOp && currentQuest.visualCountB && (
                    <span className="text-xl font-black text-slate-500 px-1">
                      {currentQuest.visualOp}
                    </span>
                  )}

                  {/* Group B items */}
                  {currentQuest.visualCountB && currentQuest.visualCountB <= 20 && (
                    <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-white border border-sky-200 shadow-2xs">
                      {Array.from({ length: Math.min(20, currentQuest.visualCountB) }).map((_, j) => {
                        const isCounted = countedItemsB.has(j);
                        return (
                          <button
                            key={j}
                            type="button"
                            onClick={() => toggleCountItemB(j)}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xl transition-all cursor-pointer relative ${
                              isCounted
                                ? 'bg-amber-200 border-2 border-amber-400 scale-105 shadow-xs'
                                : 'bg-slate-50 border border-slate-200 hover:bg-sky-100'
                            }`}
                            title={`Click to count (${j + 1})`}
                          >
                            <span>{visualIcon}</span>
                            {isCounted && (
                              <span className="absolute -top-1.5 -right-1.5 bg-[#00b4d8] text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                                {j + 1}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Big Mathematical Expression Banner */}
        <div className="my-4 py-4 px-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-amber-300 text-center">
          <div className="text-3xl sm:text-5xl font-black tracking-tight text-[#181445] flex items-center justify-center gap-3">
            <span>{currentQuest.expression.split('=')[0]}</span>
            <span className="text-amber-600">=</span>
            <span className="text-[#ff7a00] underline decoration-wavy decoration-amber-400">
              {inputMode === 'keypad' && keypadInput ? keypadInput : '?'}
            </span>
          </div>
        </div>

        {/* Feedback message strip */}
        {feedbackState === 'wrong' && (
          <div className="p-3 mb-4 rounded-2xl bg-red-100 text-red-900 border-2 border-red-300 text-center font-extrabold text-sm animate-shake">
            Almost there! Count the items carefully and try once more!
          </div>
        )}

        {/* Answering Controls */}
        {inputMode === 'choices' ? (
          /* Mode A: 4 Chunky Multiple Choice Option Tiles */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
            {currentQuest.options.map((opt, idx) => {
              const isEliminated = eliminatedOptions.includes(opt);
              const isSelected = selectedOption === opt;
              const isCorrect = isSelected && feedbackState === 'correct';
              const isWrong = isSelected && feedbackState === 'wrong';

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(opt)}
                  disabled={isEliminated || feedbackState !== 'idle'}
                  className={`tactile-option-tile py-5 sm:py-6 text-2xl sm:text-3xl font-black flex items-center justify-center relative ${
                    isCorrect
                      ? 'tactile-option-correct'
                      : isWrong
                      ? 'tactile-option-wrong'
                      : isEliminated
                      ? 'opacity-30 pointer-events-none line-through bg-slate-100 border-slate-300'
                      : ''
                  }`}
                >
                  <span className="tabular-nums">{opt}</span>
                  {isEliminated && (
                    <span className="absolute top-2 right-2 text-xs font-bold text-slate-400">
                      Eliminated
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* Mode B: Gamified On-Screen Number Keypad */
          <div className="max-w-xs mx-auto mt-4 space-y-3">
            {/* Keypad Display Box */}
            <div className="p-3 bg-white rounded-2xl border-2 border-purple-200 text-center">
              <span className="text-3xl font-black text-[#181445] tracking-widest tabular-nums">
                {keypadInput || '—'}
              </span>
            </div>

            {/* 10-key touch pad */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  onClick={() => handleKeypadPress(String(n))}
                  className="tactile-keypad-key"
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => handleKeypadPress('clear')}
                className="tactile-keypad-key text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100"
              >
                CLEAR
              </button>
              <button
                onClick={() => handleKeypadPress('0')}
                className="tactile-keypad-key"
              >
                0
              </button>
              <button
                onClick={() => handleKeypadPress('backspace')}
                className="tactile-keypad-key text-slate-600 bg-slate-50 hover:bg-slate-100"
                title="Backspace"
              >
                <Delete className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => handleKeypadPress('submit')}
              disabled={!keypadInput}
              className="tactile-btn-primary w-full py-3 text-base font-black flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Submit Answer</span>
            </button>
          </div>
        )}

        {/* Quest Action Footer: Divine Gada Power-up & Hint */}
        <div className="pt-6 mt-6 border-t border-purple-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleUseGada}
              disabled={usedGadaHint}
              className={`tactile-btn-gold px-4 py-2 text-xs flex items-center gap-1.5 shadow-sm ${
                usedGadaHint ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title="Strike away wrong choices with Hanuman's Gada"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>{usedGadaHint ? 'Gada Used' : 'Divine Gada Hint'}</span>
            </button>

            <button
              onClick={() => {
                soundManager.playPop();
                setShowHintText((prev) => !prev);
              }}
              className="tactile-btn-white px-3.5 py-2 text-xs font-bold flex items-center gap-1.5 text-slate-700"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{showHintText ? 'Hide Hint' : 'Show Hint'}</span>
            </button>
          </div>

          {/* Skip / Next Quest Button */}
          <button
            onClick={() => {
              soundManager.playPop();
              setCurrentQuestIndex((prev) => prev + 1);
            }}
            className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer underline"
          >
            Skip to Next Quest →
          </button>
        </div>

        {/* Revealed Hint Box */}
        {showHintText && (
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs font-bold text-amber-950 flex items-start gap-2.5 animate-in fade-in">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="block font-black text-amber-900 mb-0.5">Hanuman&apos;s Wisdom Hint:</span>
              <span>{currentQuest.hint}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
