/**
 * Student Scenarios - Village NIRD
 *
 * Credits:
 * - Original scenarios by: Hashimi (hashimi branch)
 * - Adapted for dark theme by: Main team
 *
 * La Nuit de l'Info 2025
 */

export interface ScenarioPoints {
  money: number;
  protection: number;
  environment: number;
}

export interface ScenarioChoice {
  id: 'A' | 'B';
  title: string;
  description: string;
  icon: string;
  color: string;
  points?: ScenarioPoints;
  feedback: string;
}

export interface EducationalInfo {
  title: string;
  explanation: string;
  benefits: string[];
  nirdPillar: 'inclusive' | 'responsible' | 'sustainable';
  fact: string;
}

export interface StudentScenario {
  id: string;
  title: string;
  context: string;
  character: 'asterix' | 'panoramix' | 'obelix' | 'idefix';
  choiceA: ScenarioChoice;
  choiceB: ScenarioChoice;
  educationalInfo: EducationalInfo;
  isTeaser?: boolean;
}

export const studentScenarios: StudentScenario[] = [
  // SCENARIO 1 - Windows 10 Crisis (TEASER)
  {
    id: 'student-1',
    title: 'Nouveau PC ou Linux ?',
    context: "Windows 10 va mourir ! Ton ecole doit changer 50 ordinateurs car ils ne sont pas compatibles Windows 11. Que proposes-tu ?",
    character: 'asterix',
    isTeaser: true,
    choiceA: {
      id: 'A',
      title: 'Tout Racheter',
      description: 'Jeter les 50 PC et payer 25 000EUR pour des neufs.',
      icon: 'laptop',
      color: '#C62828',
      feedback: "Aie ! Tu viens de jeter 50 ordinateurs fonctionnels. C'est 12 tonnes de CO2 et 25 000EUR de budget gaspille."
    },
    choiceB: {
      id: 'B',
      title: 'Passer a Linux',
      description: 'Installer Linux gratuitement. Les vieux PC deviennent ultra-rapides !',
      icon: 'terminal',
      color: '#00997d',
      points: { money: 100, protection: 100, environment: 100 },
      feedback: "Excellent ! Tu as sauve 50 PC de la poubelle, economise 25 000EUR et reduit l'empreinte carbone de l'ecole !"
    },
    educationalInfo: {
      title: "C'est quoi l'Obsolescence Programmee ?",
      explanation: "C'est quand on te force a jeter un appareil qui marche encore, juste parce que le logiciel change.",
      benefits: [
        "0EUR depense en materiel inutile",
        "Moins de dechets toxiques",
        "Des PC plus rapides qu'avant"
      ],
      nirdPillar: 'sustainable',
      fact: "Fabriquer un ordinateur consomme 1500 litres d'eau et 240 kg de combustibles fossiles."
    }
  },

  // SCENARIO 2 - Office vs LibreOffice
  {
    id: 'student-2',
    title: 'Logiciels Payants ou Libres ?',
    context: "L'abonnement Office coute trop cher ! L'ecole n'a plus d'argent pour le voyage de fin d'annee.",
    character: 'panoramix',
    choiceA: {
      id: 'A',
      title: 'Payer Microsoft',
      description: "Payer l'abonnement et annuler le voyage scolaire.",
      icon: 'credit-card',
      color: '#C62828',
      feedback: "L'argent de l'ecole part en Californie. En plus, sans payer, tu perds l'acces a tes documents !"
    },
    choiceB: {
      id: 'B',
      title: 'LibreOffice',
      description: 'Utiliser LibreOffice. Gratuit, ca fait pareil, et on part en voyage !',
      icon: 'file-text',
      color: '#00997d',
      points: { money: 80, protection: 20, environment: 0 },
      feedback: "Genial ! LibreOffice fait tout pareil que Office, en gratuit. L'argent economise finance le voyage !"
    },
    educationalInfo: {
      title: "Logiciels Libres vs Proprietaires",
      explanation: "Les logiciels libres comme LibreOffice appartiennent a tout le monde. Personne ne peut te demander de payer.",
      benefits: [
        "Gratuit pour toujours",
        "Ouvre tous les fichiers Office",
        "L'argent sert a des projets utiles"
      ],
      nirdPillar: 'inclusive',
      fact: "La Gendarmerie Nationale utilise des logiciels libres et economise des millions d'euros."
    }
  },

  // SCENARIO 3 - Slow PCs
  {
    id: 'student-3',
    title: 'PC Lents au CDI',
    context: "Les PC du CDI sont trop lents ! On met 10 minutes a les allumer.",
    character: 'obelix',
    choiceA: {
      id: 'A',
      title: 'A la poubelle !',
      description: 'Ils sont vieux, ils ne servent a rien. On les jette.',
      icon: 'trash-2',
      color: '#C62828',
      feedback: "Stop ! Ces ordinateurs sont juste encrasses. Les jeter cree des dechets polluants qui finissent en Afrique."
    },
    choiceB: {
      id: 'B',
      title: 'Operation Boost',
      description: 'On change le disque dur pour 30EUR. Ils repartent comme neufs !',
      icon: 'wrench',
      color: '#00997d',
      points: { money: 60, protection: 0, environment: 90 },
      feedback: "Bravo ! Reparer coute 30EUR au lieu de 800EUR, et evite les dechets electroniques !"
    },
    educationalInfo: {
      title: "Reparer c'est Gagner",
      explanation: "Souvent, un seul composant ralentit l'ordinateur. Le changer est facile, pas cher et ecolo.",
      benefits: [
        "Apprends comment marche un ordi",
        "Evite les dechets electroniques",
        "Fais de grosses economies"
      ],
      nirdPillar: 'sustainable',
      fact: "80% de la pollution d'un ordinateur vient de sa fabrication, pas de son utilisation."
    }
  },

  // SCENARIO 4 - Privacy
  {
    id: 'student-4',
    title: 'Vie Privee en Ligne',
    context: "Google sait tout de toi ! Tes recherches sont enregistrees pour te cibler avec des pubs.",
    character: 'idefix',
    choiceA: {
      id: 'A',
      title: 'Tant pis',
      description: "Je n'ai rien a cacher, laissez-moi voir mes pubs.",
      icon: 'eye',
      color: '#C62828',
      feedback: "Tu n'as rien a cacher ? Imagine quelqu'un qui note tout ce que tu fais pour le vendre. C'est ce que fait Google."
    },
    choiceB: {
      id: 'B',
      title: 'Mode Secret',
      description: 'Utiliser Qwant ou DuckDuckGo. Ils ne t\'espionnent pas.',
      icon: 'eye-off',
      color: '#00997d',
      points: { money: 0, protection: 90, environment: 0 },
      feedback: "Ta vie privee est protegee ! Ces moteurs ne vendent pas tes donnees aux publicitaires."
    },
    educationalInfo: {
      title: "Ta vie privee n'est pas a vendre",
      explanation: "Quand c'est gratuit, c'est toi le produit ! Les moteurs ethiques ne vendent pas tes donnees.",
      benefits: [
        "Personne ne sait ce que tu cherches",
        "Pas de bulles de filtres",
        "Protege ton identite numerique"
      ],
      nirdPillar: 'responsible',
      fact: "Les geants du web creent un 'profil' de toi pour predire ce que tu vas acheter ou penser."
    }
  },

  // SCENARIO 5 - Gaming
  {
    id: 'student-5',
    title: 'Jeux Video Responsables',
    context: "Fortnite lague trop ! Ton PC n'est pas assez puissant pour les gros jeux modernes.",
    character: 'asterix',
    choiceA: {
      id: 'A',
      title: 'PC Gamer a 2000EUR',
      description: 'Demander un PC qui consomme autant qu\'un four electrique.',
      icon: 'zap',
      color: '#C62828',
      feedback: "2000EUR pour jouer ? C'est le prix d'une voiture ! Ces PC consomment enormement d'electricite."
    },
    choiceB: {
      id: 'B',
      title: 'Jeux Retro & Libres',
      description: 'Jouer a Minetest ou des jeux retro. Fun et leger !',
      icon: 'gamepad',
      color: '#00997d',
      points: { money: 80, protection: 0, environment: 50 },
      feedback: "Les jeux libres sont crees par des passionnes, pour le fun, pas pour l'argent. Et ca tourne partout !"
    },
    educationalInfo: {
      title: "Le Jeu Libre et Creatif",
      explanation: "On n'a pas besoin de graphismes 4K pour s'amuser. Les jeux libres sont souvent meilleurs !",
      benefits: [
        "Tourne sur n'importe quel ordi",
        "Tu peux modifier le jeu (mods)",
        "Developpe ta creativite"
      ],
      nirdPillar: 'inclusive',
      fact: "Minecraft original a ete inspire par des jeux libres developpes par la communaute."
    }
  }
];

// Helper functions
export function getStudentScenarioById(id: string): StudentScenario | undefined {
  return studentScenarios.find(s => s.id === id);
}

export function getStudentTeaserScenario(): StudentScenario | undefined {
  return studentScenarios.find(s => s.isTeaser);
}

export function getFullStudentScenarios(): StudentScenario[] {
  return studentScenarios;
}
