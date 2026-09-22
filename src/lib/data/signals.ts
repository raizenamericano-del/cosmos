import type { Signal } from '@/lib/types';
import { CAESAR_SHIFT, encodeWithCipher } from '@/lib/ciphers';

/**
 * ============================================================
 * SINYAL MISTERIUS — 🛸 FIKSI ILMIAH
 * Pesan asli didefinisikan di atas, lalu dienkripsi otomatis oleh
 * `encodeWithCipher` agar pesan terenkripsi dan pesan terdekode selalu
 * konsisten (tidak ada dua sumber kebenaran).
 * ============================================================
 */

interface SignalSeed {
  id: string;
  title: string;
  difficulty: number;
  cipher: Signal['cipher'];
  decodedMessage: string;
  hint: string;
  sender: string;
  rewardBadge: string;
  order: number;
}

const SIGNAL_SEEDS: SignalSeed[] = [
  {
    id: 'sig-01',
    title: 'Transmisi Pertama dari Balik Sabuk Kuiper',
    difficulty: 1,
    cipher: 'binary',
    decodedMessage:
      'KAMI MENGAMATIMU DARI KEGELAPAN JANGAN TAKUT THE NYX',
    hint: 'Setiap kelompok 8 digit biner = satu huruf. Ubah biner ke desimal, lalu cocokkan dengan tabel ASCII (A = 65).',
    sender: 'Nyx Collective',
    rewardBadge: 'Signal Hunter',
    order: 1
  },
  {
    id: 'sig-02',
    title: 'Undangan Terbuka dari Hutan Luminescen',
    difficulty: 2,
    cipher: 'caesar',
    decodedMessage:
      'HUTAN CAHAYA KAMI TERBUKA UNTUKMU BAWA DAMAI ATAU JANGAN DATANG AURELIANS',
    hint: `Setiap huruf digeser ${CAESAR_SHIFT} langkah ke depan dalam alfabet. Geser balik sebanyak itu untuk membacanya.`,
    sender: 'Aurelians — Elyria',
    rewardBadge: 'Signal Hunter',
    order: 2
  },
  {
    id: 'sig-03',
    title: 'Koordinat Rute Tenunan Perak',
    difficulty: 3,
    cipher: 'rot13',
    decodedMessage:
      'DELEGASI VESSARI MEMBUKA JALUR PERDAGANGAN BARU DI SABUK ASTEROID DI BAWAH BENDERA HALCYON PRIME',
    hint: 'Sandi ROT13 berputar 13 huruf: A menjadi N, N menjadi A. Terapkan sekali lagi untuk kembali ke aslinya.',
    sender: 'Delegasi Vessari',
    rewardBadge: 'Galactic Cartographer',
    order: 3
  },
  {
    id: 'sig-04',
    title: 'Peringatan Terakhir dari Cincin Obsidian',
    difficulty: 4,
    cipher: 'symbol',
    decodedMessage:
      'KLAN XELTHARIS MENUNTUT BAHAN BAKAR BINTANG JANGAN LINTASI OBSIDIAN REACH',
    hint: 'Gunakan tabel legenda simbol alien di bawah kotak jawaban. Setiap simbol mewakili satu huruf latin.',
    sender: "Klan Xel'Tharis",
    rewardBadge: 'Signal Master',
    order: 4
  }
];

export const SIGNALS: Signal[] = SIGNAL_SEEDS.map((seed) => ({
  id: seed.id,
  title: seed.title,
  difficulty: seed.difficulty,
  encodedMessage: encodeWithCipher(seed.cipher, seed.decodedMessage, CAESAR_SHIFT),
  decodedMessage: seed.decodedMessage,
  hint: seed.hint,
  cipher: seed.cipher,
  sender: seed.sender,
  rewardBadge: seed.rewardBadge,
  order: seed.order
}));

/** Versi aman untuk dikirim ke klien (tanpa jawaban terdekode). */
export type PublicSignal = Omit<Signal, 'decodedMessage'>;

export function toPublicSignal(signal: Signal): PublicSignal {
  return {
    id: signal.id,
    title: signal.title,
    difficulty: signal.difficulty,
    encodedMessage: signal.encodedMessage,
    hint: signal.hint,
    cipher: signal.cipher,
    sender: signal.sender,
    rewardBadge: signal.rewardBadge,
    order: signal.order
  };
}

export const PUBLIC_SIGNALS: PublicSignal[] = SIGNALS.map(toPublicSignal);

export const DIFFICULTY_LABEL: Record<number, string> = {
  1: 'Rekrut',
  2: 'Operator',
  3: 'Ahli Kripto',
  4: 'Master Sinyal'
};
