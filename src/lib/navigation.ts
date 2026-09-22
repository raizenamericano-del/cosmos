export interface NavItem {
  href: string;
  label: string;
  description: string;
  icon: string;
  world: 'edukasi' | 'fiksi' | 'umum';
}

/** Navigasi dipisah tegas: 📚 Fakta Ilmiah vs 🛸 Fiksi Ilmiah. */
export const EDU_NAV: NavItem[] = [
  {
    href: '/tata-surya',
    label: 'Tata Surya 3D',
    description: 'Jelajahi 8 planet & Matahari secara interaktif',
    icon: '🪐',
    world: 'edukasi'
  },
  {
    href: '/ensiklopedia',
    label: 'Ensiklopedia',
    description: '12 artikel astronomi akurat & fun facts',
    icon: '📚',
    world: 'edukasi'
  },
  {
    href: '/lubang-hitam',
    label: 'Black Hole Explorer',
    description: 'Ubah massa, lihat horizon berubah nyata',
    icon: '🕳️',
    world: 'edukasi'
  },
  {
    href: '/kuis',
    label: 'Kuis Astronomi',
    description: '30 soal, timer, rank & leaderboard',
    icon: '🎯',
    world: 'edukasi'
  },
  {
    href: '/papan-skor',
    label: 'Papan Skor',
    description: 'Peringkat global para penjelajah',
    icon: '🏆',
    world: 'edukasi'
  }
];

export const FICTION_NAV: NavItem[] = [
  {
    href: '/codex-alien',
    label: 'Alien Codex',
    description: 'Arsip 5 peradaban luar angkasa',
    icon: '👽',
    world: 'fiksi'
  },
  {
    href: '/atlas-dunia',
    label: 'Atlas Dunia Fiksi',
    description: '5 planet imajinatif dengan lore lengkap',
    icon: '🌍',
    world: 'fiksi'
  },
  {
    href: '/simulator-perjalanan',
    label: 'Simulator Perjalanan',
    description: 'Rencanakan rute antarbintang & boarding pass',
    icon: '🚀',
    world: 'fiksi'
  },
  {
    href: '/sinyal-misterius',
    label: 'Sinyal Misterius',
    description: 'Pecahkan sandi biner, Caesar, hingga simbol alien',
    icon: '📡',
    world: 'fiksi'
  },
  {
    href: '/portal-multiverse',
    label: 'Portal Multiverse',
    description: 'Melompat ke timeline alternatif',
    icon: '🌀',
    world: 'fiksi'
  },
  {
    href: '/cuaca-antariksa',
    label: 'Cuaca Antariksa',
    description: 'Prakiraan fiksi yang konsisten seharian',
    icon: '🌤️',
    world: 'fiksi'
  }
];

export const ACCOUNT_NAV: NavItem[] = [
  {
    href: '/pencapaian',
    label: 'Achievement',
    description: 'Koleksi badge yang sudah kamu buka',
    icon: '🏅',
    world: 'umum'
  },
  {
    href: '/profil',
    label: 'Profil & Bookmark',
    description: 'Riwayat kuis, bookmark, dan statistik',
    icon: '👤',
    world: 'umum'
  }
];

export const ALL_NAV = [...EDU_NAV, ...FICTION_NAV, ...ACCOUNT_NAV];
