import type { EngineType, TravelNode, TravelPlan } from '@/lib/types';
import { ANOMALY_ZONES, findTravelNode } from '@/lib/data/travel-nodes';
import { clamp, formatDuration, formatLightYears, hashString } from '@/lib/utils';

/**
 * ============================================================
 * INTERSTELLAR TRAVEL SIMULATOR — mesin perhitungan 🛸 FIKSI
 * Jarak dihitung dengan hukum kosinus pada proyeksi cakram galaksi:
 *   d = √(dA² + dB² − 2·dA·dB·cos Δθ)
 * sehingga rute dari Matahari (dA = 0) menghasilkan jarak nyata
 * dari bintang tujuan, sementara rute antar-dua bintang memperhitungkan
 * pisah sudut pada peta galaksi.
 * ============================================================
 */

export interface EngineSpec {
  id: EngineType;
  label: string;
  shortLabel: string;
  description: string;
  /** Kecepatan efektif dalam tahun cahaya per jam */
  speedLyPerHour: number;
  /** Unit dilithium per tahun cahaya */
  fuelPerLy: number;
  /** Bonus risiko anomali (%) — mesin lebih agresif = risiko lebih tinggi */
  riskBonus: number;
  accent: string;
  manufacturer: string;
}

export const ENGINES: Record<EngineType, EngineSpec> = {
  warp: {
    id: 'warp',
    label: 'Warp Drive — Tenunan Perak',
    shortLabel: 'Warp Drive',
    description:
      'Mesin standar Federasi yang "menenun" ruang di depan dan belakang kapal. Stabil, hemat, tetapi tidak bisa menembus jarak antar-galaksi.',
    speedLyPerHour: 1.08,
    fuelPerLy: 0.9,
    riskBonus: 0,
    accent: '#22d3ee',
    manufacturer: 'Vessari Shipyard, Halcyon Prime'
  },
  hyperspace: {
    id: 'hyperspace',
    label: 'Hyperspace Jump — Kelas Nyx',
    shortLabel: 'Hyperspace',
    description:
      'Melompat ke lapisan ruang dimensi keempat. Sangat cepat, tetapi setiap lompatan meninggalkan jejak yang bisa dilacak Xel\'Tharis.',
    speedLyPerHour: 20.5,
    fuelPerLy: 4.2,
    riskBonus: 7,
    accent: '#8b5cf6',
    manufacturer: 'Reverse-engineered dari teknologi Nyx Collective'
  },
  lightfold: {
    id: 'lightfold',
    label: 'Lightfold — Prototipe Aurelian',
    shortLabel: 'Lightfold',
    description:
      'Melipat lintasan cahaya menjadi jalur tunggal. Teknologi eksperimental Aurelians; tanpa presisi tinggi, kapal bisa muncul di tempat yang salah.',
    speedLyPerHour: 137,
    fuelPerLy: 11.6,
    riskBonus: 15,
    accent: '#facc15',
    manufacturer: 'Laboratorium Akar Elyria (eksperimental)'
  }
};

export const ENGINE_LIST: EngineSpec[] = Object.values(ENGINES);

/** Sudut posisi node pada peta galaksi (radian). */
function angleOf(node: TravelNode): number {
  return Math.atan2(node.coordinates.y - 50, node.coordinates.x - 50);
}

export function routeDistance(origin: TravelNode, destination: TravelNode): number {
  const dA = origin.distanceLy;
  const dB = destination.distanceLy;
  if (dA === 0 && dB === 0) return 0.01;
  const deltaAngle = Math.abs(angleOf(origin) - angleOf(destination));
  const distanceSquared = dA * dA + dB * dB - 2 * dA * dB * Math.cos(deltaAngle);
  const distance = Math.sqrt(Math.max(distanceSquared, 0));
  // Rute dalam sistem yang sama tidak pernah nol (butuh manuver sub-cahaya)
  return Math.max(distance, origin.id === destination.id ? 0.001 : 0.02);
}

function buildBoardingCode(origin: TravelNode, destination: TravelNode, engine: EngineType): string {
  const seed = hashString(`${origin.id}:${destination.id}:${engine}`);
  const letters = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const part = (value: number, length: number, alphabet: string) => {
    let result = '';
    let rest = value;
    for (let i = 0; i < length; i += 1) {
      result += alphabet[rest % alphabet.length];
      rest = Math.floor(rest / alphabet.length) + 7;
    }
    return result;
  };
  return `CA-${part(seed, 4, letters)}-${part(seed * 31, 4, '0123456789')}`;
}

