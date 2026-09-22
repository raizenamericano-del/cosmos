import type { PlanetaryBody } from '@/lib/types';

/**
 * Data Tata Surya untuk model 3D & panel edukasi.
 * Nilai fisik mengikuti data NASA (Planetary Fact Sheet) — dibulatkan.
 * `visualRadius` & `orbitRadius` SENGAJA tidak berskala agar nyaman divisualisasikan,
 * sedangkan data angka yang ditampilkan ke pengguna tetap akurat.
 */
export const PLANETARY_BODIES: PlanetaryBody[] = [
  {
    id: 'sun',
    name: 'Matahari',
    slug: 'matahari',
    type: 'bintang',
    order: 0,
    visualRadius: 4.2,
    orbitRadius: 0,
    orbitSpeed: 0,
    rotationSpeed: 0.05,
    diameterKm: 1_392_700,
    distanceFromSun: '0 km (pusat tata surya)',
    temperature: '5.500 °C (permukaan) / 15 juta °C (inti)',
    moons: 0,
    dayLength: '25,4 hari (rotasi ekuator)',
    yearLength: '—',
    composition: '73% hidrogen, 25% helium, 2% unsur berat',
    color: '#ffb703',
    accentColor: '#ff6b00',
    hasRing: false,
    atmosphere: 'Fotosfer, kromosfer, korona (bukan atmosfer padat)',
    description:
      'Matahari adalah bintang deret utama tipe G2V yang menahan 99,86% massa seluruh tata surya. Setiap detiknya, 600 juta ton hidrogen berubah menjadi helium lewat fusi nuklir dan memancarkan energi yang menopang seluruh kehidupan di Bumi.',
    funFacts: [
      'Cahaya Matahari butuh 8 menit 20 detik untuk sampai ke Bumi.',
      'Matahari berumur ±4,6 miliar tahun dan berada di paruh masa hidupnya.',
      'Lapisan korona jauh lebih panas (1 juta °C) daripada permukaannya — masih jadi teka-teki sains.',
      'Butuh 1,3 juta planet Bumi untuk mengisi volume Matahari.'
    ]
  },
  {
    id: 'mercury',
    name: 'Merkurius',
    slug: 'merkurius',
    type: 'planet',
    order: 1,
    visualRadius: 0.5,
    orbitRadius: 9,
    orbitSpeed: 0.48,
    rotationSpeed: 0.25,
    diameterKm: 4_879,
    distanceFromSun: '57,9 juta km (0,39 AU)',
    temperature: '-173 °C hingga 427 °C',
    moons: 0,
    dayLength: '58,6 hari Bumi',
    yearLength: '88 hari Bumi',
    composition: 'Inti besi besar (85% radius), mantel silikat tipis',
    color: '#9ca3af',
    accentColor: '#6b7280',
    hasRing: false,
    atmosphere: 'Eksosfer sangat tipis: oksigen, natrium, hidrogen, helium',
    description:
      'Planet terkecil dan terdekat dari Matahari. Permukaannya penuh kawah mirip Bulan dan suhunya paling ekstrem di tata surya karena atmosfernya nyaris tidak ada untuk menyimpan panas.',
    funFacts: [
      'Satu hari di Merkurius (rotasi) lebih panjang daripada satu tahunnya.',
      'Di kutubnya yang selalu gelap terdapat es air permanen.',
      'Ekornya seperti komet — terbentuk dari partikel yang dilepas angin matahari.',
      'Sudah dikunjungi Mariner 10, MESSENGER, dan BepiColombo.'
    ]
  },
  {
    id: 'venus',
    name: 'Venus',
    slug: 'venus',
    type: 'planet',
    order: 2,
    visualRadius: 0.85,
    orbitRadius: 13,
    orbitSpeed: 0.35,
    rotationSpeed: -0.08,
    diameterKm: 12_104,
    distanceFromSun: '108,2 juta km (0,72 AU)',
    temperature: '465 °C (rata-rata)',
    moons: 0,
    dayLength: '243 hari Bumi (retrograd)',
    yearLength: '225 hari Bumi',
    composition: 'Batuan silikat dengan inti besi-nikel',
    color: '#f5d08a',
    accentColor: '#c98a3a',
    hasRing: false,
    atmosphere: '96% CO₂, 3,5% N₂, awan asam sulfat — tekanan 92× Bumi',
    description:
      'Kembaran ukuran Bumi, tetapi neraka sebenarnya: efek rumah kaca ekstrem membuat Venus planet terpanas di tata surya. Awan asam sulfatnya memantulkan cahaya sehingga Venus jadi "bintang fajar" paling terang.',
    funFacts: [
      'Venus berputar terbalik — Matahari terbit dari barat.',
      'Tekanan permukaannya setara 900 meter kedalaman laut di Bumi.',
      'Hujan asam sulfat menguap sebelum menyentuh permukaan.',
      'Bumi dan Venus hampir kembar dalam ukuran dan massa — jalur evolusinya yang berbeda.'
    ]
  },
  {
    id: 'earth',
    name: 'Bumi',
    slug: 'bumi',
    type: 'planet',
    order: 3,
    visualRadius: 0.9,
    orbitRadius: 17,
    orbitSpeed: 0.28,
    rotationSpeed: 1.1,
    diameterKm: 12_756,
    distanceFromSun: '149,6 juta km (1 AU)',
    temperature: '-89 °C hingga 58 °C (rata-rata 15 °C)',
    moons: 1,
    dayLength: '23 jam 56 menit',
    yearLength: '365,25 hari',
    composition: 'Inti besi-nikel, mantel silikat, kerak batuan + 71% air',
    color: '#3b82f6',
    accentColor: '#22c55e',
    hasRing: false,
    moonsList: ['Bulan (Luna)'],
    atmosphere: '78% N₂, 21% O₂, 0,93% argon + uap air',
    description:
      'Satu-satunya planet yang diketahui memiliki kehidupan. Kombinasi jarak ideal dari Matahari, medan magnet pelindung, lapisan ozon, dan air cair menjadikan Bumi "zona Goldilocks" bagi kehidupan.',
    funFacts: [
      'Bumi bukan bola sempurna — menggelembung 21 km di ekuator karena rotasi.',
      'Medan magnet Bumi melindungi kita dari angin matahari.',
      'Lebih dari 80% samudra Bumi belum dipetakan secara rinci.',
      'Bulan menjauh dari Bumi ±3,8 cm per tahun.'
    ]
  },
  {
    id: 'mars',
    name: 'Mars',
    slug: 'mars',
    type: 'planet',
    order: 4,
    visualRadius: 0.65,
    orbitRadius: 21,
    orbitSpeed: 0.22,
    rotationSpeed: 1.05,
    diameterKm: 6_792,
    distanceFromSun: '227,9 juta km (1,52 AU)',
    temperature: '-143 °C hingga 35 °C',
    moons: 2,
    dayLength: '24 jam 37 menit',
    yearLength: '687 hari Bumi',
    composition: 'Kerak kaya oksida besi (warna merah), inti besi-sulfida',
    color: '#e2725b',
    accentColor: '#b45309',
    hasRing: false,
    moonsList: ['Phobos', 'Deimos'],
    atmosphere: '95% CO₂ tipis — tekanan hanya 1% Bumi',
    description:
      'Planet merah yang paling ramah bagi penjelajahan robot dan misi berawak. Bukti geologis menunjukkan Mars pernah memiliki sungai, danau, dan mungkin lautan miliaran tahun lalu. Kini menjadi target utama kolonisasi manusia.',
    funFacts: [
      'Olympus Mons tingginya 22 km — hampir 3× Everest.',
      'Lembah Valles Marineris membentang 4.000 km, sepanjang Amerika Serikat.',
      'Badai debu di Mars bisa menutupi seluruh planet selama berbulan-bulan.',
      'Saat ini ada beberapa rover & helikopter aktif di Mars (Perseverance, Curiosity, Ingenuity).'
    ]
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    slug: 'jupiter',
    type: 'planet-katai',
    order: 5,
    visualRadius: 2.2,
    orbitRadius: 28,
    orbitSpeed: 0.12,
    rotationSpeed: 2.4,
    diameterKm: 142_984,
    distanceFromSun: '778,5 juta km (5,2 AU)',
    temperature: '-145 °C (puncak awan)',
    moons: 95,
    dayLength: '9 jam 56 menit',
    yearLength: '11,9 tahun Bumi',
    composition: 'Hidrogen & helium, kemungkinan inti batuan/es',
    color: '#e0b18a',
    accentColor: '#a16207',
    hasRing: true,
    moonsList: ['Io', 'Europa', 'Ganymede', 'Callisto'],
    atmosphere: '90% H₂, 10% He, jejak metana dan amonia',
    description:
      'Raksasa gas terbesar — massa Jupiter 2,5× gabungan seluruh planet lain. Bintik Merah Besar adalah badai antisiklon yang sudah berlangsung lebih dari 300 tahun dan cukup besar untuk menelan Bumi.',
    funFacts: [
      'Rotasi tercepat: satu hari hanya 10 jam.',
      'Ganymede adalah bulan terbesar di tata surya — lebih besar dari Merkurius.',
      'Europa menyembunyikan lautan air asin di bawah lapisan esnya.',
      'Medan magnet Jupiter 20.000× lebih kuat dari Bumi.'
    ]
  },
  {
    id: 'saturn',
    name: 'Saturnus',
    slug: 'saturnus',
    type: 'planet-katai',
    order: 6,
    visualRadius: 1.9,
    orbitRadius: 35,
    orbitSpeed: 0.09,
    rotationSpeed: 2.2,
    diameterKm: 120_536,
    distanceFromSun: '1,43 miliar km (9,5 AU)',
    temperature: '-178 °C (puncak awan)',
    moons: 146,
    dayLength: '10 jam 42 menit',
    yearLength: '29,4 tahun Bumi',
    composition: 'Hidrogen & helium, kepadatan terendah di tata surya',
    color: '#f2d6a2',
    accentColor: '#d97706',
    hasRing: true,
    moonsList: ['Titan', 'Enceladus', 'Mimas', 'Rhea'],
    atmosphere: '96% H₂, 3% He, jejak metana',
    description:
      'Permata tata surya dengan sistem cincin paling megah. Cincinnya tersusun dari miliaran bongkahan es dan batuan dengan lebar 280.000 km namun tebal rata-rata hanya puluhan meter.',
    funFacts: [
      'Kepadatan Saturnus 0,687 g/cm³ — secara teori bisa "mengapung" di air.',
      'Titan punya atmosfer tebal dan danau metana cair.',
      'Enceladus menyemburkan geiser air dari laut bawah permukaannya.',
      'Di kutub utara Saturnus ada badai berbentuk segi enam raksasa.'
    ]
  },
  {
    id: 'uranus',
    name: 'Uranus',
    slug: 'uranus',
    type: 'planet-katai',
    order: 7,
    visualRadius: 1.4,
    orbitRadius: 41,
    orbitSpeed: 0.06,
    rotationSpeed: 1.4,
    diameterKm: 51_118,
    distanceFromSun: '2,87 miliar km (19,2 AU)',
    temperature: '-224 °C (terdingin di tata surya)',
    moons: 28,
    dayLength: '17 jam 14 menit',
    yearLength: '84 tahun Bumi',
    composition: 'Raksasa es: air, metana, amonia di atas inti batuan',
    color: '#93e6e9',
    accentColor: '#0891b2',
    hasRing: true,
    moonsList: ['Titania', 'Oberon', 'Miranda', 'Ariel'],
    atmosphere: '83% H₂, 15% He, 2% metana (penyebab warna biru-hijau)',
    description:
      'Raksasa es yang "berbaring" — porosnya miring 98° sehingga menggelinding saat mengorbit. Uranus adalah planet terdingin dan hampir tidak punya cuaca internal, kecuali badai metana sesaat.',
    funFacts: [
      'Kemiringan 98° membuat satu kutubnya gelap selama 42 tahun.',
      'Baru dikunjungi sekali oleh manusia: Voyager 2 pada 1986.',
      'Memiliki 13 cincin tipis yang gelap.',
      'Kemungkinan hujan berlian terjadi di mantelnya.'
    ]
  },
  {
    id: 'neptune',
    name: 'Neptunus',
    slug: 'neptunus',
    type: 'planet-katai',
    order: 8,
    visualRadius: 1.35,
    orbitRadius: 47,
    orbitSpeed: 0.045,
    rotationSpeed: 1.5,
    diameterKm: 49_528,
    distanceFromSun: '4,5 miliar km (30,1 AU)',
    temperature: '-214 °C (rata-rata)',
    moons: 16,
    dayLength: '16 jam 6 menit',
    yearLength: '165 tahun Bumi',
    composition: 'Raksasa es dengan inti batuan dan mantel air-metana',
    color: '#3b6ff5',
    accentColor: '#1d4ed8',
    hasRing: true,
    moonsList: ['Triton', 'Proteus', 'Nereid'],
    atmosphere: '80% H₂, 19% He, 1,5% metana',
    description:
      'Planet terjauh dari Matahari, ditemukan lewat perhitungan matematika sebelum benar-benar terlihat. Angin di Neptunus adalah yang tercepat di tata surya: mencapai 2.100 km/jam.',
    funFacts: [
      'Satu tahun Neptunus = 165 tahun Bumi (baru selesai 1 orbit sejak 1846 pada 2011).',
      'Angin tercepat di tata surya — sampai 2.100 km/jam.',
      'Triton mengorbit terbalik dan mungkin objek Kuiper Belt yang tertangkap.',
      'Mengalami "musim" selama 40 tahun per musim.'
    ]
  }
];

export const SOLAR_SYSTEM_SUMMARY = {
  age: '4,6 miliar tahun',
  planets: 8,
  dwarfPlanets: 5,
  knownMoons: 290,
  asteroidBeltWidth: '±150 juta km (antara Mars & Jupiter)',
  kuiperBelt: '30–50 AU dari Matahari',
  heliopause: '±123 AU (batas pengaruh angin matahari)',
  sunMassShare: '99,86% massa tata surya'
} as const;

export function findBody(slug: string): PlanetaryBody | undefined {
  return PLANETARY_BODIES.find((body) => body.slug === slug);
}
