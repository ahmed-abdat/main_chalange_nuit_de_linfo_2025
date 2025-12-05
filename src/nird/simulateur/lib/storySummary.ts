import { StoryImpact, StoryOptionId } from './storyScenarios';

export function generateIntermediateSummary(impact: StoryImpact): string[] {
  const summaries: string[] = [];

  // Analyse du budget
  if (impact.budget > 15) {
    summaries.push('Les dépenses s\'accumulent. L\'établissement a investi massivement dans de nouvelles technologies, mais le budget commence à peser lourdement.');
  } else if (impact.budget < -15) {
    summaries.push('Les économies s\'additionnent. En choisissant des alternatives libres et durables, l\'établissement a préservé son budget tout en modernisant son parc.');
  } else if (impact.budget > 0) {
    summaries.push('Quelques dépenses supplémentaires ont été nécessaires, mais le budget reste maîtrisé.');
  } else {
    summaries.push('Le budget est préservé grâce aux choix économiques réalisés.');
  }

  // Analyse de l'inclusion
  if (impact.inclusion > 3) {
    summaries.push('L\'inclusion numérique progresse. De plus en plus d\'élèves ont accès aux outils et aux compétences numériques.');
  } else if (impact.inclusion < -1) {
    summaries.push('L\'inclusion numérique stagne. Certains élèves risquent d\'être laissés de côté.');
  } else if (impact.inclusion > 0) {
    summaries.push('L\'inclusion numérique s\'améliore progressivement.');
  }

  // Analyse de la durabilité
  if (impact.durability > 5) {
    summaries.push('La durabilité est au cœur des décisions. L\'établissement prolonge la vie de ses équipements et réduit son impact environnemental.');
  } else if (impact.durability < -3) {
    summaries.push('La durabilité est mise à mal. Les renouvellements fréquents d\'équipements augmentent l\'impact environnemental.');
  } else if (impact.durability > 0) {
    summaries.push('Les choix favorisent la durabilité des équipements.');
  }

  // Analyse de la dépendance Big Tech
  if (impact.bigTechDependence > 8) {
    summaries.push('⚠️ La dépendance aux grandes plateformes s\'accroît dangereusement. L\'établissement perd progressivement son autonomie numérique.');
  } else if (impact.bigTechDependence < -5) {
    summaries.push('✅ L\'autonomie numérique se renforce. L\'établissement reprend le contrôle de ses outils et de ses données.');
  } else if (impact.bigTechDependence > 0) {
    summaries.push('La dépendance aux grandes plateformes augmente légèrement.');
  } else {
    summaries.push('L\'établissement maintient une certaine autonomie numérique.');
  }

  return summaries.length > 0 ? summaries : ['L\'établissement continue son parcours numérique...'];
}

export function generateFinalSummary(impact: StoryImpact, selectedOptions: StoryOptionId[]): string[] {
  const summaries: string[] = [];
  const nirdChoices = selectedOptions.filter(opt => opt === 'nird').length;
  const totalChoices = selectedOptions.filter(opt => opt !== null).length;
  const nirdPercentage = totalChoices > 0 ? (nirdChoices / totalChoices) * 100 : 0;

  // Introduction basée sur le pourcentage de choix NIRD
  if (nirdPercentage >= 80) {
    summaries.push('Votre établissement a embrassé la voie NIRD avec conviction. Les choix de résilience numérique, d\'inclusion et de durabilité ont guidé chaque décision.');
  } else if (nirdPercentage >= 50) {
    summaries.push('Votre établissement a navigué entre confort immédiat et résilience numérique. Un équilibre a été trouvé, avec une tendance claire vers l\'autonomie.');
  } else if (nirdPercentage > 0) {
    summaries.push('Votre établissement a privilégié les solutions immédiates et familières. Quelques initiatives NIRD ont vu le jour, mais la dépendance aux grandes plateformes domine.');
  } else {
    summaries.push('Votre établissement a choisi la voie du confort immédiat. Chaque décision a favorisé les solutions Big Tech, au détriment de l\'autonomie et de la durabilité.');
  }

  // Analyse détaillée par indicateur
  if (impact.budget > 20) {
    summaries.push('Les coûts se sont accumulés : renouvellements d\'équipements, licences récurrentes, services cloud... Le budget annuel a été significativement impacté.');
  } else if (impact.budget < -20) {
    summaries.push('Les économies réalisées sont substantielles. En privilégiant le réemploi et les logiciels libres, l\'établissement a préservé son budget tout en modernisant son parc.');
  }

  if (impact.bigTechDependence > 10) {
    summaries.push('La dépendance aux grandes plateformes est devenue critique. L\'établissement est désormais verrouillé dans un écosystème propriétaire, avec peu de marge de manœuvre pour changer de cap.');
  } else if (impact.bigTechDependence < -8) {
    summaries.push('L\'autonomie numérique est devenue une réalité. L\'établissement contrôle ses outils, ses données et son destin numérique, libéré des contraintes des grandes plateformes.');
  }

  if (impact.inclusion > 5 && impact.durability > 5) {
    summaries.push('L\'inclusion et la durabilité sont au rendez-vous. Les élèves bénéficient d\'un accès équitable aux outils numériques, tandis que l\'établissement prolonge la vie de ses équipements et réduit son empreinte environnementale.');
  }

  // Conclusion
  if (nirdPercentage >= 70 && impact.bigTechDependence < -5) {
    summaries.push('🎉 Félicitations ! Votre établissement est devenu un véritable Village Numérique Résistant. L\'autonomie, l\'inclusion et la durabilité guident désormais chaque décision numérique.');
  } else if (nirdPercentage >= 50) {
    summaries.push('Votre établissement est sur la bonne voie. Il reste du chemin à parcourir vers une autonomie complète, mais les fondations d\'un Village Numérique Résistant sont posées.');
  } else {
    summaries.push('Votre établissement reste fortement dépendant des grandes plateformes. Il n\'est pas trop tard pour changer de cap et embrasser la voie NIRD : chaque décision compte.');
  }

  return summaries;
}

