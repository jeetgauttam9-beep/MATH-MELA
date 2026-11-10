import React from 'react';

interface HanumanMascotProps {
  pose?: 'idle' | 'thinking' | 'celebrating' | 'flying';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showAura?: boolean;
}

export const HanumanMascot: React.FC<HanumanMascotProps> = ({
  pose = 'idle',
  size = 'md',
  className = '',
  showAura = true,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-60 h-60',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Radiant Solar Aura / Halo */}
      {showAura && (
        <div
          className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/30 via-orange-400/20 to-yellow-300/30 blur-xl animate-pulse"
          style={{ transform: 'scale(1.3)' }}
        />
      )}

      {/* SVG Bal Hanuman Hero Character */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full relative z-10 transition-transform duration-300 ${
          pose === 'celebrating'
            ? 'scale-110 -translate-y-2'
            : pose === 'flying'
            ? 'rotate-6 translate-x-1'
            : pose === 'thinking'
            ? '-rotate-3'
            : 'animate-hero-float'
        }`}
      >
        {/* Soft Golden Cloud below */}
        <ellipse cx="100" cy="180" rx="65" ry="14" fill="#ffffff" opacity="0.9" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.06))" />
        <ellipse cx="80" cy="176" rx="35" ry="12" fill="#f0f9ff" />
        <ellipse cx="125" cy="177" rx="30" ry="11" fill="#f0f9ff" />

        {/* Tail (Curling playfully with golden spark at tip) */}
        <path
          d="M 60 145 C 30 145 15 110 25 80 C 32 60 55 55 52 75 C 50 88 35 95 38 115 C 42 135 65 142 75 142"
          stroke="#E07A28"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="52" cy="72" r="6" fill="#FFC727" />

        {/* Body (Soft warm terracotta/saffron orange) */}
        <path
          d="M 75 125 C 75 105 125 105 125 125 C 125 155 75 155 75 125 Z"
          fill="#F59E0B"
        />
        {/* Yellow Dhoti / wrap */}
        <path
          d="M 74 135 C 74 130 126 130 126 135 C 126 158 74 158 74 135 Z"
          fill="#FBBF24"
          stroke="#D97706"
          strokeWidth="2"
        />
        <rect x="94" y="132" width="12" height="24" rx="3" fill="#D97706" />

        {/* Left Arm & Hand */}
        {pose === 'celebrating' ? (
          <path
            d="M 75 115 C 55 95 45 70 55 60 C 62 55 70 70 75 90"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="2"
          />
        ) : pose === 'thinking' ? (
          <path
            d="M 75 120 C 60 115 65 95 85 92"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M 78 120 C 60 125 55 140 68 148"
            fill="#F59E0B"
            stroke="#D97706"
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        {/* Right Arm holding Golden Mango or Gada */}
        {pose === 'celebrating' ? (
          <g>
            <path
              d="M 125 115 C 145 95 155 70 145 60 C 138 55 130 70 125 90"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="2"
            />
            {/* Golden Star Fruit held high */}
            <circle cx="150" cy="55" r="14" fill="#FF7A00" stroke="#FFC727" strokeWidth="3" />
            <path d="M 150 41 Q 153 36 158 38" stroke="#10B981" strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <g>
            {/* Holding sweet golden mango in front */}
            <path
              d="M 122 120 C 138 122 142 135 130 145"
              fill="#F59E0B"
              stroke="#D97706"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* Mango Fruit */}
            <ellipse cx="138" cy="132" rx="10" ry="12" fill="#FF7A00" />
            <ellipse cx="136" cy="130" rx="7" ry="9" fill="#FFC727" />
            <path d="M 137 120 Q 140 115 143 118" stroke="#10B981" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}

        {/* Bal Hanuman Head */}
        <circle cx="100" cy="85" r="32" fill="#F59E0B" />
        {/* Soft lighter cheeks & muzzle */}
        <ellipse cx="100" cy="94" rx="20" ry="15" fill="#FDE68A" />

        {/* Big Expressive Joyful Eyes */}
        <ellipse cx="90" cy="80" rx="5" ry="6" fill="#181445" />
        <circle cx="88" cy="78" r="2" fill="#ffffff" />
        <ellipse cx="110" cy="80" rx="5" ry="6" fill="#181445" />
        <circle cx="108" cy="78" r="2" fill="#ffffff" />

        {/* Cheerful Friendly Smile */}
        <path
          d="M 93 96 Q 100 104 107 96"
          stroke="#92400E"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Rosy cheeks */}
        <circle cx="83" cy="88" r="4" fill="#F87171" opacity="0.6" />
        <circle cx="117" cy="88" r="4" fill="#F87171" opacity="0.6" />

        {/* Sacred Tilak on Forehead (Red & Sandalwood) */}
        <path d="M 98 62 L 100 74 L 102 62 Z" fill="#DC2626" />
        <line x1="96" y1="68" x2="104" y2="68" stroke="#FBBF24" strokeWidth="2" />

        {/* Royal Kundal / Golden Earrings */}
        <circle cx="68" cy="86" r="4.5" fill="#FFC727" stroke="#D97706" strokeWidth="1.5" />
        <circle cx="132" cy="86" r="4.5" fill="#FFC727" stroke="#D97706" strokeWidth="1.5" />

        {/* Golden Mukut (Crown) */}
        <path
          d="M 80 62 L 88 42 L 100 32 L 112 42 L 120 62 Z"
          fill="#FFC727"
          stroke="#D97706"
          strokeWidth="2"
        />
        <circle cx="100" cy="46" r="4" fill="#EF4444" />
        <circle cx="89" cy="52" r="2.5" fill="#3B82F6" />
        <circle cx="111" cy="52" r="2.5" fill="#3B82F6" />

        {/* Radiant Sparkles around Crown */}
        <path d="M 100 22 L 100 27" stroke="#FFC727" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 85 27 L 88 31" stroke="#FFC727" strokeWidth="2" strokeLinecap="round" />
        <path d="M 115 27 L 112 31" stroke="#FFC727" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Avatar Badge for classroom student selection
export const StudentAvatarIcon: React.FC<{ avatar: string; className?: string }> = ({
  avatar,
  className = 'w-10 h-10',
}) => {
  const avatarDetails: Record<string, { bg: string; icon: string; label: string }> = {
    hanuman: { bg: 'bg-orange-100 text-orange-600 border-orange-300', icon: '🐵', label: 'Hanuman Hero' },
    gada: { bg: 'bg-amber-100 text-amber-700 border-amber-300', icon: '🛡️', label: 'Golden Gada' },
    sun: { bg: 'bg-yellow-100 text-yellow-600 border-yellow-300', icon: '☀️', label: 'Surya Sun' },
    mountain: { bg: 'bg-emerald-100 text-emerald-700 border-emerald-300', icon: '⛰️', label: 'Dronagiri Peak' },
    lotus: { bg: 'bg-pink-100 text-pink-600 border-pink-300', icon: '🪷', label: 'Sacred Lotus' },
    peacock: { bg: 'bg-sky-100 text-sky-600 border-sky-300', icon: '🦚', label: 'Swift Peacock' },
    lion: { bg: 'bg-amber-100 text-amber-800 border-amber-400', icon: '🦁', label: 'Brave Lion' },
    cloud: { bg: 'bg-blue-100 text-blue-600 border-blue-300', icon: '☁️', label: 'Cloud Leaper' },
  };

  const current = avatarDetails[avatar] || avatarDetails.hanuman;

  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl border-2 font-bold select-none ${current.bg} ${className}`}
      title={current.label}
    >
      <span className="text-xl leading-none">{current.icon}</span>
    </div>
  );
};
