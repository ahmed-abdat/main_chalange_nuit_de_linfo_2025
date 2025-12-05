import type { Situation } from '../types';

export const situation2: Situation = {
  id: '2',
  title: 'Les données de votre enfant',
  context: 'L\'école utilise des outils en ligne pour les devoirs et la communication. Vous découvrez que les données des élèves sont stockées sur des serveurs américains.',
  decisions: [
    {
      id: '2a',
      label: 'Accepter les conditions',
      description: 'Continuer avec les outils actuels (Google Classroom, etc.)',
      type: 'bigTech',
      feedback: 'Pratique immédiate, mais les données de votre enfant sont soumises au Cloud Act américain. Pas de garantie de confidentialité.',
      icon: '🌐',
      cost: 'Gratuit',
      scores: {
        environment: 40, // Medium - cloud infrastructure impact
        economic: 80, // High - free to use
        protection: 30, // Low - data in US, Cloud Act risk
      },
    },
    {
      id: '2b',
      label: 'Exiger des solutions européennes',
      description: 'Demander l\'utilisation d\'outils hébergés en France',
      type: 'alternative',
      feedback: 'Meilleure protection des données (RGPD), souveraineté numérique. Les données restent en Europe.',
      icon: '🛡️',
      cost: 'Gratuit',
      scores: {
        environment: 70, // High - European infrastructure
        economic: 90, // Very high - free, GDPR compliant
        protection: 95, // Very high - RGPD, European sovereignty
      },
    },
    {
      id: '2c',
      label: 'Utiliser les deux',
      description: 'Garder certains outils, migrer d\'autres progressivement',
      type: 'hybrid',
      feedback: 'Transition douce, mais maintient des risques sur les outils non migrés.',
      icon: '🔄',
      cost: 'Gratuit',
      scores: {
        environment: 55, // Medium - partial improvement
        economic: 85, // High - still free
        protection: 60, // Medium - mixed protection level
      },
    },
  ],
};

