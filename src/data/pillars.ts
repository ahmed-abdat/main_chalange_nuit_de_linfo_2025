import { Users, Shield, Leaf, Heart, Lock, Database, Recycle, TreeDeciduous, Zap, Globe, School, Cpu } from 'lucide-react'

export type PillarId = 'inclusive' | 'responsible' | 'sustainable'

export interface PillarAction {
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'advanced'
}

export interface PillarStat {
  value: string | number
  label: string
  suffix?: string
}

export interface Pillar {
  id: PillarId
  title: string
  subtitle: string
  description: string
  longDescription: string
  icon: typeof Users
  secondaryIcon: typeof Heart
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  stats: PillarStat[]
  benefits: string[]
  actions: PillarAction[]
  examples: string[]
  quote?: {
    text: string
    author: string
  }
}

export const pillars: Pillar[] = [
  {
    id: 'inclusive',
    title: 'Inclusif',
    subtitle: 'La tech pour tous',
    description: 'Réduire la fracture numérique en redonnant vie aux ordinateurs et en les distribuant à ceux qui en ont besoin.',
    longDescription: `Le pilier Inclusif de NIRD vise à garantir un accès équitable au numérique pour tous.
    En reconditionnant des ordinateurs considérés comme obsolètes par les standards Windows,
    nous créons un cercle vertueux : les lycéens apprennent en reconditionnant, puis distribuent
    ces machines aux écoles primaires et aux familles défavorisées.`,
    icon: Users,
    secondaryIcon: Heart,
    color: '#1976D2', // Blue
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
    stats: [
      { value: 132, label: 'PC reconditionnés au Lycée Carnot' },
      { value: 11, label: 'Écoles équipées' },
      { value: 1500, label: 'Élèves impactés' },
      { value: '5W', label: 'Consommation Raspberry Pi vs 100W PC standard' },
    ],
    benefits: [
      'Accès équitable au numérique pour tous les élèves',
      'Cercle vertueux élèves-vers-élèves',
      'Réduction de la fracture numérique',
      'Solidarité entre établissements',
      'Apprentissage pratique pour les lycéens',
    ],
    actions: [
      {
        title: 'Collecter des ordinateurs',
        description: 'Organiser une collecte de PC usagés dans votre établissement ou quartier',
        difficulty: 'easy',
      },
      {
        title: 'Créer un club informatique',
        description: 'Former un groupe d\'élèves au reconditionnement de PC sous Linux',
        difficulty: 'medium',
      },
      {
        title: 'Distribuer aux familles',
        description: 'Identifier et équiper les familles sans accès au numérique',
        difficulty: 'advanced',
      },
    ],
    examples: [
      'Livraison de 14 PC à l\'école primaire de Fouquières-lès-Béthune',
      'Distribution par vélo cargo aux écoles du bassin minier',
      'Équipement de familles pendant le confinement COVID',
    ],
    quote: {
      text: "Les élèves deviennent acteurs du changement, pas seulement consommateurs de technologie.",
      author: "Romain Debailleul, Lycée Carnot",
    },
  },
  {
    id: 'responsible',
    title: 'Responsable',
    subtitle: 'Maîtrisez vos données',
    description: 'Reprendre le contrôle sur vos données et vos choix technologiques. Exit la dépendance aux GAFAM.',
    longDescription: `Le pilier Responsable concerne la souveraineté numérique et la protection des données.
    En utilisant des logiciels libres et des alternatives européennes, les établissements gardent
    le contrôle sur les données de leurs élèves, conformément au RGPD. C'est aussi apprendre aux
    élèves à faire des choix éclairés plutôt que d'être captifs d'un écosystème.`,
    icon: Shield,
    secondaryIcon: Lock,
    color: '#7B1FA2', // Purple
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-600',
    stats: [
      { value: '100%', label: 'Données en France/UE' },
      { value: 350, label: 'Applications libres disponibles' },
      { value: '0', label: 'Télémétrie envoyée' },
      { value: 'RGPD', label: 'Conformité native' },
    ],
    benefits: [
      'Données stockées en France/UE',
      'Pas de télémétrie ni collecte cachée',
      'Conformité RGPD garantie',
      'Indépendance vis-à-vis du Cloud Act américain',
      'Éducation au choix technologique',
      'Alternatives libres pour tous les usages',
    ],
    actions: [
      {
        title: 'Auditer vos outils actuels',
        description: 'Identifier quels logiciels collectent des données et vers où elles vont',
        difficulty: 'easy',
      },
      {
        title: 'Adopter des alternatives libres',
        description: 'Remplacer progressivement Office par LibreOffice, Chrome par Firefox',
        difficulty: 'medium',
      },
      {
        title: 'Utiliser Apps.education.fr',
        description: 'Migrer vers les services souverains de l\'Éducation nationale',
        difficulty: 'medium',
      },
    ],
    examples: [
      'LibreOffice au lieu de Microsoft Office',
      'GIMP au lieu de Photoshop',
      'Firefox au lieu de Chrome',
      'BigBlueButton au lieu de Teams/Zoom',
      'Nextcloud au lieu de OneDrive',
      'PeerTube au lieu de YouTube',
    ],
    quote: {
      text: "Le directeur juridique de Microsoft France a admis sous serment qu'il ne peut pas garantir que les données des citoyens français ne seront pas transmises aux autorités américaines.",
      author: "Témoignage au Sénat, Juin 2025",
    },
  },
  {
    id: 'sustainable',
    title: 'Durable',
    subtitle: 'Faites durer votre matériel',
    description: 'Prolonger la vie de vos ordinateurs de 5 à 10 ans grâce à Linux. Lutter contre l\'obsolescence programmée.',
    longDescription: `Le pilier Durable combat l'obsolescence programmée. Un ordinateur considéré comme
    "obsolète" sous Windows peut fonctionner parfaitement pendant 5 à 10 ans supplémentaires sous Linux.
    Cela représente une économie colossale et un impact environnemental majeur : 90% de l'empreinte
    carbone d'un PC provient de sa fabrication.`,
    icon: Leaf,
    secondaryIcon: Recycle,
    color: '#2E7D32', // Green (NIRD primary)
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    textColor: 'text-green-600',
    stats: [
      { value: '8-10', label: 'Années de vie avec Linux', suffix: ' ans' },
      { value: '3-5', label: 'Années de vie avec Windows', suffix: ' ans' },
      { value: 90, label: 'Impact CO2 à la fabrication', suffix: '%' },
      { value: 240, label: 'Millions de PC menacés', suffix: 'M' },
    ],
    benefits: [
      'Durée de vie multipliée par 2 à 3',
      'Réduction des déchets électroniques',
      '300kg de CO2 économisés par PC non remplacé',
      'Économies budgétaires massives',
      'Un SSD à 30€ suffit souvent à redonner vie',
      'Consommation énergétique réduite',
    ],
    actions: [
      {
        title: 'Tester Linux sur un vieux PC',
        description: 'Installer PrimTux ou Linux NIRD sur un ordinateur "obsolète" pour voir la différence',
        difficulty: 'easy',
      },
      {
        title: 'Calculer vos économies potentielles',
        description: 'Utiliser notre calculateur pour estimer les économies sur 5 ans',
        difficulty: 'easy',
      },
      {
        title: 'Planifier une migration progressive',
        description: 'Identifier les postes à migrer en priorité dans votre établissement',
        difficulty: 'medium',
      },
    ],
    examples: [
      'PC de 10 ans qui démarre en 20 secondes sous Linux',
      '€30 de SSD pour transformer un PC lent en machine rapide',
      'Raspberry Pi 400 : ordinateur complet à ~5W de consommation',
      'Laboratoires informatiques reconditionnés fonctionnant depuis 2020',
    ],
    quote: {
      text: "Condamner des centaines de millions de PC parfaitement fonctionnels pour une simple mise à jour logicielle est absurde.",
      author: "Back Market",
    },
  },
]

