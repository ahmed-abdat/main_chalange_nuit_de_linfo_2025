import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type BadgeId =
  | 'first_steps'
  | 'knowledge_seeker'
  | 'pc_savior'
  | 'quiz_master'
  | 'linux_champion'
  | 'alternatives_master'
  | 'village_defender'
  | 'terminal_ninja'
  | 'scenario_explorer'
  | 'student_champion'
  | 'family_advisor'
  | 'village_hero'

export interface Badge {
  id: BadgeId
  title: string
  description: string
  xp: number
  icon: string // Emoji or icon name
  unlockedAt?: number // Timestamp when unlocked
}

export const BADGES: Record<BadgeId, Omit<Badge, 'unlockedAt'>> = {
  first_steps: {
    id: 'first_steps',
    title: 'Premiers Pas',
    description: 'Scroll au-dela du hero',
    xp: 50,
    icon: 'footprints'
  },
  knowledge_seeker: {
    id: 'knowledge_seeker',
    title: 'Chercheur de Savoir',
    description: 'Explorer les 3 piliers NIRD',
    xp: 100,
    icon: 'book-open'
  },
  pc_savior: {
    id: 'pc_savior',
    title: 'Sauveur de PC',
    description: 'Terminer le jeu de reconditionnement',
    xp: 150,
    icon: 'laptop'
  },
  quiz_master: {
    id: 'quiz_master',
    title: 'Maitre du Quiz',
    description: '5/5 correct dans le quiz',
    xp: 200,
    icon: 'trophy'
  },
  linux_champion: {
    id: 'linux_champion',
    title: 'Champion Linux',
    description: 'Choisir la voie Linux',
    xp: 150,
    icon: 'terminal'
  },
  alternatives_master: {
    id: 'alternatives_master',
    title: 'Maître des Alternatives',
    description: 'Compléter le jeu de mémoire',
    xp: 150,
    icon: 'layers'
  },
  village_defender: {
    id: 'village_defender',
    title: 'Défenseur du Village',
    description: 'Gagner une partie de Tower Defense',
    xp: 200,
    icon: 'shield-check'
  },
  terminal_ninja: {
    id: 'terminal_ninja',
    title: 'Ninja du Terminal',
    description: 'Atteindre 50 WPM au Terminal',
    xp: 175,
    icon: 'terminal-square'
  },
  scenario_explorer: {
    id: 'scenario_explorer',
    title: 'Explorateur de Scenarios',
    description: 'Completer un scenario teaser',
    xp: 100,
    icon: 'compass'
  },
  student_champion: {
    id: 'student_champion',
    title: 'Champion Etudiant',
    description: 'Tous les scenarios etudiants avec choix NIRD',
    xp: 250,
    icon: 'graduation-cap'
  },
  family_advisor: {
    id: 'family_advisor',
    title: 'Conseiller Familial',
    description: 'Completer tous les scenarios parents',
    xp: 250,
    icon: 'users'
  },
  village_hero: {
    id: 'village_hero',
    title: 'Heros du Village',
    description: 'Debloquer tous les badges',
    xp: 500,
    icon: 'crown'
  }
}

interface AchievementState {
  // Unlocked badges
  unlockedBadges: BadgeId[]

  // Total XP earned
  totalXP: number

  // Recently unlocked badge (for toast)
  recentBadge: BadgeId | null

  // Actions
  unlockBadge: (badgeId: BadgeId) => void
  clearRecentBadge: () => void
  hasBadge: (badgeId: BadgeId) => boolean
  getBadgeInfo: (badgeId: BadgeId) => Badge | null

  // Check if all badges unlocked (except village_hero)
  checkVillageHero: () => void

  // Reset all achievements
  reset: () => void
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedBadges: [],
      totalXP: 0,
      recentBadge: null,

      unlockBadge: (badgeId) => {
        const state = get()

        // Skip if already unlocked
        if (state.unlockedBadges.includes(badgeId)) return

        const badge = BADGES[badgeId]
        if (!badge) return

        set({
          unlockedBadges: [...state.unlockedBadges, badgeId],
          totalXP: state.totalXP + badge.xp,
          recentBadge: badgeId
        })

        // Check for village hero after unlocking
        setTimeout(() => get().checkVillageHero(), 100)
      },

      clearRecentBadge: () => set({ recentBadge: null }),

      hasBadge: (badgeId) => get().unlockedBadges.includes(badgeId),

      getBadgeInfo: (badgeId) => {
        const badge = BADGES[badgeId]
        if (!badge) return null

        const isUnlocked = get().unlockedBadges.includes(badgeId)
        return {
          ...badge,
          unlockedAt: isUnlocked ? Date.now() : undefined
        }
      },

      checkVillageHero: () => {
        const state = get()

        // All badges except village_hero
        const requiredBadges: BadgeId[] = [
          'first_steps',
          'knowledge_seeker',
          'pc_savior',
          'quiz_master',
          'linux_champion',
          'alternatives_master',
          'village_defender',
          'terminal_ninja'
        ]

        const hasAllRequired = requiredBadges.every(
          id => state.unlockedBadges.includes(id)
        )

        if (hasAllRequired && !state.unlockedBadges.includes('village_hero')) {
          // Delay the village_hero unlock for dramatic effect
          setTimeout(() => {
            set((s) => ({
              unlockedBadges: [...s.unlockedBadges, 'village_hero'],
              totalXP: s.totalXP + BADGES.village_hero.xp,
              recentBadge: 'village_hero'
            }))
          }, 1500)
        }
      },

      reset: () => set({
        unlockedBadges: [],
        totalXP: 0,
        recentBadge: null
      })
    }),
    {
      name: 'nird-achievements',
      partialize: (state) => ({
        unlockedBadges: state.unlockedBadges,
        totalXP: state.totalXP
      })
    }
  )
)

// Selector hooks
export const useUnlockedBadges = () =>
  useAchievementStore((state) => state.unlockedBadges)

export const useTotalXP = () =>
  useAchievementStore((state) => state.totalXP)

export const useRecentBadge = () =>
  useAchievementStore((state) => state.recentBadge)

export const useBadgeCount = () =>
  useAchievementStore((state) => state.unlockedBadges.length)

export const useAllBadges = () => Object.values(BADGES)

export default useAchievementStore
