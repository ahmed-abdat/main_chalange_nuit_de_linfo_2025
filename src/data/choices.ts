import { Euro, Leaf, Shield, Clock, Users, Lock, Recycle, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

export type ChoiceId = 'A' | 'B' | 'C'

export interface ChoiceConsequence {
  cost: {
    year1: number
    year3: number
    year5: number
    description: string
  }
  timeline: {
    duration: string
    steps: string[]
  }
  sustainability: {
    score: 'low' | 'medium' | 'high'
    description: string
    co2Impact: string
  }
  sovereignty: {
    score: 'low' | 'medium' | 'high'
    description: string
    dataLocation: string
  }
  risks: string[]
  benefits: string[]
}

export interface Choice {
  id: ChoiceId
  title: string
  subtitle: string
  description: string
  icon: typeof Euro
  color: string
  borderColor: string
  bgColor: string
  previewText: string
  consequences: ChoiceConsequence
  isRecommended?: boolean
}

export const choices: Choice[] = [
  {
    id: 'A',
    title: 'Payer pour rester',
    subtitle: 'Continuer avec Microsoft',
    description: 'Acheter les mises à jour de sécurité étendues (ESU) ou remplacer le matériel incompatible avec Windows 11.',
    icon: Euro,
    color: 'text-red-600',
    borderColor: 'border-red-500',
    bgColor: 'bg-red-50',
    previewText: '€300-800 par PC + frais récurrents',
    consequences: {
      cost: {
        year1: 461, // €61 ESU + €400 average hardware upgrade
        year3: 683, // €61 + €122 + €500 partial replacements
        year5: 1100, // Full cycle cost
        description: 'Coûts ESU croissants + remplacement matériel inévitable',
      },
      timeline: {
        duration: '1-3 mois',
        steps: [
          'Évaluation du parc informatique',
          'Achat des licences ESU',
          'Remplacement des PC incompatibles',
          'Formation continue Microsoft',
        ],
      },
      sustainability: {
        score: 'low',
        description: 'Contribue à l\'obsolescence programmée et aux déchets électroniques',
        co2Impact: '+300kg CO2 par nouveau PC fabriqué',
      },
      sovereignty: {
        score: 'low',
        description: 'Données stockées sur serveurs américains, soumises au Cloud Act',
        dataLocation: 'États-Unis (Microsoft Azure)',
      },
      risks: [
        'Coûts récurrents sans fin',
        'Dépendance accrue à Microsoft',
        'Données exposées au Cloud Act américain',
        'Obsolescence programmée continue',
        'Budget imprévisible',
      ],
      benefits: [
        'Pas de changement d\'habitudes',
        'Compatibilité avec logiciels existants',
        'Support technique Microsoft',
      ],
    },
  },
  {
    id: 'B',
    title: 'Rejoindre le Village',
    subtitle: 'Adopter Linux et le libre',
    description: 'Migrer vers Linux (PrimTux ou Linux NIRD) et les logiciels libres. Rejoindre la communauté NIRD.',
    icon: Leaf,
    color: 'text-green-600',
    borderColor: 'border-green-500',
    bgColor: 'bg-green-50',
    previewText: '€0 + liberté totale',
    isRecommended: true,
    consequences: {
      cost: {
        year1: 80, // €50 migration + €30 SSD upgrade
        year3: 100, // + training
        year5: 120, // Minimal ongoing costs
        description: 'Investissement unique, pas de frais récurrents',
      },
      timeline: {
        duration: '3-6 mois',
        steps: [
          'Sensibilisation de l\'équipe éducative',
          'Installation pilote sur quelques postes',
          'Formation des enseignants',
          'Déploiement progressif',
          'Intégration dans le projet d\'établissement',
        ],
      },
      sustainability: {
        score: 'high',
        description: 'Prolonge la vie des ordinateurs de 5-10 ans, réduit les déchets électroniques',
        co2Impact: '-300kg CO2 par PC non remplacé',
      },
      sovereignty: {
        score: 'high',
        description: 'Données stockées localement ou sur serveurs français, conformité RGPD garantie',
        dataLocation: 'France / Union Européenne',
      },
      risks: [
        'Période d\'adaptation nécessaire',
        'Quelques logiciels spécifiques non disponibles',
        'Résistance au changement possible',
      ],
      benefits: [
        'Coût zéro pour le système d\'exploitation',
        'Liberté totale sur vos données',
        'Matériel prolongé de 5-10 ans',
        'Communauté NIRD active et solidaire',
        'Élèves acteurs du changement',
        '100% de réussite au bac NSI (Lycée Carnot)',
        'Conformité RGPD native',
        'Pas de télémétrie ni collecte de données',
      ],
    },
  },
  {
    id: 'C',
    title: 'Ne rien faire',
    subtitle: 'Ignorer le problème',
    description: 'Continuer à utiliser Windows 10 sans support, en espérant que rien de grave n\'arrive.',
    icon: AlertTriangle,
    color: 'text-gray-600',
    borderColor: 'border-gray-400',
    bgColor: 'bg-gray-50',
    previewText: 'Risque sécuritaire majeur',
    consequences: {
      cost: {
        year1: 0, // No immediate cost
        year3: 800, // Emergency replacement after breach
        year5: 1500, // Full emergency replacement
        description: 'Coût caché : migration forcée en urgence après incident',
      },
      timeline: {
        duration: 'Indéfini',
        steps: [
          'Continuer comme avant',
          '(Probable) Faille de sécurité exploitée',
          '(Probable) Migration d\'urgence coûteuse',
          '(Probable) Perte de données potentielle',
        ],
      },
      sustainability: {
        score: 'medium',
        description: 'Prolonge temporairement la vie du matériel, mais migration forcée probable',
        co2Impact: 'Variable selon le moment de la migration',
      },
      sovereignty: {
        score: 'low',
        description: 'Système non sécurisé, vulnérable aux attaques et au vol de données',
        dataLocation: 'Vulnérable partout',
      },
      risks: [
        'Failles de sécurité non corrigées',
        'Cyberattaques ciblant Windows 10',
        'Perte de données potentielle',
        'Non-conformité RGPD',
        'Responsabilité juridique en cas d\'incident',
        'Migration forcée en urgence (plus coûteuse)',
      ],
      benefits: [
        'Pas de changement immédiat',
        'Pas de coût à court terme',
      ],
    },
  },
]

// Calculator formula helpers
export const calculateCosts = (
  choice: ChoiceId,
  numberOfPCs: number,
  years: 3 | 5 = 5
) => {
  const choiceData = choices.find(c => c.id === choice)
  if (!choiceData) return null

  const costPerPC = years === 3
    ? choiceData.consequences.cost.year3
    : choiceData.consequences.cost.year5

  return {
    totalCost: costPerPC * numberOfPCs,
    costPerPC,
    years,
    choice: choiceData.title,
  }
}

// Compare all choices
export const compareChoices = (numberOfPCs: number, years: 3 | 5 = 5) => {
  return choices.map(choice => ({
    ...calculateCosts(choice.id, numberOfPCs, years),
    id: choice.id,
    title: choice.title,
    sustainability: choice.consequences.sustainability.score,
    sovereignty: choice.consequences.sovereignty.score,
  }))
}

// Get savings by switching to Linux
export const calculateSavings = (numberOfPCs: number, years: 3 | 5 = 5) => {
  const windowsCost = calculateCosts('A', numberOfPCs, years)
  const linuxCost = calculateCosts('B', numberOfPCs, years)

  if (!windowsCost || !linuxCost) return null

  const savings = windowsCost.totalCost - linuxCost.totalCost
  const savingsPercentage = Math.round((savings / windowsCost.totalCost) * 100)

  return {
    savings,
    savingsPercentage,
    windowsCost: windowsCost.totalCost,
    linuxCost: linuxCost.totalCost,
    numberOfPCs,
    years,
  }
}

// Environmental impact calculation
export const calculateEnvironmentalImpact = (numberOfPCs: number) => {
  const co2PerNewPC = 300 // kg
  const co2Saved = numberOfPCs * co2PerNewPC
  const treesEquivalent = Math.round(co2Saved / 21) // 1 tree absorbs ~21kg CO2/year

  return {
    co2Saved,
    treesEquivalent,
    numberOfPCs,
    description: `En évitant de remplacer ${numberOfPCs} PC, vous économisez ${co2Saved}kg de CO2, soit l'équivalent de ${treesEquivalent} arbres plantés.`,
  }
}

export default choices
