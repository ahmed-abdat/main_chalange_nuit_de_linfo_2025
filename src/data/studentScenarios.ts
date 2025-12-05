/**
 * Student Scenarios - Village NIRD
 *
 * Credits:
 * - Original scenarios by: Hashimi (hashimi branch)
 * - Adapted for dark theme by: Main team
 *
 * La Nuit de l'Info 2025
 */

export type ChoiceType = 'A' | 'B';
export type ScenarioId = string;

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
  realityCheck?: string;
}

export interface EducationalInfo {
  title: string;
  explanation: string;
  benefits: string[];
  nirdPillar: 'inclusive' | 'responsible' | 'sustainable';
  fact: string;
  tools?: Array<{
    name: string;
    description: string;
    link?: string;
  }>;
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
    context: "Windows 10 va mourir ! Votre école doit changer 50 ordinateurs car ils ne sont pas compatibles Windows 11. Que proposez-vous ?",
    character: 'asterix',
    isTeaser: true,
    choiceA: {
      id: 'A',
      title: 'Tout Racheter',
      description: 'Jeter les 50 PC et payer 25 000€ pour des neufs.',
      icon: 'laptop',
      color: '#C62828',
      feedback: "Aïe ! Vous venez de jeter 50 ordinateurs fonctionnels. C'est 12 tonnes de CO2 et 25 000€ de budget gaspillé."
    },
    choiceB: {
      id: 'B',
      title: 'Passer à Linux',
      description: 'Installer Linux gratuitement. Les vieux PC deviennent ultra-rapides !',
      icon: 'terminal',
      color: '#00997d',
      points: { money: 100, protection: 100, environment: 100 },
      feedback: "Excellent ! Vous avez sauvé 50 PC de la poubelle, économisé 25 000€ et réduit l'empreinte carbone de l'école !"
    },
    educationalInfo: {
      title: "C'est quoi l'Obsolescence Programmée ?",
      explanation: "C'est quand on vous force à jeter un appareil qui marche encore, juste parce que le logiciel change.",
      benefits: [
        "0€ dépensé en matériel inutile",
        "Moins de déchets toxiques",
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
    context: "L'abonnement Office coûte trop cher ! L'école n'a plus d'argent pour le voyage de fin d'année.",
    character: 'panoramix',
    choiceA: {
      id: 'A',
      title: 'Payer Microsoft',
      description: "Payer l'abonnement et annuler le voyage scolaire.",
      icon: 'credit-card',
      color: '#C62828',
      feedback: "L'argent de l'école part en Californie. En plus, sans payer, vous perdez l'accès à vos documents !"
    },
    choiceB: {
      id: 'B',
      title: 'LibreOffice',
      description: 'Utiliser LibreOffice. Gratuit, ça fait pareil, et on part en voyage !',
      icon: 'file-text',
      color: '#00997d',
      points: { money: 80, protection: 20, environment: 0 },
      feedback: "Génial ! LibreOffice fait tout pareil que Office, en gratuit. L'argent économisé finance le voyage !"
    },
    educationalInfo: {
      title: "Logiciels Libres vs Propriétaires",
      explanation: "Les logiciels libres comme LibreOffice appartiennent à tout le monde. Personne ne peut vous demander de payer.",
      benefits: [
        "Gratuit pour toujours",
        "Ouvre tous les fichiers Office",
        "L'argent sert à des projets utiles"
      ],
      nirdPillar: 'inclusive',
      fact: "La Gendarmerie Nationale utilise des logiciels libres et économise des millions d'euros."
    }
  },

  // SCENARIO 3 - Slow PCs
  {
    id: 'student-3',
    title: 'PC Lents au CDI',
    context: "Les PC du CDI sont trop lents ! On met 10 minutes à les allumer.",
    character: 'obelix',
    choiceA: {
      id: 'A',
      title: 'À la poubelle !',
      description: 'Ils sont vieux, ils ne servent à rien. On les jette.',
      icon: 'trash-2',
      color: '#C62828',
      feedback: "Stop ! Ces ordinateurs sont juste encrassés. Les jeter crée des déchets polluants qui finissent en Afrique."
    },
    choiceB: {
      id: 'B',
      title: 'Opération Boost',
      description: 'On change le disque dur pour 30€. Ils repartent comme neufs !',
      icon: 'wrench',
      color: '#00997d',
      points: { money: 60, protection: 0, environment: 90 },
      feedback: "Bravo ! Réparer coûte 30€ au lieu de 800€, et évite les déchets électroniques !"
    },
    educationalInfo: {
      title: "Réparer c'est Gagner",
      explanation: "Souvent, un seul composant ralentit l'ordinateur. Le changer est facile, pas cher et écolo.",
      benefits: [
        "Apprenez comment marche un ordi",
        "Évitez les déchets électroniques",
        "Faites de grosses économies"
      ],
      nirdPillar: 'sustainable',
      fact: "80% de la pollution d'un ordinateur vient de sa fabrication, pas de son utilisation."
    }
  },

  // SCENARIO 4 - Privacy
  {
    id: 'student-4',
    title: 'Vie Privée en Ligne',
    context: "Google sait tout de vous ! Vos recherches sont enregistrées pour vous cibler avec des pubs.",
    character: 'idefix',
    choiceA: {
      id: 'A',
      title: 'Tant pis',
      description: "Je n'ai rien à cacher, laissez-moi voir mes pubs.",
      icon: 'eye',
      color: '#C62828',
      feedback: "Vous n'avez rien à cacher ? Imaginez quelqu'un qui note tout ce que vous faites pour le vendre. C'est ce que fait Google."
    },
    choiceB: {
      id: 'B',
      title: 'Mode Secret',
      description: 'Utiliser Qwant ou DuckDuckGo. Ils ne vous espionnent pas.',
      icon: 'eye-off',
      color: '#00997d',
      points: { money: 0, protection: 90, environment: 0 },
      feedback: "Votre vie privée est protégée ! Ces moteurs ne vendent pas vos données aux publicitaires."
    },
    educationalInfo: {
      title: "Votre vie privée n'est pas à vendre",
      explanation: "Quand c'est gratuit, c'est vous le produit ! Les moteurs éthiques ne vendent pas vos données.",
      benefits: [
        "Personne ne sait ce que vous cherchez",
        "Pas de bulles de filtres",
        "Protégez votre identité numérique"
      ],
      nirdPillar: 'responsible',
      fact: "Les géants du web créent un 'profil' de vous pour prédire ce que vous allez acheter ou penser."
    }
  },

  // SCENARIO 5 - Gaming
  {
    id: 'student-5',
    title: 'Jeux Vidéo Responsables',
    context: "Fortnite lague trop ! Votre PC n'est pas assez puissant pour les gros jeux modernes.",
    character: 'asterix',
    choiceA: {
      id: 'A',
      title: 'PC Gamer à 2000€',
      description: 'Demander un PC qui consomme autant qu\'un four électrique.',
      icon: 'zap',
      color: '#C62828',
      feedback: "2000€ pour jouer ? C'est le prix d'une voiture ! Ces PC consomment énormément d'électricité."
    },
    choiceB: {
      id: 'B',
      title: 'Jeux Rétro & Libres',
      description: 'Jouer à Minetest ou des jeux rétro. Fun et léger !',
      icon: 'gamepad',
      color: '#00997d',
      points: { money: 80, protection: 0, environment: 50 },
      feedback: "Les jeux libres sont créés par des passionnés, pour le fun, pas pour l'argent. Et ça tourne partout !"
    },
    educationalInfo: {
      title: "Le Jeu Libre et Créatif",
      explanation: "On n'a pas besoin de graphismes 4K pour s'amuser. Les jeux libres sont souvent meilleurs !",
      benefits: [
        "Tourne sur n'importe quel ordi",
        "Vous pouvez modifier le jeu (mods)",
        "Développez votre créativité"
      ],
      nirdPillar: 'inclusive',
      fact: "Minecraft original a été inspiré par des jeux libres développés par la communauté."
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
