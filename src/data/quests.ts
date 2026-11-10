import { Quest, RealmId, ClassId } from '../types';

export interface RealmMeta {
  id: RealmId;
  name: string;
  hindiName: string;
  subtitle: string;
  description: string;
  icon: string;
  themeColor: string;
  bgGradient: string;
  badge: string;
}

export const REALMS: Record<RealmId, RealmMeta> = {
  surya: {
    id: 'surya',
    name: 'Surya Loka',
    hindiName: 'सूर्य लोक',
    subtitle: 'Golden Sun Kingdom • Addition & Counting',
    description: 'Leap towards the blazing golden sun and gather sweet cosmic mangoes to build radiant strength!',
    icon: '☀️',
    themeColor: '#ff7a00',
    bgGradient: 'from-orange-500/10 via-amber-500/5 to-transparent',
    badge: 'Mango Catcher',
  },
  vayu: {
    id: 'vayu',
    name: 'Vayu Mandir',
    hindiName: 'वायु मंदिर',
    subtitle: 'Wind Temple • Subtraction & Balance',
    description: 'Soar through turbulent wind streams, clear tempest clouds, and balance celestial stepping stones!',
    icon: '💨',
    themeColor: '#00b4d8',
    bgGradient: 'from-sky-500/10 via-cyan-500/5 to-transparent',
    badge: 'Wind Balancer',
  },
  dronagiri: {
    id: 'dronagiri',
    name: 'Dronagiri Peak',
    hindiName: 'द्रोणागिरि पर्वत',
    subtitle: 'Herb Mountain • Multiplication & Arrays',
    description: 'Lift the golden herb mountain! Group glowing Sanjeevani plants in enchanted bundles.',
    icon: '⛰️',
    themeColor: '#10b981',
    bgGradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    badge: 'Mountain Lifter',
  },
  lanka: {
    id: 'lanka',
    name: 'Ocean Bridge',
    hindiName: 'सेतुबंध',
    subtitle: 'Cosmic Ocean • Division & Fractions',
    description: 'Carve sacred numbers into floating stones and distribute glowing laddoos equally among hero friends.',
    icon: '🌊',
    themeColor: '#6366f1',
    bgGradient: 'from-indigo-500/10 via-blue-500/5 to-transparent',
    badge: 'Bridge Master',
  },
};

