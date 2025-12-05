// Character dialogues for the narrative system
// Each character has a distinct personality and voice

export type CharacterId = 'panoramix' | 'asterix' | 'obelix' | 'idefix';

export interface CharacterInfo {
  id: CharacterId;
  name: string;
  emoji: string;
  color: string;
  role: string;
}

export const characters: Record<CharacterId, CharacterInfo> = {
  panoramix: {
    id: 'panoramix',
    name: 'Panoramix',
    emoji: 'P',
    color: '#00997d', // Emerald - wisdom
    role: 'Le Druide Open Source'
  },
  asterix: {
    id: 'asterix',
    name: 'Asterix',
    emoji: 'A',
    color: '#F9A825', // Gold - courage
    role: 'Le Champion des Élèves'
  },
  obelix: {
    id: 'obelix',
    name: 'Obelix',
    emoji: 'O',
    color: '#2196F3', // Blue - strength
    role: 'Le Vétéran Linux'
  },
  idefix: {
    id: 'idefix',
    name: 'Idefix',
    emoji: 'I',
    color: '#4CAF50', // Green - eco
    role: 'Le Gardien Écologique'
  }
};

export interface SectionDialogue {
  section: string;
  speaker: CharacterId;
  lines: string[];
  delay?: number; // ms before showing
}

export const sectionDialogues: SectionDialogue[] = [
  // Hero Section - Welcome
  {
    section: 'hero',
    speaker: 'panoramix',
    lines: [
      "Bienvenue, voyageur. Vous arrivez dans des temps troubles...",
      "L'Empire Big Tech étend son ombre sur nos écoles.",
      "Mais n'ayez crainte ! Vous avez trouvé le Village."
    ],
    delay: 2000
  },

  // Stats Section - Crisis Awareness
  {
    section: 'stats',
    speaker: 'obelix',
    lines: [
      "Par Toutatis ! 240 millions de PC menacés ?",
      "Ils sont complètement fous ces Big Tech !",
      "€800 pour un nouveau PC... c'est du vol organisé !"
    ],
    delay: 500
  },

  // Choice Section - Decision Point
  {
    section: 'choice',
    speaker: 'asterix',
    lines: [
      "Le moment est venu de choisir votre camp, ami(e).",
      "Trois chemins s'offrent à vous...",
      "Mais seul un mène à la liberté numérique !"
    ],
    delay: 500
  },

  // After choosing Linux (Choice B)
  {
    section: 'choice-linux',
    speaker: 'obelix',
    lines: [
      "Excellent choix ! Vous rejoignez le Village !",
      "Je suis tombé dans la marmite Linux quand j'étais petit...",
      "Tenez, prenez cette clé USB magique !"
    ],
    delay: 300
  },

  // After choosing Windows (Choice A)
  {
    section: 'choice-windows',
    speaker: 'panoramix',
    lines: [
      "Hmm... Réfléchissez bien, voyageur.",
      "L'Empire demande beaucoup et donne peu...",
      "Vous pouvez toujours changer d'avis."
    ],
    delay: 300
  },

  // Pillars Section - Education
  {
    section: 'pillars',
    speaker: 'panoramix',
    lines: [
      "Voici les 3 secrets du Village NIRD...",
      "Inclusif, Responsable, Durable.",
      "Chaque pilier est une force contre l'Empire."
    ],
    delay: 500
  },

  // Game Section - Challenge
  {
    section: 'game',
    speaker: 'obelix',
    lines: [
      "C'est l'heure de l'épreuve !",
      "Vous voyez ce vieux PC ? L'Empire dit qu'il est 'obsolète'.",
      "Nous disons qu'il est 'libérable'. Glissez la potion !"
    ],
    delay: 500
  },

  // Game Success
  {
    section: 'game-success',
    speaker: 'asterix',
    lines: [
      "FORMIDABLE ! Vous avez sauvé ce PC !",
      "€800 économisés, 300kg de CO₂ évités !",
      "Vous maîtrisez maintenant l'art du reconditionnement."
    ],
    delay: 300
  },

  // Quiz Section
  {
    section: 'quiz',
    speaker: 'panoramix',
    lines: [
      "Testez vos connaissances, jeune apprenti...",
      "Chaque bonne réponse renforce le Village.",
      "Êtes-vous prêt(e) à relever le défi ?"
    ],
    delay: 500
  },

  // Quiz Perfect Score
  {
    section: 'quiz-perfect',
    speaker: 'asterix',
    lines: [
      "Par Toutatis ! Un score parfait !",
      "Vous êtes un véritable Maître du Quiz !",
      "Le Village est fier de vous !"
    ],
    delay: 300
  },

  // Testimonials Section
  {
    section: 'testimonials',
    speaker: 'panoramix',
    lines: [
      "Vous n'êtes pas seul(e) dans cette quête...",
      "Voici les écoles qui ont rejoint le Village.",
      "Leur succès prouve que la résistance fonctionne !"
    ],
    delay: 500
  },

  // CTA Section - Final Call
  {
    section: 'cta',
    speaker: 'asterix',
    lines: [
      "Le moment est venu de passer à l'action !",
      "Rejoignez le Village NIRD et libérez votre école.",
      "Ensemble, nous résisterons à l'Empire !"
    ],
    delay: 500
  },

  // Idle/Encouragement (when user pauses)
  {
    section: 'idle',
    speaker: 'idefix',
    lines: [
      "Continuez votre exploration !",
      "Chaque PC sauvé = un arbre préservé !",
      "Le Village compte sur vous !"
    ],
    delay: 10000
  },

  // Knowledge Potion Bridge Section
  {
    section: 'knowledge-potion',
    speaker: 'panoramix',
    lines: [
      "Pour chaque outil de l'Empire, il existe une alternative libre...",
      "Ma potion magique ? La connaissance des logiciels libres !",
      "Testez votre mémoire et découvrez les alternatives !"
    ],
    delay: 500
  },

  // Memory Game Section
  {
    section: 'memory',
    speaker: 'panoramix',
    lines: [
      "Trouvez les paires : propriétaire vs open source.",
      "Chaque correspondance renforce le Village !",
      "La connaissance est la première arme de la résistance !"
    ],
    delay: 500
  },

  // Memory Game Success
  {
    section: 'memory-success',
    speaker: 'panoramix',
    lines: [
      "Excellent ! Vous connaissez maintenant toutes les alternatives !",
      "LibreOffice, Firefox, GIMP... Les outils du Village !",
      "L'Empire n'a plus de secrets pour vous."
    ],
    delay: 300
  },

  // Threats Bridge Section
  {
    section: 'threats',
    speaker: 'obelix',
    lines: [
      "Les légions numériques de l'Empire approchent !",
      "Trackers, publicités, obsolescence programmée...",
      "Par Toutatis, il faut défendre le Village !"
    ],
    delay: 500
  },

  // Tower Defense Section
  {
    section: 'defense',
    speaker: 'obelix',
    lines: [
      "Placez vos défenses pour protéger le Village !",
      "Firewall, AdBlocker, Linux Update... nos armes secrètes !",
      "Ils ne passeront pas !"
    ],
    delay: 500
  },

  // Tower Defense Victory
  {
    section: 'defense-victory',
    speaker: 'obelix',
    lines: [
      "FORMIDABLE ! L'Empire recule !",
      "Vos défenses ont protégé le Village !",
      "Vous êtes un véritable Défenseur !"
    ],
    delay: 300
  },

  // Final Trial Bridge Section
  {
    section: 'final-trial',
    speaker: 'asterix',
    lines: [
      "Vous avez prouvé vos connaissances. Maintenant, prouvez votre maîtrise !",
      "Le terminal est l'arme ultime du résistant.",
      "Montrez-moi la vitesse de vos doigts !"
    ],
    delay: 500
  },

  // Typing Challenge Section
  {
    section: 'typing',
    speaker: 'asterix',
    lines: [
      "Tapez les commandes Linux le plus vite possible !",
      "Chaque commande maîtrisée = une victoire contre l'Empire.",
      "Battez le chronomètre et devenez Ninja du Terminal !"
    ],
    delay: 500
  },

  // Typing Challenge Success
  {
    section: 'typing-success',
    speaker: 'asterix',
    lines: [
      "Quelle vitesse ! Vous maîtrisez le terminal !",
      "ls, cd, sudo... Vous parlez couramment Linux !",
      "L'Empire tremble devant vos compétences !"
    ],
    delay: 300
  }
];

