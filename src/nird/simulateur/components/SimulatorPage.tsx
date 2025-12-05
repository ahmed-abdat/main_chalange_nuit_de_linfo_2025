import { motion, AnimatePresence } from 'framer-motion';
import { useNirdStore } from '../store/useNirdStore';
import { PersonaSelection } from './PersonaSelection';
import { TechDirectorScenarios } from './TechDirectorScenarios';
import { StorySimulator } from './StorySimulator';
import { ComingSoon } from './ComingSoon';
import { ArrowLeft } from 'lucide-react';
import { NirdButton } from './ui/NirdButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SimulatorPage = () => {
  const { selectedPersona, setSelectedPersona } = useNirdStore();
  const [simulatorMode, setSimulatorMode] = useState<'story' | 'scenarios'>('story');
  const router = useRouter();

  const handleBack = () => {
    if (selectedPersona) {
      setSelectedPersona(null);
      setSimulatorMode('story');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 glass-panel border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <NirdButton
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour</span>
            </NirdButton>
            <div>
              <h1 className="font-display text-xl font-bold text-gradient-nird">
                Simulateur NIRD
              </h1>
              <p className="text-xs text-muted-foreground">
                {selectedPersona ? (simulatorMode === 'story' ? 'Mode Histoires' : 'Scénarios') : 'Choisissez votre persona'}
              </p>
            </div>
          </div>
          
          {/* Mode selector buttons - only show for tech-director */}
          {selectedPersona === 'tech-director' && (
            <div className="flex items-center gap-2">
              <NirdButton
                variant={simulatorMode === 'story' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSimulatorMode('story')}
              >
                Mode Histoires
              </NirdButton>
              <NirdButton
                variant={simulatorMode === 'scenarios' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSimulatorMode('scenarios')}
              >
                Mode Scénarios
              </NirdButton>
            </div>
          )}
          
          {/* NIRD Logo on the right */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => router.push('/')}
          >
            <img 
              src="/logo.png" 
              alt="NIRD Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-display text-xl text-gradient-nird font-bold">NIRD</span>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {!selectedPersona ? (
          <motion.div
            key="persona-selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PersonaSelection />
          </motion.div>
        ) : selectedPersona === 'tech-director' ? (
          simulatorMode === 'story' ? (
            <motion.div
              key="story-simulator"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <StorySimulator />
            </motion.div>
          ) : (
            <motion.div
              key="tech-director"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <TechDirectorScenarios />
            </motion.div>
          )
        ) : (
          <motion.div
            key="coming-soon"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <ComingSoon persona={selectedPersona} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

