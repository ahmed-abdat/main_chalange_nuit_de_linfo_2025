import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NirdButton } from './ui/NirdButton';
import { useStorySimulatorStore } from '../store/useStorySimulatorStore';
import { STORY_EPISODES } from '../lib/storyScenarios';
import { generateIntermediateSummary, generateFinalSummary } from '../lib/storySummary';
import { AlertTriangle, CheckCircle2, Coins, Users, Leaf, Shield, ArrowRight, BookOpen, Lightbulb, Move } from 'lucide-react';
import { useState } from 'react';

export const StorySimulator = () => {
  const {
    currentIndex,
    selectedOptions,
    cumulativeImpact,
    finished,
    showConsequence,
    selectOption,
    goToNextEpisode,
    resetStory
  } = useStorySimulatorStore();

  const [draggedOption, setDraggedOption] = useState<string | null>(null);
  const [dropZoneHovered, setDropZoneHovered] = useState(false);

  // Vérifier finished en premier
  if (finished) {
    const summary = generateFinalSummary(cumulativeImpact, selectedOptions.filter(opt => opt !== null) as any);
    const nirdChoices = selectedOptions.filter(opt => opt === 'nird').length;
    const totalChoices = selectedOptions.filter(opt => opt !== null).length;

    return (
      <div className="min-h-screen bg-background py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-nird mb-4">
              Bilan Final
            </h2>
            <p className="text-lg text-muted-foreground">
              Votre établissement a terminé son parcours
            </p>
          </motion.div>

          <Card className="glass-panel border-2 border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Récit Final</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {summary.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="text-foreground leading-relaxed text-lg"
                >
                  {text}
                </motion.p>
              ))}
            </CardContent>
          </Card>

          {/* Statistiques finales */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="glass-panel border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Choix NIRD</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary mb-2">
                    {nirdChoices} / {totalChoices}
                  </p>
                  <p className="text-muted-foreground">
                    {Math.round((nirdChoices / totalChoices) * 100)}% de choix NIRD
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-primary">Impact Global</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Budget</span>
                    <span className={`font-bold ${cumulativeImpact.budget > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {cumulativeImpact.budget > 0 ? '+' : ''}{cumulativeImpact.budget}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Inclusion</span>
                    <span className={`font-bold ${cumulativeImpact.inclusion > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {cumulativeImpact.inclusion > 0 ? '+' : ''}{cumulativeImpact.inclusion}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Durabilité</span>
                    <span className={`font-bold ${cumulativeImpact.durability > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {cumulativeImpact.durability > 0 ? '+' : ''}{cumulativeImpact.durability}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Dépendance Big Tech</span>
                    <span className={`font-bold ${cumulativeImpact.bigTechDependence > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {cumulativeImpact.bigTechDependence > 0 ? '+' : ''}{cumulativeImpact.bigTechDependence}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <button
              onClick={resetStory}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-orange-500/20"
            >
              Rejouer l'histoire
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vérifier que currentEpisode existe
  // Utiliser une vérification plus robuste
  const currentEpisode = currentIndex >= 0 && currentIndex < STORY_EPISODES.length 
    ? STORY_EPISODES[currentIndex] 
    : null;
  
  // Si on n'a pas d'épisode mais qu'on n'a pas fini, afficher un message d'erreur
  if (!currentEpisode && !finished) {
    console.warn('Episode not found', { currentIndex, total: STORY_EPISODES.length, finished });
    return (
      <div className="min-h-screen bg-background py-20 px-4 md:px-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Épisode introuvable</p>
          <p className="text-xs text-muted-foreground mt-2">
            Index: {currentIndex} / Total: {STORY_EPISODES.length}
          </p>
          <NirdButton onClick={resetStory} className="mt-4">
            Recommencer
          </NirdButton>
        </div>
      </div>
    );
  }
  
  // Si on a fini, ne rien afficher (déjà géré plus haut)
  if (finished || !currentEpisode) {
    return null;
  }

  const selectedOption = selectedOptions[currentIndex];
  const chosenOption = selectedOption
    ? currentEpisode.options.find(opt => opt.id === selectedOption)
    : null;

  // Calculer le progrès: 0% pour le premier épisode (index 0)
  // Le progrès représente les épisodes complétés, donc on utilise currentIndex directement
  const progress = (currentIndex / STORY_EPISODES.length) * 100;

  // Écran de bilan intermédiaire
  // On l'affiche seulement si l'épisode actuel a chapterBreakAfter
  // ET qu'on a choisi une option ET qu'on affiche la conséquence
  const shouldShowChapterBreak = currentEpisode.chapterBreakAfter && 
                                   selectedOption !== null && 
                                   showConsequence &&
                                   chosenOption !== null;
  
  if (shouldShowChapterBreak) {
    const summary = generateIntermediateSummary(cumulativeImpact);
    
    return (
      <div className="min-h-screen bg-background py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-nird mb-4">
              Bilan Intermédiaire
            </h2>
            <p className="text-lg text-muted-foreground">
              Chapitre {Math.floor((currentIndex + 1) / 3) + 1} - État de l'établissement
            </p>
          </motion.div>

          <Card className="glass-panel border-2 border-primary/20 mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">Récapitulatif</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {summary.map((text, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-foreground leading-relaxed"
                >
                  {text}
                </motion.p>
              ))}
            </CardContent>
          </Card>

          {/* Indicateurs cumulatifs */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-panel border-2 border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <Coins className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Budget</p>
                <p className={`text-2xl font-bold ${cumulativeImpact.budget > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {cumulativeImpact.budget > 0 ? '+' : ''}{cumulativeImpact.budget}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-panel border-2 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Inclusion</p>
                <p className={`text-2xl font-bold ${cumulativeImpact.inclusion > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {cumulativeImpact.inclusion > 0 ? '+' : ''}{cumulativeImpact.inclusion}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-panel border-2 border-green-500/20">
              <CardContent className="p-4 text-center">
                <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Durabilité</p>
                <p className={`text-2xl font-bold ${cumulativeImpact.durability > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {cumulativeImpact.durability > 0 ? '+' : ''}{cumulativeImpact.durability}
                </p>
              </CardContent>
            </Card>
            <Card className="glass-panel border-2 border-red-500/20">
              <CardContent className="p-4 text-center">
                <Shield className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Dépendance</p>
                <p className={`text-2xl font-bold ${cumulativeImpact.bigTechDependence > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  {cumulativeImpact.bigTechDependence > 0 ? '+' : ''}{cumulativeImpact.bigTechDependence}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <button
              onClick={goToNextEpisode}
              className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20 mx-auto"
            >
              <span>Continuer l'histoire</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }


  // currentEpisode est déjà vérifié plus haut, pas besoin de vérifier à nouveau
  return (
    <div className="min-h-screen bg-background py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Épisode {currentIndex + 1} sur {STORY_EPISODES.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-primary via-purple-500 to-green-500"
            />
          </div>
        </div>

        {/* Episode Card */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="sync" initial={false}>
            {currentEpisode ? (
              <motion.div
                key={`episode-${currentIndex}-${currentEpisode.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Card className="glass-panel border-2 border-primary/20 mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient-nird mb-4">
                  {currentEpisode.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Context */}
                <div className="space-y-3">
                  {currentEpisode.context.map((paragraph, index) => (
                    <p key={index} className="text-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Options */}
                {!showConsequence && (
                  <div className="mt-8 space-y-6">
                    {/* Drop Zone */}
                    <motion.div
                      data-drop-zone
                      className={`relative min-h-[120px] rounded-lg border-2 border-dashed transition-all duration-300 ${
                        dropZoneHovered
                          ? 'border-orange-500 bg-orange-500/10 scale-105'
                          : draggedOption
                          ? 'border-orange-500/50 bg-orange-500/5'
                          : 'border-orange-500/30 bg-orange-500/5'
                      }`}
                      animate={{
                        scale: dropZoneHovered ? 1.02 : 1,
                      }}
                      onHoverStart={() => setDropZoneHovered(true)}
                      onHoverEnd={() => setDropZoneHovered(false)}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        {draggedOption ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center"
                          >
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
                              Relâchez ici pour choisir
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              Glissez votre choix dans cette zone
                            </p>
                          </motion.div>
                        ) : (
                          <div className="text-center">
                            <p className="text-gray-700 dark:text-gray-300 mb-2 flex items-center justify-center gap-2 font-medium">
                              <Lightbulb className="w-4 h-4 text-orange-500" />
                              Glissez une option ici pour choisir
                            </p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              Ou cliquez directement sur une option
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>

                    {/* Options Cards */}
                    <div className="grid md:grid-cols-2 gap-4">
                      {currentEpisode.options.map((option) => (
                        <motion.div
                          key={option.id}
                          drag
                          dragConstraints={false}
                          dragElastic={0.1}
                          whileDrag={{ 
                            scale: 1.1,
                            zIndex: 50,
                            rotate: 2,
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                          }}
                          onDragStart={() => setDraggedOption(option.id)}
                          onDragEnd={(event, info) => {
                            setDraggedOption(null);
                            setDropZoneHovered(false);
                            
                            // Vérifier si la carte a été déposée dans la zone de drop
                            const dropZone = document.querySelector('[data-drop-zone]');
                            if (dropZone) {
                              const dropRect = dropZone.getBoundingClientRect();
                              const target = event.target as HTMLElement;
                              if (target) {
                                const cardRect = target.getBoundingClientRect();
                                
                                // Vérifier si les rectangles se chevauchent
                                const isOverDropZone = 
                                  cardRect.left < dropRect.right &&
                                  cardRect.right > dropRect.left &&
                                  cardRect.top < dropRect.bottom &&
                                  cardRect.bottom > dropRect.top;
                                
                                if (isOverDropZone || Math.abs(info.offset.y) > 80) {
                                  selectOption(option.id);
                                }
                              }
                            } else if (Math.abs(info.offset.y) > 80) {
                              // Si on a glissé assez loin, sélectionner quand même
                              selectOption(option.id);
                            }
                          }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="cursor-grab active:cursor-grabbing h-full"
                        >
                          <Card
                            className={`h-full flex flex-col transition-all duration-200 ${
                              option.id === 'bigTech'
                                ? 'border-red-500/20 hover:border-red-500/40 bg-red-500/5'
                                : 'border-orange-500/30 hover:border-orange-500/50 bg-orange-500/10'
                            }`}
                            onClick={() => selectOption(option.id)}
                          >
                            <CardHeader>
                              <div className="flex items-center gap-3 mb-2">
                                {option.id === 'bigTech' ? (
                                  <AlertTriangle className="w-6 h-6 text-red-500" />
                                ) : (
                                  <CheckCircle2 className="w-6 h-6 text-orange-500" />
                                )}
                                <CardTitle className={`text-lg ${option.id === 'nird' ? 'text-orange-600 dark:text-orange-400' : ''}`}>{option.label}</CardTitle>
                              </div>
                              <CardDescription className="font-semibold text-base">
                                {option.title}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-1">
                              <p className="text-sm text-muted-foreground flex-1">
                                {option.description}
                              </p>
                              <p className="text-xs text-muted-foreground mt-3 italic flex items-center gap-1">
                                <Move className="w-3 h-3" />
                                Glissez-moi
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Consequence */}
                {showConsequence && chosenOption && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 space-y-4"
                  >
                    <div className={`p-4 rounded-lg ${
                      chosenOption.id === 'bigTech'
                        ? 'bg-red-500/10 border border-red-500/30'
                        : 'bg-orange-500/10 border border-orange-500/30'
                    }`}>
                      <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                        {chosenOption.id === 'bigTech' ? (
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-orange-500" />
                        )}
                        <span className={chosenOption.id === 'nird' ? 'text-orange-600 dark:text-orange-400' : ''}>Conséquence immédiate</span>
                      </h3>
                      <p className="text-foreground leading-relaxed">
                        {chosenOption.immediateConsequence}
                      </p>
                    </div>

                    {/* Impact indicators */}
                    <div className="grid grid-cols-4 gap-2">
                      {chosenOption.impact.budget !== 0 && (
                        <div className="text-center p-2 bg-yellow-500/10 rounded">
                          <Coins className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className={`text-sm font-bold ${chosenOption.impact.budget > 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {chosenOption.impact.budget > 0 ? '+' : ''}{chosenOption.impact.budget}
                          </p>
                        </div>
                      )}
                      {chosenOption.impact.inclusion !== 0 && (
                        <div className="text-center p-2 bg-blue-500/10 rounded">
                          <Users className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Inclusion</p>
                          <p className={`text-sm font-bold ${chosenOption.impact.inclusion > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {chosenOption.impact.inclusion > 0 ? '+' : ''}{chosenOption.impact.inclusion}
                          </p>
                        </div>
                      )}
                      {chosenOption.impact.durability !== 0 && (
                        <div className="text-center p-2 bg-green-500/10 rounded">
                          <Leaf className="w-4 h-4 text-green-500 mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Durabilité</p>
                          <p className={`text-sm font-bold ${chosenOption.impact.durability > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {chosenOption.impact.durability > 0 ? '+' : ''}{chosenOption.impact.durability}
                          </p>
                        </div>
                      )}
                      {chosenOption.impact.bigTechDependence !== 0 && (
                        <div className="text-center p-2 bg-red-500/10 rounded">
                          <Shield className="w-4 h-4 text-red-500 mx-auto mb-1" />
                          <p className="text-xs text-muted-foreground">Dépendance</p>
                          <p className={`text-sm font-bold ${chosenOption.impact.bigTechDependence > 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {chosenOption.impact.bigTechDependence > 0 ? '+' : ''}{chosenOption.impact.bigTechDependence}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center pt-4">
                      <button
                        onClick={goToNextEpisode}
                        className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-orange-500/20"
                      >
                        <span>Épisode suivant</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}
                </CardContent>
                </Card>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

