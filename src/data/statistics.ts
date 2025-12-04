import { AlertTriangle, Calendar, Monitor, Euro, Leaf, Shield, Users } from 'lucide-react'

export interface Statistic {
  id: string
  value: string | number
  label: string
  description: string
  type: 'danger' | 'warning' | 'success' | 'info'
  icon: typeof AlertTriangle
  source?: string
  animateAs?: 'counter' | 'text'
  suffix?: string
  prefix?: string
}

// Main crisis statistics for the Crisis Section
export const crisisStatistics: Statistic[] = [
  {
    id: 'windows-eol',
    value: '14 Oct 2025',
    label: 'Fin du support Windows 10',
    description: 'Plus de mises à jour de sécurité, plus de support technique',
    type: 'danger',
    icon: Calendar,
    source: 'Microsoft',
    animateAs: 'text',
  },
  {
    id: 'pcs-at-risk',
    value: 240,
    label: 'Millions de PC menacés',
    description: 'Ordinateurs qui devront être jetés ou mis à jour',
    type: 'danger',
    icon: Monitor,
    source: 'Canalys Research',
    animateAs: 'counter',
    suffix: 'M',
  },
  {
    id: 'french-gov',
    value: 68,
    label: "de l'administration française",
    description: 'Encore sous Windows 10, vulnérable après octobre 2025',
    type: 'warning',
    icon: AlertTriangle,
    source: 'NIRD',
    animateAs: 'counter',
    suffix: '%',
  },
  {
    id: 'linux-cost',
    value: 0,
    label: 'Coût de Linux',
    description: 'Gratuit, libre, et fonctionne sur vos anciens PC',
    type: 'success',
    icon: Euro,
    source: 'Open Source',
    animateAs: 'counter',
    prefix: '€',
  },
]

// Cost comparison statistics for the Calculator
export const costComparison = {
  windowsPath: {
    esuYear1: 61, // €/PC for business
    esuYear2: 122,
    esuYear3: 244,
    hardwareUpgrade: 400, // Average cost to upgrade incompatible PC
    newPc: 600, // Average cost of new PC
    educationEsuYear1: 1, // Special education pricing
    educationEsuYear2: 2,
    educationEsuYear3: 4,
  },
  linuxPath: {
    migration: 50, // Training/migration cost per PC (one-time)
    ssdUpgrade: 30, // SSD to revive old PC
    training: 20, // Teacher training per person
  },
  environmental: {
    co2PerNewPc: 300, // kg CO2 for manufacturing new PC
    energySavingsLinux: 15, // % less energy consumption
    lifespanExtension: 5, // Extra years of life with Linux
  },
}

// NIRD pillar statistics
export const pillarStatistics = {
  inclusive: {
    pcsReconditioned: 132,
    schoolsHelped: 11,
    studentsImpacted: 1500,
    digitalDivideReduction: '40%',
  },
  responsible: {
    dataInFrance: '100%',
    openSourceApps: 350,
    gdprCompliant: true,
    noTelemetry: true,
  },
  sustainable: {
    lifespanYears: '8-10',
    lifespanWindowsYears: '3-5',
    ewastePrevented: '2.5 tonnes',
    energySavings: '90%', // Raspberry Pi vs standard PC
  },
}

// Success metrics from Lycée Carnot
export const lyceCarnotMetrics = {
  pcsReconditioned: 132,
  schoolsEquipped: 11,
  latestDelivery: {
    school: 'École Primaire de Fouquières-lès-Béthune',
    pcs: 14,
    date: '2025',
  },
  recentDistribution: {
    schools: ['Brias', 'Fouquières'],
    totalPcs: 19,
  },
  nsiSuccessRate: 100, // % baccalauréat success rate for 5 consecutive years
  consecutiveYears: 5,
}

// Additional impact statistics
export const impactStatistics = {
  echirollesSavings: 2500000, // €2.5 million saved
  manufacturingImpact: 90, // % of environmental impact during manufacturing
  frenchIncompatible: 22, // % of French computers incompatible with Win11
  govReplacementCost: 43000000, // €43M for one org to replace 48,000 workstations
  workstationsToReplace: 48000,
}

// Key people in the NIRD movement
export const keyPeople = [
  {
    name: 'Romain Debailleul',
    role: 'Professeur de mathématiques et informatique',
    school: 'Lycée Carnot',
    description: 'Contact principal du projet NIRD',
  },
  {
    name: 'Alexis Kauffmann',
    role: 'Chef de projet logiciels libres',
    organization: 'Direction du Numérique pour l\'Éducation (DNE)',
    description: 'Fondateur de Framasoft',
  },
  {
    name: 'Soren Evrard-Lorrain',
    role: 'Président',
    organization: 'Association NIRD Junior',
    description: 'Représentant étudiant du mouvement',
  },
]

// Memorable quotes
export const quotes = [
  {
    text: "En réalité, former les gens à Linux, c'est surtout les démystifier.",
    author: "Professeur d'anglais",
    school: "Lycée Carnot",
  },
  {
    text: "On ne dit même plus aux nouveaux élèves qu'ils sont sous Linux. C'est la preuve ultime par l'usage.",
    author: "Pascal Beel",
    school: "Lycée Carnot",
  },
  {
    text: "Condamner des centaines de millions de PC parfaitement fonctionnels pour une simple mise à jour logicielle est absurde.",
    author: "Back Market",
    source: "Campagne publicitaire",
  },
  {
    text: "Le choix de la technologie n'est pas neutre.",
    author: "Collectif enseignant NIRD",
    source: "Manifeste NIRD",
  },
]

// Hardware requirements for Linux distributions
export const hardwareRequirements = {
  primtux: {
    name: 'PrimTux 8',
    target: 'Écoles primaires (3-10 ans)',
    minRam: '2 GB',
    minStorage: '30 GB SSD',
    works: 'PC de plus de 10 ans',
  },
  linuxNird: {
    name: 'Linux NIRD',
    target: 'Lycées et collèges',
    minRam: '2 GB',
    minStorage: '30 GB SSD',
    basedOn: 'Linux Mint + Xfce',
  },
}

// Timeline data
export const timeline = {
  windowsEol: new Date('2025-10-14'),
  nirdLaunch: new Date('2024-01-01'),
  pilotSchoolsCount: 18,
}

export default crisisStatistics
