import type { QuizQuestion } from '@/lib/types';

/**
 * ============================================================
 * 30 PERTANYAAN KUIS — 📚 FAKTA ILMIAH
 * 4 kategori: Tata Surya (8), Bintang & Galaksi (8),
 * Black Hole & Kosmologi (7), Eksoplanet (7)
 * `correctAnswer` adalah indeks jawaban benar (0-based).
 * ============================================================
 */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- TATA SURYA ----------------------------
  {
    id: 'q-ts-01',
    category: 'Tata Surya',
    question: 'Planet mana yang memiliki hari (rotasi) lebih panjang daripada tahunnya?',
    options: ['Merkurius', 'Venus', 'Mars', 'Neptunus'],
    correctAnswer: 1,
    explanation:
      'Venus berotasi sangat lambat: satu rotasi butuh 243 hari Bumi, sementara satu orbitnya hanya 225 hari Bumi. Rotasinya juga retrograd (terbalik arah).',
    difficulty: 'sedang',
    order: 1
  },
  {
    id: 'q-ts-02',
    category: 'Tata Surya',
    question: 'Berapa persen massa tata surya yang terkandung di dalam Matahari?',
    options: ['± 50%', '± 75%', '± 99,86%', '± 92%'],
    correctAnswer: 2,
    explanation:
      'Matahari menyimpan sekitar 99,86% dari total massa tata surya. Sisa 0,14% dibagi oleh semua planet, bulan, asteroid, komet, dan debu.',
    difficulty: 'mudah',
    order: 2
  },
  {
    id: 'q-ts-03',
    category: 'Tata Surya',
    question: 'Gunung tertinggi di tata surya, Olympus Mons, terletak di planet...',
    options: ['Venus', 'Mars', 'Merkurius', 'Bulan'],
    correctAnswer: 1,
    explanation:
      'Olympus Mons di Mars setinggi ±22 km — hampir tiga kali tinggi Everest — dan menjadi gunung berapi terbesar di tata surya.',
    difficulty: 'mudah',
    order: 3
  },
  {
    id: 'q-ts-04',
    category: 'Tata Surya',
    question: 'Planet mana yang kepadatan rata-ratanya lebih kecil dari air?',
    options: ['Jupiter', 'Uranus', 'Saturnus', 'Neptunus'],
    correctAnswer: 2,
    explanation:
      'Kepadatan Saturnus hanya 0,687 g/cm³, sedangkan air 1 g/cm³. Secara teori, Saturnus akan mengapung jika ada kolam yang cukup besar.',
    difficulty: 'sedang',
    order: 4
  },
  {
    id: 'q-ts-05',
    category: 'Tata Surya',
    question: 'Satelit terbesar di tata surya, yang bahkan lebih besar dari Merkurius, adalah...',
    options: ['Titan', 'Ganymede', 'Callisto', 'Triton'],
    correctAnswer: 1,
    explanation:
      'Ganymede, satelit Jupiter, berdiameter 5.268 km — lebih besar dari Merkurius (4.879 km) dan Pluto.',
    difficulty: 'sedang',
    order: 5
  },
  {
    id: 'q-ts-06',
    category: 'Tata Surya',
    question: 'Apa penyebab utama Mars berwarna merah?',
    options: ['Awan metana', 'Oksida besi (hematit) di permukaannya', 'Radiasi ultraviolet', 'Lautan lava yang membeku'],
    correctAnswer: 1,
    explanation:
      'Permukaan Mars kaya akan oksida besi alias karat, yang menyebar sebagai debu halus ke seluruh planet dan memberikan warna merah khas.',
    difficulty: 'mudah',
    order: 6
  },
  {
    id: 'q-ts-07',
    category: 'Tata Surya',
    question: 'Berapa lama cahaya Matahari membutuhkan waktu untuk sampai ke Bumi?',
    options: ['8 detik', '8 menit 20 detik', '1 jam', '1,3 detik'],
    correctAnswer: 1,
    explanation:
      'Jarak Bumi–Matahari 149,6 juta km. Pada kecepatan cahaya 300.000 km/s, tempuhnya 499 detik atau sekitar 8 menit 20 detik.',
    difficulty: 'mudah',
    order: 7
  },
  {
    id: 'q-ts-08',
    category: 'Tata Surya',
    question: 'Sabuk Kuiper dan Awan Oort terletak di wilayah...',
    options: [
      'Antara Mars dan Jupiter',
      'Antara Bumi dan Venus',
      'Di luar orbit Neptunus',
      'Di antara cincin Saturnus'
    ],
    correctAnswer: 2,
    explanation:
      'Sabuk Kuiper (30–50 AU) berada di luar orbit Neptunus, dan Awan Oort membentang jauh lebih luar hingga 100.000 AU sebagai asal komet periode panjang.',
    difficulty: 'sedang',
    order: 8
  },

  // ------------------------ BINTANG & GALAKSI ------------------------
  {
    id: 'q-bg-01',
    category: 'Bintang & Galaksi',
    question: 'Apa yang menjadi sumber energi Matahari?',
    options: ['Pembakaran hidrogen', 'Fisi uranium', 'Fusi hidrogen menjadi helium', 'Peluruhan radioaktif'],
    correctAnswer: 2,
    explanation:
      'Di inti Matahari, 600 juta ton hidrogen berfusi menjadi helium setiap detik. Energi yang dilepas setara 4 juta ton massa per detik (E = mc²).',
    difficulty: 'mudah',
    order: 1
  },
  {
    id: 'q-bg-02',
    category: 'Bintang & Galaksi',
    question: 'Berapa lama waktu yang dibutuhkan Matahari untuk satu kali mengorbit pusat Bima Sakti?',
    options: ['± 1 juta tahun', '± 25 juta tahun', '± 230 juta tahun', '± 6.000 tahun'],
    correctAnswer: 2,
    explanation:
      'Matahari mengorbit pusat galaksi dengan kecepatan ±828.000 km/jam dan membutuhkan 225–250 juta tahun per putaran — disebut tahun galaksi.',
    difficulty: 'sedang',
    order: 2
  },
  {
    id: 'q-bg-03',
    category: 'Bintang & Galaksi',
    question: 'Galaksi terdekat dengan Bima Sakti yang akan bertabrakan dengannya adalah...',
    options: ['Triangulum', 'Andromeda', 'Large Magellanic Cloud', 'Sombrero'],
    correctAnswer: 1,
    explanation:
      'Andromeda berjarak 2,5 juta tahun cahaya dan mendekat dengan kecepatan 110 km/s. Tabrakan akan terjadi sekitar 4,5 miliar tahun lagi.',
    difficulty: 'mudah',
    order: 3
  },
  {
    id: 'q-bg-04',
    category: 'Bintang & Galaksi',
    question: 'Apa yang menentukan akhir hidup sebuah bintang?',
    options: ['Kecepatan rotasinya', 'Massanya', 'Warna atmosfernya', 'Jaraknya dari galaksi'],
    correctAnswer: 1,
    explanation:
      'Massa menentukan segalanya: bintang bermassa kecil menjadi katai putih, sedangkan bintang bermassa >20 massa Matahari berakhir sebagai supernova dan bisa menjadi lubang hitam.',
    difficulty: 'sedang',
    order: 4
  },
  {
    id: 'q-bg-05',
    category: 'Bintang & Galaksi',
    question: 'Nebula adalah...',
    options: [
      'Awan gas dan debu tempat bintang lahir atau mati',
      'Jenis bintang yang paling terang',
      'Sisa ledakan planet',
      'Kumpulan lubang hitam'
    ],
    correctAnswer: 0,
    explanation:
      'Nebula adalah awan gas (terutama hidrogen) dan debu antar bintang. Ia bisa jadi tempat lahirnya bintang, dan juga sisa kematian bintang.',
    difficulty: 'mudah',
    order: 5
  },
  {
    id: 'q-bg-06',
    category: 'Bintang & Galaksi',
    question: 'Berapa perkiraan diameter galaksi Bima Sakti?',
    options: ['1.000 tahun cahaya', '100.000 tahun cahaya', '2,5 juta tahun cahaya', '10 tahun cahaya'],
    correctAnswer: 1,
    explanation:
      'Bima Sakti berdiameter ±100.000–120.000 tahun cahaya dengan ketebalan cakram sekitar 1.000 tahun cahaya.',
    difficulty: 'sedang',
    order: 6
  },
  {
    id: 'q-bg-07',
    category: 'Bintang & Galaksi',
    question: 'Apa nama fenomena ketika cahaya bintang berubah warna karena bergerak menjauhi pengamat?',
    options: ['Efek Doppler', 'Redshift kosmologis', 'Aberasi', 'Efek Compton'],
    correctAnswer: 1,
    explanation:
      'Redshift kosmologis adalah pergeseran panjang gelombang cahaya ke sisi merah akibat pengembangan ruang antar galaksi — bukti utama Big Bang.',
    difficulty: 'sulit',
    order: 7
  },
  {
    id: 'q-bg-08',
    category: 'Bintang & Galaksi',
    question: 'Matahari kita akan berakhir sebagai...',
    options: ['Lubang hitam', 'Nova', 'Katai putih', 'Pulsar'],
    correctAnswer: 2,
    explanation:
      'Matahari tidak cukup masif untuk menjadi lubang hitam. Setelah fase raksasa merah (±5 miliar tahun lagi), ia akan melepas lapisan luar dan meninggalkan inti padat: katai putih.',
    difficulty: 'sedang',
    order: 8
  },

  // --------------------- BLACK HOLE & KOSMOLOGI ---------------------
  {
    id: 'q-bh-01',
    category: 'Black Hole & Kosmologi',
    question: 'Apa itu event horizon pada lubang hitam?',
    options: [
      'Lapisan awan gas panas',
      'Batas di mana kecepatan lepas melebihi kecepatan cahaya',
      'Permukaan padat lubang hitam',
      'Cincin cahaya di sekeliling bintang'
    ],
    correctAnswer: 1,
    explanation:
      'Event horizon adalah batas tanpa jalan kembali. Di dalamnya, kecepatan lepas melebihi kecepatan cahaya sehingga tidak ada informasi yang bisa keluar.',
    difficulty: 'sedang',
    order: 1
  },
  {
    id: 'q-bh-02',
    category: 'Black Hole & Kosmologi',
    question: 'Berapa umur alam semesta menurut model kosmologi standar?',
    options: ['4,6 miliar tahun', '13,8 miliar tahun', '100 miliar tahun', '1,5 miliar tahun'],
    correctAnswer: 1,
    explanation:
      'Berdasarkan pengukuran CMB oleh satelit Planck, umur alam semesta sekitar 13,8 miliar tahun.',
    difficulty: 'mudah',
    order: 2
  },
  {
    id: 'q-bh-03',
    category: 'Black Hole & Kosmologi',
    question: 'Lubang hitam supermasif di pusat Bima Sakti bernama...',
    options: ['M87*', 'Sagittarius A*', 'Cygnus X-1', 'V404 Cygni'],
    correctAnswer: 1,
    explanation:
      'Sagittarius A* bermassa 4,1 juta massa Matahari, letaknya 27.000 tahun cahaya dari Bumi. Citranya berhasil dipotret pada 2022.',
    difficulty: 'mudah',
    order: 3
  },
  {
    id: 'q-bh-04',
    category: 'Black Hole & Kosmologi',
    question: 'Radiasi Hawking adalah...',
    options: [
      'Radiasi yang menyebabkan lubang hitam tumbuh',
      'Emisi partikel akibat efek kuantum di tepi event horizon',
      'Radiasi ultraviolet dari bintang mati',
      'Gelombang gravitasi dari penggabungan bintang'
    ],
    correctAnswer: 1,
    explanation:
      'Menurut Stephen Hawking (1974), pasangan partikel virtual yang tercipta di dekat event horizon dapat membuat satu partikel lolos; lubang hitam perlahan kehilangan massa.',
    difficulty: 'sulit',
    order: 4
  },
  {
    id: 'q-bh-05',
    category: 'Black Hole & Kosmologi',
    question: 'Berapa radius Schwarzschild lubang hitam bermassa 1 kali Matahari?',
    options: ['3 km', '300 km', '3.000 km', '3 juta km'],
    correctAnswer: 0,
    explanation:
      'R = 2GM/c². Untuk massa Matahari, hasilnya sekitar 3 km. Lubang hitam supermasif 4 juta massa Matahari punya radius ± 12 juta km.',
    difficulty: 'sulit',
    order: 5
  },
  {
    id: 'q-bh-06',
    category: 'Black Hole & Kosmologi',
    question: 'Apa komposisi alam semesta menurut model ΛCDM?',
    options: [
      '68% materi gelap, 27% energi gelap, 5% materi biasa',
      '68% energi gelap, 27% materi gelap, 5% materi biasa',
      '95% materi biasa, 5% energi gelap',
      '50% materi gelap, 50% materi biasa'
    ],
    correctAnswer: 1,
    explanation:
      'Energi gelap mendominasi sekitar 68%, materi gelap 27%, dan materi biasa — atom, bintang, manusia — hanya sekitar 5% dari total isi alam semesta.',
    difficulty: 'sedang',
    order: 6
  },
  {
    id: 'q-bh-07',
    category: 'Black Hole & Kosmologi',
    question: 'Bukti pengamatan apa yang paling kuat mendukung teori Big Bang?',
    options: [
      'Cahaya zodiacal',
      'Latar belakang gelombang mikro kosmik (CMB)',
      'Bintik matahari',
      'Aurora di kutub Bumi'
    ],
    correctAnswer: 1,
    explanation:
      'CMB bersuhu 2,725 K adalah sisa radiasi dari 380.000 tahun setelah Big Bang. Bersama redshift galaksi & nukleosintesis, ia menjadi pilar model Big Bang.',
    difficulty: 'sedang',
    order: 7
  },

  // ----------------------------- EKSOPLANET -----------------------------
  {
    id: 'q-ex-01',
    category: 'Eksoplanet',
    question: 'Apa yang dimaksud dengan "zona layak huni" (habitable zone)?',
    options: [
      'Wilayah galaksi yang padat bintang',
      'Jarak dari bintang di mana air dapat berwujud cair di permukaan planet',
      'Area tanpa asteroid',
      'Zona waktu di stasiun luar angkasa'
    ],
    correctAnswer: 1,
    explanation:
      'Zona layak huni adalah rentang jarak dari bintang di mana suhu memungkinkan air cair — syarat penting bagi kehidupan seperti yang kita kenal.',
    difficulty: 'mudah',
    order: 1
  },
  {
    id: 'q-ex-02',
    category: 'Eksoplanet',
    question: 'Metode deteksi eksoplanet yang mengukur penurunan cahaya bintang disebut...',
    options: ['Kecepatan radial', 'Transit fotometri', 'Mikrolensa', 'Pencitraan langsung'],
    correctAnswer: 1,
    explanation:
      'Metode transit mengukur penurunan cahaya bintang saat planet melintas di depannya. Metode inilah yang dipakai teleskop Kepler dan TESS.',
    difficulty: 'mudah',
    order: 2
  },
  {
    id: 'q-ex-03',
    category: 'Eksoplanet',
    question: 'Sistem bintang mana yang memiliki 7 planet berbatu dan menjadi favorit pencarian kehidupan?',
    options: ['Kepler-452', 'Proxima Centauri', 'TRAPPIST-1', '51 Pegasi'],
    correctAnswer: 2,
    explanation:
      'TRAPPIST-1 adalah bintang katai merah dengan tujuh planet berbatu; tiga di antaranya berada di zona layak huni.',
    difficulty: 'sedang',
    order: 3
  },
  {
    id: 'q-ex-04',
    category: 'Eksoplanet',
    question: 'Eksoplanet pertama yang dikonfirmasi mengorbit bintang mirip Matahari adalah...',
    options: ['51 Pegasi b', 'Proxima Centauri b', 'Kepler-22b', 'HD 189733 b'],
    correctAnswer: 0,
    explanation:
      '51 Pegasi b (1995) adalah Jupiter panas yang mengorbit bintangnya dalam 4 hari. Penemuan ini mengubah teori pembentukan tata surya dan meraih Nobel 2019.',
    difficulty: 'sedang',
    order: 4
  },
  {
    id: 'q-ex-05',
    category: 'Eksoplanet',
    question: 'Bisakah planet terbentuk mengorbit dua bintang sekaligus?',
    options: [
      'Tidak, secara fisika mustahil',
      'Ya, disebut planet sirkumbiner',
      'Hanya di galaksi lain',
      'Ya, tetapi hanya planet gas'
    ],
    correctAnswer: 1,
    explanation:
      'Ya. Planet sirkumbiner mengorbit dua bintang sekaligus, seperti Kepler-16b — "dunia Tatooine" yang nyata. Orbitnya harus cukup jauh agar stabil.',
    difficulty: 'sedang',
    order: 5
  },
  {
    id: 'q-ex-06',
    category: 'Eksoplanet',
    question: 'Apa itu "biosignature" yang dicari astronom di atmosfer eksoplanet?',
    options: [
      'Warna planet',
      'Ukuran planet',
      'Senyawa kimia yang mengindikasikan kemungkinan kehidupan',
      'Kecepatan rotasi planet'
    ],
    correctAnswer: 2,
    explanation:
      'Biosignature seperti oksigen, ozon, metana, dan dimetil sulfida dapat menjadi indikator aktivitas biologis bila ditemukan dalam konsentrasi tak seimbang.',
    difficulty: 'sulit',
    order: 6
  },
  {
    id: 'q-ex-07',
    category: 'Eksoplanet',
    question: 'Eksoplanet HD 189733 b dikenal karena...',
    options: [
      'Hujan kaca cair horizontal',
      'Permukaannya seluruhnya es',
      'Memiliki cincin lebih besar dari Saturnus',
      'Merupakan planet tanpa bintang'
    ],
    correctAnswer: 0,
    explanation:
      'HD 189733 b adalah Jupiter panas dengan suhu ±1.000 °C dan atmosfer silikat — di sana kaca dapat mengembun dan jatuh sebagai hujan kaca menyamping karena angin kencang.',
    difficulty: 'sulit',
    order: 7
  }
];

export const QUIZ_CATEGORIES = [
  'Tata Surya',
  'Bintang & Galaksi',
  'Black Hole & Kosmologi',
  'Eksoplanet'
] as const;

export function questionsByCategory(category: string): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter((question) => question.category === category).sort(
    (a, b) => a.order - b.order
  );
}
