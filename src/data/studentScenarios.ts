/**
 * Student Scenarios Data
 * 20 interactive scenarios where students make choices between Big Tech and NIRD
 * Each scenario provides educational value and points tracking
 */

export type ScenarioId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export type ChoiceType = 'A' | 'B';

export interface ScenarioPoints {
  money: number; // 💰 Economies potentielles
  protection: number; // 🛡️ Sécurité/Privacité
  environment: number; // 🌱 Impact écologique
}

export interface ScenarioChoice {
  id: ChoiceType;
  title: string;
  description: string;
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
  choiceA: ScenarioChoice; // Big Tech / Surrender
  choiceB: ScenarioChoice; // NIRD / Resistance
  educationalInfo: EducationalInfo; // Shown after choosing B
}

export const studentScenarios: StudentScenario[] = [
  {
    id: 1,
    context: 'الألعاب: صديقك يدعوك للعبة تتطلب "Loot Boxes".',
    choiceA: {
      id: 'A',
      title: 'الدفع والشراء (إدمان القمار)',
      description: 'Dépenser de l\'argent pour des loot boxes, risquer l\'addiction au jeu.',
    },
    choiceB: {
      id: 'B',
      title: 'دعوته للعب Minetest (بديل Minecraft الحر)',
      description: 'Inviter à jouer à Minetest, alternative libre à Minecraft.',
      points: { money: 50, protection: 30, environment: 0 },
    },
    educationalInfo: {
      title: 'Minetest : Le Minecraft Libre',
      explanation: 'Minetest est un jeu open-source gratuit qui offre la même expérience créative que Minecraft sans coûts récurrents ni mécanismes d\'addiction.',
      benefits: [
        'Gratuit et open-source',
        'Pas de loot boxes ni micro-transactions',
        'Communauté active de développeurs',
        'Modifiable et personnalisable',
        'Respect de la vie privée',
      ],
      tools: [
        {
          name: 'Minetest',
          description: 'Jeu de construction open-source',
          link: 'https://www.minetest.net/',
        },
      ],
      nirdPillar: 'inclusive',
      fact: 'Minetest permet aux écoles de créer des serveurs éducatifs gratuits pour leurs élèves.',
    },
  },
  {
    id: 2,
    context: 'البحث: المعلم طلب بحثاً مدرسياً.',
    choiceA: {
      id: 'A',
      title: 'استخدام ChatGPT ونسخ النتيجة (غش، استهلاك طاقة)',
      description: 'Utiliser ChatGPT et copier le résultat (tricherie, consommation d\'énergie).',
    },
    choiceB: {
      id: 'B',
      title: 'البحث في Vikidia/Wikipedia والتحقق من المصادر',
      description: 'Rechercher sur Vikidia/Wikipedia et vérifier les sources.',
      points: { money: 0, protection: 40, environment: 10 },
    },
    educationalInfo: {
      title: 'Recherche Libre et Souveraine',
      explanation: 'Vikidia et Wikipedia sont des projets collaboratifs libres qui développent l\'esprit critique plutôt que la dépendance aux IA.',
      benefits: [
        'Développe l\'esprit critique',
        'Sources vérifiables et transparentes',
        'Pas de consommation énergétique massive',
        'Apprentissage réel plutôt que copie',
        'Respect des droits d\'auteur',
      ],
      tools: [
        {
          name: 'Vikidia',
          description: 'Encyclopédie collaborative pour enfants',
          link: 'https://fr.vikidia.org/',
        },
        {
          name: 'Wikipedia',
          description: 'Encyclopédie collaborative universelle',
          link: 'https://fr.wikipedia.org/',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'Les élèves qui vérifient leurs sources développent de meilleures compétences de recherche.',
    },
  },
  {
    id: 3,
    context: 'المتصفح: الإعلانات تملأ الشاشة.',
    choiceA: {
      id: 'A',
      title: 'استخدام Chrome (يجمع بياناتك)',
      description: 'Utiliser Chrome (collecte vos données).',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام Firefox مع uBlock Origin',
      description: 'Utiliser Firefox avec uBlock Origin.',
      points: { money: 0, protection: 50, environment: 10 },
    },
    educationalInfo: {
      title: 'Firefox : Navigateur Libre et Respectueux',
      explanation: 'Firefox protège votre vie privée par défaut et uBlock Origin bloque les publicités et traqueurs sans compromettre l\'expérience web.',
      benefits: [
        'Respect de la vie privée',
        'Bloque les publicités et traqueurs',
        'Plus rapide sans publicités',
        'Open-source et transparent',
        'Contrôle total sur vos données',
      ],
      tools: [
        {
          name: 'Firefox',
          description: 'Navigateur web libre et respectueux',
          link: 'https://www.mozilla.org/fr/firefox/',
        },
        {
          name: 'uBlock Origin',
          description: 'Bloqueur de publicités efficace',
          link: 'https://ublockorigin.com/',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'Firefox est développé par Mozilla, une organisation à but non lucratif qui défend la vie privée.',
    },
  },
  {
    id: 4,
    context: 'الموسيقى: الاستماع للموسيقى أثناء الدراسة.',
    choiceA: {
      id: 'A',
      title: 'Spotify (إعلانات، تتبع)',
      description: 'Spotify (publicités, suivi).',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام Jamendo (موسيقى حرة) أو ملفات MP3 محلية',
      description: 'Utiliser Jamendo (musique libre) ou fichiers MP3 locaux.',
      points: { money: 0, protection: 20, environment: 0 },
    },
    educationalInfo: {
      title: 'Musique Libre : Alternative Respectueuse',
      explanation: 'Jamendo propose de la musique libre sous licence Creative Commons, et les fichiers locaux garantissent un contrôle total.',
      benefits: [
        'Musique gratuite et légale',
        'Pas de publicités',
        'Pas de suivi ou collecte de données',
        'Supporte les artistes indépendants',
        'Fonctionne hors ligne avec fichiers locaux',
      ],
      tools: [
        {
          name: 'Jamendo',
          description: 'Plateforme de musique libre',
          link: 'https://www.jamendo.com/',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'La musique sous licence Creative Commons permet un partage légal et équitable.',
    },
  },
  {
    id: 5,
    context: 'تحرير الصور: تصميم ملصق للمدرسة.',
    choiceA: {
      id: 'A',
      title: 'Photoshop مقرصن (خطر، غير قانوني)',
      description: 'Photoshop piraté (risque, illégal).',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام GIMP أو Krita',
      description: 'Utiliser GIMP ou Krita.',
      points: { money: 0, protection: 40, environment: 0 },
    },
    educationalInfo: {
      title: 'GIMP et Krita : Alternatives Libres Puissantes',
      explanation: 'GIMP et Krita sont des logiciels libres gratuits qui offrent des fonctionnalités professionnelles pour l\'édition d\'images.',
      benefits: [
        '100% gratuit et légal',
        'Fonctionnalités professionnelles',
        'Pas de risques de virus ou malware',
        'Communauté active et tutoriels',
        'Compatible avec tous les formats',
      ],
      tools: [
        {
          name: 'GIMP',
          description: 'Éditeur d\'images professionnel',
          link: 'https://www.gimp.org/',
        },
        {
          name: 'Krita',
          description: 'Logiciel de peinture numérique',
          link: 'https://krita.org/fr/',
        },
      ],
      nirdPillar: 'inclusive',
      fact: 'GIMP est utilisé par de nombreux professionnels et écoles dans le monde entier.',
    },
  },
  {
    id: 6,
    context: 'التواصل: دردشة الفريق المدرسي.',
    choiceA: {
      id: 'A',
      title: 'Discord (يبيع البيانات، مغلق)',
      description: 'Discord (vend vos données, fermé).',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام Signal أو دردشة Apps.education',
      description: 'Utiliser Signal ou la messagerie Apps.education.',
      points: { money: 0, protection: 60, environment: 0 },
    },
    educationalInfo: {
      title: 'Communication Souveraine pour l\'Éducation',
      explanation: 'Signal utilise un chiffrement de bout en bout et Apps.education garantit que les données restent en France, conformes au RGPD.',
      benefits: [
        'Chiffrement de bout en bout',
        'Données stockées en France (Apps.education)',
        'Respect strict du RGPD',
        'Pas de publicités ni profilage',
        'Open-source et auditable',
      ],
      tools: [
        {
          name: 'Signal',
          description: 'Messagerie sécurisée et privée',
          link: 'https://signal.org/fr/',
        },
        {
          name: 'Apps.education',
          description: 'Services numériques pour l\'éducation française',
          link: 'https://www.apps.education.fr/',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'Apps.education est hébergé en France et respecte strictement la souveraineté numérique.',
    },
  },
  {
    id: 7,
    context: 'الهاتف: الهاتف سقط وانكسرت الشاشة.',
    choiceA: {
      id: 'A',
      title: 'طلب هاتف جديد من الأهل',
      description: 'Demander un nouveau téléphone aux parents.',
    },
    choiceB: {
      id: 'B',
      title: 'محاولة إصلاحه في "نادي الإصلاح" بالمدرسة',
      description: 'Essayer de le réparer au "club de réparation" de l\'école.',
      points: { money: 200, protection: 0, environment: 80 },
    },
    educationalInfo: {
      title: 'Réparation : Compétence et Durabilité',
      explanation: 'Apprendre à réparer développe des compétences pratiques, économise de l\'argent et réduit les déchets électroniques.',
      benefits: [
        'Économie significative',
        'Réduction des déchets électroniques',
        'Développement de compétences pratiques',
        'Autonomie et confiance en soi',
        'Compréhension de la technologie',
      ],
      nirdPillar: 'sustainable',
      fact: 'Un téléphone réparé évite la production d\'un nouvel appareil, économisant environ 60kg de CO2.',
    },
  },
  {
    id: 8,
    context: 'التخزين: نقل الملفات بين الأصدقاء.',
    choiceA: {
      id: 'A',
      title: 'WeTransfer (مؤقت، طرف ثالث)',
      description: 'WeTransfer (temporaire, tiers).',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام Lufi (مشاركة ملفات مشفرة ومجهولة)',
      description: 'Utiliser Lufi (partage de fichiers chiffré et anonyme).',
      points: { money: 0, protection: 30, environment: 0 },
    },
    educationalInfo: {
      title: 'Partage de Fichiers Souverain',
      explanation: 'Lufi est un logiciel libre qui permet de partager des fichiers de manière sécurisée et anonyme, auto-hébergeable.',
      benefits: [
        'Chiffrement automatique',
        'Partage anonyme possible',
        'Auto-hébergeable (souveraineté)',
        'Pas de limites de taille arbitraires',
        'Open-source et transparent',
      ],
      tools: [
        {
          name: 'Lufi',
          description: 'Plateforme de partage de fichiers sécurisée',
          link: 'https://framagit.org/fiat-tux/hat-softwares/lufi',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'Lufi peut être auto-hébergé par les écoles pour un contrôle total des données.',
    },
  },
  {
    id: 9,
    context: 'الخرائط: الذهاب لرحلة مدرسية.',
    choiceA: {
      id: 'A',
      title: 'Google Maps (تتبع الموقع)',
      description: 'Google Maps (suivi de localisation).',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام OpenStreetMap (OSM)',
      description: 'Utiliser OpenStreetMap (OSM).',
      points: { money: 0, protection: 50, environment: 0 },
    },
    educationalInfo: {
      title: 'OpenStreetMap : Cartes Libres et Collaboratives',
      explanation: 'OpenStreetMap est une carte du monde libre créée et maintenue par une communauté de bénévoles, sans suivi ni publicités.',
      benefits: [
        'Pas de suivi de localisation',
        'Données libres et réutilisables',
        'Communauté internationale',
        'Applications mobiles disponibles',
        'Mises à jour fréquentes',
      ],
      tools: [
        {
          name: 'OpenStreetMap',
          description: 'Carte du monde libre et collaborative',
          link: 'https://www.openstreetmap.org/',
        },
        {
          name: 'Organic Maps',
          description: 'Application mobile basée sur OSM',
          link: 'https://organicmaps.app/',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'OpenStreetMap est utilisé par de nombreuses applications de navigation alternatives.',
    },
  },
  {
    id: 10,
    context: 'الفيديو: مشروع مونتاج فيديو.',
    choiceA: {
      id: 'A',
      title: 'تطبيق هاتف يضع علامة مائية',
      description: 'Application mobile qui ajoute un filigrane.',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام Kdenlive أو Shotcut',
      description: 'Utiliser Kdenlive ou Shotcut.',
      points: { money: 0, protection: 30, environment: 10 },
    },
    educationalInfo: {
      title: 'Montage Vidéo Libre et Professionnel',
      explanation: 'Kdenlive et Shotcut sont des logiciels de montage vidéo gratuits et libres avec des fonctionnalités professionnelles.',
      benefits: [
        'Gratuit et sans limites',
        'Pas de filigranes ni restrictions',
        'Fonctionnalités avancées',
        'Formats multiples supportés',
        'Communauté active et tutoriels',
      ],
      tools: [
        {
          name: 'Kdenlive',
          description: 'Éditeur vidéo non-linéaire professionnel',
          link: 'https://kdenlive.org/fr/',
        },
        {
          name: 'Shotcut',
          description: 'Éditeur vidéo multiplateforme',
          link: 'https://shotcut.org/',
        },
      ],
      nirdPillar: 'inclusive',
      fact: 'Kdenlive est utilisé par de nombreux créateurs de contenu et professionnels.',
    },
  },
  {
    id: 11,
    context: 'كلمات المرور: نسيت كلمة المرور للمرة العاشرة.',
    choiceA: {
      id: 'A',
      title: 'استخدام "123456" لكل شيء',
      description: 'Utiliser "123456" pour tout.',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام مدير كلمات مرور Bitwarden أو KeePass',
      description: 'Utiliser un gestionnaire de mots de passe Bitwarden ou KeePass.',
      points: { money: 0, protection: 80, environment: 0 },
    },
    educationalInfo: {
      title: 'Gestionnaires de Mots de Passe : Sécurité Simplifiée',
      explanation: 'Les gestionnaires de mots de passe génèrent et stockent des mots de passe uniques et forts, protégeant tous vos comptes.',
      benefits: [
        'Mots de passe forts et uniques',
        'Un seul mot de passe maître à retenir',
        'Chiffrement de bout en bout',
        'Synchronisation sécurisée',
        'Protection contre les fuites de données',
      ],
      tools: [
        {
          name: 'Bitwarden',
          description: 'Gestionnaire de mots de passe open-source',
          link: 'https://bitwarden.com/',
        },
        {
          name: 'KeePass',
          description: 'Gestionnaire de mots de passe local',
          link: 'https://keepass.info/',
        },
      ],
      nirdPillar: 'responsible',
      fact: '80% des piratages réussis sont dus à des mots de passe faibles ou réutilisés.',
    },
  },
  {
    id: 12,
    context: 'الترجمة: واجب اللغة الإنجليزية.',
    choiceA: {
      id: 'A',
      title: 'Google Translate',
      description: 'Google Translate.',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام LibreTranslate أو أدوات La Digitale',
      description: 'Utiliser LibreTranslate ou les outils de La Digitale.',
      points: { money: 0, protection: 20, environment: 0 },
    },
    educationalInfo: {
      title: 'Traduction Respectueuse de la Vie Privée',
      explanation: 'LibreTranslate est un service de traduction open-source qui peut être auto-hébergé, préservant votre vie privée.',
      benefits: [
        'Pas de collecte de données',
        'Open-source et auditable',
        'Auto-hébergeable',
        'Fonctionne hors ligne (modèle local)',
        'Alternatives éducatives disponibles',
      ],
      tools: [
        {
          name: 'LibreTranslate',
          description: 'Service de traduction open-source',
          link: 'https://libretranslate.com/',
        },
        {
          name: 'La Digitale',
          description: 'Outils numériques libres pour l\'éducation',
          link: 'https://ladigitale.dev/',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'Les outils libres comme LibreTranslate peuvent être hébergés par les écoles pour garantir la souveraineté.',
    },
  },
  {
    id: 13,
    context: 'نظام التشغيل: حاسوبك القديم أصبح بطيئاً جداً.',
    choiceA: {
      id: 'A',
      title: 'رميه في القمامة',
      description: 'Le jeter à la poubelle.',
    },
    choiceB: {
      id: 'B',
      title: 'تجربة Live USB لنظام Linux خفيف',
      description: 'Essayer une clé USB Live d\'un système Linux léger.',
      points: { money: 500, protection: 0, environment: 70 },
    },
    educationalInfo: {
      title: 'Linux : Redonnez Vie à Votre Ordinateur',
      explanation: 'Les distributions Linux légères comme Lubuntu ou Linux NIRD peuvent transformer un vieux PC en machine rapide et moderne.',
      benefits: [
        'Économie de plusieurs centaines d\'euros',
        'Réduction massive des déchets électroniques',
        'Performances améliorées',
        'Système d\'exploitation gratuit',
        'Testable sans installation (Live USB)',
      ],
      tools: [
        {
          name: 'Linux NIRD',
          description: 'Distribution Linux pour l\'éducation',
          link: 'https://nird.forge.apps.education.fr/',
        },
        {
          name: 'Lubuntu',
          description: 'Distribution Linux légère',
          link: 'https://lubuntu.me/',
        },
      ],
      nirdPillar: 'sustainable',
      fact: 'Un PC avec Linux peut avoir une durée de vie de 10 à 15 ans, évitant des tonnes de déchets électroniques.',
    },
  },
  {
    id: 14,
    context: 'وسائل التواصل: "الترند" يجبرك على تثبيت تطبيق صيني.',
    choiceA: {
      id: 'A',
      title: 'التثبيت فوراً (فقدان الخصوصية)',
      description: 'L\'installer immédiatement (perte de vie privée).',
    },
    choiceB: {
      id: 'B',
      title: 'تجاهل الترند والتركيز على المحتوى الهادف',
      description: 'Ignorer la tendance et se concentrer sur du contenu significatif.',
      points: { money: 0, protection: 60, environment: 0 },
    },
    educationalInfo: {
      title: 'Résistance aux Tendances et Protection de la Vie Privée',
      explanation: 'Rester critique face aux tendances protège votre vie privée et votre temps, permettant de se concentrer sur ce qui compte vraiment.',
      benefits: [
        'Protection de la vie privée',
        'Meilleure gestion du temps',
        'Développement de l\'esprit critique',
        'Moins de dépendance aux réseaux',
        'Focus sur l\'apprentissage réel',
      ],
      nirdPillar: 'responsible',
      fact: 'Les applications de tendance collectent souvent beaucoup plus de données que nécessaire.',
    },
  },
  {
    id: 15,
    context: 'القرصنة: موقع يطلب إيميلك لتحميل لعبة.',
    choiceA: {
      id: 'A',
      title: 'إعطاء الإيميل الشخصي (سبام)',
      description: 'Donner son email personnel (spam).',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام بريد مؤقت أو Alias',
      description: 'Utiliser un email temporaire ou un alias.',
      points: { money: 0, protection: 40, environment: 0 },
    },
    educationalInfo: {
      title: 'Protection de l\'Email : Alias et Emails Temporaires',
      explanation: 'Utiliser des alias ou des emails temporaires protège votre boîte mail principale du spam et de la vente de données.',
      benefits: [
        'Protection contre le spam',
        'Prévention de la vente de données',
        'Facile à désactiver si nécessaire',
        'Organisation améliorée',
        'Séparation des usages',
      ],
      tools: [
        {
          name: 'AnonAddy',
          description: 'Service d\'alias d\'email open-source',
          link: 'https://anonaddy.com/',
        },
        {
          name: 'SimpleLogin',
          description: 'Service d\'alias d\'email',
          link: 'https://simplelogin.io/',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'Les alias d\'email permettent de bloquer instantanément le spam en désactivant l\'alias.',
    },
  },
  {
    id: 16,
    context: 'التطوع: المدرسة تطلب متطوعين تقنيين.',
    choiceA: {
      id: 'A',
      title: '"ليس لدي وقت"',
      description: '"Je n\'ai pas le temps".',
    },
    choiceB: {
      id: 'B',
      title: 'الانضمام لـ "نادي البرمجيات الحرة" المدرسي',
      description: 'Rejoindre le "club de logiciels libres" de l\'école.',
      points: { money: 0, protection: 50, environment: 0 },
    },
    educationalInfo: {
      title: 'Communauté et Contribution : Le Pouvoir du Collectif',
      explanation: 'Rejoindre une communauté de logiciels libres développe des compétences, crée des liens et contribue au bien commun numérique.',
      benefits: [
        'Développement de compétences',
        'Appartenance à une communauté',
        'Contribution au bien commun',
        'Apprentissage par la pratique',
        'Expérience valorisable',
      ],
      nirdPillar: 'inclusive',
      fact: 'Les communautés open-source enseignent la collaboration et le partage de connaissances.',
    },
  },
  {
    id: 17,
    context: 'الملفات: إرسال واجب بصيغة .pages (أبل فقط).',
    choiceA: {
      id: 'A',
      title: 'إجبار المعلم على فتحها (مشكلة توافق)',
      description: 'Forcer le professeur à l\'ouvrir (problème de compatibilité).',
    },
    choiceB: {
      id: 'B',
      title: 'التصدير بصيغة PDF أو ODT (معيار مفتوح)',
      description: 'Exporter en PDF ou ODT (format ouvert).',
      points: { money: 0, protection: 20, environment: 0 },
    },
    educationalInfo: {
      title: 'Formats Ouverts : Interopérabilité et Durabilité',
      explanation: 'Les formats ouverts comme PDF et ODT garantissent que vos documents peuvent être lus par tous, aujourd\'hui et demain.',
      benefits: [
        'Accessible à tous',
        'Pas de dépendance à un logiciel',
        'Durabilité à long terme',
        'Standard ouvert et vérifiable',
        'Inclusion de tous les utilisateurs',
      ],
      tools: [
        {
          name: 'LibreOffice',
          description: 'Suite bureautique libre avec support ODT',
          link: 'https://fr.libreoffice.org/',
        },
      ],
      nirdPillar: 'inclusive',
      fact: 'Les formats ouverts garantissent l\'accès aux documents même dans 20 ans, contrairement aux formats propriétaires.',
    },
  },
  {
    id: 18,
    context: 'البحث العلمي: تحتاج صوراً للعرض التقديمي.',
    choiceA: {
      id: 'A',
      title: 'سرقة صور من Google Images (حقوق ملكية)',
      description: 'Voler des images de Google Images (droits d\'auteur).',
    },
    choiceB: {
      id: 'B',
      title: 'استخدام صور Creative Commons (CC)',
      description: 'Utiliser des images Creative Commons (CC).',
      points: { money: 0, protection: 30, environment: 0 },
    },
    educationalInfo: {
      title: 'Images Creative Commons : Usage Légal et Éthique',
      explanation: 'Les licences Creative Commons permettent d\'utiliser des images légalement tout en respectant les droits des créateurs.',
      benefits: [
        'Usage légal garanti',
        'Respect des droits d\'auteur',
        'Grande variété d\'images disponibles',
        'Apprentissage du droit d\'auteur',
        'Soutien aux créateurs',
      ],
      tools: [
        {
          name: 'Unsplash',
          description: 'Photos gratuites et libres',
          link: 'https://unsplash.com/',
        },
        {
          name: 'Wikimedia Commons',
          description: 'Médias libres',
          link: 'https://commons.wikimedia.org/',
        },
      ],
      nirdPillar: 'responsible',
      fact: 'Les images Creative Commons favorisent le partage et la réutilisation éthique du contenu.',
    },
  },
  {
    id: 19,
    context: 'الذكاء الاصطناعي: توليد صور بالـ AI.',
    choiceA: {
      id: 'A',
      title: 'Midjourney (اشتراك، استهلاك طاقة هائل)',
      description: 'Midjourney (abonnement, consommation d\'énergie énorme).',
    },
    choiceB: {
      id: 'B',
      title: 'الرسم اليدوي أو استخدام أدوات محلية خفيفة',
      description: 'Dessin à la main ou utilisation d\'outils locaux légers.',
      points: { money: 0, protection: 0, environment: 40 },
    },
    educationalInfo: {
      title: 'Créativité Authentique et Durabilité',
      explanation: 'Le dessin à la main développe des compétences réelles et les outils locaux évitent la consommation énergétique massive des IA cloud.',
      benefits: [
        'Développement de compétences artistiques',
        'Pas de consommation énergétique massive',
        'Créativité authentique',
        'Pas de dépendance aux services cloud',
        'Apprentissage réel',
      ],
      tools: [
        {
          name: 'Krita',
          description: 'Logiciel de peinture numérique local',
          link: 'https://krita.org/fr/',
        },
      ],
      nirdPillar: 'sustainable',
      fact: 'Un seul appel à une IA cloud consomme autant qu\'une ampoule LED allumée pendant une heure.',
    },
  },
  {
    id: 20,
    context: 'المشاركة: كتبت كوداً مفيداً.',
    choiceA: {
      id: 'A',
      title: 'الاحتفاظ به لنفسك',
      description: 'Le garder pour soi.',
    },
    choiceB: {
      id: 'B',
      title: 'نشره على La Forge ليستخدمه الآخرون',
      description: 'Le publier sur La Forge pour que d\'autres l\'utilisent.',
      points: { money: 0, protection: 0, environment: 0 },
    },
    educationalInfo: {
      title: 'Partage et Communauté : L\'Esprit NIRD',
      explanation: 'Publier sur La Forge des Communs Numériques Éducatifs contribue au bien commun et permet à d\'autres d\'apprendre et d\'améliorer votre travail.',
      benefits: [
        'Contribution au bien commun',
        'Retours et améliorations',
        'Apprentissage par la collaboration',
        'Portfolio valorisable',
        'Esprit de communauté NIRD',
      ],
      tools: [
        {
          name: 'La Forge',
          description: 'Plateforme de communs numériques éducatifs',
          link: 'https://nird.forge.apps.education.fr/',
        },
      ],
      nirdPillar: 'inclusive',
      fact: 'Le partage de code open-source est au cœur de la philosophie NIRD et bénéficie à toute la communauté éducative.',
    },
  },
];

/**
 * Get scenario by ID
 */
export function getScenario(id: ScenarioId): StudentScenario | undefined {
  return studentScenarios.find((s) => s.id === id);
}

/**
 * Get all scenario IDs
 */
export function getAllScenarioIds(): ScenarioId[] {
  return studentScenarios.map((s) => s.id);
}

/**
 * Calculate total points from a choice
 */
export function calculatePoints(choice: ScenarioChoice): ScenarioPoints {
  return choice.points || { money: 0, protection: 0, environment: 0 };
}

/**
 * Get total points across all scenarios
 */
export function getTotalPoints(
  completedScenarios: Map<ScenarioId, ChoiceType>
): ScenarioPoints {
  let total: ScenarioPoints = { money: 0, protection: 0, environment: 0 };

  completedScenarios.forEach((choice, scenarioId) => {
    const scenario = getScenario(scenarioId);
    if (scenario && choice === 'B' && scenario.choiceB.points) {
      total.money += scenario.choiceB.points.money;
      total.protection += scenario.choiceB.points.protection;
      total.environment += scenario.choiceB.points.environment;
    }
  });

  return total;
}

