import type { SpaceWeatherReport } from '@/lib/types';
import { hashString, seededPick, seededRandom, todayIso } from '@/lib/utils';

/**
 * ============================================================
 * PRAKIRAAN CUACA ANTARIKSA — 🛸 FIKSI ILMIAH (dengan dasar astronomi)
 * Data dibangkitkan dengan seed = tanggal hari ini pada zona Asia/Jakarta,
 * sehingga prakiraan KONSISTEN sepanjang hari dan berubah keesokan harinya.
 * ============================================================
 */

interface WeatherEvent {
  location: string;
  condition: string;
  icon: string;
  advice: string;
  minProbability: number;
  maxProbability: number;
}

const WEATHER_POOL: WeatherEvent[] = [
  {
    location: 'Mars — Valles Marineris',
    condition: 'Hujan meteor deras',
    icon: '☄️',
    advice: 'Bawa payung anti-impak dan tinggalkan drone di shelter bawah tanah.',
    minProbability: 60,
    maxProbability: 95
  },
  {
    location: 'Bumi — Orbit Rendah (LEO)',
    condition: 'Ramai lalu lintas satelit',
    icon: '🛰️',
    advice: 'Tunda spacewalk. Katalog puing sudah diperbarui 2 jam lalu.',
    minProbability: 40,
    maxProbability: 80
  },
  {
    location: 'Proxima Centauri b',
    condition: 'Badai plasma bintang',
    icon: '⚡',
    advice: 'Jangan keluar stasiun. Flare katai merah bisa memutus komunikasi 6 jam.',
    minProbability: 55,
    maxProbability: 92
  },
  {
    location: 'Luar Sabuk Kuiper',
    condition: 'Kabut kosmik pekat',
    icon: '🌫️',
    advice: 'Visibilitas rendah. Aktifkan radar jarak jauh dan turunkan kecepatan 30%.',
    minProbability: 30,
    maxProbability: 70
  },
  {
    location: 'Awan Oort',
    condition: 'Hujan komet periode panjang',
    icon: '❄️',
    advice: 'Objek es bergerak cepat. Prioritaskan manuver menghindar di atas pemindaian.',
    minProbability: 20,
    maxProbability: 60
  },
  {
    location: 'Sabuk Asteroid — Ceres',
    condition: 'Debu silikat tipis',
    icon: '🪨',
    advice: 'Aman untuk kapal berpelindung ganda. Bersihkan filter interseptor debu.',
    minProbability: 25,
    maxProbability: 65
  },
  {
    location: 'Magnetosfer Jupiter',
    condition: 'Radiasi partikel tinggi',
    icon: '☢️',
    advice: 'Batasi EVA maksimal 12 menit. Dosis kumulatif astronaut wajib dilaporkan.',
    minProbability: 65,
    maxProbability: 96
  },
  {
    location: 'Titan (Saturnus)',
    condition: 'Hujan metana ringan',
    icon: '🌧️',
    advice: 'Cocok untuk pengambilan sampel danau metana. Lindungi peralatan dari kondensat.',
    minProbability: 35,
    maxProbability: 75
  },
  {
    location: 'Enceladus',
    condition: 'Geiser air asin aktif',
    icon: '💧',
    advice: 'Peluang mengumpulkan sampel laut bawah permukaan: tinggi. Bawa tabung steril.',
    minProbability: 50,
    maxProbability: 88
  },
  {
    location: 'Venus — Puncak Awan',
    condition: 'Angin super-rotasi 360 km/jam',
    icon: '🌪️',
    advice: 'Balon riset harus menyesuaikan ketinggian. Tekanan 92× Bumi tetap jadi ancaman.',
    minProbability: 55,
    maxProbability: 90
  },
  {
    location: 'Elyria (sektor Aurel)',
    condition: 'Malam bioluminesen sempurna',
    icon: '✨',
    advice: 'Cuaca ideal untuk observasi laut emas. Hormati batas zona hutan luminescen.',
    minProbability: 70,
    maxProbability: 99
  },
  {
    location: 'Obsidian Reach',
    condition: 'Hujan abu vulkanik & listrik statis',
    icon: '🌋',
    advice: 'Kota Vulkarys menutup dek luar selama 18 jam. Bahan bakar dilithium diperdagangkan 2× harga.',
    minProbability: 60,
    maxProbability: 95
  },
  {
    location: 'Whisper (Zona Sunyi)',
    condition: 'Gangguan mind-mist',
    icon: '🌀',
    advice: 'Hindari total. Setiap sinyal yang kamu kirim akan tercatat oleh Nyx Collective.',
    minProbability: 80,
    maxProbability: 100
  },
  {
    location: 'Cryon Veil',
    condition: 'Badai es inti',
    icon: '🧊',
    advice: 'Sensor optik tertutup hingga 40 menit. Beralih ke navigasi sonik Zephyrian.',
    minProbability: 45,
    maxProbability: 85
  },
  {
    location: 'Halcyon Prime',
    condition: 'Cuaca distrik: terkendali',
    icon: '🏙️',
    advice: 'Semua distrik bertekanan normal. Antrean dok masuk 3 jam — pesan slot lebih awal.',
    minProbability: 85,
    maxProbability: 99
  },
  {
    location: 'Aetheris',
    condition: 'Aliran jet menengah stabil',
    icon: '🎈',
    advice: 'Waktu terbaik menyewa balon kristal Zephyrian. Bawa pemberat tambahan untuk turun.',
    minProbability: 50,
    maxProbability: 85
  },
  {
    location: 'Sagittarius A* (orbit pengamatan)',
    condition: 'Flare sinar-X dari piringan akresi',
    icon: '🕳️',
    advice: 'Jaga jarak minimum 20 AU dari event horizon. Penundaan waktu mulai terukur.',
    minProbability: 40,
    maxProbability: 88
  },
  {
    location: 'TRAPPIST-1',
    condition: 'Suar katai merah M8',
    icon: '🔴',
    advice: 'Planet e dan f terpapar radiasi. Sensor biosignature sebaiknya menunggu jendela tenang.',
    minProbability: 45,
    maxProbability: 85
  },
  {
    location: 'Betelgeuse (observasi aman)',
    condition: 'Debu bintang terlepas',
    icon: '🌠',
    advice: 'Jangan lebih dekat dari 3 tahun cahaya. Bintang ini sudah siap meledak kapan saja.',
    minProbability: 30,
    maxProbability: 70
  },
  {
    location: 'Galaksi Andromeda (jalur antar)',
    condition: 'Kosong antar-galaksi sunyi',
    icon: '🌌',
    advice: 'Tidak ada cuaca, tidak ada pengisian bahan bakar. Catat konsumsi dilithium manual.',
    minProbability: 15,
    maxProbability: 45
  }
];

