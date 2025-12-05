import { motion } from 'framer-motion';
import { useNirdStore } from '../store/useNirdStore';
import { NirdButton } from '../components/ui/NirdButton';
import { Settings, GraduationCap, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type PersonaType = 'tech-director' | 'student' | 'parent';

interface Persona {
  id: PersonaType;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const personas: Persona[] = [
  {
    id: 'tech-director',
    title: 'Le Directeur Technique / Administrateur Système',
    titleAr: 'Le Directeur Technique',
    subtitle: 'Persona 1',
    subtitleAr: 'Persona 1',
    description: 'Focus : Infrastructure, logiciels libres, souveraineté numérique et maintenance.',
    icon: <Settings className="w-12 h-12" />,
    color: '#895af6',
  },
  {
    id: 'student',
    title: 'L\'Élève / Le Natif Numérique',
    titleAr: 'L\'Élève',
    subtitle: 'Persona 2',
    subtitleAr: 'Persona 2',
    description: 'En développement',
    icon: <GraduationCap className="w-12 h-12" />,
    color: '#0ea5e9',
  },
  {
    id: 'parent',
    title: 'Le Parent',
    titleAr: 'Le Parent',
    subtitle: 'Persona 3',
    subtitleAr: 'Persona 3',
    description: 'En développement',
    icon: <Users className="w-12 h-12" />,
    color: '#22c55e',
  },
];

export const PersonaSelection = () => {
  const { setSelectedPersona } = useNirdStore();

  const handlePersonaSelect = (personaId: PersonaType) => {
    setSelectedPersona(personaId);
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-gradient-nird">
            Choisissez votre persona
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Déterminez qui vous êtes pour explorer les scénarios qui vous correspondent
          </p>
        </motion.div>

        {/* Persona Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card 
                className="glass-panel border-2 border-primary/20 h-full hover:border-primary/40 transition-all cursor-pointer group flex flex-col"
                onClick={() => handlePersonaSelect(persona.id)}
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="p-4 rounded-lg"
                      style={{ 
                        backgroundColor: `${persona.color}20`,
                        color: persona.color
                      }}
                    >
                      {persona.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-1">{persona.titleAr}</CardTitle>
                      <CardDescription className="text-sm">{persona.subtitleAr}</CardDescription>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <div className="font-medium">{persona.title}</div>
                    <div className="text-xs mt-1">{persona.subtitle}</div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                    {persona.description}
                  </p>
                  <div className="mt-auto">
                    <NirdButton
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:scale-105 transition-transform"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {persona.id === 'tech-director' ? 'Commencer' : 'En développement'}
                        {persona.id === 'tech-director' && <ArrowRight className="w-4 h-4" />}
                      </span>
                    </NirdButton>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

