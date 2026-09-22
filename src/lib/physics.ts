/**
 * ============================================================
 * RUMUS FISIKA LUBANG HITAM — 📚 bagian akurat secara sains
 * Satuan: massa Matahari (M☉), km, Kelvin, tahun, kg/m³.
 * Konstanta: G = 6,674×10⁻¹¹ m³kg⁻¹s⁻², c = 2,998×10⁸ m/s,
 *            ħ = 1,055×10⁻³⁴ J·s, k_B = 1,381×10⁻²³ J/K
 * ============================================================
 */

export const G = 6.674e-11;
export const C = 2.998e8;
export const HBAR = 1.055e-34;
export const KB = 1.381e-23;
export const MASS_SUN_KG = 1.989e30;
export const LIGHT_YEAR_KM = 9.461e12;

/** Radius Schwarzschild: R_s = 2GM/c²  (untuk 1 M☉ ≈ 2,95 km) */
export function schwarzschildRadiusKm(massSolar: number): number {
  return (2 * G * massSolar * MASS_SUN_KG) / (C * C) / 1000;
}

/** Suhu Hawking: T = ħc³ / (8πGMk_B) → 6,17×10⁻⁸ / M Kelvin */
export function hawkingTemperature(massSolar: number): number {
  return (HBAR * C ** 3) / (8 * Math.PI * G * massSolar * MASS_SUN_KG * KB);
}

/** Waktu penguapan Hawking: ± 2,1×10⁶⁷ × M³ tahun */
export function evaporationTimeYears(massSolar: number): number {
  return 2.1e67 * massSolar ** 3;
}

/** Photon sphere: 1,5 × R_s */
export function photonSphereKm(massSolar: number): number {
  return 1.5 * schwarzschildRadiusKm(massSolar);
}

/** ISCO (Innermost Stable Circular Orbit) untuk lubang hitam non-rotasi: 3 × R_s */
export function iscoKm(massSolar: number): number {
  return 3 * schwarzschildRadiusKm(massSolar);
}

/** Gradien gaya pasang (tidal) di horizon: Δa = 2GM/r³ (m/s² per meter) */
export function tidalGradientAtHorizon(massSolar: number): number {
  const radiusMeters = schwarzschildRadiusKm(massSolar) * 1000;
  return (2 * G * massSolar * MASS_SUN_KG) / radiusMeters ** 3;
}

/** Faktor dilatasi waktu untuk pengamat diam di jarak r = n × R_s */
export function timeDilationFactor(massSolar: number, rOverRs: number): number {
  void massSolar;
  if (rOverRs <= 1) return 0;
  return Math.sqrt(1 - 1 / rOverRs);
}

/** Massa jenis rata-rata di dalam horizon (kg/m³) */
export function densityKgPerM3(massSolar: number): number {
  const radiusMeters = schwarzschildRadiusKm(massSolar) * 1000;
  return (massSolar * MASS_SUN_KG) / ((4 / 3) * Math.PI * radiusMeters ** 3);
}

export interface SizeComparison {
  label: string;
  reference: string;
  ratio: number;
  scale: string;
}

/** Bandingkan radius horizon dengan objek yang dikenal. */
export function sizeComparisons(radiusKm: number): SizeComparison[] {
  const references: { label: string; reference: string; km: number }[] = [
    { label: 'Manusia (±1,8 m)', reference: '2×10⁻¹⁵ km', km: 1.8e-3 / 1000 },
    { label: 'Bumi', reference: '6.371 km', km: 6371 },
    { label: 'Matahari', reference: '696.340 km', km: 696_340 },
    { label: 'Orbit Bulan', reference: '384.400 km', km: 384_400 },
    { label: 'Orbit Bumi (1 AU)', reference: '149,6 juta km', km: 1.496e8 },
    { label: 'Orbit Neptunus', reference: '4,5 miliar km', km: 4.5e9 }
  ];

  return references.map((item) => {
    const ratio = radiusKm / item.km;
    return {
      label: item.label,
      reference: item.reference,
      ratio,
      scale:
        ratio >= 1
          ? `${ratio.toFixed(ratio >= 100 ? 0 : 2).replace('.', ',')}× lebih besar`
          : `${(1 / ratio).toFixed(1 / ratio >= 100 ? 0 : 2).replace('.', ',')}× lebih kecil`
    };
  });
}

const SUPERSCRIPTS = '⁰¹²³⁴⁵⁶⁷⁸⁹';

