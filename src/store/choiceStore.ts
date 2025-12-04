import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ChoiceId } from '@/data/choices'
import type { PillarId } from '@/data/pillars'

interface CalculatorInputs {
  schoolSize: number
  yearsToProject: 3 | 5
  includeTraining: boolean
}

interface UserProgress {
  sectionsViewed: string[]
  pillarsExplored: PillarId[]
  quizCompleted: boolean
  calculatorUsed: boolean
}

interface ChoiceStore {
  // User's main choice (A/B/C)
  userChoice: ChoiceId | null
  setUserChoice: (choice: ChoiceId | null) => void

  // Currently expanded/selected pillar
  selectedPillar: PillarId | null
  setSelectedPillar: (pillar: PillarId | null) => void

  // Calculator inputs
  calculatorInputs: CalculatorInputs
  setCalculatorInputs: (inputs: Partial<CalculatorInputs>) => void

  // User progress tracking (for gamification)
  progress: UserProgress
  markSectionViewed: (sectionId: string) => void
  markPillarExplored: (pillarId: PillarId) => void
  setQuizCompleted: (completed: boolean) => void
  setCalculatorUsed: (used: boolean) => void

  // Scroll position tracking
  scrollProgress: number
  setScrollProgress: (progress: number) => void

  // UI state
  isChoiceModalOpen: boolean
  setChoiceModalOpen: (open: boolean) => void
  isPillarModalOpen: boolean
  setPillarModalOpen: (open: boolean) => void

  // Reset all state
  reset: () => void
}

const initialCalculatorInputs: CalculatorInputs = {
  schoolSize: 100,
  yearsToProject: 5,
  includeTraining: true,
}

const initialProgress: UserProgress = {
  sectionsViewed: [],
  pillarsExplored: [],
  quizCompleted: false,
  calculatorUsed: false,
}

export const useChoiceStore = create<ChoiceStore>()(
  persist(
    (set) => ({
      // User's main choice
      userChoice: null,
      setUserChoice: (choice) => set({ userChoice: choice }),

      // Selected pillar
      selectedPillar: null,
      setSelectedPillar: (pillar) => set({ selectedPillar: pillar }),

      // Calculator inputs
      calculatorInputs: initialCalculatorInputs,
      setCalculatorInputs: (inputs) =>
        set((state) => ({
          calculatorInputs: { ...state.calculatorInputs, ...inputs },
        })),

      // User progress
      progress: initialProgress,
      markSectionViewed: (sectionId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            sectionsViewed: state.progress.sectionsViewed.includes(sectionId)
              ? state.progress.sectionsViewed
              : [...state.progress.sectionsViewed, sectionId],
          },
        })),
      markPillarExplored: (pillarId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            pillarsExplored: state.progress.pillarsExplored.includes(pillarId)
              ? state.progress.pillarsExplored
              : [...state.progress.pillarsExplored, pillarId],
          },
        })),
      setQuizCompleted: (completed) =>
        set((state) => ({
          progress: { ...state.progress, quizCompleted: completed },
        })),
      setCalculatorUsed: (used) =>
        set((state) => ({
          progress: { ...state.progress, calculatorUsed: used },
        })),

      // Scroll progress
      scrollProgress: 0,
      setScrollProgress: (progress) => set({ scrollProgress: progress }),

      // UI state
      isChoiceModalOpen: false,
      setChoiceModalOpen: (open) => set({ isChoiceModalOpen: open }),
      isPillarModalOpen: false,
      setPillarModalOpen: (open) => set({ isPillarModalOpen: open }),

      // Reset
      reset: () =>
        set({
          userChoice: null,
          selectedPillar: null,
          calculatorInputs: initialCalculatorInputs,
          progress: initialProgress,
          scrollProgress: 0,
          isChoiceModalOpen: false,
          isPillarModalOpen: false,
        }),
    }),
    {
      name: 'nird-choice-storage',
      partialize: (state) => ({
        userChoice: state.userChoice,
        calculatorInputs: state.calculatorInputs,
        progress: state.progress,
      }),
    }
  )
)

// Selector hooks for specific state slices
export const useUserChoice = () => useChoiceStore((state) => state.userChoice)
export const useSelectedPillar = () => useChoiceStore((state) => state.selectedPillar)
export const useCalculatorInputs = () => useChoiceStore((state) => state.calculatorInputs)
export const useProgress = () => useChoiceStore((state) => state.progress)
export const useScrollProgress = () => useChoiceStore((state) => state.scrollProgress)

// Computed selectors
export const useHasCompletedJourney = () =>
  useChoiceStore((state) => {
    const { sectionsViewed, pillarsExplored, quizCompleted, calculatorUsed } = state.progress
    return (
      sectionsViewed.length >= 5 &&
      pillarsExplored.length >= 3 &&
      (quizCompleted || calculatorUsed)
    )
  })

export const useProgressPercentage = () =>
  useChoiceStore((state) => {
    const { sectionsViewed, pillarsExplored, calculatorUsed } = state.progress
    const maxSections = 7 // Total sections on page
    const maxPillars = 3

    const sectionsScore = (sectionsViewed.length / maxSections) * 40
    const pillarsScore = (pillarsExplored.length / maxPillars) * 30
    const calculatorScore = calculatorUsed ? 15 : 0
    const choiceScore = state.userChoice ? 15 : 0

    return Math.min(100, Math.round(sectionsScore + pillarsScore + calculatorScore + choiceScore))
  })

export default useChoiceStore
