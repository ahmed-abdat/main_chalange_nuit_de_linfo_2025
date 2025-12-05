'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { type StudentScenario, type ChoiceType } from '@/data/studentScenarios';
import { cn } from '@/lib/utils';
import { useStudentScenarioStore } from '@/store/studentScenarioStore';
import { 
  Check, X, AlertTriangle, RotateCcw, 
  DollarSign, Lock, ServerCrash, Sprout, Unlock, ShieldCheck,
  Smartphone, Laptop, Wifi, HelpCircle, Info,
  Gamepad2, Box, Bot, Search, Chrome, Music2, Headphones,
  Skull, Palette, MessageSquareWarning, MessageCircleHeart,
  Wrench, CloudUpload, FileLock2, MapPinOff, Map, Film,
  Clapperboard, KeyRound, Languages, Globe, Trash2, Usb,
  Eye, EyeOff, MailWarning, MailCheck, Clock, Users,
  FileX, FileCheck, Copyright, Image, Zap, PenTool, GitBranch
} from 'lucide-react';

// Map string icon names to Lucide components
const IconMap: Record<string, any> = {
  Gamepad2, Box, Bot, Search, Chrome, ShieldCheck, Music2, Headphones,
  Skull, Palette, MessageSquareWarning, MessageCircleHeart, Smartphone, Wrench,
  CloudUpload, FileLock2, MapPinOff, Map, Film, Clapperboard, Unlock, KeyRound,
  Languages, Globe, Trash2, Usb, Eye, EyeOff, MailWarning, MailCheck, Clock, Users,
  FileX, FileCheck, Copyright, Image, Zap, PenTool, Lock, GitBranch
};

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  const IconComponent = IconMap[name] || HelpCircle;
  return <IconComponent className={className} />;
};

interface ScenarioCardProps {
  scenario: StudentScenario;
  onChoiceSelect: (choice: ChoiceType) => void;
  disabled?: boolean;
}

type GameState = 'idle' | 'dragging' | 'hovering' | 'processing' | 'completed';
type DraggingItem = 'A' | 'B' | null;

// Simple Particle Component for Confetti Effect
const Particle = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
    animate={{ 
      opacity: 0, 
      scale: [0, 1, 0],
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 200,
      rotate: Math.random() * 360
    }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
    className="absolute w-3 h-3 rounded-full"
    style={{
      backgroundColor: ['#FFD700', '#FF69B4', '#00CED1', '#32CD32'][Math.floor(Math.random() * 4)],
      top: '50%',
      left: '50%'
    }}
  />
);

