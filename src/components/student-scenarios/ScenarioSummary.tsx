import { motion } from 'motion/react';
import { Bot, ShieldCheck, Sprout, Users, Trophy, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type ScenarioPoints } from '@/data/studentScenarios';
import CountUp from '@/components/CountUp';

interface ScenarioSummaryProps {
    completedCount: number;
    totalCount: number;
    totalPoints: ScenarioPoints;
    onReset: () => void;
}

export function ScenarioSummary({ completedCount, totalCount, totalPoints, onReset }: ScenarioSummaryProps) {
    if (completedCount === 0) return null;

    const isComplete = completedCount === totalCount;

    // Calculate score quality
    const totalScore = totalPoints.money + totalPoints.protection + totalPoints.environment;
    const maxPossibleScore = totalCount * 100; // Approximate max
    const scorePercentage = Math.max(0, Math.min(100, Math.round((totalScore / maxPossibleScore) * 100)));

    let feedbackTitle = "Début de la Résistance";
    let feedbackMessage = "Continuez vos efforts pour libérer votre technologie !";
    let feedbackColor = "text-blue-600";
    let feedbackBg = "bg-blue-50";

    if (isComplete) {
        if (scorePercentage >= 80) {
            feedbackTitle = "Légende du Libre 🏆";
            feedbackMessage = "Incroyable ! Vous avez parfaitement compris l'esprit du logiciel libre. Votre école est désormais un modèle d'indépendance et de durabilité.";
            feedbackColor = "text-emerald-600";
            feedbackBg = "bg-emerald-50";
        } else if (scorePercentage >= 50) {
            feedbackTitle = "Résistant Engagé 🛡️";
            feedbackMessage = "Bravo ! Vous avez fait de bons choix, mais il reste quelques habitudes Big Tech à changer pour être totalement libre.";
            feedbackColor = "text-[#00997d]";
            feedbackBg = "bg-[#00997d]/10";
        } else {
            feedbackTitle = "Apprenti Rebelle ✊";
            feedbackMessage = "C'est un début ! Vous commencez à voir les pièges de la Big Tech. Réessayez pour améliorer votre score et sauver l'école !";
            feedbackColor = "text-orange-600";
            feedbackBg = "bg-orange-50";
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-12 p-8 rounded-3xl border-2 ${isComplete ? 'border-[#00997d] shadow-xl' : 'border-gray-100'} bg-white overflow-hidden relative`}
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00997d]/5 to-transparent rounded-bl-full -z-10" />

            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Left Column: Score & Mascot */}
                <div className="flex-1 space-y-6 w-full">
                    <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${feedbackBg}`}>
                            {isComplete ? <Trophy className={`w-8 h-8 ${feedbackColor}`} /> : <Bot className="w-8 h-8 text-[#00997d]" />}
                        </div>
                        <div>
                            <h3 className={`text-2xl font-bold ${feedbackColor}`}>
                                {feedbackTitle}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {completedCount} / {totalCount} scénarios complétés
                            </p>
                        </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {feedbackMessage}
                    </p>

                    {isComplete && (
                        <Button
                            onClick={onReset}
                            variant="outline"
                            className="w-full md:w-auto gap-2 border-2 hover:bg-gray-50"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Recommencer l'aventure
                        </Button>
                    )}
                </div>

                {/* Right Column: Stats Grid */}
                <div className="flex-1 w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Money Stat */}
                        <div className="p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
                            <div className="flex items-center gap-2 mb-2 text-yellow-700">
                                <div className="p-1.5 bg-yellow-100 rounded-lg">
                                    <Bot className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-sm">Économies</span>
                            </div>
                            <div className="text-2xl font-bold text-yellow-800">
                                <CountUp to={totalPoints.money} />€
                            </div>
                            <p className="text-xs text-yellow-600 mt-1">Budget sauvé</p>
                        </div>

                        {/* Protection Stat */}
                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                            <div className="flex items-center gap-2 mb-2 text-blue-700">
                                <div className="p-1.5 bg-blue-100 rounded-lg">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-sm">Sécurité</span>
                            </div>
                            <div className="text-2xl font-bold text-blue-800">
                                <CountUp to={totalPoints.protection} />pts
                            </div>
                            <p className="text-xs text-blue-600 mt-1">Données protégées</p>
                        </div>

                        {/* Environment Stat */}
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <div className="flex items-center gap-2 mb-2 text-emerald-700">
                                <div className="p-1.5 bg-emerald-100 rounded-lg">
                                    <Sprout className="w-4 h-4" />
                                </div>
                                <span className="font-bold text-sm">Écologie</span>
                            </div>
                            <div className="text-2xl font-bold text-emerald-800">
                                <CountUp to={totalPoints.environment} />pts
                            </div>
                            <p className="text-xs text-emerald-600 mt-1">CO2 évité</p>
                        </div>
                    </div>

                    {/* Negative Score Warning */}
                    {(totalPoints.money < 0 || totalPoints.protection < 0 || totalPoints.environment < 0) && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <p className="text-xs text-red-700">
                                Attention ! Certaines de vos décisions ont eu un impact négatif.
                                La technologie Big Tech a un coût caché pour votre liberté et votre portefeuille.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
