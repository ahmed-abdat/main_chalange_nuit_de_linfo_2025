import {
  Gamepad2, Box, Bot, Search, Chrome, Music2, Headphones,
  Skull, Palette, MessageSquareWarning, MessageCircleHeart,
  Wrench, CloudUpload, FileLock2, MapPinOff, Map, Film,
  Clapperboard, KeyRound, Languages, Globe, Trash2, Usb,
  Eye, EyeOff, MailWarning, MailCheck, Clock, Users,
  FileX, FileCheck, Copyright, Image, Zap, PenTool,
  ShieldCheck, Lock, Unlock, Sprout, DollarSign, ServerCrash,
  Smartphone, Laptop, Wifi, HelpCircle, Info, GitBranch
} from 'lucide-react';

export type ScenarioId = number;

export interface ScenarioPoints {
  money: number;
  protection: number;
  environment: number;
}

export type ChoiceType = 'A' | 'B';

export interface ScenarioChoice {
  title: string;
  description: string;
  icon: string; // Lucide icon name OR Simple Icon name (prefixed with Si)
  points?: ScenarioPoints; // Only for choice B (NIRD)
  realityCheck?: string; // Persuasive text for wrong choice (Choice A)
}

export interface EducationalInfo {
  title: string;
  explanation: string;
  benefits: string[];
  tools?: {
    name: string;
    description: string;
    link?: string;
  }[];
  nirdPillar?: 'inclusive' | 'responsible' | 'sustainable';
  fact: string;
}

export interface StudentScenario {
  id: ScenarioId;
  context: string; // Problem/context description
  choiceA: ScenarioChoice; // Big Tech / Easy / Costly
  choiceB: ScenarioChoice; // NIRD / Resistance / Sustainable
  educationalInfo: EducationalInfo;
}

