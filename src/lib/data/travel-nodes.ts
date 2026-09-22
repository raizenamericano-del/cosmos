import type { TravelNode } from '@/lib/types';

/**
 * ============================================================
 * INTERSTELLAR TRAVEL SIMULATOR — 🛸 FIKSI ILMIAH
 * `distanceLy` = jarak nyata (perkiraan) dari Matahari.
 * `coordinates` = posisi pada peta galaksi 2D (0–100) — dipakai untuk
 * menghitung sudut pisah antar tujuan (bukan skala jarak).
 * ============================================================
 */
export const TRAVEL_NODES: TravelNode[] = [
  // ------------------------------ NYATA ------------------------------
  {
    id: 'sol',
    name: 'Sol / Bumi',
    kind: 'nyata',
    distanceLy: 0,
    system: 'Sistem Sol',
    coordinates: { x: 50, y: 50 },
    description: 'Titik nol peradaban manusia. Stasiun orbit rendah Bumi menjadi gerbang keberangkatan.'
  },
  {
    id: 'proxima-b',
    name: 'Proxima Centauri b',
    kind: 'nyata',
    distanceLy: 4.24,
    system: 'Alpha Centauri',
    coordinates: { x: 58, y: 44 },
    description: 'Eksoplanet berbatu terdekat, mengorbit katai merah dengan periode 11,2 hari.'
  },
  {
    id: 'alpha-cen-a',
    name: 'Alpha Centauri A',
    kind: 'nyata',
    distanceLy: 4.37,
    system: 'Alpha Centauri',
    coordinates: { x: 59, y: 45 },
    description: 'Bintang mirip Matahari tipe G2V — kembaran paling dekat dengan tata surya kita.'
  },
  {
    id: 'barnard',
    name: "Barnard's Star",
    kind: 'nyata',
    distanceLy: 5.96,
    system: 'Ophiuchus',
    coordinates: { x: 46, y: 58 },
    description: 'Katai merah tua berusia ±10 miliar tahun yang bergerak cepat melintasi langit.'
  },
  {
    id: 'sirius',
    name: 'Sirius A',
    kind: 'nyata',
    distanceLy: 8.6,
    system: 'Canis Major',
    coordinates: { x: 62, y: 62 },
    description: 'Bintang paling terang di langit malam, ditemani katai putih Sirius B.'
  },
  {
    id: 'tau-ceti',
    name: 'Tau Ceti e',
    kind: 'nyata',
    distanceLy: 11.9,
    system: 'Tau Ceti',
    coordinates: { x: 64, y: 38 },
    description: 'Kandidat super-Bumi di zona layak huni, sering disebut dalam kajian kolonisasi masa depan.'
  },
  {
    id: 'vega',
    name: 'Vega',
    kind: 'nyata',
    distanceLy: 25.0,
    system: 'Lyra',
    coordinates: { x: 38, y: 36 },
    description: 'Bintang kelas A berpiringan debu — pernah menjadi rujukan titik nol magnitudo.'
  },
  {
    id: 'trappist1',
    name: 'TRAPPIST-1',
    kind: 'nyata',
    distanceLy: 40.7,
    system: 'Aquarius',
    coordinates: { x: 42, y: 62 },
    description: 'Tujuh planet berbatu, tiga di antaranya di zona layak huni. Target utama biosignature.'
  },
  {
    id: 'betelgeuse',
    name: 'Betelgeuse',
    kind: 'nyata',
    distanceLy: 548,
    system: 'Orion',
    coordinates: { x: 44, y: 28 },
    description: 'Super raksasa merah yang akan menjadi supernova dalam 100.000 tahun ke depan.'
  },
  {
    id: 'kepler452',
    name: 'Kepler-452b',
    kind: 'nyata',
    distanceLy: 1400,
    system: 'Cygnus',
    coordinates: { x: 68, y: 30 },
    description: 'Eksoplanet di zona layak huni bintang tipe G, dijuluki "sepupu tua Bumi".'
  },
  {
    id: 'sgr-a',
    name: 'Sagittarius A*',
    kind: 'nyata',
    distanceLy: 26_000,
    system: 'Pusat Bima Sakti',
    coordinates: { x: 50, y: 50 },
    description: 'Lubang hitam supermasif 4,1 juta massa Matahari di jantung galaksi.'
  },
  {
    id: 'andromeda',
    name: 'Galaksi Andromeda (M31)',
    kind: 'nyata',
    distanceLy: 2_537_000,
    system: 'Grup Lokal',
    coordinates: { x: 22, y: 18 },
    description: 'Galaksi spiral terdekat, mendekat dengan kecepatan 110 km/detik.'
  },

  // ------------------------------ FIKSI ------------------------------
  {
    id: 'elyria',
    name: 'Elyria',
    kind: 'fiksi',
    distanceLy: 1200,
    system: 'Sektor Aurel',
    coordinates: { x: 72, y: 46 },
    description: 'Surga laut emas milik Aurelians. Semua kapal yang memasuki orbit harus mematikan mesin berat.'
  },
  {
    id: 'halcyon-prime',
    name: 'Halcyon Prime',
    kind: 'fiksi',
    distanceLy: 2400,
    system: 'Sektor Federasi',
    coordinates: { x: 66, y: 66 },
    description: 'Ibu kota Federasi Antarbintang dan pelabuhan tersibuk di jalur Tenunan Perak.'
  },
  {
    id: 'aetheris',
    name: 'Aetheris',
    kind: 'fiksi',
    distanceLy: 2500,
    system: 'Sektor Federasi',
    coordinates: { x: 69, y: 70 },
    description: 'Raksasa gas rumah Zephyrians — kota balon kristal pada ketinggian 900 km.'
  },
  {
    id: 'obsidian-reach',
    name: 'Obsidian Reach',
    kind: 'fiksi',
    distanceLy: 3400,
    system: 'Sektor Sunyi',
    coordinates: { x: 78, y: 54 },
    description: 'Dunia vulkanik Xel\'Tharis dengan kota terapung Vulkarys. Wajib membeli izin masuk.'
  },
  {
    id: 'cryon-veil',
    name: 'Cryon Veil',
    kind: 'fiksi',
    distanceLy: 5100,
    system: 'Sektor Sunyi',
    coordinates: { x: 82, y: 76 },
    description: 'Planet es dengan lautan hangat di kedalaman 14 km dan tambang inti es-besi Vessari.'
  },
  {
    id: 'whisper',
    name: 'Whisper',
    kind: 'fiksi',
    distanceLy: 8700,
    system: 'Sektor Sunyi',
    coordinates: { x: 88, y: 40 },
    description: 'Kabut pikiran Nyx Collective. Zona larangan terbang — semua rute di dekatnya berisiko tinggi.'
  }
];

