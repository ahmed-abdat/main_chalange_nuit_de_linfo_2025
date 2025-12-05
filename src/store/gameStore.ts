import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// =============================================================================
// CHARACTER TYPES
// =============================================================================
export type CharacterId = 'asterix' | 'obelix' | 'panoramix' | 'idefix';

export interface Character {
  id: CharacterId;
  name: string;
  title: string;
  emoji: string;
  description: string;
  stats: {
    courage: number;    // Willingness to change
    wisdom: number;     // Technical knowledge
    strength: number;   // Budget power
  };
  specialAbility: string;
  color: string;
}

export const CHARACTERS: Record<CharacterId, Character> = {
  asterix: {
    id: 'asterix',
    name: 'Astérix',
    title: 'Le Champion des Élèves',
    emoji: '⚔️',
    description: 'Petit mais malin, tu guides ton école vers la liberté numérique.',
    stats: { courage: 5, wisdom: 4, strength: 3 },
    specialAbility: 'Potion Magique: Double les économies réalisées',
    color: '#F9A825',
  },
  obelix: {
    id: 'obelix',
    name: 'Obélix',
    title: 'Le Vétéran Linux',
    emoji: '🪨',
    description: 'Tombé dans la marmite Linux enfant, tu connais tous les secrets.',
    stats: { courage: 4, wisdom: 5, strength: 5 },
    specialAbility: 'Force Brute: Reconditionne 2x plus de PCs',
    color: '#3B82F6',
  },
  panoramix: {
    id: 'panoramix',
    name: 'Panoramix',
    title: 'Le Druide Open Source',
    emoji: '🧙‍♂️',
    description: 'Tu crées la potion magique: le logiciel libre qui libère les écoles.',
    stats: { courage: 3, wisdom: 5, strength: 4 },
    specialAbility: 'Sagesse Ancestrale: Débloque des quêtes bonus',
    color: '#00997d',
  },
  idefix: {
    id: 'idefix',
    name: 'Idéfix',
    title: 'Tux le Pingouin',
    emoji: '🐧',
    description: 'Petit mais essentiel, tu es le symbole de la résistance Linux.',
    stats: { courage: 5, wisdom: 3, strength: 2 },
    specialAbility: 'Flair Écologique: Bonus durabilité +50%',
    color: '#2E7D32',
  },
};

// =============================================================================
// QUEST TYPES
// =============================================================================
export type QuestId =
  | 'discover_crisis'
  | 'understand_empire'
  | 'make_choice'
  | 'learn_pillars'
  | 'refurbish_pc'
  | 'join_village';

export interface Quest {
  id: QuestId;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  unlocked: boolean;
}

export const QUESTS: Record<QuestId, Omit<Quest, 'completed' | 'unlocked'>> = {
  discover_crisis: {
    id: 'discover_crisis',
    title: 'La Menace de l\'Empire',
    description: 'Découvre la crise Windows 10 de 2025',
    xpReward: 100,
  },
  understand_empire: {
    id: 'understand_empire',
    title: 'Connaître son Ennemi',
    description: 'Comprends les chiffres du gaspillage',
    xpReward: 150,
  },
  make_choice: {
    id: 'make_choice',
    title: 'Le Choix du Destin',
    description: 'Fais ton choix: Empire ou Village?',
    xpReward: 200,
  },
  learn_pillars: {
    id: 'learn_pillars',
    title: 'Les 3 Piliers',
    description: 'Maîtrise Inclusif, Responsable, Durable',
    xpReward: 150,
  },
  refurbish_pc: {
    id: 'refurbish_pc',
    title: 'Maître du Reconditionnement',
    description: 'Sauve un PC avec Linux!',
    xpReward: 300,
  },
  join_village: {
    id: 'join_village',
    title: 'Rejoindre le Village',
    description: 'Deviens membre de la résistance NIRD',
    xpReward: 500,
  },
};

// =============================================================================
// INVENTORY ITEMS
// =============================================================================
export type ItemId = 'usb_linux' | 'ssd' | 'ram' | 'potion' | 'manual' | 'certificate';

export interface InventoryItem {
  id: ItemId;
  name: string;
  emoji: string;
  description: string;
  quantity: number;
}

export const ITEMS: Record<ItemId, Omit<InventoryItem, 'quantity'>> = {
  usb_linux: {
    id: 'usb_linux',
    name: 'Clé USB Linux',
    emoji: '💾',
    description: 'Contient la potion magique: Linux NIRD',
  },
  ssd: {
    id: 'ssd',
    name: 'SSD 128GB',
    emoji: '💿',
    description: 'Donne une nouvelle vie aux vieux PCs',
  },
  ram: {
    id: 'ram',
    name: 'Barrette RAM',
    emoji: '🧠',
    description: 'Plus de mémoire, plus de liberté',
  },
  potion: {
    id: 'potion',
    name: 'Potion Magique',
    emoji: '🧪',
    description: 'Le pouvoir du logiciel libre',
  },
  manual: {
    id: 'manual',
    name: 'Manuel NIRD',
    emoji: '📖',
    description: 'Guide complet de la migration',
  },
  certificate: {
    id: 'certificate',
    name: 'Certificat Villageois',
    emoji: '📜',
    description: 'Tu fais partie du village!',
  },
};

// =============================================================================
// DIALOGUE TYPES
// =============================================================================
export interface DialogueLine {
  speaker: string;
  speakerEmoji: string;
  text: string;
  choices?: {
    text: string;
    action: () => void;
  }[];
}

// =============================================================================
// GAME STATE
// =============================================================================
export interface GameState {
  // Game status
  gameStarted: boolean;
  currentPhase: 'intro' | 'character_select' | 'adventure' | 'victory';