export function ScenarioCard({ scenario, onChoiceSelect, disabled = false }: ScenarioCardProps) {
  const { isScenarioCompleted, getScenarioChoice } = useStudentScenarioStore();
  const isCompleted = isScenarioCompleted(scenario.id);
  const selectedChoice = getScenarioChoice(scenario.id);

  // Local state for the interaction
  const [gameState, setGameState] = useState<GameState>(isCompleted ? 'completed' : 'idle');
  const [draggingItem, setDraggingItem] = useState<DraggingItem>(null);
  const [hoveredChoice, setHoveredChoice] = useState<DraggingItem>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const choiceARef = useRef<HTMLDivElement>(null);
  const choiceBRef = useRef<HTMLDivElement>(null);

  const checkOverlap = useCallback((itemRef: React.RefObject<HTMLDivElement | null>) => {
    if (!dropZoneRef.current || !itemRef.current) return false;
    const dropRect = dropZoneRef.current.getBoundingClientRect();
    const itemRect = itemRef.current.getBoundingClientRect();
    const itemCenterX = itemRect.left + itemRect.width / 2;
    const itemCenterY = itemRect.top + itemRect.height / 2;
    return (
      itemCenterX >= dropRect.left &&
      itemCenterX <= dropRect.right &&
      itemCenterY >= dropRect.top &&
      itemCenterY <= dropRect.bottom
    );
  }, []);

  const handleDrag = useCallback((itemType: 'A' | 'B') => {
    if (gameState === 'idle' || gameState === 'dragging' || gameState === 'hovering') {
      setDraggingItem(itemType);
      setGameState('dragging');
      const ref = itemType === 'A' ? choiceARef : choiceBRef;
      const isOver = checkOverlap(ref);
      
      if (isOver) {
        setGameState('hovering');
        setHoveredChoice(itemType);
      } else {
        setGameState('dragging');
        setHoveredChoice(null);
      }
    }
  }, [gameState, checkOverlap]);

  const handleDragEnd = useCallback((itemType: 'A' | 'B') => {
    if (gameState === 'hovering' && hoveredChoice === itemType) {
      handleDrop(itemType);
    } else {
      setGameState('idle');
      setDraggingItem(null);
      setHoveredChoice(null);
    }
  }, [gameState, hoveredChoice]);

  const handleDrop = (choiceId: 'A' | 'B') => {
    setGameState('processing');
    setDraggingItem(null);
    setHoveredChoice(null);

    // Simulate processing time then complete
    setTimeout(() => {
      onChoiceSelect(choiceId);
      setGameState('completed');
      if (choiceId === 'B') {
        setShowConfetti(true);
      }
    }, 1500);
  };

  // Determine visual state based on completion or current interaction
  const currentVisualState = isCompleted 
    ? (selectedChoice === 'B' ? 'success' : 'warning')
    : (gameState === 'processing' ? 'processing' : 'idle');

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
          {[...Array(20)].map((_, i) => (
            <Particle key={i} delay={i * 0.05} />
          ))}
        </div>
      )}

      {/* Context Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#00997d]/10 text-[#00997d] text-xs font-medium rounded-full mb-4">
          <Laptop className="w-3 h-3" />
          Scénario {scenario.id}/20
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-relaxed max-w-3xl mx-auto flex items-center justify-center gap-3" dir="rtl">
          {scenario.context}
        </h3>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
        
        {/* DROP ZONE (The Situation/Device) */}
        <div className="order-2 lg:order-2">
          <motion.div
            ref={dropZoneRef}
            animate={currentVisualState === 'warning' ? { x: [0, -5, 5, -5, 5, 0] } : {}}
            transition={{ duration: 0.4 }}
            className={cn(
              'relative w-72 h-72 md:w-80 md:h-80 rounded-2xl border-4 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center shadow-lg overflow-hidden',
              gameState === 'idle' && 'border-gray-200 bg-white',
              gameState === 'dragging' && 'border-gray-300 bg-gray-50 border-dashed',
              gameState === 'hovering' && hoveredChoice === 'B' && 'border-[#00997d] bg-[#00997d]/5 scale-105 shadow-[#00997d]/20',
              gameState === 'hovering' && hoveredChoice === 'A' && 'border-[#C62828] bg-[#C62828]/5 scale-105 shadow-[#C62828]/20',
              currentVisualState === 'success' && 'border-[#00997d] bg-[#00997d]/10',
              currentVisualState === 'warning' && 'border-[#C62828] bg-[#C62828]/10',
              currentVisualState === 'processing' && 'border-gray-900 bg-gray-900'
            )}
          >
            <AnimatePresence mode="wait">
              {/* IDLE STATE */}
              {gameState === 'idle' && !isCompleted && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <HelpCircle className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Faites votre choix</p>
                  <p className="text-xs text-gray-400 mt-2">Glissez une option ici</p>
                </motion.div>
              )}

              {/* HOVERING STATE */}
              {gameState === 'hovering' && (
                <motion.div
                  key="hovering"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center"
                >
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mb-4",
                    hoveredChoice === 'B' ? "bg-[#00997d]/10" : "bg-[#C62828]/10"
                  )}>
                     <DynamicIcon 
                       name={hoveredChoice === 'B' ? scenario.choiceB.icon : scenario.choiceA.icon} 
                       className={cn("w-10 h-10", hoveredChoice === 'B' ? "text-[#00997d]" : "text-[#C62828]")}
                     />
                  </div>
                  <p className={cn(
                    "font-bold text-lg",
                    hoveredChoice === 'B' ? "text-[#00997d]" : "text-[#C62828]"
                  )}>
                    {hoveredChoice === 'B' ? "Solution NIRD" : "Solution Big Tech"}
                  </p>
                  
                  {/* Points Preview on Hover */}
                  {hoveredChoice === 'B' && scenario.choiceB.points && (
                     <div className="flex gap-2 mt-2">
                        {scenario.choiceB.points.money > 0 && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">+💰</span>}
                        {scenario.choiceB.points.protection > 0 && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">+🛡️</span>}
                        {scenario.choiceB.points.environment > 0 && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">+🌱</span>}
                     </div>
                  )}
                  
                  <p className="text-sm opacity-70 mt-2">Relâchez pour confirmer</p>
                </motion.div>
              )}

              {/* PROCESSING STATE */}
              {gameState === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-white"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full mb-4"
                  />
                  <p className="font-medium">Traitement en cours...</p>
                </motion.div>
              )}

              {/* COMPLETED STATE */}
              {isCompleted && (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mb-4 shadow-sm",
                    selectedChoice === 'B' ? "bg-[#00997d] text-white" : "bg-[#C62828] text-white"
                  )}>
                    {selectedChoice === 'B' ? <Check className="w-10 h-10" /> : <X className="w-10 h-10" />}
                  </div>
                  <p className={cn(
                    "font-bold text-lg mb-1",
                    selectedChoice === 'B' ? "text-[#00997d]" : "text-[#C62828]"
                  )}>
                    {selectedChoice === 'B' ? "Excellent Choix !" : "Choix Coûteux"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {selectedChoice === 'B' ? "+ Points NIRD" : "Aucun point gagné"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Mobile Instruction */}
          <p className="lg:hidden text-center text-xs text-gray-400 mt-4">
            Appuyez longuement pour glisser
          </p>
        </div>

        {/* DRAGGABLE CHOICES */}
        <div className="flex flex-col gap-6 w-full max-w-sm order-1 lg:order-1">
          {/* Choice A - Big Tech */}
          <motion.div
            ref={choiceARef}
            drag={!isCompleted && !disabled}
            dragSnapToOrigin
            dragElastic={0.1}
            whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
            whileHover={!isCompleted ? { scale: 1.02, x: 5 } : {}}
            onDragStart={() => handleDrag('A')}
            onDrag={() => handleDrag('A')}
            onDragEnd={() => handleDragEnd('A')}
            className={cn(
              "relative p-5 rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing bg-white",
              isCompleted && selectedChoice !== 'A' && "opacity-50 grayscale pointer-events-none",
              isCompleted && selectedChoice === 'A' && "border-[#C62828] bg-[#C62828]/5 pointer-events-none",
              !isCompleted && "hover:border-[#C62828] hover:shadow-md border-gray-200"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-[#C62828]/10 rounded-lg">
                <DynamicIcon name={scenario.choiceA.icon} className="w-6 h-6 text-[#C62828]" />
              </div>
              <span className="px-2 py-1 bg-[#C62828]/10 text-[#C62828] text-xs font-bold rounded uppercase flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Big Tech
              </span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{scenario.choiceA.title}</h4>
            <p className="text-sm text-gray-600">{scenario.choiceA.description}</p>
            
            {!isCompleted && (
              <div className="absolute -right-2 -top-2 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                <span className="text-xs text-gray-400">A</span>
              </div>
            )}
          </motion.div>

          {/* Choice B - NIRD */}
          <motion.div
            ref={choiceBRef}
            drag={!isCompleted && !disabled}
            dragSnapToOrigin
            dragElastic={0.1}
            whileDrag={{ scale: 1.05, zIndex: 50, cursor: 'grabbing' }}
            whileHover={!isCompleted ? { scale: 1.02, x: 5 } : {}}
            onDragStart={() => handleDrag('B')}
            onDrag={() => handleDrag('B')}
            onDragEnd={() => handleDragEnd('B')}
            className={cn(
              "relative p-5 rounded-xl border-2 transition-all cursor-grab active:cursor-grabbing bg-white",
              isCompleted && selectedChoice !== 'B' && "opacity-50 grayscale pointer-events-none",
              isCompleted && selectedChoice === 'B' && "border-[#00997d] bg-[#00997d]/5 pointer-events-none",
              !isCompleted && "hover:border-[#00997d] hover:shadow-md border-gray-200"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="p-2 bg-[#00997d]/10 rounded-lg">
                <DynamicIcon name={scenario.choiceB.icon} className="w-6 h-6 text-[#00997d]" />
              </div>
              <span className="px-2 py-1 bg-[#00997d]/10 text-[#00997d] text-xs font-bold rounded uppercase flex items-center gap-1">
                <Unlock className="w-3 h-3" />
                NIRD
              </span>
            </div>
            <h4 className="font-bold text-gray-900 mb-1">{scenario.choiceB.title}</h4>
            <p className="text-sm text-gray-600">{scenario.choiceB.description}</p>

            {/* Points Preview */}
            {scenario.choiceB.points && !isCompleted && (
              <div className="mt-3 flex gap-2">
                {scenario.choiceB.points.money > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded font-medium flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> Money
                  </span>
                )}
                {scenario.choiceB.points.protection > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-green-100 text-green-700 rounded font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Secu
                  </span>
                )}
                {scenario.choiceB.points.environment > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded font-medium flex items-center gap-1">
                    <Sprout className="w-3 h-3" /> Eco
                  </span>
                )}
              </div>
            )}

            {!isCompleted && (
              <div className="absolute -right-2 -top-2 w-6 h-6 bg-[#00997d] text-white rounded-full flex items-center justify-center shadow-sm">
                <span className="text-xs font-bold">B</span>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </div>
  );
}
