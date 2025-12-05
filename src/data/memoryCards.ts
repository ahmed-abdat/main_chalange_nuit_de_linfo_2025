// Memory Game Card Data
// Pairs of proprietary software and their open-source alternatives

export interface MemoryCard {
  id: string;
  pairId: string;
  type: 'proprietary' | 'opensource';
  name: string;
  description: string;
  color: string;
  icon: string; // emoji or icon name
}

export interface CardPair {
  pairId: string;
  proprietary: Omit<MemoryCard, 'pairId' | 'type'>;
  opensource: Omit<MemoryCard, 'pairId' | 'type'>;
  fact: string; // Educational fact shown on match
}

export const CARD_PAIRS: CardPair[] = [
  {
    pairId: 'os',
    proprietary: {
      id: 'windows',
      name: 'Windows',
      description: 'Systeme proprietaire Microsoft',
      color: '#0078D4',
      icon: 'monitor'
    },
    opensource: {
      id: 'linux-nird',
      name: 'Linux NIRD',
      description: 'Systeme libre et gratuit',
      color: '#00997d',
      icon: 'terminal'
    },
    fact: 'Linux peut faire revivre des PCs de plus de 10 ans !'
  },
  {
    pairId: 'office',
    proprietary: {
      id: 'ms-office',
      name: 'MS Office',
      description: 'Suite bureautique payante',
      color: '#D83B01',
      icon: 'file-text'
    },
    opensource: {
      id: 'libreoffice',
      name: 'LibreOffice',
      description: 'Suite bureautique libre',
      color: '#18A303',
      icon: 'file-spreadsheet'
    },
    fact: 'LibreOffice est utilise par des millions de personnes dans le monde !'
  },
  {
    pairId: 'browser',
    proprietary: {
      id: 'chrome',
      name: 'Google Chrome',
      description: 'Navigateur qui collecte vos donnees',
      color: '#4285F4',
      icon: 'globe'
    },
    opensource: {
      id: 'firefox',
      name: 'Firefox',
      description: 'Navigateur respectueux de la vie privee',
      color: '#FF6611',
      icon: 'flame'
    },
    fact: 'Firefox bloque par defaut les trackers publicitaires !'
  },
  {
    pairId: 'image',
    proprietary: {
      id: 'photoshop',
      name: 'Photoshop',
      description: 'Editeur d\'images payant',
      color: '#31A8FF',
      icon: 'image'
    },
    opensource: {
      id: 'gimp',
      name: 'GIMP',
      description: 'Editeur d\'images libre',
      color: '#5C5543',
      icon: 'palette'
    },
    fact: 'GIMP signifie GNU Image Manipulation Program !'
  },
  {
    pairId: 'email',
    proprietary: {
      id: 'outlook',
      name: 'Outlook',
      description: 'Client mail Microsoft',
      color: '#0078D4',
      icon: 'mail'
    },
    opensource: {
      id: 'thunderbird',
      name: 'Thunderbird',
      description: 'Client mail libre Mozilla',
      color: '#0A84FF',
      icon: 'inbox'
    },
    fact: 'Thunderbird respecte votre vie privee et ne scanne pas vos emails !'
  },
  {
    pairId: 'cloud',
    proprietary: {
      id: 'google-drive',
      name: 'Google Drive',
      description: 'Stockage cloud qui analyse vos fichiers',
      color: '#4285F4',
      icon: 'cloud'
    },
    opensource: {
      id: 'nextcloud',
      name: 'Nextcloud',
      description: 'Cloud prive et souverain',
      color: '#0082C9',
      icon: 'cloud-off'
    },
    fact: 'Avec Nextcloud, vos donnees restent en France !'
  },
  {
    pairId: 'code',
    proprietary: {
      id: 'vscode',
      name: 'VS Code',
      description: 'Editeur avec telemetrie Microsoft',
      color: '#007ACC',
      icon: 'code'
    },
    opensource: {
      id: 'vscodium',
      name: 'VSCodium',
      description: 'VS Code sans telemetrie',
      color: '#2F80ED',
      icon: 'code-2'
    },
    fact: 'VSCodium est identique a VS Code mais sans espionnage !'
  },
  {
    pairId: 'chat',
    proprietary: {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Messagerie Meta (Facebook)',
      color: '#25D366',
      icon: 'message-circle'
    },
    opensource: {
      id: 'signal',
      name: 'Signal',
      description: 'Messagerie chiffree et libre',
      color: '#3A76F0',
      icon: 'lock'
    },
    fact: 'Signal est recommande par les experts en securite du monde entier !'
  }
];

// Generate all cards from pairs
export function generateCards(): MemoryCard[] {
  const cards: MemoryCard[] = [];

  CARD_PAIRS.forEach(pair => {
    cards.push({
      ...pair.proprietary,
      pairId: pair.pairId,
      type: 'proprietary'
    });
    cards.push({
      ...pair.opensource,
      pairId: pair.pairId,
      type: 'opensource'
    });
  });

  return cards;
}

// Shuffle cards for game
export function shuffleCards(cards: MemoryCard[]): MemoryCard[] {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get fact for a matched pair
export function getFactForPair(pairId: string): string {
  const pair = CARD_PAIRS.find(p => p.pairId === pairId);
  return pair?.fact || '';
}

// Game difficulty configurations
export const DIFFICULTY = {
  easy: { pairs: 4, timeLimit: null },
  medium: { pairs: 6, timeLimit: 120 },
  hard: { pairs: 8, timeLimit: 90 }
};