export const studentScenarios: StudentScenario[] = [
  {
    id: 1,
    context: "🚨 Windows 10 va mourir ! Ton école doit changer 50 ordinateurs car ils ne sont pas compatibles Windows 11.",
    choiceA: {
      title: "Tout Racheter",
      description: "Jeter les 50 PC (qui marchent encore !) et payer 25 000€ pour des neufs.",
      icon: "SiWindows",
      realityCheck: "Aïe ! Tu viens de jeter 50 ordinateurs fonctionnels à la poubelle. C'est 12 tonnes de CO2 et 25 000€ de budget gaspillé. L'école ne pourra pas acheter de livres cette année..."
    },
    choiceB: {
      title: "Passer à Linux",
      description: "Installer Linux Mint gratuitement. Les vieux PC deviennent ultra-rapides !",
      icon: "SiLinux",
      points: { money: 100, protection: 100, environment: 100 }
    },
    educationalInfo: {
      title: "C'est quoi l'Obsolescence Programmée ?",
      explanation: "C'est quand on te force à jeter un appareil qui marche encore, juste parce que le logiciel change. C'est mauvais pour la planète et le porte-monnaie.",
      benefits: [
        "0€ dépensé en matériel inutile",
        "Moins de déchets toxiques dans la nature",
        "Des PC plus rapides qu'avant"
      ],
      tools: [
        { name: "Linux Mint", description: "Le système libre le plus facile pour débuter.", link: "https://linuxmint.com/" }
      ],
      nirdPillar: "sustainable",
      fact: "Fabriquer un ordinateur consomme 1500 litres d'eau et 240 kg de combustibles fossiles."
    }
  },
  {
    id: 2,
    context: "💸 L'abonnement Office coûte trop cher ! L'école n'a plus d'argent pour le voyage de fin d'année.",
    choiceA: {
      title: "Payer Microsoft",
      description: "Payer l'abonnement mensuel et annuler le voyage scolaire.",
      icon: "SiMicrosoftoffice",
      realityCheck: "Dommage... L'argent de l'école part en Californie au lieu de financer votre voyage. En plus, quand tu arrêtes de payer, tu perds l'accès à tes propres documents !"
    },
    choiceB: {
      title: "LibreOffice",
      description: "Utiliser LibreOffice. C'est gratuit, ça fait pareil, et on part en voyage !",
      icon: "SiLibreoffice",
      points: { money: 80, protection: 20, environment: 0 }
    },
    educationalInfo: {
      title: "Pourquoi payer pour écrire ?",
      explanation: "Les logiciels libres comme LibreOffice appartiennent à tout le monde. Personne ne peut te demander de payer pour y accéder.",
      benefits: [
        "Gratuit pour toujours",
        "Ouvre tous les fichiers (Word, Excel...)",
        "L'argent économisé sert à des projets cool"
      ],
      tools: [
        { name: "LibreOffice", description: "L'alternative complète à Office.", link: "https://www.libreoffice.org/" }
      ],
      nirdPillar: "responsible",
      fact: "La Gendarmerie Nationale utilise des logiciels libres et économise des millions d'euros d'impôts."
    }
  },
  {
    id: 3,
    context: "🐌 Les PC du CDI sont trop lents ! On met 10 minutes à les allumer.",
    choiceA: {
      title: "À la poubelle !",
      description: "Ils sont vieux, ils ne servent à rien. On les jette.",
      icon: "Trash2",
      realityCheck: "Stop ! Ces ordinateurs sont juste un peu encrassés. Les jeter, c'est créer des déchets très polluants (métaux lourds) qui finissent souvent dans des décharges illégales en Afrique."
    },
    choiceB: {
      title: "Opération Boost",
      description: "On change juste une petite pièce (le disque dur) pour 30€. Ils repartent comme neufs !",
      icon: "Wrench",
      points: { money: 60, protection: 0, environment: 90 }
    },
    educationalInfo: {
      title: "Réparer c'est Gagner",
      explanation: "Souvent, un seul composant ralentit tout l'ordinateur. Le changer est facile, pas cher et super écolo.",
      benefits: [
        "Apprends comment marche un ordi",
        "Évite de créer des déchets électroniques",
        "Fais de grosses économies"
      ],
      tools: [
        { name: "iFixit", description: "Le site qui t'apprend à tout réparer.", link: "https://www.ifixit.com/" }
      ],
      nirdPillar: "sustainable",
      fact: "80% de la pollution d'un ordinateur vient de sa fabrication, pas de son utilisation."
    }
  },
  {
    id: 4,
    context: "🕵️ Google sait tout de toi ! Tes recherches sont enregistrées pour te cibler avec des pubs.",
    choiceA: {
      title: "Tant pis",
      description: "Je n'ai rien à cacher, laissez-moi voir mes pubs.",
      icon: "SiGoogle",
      realityCheck: "Tu n'as rien à cacher ? Imagine que quelqu'un note tout ce que tu dis, où tu vas, et ce que tu aimes, pour le vendre à des inconnus. C'est exactement ce que fait Google. Ta vie privée est un droit !"
    },
    choiceB: {
      title: "Mode Secret",
      description: "Utiliser Qwant ou DuckDuckGo. Ils ne t'espionnent pas et respectent ta vie privée.",
      icon: "SiDuckduckgo",
      points: { money: 0, protection: 90, environment: 0 }
    },
    educationalInfo: {
      title: "Ta vie privée n'est pas à vendre",
      explanation: "Quand c'est gratuit, c'est toi le produit ! Les moteurs éthiques ne vendent pas tes données aux publicitaires.",
      benefits: [
        "Personne ne sait ce que tu cherches",
        "Pas de bulles de filtres (tu vois le vrai web)",
        "Protège ton identité numérique"
      ],
      tools: [
        { name: "Qwant", description: "Le moteur de recherche français qui respecte ta vie privée.", link: "https://www.qwant.com/" }
      ],
      nirdPillar: "responsible",
      fact: "Les géants du web créent un 'profil' de toi pour prédire ce que tu vas acheter ou penser."
    }
  },
  {
    id: 5,
    context: "🎮 Fortnite lague trop ! Ton PC n'est pas assez puissant pour les gros jeux modernes.",
    choiceA: {
      title: "PC Gamer à 2000€",
      description: "Harceler tes parents pour acheter une bête de course qui consomme plein d'électricité.",
      icon: "SiFortnite",
      realityCheck: "2000€ pour jouer ? C'est le prix d'une voiture d'occasion ! En plus, ces PC consomment autant qu'un four électrique. Il y a d'autres façons de s'amuser sans se ruiner."
    },
    choiceB: {
      title: "Minetest & Rétro",
      description: "Jouer à Minetest (comme Minecraft mais libre) ou à des jeux rétro. C'est fun et léger !",
      icon: "Box",
      points: { money: 80, protection: 0, environment: 50 }
    },
    educationalInfo: {
      title: "Le Jeu Libre et Créatif",
      explanation: "On n'a pas besoin de graphismes 4K pour s'amuser. Les jeux libres sont souvent créés par des passionnés, pour le fun, pas pour l'argent.",
      benefits: [
        "Tourne sur n'importe quel ordi",
        "Tu peux modifier le jeu toi-même (mods)",
        "Développe ta créativité"
      ],
      tools: [
        { name: "Minetest", description: "Un monde infini de blocs à construire et programmer.", link: "https://www.minetest.net/" }
      ],
      nirdPillar: "inclusive",
      fact: "Le jeu Minecraft original a été inspiré par des jeux libres développés par la communauté."
    }
  },
  {
    id: 6,
    context: "🧟 Zombie TikTok ! Tu passes 4h par jour à scroller sans t'en rendre compte.",
    choiceA: {
      title: "Encore 5 minutes...",
      description: "Continuer à scroller jusqu'à ce que ton cerveau fonde.",
      icon: "SiTiktok",
      realityCheck: "4 heures par jour, c'est 2 mois par an perdus à regarder des vidéos de 15 secondes ! C'est du temps que tu ne passeras jamais avec tes amis, à faire du sport ou à créer quelque chose."
    },
    choiceB: {
      title: "Reprendre le Contrôle",
      description: "Installer une appli qui bloque les réseaux sociaux après 30 min. Liberté !",
      icon: "Smartphone",
      points: { money: 0, protection: 70, environment: 20 }
    },
    educationalInfo: {
      title: "L'Économie de l'Attention",
      explanation: "Les applis sont conçues par des psychologues pour te rendre accro. Reprendre le contrôle, c'est un acte de résistance !",
      benefits: [
        "Meilleur sommeil et concentration",
        "Plus de temps pour les vrais amis",
        "Tu décides, pas l'algorithme"
      ],
      tools: [
        { name: "Forest", description: "Une appli jeu pour t'aider à déconnecter.", link: "https://www.forestapp.cc/" }
      ],
      nirdPillar: "responsible",
      fact: "Les patrons de la Silicon Valley interdisent souvent les écrans à leurs propres enfants car ils savent que c'est addictif."
    }
  }
];

export const getScenario = (id: ScenarioId): StudentScenario | undefined => {
  return studentScenarios.find(s => s.id === id);
};