export function superscript(value: string): string {
  return value
    .split('')
    .map((char) => {
      if (char === '-') return '⁻';
      const index = '0123456789'.indexOf(char);
      return index >= 0 ? SUPERSCRIPTS[index] : char;
    })
    .join('');
}

/** Format ilmiah gaya Indonesia: 1,85 × 10¹⁹ */
export function formatScientific(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return '∞';
  if (value === 0) return '0';
  const exponent = Math.floor(Math.log10(Math.abs(value)));
  if (exponent >= -3 && exponent <= 4) {
    return value.toLocaleString('id-ID', { maximumFractionDigits: digits });
  }
  const mantissa = value / 10 ** exponent;
  return `${mantissa.toFixed(digits).replace('.', ',')} × 10${superscript(String(exponent))}`;
}

/** Massa lubang hitam terkenal sebagai preset slider. */
export const BLACK_HOLE_PRESETS = [
  { label: 'Bintang (1 M☉)', massSolar: 1, note: 'Radius horizon ±2,95 km' },
  { label: 'Cygnus X-1 (21 M☉)', massSolar: 21, note: 'Lubang hitam pertama yang teridentifikasi' },
  { label: 'V404 Cygni (9 M☉)', massSolar: 9, note: 'Sistem biner dengan bintang pendonor' },
  { label: 'Sgr A* (4,1 juta M☉)', massSolar: 4.1e6, note: 'Jantung Bima Sakti' },
  { label: 'M87* (6,5 miliar M☉)', massSolar: 6.5e9, note: 'Lubang hitam pertama yang dipotret' },
  { label: 'TON 618 (66 miliar M☉)', massSolar: 6.6e10, note: 'Salah satu yang termasif diketahui' }
] as const;

export const BLACK_HOLE_EDUCATION = [
  {
    id: 'horizon',
    title: 'Event Horizon',
    icon: '⭕',
    body: [
      'Event horizon adalah batas imajiner di sekitar lubang hitam. Di luar batas ini, cahaya dan materi masih bisa lolos; di dalamnya, kecepatan lepas melebihi kecepatan cahaya sehingga tidak ada informasi yang bisa keluar.',
      'Karena tidak ada yang bisa keluar, event horizon berperan seperti "permukaan informasi" satu arah. Bagi pengamat jauh, objek yang jatuh ke dalamnya tampak melambat dan memerah tanpa pernah benar-benar masuk — inilah dilatasi waktu gravitasi yang diprediksi relativitas umum.'
    ]
  },
  {
    id: 'singularitas',
    title: 'Singularitas',
    icon: '✴️',
    body: [
      'Singularitas adalah titik di pusat lubang hitam di mana kepadatan dan kelengkungan ruang-waktu menjadi tak terhingga menurut relativitas umum. Di titik ini, persamaan Einstein tidak lagi memberikan jawaban.',
      'Para fisikawan menduga singularitas bukan fenomena nyata, melainkan tanda bahwa teori relativitas umum perlu digantikan oleh teori gravitasi kuantum — kandidatnya antara lain teori string dan gravitasi kuantum loop.'
    ]
  },
  {
    id: 'hawking',
    title: 'Radiasi Hawking',
    icon: '🔥',
    body: [
      'Ruang hampa secara kuantum dapat melahirkan pasangan partikel-antipartikel virtual. Di tepi event horizon, salah satunya bisa lolos sebelum sempat musnah, sedangkan pasangannya masuk ke dalam lubang hitam. Efeknya: lubang hitam memancarkan radiasi dan perlahan kehilangan massa.',
      'Untuk lubang hitam bermassa bintang, suhu Hawking hanya sekitar 10⁻⁸ Kelvin — praktis tidak terdeteksi. Namun lubang hitam bermassa sangat kecil akan "menguap" cepat dan berakhir dengan ledakan energi besar.'
    ]
  },
  {
    id: 'disk',
    title: 'Piringan Akresi & Jet',
    icon: '🌀',
    body: [
      'Materi yang jatuh ke lubang hitam tidak langsung masuk: ia membentuk piringan akresi yang berputar sangat cepat. Gesekan membuat bagian dalam piringan memanas hingga jutaan derajat dan memancarkan sinar-X.',
      'Sebagian energi juga dilempar dalam bentuk jet relativistik dari kedua kutub. Di galaksi aktif, jet semacam ini bisa membentang jutaan tahun cahaya. Efek Doppler membuat sisi piringan yang mendekat terlihat jauh lebih terang — itulah sebabnya citra M87* tidak simetris.'
    ]
  }
] as const;
