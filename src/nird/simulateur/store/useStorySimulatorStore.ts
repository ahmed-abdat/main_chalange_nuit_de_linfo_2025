import { create } from 'zustand';
import { StoryOptionId, StoryImpact, STORY_EPISODES } from '../lib/storyScenarios';

type StoryState = {
  currentIndex: number;            // index de l'épisode actuel
  selectedOptions: (StoryOptionId | null)[]; // historique des choix (null = pas encore choisi)
  cumulativeImpact: StoryImpact;    // somme des impacts
  finished: boolean;
  showConsequence: boolean;        // si true, afficher la conséquence du choix actuel
  selectOption: (optionId: StoryOptionId) => void;
  goToNextEpisode: () => void;
  resetStory: () => void;
};

const initialImpact: StoryImpact = {
  budget: 0,
  inclusion: 0,
  durability: 0,
  bigTechDependence: 0
};

export const useStorySimulatorStore = create<StoryState>((set, get) => ({
  currentIndex: 0,
  selectedOptions: new Array(STORY_EPISODES.length).fill(null),
  cumulativeImpact: initialImpact,
  finished: false,
  showConsequence: false,

  selectOption: (optionId: StoryOptionId) => {
    const { currentIndex, selectedOptions, cumulativeImpact } = get();
    const currentEpisode = STORY_EPISODES[currentIndex];
    
    if (!currentEpisode) return;

    // Trouver l'option choisie
    const chosenOption = currentEpisode.options.find(opt => opt.id === optionId);
    if (!chosenOption) return;

    // Enregistrer le choix
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentIndex] = optionId;

    // Mettre à jour l'impact cumulatif
    const newCumulativeImpact: StoryImpact = {
      budget: cumulativeImpact.budget + chosenOption.impact.budget,
      inclusion: cumulativeImpact.inclusion + chosenOption.impact.inclusion,
      durability: cumulativeImpact.durability + chosenOption.impact.durability,
      bigTechDependence: cumulativeImpact.bigTechDependence + chosenOption.impact.bigTechDependence
    };

    set({
      selectedOptions: newSelectedOptions,
      cumulativeImpact: newCumulativeImpact,
      showConsequence: true
    });
  },

  goToNextEpisode: () => {
    const { currentIndex, selectedOptions } = get();
    const currentEpisode = STORY_EPISODES[currentIndex];
    const nextIndex = currentIndex + 1;

    // Vérifier si on est à la fin
    if (nextIndex >= STORY_EPISODES.length) {
      set({ 
        finished: true, 
        showConsequence: false 
      });
      return;
    }

    // Vérifier que l'épisode suivant existe
    const nextEpisode = STORY_EPISODES[nextIndex];
    if (!nextEpisode) {
      console.error('Next episode not found', { nextIndex, STORY_EPISODES });
      set({ 
        finished: true, 
        showConsequence: false 
      });
      return;
    }

    // Passer à l'épisode suivant
    // Utiliser une fonction pour garantir que l'état est mis à jour correctement
    set((state) => ({
      ...state,
      currentIndex: nextIndex,
      showConsequence: false
    }));
  },

  resetStory: () => {
    set({
      currentIndex: 0,
      selectedOptions: new Array(STORY_EPISODES.length).fill(null),
      cumulativeImpact: initialImpact,
      finished: false,
      showConsequence: false
    });
  }
}));