export function planTravel(
  originId: string,
  destinationId: string,
  engineType: EngineType
): { ok: true; plan: TravelPlan } | { ok: false; error: string } {
  const origin = findTravelNode(originId);
  const destination = findTravelNode(destinationId);
  const engine = ENGINES[engineType];

  if (!origin || !destination) {
    return { ok: false, error: 'Titik asal atau tujuan tidak dikenali oleh navigasi galaksi.' };
  }
  if (!engine) {
    return { ok: false, error: 'Jenis mesin tidak tersedia di hanggar.' };
  }
  if (origin.id === destination.id) {
    return { ok: false, error: 'Titik asal dan tujuan tidak boleh sama, Navigator.' };
  }

  const distanceLy = routeDistance(origin, destination);
  const durationHours = Math.max(distanceLy / engine.speedLyPerHour, 0.01);
  const fuelUnits = Math.max(Math.ceil(distanceLy * engine.fuelPerLy), 1);

  // Risiko anomali: dasar + jarak (logaritmik) + mesin + zona bahaya + variasi deterministik
  const jitter = (hashString(`${origin.id}${destination.id}${engineType}`) % 600) / 100;
  const zoneHits = ANOMALY_ZONES.filter(
    (zone) => zone.near === origin.id || zone.near === destination.id
  );
  const zoneRisk = zoneHits.reduce((total, zone) => total + zone.risk, 0);
  const rawRisk =
    1.5 + Math.log10(distanceLy + 1) * 5.5 + engine.riskBonus + zoneRisk + (jitter - 3);
  const anomalyRisk = Math.round(clamp(rawRisk, 1, 97));

  const riskLabel: TravelPlan['riskLabel'] =
    anomalyRisk < 10 ? 'rendah' : anomalyRisk < 25 ? 'sedang' : anomalyRisk < 50 ? 'tinggi' : 'kritis';

  const warnings: string[] = [];
  if (engine.id === 'lightfold' && distanceLy > 1000) {
    warnings.push(
      'Lightfold melipat cahaya: pada jarak ini deviasi koordinat keluar bisa mencapai 40 tahun cahaya. Pastikan kalibrasi ulang.'
    );
  }
  if (engine.id === 'hyperspace') {
    warnings.push(
      "Jejak lompatan hyperspace mudah dilacak. Pelacak Echo Hunt Xel'Tharis memiliki jangkauan hingga 3 sistem bintang."
    );
  }
  if (distanceLy > 100_000) {
    warnings.push(
      'Misi antar-galaksi: tidak ada stasiun penyelamat. Semua keputusan akhir ada di tangan kapten.'
    );
  }
  zoneHits.forEach((zone) => warnings.push(`[${zone.label}] ${zone.warning}`));
  if (warnings.length === 0) {
    warnings.push('Rute bersih. Tidak ada anomali signifikan terdeteksi di jalur terpilih.');
  }

  const routeLog = [
    `Sistem navigasi mengunci tujuan: ${destination.name} (${destination.system}).`,
    `Mesin ${engine.shortLabel} dinyalakan — dorongan kalkulasi ${engine.speedLyPerHour} ly/jam.`,
    `Jarak tempuh terhitung ${formatLightYears(distanceLy)}.`,
    `Melintasi heliopause sistem asal, beralih ke mode kalkulasi mandiri.`,
    distanceLy > 50
      ? 'Mesin menjalankan koreksi jalur otomatis setiap 4 jam untuk menghindari gravitasi lintang bintang.'
      : 'Tidak ada objek bermassa besar pada jalur — perjalanan mulus.',
    destination.kind === 'fiksi'
      ? `Permintaan izin masuk dikirim ke otoritas ${destination.name}. Tunggu balasan.`
      : 'Protokol komunikasi standar ISO-9000-Subspace diaktifkan.',
    `Estimasi tiba: ${formatDuration(durationHours)} sejak keberangkatan.`
  ];

  return {
    ok: true,
    plan: {
      origin,
      destination,
      engine: engine.id,
      engineLabel: engine.label,
      distanceLy,
      durationHours,
      durationLabel: formatDuration(durationHours),
      fuelUnits,
      anomalyRisk,
      riskLabel,
      warnings,
      routeLog,
      boardingCode: buildBoardingCode(origin, destination, engine.id)
    }
  };
}

export const BOARDING_PASS_NOTE =
  'Dokumen ini diterbitkan oleh Cosmos Academy untuk keperluan FIKsi ilmiah. Tidak berlaku di rute nyata mana pun di alam semesta yang diketahui.';
