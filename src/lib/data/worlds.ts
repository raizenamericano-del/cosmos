import type { FictionalPlanet } from '@/lib/types';

/**
 * ============================================================
 * ATLAS DUNIA FIKSI — 🛸 FIKSI ILMIAH
 * Terhubung langsung dengan `species.ts` melalui nama penghuni.
 * ============================================================
 */
export const FICTIONAL_PLANETS: FictionalPlanet[] = [
  {
    id: 'fp-elyria',
    name: 'Elyria',
    slug: 'elyria',
    tagline: 'Surga laut emas di tepi lengan spiral',
    description:
      'Elyria adalah planet paling tenang di Atlas. Lautannya bukan air biasa — kandungan mineral logam mulia membuatnya berkilau seperti emas cair saat bintang induknya menyentuh cakrawala, dan bercahaya biru pucat di malam hari melalui bioluminesensi plankton raksasa. Seluruh daratannya hanya 12% dari permukaan, tersusun dari kepulauan karang raksasa yang saling terhubung oleh jembatan akar pohon luminescen. Aurelians menjaga setiap jengkal planet ini seperti merawat makhluk hidup — karena bagi mereka, Elyria memang hidup.',
    atmosphere:
      'Nitrogen-oksigen dengan kadar uap air tinggi (82% kelembapan). Tidak ada badai merusak; hujan turun setiap 9 hari dan terasa hangat seperti kabut pagi.',
    inhabitants: 'Aurelians (penjaga hutan luminescen), biota laut fotosintetik raksasa',
    resources: ['Laut emas cair (aurum-7)', 'Kayu cahaya Aurel', 'Biji restoratif Elyrian', 'Spora bioluminesen'],
    dangerLevel: 1,
    beautyScore: 10,
    themeColor: '#facc15',
    gradientFrom: '#facc15',
    gradientTo: '#22c55e'
  },
  {
    id: 'fp-obsidian-reach',
    name: 'Obsidian Reach',
    slug: 'obsidian-reach',
    tagline: 'Dunia vulkanik, kota-kota yang mengambang di atas asap',
    description:
      'Dahulu bernama Xel\'Thar — sebuah dunia biasa yang hancur ketika klan Xel\'Tharis menyalakan bintang mereka sendiri. Kini permukaannya adalah hamparan obsidian retak dengan suhu di atas 400 derajat, sungai magma selebar 20 km, dan atmosfer beracun yang tidak pernah berhenti bergolak. Peradaban bertahan hidup dengan membangun Vulkarys: kota terapung setinggi 14 km yang ditahan oleh reaktor plasma panas bumi, dihubungkan jembatan magnetik. Di bawah sana, sisa-sisa perang masih mengalir dalam bentuk "Cincin Obsidian" — sabuk puing sepanjang 4 AU yang mengelilingi matahari mati.',
    atmosphere:
      'Sulfur dioksida, abu logam, dan aerosol beracun. Tekanan 3 kali Bumi di permukaan; tekanan normal pada ketinggian kota Vulkarys.',
    inhabitants: 'Xel\'Tharis (klan pemburu nebula), drone penambang otomatis, fauna kerak berlapis logam',
    resources: ['Dilithium kelas perang', 'Obsidian termal', 'Debu besi-magnetit', 'Sisa reaktor bintang'],
    dangerLevel: 10,
    beautyScore: 6,
    themeColor: '#f97316',
    gradientFrom: '#f97316',
    gradientTo: '#dc2626'
  },
  {
    id: 'fp-whisper',
    name: 'Whisper',
    slug: 'whisper',
    tagline: 'Kabut pikiran yang mengingat segalanya',
    description:
      'Whisper adalah planet yang tidak pernah terlihat. Seluruh permukaannya tertutup kabut setebal 40 km yang bukan terbentuk dari gas atau uap air, melainkan dari jaringan atau "mind-mist" — kabut biologis yang secara aktif menyimpan dan menyiarkan kembali ingatan. Siapa pun yang masuk ke dalamnya akan mendengar suara orang-orang yang mereka cintai, tepat seperti yang mereka ingat. Nyx Collective menguasai seluruh planet ini sebagai satu organisme tunggal. Tidak ada kota, tidak ada struktur; hanya kabut, keheningan, dan pola biner yang terus dikirim ke luar angkasa.',
    atmosphere:
      'Kabut mental aktif. Komposisi gas: argon, xenon, dan partikel bermuatan yang menyerupai pola EEG. Visibilitas: 0 meter.',
    inhabitants: 'Nyx Collective (hive mind), "echo" — salinan ingatan makhluk yang pernah memasuki kabut',
    resources: ['Kristal memori', 'Partikel mind-mist', 'Data arsip ingatan antarspesies'],
    dangerLevel: 9,
    beautyScore: 4,
    themeColor: '#8b5cf6',
    gradientFrom: '#4c1d95',
    gradientTo: '#0ea5e9'
  },
  {
    id: 'fp-halcyon-prime',
    name: 'Halcyon Prime',
    slug: 'halcyon-prime',
    tagline: 'Ibu kota Federasi Antarbintang',
    description:
      'Halcyon Prime adalah titik temu 40 sistem bintang: kota raksasa berlapis-lapis yang dibangun untuk membuat semua spesies merasa di rumah. Ada distrik bertekanan rendah untuk Zephyrians, kanal air hangat untuk Vessari, dan taman luminescen yang dipinjam langsung dari Elyria agar Aurelians tidak kehilangan akar. Menara Diplomasi setinggi 8 km menjadi tempat penandatanganan semua traktat perang dan damai. Di bawah permukaan, Ruang Arsip Baja menyimpan catatan kekuatan setiap peradaban — termasuk manusia.',
    atmosphere:
      'Dibuat sepenuhnya buatan dan dapat diatur per distrik, dari vakum parsial sampai 40 atmosfer. Langit di atas kota dipenuhi lalu lintas kapal dan iklan holografik berbahasa 400 dialek.',
    inhabitants: 'Vessari (perantara dagang), diaspora 60 spesies, Duta manusia dari Bumi',
    resources: ['Pasar komoditas antarbintang', 'Data arsip Federasi', 'Kilang bahan bakar tenunan perak'],
    dangerLevel: 3,
    beautyScore: 9,
    themeColor: '#22d3ee',
    gradientFrom: '#22d3ee',
    gradientTo: '#6366f1'
  },
  {
    id: 'fp-cryon-veil',
    name: 'Cryon Veil',
    slug: 'cryon-veil',
    tagline: 'Kehidupan yang bersembunyi di bawah kilometernya es',
    description:
      'Di permukaan, Cryon Veil tampak seperti planet mati: gletser membentang hingga cakrawala, suhu -210 derajat, dan angin yang mampu mengiris lambung kapal. Namun di kedalaman 14 km, di bawah kerak es, terdapat lautan hangat yang menerima energi dari inti geotermal. Di sanalah koloni Vessari membangun Arsitektur Kristal Cryon dan bertani ganggang termal. Sumber daya terbesarnya adalah inti es-besi yang terus tumbuh — dan di dalamnya, makhluk unik bernama "Veyl" yang bergerak hanya ketika tidak ada cahaya sama sekali.',
    atmosphere:
      'Tipis dan beku: nitrogen-cair, metana beku, hembusan badai es permanen. Di bawah permukaan, atmosfer lautan hangat yang stabil.',
    inhabitants: 'Koloni Vessari (penambang inti), Veyl (fauna bawah es), drone Zephyrian sebagai kurir logistik',
    resources: ['Inti es-besi Cryon', 'Ganggang termal', 'Air murni galaksi', 'Kristal beku transparan'],
    dangerLevel: 7,
    beautyScore: 8,
    themeColor: '#60a5fa',
    gradientFrom: '#93c5fd',
    gradientTo: '#1e3a8a'
  }
];

export function findPlanet(slug: string): FictionalPlanet | undefined {
  return FICTIONAL_PLANETS.find((planet) => planet.slug === slug);
}

export const WORLD_DISCLAIMER =
  'Seluruh entri di Atlas ini adalah fiksi ilmiah. Planet-planet ini tidak ada di katalog eksoplanet NASA — minimal, belum.';
