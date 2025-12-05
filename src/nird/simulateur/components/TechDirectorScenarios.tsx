import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, AlertTriangle, CheckCircle2, Eye, Play, Trophy, ArrowRight } from 'lucide-react';
import { NirdButton } from './ui/NirdButton';

interface Scenario {
  id: number;
  context: string;
  bigTech: {
    solution: string;
    issues: string[];
  };
  nird: {
    solution: string;
    benefits: string[];
  };
  impact: {
    money?: { value: string; icon: '💰' };
    environment?: { value: string; icon: '🌱' };
    security?: { value: string; icon: '🛡️' };
  };
}

const scenarios: Scenario[] = [
  {
    id: 1,
    context: 'Windows 10 : 50 ordinateurs anciens refusent la mise à jour',
    bigTech: {
      solution: 'Acheter de nouveaux appareils',
      issues: ['Gaspillage financier et environnemental']
    },
    nird: {
      solution: 'Installer Linux Mint/Xubuntu',
      benefits: ['Prolongation de vie des équipements', 'Gratuit et open source']
    },
    impact: {
      money: { value: '50+', icon: '💰' },
      environment: { value: '1000$+', icon: '🌱' }
    }
  },
  {
    id: 2,
    context: 'Stockage cloud : Les enseignants ont besoin de partager des fichiers',
    bigTech: {
      solution: 'Abonnement Google Drive',
      issues: ['Données hors Union Européenne', 'Dépendance à Google']
    },
    nird: {
      solution: 'Déployer Nextcloud localement ou via Apps.education',
      benefits: ['Données souveraines', 'Contrôle total']
    },
    impact: {
      money: { value: '50+', icon: '💰' },
      security: { value: '200$+', icon: '🛡️' }
    }
  },
  {
    id: 3,
    context: 'Réunions à distance : Besoin d\'une plateforme vidéo',
    bigTech: {
      solution: 'Zoom/Teams',
      issues: ['Propriétaire fermé', 'Problèmes de confidentialité']
    },
    nird: {
      solution: 'Utiliser BigBlueButton (open source)',
      benefits: ['Open source', 'Respect de la vie privée']
    },
    impact: {
      money: { value: '40+', icon: '💰' },
      security: { value: '100$+', icon: '🛡️' }
    }
  },
  {
    id: 4,
    context: 'Partage vidéo : L\'école veut publier des vidéos éducatives',
    bigTech: {
      solution: 'YouTube',
      issues: ['Publicités', 'Suivi', 'Algorithmes addictifs']
    },
    nird: {
      solution: 'Utiliser Peertube (vidéos sans publicités)',
      benefits: ['Sans publicités', 'Pas de tracking']
    },
    impact: {
      environment: { value: '40+', icon: '🌱' },
      security: { value: '10+', icon: '🛡️' }
    }
  },
  {
    id: 5,
    context: 'Suite bureautique : Les licences Office ont expiré et coûtent cher',
    bigTech: {
      solution: 'Renouveler les licences',
      issues: ['Épuisement du budget']
    },
    nird: {
      solution: 'Migrer vers LibreOffice',
      benefits: ['Gratuit', 'Compatible avec Office']
    },
    impact: {
      money: { value: '500$+', icon: '💰' },
      security: { value: '30+', icon: '🛡️' }
    }
  },
  {
    id: 6,
    context: 'Tableau blanc interactif : Le logiciel du TBI a planté',
    bigTech: {
      solution: 'Acheter un nouvel écran coûteux',
      issues: ['Coût élevé', 'Dépendance au fabricant']
    },
    nird: {
      solution: 'Utiliser OpenBoard sur un appareil existant',
      benefits: ['Réutilisation du matériel', 'Open source']
    },
    impact: {
      money: { value: '800$+', icon: '💰' },
      environment: { value: '30+', icon: '🌱' }
    }
  },
  {
    id: 7,
    context: 'Messagerie instantanée : Communication entre les employés',
    bigTech: {
      solution: 'WhatsApp',
      issues: ['Propriété de Facebook/Meta', 'Données collectées']
    },
    nird: {
      solution: 'Utiliser Element / Matrix (chiffré et sécurisé)',
      benefits: ['Chiffrement end-to-end', 'Souveraineté']
    },
    impact: {
      security: { value: '60+', icon: '🛡️' }
    }
  },
  {
    id: 8,
    context: 'Gestion réseau : Le Wi-Fi est lent à cause des publicités',
    bigTech: {
      solution: 'Augmenter la vitesse de la ligne',
      issues: ['Coût mensuel']
    },
    nird: {
      solution: 'Installer Pi-hole pour bloquer les publicités et économiser la bande passante',
      benefits: ['Blocage des publicités', 'Économie de bande passante']
    },
    impact: {
      environment: { value: '20$+', icon: '🌱' },
      security: { value: '10+', icon: '🛡️' }
    }
  },
  {
    id: 9,
    context: 'Questionnaires : Collecter les avis des élèves',
    bigTech: {
      solution: 'Google Forms',
      issues: ['Données chez Google', 'Tracking']
    },
    nird: {
      solution: 'Utiliser Framaforms',
      benefits: ['Respect de la vie privée', 'Souveraineté']
    },
    impact: {
      security: { value: '30+', icon: '🛡️' }
    }
  },
  {
    id: 10,
    context: 'Enseignement de la programmation : Environnement de développement pour les élèves',
    bigTech: {
      solution: 'Solutions propriétaires',
      issues: ['Coûts de licence', 'Dépendance']
    },
    nird: {
      solution: 'Utiliser Capytale (environnement Python éducatif)',
      benefits: ['Gratuit', 'Adapté à l\'éducation']
    },
    impact: {
      money: { value: '40+', icon: '💰' }
    }
  },
  {
    id: 11,
    context: 'Imprimantes : L\'imprimante refuse l\'encre',
    bigTech: {
      solution: 'Acheter une nouvelle imprimante',
      issues: ['Gaspillage', 'Coût élevé']
    },
    nird: {
      solution: 'Utiliser des pilotes open source',
      benefits: ['Réutilisation', 'Économie']
    },
    impact: {
      money: { value: '50$+', icon: '💰' },
      environment: { value: '20+', icon: '🌱' }
    }
  },
  {
    id: 12,
    context: 'Site web : Hébergement du site de l\'école',
    bigTech: {
      solution: 'Wix/Squarespace',
      issues: ['Coûts mensuels', 'Dépendance']
    },
    nird: {
      solution: 'Utiliser WordPress/Hugo avec hébergement OVH',
      benefits: ['Contrôle total', 'Souveraineté']
    },
    impact: {
      money: { value: '100$+', icon: '💰' },
      security: { value: '20+', icon: '🛡️' }
    }
  },
  {
    id: 13,
    context: 'Sauvegarde : Protéger les données de la perte',
    bigTech: {
      solution: 'AWS/Azure',
      issues: ['Coûts élevés', 'Données à l\'étranger']
    },
    nird: {
      solution: 'Sauvegarde locale ou OVH',
      benefits: ['Souveraineté', 'Contrôle']
    },
    impact: {
      money: { value: '500$+', icon: '💰' },
      security: { value: '30+', icon: '🛡️' }
    }
  },
  {
    id: 14,
    context: 'Contrôle à distance : Maintenance des appareils à distance',
    bigTech: {
      solution: 'TeamViewer',
      issues: ['Coûts de licence', 'Données collectées']
    },
    nird: {
      solution: 'Utiliser RustDesk/VNC',
      benefits: ['Open source', 'Gratuit']
    },
    impact: {
      money: { value: '50$-', icon: '💰' },
      security: { value: '30+', icon: '🛡️' }
    }
  },
  {
    id: 15,
    context: 'Déchets : Appareils très anciens (ferraille)',
    bigTech: {
      solution: 'Jeter et remplacer',
      issues: ['Pollution', 'Gaspillage']
    },
    nird: {
      solution: 'Repair Café, Thin Clients, réutilisation',
      benefits: ['Réduction des déchets', 'Économie circulaire']
    },
    impact: {
      environment: { value: '20+', icon: '🌱' },
      money: { value: '300$+', icon: '💰' }
    }
  },
  {
    id: 16,
    context: 'Formation : Les enseignants se plaignent de la difficulté de Linux',
    bigTech: {
      solution: 'Rester sur Windows',
      issues: ['Dépendance continue']
    },
    nird: {
      solution: 'Formation et accompagnement',
      benefits: ['Autonomie', 'Compétences']
    },
    impact: {
      security: { value: '60+', icon: '🛡️' }
    }
  },
  {
    id: 17,
    context: 'Manuels scolaires : Coût des livres papier / numériques fermés',
    bigTech: {
      solution: 'Acheter des licences DRM',
      issues: ['Coûts élevés', 'Dépendance']
    },
    nird: {
      solution: 'Utiliser OER, Wikipedia',
      benefits: ['Gratuit', 'Libre']
    },
    impact: {
      money: { value: '500$+', icon: '💰' }
    }
  },
  {
    id: 18,
    context: 'Gestion de projets : Organiser les tâches de l\'équipe technique',
    bigTech: {
      solution: 'Trello',
      issues: ['Données chez Atlassian']
    },
    nird: {
      solution: 'Utiliser Focalboard/Taiga',
      benefits: ['Open source', 'Souveraineté']
    },
    impact: {
      security: { value: '20+', icon: '🛡️' }
    }
  },
  {
    id: 19,
    context: 'Réseau social : Communication avec une page Facebook nécessite un compte',
    bigTech: {
      solution: 'Utiliser Facebook',
      issues: ['Tracking', 'Dépendance']
    },
    nird: {
      solution: 'Créer une instance Mastodon pour l\'école ou un blog RSS',
      benefits: ['Décentralisé', 'Pas de tracking']
    },
    impact: {
      security: { value: '70+', icon: '🛡️' }
    }
  },
  {
    id: 20,
    context: 'Politiques : Présentation d\'une entreprise pour équiper une classe "futuriste"',
    bigTech: {
      solution: 'Approuver (VR fermé, lunettes Meta)',
      issues: ['Dépendance', 'Coûts élevés']
    },
    nird: {
      solution: 'Refuser et investir dans des appareils réparables (Fairphone/Framework)',
      benefits: ['Réparabilité', 'Durabilité']
    },
    impact: {
      security: { value: '60+', icon: '🛡️' },
      environment: { value: '40+', icon: '🌱' }
    }
  }
];