// Software alternatives organized by category
export const softwareAlternatives = {
  office: [
    { proprietary: 'Microsoft Office', libre: 'LibreOffice', icon: 'file-text' },
    { proprietary: 'Microsoft Outlook', libre: 'Thunderbird', icon: 'mail' },
  ],
  creative: [
    { proprietary: 'Adobe Photoshop', libre: 'GIMP', icon: 'image' },
    { proprietary: 'Adobe Illustrator', libre: 'Inkscape', icon: 'pen-tool' },
    { proprietary: 'Adobe Premiere', libre: 'Kdenlive', icon: 'video' },
  ],
  web: [
    { proprietary: 'Google Chrome', libre: 'Firefox', icon: 'globe' },
    { proprietary: 'Microsoft Edge', libre: 'Chromium', icon: 'compass' },
  ],
  collaboration: [
    { proprietary: 'Microsoft Teams', libre: 'BigBlueButton', icon: 'video' },
    { proprietary: 'Google Meet', libre: 'Jitsi Meet', icon: 'users' },
    { proprietary: 'OneDrive', libre: 'Nextcloud', icon: 'cloud' },
  ],
  education: [
    { proprietary: 'YouTube', libre: 'PeerTube', icon: 'play' },
    { proprietary: 'Google Classroom', libre: 'Moodle', icon: 'book' },
  ],
}

// Get pillar by ID
export const getPillarById = (id: PillarId): Pillar | undefined => {
  return pillars.find(p => p.id === id)
}

// Get all actions across pillars
export const getAllActions = () => {
  return pillars.flatMap(pillar =>
    pillar.actions.map(action => ({
      ...action,
      pillarId: pillar.id,
      pillarTitle: pillar.title,
    }))
  )
}

// Get actions by difficulty
export const getActionsByDifficulty = (difficulty: 'easy' | 'medium' | 'advanced') => {
  return getAllActions().filter(action => action.difficulty === difficulty)
}

export default pillars
