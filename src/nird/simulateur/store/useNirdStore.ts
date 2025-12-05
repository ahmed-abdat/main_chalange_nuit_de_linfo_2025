import { create } from 'zustand';

export type SceneType = 'landing' | 'village' | 'simulator' | 'community';

interface NirdState {
  // Navigation
  currentScene: SceneType;
  setCurrentScene: (scene: SceneType) => void;
  
  // Camera
  cameraTarget: [number, number, number];
  setCameraTarget: (target: [number, number, number]) => void;
  
  // Interactions
  selectedBuilding: string | null;
  setSelectedBuilding: (building: string | null) => void;
  hoveredObject: string | null;
  setHoveredObject: (object: string | null) => void;
  
  // UI State
  showOverlay: boolean;
  setShowOverlay: (show: boolean) => void;
  overlayContent: 'info' | 'simulator' | 'community' | 'accessibility' | null;
  setOverlayContent: (content: 'info' | 'simulator' | 'community' | 'accessibility' | null) => void;
  
  // Accessibility
  reducedMotion: boolean;
  setReducedMotion: (reduced: boolean) => void;
  highContrast: boolean;
  setHighContrast: (high: boolean) => void;
  
  // NIRD Score
  nirdScore: number;
  setNirdScore: (score: number) => void;
  
  // Simulator state
  simulatorData: {
    currentOS: 'windows' | 'linux';
    machineAge: number;
    co2Saved: number;
    costSaved: number;
  };
  setSimulatorData: (data: Partial<NirdState['simulatorData']>) => void;
  
  // Persona selection
  selectedPersona: 'tech-director' | 'student' | 'parent' | null;
  setSelectedPersona: (persona: 'tech-director' | 'student' | 'parent' | null) => void;
  
  // Loading
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useNirdStore = create<NirdState>((set) => ({
  // Navigation
  currentScene: 'landing',
  setCurrentScene: (scene) => set({ currentScene: scene }),
  
  // Camera
  cameraTarget: [0, 0, 0],
  setCameraTarget: (target) => set({ cameraTarget: target }),
  
  // Interactions
  selectedBuilding: null,
  setSelectedBuilding: (building) => set({ selectedBuilding: building }),
  hoveredObject: null,
  setHoveredObject: (object) => set({ hoveredObject: object }),
  
  // UI State
  showOverlay: false,
  setShowOverlay: (show) => set({ showOverlay: show }),
  overlayContent: null,
  setOverlayContent: (content) => set({ overlayContent: content }),
  
  // Accessibility
  reducedMotion: false,
  setReducedMotion: (reduced) => set({ reducedMotion: reduced }),
  highContrast: false,
  setHighContrast: (high) => set({ highContrast: high }),
  
  // NIRD Score
  nirdScore: 45,
  setNirdScore: (score) => set({ nirdScore: score }),
  
  // Simulator state
  simulatorData: {
    currentOS: 'windows',
    machineAge: 3,
    co2Saved: 0,
    costSaved: 0,
  },
  setSimulatorData: (data) => set((state) => ({
    simulatorData: { ...state.simulatorData, ...data }
  })),
  
  // Persona selection
  selectedPersona: null,
  setSelectedPersona: (persona) => set({ selectedPersona: persona }),
  
  // Loading
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