// Procedural quest generator specifically tailored to Class (1 to 5) and Realm
export function generateProceduralQuest(realmId: RealmId, classId: ClassId, level: number): Quest {
  const seed = Math.floor(Math.random() * 10000);
  let a = 1;
  let b = 1;
  let ans = 2;
  let expression = '';
  let question = '';
  let story = '';
  let category: Quest['category'] = 'addition';
  let visualType: Quest['visualType'] = 'mango';
  let visualOp: Quest['visualOp'] = '+';
  let hint = '';

  // 1. SURYA LOKA: ADDITION & COUNTING
  if (realmId === 'surya') {
    category = 'addition';
    visualType = 'mango';
    visualOp = '+';

    if (classId === 'class_1') {
      // Class 1: Single-digit addition within 10
      a = Math.floor(Math.random() * 5) + 1; // 1-5
      b = Math.floor(Math.random() * 4) + 1; // 1-4
      ans = a + b;
      expression = `${a} + ${b} = ?`;
      story = `Bal Hanuman spots ${a} juicy sun mangoes on one golden branch and ${b} on another branch.`;
      question = `How many total sun mangoes can Hanuman gather?`;
      hint = `Count the first ${a} mangoes, then tap ${b} more: ${a}... ${ans}!`;
    } else if (classId === 'class_2') {
      // Class 2: 2-digit addition (sums 15 to 40)
      a = Math.floor(Math.random() * 12) + 10; // 10-21
      b = Math.floor(Math.random() * 12) + 6;  // 6-17
      ans = a + b;
      expression = `${a} + ${b} = ?`;
      story = `Hanuman collects ${a} morning solar crystals and his friend brings ${b} afternoon crystals.`;
      question = `What is the total sum of solar crystals gathered?`;
      hint = `Add the tens first, then add the units!`;
    } else if (classId === 'class_3') {
      // Class 3: 2-digit addition with regrouping (sums 40 to 99)
      a = Math.floor(Math.random() * 30) + 25; // 25-54
      b = Math.floor(Math.random() * 25) + 18; // 18-42
      ans = a + b;
      expression = `${a} + ${b} = ?`;
      story = `In Class 3 solar trials, Hanuman glides ${a} cosmic leagues, then flies ${b} leagues higher.`;
      question = `Find the total distance covered: ${a} + ${b}.`;
      hint = `Break ${b} into friendly tens and ones to add smoothly.`;
    } else if (classId === 'class_4') {
      // Class 4: 3-digit additions or 3 addends
      a = Math.floor(Math.random() * 100) + 120; // 120-219
      b = Math.floor(Math.random() * 80) + 75;   // 75-154
      ans = a + b;
      expression = `${a} + ${b} = ?`;
      story = `Hanuman’s army prepares ${a} solar torches on the eastern wall and ${b} on the northern gate.`;
      question = `How many torches are ignited in all?`;
      hint = `Add hundreds, tens, and units step by step.`;
    } else {
      // Class 5: 3-digit and 4-digit mental additions
      a = Math.floor(Math.random() * 250) + 350; // 350-599
      b = Math.floor(Math.random() * 200) + 260; // 260-459
      ans = a + b;
      expression = `${a} + ${b} = ?`;
      story = `The celestial sunrise temple gathers ${a} golden coins in dawn worship and ${b} coins at dusk.`;
      question = `Calculate the total sacred solar collection.`;
      hint = `Round to nearest ten or hundred to verify your total.`;
    }
  }

  // 2. VAYU MANDIR: SUBTRACTION & BALANCE
  else if (realmId === 'vayu') {
    category = 'subtraction';
    visualType = 'rock';
    visualOp = '-';

    if (classId === 'class_1') {
      // Class 1: Single-digit subtraction within 10
      b = Math.floor(Math.random() * 4) + 1; // 1-4
      ans = Math.floor(Math.random() * 5) + 1; // 1-5
      a = ans + b; // ensures positive (a <= 9)
      expression = `${a} - ${b} = ?`;
      story = `There were ${a} floating cloud stepping stones. A gust of wind blew ${b} stones away.`;
      question = `How many cloud stones remain for Hanuman to step on?`;
      hint = `Count backward from ${a} by ${b} steps.`;
    } else if (classId === 'class_2') {
      // Class 2: 2-digit subtraction (within 30)
      b = Math.floor(Math.random() * 8) + 5; // 5-12
      ans = Math.floor(Math.random() * 12) + 6; // 6-17
      a = ans + b;
      expression = `${a} - ${b} = ?`;
      story = `Hanuman had ${a} wind pearls. He gifted ${b} pearls to the wind nymphs.`;
      question = `How many wind pearls does Hanuman hold now?`;
      hint = `Subtract ${b} from ${a}: think ${a} minus 10, then adjust!`;
    } else if (classId === 'class_3') {
      // Class 3: 2-digit subtraction with regrouping (within 90)
      b = Math.floor(Math.random() * 25) + 18; // 18-42
      ans = Math.floor(Math.random() * 25) + 15; // 15-39
      a = ans + b;
      expression = `${a} - ${b} = ?`;
      story = `A tempest cloud had ${a} thunderbolts. Hanuman’s roar neutralized ${b} bolts.`;
      question = `How many thunderbolts are left in the sky?`;
      hint = `Borrow 1 ten from the tens column to subtract the units!`;
    } else if (classId === 'class_4') {
      // Class 4: 3-digit subtraction
      b = Math.floor(Math.random() * 80) + 55; // 55-134
      ans = Math.floor(Math.random() * 90) + 60; // 60-149
      a = ans + b;
      expression = `${a} - ${b} = ?`;
      story = `The storm temple held ${a} wind crystals. Hanuman used ${b} crystals to create a protective barrier.`;
      question = `Calculate remaining crystals: ${a} - ${b}.`;
      hint = `Check by adding your answer to ${b}!`;
    } else {
      // Class 5: 3-digit subtraction across zeros (e.g. 500 - 185)
      const baseHundreds = [300, 400, 500, 600][Math.floor(Math.random() * 4)];
      b = Math.floor(Math.random() * 150) + 110;
      a = baseHundreds;
      ans = a - b;
      expression = `${a} - ${b} = ?`;
      story = `Hanuman must dissipate a storm vortex measuring ${a} units of turbulence down by ${b} units.`;
      question = `What is the remaining turbulence level?`;
      hint = `Subtracting from ${a}: rename ${a} as ${(a - 100) + 90 + 10}.`;
    }
  }

  // 3. DRONAGIRI PEAK: MULTIPLICATION & ARRAYS
  else if (realmId === 'dronagiri') {
    category = 'multiplication';
    visualType = 'herb';
    visualOp = '×';

    if (classId === 'class_1') {
      // Class 1: Pairs and early counting (groups of 2 or 3)
      a = Math.floor(Math.random() * 3) + 2; // 2, 3, 4
      b = 2; // pairs of 2
      ans = a * b;
      expression = `${a} × 2 = ?`;
      story = `Hanuman collects ${a} bunches of sacred herbs, with 2 leaves in each bunch.`;
      question = `How many leaves are there in total? (${a} pairs of 2)`;
      hint = `Skip count by 2s: 2, 4, 6...`;
    } else if (classId === 'class_2') {
      // Class 2: 2s, 5s, 10s times tables
      const mults = [2, 5, 10];
      b = mults[Math.floor(Math.random() * mults.length)];
      a = Math.floor(Math.random() * 5) + 2; // 2 to 6
      ans = a * b;
      expression = `${a} × ${b} = ?`;
      story = `On Mount Dronagiri, Hanuman gathers ${a} baskets with ${b} herbs in each basket.`;
      question = `How many herbs did Hanuman gather in total?`;
      hint = b === 5 ? 'Count by 5s: 5, 10, 15...' : b === 10 ? 'Multiply by 10 by adding a zero!' : 'Double the number!';
    } else if (classId === 'class_3') {
      // Class 3: Times Tables 2 through 9
      a = Math.floor(Math.random() * 7) + 3; // 3 to 9
      b = Math.floor(Math.random() * 6) + 4; // 4 to 9
      ans = a * b;
      expression = `${a} × ${b} = ?`;
      story = `In the sacred groves of Dronagiri, there are ${a} rows of trees with ${b} glowing Sanjeevani flowers each.`;
      question = `What is the total product: ${a} times ${b}?`;
      hint = `Think of ${a} groups of ${b}. You can also break ${a} into simpler facts!`;
    } else if (classId === 'class_4') {
      // Class 4: Multi-digit products (11-15 times 3-9)
      a = Math.floor(Math.random() * 5) + 11; // 11 to 15
      b = Math.floor(Math.random() * 5) + 4;  // 4 to 8
      ans = a * b;
      expression = `${a} × ${b} = ?`;
      story = `Hanuman lifts ${b} mountain peaks, each bearing ${a} legendary healing roots.`;
      question = `Calculate: ${a} × ${b} = ?`;
      hint = `Multiply 10 × ${b}, then add (${a - 10} × ${b})!`;
    } else {
      // Class 5: Advanced products (15-25 times 4-12)
      a = Math.floor(Math.random() * 10) + 16; // 16 to 25
      b = Math.floor(Math.random() * 6) + 6;   // 6 to 11
      ans = a * b;
      expression = `${a} × ${b} = ?`;
      story = `To heal the entire kingdom, Hanuman prepares ${b} royal crates each filled with ${a} rare medicinal stems.`;
      question = `Find the total number of medicinal stems: ${a} × ${b}.`;
      hint = `Decompose ${a} into tens and units: (${Math.floor(a/10)*10} × ${b}) + (${a%10} × ${b}).`;
    }
  }

  // 4. LANKA OCEAN BRIDGE: DIVISION & FRACTIONS
  else {
    category = 'division';
    visualType = 'rock';
    visualOp = '÷';

    if (classId === 'class_1') {
      // Class 1: Sharing among 2 friends (halves)
      ans = Math.floor(Math.random() * 4) + 1; // 1-4
      b = 2;
      a = ans * b; // 2, 4, 6, 8
      expression = `${a} ÷ 2 = ?`;
      story = `Hanuman has ${a} sweet mango slices to share equally between himself and 1 monkey friend.`;
      question = `How many slices does each friend get? (Half of ${a})`;
      hint = `Split ${a} into 2 equal piles!`;
    } else if (classId === 'class_2') {
      // Class 2: Equal sharing among 2, 3, or 4
      b = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
      ans = Math.floor(Math.random() * 4) + 2; // 2-5
      a = ans * b; // within 20
      expression = `${a} ÷ ${b} = ?`;
      story = `${a} floating stones are distributed equally among ${b} monkey squads to build the bridge.`;
      question = `How many stones does each squad carry?`;
      hint = `What number times ${b} equals ${a}? ${b} × ? = ${a}`;
    } else if (classId === 'class_3') {
      // Class 3: Division facts for tables 3 to 9
      b = Math.floor(Math.random() * 5) + 3; // 3 to 7
      ans = Math.floor(Math.random() * 6) + 3; // 3 to 8
      a = ans * b; // e.g. 24 ÷ 4, 35 ÷ 5, 42 ÷ 6
      expression = `${a} ÷ ${b} = ?`;
      story = `${a} glowing ocean stones are laid in ${b} equal foundation lines across the sea.`;
      question = `How many stones are in each foundation line?`;
      hint = `Use the multiplication inverse: ${b} × ? = ${a}`;
    } else if (classId === 'class_4') {
      // Class 4: Double digit division or fraction parts
      const isFraction = Math.random() > 0.5;
      if (isFraction) {
        // e.g. 1/4 of 32 = 8, 1/3 of 24 = 8
        const denom = [2, 3, 4][Math.floor(Math.random() * 3)];
        ans = Math.floor(Math.random() * 5) + 4; // 4-8
        a = ans * denom;
        category = 'fractions';
        expression = `1/${denom} of ${a} = ?`;
        story = `Hanuman blesses ${a} ships, and 1/${denom} of them sail in the vanguard fleet.`;
        question = `How many vanguard ships are sailing? (Calculate 1/${denom} of ${a})`;
        hint = `To find 1/${denom} of ${a}, divide ${a} by ${denom}: ${a} ÷ ${denom}!`;
      } else {
        b = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9
        ans = Math.floor(Math.random() * 6) + 4; // 4 to 9
        a = ans * b;
        expression = `${a} ÷ ${b} = ?`;
        story = `The bridge engineers divide ${a} heavy mountain boulders equally across ${b} stone pillars.`;
        question = `How many boulders are placed on each stone pillar?`;
        hint = `Recall your ${b} times table to find the factor!`;
      }
    } else {
      // Class 5: Long division / Multi-digit division (e.g. 144 ÷ 12 = 12, 108 ÷ 9 = 12)
      b = Math.floor(Math.random() * 6) + 8; // 8 to 13
      ans = Math.floor(Math.random() * 7) + 8; // 8 to 14
      a = ans * b;
      expression = `${a} ÷ ${b} = ?`;
      story = `${a} vanara heroes assemble in ${b} equal tactical columns to span the ocean.`;
      question = `How many heroes are in each tactical column? (${a} ÷ ${b})`;
      hint = `Estimate: ${b} × 10 = ${b * 10}, then adjust!`;
    }
  }

  // Generate 4 plausible distinct multiple choice options
  const optionsSet = new Set<number>();
  optionsSet.add(ans);
  const deltas = [-1, 1, -2, 2, 3, -3, 4, -4, 5, 10, -10];
  for (const d of deltas) {
    const candidate = ans + d;
    if (candidate > 0 && candidate !== ans) {
      optionsSet.add(candidate);
    }
    if (optionsSet.size >= 4) break;
  }
  let counter = 1;
  while (optionsSet.size < 4) {
    optionsSet.add(ans + counter++);
  }
  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  const difficultyMap: Record<ClassId, 'easy' | 'medium' | 'hard'> = {
    class_1: 'easy',
    class_2: 'easy',
    class_3: 'medium',
    class_4: 'medium',
    class_5: 'hard',
  };

  return {
    id: `pq_${realmId}_${classId}_${level}_${seed}`,
    realmId,
    realmTitle: REALMS[realmId].name,
    level,
    title: `${REALMS[realmId].name} • Quest ${level}`,
    story,
    question,
    expression,
    options,
    correctAnswer: ans,
    category,
    difficulty: difficultyMap[classId],
    visualType,
    visualCountA: Math.min(24, a),
    visualCountB: b && b <= 20 ? b : undefined,
    visualOp,
    hint,
    encouragement: `Spectacular job! Bal Hanuman salutes your sharp mind!`,
  };
}