// Helper function to get dialogue for a section
export function getDialogueForSection(sectionId: string): SectionDialogue | undefined {
  return sectionDialogues.find(d => d.section === sectionId);
}

// Helper function to get character info
export function getCharacter(characterId: CharacterId): CharacterInfo {
  return characters[characterId];
}

// Reaction dialogues for achievements
export const achievementReactions: Record<string, { speaker: CharacterId; line: string }> = {
  first_steps: { speaker: 'panoramix', line: "Premiers pas accomplis ! Bienvenue au Village." },
  knowledge_seeker: { speaker: 'panoramix', line: "Vous avez exploré les 3 piliers ! La sagesse grandit." },
  pc_savior: { speaker: 'obelix', line: "Un PC sauvé ! L'Empire recule !" },
  quiz_master: { speaker: 'asterix', line: "Maître du Quiz ! Vos connaissances sont impressionnantes !" },
  linux_champion: { speaker: 'obelix', line: "Champion Linux ! Vous êtes des nôtres maintenant !" },
  alternatives_master: { speaker: 'panoramix', line: "Vous connaissez les alternatives ! Le Village est plus fort." },
  village_defender: { speaker: 'obelix', line: "FORMIDABLE ! L'Empire recule grâce à vous !" },
  terminal_ninja: { speaker: 'asterix', line: "Quelle vitesse ! Vous maîtrisez le terminal !" },
  village_hero: { speaker: 'asterix', line: "HÉROS DU VILLAGE ! Vous avez tout accompli ! Par Toutatis !" }
};
