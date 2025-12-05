/**
 * Scenario Progress Store
 * Tracks user progress through student and parent scenarios
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useAchievementStore } from './achievementStore'

export interface ScenarioProgress {
  scenarioId: string
  choiceId: string
  isCorrect: boolean // Did they choose the NIRD/alternative option?
  completedAt: number
}

interface ScenarioState {
  // Teaser progress
  studentTeaserCompleted: boolean
  parentTeaserCompleted: boolean

  // Full scenario progress
  studentProgress: ScenarioProgress[]
  parentProgress: ScenarioProgress[]

  // Total scores
  studentScore: number
  parentScore: number

  // Actions
  completeStudentTeaser: (choiceId: string, isCorrect: boolean) => void
  completeParentTeaser: (choiceId: string, isCorrect: boolean) => void
  completeStudentScenario: (scenarioId: string, choiceId: string, isCorrect: boolean, points: number) => void
  completeParentScenario: (scenarioId: string, choiceId: string, averageScore: number) => void

  // Helpers
  hasCompletedStudentScenario: (scenarioId: string) => boolean
  hasCompletedParentScenario: (scenarioId: string) => boolean
  getStudentCompletionCount: () => number
  getParentCompletionCount: () => number

  // Reset
  reset: () => void
}

export const useScenarioStore = create<ScenarioState>()(
  persist(
    (set, get) => ({
      studentTeaserCompleted: false,
      parentTeaserCompleted: false,
      studentProgress: [],
      parentProgress: [],
      studentScore: 0,
      parentScore: 0,

      completeStudentTeaser: (choiceId, isCorrect) => {
        const state = get()
        if (state.studentTeaserCompleted) return

        set({ studentTeaserCompleted: true })

        // Unlock scenario_explorer badge on first teaser completion
        const { unlockBadge, hasBadge } = useAchievementStore.getState()
        if (!hasBadge('scenario_explorer')) {
          unlockBadge('scenario_explorer')
        }
      },

      completeParentTeaser: (choiceId, isCorrect) => {
        const state = get()
        if (state.parentTeaserCompleted) return

        set({ parentTeaserCompleted: true })

        // Unlock scenario_explorer badge on first teaser completion
        const { unlockBadge, hasBadge } = useAchievementStore.getState()
        if (!hasBadge('scenario_explorer')) {
          unlockBadge('scenario_explorer')
        }
      },

      completeStudentScenario: (scenarioId, choiceId, isCorrect, points) => {
        const state = get()

        // Skip if already completed
        if (state.studentProgress.some(p => p.scenarioId === scenarioId)) return

        const newProgress: ScenarioProgress = {
          scenarioId,
          choiceId,
          isCorrect,
          completedAt: Date.now()
        }

        const newStudentProgress = [...state.studentProgress, newProgress]
        const newScore = state.studentScore + points

        set({
          studentProgress: newStudentProgress,
          studentScore: newScore
        })

        // Check for student_champion badge (all 3 scenarios with NIRD choices)
        if (newStudentProgress.length >= 3) {
          const allCorrect = newStudentProgress.every(p => p.isCorrect)
          if (allCorrect) {
            const { unlockBadge } = useAchievementStore.getState()
            unlockBadge('student_champion')
          }
        }
      },

      completeParentScenario: (scenarioId, choiceId, averageScore) => {
        const state = get()

        // Skip if already completed
        if (state.parentProgress.some(p => p.scenarioId === scenarioId)) return

        // Consider "correct" if they chose alternative (highest score option)
        const isCorrect = choiceId.endsWith('b')

        const newProgress: ScenarioProgress = {
          scenarioId,
          choiceId,
          isCorrect,
          completedAt: Date.now()
        }

        const newParentProgress = [...state.parentProgress, newProgress]
        const newScore = state.parentScore + averageScore

        set({
          parentProgress: newParentProgress,
          parentScore: newScore
        })

        // Check for family_advisor badge (all 3 parent scenarios completed)
        if (newParentProgress.length >= 3) {
          const { unlockBadge } = useAchievementStore.getState()
          unlockBadge('family_advisor')
        }
      },

      hasCompletedStudentScenario: (scenarioId) => {
        return get().studentProgress.some(p => p.scenarioId === scenarioId)
      },

      hasCompletedParentScenario: (scenarioId) => {
        return get().parentProgress.some(p => p.scenarioId === scenarioId)
      },

      getStudentCompletionCount: () => get().studentProgress.length,

      getParentCompletionCount: () => get().parentProgress.length,

      reset: () => set({
        studentTeaserCompleted: false,
        parentTeaserCompleted: false,
        studentProgress: [],
        parentProgress: [],
        studentScore: 0,
        parentScore: 0
      })
    }),
    {
      name: 'nird-scenarios',
      partialize: (state) => ({
        studentTeaserCompleted: state.studentTeaserCompleted,
        parentTeaserCompleted: state.parentTeaserCompleted,
        studentProgress: state.studentProgress,
        parentProgress: state.parentProgress,
        studentScore: state.studentScore,
        parentScore: state.parentScore
      })
    }
  )
)

// Selector hooks
export const useStudentTeaserCompleted = () =>
  useScenarioStore((state) => state.studentTeaserCompleted)

export const useParentTeaserCompleted = () =>
  useScenarioStore((state) => state.parentTeaserCompleted)

export const useStudentScore = () =>
  useScenarioStore((state) => state.studentScore)

export const useParentScore = () =>
  useScenarioStore((state) => state.parentScore)

export default useScenarioStore