  // Character
  selectedCharacter: CharacterId | null;

  // User choice (A/B/C decision)
  userChoice: 'A' | 'B' | 'C' | null;
  setUserChoice: (choice: 'A' | 'B' | 'C' | null) => void;

  // Progress
  xp: number;
  level: number;
  currentSection: number;

  // Stats (accumulated)
  budgetSaved: number;
  pcsSaved: number;
  co2Saved: number;

  // Quests
  quests: Record<QuestId, Quest>;

  // Inventory
  inventory: Record<ItemId, InventoryItem>;

  // Dialogue
  activeDialogue: DialogueLine[] | null;
  dialogueIndex: number;

  // Actions
  startGame: () => void;
  selectCharacter: (id: CharacterId) => void;
  startAdventure: () => void;

  completeQuest: (id: QuestId) => void;
  addXp: (amount: number) => void;
  addItem: (id: ItemId, quantity?: number) => void;

  updateStats: (stats: { budget?: number; pcs?: number; co2?: number }) => void;
  advanceSection: () => void;

  setDialogue: (dialogue: DialogueLine[] | null) => void;
  advanceDialogue: () => void;

  resetGame: () => void;
}

// =============================================================================
// STORE
// =============================================================================
const initialQuests: Record<QuestId, Quest> = Object.fromEntries(
  Object.entries(QUESTS).map(([id, quest], index) => [
    id,
    { ...quest, completed: false, unlocked: index === 0 },
  ])
) as Record<QuestId, Quest>;

const initialInventory: Record<ItemId, InventoryItem> = Object.fromEntries(
  Object.entries(ITEMS).map(([id, item]) => [id, { ...item, quantity: 0 }])
) as Record<ItemId, InventoryItem>;

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      gameStarted: false,
      currentPhase: 'intro',
      selectedCharacter: null,
      userChoice: null,
      xp: 0,
      level: 1,
      currentSection: 0,
      budgetSaved: 0,
      pcsSaved: 0,
      co2Saved: 0,
      quests: initialQuests,
      inventory: initialInventory,
      activeDialogue: null,
      dialogueIndex: 0,

      // Actions
      startGame: () => set({ gameStarted: true, currentPhase: 'character_select' }),

      selectCharacter: (id) => set({ selectedCharacter: id }),

      setUserChoice: (choice) => set({ userChoice: choice }),

      startAdventure: () => {
        const { selectedCharacter } = get();
        if (!selectedCharacter) return;

        // Give starting items based on character
        const startingItems: Partial<Record<CharacterId, ItemId[]>> = {
          asterix: ['usb_linux'],
          obelix: ['usb_linux', 'ssd'],
          panoramix: ['usb_linux', 'potion', 'manual'],
          idefix: ['usb_linux'],
        };

        const items = startingItems[selectedCharacter] || [];
        const newInventory = { ...get().inventory };
        items.forEach((itemId) => {
          newInventory[itemId].quantity += 1;
        });

        set({
          currentPhase: 'adventure',
          inventory: newInventory,
        });
      },

      completeQuest: (id) => {
        const { quests, xp } = get();
        if (quests[id].completed) return;

        const quest = QUESTS[id];
        const newQuests = { ...quests };
        newQuests[id] = { ...newQuests[id], completed: true };

        // Unlock next quest
        const questOrder: QuestId[] = [
          'discover_crisis',
          'understand_empire',
          'make_choice',
          'learn_pillars',
          'refurbish_pc',
          'join_village',
        ];
        const currentIndex = questOrder.indexOf(id);
        if (currentIndex < questOrder.length - 1) {
          const nextId = questOrder[currentIndex + 1];
          newQuests[nextId] = { ...newQuests[nextId], unlocked: true };
        }

        set({
          quests: newQuests,
          xp: xp + quest.xpReward,
          level: Math.floor((xp + quest.xpReward) / 500) + 1,
        });
      },

      addXp: (amount) => {
        const { xp } = get();
        const newXp = xp + amount;
        set({
          xp: newXp,
          level: Math.floor(newXp / 500) + 1,
        });
      },

      addItem: (id, quantity = 1) => {
        const { inventory } = get();
        set({
          inventory: {
            ...inventory,
            [id]: { ...inventory[id], quantity: inventory[id].quantity + quantity },
          },
        });
      },

      updateStats: (stats) => {
        set((state) => ({
          budgetSaved: state.budgetSaved + (stats.budget || 0),
          pcsSaved: state.pcsSaved + (stats.pcs || 0),
          co2Saved: state.co2Saved + (stats.co2 || 0),
        }));
      },

      advanceSection: () => {
        set((state) => ({ currentSection: state.currentSection + 1 }));
      },

      setDialogue: (dialogue) => set({ activeDialogue: dialogue, dialogueIndex: 0 }),

      advanceDialogue: () => {
        const { activeDialogue, dialogueIndex } = get();
        if (!activeDialogue) return;

        if (dialogueIndex < activeDialogue.length - 1) {
          set({ dialogueIndex: dialogueIndex + 1 });
        } else {
          set({ activeDialogue: null, dialogueIndex: 0 });
        }
      },

      resetGame: () =>
        set({
          gameStarted: false,
          currentPhase: 'intro',
          selectedCharacter: null,
          userChoice: null,
          xp: 0,
          level: 1,
          currentSection: 0,
          budgetSaved: 0,
          pcsSaved: 0,
          co2Saved: 0,
          quests: initialQuests,
          inventory: initialInventory,
          activeDialogue: null,
          dialogueIndex: 0,
        }),
    }),
    {
      name: 'village-nird-game',
    }
  )
);
