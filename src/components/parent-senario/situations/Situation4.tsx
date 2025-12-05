import type { Situation } from '../types';

export const situation4: Situation = {
  id: '4',
  title: 'L\'éducation au numérique',
  context: 'Vous discutez avec d\'autres parents de l\'importance d\'éduquer les enfants à la technologie. Certains proposent d\'enseigner uniquement les outils "professionnels" (Microsoft, Google), d\'autres veulent ouvrir les horizons.',
  decisions: [
    {
      id: '4a',
      label: 'Se concentrer sur les outils professionnels',
      description: 'Privilégier Microsoft Office et Google Workspace',
      type: 'bigTech',
      feedback: 'Prépare aux outils du marché actuel, mais crée une dépendance à des solutions propriétaires. Coûts futurs pour les licences.',
      icon: '📊',
      cost: '€€€',
      scores: {
        environment: 50, // Medium - cloud services impact
        economic: 40, // Low - ongoing license costs
        protection: 50, // Medium - vendor lock-in, data in cloud
      },
    },
    {
      id: '4b',
      label: 'Enseigner la diversité',
      description: 'Montrer les alternatives libres et les concepts universels',
      type: 'alternative',
      feedback: 'Développe l\'esprit critique et l\'autonomie. Les enfants comprennent les concepts, pas seulement un logiciel. Préparation à l\'avenir.',
      icon: '🎓',
      cost: 'Gratuit',
      scores: {
        environment: 85, // High - open source, less cloud dependency
        economic: 95, // Very high - free, no licenses
        protection: 90, // Very high - understanding concepts, autonomy
      },
    },
    {
      id: '4c',
      label: 'Approche équilibrée',
      description: 'Enseigner les deux, en commençant par les concepts',
      type: 'hybrid',
      feedback: 'Bon compromis pédagogique, mais nécessite plus de temps et peut créer de la confusion.',
      icon: '⚖️',
      cost: '€€',
      scores: {
        environment: 65, // Medium-high - balanced approach
        economic: 65, // Medium-high - some costs
        protection: 70, // Medium-high - good but not optimal
      },
    },
  ],
};

