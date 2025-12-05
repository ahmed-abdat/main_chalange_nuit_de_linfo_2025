import { Indicators } from '../store/useSimulationStore';

export type Decisions = {
  osStrategy: 'statusQuo' | 'linux10' | 'linuxMassive';
  hardwarePolicy: 'buyNew' | 'recondition';
  cloudStrategy: 'bigTech' | 'sovereign';
  training: 'none' | 'teachers' | 'clubNIRD';
};

export function simulateYear(currentIndicators: Indicators, decisions: Decisions): Partial<Indicators> {
  const changes: Partial<Indicators> = {};
  
  // Impact de la stratégie OS
  switch (decisions.osStrategy) {
    case 'statusQuo':
      // Pas de changement significatif
      break;
    case 'linux10':
      // Migration partielle vers Linux
      changes.durabilite = (changes.durabilite || 0) + 5;
      changes.dependanceBigTech = (changes.dependanceBigTech || 0) - 8;
      changes.responsabilite = (changes.responsabilite || 0) + 3;
      // Légère baisse d'inclusion au début (courbe d'apprentissage)
      changes.inclusion = (changes.inclusion || 0) - 2;
      break;
    case 'linuxMassive':
      // Migration massive vers Linux
      changes.durabilite = (changes.durabilite || 0) + 12;
      changes.dependanceBigTech = (changes.dependanceBigTech || 0) - 20;
      changes.responsabilite = (changes.responsabilite || 0) + 8;
      // Baisse temporaire d'inclusion (adaptation nécessaire)
      changes.inclusion = (changes.inclusion || 0) - 5;
      break;
  }
  
  // Impact de la politique matériel
  switch (decisions.hardwarePolicy) {
    case 'buyNew':
      // Achat de nouveau matériel
      changes.durabilite = (changes.durabilite || 0) - 10;
      changes.inclusion = (changes.inclusion || 0) + 2; // Nouveau matériel = meilleure performance
      changes.dependanceBigTech = (changes.dependanceBigTech || 0) + 5; // Nouveau matériel souvent lié aux Big Tech
      break;
    case 'recondition':
      // Réemploi et réparation
      changes.durabilite = (changes.durabilite || 0) + 15;
      changes.inclusion = (changes.inclusion || 0) + 8; // Accès à du matériel moins cher
      changes.responsabilite = (changes.responsabilite || 0) + 5;
      changes.dependanceBigTech = (changes.dependanceBigTech || 0) - 3;
      break;
  }
  
  // Impact de la stratégie cloud
  switch (decisions.cloudStrategy) {
    case 'bigTech':
      // Utilisation de services Big Tech
      changes.dependanceBigTech = (changes.dependanceBigTech || 0) + 15;
      changes.inclusion = (changes.inclusion || 0) + 3; // Facilité d'utilisation
      changes.responsabilite = (changes.responsabilite || 0) - 8; // Données hébergées à l'étranger
      break;
    case 'sovereign':
      // Solutions souveraines/libres
      changes.dependanceBigTech = (changes.dependanceBigTech || 0) - 15;
      changes.responsabilite = (changes.responsabilite || 0) + 10;
      changes.durabilite = (changes.durabilite || 0) + 3;
      // Légère baisse d'inclusion si pas de formation
      if (decisions.training === 'none') {
        changes.inclusion = (changes.inclusion || 0) - 3;
      }
      break;
  }
  
  // Impact de la formation
  switch (decisions.training) {
    case 'none':
      // Pas de formation
      changes.inclusion = (changes.inclusion || 0) - 5;
      break;
    case 'teachers':
      // Formation des enseignants
      changes.inclusion = (changes.inclusion || 0) + 8;
      changes.responsabilite = (changes.responsabilite || 0) + 5;
      break;
    case 'clubNIRD':
      // Club NIRD (formation communautaire)
      changes.inclusion = (changes.inclusion || 0) + 12;
      changes.responsabilite = (changes.responsabilite || 0) + 8;
      changes.durabilite = (changes.durabilite || 0) + 5;
      changes.dependanceBigTech = (changes.dependanceBigTech || 0) - 5;
      break;
  }
  
  // Appliquer les changements aux indicateurs actuels
  return {
    inclusion: currentIndicators.inclusion + (changes.inclusion || 0),
    responsabilite: currentIndicators.responsabilite + (changes.responsabilite || 0),
    durabilite: currentIndicators.durabilite + (changes.durabilite || 0),
    dependanceBigTech: currentIndicators.dependanceBigTech + (changes.dependanceBigTech || 0),
  };
}

