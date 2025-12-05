/**
 * Administrator/Tech Director Scenarios - Village NIRD
 *
 * Credits:
 * - Original scenarios by: NIRD branch team
 * - Adapted for DefisSection format
 *
 * La Nuit de l'Info 2025
 */

export interface AdminChoice {
  id: 'A' | 'B';
  title: string;
  description: string;
  icon: string;
  color: string;
  feedback: string;
  impact: {
    budget: number;
    inclusion: number;
    durability: number;
  };
}

export interface AdminEducationalInfo {
  title: string;
  explanation: string;
  benefits: string[];
  nirdPillar: 'inclusive' | 'responsible' | 'sustainable';
  fact: string;
}

export interface AdminScenario {
  id: string;
  title: string;
  context: string;
  character: 'panoramix' | 'asterix' | 'obelix' | 'idefix';
  choiceA: AdminChoice;
  choiceB: AdminChoice;
  educationalInfo: AdminEducationalInfo;
  isTeaser?: boolean;
}

export const adminScenarios: AdminScenario[] = [
  // SCENARIO 1 - Windows 10 Crisis (TEASER)
  {
    id: 'admin-1',
    title: 'Windows 10 bloque la salle info',
    context: "50 ordinateurs refusent la mise a jour vers Windows 11. Les machines fonctionnent encore mais Microsoft ne les supporte plus. Que decidez-vous ?",
    character: 'panoramix',
    isTeaser: true,
    choiceA: {
      id: 'A',
      title: 'Acheter 50 nouveaux PC',
      description: 'Commander 50 nouveaux ordinateurs avec Windows 11 preinstalle.',
      icon: 'laptop',
      color: '#C62828',
      feedback: "25 000EUR partis en une seule commande. Le budget annuel a fondu, et ces PC seront obsoletes dans 5 ans aussi.",
      impact: { budget: -25, inclusion: 0, durability: -5 }
    },
    choiceB: {
      id: 'B',
      title: 'Installer Linux',
      description: 'Reinstaller les 50 machines avec Linux Mint, un systeme libre et leger.',
      icon: 'terminal',
      color: '#00997d',
      feedback: "Apres un week-end d'installation, les machines reprennent vie ! 25 000EUR economises et equipements prolonges de 10 ans.",
      impact: { budget: 25, inclusion: 2, durability: 10 }
    },
    educationalInfo: {
      title: "Lutte contre l'obsolescence programmee",
      explanation: "Linux permet de faire fonctionner des ordinateurs pendant 10+ ans au lieu de 3-5 ans sous Windows.",
      benefits: [
        "Economies massives sur le materiel",
        "Reduction des dechets electroniques",
        "Autonomie vis-a-vis des editeurs"
      ],
      nirdPillar: 'sustainable',
      fact: "L'Education Nationale francaise pourrait economiser des millions d'euros en adoptant Linux."
    }
  },

  // SCENARIO 2 - Cloud Academy
  {
    id: 'admin-2',
    title: 'Le cloud "gratuit" de l\'academie',
    context: "L'academie propose un cloud gratuit pour les documents des eleves. Mais les donnees seront stockees aux Etats-Unis, soumises au Cloud Act.",
    character: 'idefix',
    choiceA: {
      id: 'A',
      title: 'Accepter le cloud academique',
      description: "C'est gratuit et tout le monde sait deja l'utiliser.",
      icon: 'cloud',
      color: '#C62828',
      feedback: "L'etablissement a perdu la souverainete sur ses donnees. Les contrats cachent des couts et les donnees des eleves sont aux USA.",
      impact: { budget: -5, inclusion: 1, durability: -2 }
    },
    choiceB: {
      id: 'B',
      title: 'Installer Nextcloud en local',
      description: 'Deployer un serveur Nextcloud dans l\'etablissement. Les donnees restent sur place.',
      icon: 'shield',
      color: '#00997d',
      feedback: "Les donnees ne quittent jamais l'ecole. Les eleves apprennent a gerer leur propre espace numerique. Autonomie retrouvee !",
      impact: { budget: 2, inclusion: 1, durability: 3 }
    },
    educationalInfo: {
      title: "Souverainete numerique et RGPD",
      explanation: "Les donnees hebergees hors UE sont soumises aux lois etrangeres. Le RGPD protege les donnees en Europe.",
      benefits: [
        "Donnees proteges par le RGPD",
        "Controle total sur vos fichiers",
        "Independance vis-a-vis des GAFAM"
      ],
      nirdPillar: 'responsible',
      fact: "Le Cloud Act americain permet au gouvernement US d'acceder aux donnees stockees par des entreprises americaines, meme hors USA."
    }
  },

  // SCENARIO 3 - Expiring Licenses
  {
    id: 'admin-3',
    title: 'Les licences qui expirent',
    context: "Alerte ! Les 200 licences Microsoft Office expirent dans 2 semaines. Cout de renouvellement : 8 000EUR par an. Le budget est serre.",
    character: 'obelix',
    choiceA: {
      id: 'A',
      title: 'Renouveler les licences',
      description: 'Payer le renouvellement des 200 licences Office.',
      icon: 'credit-card',
      color: '#C62828',
      feedback: "8 000EUR par an, pour toujours. Chaque annee c'est la meme angoisse. L'etablissement reste dependant de Microsoft.",
      impact: { budget: -8, inclusion: 0, durability: -1 }
    },
    choiceB: {
      id: 'B',
      title: 'Migrer vers LibreOffice',
      description: 'Former les enseignants a LibreOffice, gratuit et compatible avec Microsoft.',
      icon: 'file-text',
      color: '#00997d',
      feedback: "8 000EUR economises par an ! LibreOffice fait tout ce que fait Office. Plus jamais d'angoisse de renouvellement.",
      impact: { budget: 8, inclusion: 1, durability: 2 }
    },
    educationalInfo: {
      title: "Logiciels libres vs proprietaires",
      explanation: "Les logiciels libres comme LibreOffice sont gratuits, sans licences a renouveler, et appartiennent a tous.",
      benefits: [
        "Zero cout de licence",
        "Formats ouverts (ODF)",
        "Pas de dependance editeur"
      ],
      nirdPillar: 'inclusive',
      fact: "La Gendarmerie Nationale utilise LibreOffice sur 72 000 postes et economise des millions d'euros."
    }
  },

  // SCENARIO 4 - Student Club
  {
    id: 'admin-4',
    title: 'Le club informatique des eleves',
    context: "Des eleves passionnes veulent creer un club informatique pour apprendre a reparer les PC et installer Linux. Que repondez-vous ?",
    character: 'asterix',
    choiceA: {
      id: 'A',
      title: 'Refuser le club',
      description: 'Maintenir le controle strict sur les machines. Trop risque.',
      icon: 'eye-off',
      color: '#C62828',
      feedback: "Le club ne voit jamais le jour. L'etablissement rate une occasion d'impliquer les eleves dans le numerique responsable.",
      impact: { budget: 0, inclusion: -2, durability: 0 }
    },
    choiceB: {
      id: 'B',
      title: 'Creer le club NIRD',
      description: 'Donner un espace et du materiel pour apprendre la maintenance et Linux.',
      icon: 'wrench',
      color: '#00997d',
      feedback: "Le club NIRD nait ! Les eleves reparent les vieux PC, installent Linux et deviennent des ambassadeurs du numerique responsable.",
      impact: { budget: 1, inclusion: 3, durability: 2 }
    },
    educationalInfo: {
      title: "L'education par la pratique",
      explanation: "Les clubs informatiques permettent aux eleves d'apprendre en faisant, et de transmettre leurs connaissances.",
      benefits: [
        "Eleves acteurs de leur numerique",
        "Transmission de savoirs",
        "Reparation plutot que remplacement"
      ],
      nirdPillar: 'inclusive',
      fact: "Le lycee Carnot de Bruay-la-Buissiere a reconditionne 132 ordinateurs grace a son club NIRD."
    }
  },

  // SCENARIO 5 - Server Failure
  {
    id: 'admin-5',
    title: 'La panne du serveur messagerie',
    context: "Vendredi soir, le serveur mail tombe. Le technicien est absent. Intervention externe urgente : 500EUR. Que faites-vous ?",
    character: 'obelix',
    choiceA: {
      id: 'A',
      title: 'Payer l\'intervention externe',
      description: 'Faire appel a une entreprise specialisee. Service retabli rapidement.',
      icon: 'zap',
      color: '#C62828',
      feedback: "500EUR depenses pour une panne evitable. La dependance aux services externes s'accroit.",
      impact: { budget: -5, inclusion: 0, durability: -1 }
    },
    choiceB: {
      id: 'B',
      title: 'Former une equipe interne',
      description: 'Profiter de cette panne pour former le technicien et des enseignants volontaires.',
      icon: 'wrench',
      color: '#00997d',
      feedback: "L'etablissement developpe ses competences internes. Plus jamais besoin de payer 500EUR pour ce type de panne !",
      impact: { budget: 2, inclusion: 1, durability: 2 }
    },
    educationalInfo: {
      title: "Autonomie technique",
      explanation: "Former des equipes internes reduit les couts et augmente la resilience de l'etablissement.",
      benefits: [
        "Reduction des couts d'intervention",
        "Reactivite en cas de probleme",
        "Montee en competences des equipes"
      ],
      nirdPillar: 'responsible',
      fact: "Un etablissement autonome peut economiser jusqu'a 5 000EUR par an en interventions externes."
    }
  }
];

// Helper functions
export function getAdminScenarioById(id: string): AdminScenario | undefined {
  return adminScenarios.find(s => s.id === id);
}

export function getAdminTeaserScenario(): AdminScenario | undefined {
  return adminScenarios.find(s => s.isTeaser);
}

export function getFullAdminScenarios(): AdminScenario[] {
  return adminScenarios;
}
