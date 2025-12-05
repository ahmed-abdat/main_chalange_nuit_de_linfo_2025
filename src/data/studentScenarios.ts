/**
 * Student Scenarios - Curated for Village NIRD
 * 3 best scenarios for the hybrid teaser + full experience
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
  // TEASER SCENARIO (shown on main page)
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

  // FULL SCENARIO 2
  {
    id: 'student-2',
    title: 'Le Cloud vs Local',
    context: "L'ecole veut stocker tous vos travaux sur Google Drive. C'est pratique, mais tes donnees partent aux USA...",
    character: 'panoramix',
    choiceA: {
      id: 'A',
      title: 'Google Drive',
      description: 'Utiliser Google Drive. C\'est gratuit et tout le monde connait.',
      icon: 'cloud',
      color: '#C62828',
      feedback: "Tes donnees sont maintenant soumises au Cloud Act americain. Google peut les lire et les utiliser pour la pub."
    },
    choiceB: {
      id: 'B',
      title: 'Nextcloud',
      description: 'Utiliser Nextcloud, heberge en France. Tes donnees restent a toi !',
      icon: 'shield',
      color: '#00997d',
      points: { money: 50, protection: 100, environment: 60 },
      feedback: "Bravo ! Tes donnees restent en France, protegees par le RGPD. Personne ne peut les utiliser sans ton accord."
    },
    educationalInfo: {
      title: "Souverainete Numerique",
      explanation: "Quand tes donnees sont sur des serveurs etrangers, elles sont soumises aux lois de ce pays, pas aux tiennes.",
      benefits: [
        "Protection RGPD garantie",
        "Donnees en France",
        "Pas de tracking publicitaire"
      ],
      nirdPillar: 'responsible',
      fact: "Le Cloud Act permet au gouvernement US d'acceder aux donnees stockees par les entreprises americaines, meme en Europe."
    }
  },

  // FULL SCENARIO 3
  {
    id: 'student-3',
    title: "L'Application Proprietaire",
    context: "L'abonnement Microsoft Office coute trop cher ! L'ecole n'a plus d'argent pour le voyage de fin d'annee.",
    character: 'obelix',
    choiceA: {
      id: 'A',
      title: 'Payer Microsoft',
      description: 'Payer l\'abonnement et annuler le voyage scolaire.',
      icon: 'credit-card',
      color: '#C62828',
      feedback: "L'argent de l'ecole part en Californie. En plus, quand tu arretes de payer, tu perds l'acces a tes documents !"
    },
    choiceB: {
      id: 'B',
      title: 'LibreOffice',
      description: 'Utiliser LibreOffice. Gratuit, ca fait pareil, et on part en voyage !',
      icon: 'file-text',
      color: '#00997d',
      points: { money: 80, protection: 60, environment: 40 },
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
  return studentScenarios.filter(s => !s.isTeaser);
}
