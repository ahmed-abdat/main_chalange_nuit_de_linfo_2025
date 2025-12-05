// Typing Game Commands Data
// Linux commands for the typing challenge

export interface TypingCommand {
  id: string;
  command: string;
  description: string;
  category: 'basic' | 'files' | 'system' | 'network' | 'advanced';
  difficulty: 'easy' | 'medium' | 'hard';
  nirdTip: string; // Educational tip about NIRD relevance
}

export const COMMANDS: TypingCommand[] = [
  // Easy - Basic commands
  {
    id: 'ls',
    command: 'ls',
    description: 'Liste les fichiers du dossier courant',
    category: 'basic',
    difficulty: 'easy',
    nirdTip: 'Premiere commande a maitriser !'
  },
  {
    id: 'cd',
    command: 'cd Documents',
    description: 'Change de dossier',
    category: 'basic',
    difficulty: 'easy',
    nirdTip: 'Navigation de base dans le terminal'
  },
  {
    id: 'pwd',
    command: 'pwd',
    description: 'Affiche le chemin du dossier courant',
    category: 'basic',
    difficulty: 'easy',
    nirdTip: 'Toujours savoir ou on est !'
  },
  {
    id: 'cat',
    command: 'cat fichier.txt',
    description: 'Affiche le contenu d\'un fichier',
    category: 'basic',
    difficulty: 'easy',
    nirdTip: 'Lire un fichier sans editeur'
  },
  {
    id: 'clear',
    command: 'clear',
    description: 'Nettoie le terminal',
    category: 'basic',
    difficulty: 'easy',
    nirdTip: 'Un terminal propre, un esprit clair !'
  },
  {
    id: 'whoami',
    command: 'whoami',
    description: 'Affiche le nom d\'utilisateur',
    category: 'basic',
    difficulty: 'easy',
    nirdTip: 'Connais-toi toi-meme !'
  },

  // Medium - File operations
  {
    id: 'mkdir',
    command: 'mkdir nouveau_dossier',
    description: 'Cree un nouveau dossier',
    category: 'files',
    difficulty: 'medium',
    nirdTip: 'Organise tes fichiers !'
  },
  {
    id: 'cp',
    command: 'cp fichier.txt copie.txt',
    description: 'Copie un fichier',
    category: 'files',
    difficulty: 'medium',
    nirdTip: 'Toujours faire des sauvegardes !'
  },
  {
    id: 'mv',
    command: 'mv ancien.txt nouveau.txt',
    description: 'Deplace ou renomme un fichier',
    category: 'files',
    difficulty: 'medium',
    nirdTip: 'Renommer sans interface graphique'
  },
  {
    id: 'rm',
    command: 'rm fichier.txt',
    description: 'Supprime un fichier',
    category: 'files',
    difficulty: 'medium',
    nirdTip: 'Attention, pas de corbeille !'
  },
  {
    id: 'touch',
    command: 'touch nouveau.txt',
    description: 'Cree un fichier vide',
    category: 'files',
    difficulty: 'medium',
    nirdTip: 'Creation rapide de fichiers'
  },
  {
    id: 'ls-la',
    command: 'ls -la',
    description: 'Liste detaillee avec fichiers caches',
    category: 'files',
    difficulty: 'medium',
    nirdTip: 'Voir tous les details !'
  },

  // Medium - System commands
  {
    id: 'apt-update',
    command: 'sudo apt update',
    description: 'Met a jour la liste des paquets',
    category: 'system',
    difficulty: 'medium',
    nirdTip: 'Premiere etape avant d\'installer !'
  },
  {
    id: 'apt-install',
    command: 'sudo apt install firefox',
    description: 'Installe un logiciel',
    category: 'system',
    difficulty: 'medium',
    nirdTip: 'Installation gratuite de logiciels libres !'
  },
  {
    id: 'df',
    command: 'df -h',
    description: 'Affiche l\'espace disque',
    category: 'system',
    difficulty: 'medium',
    nirdTip: 'Surveiller son espace disque'
  },
  {
    id: 'free',
    command: 'free -h',
    description: 'Affiche la memoire disponible',
    category: 'system',
    difficulty: 'medium',
    nirdTip: 'Linux est leger en memoire !'
  },

  // Hard - Advanced commands
  {
    id: 'chmod',
    command: 'chmod +x script.sh',
    description: 'Rend un script executable',
    category: 'advanced',
    difficulty: 'hard',
    nirdTip: 'Permissions Linux = securite !'
  },
  {
    id: 'grep',
    command: 'grep "texte" fichier.txt',
    description: 'Recherche du texte dans un fichier',
    category: 'advanced',
    difficulty: 'hard',
    nirdTip: 'Recherche puissante en ligne de commande'
  },
  {
    id: 'tar',
    command: 'tar -xvf archive.tar.gz',
    description: 'Extrait une archive',
    category: 'advanced',
    difficulty: 'hard',
    nirdTip: 'Gestion des archives Linux'
  },
  {
    id: 'ssh',
    command: 'ssh utilisateur@serveur',
    description: 'Connexion securisee a un serveur',
    category: 'network',
    difficulty: 'hard',
    nirdTip: 'Administration a distance securisee'
  },
  {
    id: 'curl',
    command: 'curl https://nird.fr',
    description: 'Telecharge une page web',
    category: 'network',
    difficulty: 'hard',
    nirdTip: 'Telechargement en ligne de commande'
  },
  {
    id: 'pipe',
    command: 'ls | grep .txt',
    description: 'Combine deux commandes',
    category: 'advanced',
    difficulty: 'hard',
    nirdTip: 'La puissance des pipes Linux !'
  },
  {
    id: 'dd',
    command: 'sudo dd if=nird.iso of=/dev/sdb',
    description: 'Cree une cle USB bootable',
    category: 'advanced',
    difficulty: 'hard',
    nirdTip: 'La commande magique pour sauver un PC !'
  },
  {
    id: 'neofetch',
    command: 'neofetch',
    description: 'Affiche les infos systeme en ASCII art',
    category: 'system',
    difficulty: 'hard',
    nirdTip: 'Montre fièrement ton Linux !'
  }
];

// Get commands by difficulty
export function getCommandsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): TypingCommand[] {
  return COMMANDS.filter(cmd => cmd.difficulty === difficulty);
}

// Get random commands for a game session
export function getRandomCommands(count: number, difficulty?: 'easy' | 'medium' | 'hard'): TypingCommand[] {
  const pool = difficulty ? getCommandsByDifficulty(difficulty) : COMMANDS;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Get progressive commands (starts easy, gets harder)
export function getProgressiveCommands(count: number): TypingCommand[] {
  const easy = getCommandsByDifficulty('easy');
  const medium = getCommandsByDifficulty('medium');
  const hard = getCommandsByDifficulty('hard');

  const result: TypingCommand[] = [];

  // First third easy, second third medium, last third hard
  const easyCount = Math.ceil(count / 3);
  const mediumCount = Math.ceil(count / 3);
  const hardCount = count - easyCount - mediumCount;

  result.push(...easy.sort(() => Math.random() - 0.5).slice(0, easyCount));
  result.push(...medium.sort(() => Math.random() - 0.5).slice(0, mediumCount));
  result.push(...hard.sort(() => Math.random() - 0.5).slice(0, hardCount));

  return result;
}

// Game configuration
export const TYPING_CONFIG = {
  gameDuration: 60, // seconds
  minWpmForBadge: 50, // WPM needed for terminal_ninja badge
  pointsPerCommand: 100,
  bonusPerWpm: 10,
  penaltyPerError: 5
};
