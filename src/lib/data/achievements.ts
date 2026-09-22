import type { AchievementDefinition } from '@/lib/types';

/**
 * Definisi seluruh achievement. `badgeName` adalah kunci unik yang disimpan ke
 * tabel `achievements` (atau localStorage untuk pengguna tamu).
 */
export const ACHIEVEMENTS: AchievementDefinition[] = [
  {
    badgeName: 'First Contact',
    title: 'Kontak Pertama',
    description: 'Membuka arsip satu peradaban alien di Alien Codex.',
    icon: '👽',
    rarity: 'umum',
    category: 'fiksi',
    hint: 'Buka detail salah satu spesies di Alien Codex.'
  },
  {
    badgeName: 'Wormhole Explorer',
    title: 'Penjelajah Wormhole',
    description: 'Melompat ke sebuah timeline alternatif di Portal Multiverse.',
    icon: '🌀',
    rarity: 'langka',
    category: 'fiksi',
    hint: 'Gunakan Portal Multiverse untuk melompat ke timeline lain.'
  },
  {
    badgeName: 'Signal Hunter',
    title: 'Pemburu Sinyal',
    description: 'Berhasil mendekode satu sinyal misterius dari luar angkasa.',
    icon: '📡',
    rarity: 'langka',
    category: 'fiksi',
    hint: 'Pecahkan satu teka-teki di halaman Sinyal Misterius.'
  },
  {
    badgeName: 'Galactic Cartographer',
    title: 'Kartografer Galaksi',
    description: 'Menyelesaikan satu simulasi perjalanan antarbintang lengkap.',
    icon: '🗺️',
    rarity: 'umum',
    category: 'fiksi',
    hint: 'Rencanakan dan jalankan perjalanan di Interstellar Travel Simulator.'
  },
  {
    badgeName: 'Paradise Seeker',
    title: 'Pencari Surga',
    description: 'Menemukan dunia dengan beauty score di atas 9 di Atlas Dunia Fiksi.',
    icon: '🌅',
    rarity: 'langka',
    category: 'fiksi',
    hint: 'Cari planet fiksi dengan beauty score ≥ 9, lalu buka detailnya.'
  },
  {
    badgeName: 'Black Hole Diver',
    title: 'Penyelam Lubang Hitam',
    description: 'Menguji massa lubang hitam hingga 10 miliar massa Matahari.',
    icon: '🕳️',
    rarity: 'langka',
    category: 'edukasi',
    hint: 'Geser slider massa di Black Hole Explorer sampai maksimum.'
  },
  {
    badgeName: 'Quiz Champion',
    title: 'Juara Kuis Academy',
    description: 'Mendapat skor sempurna pada salah satu kategori kuis astronomi.',
    icon: '🏆',
    rarity: 'langka',
    category: 'edukasi',
    hint: 'Jawab semua pertanyaan benar dalam satu sesi kuis.'
  },
  {
    badgeName: 'Stargazer',
    title: 'Pengamat Bintang',
    description: 'Menjelajahi panel informasi minimal 5 benda langit di Solar System 3D.',
    icon: '🔭',
    rarity: 'umum',
    category: 'edukasi',
    hint: 'Klik 5 planet berbeda di Solar System 3D.'
  },
  {
    badgeName: 'Lexicon Keeper',
    title: 'Penjaga Ensiklopedia',
    description: 'Menyimpan 3 artikel ke daftar bookmark.',
    icon: '📚',
    rarity: 'umum',
    category: 'edukasi',
    hint: 'Simpan minimal 3 artikel dari Ensiklopedia.'
  },
  {
    badgeName: 'Sector Cartographer',
    title: 'Penjelajah Sektor Tersembunyi',
    description: 'Menemukan halaman rahasia Cosmos Academy.',
    icon: '🛰️',
    rarity: 'legendaris',
    category: 'rahasia',
    hint: 'Bintang di hero section menyimpan rahasia. Coba klik berkali-kali.'
  },
  {
    badgeName: 'Hyperspace Rider',
    title: 'Penunggang Hyperspace',
    description: 'Mengaktifkan mode hyperspace 10 detik lewat kode rahasia.',
    icon: '⚡',
    rarity: 'legendaris',
    category: 'rahasia',
    hint: 'Kode rahasia gaya arcade jadul, panah atas-atas-bawah-bawah…'
  },
  {
    badgeName: 'Signal Master',
    title: 'Master Sinyal',
    description: 'Mendekode seluruh sinyal misterius yang ada di arsip radio.',
    icon: '🛸',
    rarity: 'legendaris',
    category: 'fiksi',
    hint: 'Selesaikan semua sinyal di halaman Sinyal Misterius.'
  }
];

export const ACHIEVEMENT_MAP: Record<string, AchievementDefinition> = Object.fromEntries(
  ACHIEVEMENTS.map((achievement) => [achievement.badgeName, achievement])
);

export const ACHIEVEMENT_BADGES = ACHIEVEMENTS.map((achievement) => achievement.badgeName);

export function getAchievement(badgeName: string): AchievementDefinition | undefined {
  return ACHIEVEMENT_MAP[badgeName];
}
