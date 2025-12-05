import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScenarioId, ChoiceType, ScenarioPoints } from '@/data/studentScenarios';

interface StudentScenarioStore {
  // Completed scenarios: Record<string, ChoiceType> for serialization
  completedScenarios: Record<string, ChoiceType>;
  
  // Total points across all categories
  totalPoints: ScenarioPoints;
  
  // Current scenario being viewed
  currentScenarioId: ScenarioId | null;
  
  // Whether to show all scenarios or one at a time
  viewMode: 'single' | 'grid';
  
  // Actions
  completeScenario: (scenarioId: ScenarioId, choice: ChoiceType, points: ScenarioPoints) => void;
  setCurrentScenario: (scenarioId: ScenarioId | null) => void;
  setViewMode: (mode: 'single' | 'grid') => void;
  resetProgress: () => void;
  isScenarioCompleted: (scenarioId: ScenarioId) => boolean;
  getScenarioChoice: (scenarioId: ScenarioId) => ChoiceType | null;
  
  // Computed
  getCompletedCount: () => number;
  getProgressPercentage: () => number;
  getNextUnlockedScenario: () => ScenarioId | null;
}

const TOTAL_SCENARIOS = 20;

const initialPoints: ScenarioPoints = {
  money: 0,
  protection: 0,
  environment: 0,
};

export const useStudentScenarioStore = create<StudentScenarioStore>()(
  persist(
    (set, get) => ({
      completedScenarios: {},
      totalPoints: initialPoints,
      currentScenarioId: 1, // Start with first scenario
      viewMode: 'single',

      completeScenario: (scenarioId, choice, points) => {
        set((state) => {
          const scenarioKey = String(scenarioId);
          
          // Only allow completing each scenario once
          if (state.completedScenarios[scenarioKey]) {
            return state;
          }

          const newCompleted = {
            ...state.completedScenarios,
            [scenarioKey]: choice,
          };
          
          // Calculate new total points (only add if choice is B)
          let newTotalPoints = { ...state.totalPoints };
          if (choice === 'B') {
            newTotalPoints = {
              money: state.totalPoints.money + points.money,
              protection: state.totalPoints.protection + points.protection,
              environment: state.totalPoints.environment + points.environment,
            };
          }

          return {
            completedScenarios: newCompleted,
            totalPoints: newTotalPoints,
          };
        });
      },

      setCurrentScenario: (scenarioId) => {
        set({ currentScenarioId: scenarioId });
      },

      setViewMode: (mode) => {
        set({ viewMode: mode });
      },

      resetProgress: () => {
        set({
          completedScenarios: {},
          totalPoints: initialPoints,
          currentScenarioId: 1,
        });
      },

      isScenarioCompleted: (scenarioId) => {
        return Boolean(get().completedScenarios[String(scenarioId)]);
      },

      getScenarioChoice: (scenarioId) => {
        return get().completedScenarios[String(scenarioId)] || null;
      },

      getCompletedCount: () => {
        return Object.keys(get().completedScenarios).length;
      },

      getProgressPercentage: () => {
        const count = Object.keys(get().completedScenarios).length;
        return Math.round((count / TOTAL_SCENARIOS) * 100);
      },

      getNextUnlockedScenario: () => {
        const { completedScenarios } = get();
        
        // Find first scenario that's not completed
        for (let i = 1; i <= TOTAL_SCENARIOS; i++) {
          const scenarioId = i as ScenarioId;
          if (!completedScenarios[String(scenarioId)]) {
            return scenarioId;
          }
        }
        
        // All scenarios completed
        return null;
      },
    }),
    {
      name: 'nird-student-scenarios',
      partialize: (state) => ({
        completedScenarios: state.completedScenarios,
        totalPoints: state.totalPoints,
        currentScenarioId: state.currentScenarioId,
      }),
    }
  )
);

// Selector hooks for specific state slices
export const useCompletedScenarios = () =>
  useStudentScenarioStore((state) => {
    // Convert Record to Map for component usage if needed
    const map = new Map<ScenarioId, ChoiceType>();
    Object.entries(state.completedScenarios).forEach(([key, value]) => {
      map.set(Number(key) as ScenarioId, value);
    });
    return map;
  });

export const useTotalPoints = () =>
  useStudentScenarioStore((state) => state.totalPoints);

export const useCurrentScenario = () =>
  useStudentScenarioStore((state) => state.currentScenarioId);

export const useProgress = () => {
  const completedCount = useStudentScenarioStore((state) => 
    Object.keys(state.completedScenarios).length
  );
  
  return {
    completed: completedCount,
    total: TOTAL_SCENARIOS,
    percentage: Math.round((completedCount / TOTAL_SCENARIOS) * 100),
  };
};

export default useStudentScenarioStore;