export const TechDirectorScenarios = () => {
  const [gameMode, setGameMode] = useState<'game' | 'view-all'>('game');
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Map<number, 'bigTech' | 'nird'>>(new Map());
  const [showResults, setShowResults] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const currentScenario = scenarios[currentScenarioIndex];
  const isLastScenario = currentScenarioIndex === scenarios.length - 1;
  const allScenariosCompleted = selectedChoices.size === scenarios.length;

  const handleChoice = (choice: 'bigTech' | 'nird') => {
    const newChoices = new Map(selectedChoices);
    newChoices.set(currentScenario.id, choice);
    setSelectedChoices(newChoices);

    // Show results for this scenario
    setShowResults(true);

    // Auto-advance after 2 seconds if not last scenario
    if (!isLastScenario) {
      setTimeout(() => {
        setCurrentScenarioIndex(currentScenarioIndex + 1);
        setShowResults(false);
      }, 2000);
    } else {
      // Last scenario - show final evaluation after 2 seconds
      setTimeout(() => {
        setShowResults(false);
      }, 2000);
    }
  };

  const calculateFinalScore = () => {
    let totalMoney = 0;
    let totalEnvironment = 0;
    let totalSecurity = 0;
    let nirdChoices = 0;

    selectedChoices.forEach((choice, scenarioId) => {
      const scenario = scenarios.find(s => s.id === scenarioId);
      if (!scenario) return;

      if (choice === 'nird') {
        nirdChoices++;
        if (scenario.impact.money) {
          const value = parseInt(scenario.impact.money.value.replace(/\D/g, ''));
          totalMoney += isNaN(value) ? 0 : value;
        }
        if (scenario.impact.environment) {
          const value = parseInt(scenario.impact.environment.value.replace(/\D/g, ''));
          totalEnvironment += isNaN(value) ? 0 : value;
        }
        if (scenario.impact.security) {
          const value = parseInt(scenario.impact.security.value.replace(/\D/g, ''));
          totalSecurity += isNaN(value) ? 0 : value;
        }
      }
    });

    const nirdScore = Math.round((nirdChoices / scenarios.length) * 100);
    const totalScore = Math.min(100, nirdScore + Math.floor(totalSecurity / 10) + Math.floor(totalEnvironment / 20));

    return {
      nirdScore,
      totalScore,
      totalMoney,
      totalEnvironment,
      totalSecurity,
      nirdChoices,
      totalScenarios: scenarios.length
    };
  };

  const finalScore = allScenariosCompleted ? calculateFinalScore() : null;

  // Game Mode - Single Scenario View
  if (gameMode === 'game' && !gameStarted) {
    return (
      <div className="min-h-screen bg-background py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="p-4 rounded-lg bg-primary/20">
                <Settings className="w-12 h-12 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-nird">
                  Le Directeur Technique
                </h1>
                <p className="text-lg text-muted-foreground mt-2">
                  The Tech Director / SysAdmin
                </p>
              </div>
            </div>

            <Card className="glass-panel border-2 border-primary/20 flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gradient-nird mb-4">
                  Bienvenue dans le Simulateur NIRD
                </CardTitle>
                <CardDescription className="text-lg">
                  Vous allez faire face à {scenarios.length} scénarios réels
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-6">
                <p className="text-muted-foreground flex-1">
                  Pour chaque scénario, choisissez entre l'option Big Tech (dépendance) 
                  ou l'option NIRD (résistance). Votre score final dépendra de vos choix !
                </p>
                <div className="mt-auto">
                  <NirdButton
                    size="lg"
                    onClick={() => setGameStarted(true)}
                    className="group w-full"
                  >
                    <>
                      <Play className="w-5 h-5" />
                      Commencer
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  </NirdButton>
                </div>
              </CardContent>
            </Card>

            <NirdButton
              variant="outline"
              onClick={() => setGameMode('view-all')}
            >
              <Eye className="w-4 h-4" />
              Voir tous les scénarios
            </NirdButton>
          </motion.div>
        </div>
      </div>
    );
  }

  // Game Mode - Playing
  if (gameMode === 'game' && gameStarted && !allScenariosCompleted) {
    return (
      <div className="min-h-screen bg-background py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Scénario {currentScenarioIndex + 1} sur {scenarios.length}
              </span>
              <NirdButton
                variant="ghost"
                size="sm"
                onClick={() => setGameMode('view-all')}
              >
                <Eye className="w-4 h-4" />
                Voir tous
              </NirdButton>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentScenarioIndex + 1) / scenarios.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Current Scenario */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScenario.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="glass-panel border-2 border-primary/20 mb-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gradient-nird">
                    {currentScenario.context}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showResults ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {/* Big Tech Option */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-full"
                      >
                        <Card
                          className="h-full flex flex-col p-6 cursor-pointer border-2 border-red-500/20 hover:border-red-500/40 transition-all bg-red-500/5"
                          onClick={() => handleChoice('bigTech')}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                            <h3 className="font-bold text-red-500">Option A : Big Tech</h3>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-2">{currentScenario.bigTech.solution}</p>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {currentScenario.bigTech.issues.map((issue, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-red-500 mt-1">•</span>
                                  <span>{issue}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Card>
                      </motion.div>

                      {/* NIRD Option */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="h-full"
                      >
                        <Card
                          className="h-full flex flex-col p-6 cursor-pointer border-2 border-primary/20 hover:border-primary/40 transition-all bg-primary/5"
                          onClick={() => handleChoice('nird')}
                        >
                          <div className="flex items-center gap-3 mb-4">
                            <CheckCircle2 className="w-6 h-6 text-primary" />
                            <h3 className="font-bold text-primary">Option B : NIRD</h3>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-2">{currentScenario.nird.solution}</p>
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {currentScenario.nird.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-primary mt-1">✓</span>
                                  <span>{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </Card>
                      </motion.div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <div className="mb-4">
                        {selectedChoices.get(currentScenario.id) === 'nird' ? (
                          <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
                        ) : (
                          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-4">
                        {selectedChoices.get(currentScenario.id) === 'nird' 
                          ? 'Excellent choix !' 
                          : 'Choix Big Tech sélectionné'}
                      </h3>
                      {selectedChoices.get(currentScenario.id) === 'nird' && currentScenario.impact && (
                        <div className="flex justify-center gap-4 mt-6">
                          {currentScenario.impact.money && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                              <span className="text-2xl">{currentScenario.impact.money.icon}</span>
                              <span className="font-bold text-yellow-500">{currentScenario.impact.money.value}</span>
                            </div>
                          )}
                          {currentScenario.impact.environment && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                              <span className="text-2xl">{currentScenario.impact.environment.icon}</span>
                              <span className="font-bold text-green-500">{currentScenario.impact.environment.value}</span>
                            </div>
                          )}
                          {currentScenario.impact.security && (
                            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                              <span className="text-2xl">{currentScenario.impact.security.icon}</span>
                              <span className="font-bold text-blue-500">{currentScenario.impact.security.value}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  // Final Evaluation
  if (gameMode === 'game' && allScenariosCompleted && finalScore) {
    return (
      <div className="min-h-screen bg-background py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="mb-8">
              <Trophy className="w-24 h-24 text-primary mx-auto mb-6" />
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-nird mb-4">
                Évaluation Finale
              </h1>
              <p className="text-lg text-muted-foreground">
                Vous avez complété tous les scénarios !
              </p>
            </div>

            <Card className="glass-panel border-2 border-primary/20 mb-6 flex flex-col">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gradient-nird mb-2">
                  Score NIRD : {finalScore.totalScore}/100
                </CardTitle>
                <CardDescription className="text-lg">
                  {finalScore.nirdChoices} choix NIRD sur {finalScore.totalScenarios} scénarios
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {finalScore.totalMoney > 0 && (
                    <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-yellow-500/10 border border-yellow-500/20 h-full">
                      <span className="text-4xl">💰</span>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Économies</div>
                        <div className="text-3xl font-bold text-yellow-500">{finalScore.totalMoney}+</div>
                      </div>
                    </div>
                  )}
                  {finalScore.totalEnvironment > 0 && (
                    <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-green-500/10 border border-green-500/20 h-full">
                      <span className="text-4xl">🌱</span>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Durabilité</div>
                        <div className="text-3xl font-bold text-green-500">{finalScore.totalEnvironment}+</div>
                      </div>
                    </div>
                  )}
                  {finalScore.totalSecurity > 0 && (
                    <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-blue-500/10 border border-blue-500/20 h-full">
                      <span className="text-4xl">🛡️</span>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Sécurité</div>
                        <div className="text-3xl font-bold text-blue-500">{finalScore.totalSecurity}+</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4 justify-center pt-4 mt-auto">
                  <NirdButton
                    onClick={() => {
                      setGameStarted(false);
                      setCurrentScenarioIndex(0);
                      setSelectedChoices(new Map());
                      setShowResults(false);
                    }}
                  >
                    Rejouer
                  </NirdButton>
                  <NirdButton
                    variant="outline"
                    onClick={() => setGameMode('view-all')}
                  >
                    <Eye className="w-4 h-4" />
                    Voir tous les scénarios
                  </NirdButton>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // View All Mode - Show all scenarios
  return (
    <div className="min-h-screen bg-background py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 rounded-lg bg-primary/20">
              <Settings className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-nird">
                Tous les Scénarios
              </h1>
            </div>
          </div>
          <NirdButton
            variant="outline"
            onClick={() => {
              setGameMode('game');
              setGameStarted(false);
              setCurrentScenarioIndex(0);
              setSelectedChoices(new Map());
            }}
          >
            <Play className="w-4 h-4" />
            Mode Jeu
          </NirdButton>
        </motion.div>

        {/* All Scenarios Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => {
            const choice = selectedChoices.get(scenario.id);
            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="h-full"
              >
                <Card className={`glass-panel border-2 flex flex-col h-full ${
                  choice === 'nird' 
                    ? 'border-primary shadow-lg shadow-primary/20' 
                    : choice === 'bigTech'
                    ? 'border-red-500/20'
                    : 'border-primary/20 hover:border-primary/40'
                }`}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-bold text-primary">#{scenario.id}</span>
                      {choice && (
                        <span className={`text-xs px-2 py-1 rounded ${
                          choice === 'nird' 
                            ? 'bg-primary/20 text-primary' 
                            : 'bg-red-500/20 text-red-500'
                        }`}>
                          {choice === 'nird' ? 'NIRD' : 'Big Tech'}
                        </span>
                      )}
                    </div>
                    <CardTitle className="text-lg">{scenario.context}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 h-full">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <h4 className="text-xs font-semibold text-red-500">Big Tech</h4>
                        </div>
                        <p className="text-xs">{scenario.bigTech.solution}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 h-full">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                          <h4 className="text-xs font-semibold text-primary">NIRD</h4>
                        </div>
                        <p className="text-xs">{scenario.nird.solution}</p>
                      </div>
                    </div>
                    {scenario.impact && (
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {scenario.impact.money && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded bg-yellow-500/10 border border-yellow-500/20">
                            <span>{scenario.impact.money.icon}</span>
                            <span className="text-xs font-bold text-yellow-500">{scenario.impact.money.value}</span>
                          </div>
                        )}
                        {scenario.impact.environment && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded bg-green-500/10 border border-green-500/20">
                            <span>{scenario.impact.environment.icon}</span>
                            <span className="text-xs font-bold text-green-500">{scenario.impact.environment.value}</span>
                          </div>
                        )}
                        {scenario.impact.security && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                            <span>{scenario.impact.security.icon}</span>
                            <span className="text-xs font-bold text-blue-500">{scenario.impact.security.value}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

