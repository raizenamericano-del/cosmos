import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Gabungan clsx + tailwind-merge untuk kelas Tailwind kondisional. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Nomor romawi sederhana (untuk level Kardashev). */
export function romanize(num: number): string {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  let result = '';
  let n = num;
  for (const [value, symbol] of map) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

/** Format angka dengan pemisah ribuan lokal Indonesia. */
export function formatNumber(value: number, fractionDigits = 0): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(value);
}

/** Jarak dalam tahun cahaya → label manusiawi. */
export function formatLightYears(ly: number): string {
  if (ly >= 1_000_000) return `${formatNumber(ly / 1_000_000, 2)} juta tahun cahaya`;
  if (ly >= 1_000) return `${formatNumber(ly / 1_000, 2)} ribu tahun cahaya`;
  if (ly < 0.01) return `${formatNumber(ly * 63_241.1, 0)} AU`;
  return `${formatNumber(ly, 2)} tahun cahaya`;
}

/** Detik → label durasi misi (hari / tahun). */
export function formatDuration(hours: number): string {
  if (hours < 1) return `${formatNumber(hours * 60, 0)} menit`;
  if (hours < 48) return `${formatNumber(hours, 1)} jam`;
  const days = hours / 24;
  if (days < 400) return `${formatNumber(days, 1)} hari`;
  const years = days / 365.25;
  return `${formatNumber(years, 2)} tahun`;
}

/**
 * RNG deterministik (mulberry32) — dipakai agar "cuaca antariksa" dan
 * variasi kosmetik tetap konsisten untuk seed yang sama (mis. per hari).
 */
export function seededRandom(seed: number) {
  let a = seed >>> 0;
  return function next() {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Seed angka dari string (hash djb2). */
export function hashString(input: string): number {
  let hash = 5381;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 33) ^ input.charCodeAt(i);
  }
  return hash >>> 0;
}

export function seededPick<T>(items: readonly T[], rand: () => number): T {
  return items[Math.floor(rand() * items.length) % items.length];
}

/** Tanggal ISO (YYYY-MM-DD) pada zona waktu pengguna. */
export function todayIso(timeZone = 'Asia/Jakarta'): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(new Date());
}

export function formatDateId(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input;
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

/** Rank / pangkat kuis berdasarkan persentase skor. */
export function scoreToRank(score: number, total: number) {
  const percent = total === 0 ? 0 : Math.round((score / total) * 100);
  if (percent === 100) return { title: 'Starship Captain', icon: '🚀', tier: 5, percent };
  if (percent >= 85) return { title: 'Navigator Bintang', icon: '🧭', tier: 4, percent };
  if (percent >= 70) return { title: 'Astronom Muda', icon: '🔭', tier: 3, percent };
  if (percent >= 50) return { title: 'Teknisi Stasiun', icon: '🛠️', tier: 2, percent };
  return { title: 'Crew Cadet', icon: '⭐', tier: 1, percent };
}

/** Rank singkat untuk leaderboard. */
export function rankTitle(score: number, total: number): string {
  return scoreToRank(score, total).title;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Turunkan slug dari judul berbahasa Indonesia. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function truncate(text: string, length = 140): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trimEnd()}…`;
}

/** Ahli waris huruf pertama nama (untuk avatar fallback). */
export function initials(name?: string | null): string {
  if (!name) return 'CA';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}
