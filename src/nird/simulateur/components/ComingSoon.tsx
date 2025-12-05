import { motion } from 'framer-motion';
import { useNirdStore } from '../store/useNirdStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

interface ComingSoonProps {
  persona: 'student' | 'parent';
}

const personaInfo = {
  student: {
    title: 'L\'Élève / Le Natif Numérique',
    titleEn: 'The Student / Digital Native',
    subtitle: 'Persona 2',
  },
  parent: {
    title: 'Le Parent',
    titleEn: 'The Parent',
    subtitle: 'Persona 3',
  },
};

export const ComingSoon = ({ persona }: ComingSoonProps) => {
  const info = personaInfo[persona];

  return (
    <div className="min-h-screen bg-background py-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-8">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 10, 0],
                scale: [1, 1.1, 1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              className="inline-block mb-6"
            >
              <Construction className="w-24 h-24 text-primary mx-auto" />
            </motion.div>
          </div>

          <Card className="glass-panel border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gradient-nird mb-2">
                {info.title}
              </CardTitle>
              <CardDescription className="text-lg">
                {info.titleEn}
              </CardDescription>
              <CardDescription className="text-sm mt-2">
                {info.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  En développement
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Nous travaillons sur le développement des scénarios pour cette persona.
                  <br />
                  Ils seront bientôt disponibles !
                </p>
              </div>

              <div className="glass-panel rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  💡 Vous pouvez commencer par explorer les scénarios du Directeur Technique pour le moment
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

