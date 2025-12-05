/**
 * Parent Scenarios - Curated for Village NIRD
 * 3 best scenarios for parents making family tech decisions
 */

export interface ScenarioScores {
  environment: number;
  economic: number;
  protection: number;
}

export interface ParentDecision {
  id: string;
  label: string;
  description: string;
  type: 'bigTech' | 'alternative' | 'hybrid';
  feedback: string;
  icon: string;
  cost: string;
  color: string;
  scores: ScenarioScores;
}

export interface ParentScenario {
  id: string;
  title: string;
  context: string;
  character: 'panoramix' | 'asterix' | 'obelix' | 'idefix';
  decisions: ParentDecision[];
  isTeaser?: boolean;
}

export const parentScenarios: ParentScenario[] = [
  // TEASER SCENARIO (shown on main page)
  {
    id: 'parent-1',
    title: "Le choix de l'école",
    context: "Votre enfant rentre de l'école et vous annonce que l'établissement doit renouveler tous les ordinateurs. Le directeur propose deux options.",
    character: 'panoramix',
    isTeaser: true,
    decisions: [
      {
        id: '1a',
        label: 'Acheter des PC Windows',
        description: 'Suivre la recommandation du fournisseur habituel',
        type: 'bigTech',
        feedback: "Coût élevé (800€ par PC), mais solution familière. Les PC devront être remplacés dans 5 ans.",
        icon: 'laptop',
        cost: '800€/PC',
        color: '#C62828',
        scores: { environment: 20, economic: 10, protection: 60 }
      },
      {
        id: '1b',
        label: 'Migrer vers Linux',
        description: 'Adopter une solution libre et gratuite',
        type: 'alternative',
        feedback: "Coût minimal (50€ par PC pour la migration). Les PC existants peuvent être utilisés 10+ ans.",
        icon: 'terminal',
        cost: '50€/PC',
        color: '#00997d',
        scores: { environment: 95, economic: 95, protection: 85 }
      },
      {
        id: '1c',
        label: 'Mélange des deux',
        description: 'Garder Windows pour certains postes, Linux pour d\'autres',
        type: 'hybrid',
        feedback: "Approche pragmatique mais maintient des coûts récurrents sur la partie Windows.",
        icon: 'scale',
        cost: '400€/PC',
        color: '#F9A825',
        scores: { environment: 50, economic: 50, protection: 65 }
      }
    ]
  },

  // FULL SCENARIO 2
  {
    id: 'parent-2',
    title: 'Les données de votre enfant',
    context: "L'école utilise des outils en ligne pour les devoirs. Vous découvrez que les données des élèves sont stockées sur des serveurs américains.",
    character: 'idefix',
    decisions: [
      {
        id: '2a',
        label: 'Accepter les conditions',
        description: 'Continuer avec les outils actuels (Google Classroom)',
        type: 'bigTech',
        feedback: "Pratique, mais les données de votre enfant sont soumises au Cloud Act américain.",
        icon: 'cloud',
        cost: 'Gratuit',
        color: '#C62828',
        scores: { environment: 40, economic: 80, protection: 30 }
      },
      {
        id: '2b',
        label: 'Exiger des solutions européennes',
        description: "Demander l'utilisation d'outils hébergés en France",
        type: 'alternative',
        feedback: "Meilleure protection des données (RGPD). Les données restent en Europe.",
        icon: 'shield',
        cost: 'Gratuit',
        color: '#00997d',
        scores: { environment: 70, economic: 90, protection: 95 }
      },
      {
        id: '2c',
        label: 'Utiliser les deux',
        description: 'Garder certains outils, migrer d\'autres progressivement',
        type: 'hybrid',
        feedback: "Transition douce, mais maintient des risques sur les outils non migrés.",
        icon: 'refresh-cw',
        cost: 'Gratuit',
        color: '#F9A825',
        scores: { environment: 55, economic: 85, protection: 60 }
      }
    ]
  },

  // FULL SCENARIO 3
  {
    id: 'parent-3',
    title: "L'obsolescence programmée",
    context: "Votre enfant vous montre son ordinateur de l'école qui 'ralentit' après seulement 3 ans. L'école dit qu'il faut le remplacer.",
    character: 'obelix',
    decisions: [
      {
        id: '3a',
        label: 'Remplacer le PC',
        description: 'Acheter un nouveau matériel conforme',
        type: 'bigTech',
        feedback: "Solution rapide mais coûteuse. Le nouveau PC aura le même problème dans 3-5 ans.",
        icon: 'trash-2',
        cost: '800€',
        color: '#C62828',
        scores: { environment: 15, economic: 15, protection: 70 }
      },
      {
        id: '3b',
        label: 'Réinstaller Linux',
        description: 'Donner une seconde vie au PC avec un système léger',
        type: 'alternative',
        feedback: "Le PC retrouve ses performances d'origine. Le matériel peut servir 10+ ans.",
        icon: 'recycle',
        cost: '0€',
        color: '#00997d',
        scores: { environment: 100, economic: 100, protection: 80 }
      },
      {
        id: '3c',
        label: 'Mise à niveau partielle',
        description: 'Ajouter de la RAM et garder Windows',
        type: 'hybrid',
        feedback: "Améliore les performances mais ne résout pas le problème à long terme.",
        icon: 'cpu',
        cost: '150€',
        color: '#F9A825',
        scores: { environment: 40, economic: 50, protection: 60 }
      }
    ]
  }
];

// Helper functions
export function getParentScenarioById(id: string): ParentScenario | undefined {
  return parentScenarios.find(s => s.id === id);
}

export function getParentTeaserScenario(): ParentScenario | undefined {
  return parentScenarios.find(s => s.isTeaser);
}

export function getFullParentScenarios(): ParentScenario[] {
  return parentScenarios.filter(s => !s.isTeaser);
}

// Calculate average score for a decision
export function calculateAverageScore(scores: ScenarioScores): number {
  return Math.round((scores.environment + scores.economic + scores.protection) / 3);
}
