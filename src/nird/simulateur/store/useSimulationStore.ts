import { create } from 'zustand';

export type Phase = 'introVillage' | 'introAttack' | 'introShield' | 'simulation';

export interface Indicators {
  inclusion: number;
  responsabilite: number;
  durabilite: number;
  dependanceBigTech: number;
}

export interface SimulationState {
  phase: Phase;
  year: number;
  indicators: Indicators;
  scoreNIRD: number;
  
  // Actions
  setPhase: (phase: Phase) => void;
  nextPhase: () => void;
  startSimulation: () => void;
  updateIndicators: (indicators: Partial<Indicators>) => void;
  incrementYear: () => void;
  reset: () => void;
}

const initialIndicators: Indicators = {
  inclusion: 50,
  responsabilite: 50,
  durabilite: 50,
  dependanceBigTech: 70,
};

const calculateNirdScore = (indicators: Indicators): number => {
  // Score NIRD = moyenne de (Inclusion + Responsabilité + Durabilité) / 3
  // Moins de dépendance = meilleur score
  const baseScore = (indicators.inclusion + indicators.responsabilite + indicators.durabilite) / 3;
  // Ajuster selon la dépendance (moins de dépendance = bonus)
  const dependancePenalty = indicators.dependanceBigTech * 0.3;
  return Math.max(0, Math.min(100, baseScore - dependancePenalty + 30));
};

export const useSimulationStore = create<SimulationState>((set) => ({
  phase: 'introVillage',
  year: 0,
  indicators: initialIndicators,
  scoreNIRD: calculateNirdScore(initialIndicators),
  
  setPhase: (phase) => set({ phase }),
  
  nextPhase: () => set((state) => {
    const phaseOrder: Phase[] = ['introVillage', 'introAttack', 'introShield', 'simulation'];
    const currentIndex = phaseOrder.indexOf(state.phase);
    if (currentIndex < phaseOrder.length - 1) {
      return { phase: phaseOrder[currentIndex + 1] };
    }
    return state;
  }),
  
  startSimulation: () => set({ phase: 'simulation', year: 1 }),
  
  updateIndicators: (updates) => set((state) => {
    const newIndicators = { ...state.indicators, ...updates };
    // Clamp values between 0 and 100
    Object.keys(newIndicators).forEach((key) => {
      const k = key as keyof Indicators;
      newIndicators[k] = Math.max(0, Math.min(100, newIndicators[k]));
    });
    return {
      indicators: newIndicators,
      scoreNIRD: calculateNirdScore(newIndicators),
    };
  }),
  
  incrementYear: () => set((state) => ({ year: state.year + 1 })),
  
  reset: () => set({
    phase: 'introVillage',
    year: 0,
    indicators: initialIndicators,
    scoreNIRD: calculateNirdScore(initialIndicators),
  }),
}));

