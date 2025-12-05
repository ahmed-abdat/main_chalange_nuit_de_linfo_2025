// Community section data

export interface ContributeAction {
  id: string
  title: string
  description: string
  icon: 'download' | 'users' | 'graduation-cap' | 'book-open'
  color: string
  href: string
  isPlaceholder?: boolean
  priority: 'primary' | 'secondary' | 'tertiary'
}

export const contributeActions: ContributeAction[] = [
  {
    id: 'download',
    title: 'Télécharger Linux NIRD',
    description: 'Installez Linux gratuitement sur vos anciens PC',
    icon: 'download',
    color: '#00997d',
    href: 'https://nird.forge.apps.education.fr/linux/',
    priority: 'primary',
  },
  {
    id: 'community',
    title: 'Rejoindre la Communauté',
    description: 'Forum, ressources et entraide',
    icon: 'users',
    color: '#F9A825',
    href: 'https://nird.forge.apps.education.fr/',
    priority: 'secondary',
  },
  {
    id: 'propose',
    title: 'Proposer mon Établissement',
    description: 'Faites partie du mouvement NIRD',
    icon: 'graduation-cap',
    color: '#3B82F6',
    href: 'mailto:contact@nird.forge.apps.education.fr?subject=Proposition%20établissement%20NIRD',
    priority: 'tertiary',
  },
  {
    id: 'resources',
    title: 'Ressources Enseignants',
    description: 'Guides et outils pédagogiques',
    icon: 'book-open',
    color: '#8B5CF6',
    href: 'https://nird.forge.apps.education.fr/',
    priority: 'tertiary',
  },
]

// School markers for France map
export interface SchoolMarker {
  id: string
  name: string
  region: string
  x: number // % from left
  y: number // % from top
  pcs: number
  type: 'lycee' | 'college' | 'ecole'
}

export const schoolMarkers: SchoolMarker[] = [
  {
    id: 'carnot',
    name: 'Lycée Carnot',
    region: 'Hauts-de-France',
    x: 52,
    y: 22,
    pcs: 132,
    type: 'lycee',
  },
  {
    id: 'fouquieres',
    name: 'École Fouquières',
    region: 'Hauts-de-France',
    x: 50,
    y: 24,
    pcs: 14,
    type: 'ecole',
  },
  {
    id: 'jean-monnet',
    name: 'Lycée Jean Monnet',
    region: 'Auvergne-Rhône-Alpes',
    x: 72,
    y: 58,
    pcs: 45,
    type: 'lycee',
  },
  {
    id: 'marie-curie',
    name: 'Lycée Marie Curie',
    region: 'Auvergne-Rhône-Alpes',
    x: 65,
    y: 62,
    pcs: 60,
    type: 'lycee',
  },
]

// Impact statistics
export const communityImpact = {
  pcsReconditioned: 251,
  schoolsEquipped: 11,
  academiesParticipating: 4,
  estimatedSavings: 150600, // 251 * 600
  co2Prevented: 75300, // 251 * 300kg
}

// Testimonials for community section
export const communityTestimonials = [
  {
    id: 1,
    quote:
      "On ne dit même plus aux nouveaux élèves qu'ils sont sous Linux. C'est la preuve ultime par l'usage.",
    author: 'Pascal Beel',
    role: 'Enseignant',
    school: 'Lycée Carnot',
  },
  {
    id: 2,
    quote:
      "La ville d'Échirolles a économisé 2,5 millions d'euros grâce au logiciel libre.",
    author: 'Proviseur',
    role: 'Direction',
    school: 'Lycée Marie Curie',
  },
  {
    id: 3,
    quote:
      "Condamner des centaines de millions de PC parfaitement fonctionnels pour une simple mise à jour logicielle est absurde.",
    author: 'Back Market',
    role: 'Campagne publicitaire',
    school: null,
  },
]
