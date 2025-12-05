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
  icon: string; // Lucide icon name
  points?: ScenarioPoints; // Only for choice B (NIRD)
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
    context: "🚨 ALERTE GÉNÉRALE ! L'Empire Micro-Softus annonce la fin du support de Windows 10. Vos PC scolaires vont devenir des passoires de sécurité !",
    choiceA: {
      title: "Se Soumettre",
      description: "Acheter 50 nouveaux PC compatibles Windows 11. Coût : 25,000€ + 50 PC à la poubelle.",
      icon: "ServerCrash"
    },
    choiceB: {
      title: "Résister (NIRD)",
      description: "Installer Linux (Mint/Ubuntu) sur les machines actuelles. Coût : 0€. Durée de vie : +5 ans.",
      icon: "ShieldCheck",
      points: { money: 100, protection: 100, environment: 100 }
    },
    educationalInfo: {
      title: "Obsolescence Programmée vs Logiciel Libre",
      explanation: "La fin de support est une tactique pour forcer l'achat de matériel. Linux est léger et sécurisé, prolongeant la vie des vieux PC.",
      benefits: [
        "Économie massive (pas de nouvelles licences/matériel)",
        "Réduction drastique des déchets électroniques (DEEE)",
        "Performance accrue sur le même matériel"
      ],
      tools: [
        { name: "Linux Mint", description: "Interface proche de Windows, idéal pour débuter.", link: "https://linuxmint.com/" },
        { name: "Zorin OS", description: "Conçu spécifiquement pour la transition Windows.", link: "https://zorin.com/" }
      ],
      nirdPillar: "sustainable",
      fact: "Chaque année, 50 millions de tonnes de déchets électroniques sont produits. Prolonger la vie d'un PC est l'acte écolo n°1."
    }
  },
  {
    id: 2,
    context: "💰 Rançon Mensuelle ! L'abonnement Office 365 de l'école expire. L'Empire demande une augmentation de 20% pour renouveler les licences Word/Excel.",
    choiceA: {
      title: "Payer la Rançon",
      description: "Signer le chèque et bloquer le budget sorties scolaires pour payer les licences.",
      icon: "DollarSign"
    },
    choiceB: {
      title: "Libérer la Bureautique",
      description: "Passer à LibreOffice ou OnlyOffice. Gratuit, ouvert et formats standards.",
      icon: "FileCheck",
      points: { money: 80, protection: 20, environment: 0 }
    },
    educationalInfo: {
      title: "Formats Ouverts vs Propriétaires",
      explanation: "Les formats propriétaires (.docx) vous enferment. Les formats ouverts (.odt) garantissent que vos documents vous appartiennent pour toujours.",
      benefits: [
        "Indépendance technologique totale",
        "Interopérabilité entre tous les systèmes",
        "0€ de frais de licence à vie"
      ],
      tools: [
        { name: "LibreOffice", description: "La suite bureautique de référence.", link: "https://www.libreoffice.org/" },
        { name: "OnlyOffice", description: "Compatibilité maximale avec les formats MS.", link: "https://www.onlyoffice.com/" }
      ],
      nirdPillar: "responsible",
      fact: "L'administration française et la gendarmerie utilisent des logiciels libres, économisant des millions d'euros publics."
    }
  },
  {
    id: 3,
    context: "🐢 Lenteur Extrême ! Les PC du CDI rament au démarrage. Le technicien Big Tech suggère de tout jeter.",
    choiceA: {
      title: "Tout Jeter",
      description: "Mettre les PC à la benne et en commander des neufs.",
      icon: "Trash2"
    },
    choiceB: {
      title: "Opération Chirurgicale",
      description: "Ajouter de la RAM et un SSD (30€/PC) + un OS léger. Les PC volent !",
      icon: "Wrench",
      points: { money: 60, protection: 0, environment: 90 }
    },
    educationalInfo: {
      title: "Réparabilité et Mise à Niveau",
      explanation: "Souvent, seul un composant (disque dur) ralentit tout. Le remplacer coûte 10x moins cher que changer le PC.",
      benefits: [
        "Apprentissage technique pour les élèves (atelier réparation)",
        "Réduction de l'empreinte carbone de 80%",
        "Satisfaction de 'hacker' le système"
      ],
      tools: [
        { name: "iFixit", description: "Guides de réparation gratuits pour tout.", link: "https://www.ifixit.com/" },
        { name: "Crucial Scanner", description: "Pour savoir quelle RAM/SSD acheter.", link: "https://www.crucial.com/" }
      ],
      nirdPillar: "sustainable",
      fact: "La fabrication d'un ordinateur représente 80% de son impact environnemental total sur sa durée de vie."
    }
  },
  {
    id: 4,
    context: "☁️ Le Nuage Espion ! L'école stocke les notes des élèves sur un Cloud américain. On découvre que les données servent à entraîner une IA publicitaire.",
    choiceA: {
      title: "Ignorer",
      description: "C'est pratique, tant pis pour la vie privée des élèves.",
      icon: "Eye"
    },
    choiceB: {
      title: "Souveraineté des Données",
      description: "Migrer vers un Cloud souverain ou auto-hébergé (Nextcloud) sur un serveur local.",
      icon: "ServerCrash", // Using ServerCrash as 'Server' icon metaphor or Database
      points: { money: 0, protection: 100, environment: 10 }
    },
    educationalInfo: {
      title: "Souveraineté Numérique et RGPD",
      explanation: "Vos données ne doivent pas être le produit. L'auto-hébergement ou les hébergeurs éthiques garantissent la confidentialité.",
      benefits: [
        "Respect total du RGPD et de la vie privée",
        "Contrôle absolu sur qui accède à quoi",
        "Pas de profilage publicitaire des mineurs"
      ],
      tools: [
        { name: "Nextcloud", description: "Alternative libre à Google Drive/Dropbox.", link: "https://nextcloud.com/" },
        { name: "CHATONS", description: "Collectif d'Hébergeurs Alternatifs.", link: "https://chatons.org/" }
      ],
      nirdPillar: "responsible",
      fact: "Le 'Cloud' n'existe pas, c'est juste l'ordinateur de quelqu'un d'autre (souvent aux USA)."
    }
  },
  {
    id: 5,
    context: "🎨 Créativité Bridée ! Le prof d'art veut Photoshop, mais la licence coûte un bras. Il hésite à pirater.",
    choiceA: {
      title: "Pirater",
      description: "Installer une version crackée pleine de virus. Risqué et illégal.",
      icon: "Skull"
    },
    choiceB: {
      title: "Art Libre",
      description: "Utiliser Krita pour le dessin et GIMP pour la retouche. Puissants et gratuits.",
      icon: "Palette",
      points: { money: 50, protection: 80, environment: 0 }
    },
    educationalInfo: {
      title: "Création Numérique Libre",
      explanation: "Les outils libres de création rivalisent avec les pros. Blender (3D) est utilisé par Hollywood !",
      benefits: [
        "Légalité totale, installable sur tous les PC élèves",
        "Formats standards et pérennes",
        "Communautés d'entraide immenses"
      ],
      tools: [
        { name: "Krita", description: "Peinture numérique professionnelle.", link: "https://krita.org/" },
        { name: "GIMP", description: "Retouche photo avancée.", link: "https://www.gimp.org/" },
        { name: "Blender", description: "3D, Animation, Montage vidéo.", link: "https://www.blender.org/" }
      ],
      nirdPillar: "inclusive",
      fact: "Blender est totalement gratuit et open-source, pourtant il est utilisé pour des effets spéciaux dans des films à gros budget."
    }
  },
  {
    id: 6,
    context: "📱 Addiction aux Écrans ! Les élèves sont zombies sur TikTok à la récré. L'attention en classe chute.",
    choiceA: {
      title: "Confisquer",
      description: "Interdire les téléphones par la force. Crée des conflits et de la frustration.",
      icon: "Lock"
    },
    choiceB: {
      title: "Éduquer (Hygiène Numérique)",
      description: "Ateliers sur l'économie de l'attention et installation d'applis éthiques/déconnectées.",
      icon: "Smartphone",
      points: { money: 0, protection: 70, environment: 20 }
    },
    educationalInfo: {
      title: "Économie de l'Attention",
      explanation: "Les applis Big Tech sont conçues pour être addictives (Dark Patterns). Comprendre ces mécanismes est la première défense.",
      benefits: [
        "Meilleure concentration et sommeil",
        "Utilisation consciente et non compulsive",
        "Compréhension des algorithmes de recommandation"
      ],
      tools: [
        { name: "Forest", description: "Gamifier la déconnexion.", link: "https://www.forestapp.cc/" },
        { name: "NewPipe", description: "Client YouTube léger et sans pubs/tracking.", link: "https://newpipe.net/" }
      ],
      nirdPillar: "responsible",
      fact: "Les patrons de la Silicon Valley interdisent souvent les écrans à leurs propres enfants."
    }
  },
  {
    id: 7,
    context: "🔍 Moteur de Recherche ! Par défaut, tous les PC utilisent Google/Bing. Le profilage des élèves commence tôt.",
    choiceA: {
      title: "Laisser Faire",
      description: "C'est ce que tout le monde utilise, c'est plus simple.",
      icon: "Search"
    },
    choiceB: {
      title: "Chercher Autrement",
      description: "Installer Qwant ou DuckDuckGo par défaut. Pas de tracking, résultats neutres.",
      icon: "EyeOff",
      points: { money: 0, protection: 90, environment: 0 }
    },
    educationalInfo: {
      title: "Neutralité du Net et Bulles de Filtres",
      explanation: "Google personnalise les résultats, créant une 'bulle' qui renforce nos opinions. Les moteurs éthiques montrent le même web à tous.",
      benefits: [
        "Protection de la vie privée (pas d'historique revendu)",
        "Résultats non biaisés par le profilage",
        "Soutien à des acteurs européens (Qwant)"
      ],
      tools: [
        { name: "Qwant", description: "Moteur de recherche français respectueux.", link: "https://www.qwant.com/" },
        { name: "DuckDuckGo", description: "La référence mondiale de la recherche privée.", link: "https://duckduckgo.com/" }
      ],
      nirdPillar: "responsible",
      fact: "Si c'est gratuit, c'est vous le produit. Vos requêtes de recherche en disent long sur vous."
    }
  },
  {
    id: 8,
    context: "🎮 Club Jeu Vidéo ! Les élèves veulent jouer à Fortnite, mais les PC de l'école ne suivent pas.",
    choiceA: {
      title: "Acheter des PC Gamers",
      description: "Dépenser 1500€ par PC pour faire tourner des jeux propriétaires lourds.",
      icon: "Gamepad2"
    },
    choiceB: {
      title: "Rétro & Indie Gaming",
      description: "Installer Minetest (clone libre de Minecraft) et des émulateurs rétro. Créatif et léger.",
      icon: "Box",
      points: { money: 80, protection: 0, environment: 50 }
    },
    educationalInfo: {
      title: "Culture du Jeu Libre",
      explanation: "Le jeu vidéo n'est pas que consommation. Minetest permet d'apprendre la logique, le code (Lua) et la collaboration.",
      benefits: [
        "Développement de la créativité et de la logique",
        "Fonctionne sur n'importe quel vieux PC",
        "Moddable et personnalisable à l'infini"
      ],
      tools: [
        { name: "Minetest", description: "Moteur de jeu voxel open-source.", link: "https://www.minetest.net/" },
        { name: "SuperTuxKart", description: "Jeu de course fun et libre.", link: "https://supertuxkart.net/" }
      ],
      nirdPillar: "inclusive",
      fact: "Minecraft a été inspiré par des jeux libres comme Infiniminer."
    }
  },
  {
    id: 9,
    context: "📧 Inondation de Spam ! La boîte mail de l'école est inutilisable, pleine de pubs et de phishing.",
    choiceA: {
      title: "Gmail Pro",
      description: "Payer Google pour filtrer nos mails (et les lire au passage).",
      icon: "MailWarning"
    },
    choiceB: {
      title: "Mail Éthique",
      description: "Utiliser un fournisseur de mail respectueux (Proton, Tutanota) ou académique sécurisé.",
      icon: "MailCheck",
      points: { money: 20, protection: 100, environment: 0 }
    },
    educationalInfo: {
      title: "Confidentialité des Correspondances",
      explanation: "Le mail est comme une carte postale, lisible par les facteurs (serveurs). Le chiffrement le met sous enveloppe.",
      benefits: [
        "Chiffrement de bout en bout",
        "Pas de scan des mails pour la pub",
        "Serveurs situés dans des juridictions protectrices"
      ],
      tools: [
        { name: "Proton Mail", description: "Mail chiffré basé en Suisse.", link: "https://proton.me/mail" },
        { name: "Thunderbird", description: "Client mail local pour gérer ses comptes.", link: "https://www.thunderbird.net/" }
      ],
      nirdPillar: "responsible",
      fact: "Le premier email a été envoyé en 1971. Le protocole n'a pas été conçu pour la sécurité moderne."
    }
  },
  {
    id: 10,
    context: "🌐 Site Web de l'École ! Il faut refaire le site. Une agence propose un Wix/Wordpress propriétaire cher.",
    choiceA: {
      title: "Solution Clé en Main",
      description: "Payer cher pour un site qu'on ne maîtrise pas et difficile à migrer.",
      icon: "Globe"
    },
    choiceB: {
      title: "Coder le Futur",
      description: "Club Coding : Les élèves créent le site statique (HTML/CSS) hébergé sur GitHub/GitLab Pages.",
      icon: "GitBranch",
      points: { money: 100, protection: 50, environment: 80 }
    },
    educationalInfo: {
      title: "Littératie Numérique",
      explanation: "Savoir coder, c'est savoir lire et écrire dans le monde numérique. Un site statique est aussi 100x plus écolo.",
      benefits: [
        "Compétences réelles pour les élèves",
        "Site ultra-rapide et éco-conçu (Low-tech)",
        "Hébergement gratuit et durable"
      ],
      tools: [
        { name: "VS Code / VSCodium", description: "Éditeur de code standard.", link: "https://vscodium.com/" },
        { name: "Hugo / Jekyll", description: "Générateurs de sites statiques.", link: "https://gohugo.io/" }
      ],
      nirdPillar: "inclusive",
      fact: "Un site web statique consomme beaucoup moins d'énergie serveur qu'un site dynamique avec base de données."
    }
  }
];

export const getScenario = (id: ScenarioId): StudentScenario | undefined => {
  return studentScenarios.find(s => s.id === id);
};
