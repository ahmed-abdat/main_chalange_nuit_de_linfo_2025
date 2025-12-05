import type { Situation } from '../types';

export const situation1: Situation = {
  id: '1',
  title: 'Le choix de l\'école',
  context: 'Votre enfant rentre de l\'école et vous annonce que l\'établissement doit renouveler tous les ordinateurs. Le directeur propose deux options : acheter de nouveaux PC Windows ou migrer vers Linux gratuit.',
  decisions: [
    {
      id: '1a',
      label: 'Acheter des PC Windows',
      description: 'Suivre la recommandation du fournisseur habituel',
      type: 'bigTech',
      feedback: 'Coût élevé (€800 par PC), mais solution familière. Les PC devront être remplacés dans 5 ans.',
      icon: '💸',
      cost: '€800/PC',
      scores: {
        environment: 20, // Low - contributes to e-waste
        economic: 10, // Very low - high cost
        protection: 60, // Medium - familiar but not optimal
      },
    },
    {
      id: '1b',
      label: 'Migrer vers Linux',
      description: 'Adopter une solution libre et gratuite',
      type: 'alternative',
      feedback: 'Coût minimal (€50 par PC pour la migration), solution durable. Les PC existants peuvent être utilisés 10+ ans.',
      icon: '🐧',
      cost: '€50/PC',
      scores: {
        environment: 95, // Very high - extends PC life, reduces waste
        economic: 95, // Very high - minimal cost
        protection: 85, // High - open source, more control
      },
    },
    {
      id: '1c',
      label: 'Mélange des deux',
      description: 'Garder Windows pour certains postes, Linux pour d\'autres',
      type: 'hybrid',
      feedback: 'Approche pragmatique mais maintient des coûts récurrents sur la partie Windows.',
      icon: '⚖️',
      cost: '€400/PC',
      scores: {
        environment: 50, // Medium - partial improvement
        economic: 50, // Medium - moderate cost
        protection: 65, // Medium - mixed approach
      },
    },
  ],
};

