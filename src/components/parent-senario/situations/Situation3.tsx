import type { Situation } from '../types';

export const situation3: Situation = {
  id: '3',
  title: 'L\'obsolescence programmée',
  context: 'Votre enfant vous montre son ordinateur de l\'école qui "ralentit" après seulement 3 ans. L\'école dit qu\'il faut le remplacer car il ne supporte plus les mises à jour.',
  decisions: [
    {
      id: '3a',
      label: 'Remplacer le PC',
      description: 'Acheter un nouveau matériel conforme',
      type: 'bigTech',
      feedback: 'Solution rapide mais coûteuse. Le nouveau PC aura le même problème dans 3-5 ans. Contribue à l\'obsolescence programmée.',
      icon: '🔄',
      cost: '€800',
      scores: {
        environment: 15, // Very low - creates e-waste, new manufacturing
        economic: 15, // Very low - high cost, short lifespan
        protection: 70, // Medium-high - new hardware, but same OS issues
      },
    },
    {
      id: '3b',
      label: 'Réinstaller Linux',
      description: 'Donner une seconde vie au PC avec un système léger',
      type: 'alternative',
      feedback: 'Le PC retrouve ses performances d\'origine. Solution écologique et économique. Le matériel peut servir 10+ ans.',
      icon: '♻️',
      cost: '€0',
      scores: {
        environment: 100, // Perfect - extends life, no waste
        economic: 100, // Perfect - zero cost, maximum value
        protection: 80, // High - secure, open source
      },
    },
    {
      id: '3c',
      label: 'Mettre à niveau partielle',
      description: 'Ajouter de la RAM et garder Windows',
      type: 'hybrid',
      feedback: 'Améliore les performances mais ne résout pas le problème à long terme. Coûts intermédiaires.',
      icon: '⚡',
      cost: '€150',
      scores: {
        environment: 40, // Low-medium - extends life but not optimal
        economic: 50, // Medium - moderate cost
        protection: 60, // Medium - still on Windows
      },
    },
  ],
};

