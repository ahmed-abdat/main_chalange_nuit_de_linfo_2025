export type SchoolType = 'lycee' | 'college' | 'ecole'

export interface SchoolTestimonial {
  quote: string
  author: string
  role: string
}

export interface SchoolMetric {
  label: string
  value: string | number
  suffix?: string
}

export interface School {
  id: string
  name: string
  location: string
  region: string
  type: SchoolType
  pcsReconditioned: number
  studentsImpacted: number
  yearJoined: number
  testimonial: SchoolTestimonial
  metrics: SchoolMetric[]
  highlights: string[]
  imageUrl?: string
}

// Pilot schools in the NIRD network
export const pilotSchools: School[] = [
  {
    id: 'lycee-carnot',
    name: 'Lycée Carnot',
    location: 'Bruay-la-Buissière',
    region: 'Hauts-de-France',
    type: 'lycee',
    pcsReconditioned: 132,
    studentsImpacted: 1500,
    yearJoined: 2020,
    testimonial: {
      quote: "On ne dit même plus aux nouveaux élèves qu'ils sont sous Linux. C'est la preuve ultime par l'usage.",
      author: 'Pascal Beel',
      role: 'Enseignant',
    },
    metrics: [
      { label: 'PC reconditionnés', value: 132 },
      { label: 'Écoles équipées', value: 11 },
      { label: 'Réussite au bac NSI', value: 100, suffix: '%' },
      { label: 'Années consécutives', value: 5 },
    ],
    highlights: [
      'Établissement pionnier du mouvement NIRD',
      'Salle NIRD de 30 postes entièrement reconditionnés par les élèves',
      'Distribution par vélo cargo aux écoles primaires',
      '100% de réussite au bac NSI pendant 5 années consécutives',
      'Association NIRD Junior créée par les élèves',
    ],
  },
  {
    id: 'ecole-fouquieres',
    name: 'École Primaire de Fouquières-lès-Béthune',
    location: 'Fouquières-lès-Béthune',
    region: 'Hauts-de-France',
    type: 'ecole',
    pcsReconditioned: 14,
    studentsImpacted: 200,
    yearJoined: 2024,
    testimonial: {
      quote: "Nos vieux ordinateurs fonctionnent mieux qu'avant ! Les enfants ne voient aucune différence avec leurs habitudes.",
      author: 'Directrice',
      role: "Direction d'école",
    },
    metrics: [
      { label: 'PC reçus', value: 14 },
      { label: 'Élèves bénéficiaires', value: 200 },
      { label: 'Économies réalisées', value: '8 400', suffix: '€' },
    ],
    highlights: [
      'Équipée grâce au Lycée Carnot',
      'PrimTux installé sur tous les postes',
      'Formation des enseignants par les lycéens',
    ],
  },
  {
    id: 'lycee-jean-monnet',
    name: 'Lycée Jean Monnet',
    location: 'Annemasse',
    region: 'Auvergne-Rhône-Alpes',
    type: 'lycee',
    pcsReconditioned: 45,
    studentsImpacted: 800,
    yearJoined: 2024,
    testimonial: {
      quote: "La démarche NIRD nous a permis de redonner vie à notre ancien parc informatique. Les élèves sont fiers de participer.",
      author: 'Professeur de NSI',
      role: 'Enseignant',
    },
    metrics: [
      { label: 'PC reconditionnés', value: 45 },
      { label: 'Élèves impliqués', value: 30 },
      { label: 'Économies estimées', value: '27 000', suffix: '€' },
    ],
    highlights: [
      'Établissement pilote de l\'académie de Grenoble',
      'Club informatique dédié au reconditionnement',
      'Partenariat avec des associations locales',
    ],
  },
  {
    id: 'lycee-marie-curie',
    name: 'Lycée Marie Curie',
    location: 'Échirolles',
    region: 'Auvergne-Rhône-Alpes',
    type: 'lycee',
    pcsReconditioned: 60,
    studentsImpacted: 1200,
    yearJoined: 2024,
    testimonial: {
      quote: "La ville d'Échirolles a économisé 2,5 millions d'euros grâce au logiciel libre. Notre lycée fait partie de cette dynamique.",
      author: 'Proviseur',
      role: 'Direction',
    },
    metrics: [
      { label: 'PC reconditionnés', value: 60 },
      { label: 'Économies ville', value: '2,5M', suffix: '€' },
    ],
    highlights: [
      'Situé dans une ville pionnière du logiciel libre',
      'Intégration dans le projet numérique de la collectivité',
      'Formation continue des personnels',
    ],
  },
]

// School types distribution in NIRD network
export const schoolTypeDistribution = {
  lycees: 12,
  colleges: 5,
  ecoles: 2,
  academies: 8,
  includesPolynesie: true,
}

// Cities that have adopted NIRD/Linux
export const adoptingCities = [
  {
    name: 'Échirolles',
    savings: 2500000,
    description: 'Pionnière du logiciel libre en France',
  },
  {
    name: 'Blois',
    description: 'PrimTux dans toutes les écoles publiques',
  },
]

// Get featured schools for testimonials
export const getFeaturedSchools = (count: number = 3): School[] => {
  return pilotSchools.slice(0, count)
}

// Calculate total impact
export const getTotalImpact = () => {
  const totalPCs = pilotSchools.reduce((sum, school) => sum + school.pcsReconditioned, 0)
  const totalStudents = pilotSchools.reduce((sum, school) => sum + school.studentsImpacted, 0)
  const totalSchools = pilotSchools.length

  return {
    totalPCs,
    totalStudents,
    totalSchools,
    estimatedSavings: totalPCs * 600, // Average €600 per PC not replaced
    co2Saved: totalPCs * 300, // 300kg CO2 per PC not manufactured
  }
}

export default pilotSchools