const WIND_POOL = [
  '124 km/jam (angin matahari)',
  '310 km/jam (aliran jet awan)',
  '42 km/jam (arus ionik tenang)',
  '870 km/jam (badai plasma lokal)',
  '2.100 km/jam (angin Neptunus kelas ekstrem)',
  '18 km/jam (arus kabin distrik)'
];

const RADIATION_POOL = [
  'Rendah (0,4 mSv/hari) — aman untuk kru',
  'Sedang (1,8 mSv/hari) — batasi EVA 30 menit',
  'Tinggi (7,4 mSv/hari) — gunakan pelindung ganda',
  'Ekstrem (21 mSv/hari) — hanya drone yang keluar'
];

const VISIBILITY_POOL = [
  'Sangat baik — cakrawala galaksi terlihat jelas',
  'Baik — sedikit distorsi dari debu antar bintang',
  'Sedang — nebula menutupi 40% pandangan sensor',
  'Rendah — instrumen optik nyaris tidak berguna',
  'Nol — navigasi butuh referensi pulsar'
];

const HOUR_SLOTS = ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];

export function generateSpaceWeather(dateIso: string = todayIso()): SpaceWeatherReport {
  const rand = seededRandom(hashString(`cosmos-weather-${dateIso}`));

  const headlineEvent = seededPick(WEATHER_POOL, rand);
  const secondary = WEATHER_POOL.filter((event) => event.location !== headlineEvent.location);
  const reports: WeatherEvent[] = [headlineEvent];
  for (let i = 0; i < 3; i += 1) {
    const picked = seededPick(secondary, rand);
    reports.push(picked);
  }

  const probabilityOf = (event: WeatherEvent) =>
    Math.round(event.minProbability + rand() * (event.maxProbability - event.minProbability));

  const headlineProbability = probabilityOf(headlineEvent);

  const hourly = HOUR_SLOTS.map((time) => {
    const event = seededPick(WEATHER_POOL, rand);
    return {
      time,
      condition: event.condition,
      icon: event.icon,
      probability: probabilityOf(event)
    };
  });

  return {
    date: dateIso,
    headline: `${headlineEvent.condition} di ${headlineEvent.location}: ${headlineProbability}%`,
    location: headlineEvent.location,
    condition: headlineEvent.condition,
    icon: headlineEvent.icon,
    probability: headlineProbability,
    advice: headlineEvent.advice,
    windSpeed: seededPick(WIND_POOL, rand),
    radiation: seededPick(RADIATION_POOL, rand),
    visibility: seededPick(VISIBILITY_POOL, rand),
    hourly
  };
}

/** Prakiraan untuk beberapa lokasi sekaligus (dipakai grid kartu). */
export function generateLocationForecasts(dateIso: string = todayIso(), count = 6) {
  const rand = seededRandom(hashString(`cosmos-weather-locations-${dateIso}`));
  const shuffled = [...WEATHER_POOL];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count).map((event) => ({
    location: event.location,
    condition: event.condition,
    icon: event.icon,
    advice: event.advice,
    probability: Math.round(
      event.minProbability + rand() * (event.maxProbability - event.minProbability)
    )
  }));
}
