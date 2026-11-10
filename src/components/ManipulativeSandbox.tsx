import React, { useState } from 'react';
import { soundManager } from '../utils/audio';
import { Plus, Minus, RotateCcw, Scale, Grid } from 'lucide-react';

type ItemType = 'mango' | 'herb' | 'gem' | 'rock' | 'sun';

const ITEM_TYPES: { id: ItemType; label: string; icon: string; color: string }[] = [
  { id: 'mango', label: 'Sun Mango', icon: '🥭', color: 'bg-orange-100 border-orange-300 text-orange-800' },
  { id: 'herb', label: 'Sanjeevani Leaf', icon: '🌿', color: 'bg-emerald-100 border-emerald-300 text-emerald-800' },
  { id: 'gem', label: 'Wind Pearl', icon: '💎', color: 'bg-sky-100 border-sky-300 text-sky-800' },
  { id: 'rock', label: 'Ocean Stone', icon: '🪨', color: 'bg-indigo-100 border-indigo-300 text-indigo-800' },
  { id: 'sun', label: 'Solar Ray', icon: '☀️', color: 'bg-amber-100 border-amber-300 text-amber-800' },
];

export const ManipulativeSandbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'balance' | 'array'>('balance');
  const [selectedItem, setSelectedItem] = useState<ItemType>('mango');

  // Balance scale state
  const [leftCount, setLeftCount] = useState<number>(5);
  const [rightCount, setRightCount] = useState<number>(3);

  // Array visualizer state
  const [arrayRows, setArrayRows] = useState<number>(3);
  const [arrayCols, setArrayCols] = useState<number>(4);

  const currentItemMeta = ITEM_TYPES.find((i) => i.id === selectedItem) || ITEM_TYPES[0];

  // Calculate tilt for scale (-15 deg to +15 deg)
  const diff = rightCount - leftCount;
  const tiltDeg = Math.max(-14, Math.min(14, diff * 2.5));
  const isBalanced = leftCount === rightCount && leftCount > 0;

  const handleAddLeft = () => {
    soundManager.playPop();
    setLeftCount((prev) => Math.min(25, prev + 1));
  };
  const handleRemoveLeft = () => {
    soundManager.playPop();
    setLeftCount((prev) => Math.max(0, prev - 1));
  };

  const handleAddRight = () => {
    soundManager.playPop();
    setRightCount((prev) => Math.min(25, prev + 1));
  };
  const handleRemoveRight = () => {
    soundManager.playPop();
    setRightCount((prev) => Math.max(0, prev - 1));
  };

  const handleResetScale = () => {
    soundManager.playPop();
    setLeftCount(0);
    setRightCount(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-sky-500/10 via-amber-500/10 to-orange-500/10 rounded-3xl border-2 border-sky-200 shadow-sm">
        <div>
          <div className="text-xs font-bold text-sky-700 tracking-wider uppercase mb-1">
            Hands-on Mathematical Exploration
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#181445]">
            Divine Math Lab & Manipulatives
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
            Explore equality with Bal Hanuman’s golden balance scale, or build visual multiplication
            arrays using sacred celestial items.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border-2 border-purple-200 shadow-xs">
          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('balance');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'balance'
                ? 'bg-[#00b4d8] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4" /> Divine Balance Scale
          </button>
          <button
            onClick={() => {
              soundManager.playPop();
              setActiveTab('array');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'array'
                ? 'bg-[#ff7a00] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Grid className="w-4 h-4" /> Array Grid Builder
          </button>
        </div>
      </div>

      {/* Item Chooser Bar */}
      <div className="tactile-card p-4 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
          Select Sacred Manipulative:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {ITEM_TYPES.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playPop();
                setSelectedItem(item.id);
              }}
              className={`px-3 py-1.5 rounded-xl border-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                selectedItem === item.id
                  ? 'border-purple-600 bg-purple-50 text-purple-900 shadow-xs scale-105'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1: BALANCE SCALE */}
      {activeTab === 'balance' && (
        <div className="tactile-card p-6 sm:p-8 space-y-8 bg-gradient-to-b from-white to-[#faf8ff]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black text-[#181445]">Celestial Equilibrium Scale</h2>
              <p className="text-xs text-slate-500">
                Add or remove items to balance both pans! Learn equations: {leftCount} = {rightCount}
              </p>
            </div>
            <button
              onClick={handleResetScale}
              className="tactile-btn-white px-3 py-1.5 text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Clear Pans
            </button>
          </div>

          {/* Balance Status Banner */}
          <div
            className={`p-3.5 rounded-2xl border-2 text-center text-sm font-black transition-all ${
              isBalanced
                ? 'bg-emerald-50 text-emerald-800 border-emerald-400 shadow-sm animate-pulse'
                : 'bg-amber-50 text-amber-900 border-amber-300'
            }`}
          >
            {isBalanced ? (
              <span className="flex items-center justify-center gap-2 text-base">
                ✨ Perfect Balance! {leftCount} {currentItemMeta.label}s = {rightCount} {currentItemMeta.label}s! ✨
              </span>
            ) : leftCount > rightCount ? (
              <span>
                Left Pan is heavier by {leftCount - rightCount} {currentItemMeta.label}(s). Add {leftCount - rightCount} to right pan!
              </span>
            ) : rightCount > leftCount ? (
              <span>
                Right Pan is heavier by {rightCount - leftCount} {currentItemMeta.label}(s). Add {rightCount - leftCount} to left pan!
              </span>
            ) : (
              <span>Place items onto both pans to begin balancing!</span>
            )}
          </div>

          {/* Interactive Scale Graphic */}
          <div className="relative w-full max-w-2xl mx-auto py-8">
            {/* Center Pillar */}
            <div className="mx-auto w-6 h-48 bg-gradient-to-b from-amber-600 to-amber-800 rounded-t-lg shadow-md relative z-10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-500 border-4 border-amber-700 mx-auto -mt-6 flex items-center justify-center shadow-lg">
                <span className="text-xl">⚖️</span>
              </div>
              <div className="absolute bottom-0 -left-12 w-30 h-6 bg-amber-900 rounded-t-xl shadow-md" />
            </div>

            {/* Rotating Beam */}
            <div
              className="absolute top-2.5 left-1/2 -translate-x-1/2 w-full max-w-md h-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 rounded-full border-2 border-amber-700 shadow-md transition-transform duration-500 ease-out origin-center"
              style={{ transform: `translateX(-50%) rotate(${tiltDeg}deg)` }}
            >
              {/* Left Pan Chain & Tray */}
              <div
                className="absolute -left-4 top-4 flex flex-col items-center origin-top transition-transform duration-500"
                style={{ transform: `rotate(${-tiltDeg}deg)` }}
              >
                <div className="w-0.5 h-14 bg-amber-700" />
                <div className="w-40 sm:w-48 min-h-24 p-3 bg-white border-2 border-amber-400 border-b-4 border-b-amber-600 rounded-2xl shadow-md flex flex-wrap items-center justify-center gap-1.5">
                  {Array.from({ length: leftCount }).map((_, i) => (
                    <span
                      key={i}
                      className="text-2xl animate-in zoom-in-50 cursor-pointer hover:scale-125 transition-transform"
                      onClick={handleRemoveLeft}
                      title="Click to remove"
                    >
                      {currentItemMeta.icon}
                    </span>
                  ))}
                  {leftCount === 0 && (
                    <span className="text-xs text-slate-400 italic font-semibold">Empty Pan</span>
                  )}
                </div>
              </div>

              {/* Right Pan Chain & Tray */}
              <div
                className="absolute -right-4 top-4 flex flex-col items-center origin-top transition-transform duration-500"
                style={{ transform: `rotate(${-tiltDeg}deg)` }}
              >
                <div className="w-0.5 h-14 bg-amber-700" />
                <div className="w-40 sm:w-48 min-h-24 p-3 bg-white border-2 border-amber-400 border-b-4 border-b-amber-600 rounded-2xl shadow-md flex flex-wrap items-center justify-center gap-1.5">
                  {Array.from({ length: rightCount }).map((_, i) => (
                    <span
                      key={i}
                      className="text-2xl animate-in zoom-in-50 cursor-pointer hover:scale-125 transition-transform"
                      onClick={handleRemoveRight}
                      title="Click to remove"
                    >
                      {currentItemMeta.icon}
                    </span>
                  ))}
                  {rightCount === 0 && (
                    <span className="text-xs text-slate-400 italic font-semibold">Empty Pan</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stepper Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-purple-100">
            {/* Left Controls */}
            <div className="p-4 rounded-2xl bg-orange-50/60 border-2 border-orange-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-orange-800 uppercase tracking-wider block">
                  Left Pan
                </span>
                <span className="text-2xl font-black text-[#181445] tabular-nums">
                  {leftCount} {currentItemMeta.label}s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRemoveLeft}
                  disabled={leftCount <= 0}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-orange-300 font-bold text-orange-700 flex items-center justify-center hover:bg-orange-100 disabled:opacity-40 cursor-pointer shadow-xs active:translate-y-0.5"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  onClick={handleAddLeft}
                  className="w-10 h-10 rounded-xl bg-[#ff7a00] text-white font-bold flex items-center justify-center hover:bg-orange-600 cursor-pointer shadow-xs active:translate-y-0.5"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Controls */}
            <div className="p-4 rounded-2xl bg-sky-50/60 border-2 border-sky-200 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block">
                  Right Pan
                </span>
                <span className="text-2xl font-black text-[#181445] tabular-nums">
                  {rightCount} {currentItemMeta.label}s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRemoveRight}
                  disabled={rightCount <= 0}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-sky-300 font-bold text-sky-700 flex items-center justify-center hover:bg-sky-100 disabled:opacity-40 cursor-pointer shadow-xs active:translate-y-0.5"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  onClick={handleAddRight}
                  className="w-10 h-10 rounded-xl bg-[#00b4d8] text-white font-bold flex items-center justify-center hover:bg-sky-600 cursor-pointer shadow-xs active:translate-y-0.5"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: ARRAY BUILDER */}
      {activeTab === 'array' && (
        <div className="tactile-card p-6 sm:p-8 space-y-6 bg-gradient-to-b from-white to-[#faf8ff]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-black text-[#181445]">Multiplication Array Visualizer</h2>
              <p className="text-xs text-slate-500">
                Visualize repeated addition: {arrayRows} rows × {arrayCols} columns = {arrayRows * arrayCols}
              </p>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#ff7a00] bg-orange-50 px-4 py-2 rounded-2xl border-2 border-orange-200 flex items-center gap-2">
              <span>{arrayRows} × {arrayCols}</span>
              <span className="text-slate-400">=</span>
              <span className="tabular-nums underline decoration-amber-400">{arrayRows * arrayCols}</span>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-200">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-purple-900 mb-1">
                <span>Rows: {arrayRows}</span>
                <span className="text-slate-500">1 to 8</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                value={arrayRows}
                onChange={(e) => {
                  soundManager.playPop();
                  setArrayRows(Number(e.target.value));
                }}
                className="w-full accent-[#ff7a00] cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-purple-900 mb-1">
                <span>Columns: {arrayCols}</span>
                <span className="text-slate-500">1 to 10</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={arrayCols}
                onChange={(e) => {
                  soundManager.playPop();
                  setArrayCols(Number(e.target.value));
                }}
                className="w-full accent-[#00b4d8] cursor-pointer"
              />
            </div>
          </div>

          {/* Visual Array Grid */}
          <div className="p-6 rounded-3xl bg-white border-2 border-purple-100 border-b-4 border-b-purple-200 shadow-sm flex flex-col items-center justify-center overflow-x-auto min-h-64">
            <div className="space-y-3">
              {Array.from({ length: arrayRows }).map((_, rIdx) => (
                <div key={rIdx} className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-12 text-right">
                    Row {rIdx + 1}:
                  </span>
                  <div className="flex items-center gap-2 sm:gap-3 bg-amber-50/70 p-2 rounded-2xl border border-amber-200">
                    {Array.from({ length: arrayCols }).map((_, cIdx) => (
                      <div
                        key={cIdx}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-amber-300 flex items-center justify-center text-xl sm:text-2xl shadow-xs hover:scale-110 transition-transform cursor-pointer"
                        title={`Item #${rIdx * arrayCols + cIdx + 1}`}
                      >
                        {currentItemMeta.icon}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explanation Footer */}
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center justify-between">
            <span>
              <strong>Skip Count:</strong> {Array.from({ length: arrayRows }).map((_, i) => (i + 1) * arrayCols).join(', ')}
            </span>
            <span className="font-extrabold text-emerald-700">Total Count: {arrayRows * arrayCols}</span>
          </div>
        </div>
      )}
    </div>
  );
};
