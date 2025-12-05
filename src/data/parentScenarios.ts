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
    title: "Le choix de l'ecole",
    context: "Votre enfant rentre de l'ecole et vous annonce que l'etablissement doit renouveler tous les ordinateurs. Le directeur propose deux options.",
    character: 'panoramix',
    isTeaser: true,
    decisions: [
      {
        id: '1a',
        label: 'Acheter des PC Windows',
        description: 'Suivre la recommandation du fournisseur habituel',
        type: 'bigTech',
        feedback: "Cout eleve (800EUR par PC), mais solution familiere. Les PC devront etre remplaces dans 5 ans.",
        icon: 'laptop',
        cost: '800EUR/PC',
        color: '#C62828',
        scores: { environment: 20, economic: 10, protection: 60 }
      },
      {
        id: '1b',
        label: 'Migrer vers Linux',
        description: 'Adopter une solution libre et gratuite',
        type: 'alternative',
        feedback: "Cout minimal (50EUR par PC pour la migration). Les PC existants peuvent etre utilises 10+ ans.",
        icon: 'terminal',
        cost: '50EUR/PC',
        color: '#00997d',
        scores: { environment: 95, economic: 95, protection: 85 }
      },
      {
        id: '1c',
        label: 'Melange des deux',
        description: 'Garder Windows pour certains postes, Linux pour d\'autres',
        type: 'hybrid',
        feedback: "Approche pragmatique mais maintient des couts recurrents sur la partie Windows.",
        icon: 'scale',
        cost: '400EUR/PC',
        color: '#F9A825',
        scores: { environment: 50, economic: 50, protection: 65 }
      }
    ]
  },

  // FULL SCENARIO 2
  {
    id: 'parent-2',
    title: 'Les donnees de votre enfant',
    context: "L'ecole utilise des outils en ligne pour les devoirs. Vous decouvrez que les donnees des eleves sont stockees sur des serveurs americains.",
    character: 'idefix',
    decisions: [
      {
        id: '2a',
        label: 'Accepter les conditions',
        description: 'Continuer avec les outils actuels (Google Classroom)',
        type: 'bigTech',
        feedback: "Pratique, mais les donnees de votre enfant sont soumises au Cloud Act americain.",
        icon: 'cloud',
        cost: 'Gratuit',
        color: '#C62828',
        scores: { environment: 40, economic: 80, protection: 30 }
      },
      {
        id: '2b',
        label: 'Exiger des solutions europeennes',
        description: "Demander l'utilisation d'outils heberges en France",
        type: 'alternative',
        feedback: "Meilleure protection des donnees (RGPD). Les donnees restent en Europe.",
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
        feedback: "Transition douce, mais maintient des risques sur les outils non migres.",
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
    title: "L'obsolescence programmee",
    context: "Votre enfant vous montre son ordinateur de l'ecole qui 'ralentit' apres seulement 3 ans. L'ecole dit qu'il faut le remplacer.",
    character: 'obelix',
    decisions: [
      {
        id: '3a',
        label: 'Remplacer le PC',
        description: 'Acheter un nouveau materiel conforme',
        type: 'bigTech',
        feedback: "Solution rapide mais couteuse. Le nouveau PC aura le meme probleme dans 3-5 ans.",
        icon: 'trash-2',
        cost: '800EUR',
        color: '#C62828',
        scores: { environment: 15, economic: 15, protection: 70 }
      },
      {
        id: '3b',
        label: 'Reinstaller Linux',
        description: 'Donner une seconde vie au PC avec un systeme leger',
        type: 'alternative',
        feedback: "Le PC retrouve ses performances d'origine. Le materiel peut servir 10+ ans.",
        icon: 'recycle',
        cost: '0EUR',
        color: '#00997d',
        scores: { environment: 100, economic: 100, protection: 80 }
      },
      {
        id: '3c',
        label: 'Mise a niveau partielle',
        description: 'Ajouter de la RAM et garder Windows',
        type: 'hybrid',
        feedback: "Ameliore les performances mais ne resout pas le probleme a long terme.",
        icon: 'cpu',
        cost: '150EUR',
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