/** Zona bahaya fiksi: node fiksi yang menciptakan anomali di rutenya. */
export const ANOMALY_ZONES: { near: string; label: string; risk: number; warning: string }[] = [
  {
    near: 'whisper',
    label: 'Zona Sunyi Nyx',
    risk: 14,
    warning:
      'Rute melintasi tepi Zona Sunyi. Komunikasi subspace berisiko diserap mind-mist Nyx — jangan kirim data pribadi.'
  },
  {
    near: 'obsidian-reach',
    label: 'Cincin Obsidian',
    risk: 11,
    warning:
      'Sabuk puing selebar 4 AU di sekitar Obsidian Reach. Aktifkan pelindung debris sebelum masuk.'
  },
  {
    near: 'cryon-veil',
    label: 'Badai Es Cryon',
    risk: 8,
    warning:
      'Hembusan badai es Cryon dapat menutupi sensor optik hingga 40 menit. Beralih ke navigasi sonik Zephyrian.'
  },
  {
    near: 'sgr-a',
    label: 'Tarik Gravitasi Sgr A*',
    risk: 18,
    warning:
      'Delta kecepatan ekstrem di dekat Sagittarius A*. Kebutuhan bahan bakar naik drastis untuk keluar dari sumur gravitasi.'
  },
  {
    near: 'andromeda',
    label: 'Kosong Antar-Galaksi',
    risk: 9,
    warning:
      'Zona antar-galaksi: tidak ada stasiun bahan bakar. Bawa cadangan dilithium minimum 2× estimasi.'
  }
];

export function findTravelNode(id: string): TravelNode | undefined {
  return TRAVEL_NODES.find((node) => node.id === id);
}
