export type StoryImpact = {
  budget: number;          // positif = coût supplémentaire, négatif = économie
  inclusion: number;        // positif = plus d'élèves équipés
  durability: number;       // positif = meilleure durabilité
  bigTechDependence: number; // positif = plus de dépendance
};

export type StoryOptionId = 'bigTech' | 'nird';

export type StoryOption = {
  id: StoryOptionId;
  label: string;                // ex: "Option A : Big Tech"
  title: string;                // ex: "Acheter de nouveaux appareils"
  description: string;          // court texte explicatif
  immediateConsequence: string; // petit paragraphe narratif après le choix
  impact: StoryImpact;          // effet sur les indicateurs
};

export type StoryEpisode = {
  id: string;
  order: number;              // position dans l'histoire
  title: string;              // ex: "Épisode 1 : Windows 10 bloque la salle info"
  context: string[];          // tableau de paragraphes de contexte
  options: [StoryOption, StoryOption];
  chapterBreakAfter?: boolean; // si true, afficher un écran de bilan après cet épisode
};

export const STORY_EPISODES: StoryEpisode[] = [
  {
    id: 'episode-1',
    order: 1,
    title: 'Épisode 1 : Windows 10 bloque la salle info',
    context: [
      'Un matin de septembre, le technicien informatique de l\'établissement découvre que 50 ordinateurs refusent catégoriquement la mise à jour vers Windows 10. Les machines, vieilles de huit ans, fonctionnent encore parfaitement mais Microsoft ne les supporte plus.',
      'Les enseignants se plaignent : impossible d\'utiliser les dernières versions des logiciels pédagogiques. Les élèves ne peuvent plus accéder aux ressources en ligne. La direction doit prendre une décision rapidement.'
    ],
    options: [
      {
        id: 'bigTech',
        label: 'Option A : Big Tech',
        title: 'Acheter de nouveaux appareils',
        description: 'Commander 50 nouveaux ordinateurs avec Windows 11 préinstallé. Solution rapide et familière pour tous.',
        immediateConsequence: 'Trois semaines plus tard, les nouveaux ordinateurs arrivent. Les enseignants sont soulagés, les élèves découvrent des machines rapides. Mais le budget annuel de l\'établissement a fondu : 25 000€ partis en une seule commande.',
        impact: {
          budget: 25,
          inclusion: 0,
          durability: -5,
          bigTechDependence: 3
        }
      },
      {
        id: 'nird',
        label: 'Option B : NIRD',
        title: 'Installer Linux Mint/Xubuntu',
        description: 'Réinstaller les 50 machines avec Linux Mint, un système libre et léger. Formation rapide pour les enseignants.',
        immediateConsequence: 'Après un week-end d\'installation, les machines reprennent vie. Les enseignants découvrent LibreOffice et les alternatives libres. Quelques réticences au début, mais l\'enthousiasme grandit. L\'établissement a économisé 25 000€ et prolongé la vie de ses équipements.',
        impact: {
          budget: -25,
          inclusion: 2,
          durability: 4,
          bigTechDependence: -2
        }
      }
    ],
    chapterBreakAfter: false
  },
  {
    id: 'episode-2',
    order: 2,
    title: 'Épisode 2 : Le cloud "gratuit" de l\'académie',
    context: [
      'L\'académie propose un nouveau service cloud "gratuit" pour héberger les documents des élèves et les outils collaboratifs. La solution semble parfaite : pas de coût, interface simple, accessible partout.',
      'Mais en lisant les conditions d\'utilisation, le directeur technique découvre que les données des élèves seront stockées aux États-Unis, et que l\'établissement perd tout contrôle sur ses propres fichiers.'
    ],
    options: [
      {
        id: 'bigTech',
        label: 'Option A : Big Tech',
        title: 'Accepter le cloud académique',
        description: 'Utiliser le service proposé par l\'académie. C\'est gratuit et tout le monde sait déjà l\'utiliser.',
        immediateConsequence: 'En un mois, tous les enseignants migrent leurs cours sur la plateforme. Les élèves accèdent facilement à leurs documents depuis chez eux. Mais l\'établissement a perdu la souveraineté sur ses données. Les contrats se renouvellent chaque année, et les coûts cachés commencent à apparaître.',
        impact: {
          budget: 5,
          inclusion: 1,
          durability: -2,
          bigTechDependence: 4
        }
      },
      {
        id: 'nird',
        label: 'Option B : NIRD',
        title: 'Installer Nextcloud en local',
        description: 'Déployer un serveur Nextcloud dans l\'établissement. Les données restent sur place, sous contrôle total.',
        immediateConsequence: 'Avec l\'aide d\'un parent bénévole expert, l\'établissement installe Nextcloud sur un serveur local. Les données ne quittent jamais l\'école. Les élèves apprennent à gérer leur propre espace numérique. Un peu plus de maintenance, mais une vraie autonomie retrouvée.',
        impact: {
          budget: -2,
          inclusion: 1,
          durability: 3,
          bigTechDependence: -3
        }
      }
    ],
    chapterBreakAfter: true
  },
  {
    id: 'episode-3',
    order: 3,
    title: 'Épisode 3 : Les licences qui expirent en plein trimestre',
    context: [
      'En plein milieu du trimestre, un message d\'alerte apparaît : les licences Microsoft Office expirent dans deux semaines. 200 licences à renouveler, pour un coût de 8 000€ par an.',
      'Le budget de l\'établissement est déjà serré. Les enseignants paniquent : comment faire cours sans Word et Excel ? La direction doit choisir rapidement.'
    ],
    options: [
      {
        id: 'bigTech',
        label: 'Option A : Big Tech',
        title: 'Renouveler les licences Microsoft',
        description: 'Payer le renouvellement des 200 licences Office. Tout le monde connaît déjà ces outils.',
        immediateConsequence: 'Les licences sont renouvelées à la dernière minute. Les enseignants peuvent continuer leurs cours sans interruption. Mais l\'établissement s\'engage pour trois ans, et le coût récurrent pèse sur le budget. Chaque année, c\'est la même angoisse : trouver 8 000€ pour les licences.',
        impact: {
          budget: 8,
          inclusion: 0,
          durability: -1,
          bigTechDependence: 3
        }
      },
      {
        id: 'nird',
        label: 'Option B : NIRD',
        title: 'Migrer vers LibreOffice',
        description: 'Former les enseignants à LibreOffice, gratuit et compatible avec les formats Microsoft.',
        immediateConsequence: 'Une semaine de formation intensive est organisée. Les enseignants découvrent que LibreOffice fait presque tout ce qu\'ils faisaient avec Office. Quelques ajustements au début, mais rapidement, tout le monde s\'y fait. L\'établissement économise 8 000€ par an, et n\'est plus dépendant des renouvellements de licences.',
        impact: {
          budget: -8,
          inclusion: 1,
          durability: 2,
          bigTechDependence: -2
        }
      }
    ],
    chapterBreakAfter: false
  },
  {
    id: 'episode-4',
    order: 4,
    title: 'Épisode 4 : Le club informatique des élèves',
    context: [
      'Un groupe d\'élèves passionnés demande à créer un club informatique. Ils veulent apprendre à réparer les ordinateurs, installer Linux, et comprendre comment fonctionnent les outils numériques.',
      'La direction hésite : faut-il leur donner accès aux machines de l\'établissement ? Ou leur proposer des ateliers encadrés avec du matériel dédié ?'
    ],
    options: [
      {
        id: 'bigTech',
        label: 'Option A : Big Tech',
        title: 'Refuser le club, garder le contrôle',
        description: 'Maintenir le contrôle strict sur les machines. Les élèves utilisent les outils fournis, sans toucher à la technique.',
        immediateConsequence: 'Le club ne voit jamais le jour. Les élèves passionnés se tournent vers d\'autres activités. L\'établissement garde le contrôle total, mais rate une occasion d\'impliquer les élèves dans la gestion de leur environnement numérique.',
        impact: {
          budget: 0,
          inclusion: -2,
          durability: 0,
          bigTechDependence: 1
        }
      },
      {
        id: 'nird',
        label: 'Option B : NIRD',
        title: 'Créer le club NIRD avec les élèves',
        description: 'Donner un espace et du matériel aux élèves pour qu\'ils apprennent la maintenance, Linux, et les logiciels libres.',
        immediateConsequence: 'Le club NIRD naît. Les élèves réparent les vieux ordinateurs, installent Linux, créent des tutoriels. Ils deviennent des ambassadeurs du numérique responsable dans l\'établissement. L\'inclusion progresse, et l\'établissement développe une vraie culture technique.',
        impact: {
          budget: -1,
          inclusion: 3,
          durability: 2,
          bigTechDependence: -1
        }
      }
    ],
    chapterBreakAfter: true
  },
  {
    id: 'episode-5',
    order: 5,
    title: 'Épisode 5 : La panne du serveur de messagerie',
    context: [
      'Un vendredi soir, le serveur de messagerie de l\'établissement tombe en panne. Plus personne ne peut envoyer ou recevoir d\'emails. Le technicien est en week-end, et le service externalisé coûte 500€ pour une intervention d\'urgence.',
      'La direction doit décider : payer l\'intervention externe, ou attendre le lundi et trouver une solution alternative ?'
    ],
    options: [
      {
        id: 'bigTech',
        label: 'Option A : Big Tech',
        title: 'Payer l\'intervention externe',
        description: 'Faire appel à une entreprise spécialisée pour réparer rapidement. Le service sera rétabli en quelques heures.',
        immediateConsequence: 'Le serveur est réparé le samedi matin. Tout fonctionne à nouveau. Mais l\'établissement a dépensé 500€ pour une panne qui aurait pu être évitée avec une meilleure maintenance. La dépendance aux services externes s\'accroît.',
        impact: {
          budget: 5,
          inclusion: 0,
          durability: -1,
          bigTechDependence: 2
        }
      },
      {
        id: 'nird',
        label: 'Option B : NIRD',
        title: 'Former une équipe de maintenance interne',
        description: 'Profiter de cette panne pour former le technicien et quelques enseignants volontaires à la maintenance des serveurs.',
        immediateConsequence: 'Le week-end est mis à profit pour former une petite équipe. Le serveur est réparé le lundi matin, mais désormais l\'établissement a les compétences pour gérer ce type de problème. L\'autonomie technique progresse, et les coûts d\'intervention externe diminuent.',
        impact: {
          budget: -2,
          inclusion: 1,
          durability: 2,
          bigTechDependence: -2
        }
      }
    ],
    chapterBreakAfter: false
  }
];

