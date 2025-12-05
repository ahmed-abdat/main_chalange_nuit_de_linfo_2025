# 🏛️ Village NIRD

> **Le Village Numérique Résistant** - La Nuit de l'Info 2025

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.1-blue)](https://react.dev/)

## 📖 À propos

**Village NIRD** est une application web interactive créée pour **La Nuit de l'Info 2025** qui sensibilise aux enjeux de la souveraineté numérique dans les écoles françaises.

> "Nous sommes en 2025. Toutes les écoles françaises sont occupées par Big Tech... Toutes ? Non ! Un village d'irréductibles enseignants et élèves résiste encore à l'envahisseur numérique."

### 🎯 Objectif

Promouvoir le mouvement **NIRD** (Numérique Inclusif, Responsable, Durable) en utilisant la métaphore d'Astérix contre l'Empire Romain pour expliquer comment les écoles peuvent résister à la dépendance aux Big Tech.

### 🌟 Fonctionnalités

- **Scrollytelling interactif** : Parcours narratif guidé de la crise à la solution
- **Système de choix** : "Que ferait votre école ?" avec calcul des conséquences
- **Mini-jeu** : "Sauvez un PC" - Expérience interactive de reconditionnement
- **Calculateur d'économies** : Estimation des coûts selon le choix de l'école
- **Les 3 piliers NIRD** : Exploration des valeurs Inclusif, Responsable, Durable
- **Scénarios étudiants** : Expériences éducatives interactives
- **RPG** : Aventure ludique dans le village résistant

## 🚀 Technologies

| Technologie | Version | Usage |
|------------|---------|-------|
| **Next.js** | 16.0.7 | Framework React avec App Router |
| **React** | 19.2.1 | Bibliothèque UI avec React Compiler |
| **TypeScript** | 5 | Typage statique |
| **Tailwind CSS** | 4 | Styling utility-first |
| **Framer Motion** | 12 | Animations React |
| **Zustand** | 5 | Gestion d'état |
| **Three.js** | - | Graphismes 3D (optionnel) |

## 📦 Installation

### Prérequis

- Node.js 20+ 
- pnpm (recommandé) ou npm

### Étapes

1. **Cloner le dépôt**
```bash
git clone https://github.com/votre-org/village-nird.git
cd village-nird
```

2. **Installer les dépendances**
```bash
pnpm install
```

3. **Lancer le serveur de développement**
```bash
pnpm dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 🛠️ Scripts disponibles

```bash
pnpm dev      # Démarre le serveur de développement (port 3000)
pnpm build    # Build de production
pnpm start    # Lance le serveur de production
pnpm lint     # Exécute ESLint
```

## 📁 Structure du projet

```
src/
├── app/                    # Pages Next.js (App Router)
│   ├── page.tsx           # Page d'accueil principale
│   ├── student-scenarios/ # Scénarios étudiants
│   ├── rpg/               # Aventure RPG
│   └── variants/          # Variantes de thème
├── components/            # Composants React
│   ├── sections/          # Sections de page
│   ├── ui/                # Composants UI (shadcn)
│   ├── games/             # Mini-jeux
│   └── student-scenarios/ # Composants scénarios
├── store/                 # État global (Zustand)
├── data/                  # Données statiques
├── hooks/                 # Hooks personnalisés
├── lib/                   # Utilitaires
└── types/                 # Types TypeScript
```

## 🎨 Design System

### Palette de couleurs

**Village (NIRD) - Positif :**
- Émeraude : `#00997d` - Actions principales, succès
- Vert forêt : `#2E7D32` - Actions secondaires
- Or : `#F9A825` - Accents, potion magique

**Empire (Big Tech) - Négatif :**
- Rouge romain : `#C62828` - Danger, avertissements
- Orange résistance : `#ff8c00` - Urgence, action

### Typographie

- **Display** : System UI ou Fredoka Bold (titres)
- **Body** : Inter ou système sans-serif
- **Code/Stats** : JetBrains Mono (monospace)

## 📊 Statistiques clés

- **240 millions** de PCs menacés d'obsolescence (Windows 10 EOL)
- **68%** de l'administration française sous Windows 10
- **132 PCs** reconditionnés par le Lycée Carnot
- **11 écoles** bénéficiaires
- **€0** coût de Linux vs **€61/an** ESU par PC

## 🔗 Liens utiles

- **NIRD officiel** : https://nird.forge.apps.education.fr/
- **Linux NIRD** : https://nird.forge.apps.education.fr/linux/
- **La Nuit de l'Info** : https://www.nuitdelinfo.com/
- **PrimTux** : https://primtux.fr/

## 🤝 Contribution

Ce projet a été créé pour **La Nuit de l'Info 2025**. Les contributions sont les bienvenues !

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 👥 Équipe

Créé avec ❤️ pour **La Nuit de l'Info 2025**

## 🙏 Remerciements

- **NIRD** (Numérique Inclusif, Responsable, Durable)
- **Lycée Carnot de Bruay-la-Buissière** pour l'inspiration
- **La communauté du Libre** pour les outils open source
- **Tous les enseignants et élèves résistants** 🐧

---

**"Ensemble, l'irréductibilité numérique est possible !"** 🏛️

