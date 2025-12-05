// Quiz questions about NIRD and digital resistance

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'crisis' | 'solution' | 'nird' | 'environment';
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Quand se termine le support de Windows 10 ?',
    options: ['Janvier 2025', 'Octobre 2025', 'Janvier 2026', 'Octobre 2026'],
    correctIndex: 1,
    explanation: 'Le support de Windows 10 prend fin en octobre 2025, rendant 240 millions de PCs vulnérables.',
    category: 'crisis'
  },
  {
    id: 'q2',
    question: 'Combien de PCs dans le monde sont menacés par cette fin de support ?',
    options: ['50 millions', '120 millions', '240 millions', '500 millions'],
    correctIndex: 2,
    explanation: '240 millions de PCs dans le monde ne peuvent pas passer à Windows 11 et deviennent vulnérables.',
    category: 'crisis'
  },
  {
    id: 'q3',
    question: 'Quel pourcentage de l\'administration française utilise encore Windows 10 ?',
    options: ['32%', '48%', '68%', '82%'],
    correctIndex: 2,
    explanation: '68% de l\'administration française utilise encore Windows 10, ce qui représente un défi majeur.',
    category: 'crisis'
  },
  {
    id: 'q4',
    question: 'Quel est le coût moyen d\'un nouveau PC sous Windows 11 ?',
    options: ['400 euros', '600 euros', '800 euros', '1000 euros'],
    correctIndex: 2,
    explanation: 'Un nouveau PC compatible Windows 11 coûte environ 800 euros en moyenne.',
    category: 'crisis'
  },
  {
    id: 'q5',
    question: 'Que signifie NIRD ?',
    options: [
      'Numérique Innovant Rapide Digital',
      'Numérique Inclusif Responsable Durable',
      'Nouvelle Initiative Réseau Digital',
      'Numérique Intégration Ressources Data'
    ],
    correctIndex: 1,
    explanation: 'NIRD signifie Numérique Inclusif, Responsable et Durable - les 3 piliers du projet.',
    category: 'nird'
  },
  {
    id: 'q6',
    question: 'Combien de RAM minimum faut-il pour faire tourner PrimTux (Linux éducatif) ?',
    options: ['512 Mo', '1 Go', '2 Go', '4 Go'],
    correctIndex: 2,
    explanation: 'PrimTux fonctionne avec seulement 2 Go de RAM, permettant de réutiliser de vieux ordinateurs.',
    category: 'solution'
  },
  {
    id: 'q7',
    question: 'Combien de PCs ont été reconditionnés par le lycée Carnot pour des écoles primaires ?',
    options: ['42', '78', '132', '256'],
    correctIndex: 2,
    explanation: 'Le lycée Carnot a reconditionné 132 ordinateurs pour 11 écoles primaires.',
    category: 'nird'
  },
  {
    id: 'q8',
    question: 'Quelle est la consommation électrique d\'un Raspberry Pi 400 comparé à un PC standard ?',
    options: ['Identique', '2x moins', '5x moins', '10x moins'],
    correctIndex: 3,
    explanation: 'Un Raspberry Pi 400 consomme environ 5W contre 50-100W pour un PC standard, soit ~10x moins.',
    category: 'environment'
  },
  {
    id: 'q9',
    question: 'Combien coûte une clé USB Linux pour sauver un PC ?',
    options: ['Gratuit', '10 euros', '50 euros', '100 euros'],
    correctIndex: 0,
    explanation: 'Linux est gratuit ! Il suffit de télécharger l\'image et de la mettre sur une clé USB.',
    category: 'solution'
  },
  {
    id: 'q10',
    question: 'Quelle durée de vie peut atteindre un PC sous Linux ?',
    options: ['3-5 ans', '5-7 ans', '8-10 ans', '10-15 ans'],
    correctIndex: 2,
    explanation: 'Avec Linux, un PC peut facilement durer 8 à 10 ans au lieu de 3 à 5 ans sous Windows.',
    category: 'environment'
  }
];

// Get random questions for a quiz session
export function getRandomQuestions(count: number = 5): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get questions by category
export function getQuestionsByCategory(category: QuizQuestion['category']): QuizQuestion[] {
  return quizQuestions.filter(q => q.category === category);
}
