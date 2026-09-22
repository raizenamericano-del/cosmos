import type { Article } from '@/lib/types';

/**
 * ============================================================
 * ARTIKEL EDUKASI — 📚 FAKTA ILMIAH
 * Seluruh angka & pernyataan mengacu pada data NASA/ESA (Planetary Fact Sheet,
 * Hubble/Webb science releases, dan publikasi astronomi standar).
 *
 * Sumber ditulis sebagai array `paragraphs` agar mudah dibaca manusia,
 * lalu dipetakan menjadi satu kolom teks (`content`) yang cocok dengan
 * kolom `String` pada prisma/schema.prisma.
 * ============================================================
 */

type ArticleSeed = Omit<Article, 'content'> & { paragraphs: string[] };

function toArticle(seed: ArticleSeed): Article {
  const { paragraphs, ...rest } = seed;
  return { ...rest, content: paragraphs.join('\n\n') };
}

/** Pecah kembali konten menjadi paragraf untuk ditampilkan. */
export function articleParagraphs(content: string): string[] {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

const FACT_SEEDS: ArticleSeed[] = [
  {
    id: 'art-matahari',
    title: 'Matahari: Reaktor Fusi Raksasa di Pusat Tata Surya',
    slug: 'matahari-reaktor-fusi-tata-surya',
    category: 'Bintang',
    type: 'fact',
    summary:
      'Bintang induk kita menyimpan 99,86% massa tata surya dan mengubah 600 juta ton hidrogen menjadi helium setiap detiknya.',
    paragraphs: [
      'Matahari adalah bintang deret utama bertipe spektrum G2V dengan diameter 1,39 juta km — sekitar 109 kali diameter Bumi. Pada intinya yang bersuhu 15 juta °C, tekanan dan suhu ekstrem memaksa inti atom hidrogen bergabung menjadi helium melalui fusi nuklir. Setiap detik, sekitar 600 juta ton hidrogen berfusi, dan 4 juta ton massa berubah menjadi energi murni sesuai persamaan E = mc².',
      'Energi yang dihasilkan di inti membutuhkan waktu hingga 100.000 tahun untuk merambat ke permukaan melalui lapisan radiatif, lalu hanya 8 menit 20 detik untuk menempuh jarak 149,6 juta km menuju Bumi. Lapisan terluar Matahari — korona — justru bersuhu 1–3 juta °C, jauh lebih panas daripada permukaan yang hanya 5.500 °C. Fenomena ini dikenal sebagai "masalah pemanasan korona" dan masih menjadi salah satu teka-teki astrofisika yang diteliti hingga kini melalui misi Parker Solar Probe dan Solar Orbiter.',
      'Aktivitas Matahari mengikuti siklus 11 tahun, ditandai naik-turunnya jumlah bintik matahari, flare, dan lontaran massa korona (CME). Ketika CME mengarah ke Bumi, medan magnet planet kita — magnetosfer — membelokkannya dan menciptakan aurora di lintang tinggi. Tanpa perlindungan ini, atmosfer Bumi bisa terkikis seperti yang terjadi pada Mars.',
      'Matahari berumur sekitar 4,6 miliar tahun dan berada kira-kira di pertengahan hidupnya. Dalam 5 miliar tahun ke depan, ia akan mengembang menjadi raksasa merah, menelan Merkurius dan Venus, lalu berakhir sebagai katai putih yang mendingin perlahan.'
    ],
    funFacts: [
      'Cahaya Matahari membutuhkan 8 menit 20 detik untuk mencapai Bumi.',
      'Volume Matahari bisa memuat 1,3 juta planet Bumi.',
      'Suhu inti 15 juta °C, tetapi koronanya bisa 200× lebih panas dari permukaan.',
      'Matahari menyusut menjadi katai putih seukuran Bumi setelah fase raksasa merah.'
    ],
    imageUrl: null,
    readTime: 6,
    createdAt: '2026-01-05T08:00:00.000Z'
  },
  {
    id: 'art-bumi',
    title: 'Bumi: Satu-satunya Dunia yang Diketahui Berkehidupan',
    slug: 'bumi-planet-biru-pelindung-kehidupan',
    category: 'Planet',
    type: 'fact',
    summary:
      'Medan magnet, atmosfer berlapis, dan air cair menjadikan Bumi laboratorium alami bagi kehidupan selama 3,8 miliar tahun.',
    paragraphs: [
      'Bumi mengorbit Matahari pada jarak rata-rata 149,6 juta km — satu satuan astronomi (AU). Posisi ini menempatkannya di zona layak huni (habitable zone): tidak terlalu panas sehingga air mendidih, tidak terlalu dingin sehingga air membeku seluruhnya. Sekitar 71% permukaan Bumi tertutup air cair, menjadikannya planet yang unik di tata surya.',
      'Atmosfer Bumi bekerja seperti selimut adaptif. Nitrogen (78%) dan oksigen (21%) menyusun sebagian besar udaranya, sementara lapisan ozon di stratosfer menyaring 97–99% radiasi ultraviolet Matahari. Efek rumah kaca alami menjaga suhu rata-rata pada 15 °C — tanpa itu, Bumi akan membeku pada -18 °C.',
      'Di dalam Bumi, inti besi-nikel cair yang berputar memproduksi magnetosfer. Medan magnet ini membelokkan angin matahari dan partikel berenergi tinggi, mencegah atmosfer terlepas ke luar angkasa. Proses lempeng tektonik juga berperan sebagai "termostat" jangka panjang yang mendaur ulang karbon antara batuan dan atmosfer.',
      'Bukti geologis dan fosil menunjukkan kehidupan muncul setidaknya 3,8 miliar tahun lalu. Dari mikroba ekstremofil hingga hutan tropis, biosfer Bumi telah melalui lima kepunahan massal dan selalu pulih dalam bentuk baru. Menjaga keseimbangannya kini menjadi tanggung jawab spesies yang paling baru muncul: manusia.'
    ],
    funFacts: [
      'Bumi menggelembung 21 km di ekuator karena rotasi — bukan bola sempurna.',
      'Bulan menjauh dari Bumi sekitar 3,8 cm setiap tahun.',
      'Medan magnet Bumi 1.000× lebih lemah dari magnet kulkas ukuran sama, tapi cukup melindungi seluruh planet.',
      'Lebih dari 80% samudra Bumi belum dipetakan dengan detail tinggi.'
    ],
    imageUrl: null,
    readTime: 6,
    createdAt: '2026-01-06T08:00:00.000Z'
  },
  {
    id: 'art-mars',
    title: 'Mars: Planet Merah dan Masa Depan Kolonisasi Manusia',
    slug: 'mars-planet-merah-masa-depan-kolonisasi',
    category: 'Planet',
    type: 'fact',
    summary:
      'Mars menyimpan bukti sungai purba, gunung tertinggi di tata surya, dan es kutub yang bisa menopang koloni manusia.',
    paragraphs: [
      'Mars berjarak rata-rata 227,9 juta km dari Matahari dan memerlukan 687 hari Bumi untuk satu kali mengorbit. Warnanya yang merah berasal dari oksida besi (hematit) yang mengoksidasi permukaannya selama miliaran tahun. Atmosfernya sangat tipis — hanya 1% tekanan Bumi — dan 95%-nya karbon dioksida, sehingga cairan di permukaan langsung menguap atau membeku.',
      'Meski begitu, Mars menyimpan jejak masa lalu yang lebih basah. Rover Curiosity dan Perseverance menemukan batuan sedimen, mineral lempung, dan delta sungai kering yang membuktikan adanya air cair pada 3–4 miliar tahun silam. Di bawah kutub selatannya tersimpan es air sebanyak 1,6 juta km³ — cukup untuk menutupi seluruh planet dengan lautan sedalam 11 meter.',
      'Mars juga rumah bagi rekor tata surya: Olympus Mons, gunung berapi setinggi 22 km, dan Valles Marineris, sistem ngarai sepanjang 4.000 km. Karena tidak ada lempeng tektonik aktif, kerak Mars tidak didaur ulang sehingga permukaannya menyimpan arsip geologis selama 4 miliar tahun.',
      'Untuk kolonisasi manusia, tantangan utamanya adalah radiasi (tanpa magnetosfer global), badai debu global, suhu ekstrem, dan gravitasi hanya 38% Bumi. Namun begitu, Mars tetap target paling realistis: sumber air, karbon dioksida untuk bahan bakar metana, dan cahaya Matahari yang masih 43% sekuat di Bumi.'
    ],
    funFacts: [
      'Olympus Mons setinggi 22 km — hampir tiga kali Everest.',
      'Debu Mars mengandung besi yang membuat langitnya berwarna kemerahan atau kebiruan saat matahari terbenam.',
      'Gravitasi Mars hanya 38% Bumi — astronaut bisa melompat 2,5× lebih tinggi.',
      'Badai debu Mars bisa menyelimuti seluruh planet selama berbulan-bulan.'
    ],
    imageUrl: null,
    readTime: 7,
    createdAt: '2026-01-07T08:00:00.000Z'
  },
  {
    id: 'art-jupiter',
    title: 'Jupiter: Raksasa Gas yang Menjadi "Tameng" Tata Surya',
    slug: 'jupiter-raksasa-gas-tameng-tata-surya',
    category: 'Planet',
    type: 'fact',
    summary:
      'Massa Jupiter 2,5× gabungan semua planet lain, dengan Bintik Merah Besar yang berputar lebih dari 300 tahun.',
    paragraphs: [
      'Jupiter adalah planet terbesar di tata surya dengan diameter 142.984 km — sekitar 11 kali Bumi. Massanya dua setengah kali gabungan seluruh planet lain, dan gravitasinya (24,79 m/s²) cukup untuk mempengaruhi orbit benda-benda kecil di sekitarnya. Komposisinya didominasi hidrogen dan helium, mirip Matahari tetapi tidak cukup masif untuk memicu fusi.',
      'Ciri paling ikoniknya adalah Bintik Merah Besar (Great Red Spot): badai antisiklon dengan diameter 1,3× Bumi yang diperkirakan telah berlangsung lebih dari 300 tahun. Pada 2017, misi Juno menemukan struktur badai setinggi 300 km dengan kecepatan angin mencapai 430 km/jam.',
      'Jupiter memiliki 95 satelit terkonfirmasi. Empat satelit Galilean — Io, Europa, Ganymede, dan Callisto — adalah dunia yang sangat berbeda: Io adalah objek paling vulkanik di tata surya dengan 400 gunung berapi aktif; Europa menyembunyikan lautan air asin di bawah kerak es dan menjadi target utama pencarian kehidupan oleh misi Europa Clipper; Ganymede adalah bulan terbesar, lebih besar dari Merkurius; dan Callisto menyimpan permukaan paling tua di tata surya.',
      'Fungsi Jupiter sebagai "penjaga" tata surya masih menjadi perdebatan ilmiah. Beberapa model menunjukkan gravitasinya membelokkan komet dan asteroid yang berpotensi menabrak Bumi, meskipun simulasi lain menemukan Jupiter juga bisa melemparkan objek ke arah dalam tata surya.'
    ],
    funFacts: [
      'Satu hari di Jupiter hanya 9 jam 56 menit — rotasi tercepat di tata surya.',
      'Medan magnet Jupiter 20.000 kali lebih kuat daripada medan magnet Bumi.',
      'Jupiter punya cincin tipis yang belum banyak diketahui publik.',
      'Ganymede lebih besar dari planet Merkurius.'
    ],
    imageUrl: null,
    readTime: 6,
    createdAt: '2026-01-08T08:00:00.000Z'
  },
  {
    id: 'art-saturnus',
    title: 'Saturnus: Permata Cincin Es Tata Surya',
    slug: 'saturnus-permata-cincin-es',
    category: 'Planet',
    type: 'fact',
    summary:
      'Cincin Saturnus membentang 280.000 km tetapi hanya setebal puluhan meter — dan planet ini lebih ringan dari air.',
    paragraphs: [
      'Saturnus adalah planet berukuran terbesar kedua dengan diameter 120.536 km. Keunikan utamanya adalah kepadatan rata-rata hanya 0,687 g/cm³ — lebih ringan dari air, sehingga secara teoretis Saturnus akan mengapung jika ada kolam raksasa yang cukup.',
      'Sistem cincinnya tersusun dari miliaran partikel es, batuan, dan debu dengan ukuran mulai dari butiran pasir sampai bongkahan sebesar rumah. Lebarnya mencapai 280.000 km, tetapi tebal rata-ratanya hanya sekitar 10–100 meter. Cincin terbagi menjadi beberapa divisi utama yang dipisahkan celah gravitasi, seperti Cassini Division yang ditemukan astronom Giovanni Cassini pada 1675.',
      'Saturnus memiliki 146 satelit terkonfirmasi — terbanyak di tata surya. Titan adalah bulan yang paling menarik: satu-satunya bulan dengan atmosfer tebal (95% nitrogen) dan satu-satunya objek selain Bumi yang memiliki danau serta sungai cair — meski terbuat dari metana dan etana pada suhu -179 °C. Misi Dragonfly NASA akan mengirim drone untuk menjelajahi Titan pada dekade berikutnya.',
      'Di kutub utara Saturnus terdapat struktur heksagon (segi enam) unik dengan lebar 30.000 km. Hexagon ini adalah pola aliran jet yang stabil, ditemukan pertama kali oleh Voyager dan dipelajari detail oleh Cassini selama 13 tahun misinya.'
    ],
    funFacts: [
      'Cincin Saturnus mungkin terbentuk dari bulan yang hancur atau gravitasi yang merobek komet.',
      'Enceladus menyemburkan geiser air asin dari laut bawah permukaannya.',
      'Cassini menghabiskan 13 tahun mengorbit Saturnus sebelum dijatuhkan ke atmosfer planet pada 2017.',
      'Cincin Saturnus diperkirakan akan menghilang secara bertahap dalam 100 juta tahun.'
    ],
    imageUrl: null,
    readTime: 6,
    createdAt: '2026-01-09T08:00:00.000Z'
  },
  {
    id: 'art-sabuk-asteroid',
    title: 'Sabuk Asteroid & Komet: Puing Pembentukan Tata Surya',
    slug: 'sabuk-asteroid-komet-puing-tata-surya',
    category: 'Asteroid & Komet',
    type: 'fact',
    summary:
      'Jutaan bongkah batuan di antara Mars dan Jupiter menyimpan rekaman kimia dari 4,6 miliar tahun lalu.',
    paragraphs: [
      'Sabuk asteroid terletak antara Mars dan Jupiter, pada jarak 2,2–3,2 AU dari Matahari. Sabuk ini memuat lebih dari 1,1 juta asteroid yang berdiameter di atas 1 km, namun total massanya hanya sekitar 4% massa Bulan. Ceres, si planet kerdil, merupakan anggota terbesar dengan diameter 940 km dan menyumbang sepertiga total massa sabuk.',
      'Sabuk ini tidak pernah menjadi planet besar karena gangguan gravitasi Jupiter yang mencegah material bergabung. Asteroid sendiri terbagi dalam beberapa tipe: tipe C (karbon, 75%), tipe S (silikat), dan tipe M (logam). Komposisi inilah yang membuat asteroid jadi jendela kimia ke nebula tata surya purba.',
      'Di luar Neptunus terbentang Sabuk Kuiper (30–50 AU) yang berisi objek es seperti Pluto, Eris, dan Makemake. Bahkan lebih jauh lagi ada Awan Oort, bola hipotetis berisi miliaran objek es yang membentang hingga 100.000 AU dan menjadi kediaman asal komet berperiode panjang.',
      'Komet adalah "bola salju kosmik" berisi air, CO₂, metana, dan debu. Saat mendekati Matahari, sublimasi gas menciptakan koma dan ekor yang selalu menjauh dari Matahari. Misi Rosetta berhasil mendaratkan probe Philae di komet 67P/Churyumov-Gerasimenko pada 2014 dan menemukan molekul organik serta bukti bahwa air di Bumi mungkin sebagian berasal dari tumbukan komet.'
    ],
    funFacts: [
      'Komet Halley mengunjungi tata surya bagian dalam setiap 76 tahun sekali.',
      'Ceres menyimpan cadangan air tawar dalam jumlah yang besar di bawah permukaannya.',
      'Bumi menabrak komet Shoemaker-Levy 9 di Jupiter pada 1994 — badai dahsyat terlihat teleskop.',
      'Meteorit Murchison yang jatuh di Australia 1969 mengandung lebih dari 90 asam amino.'
    ],
    imageUrl: null,
    readTime: 5,
    createdAt: '2026-01-10T08:00:00.000Z'
  },
  {
    id: 'art-lubang-hitam',
    title: 'Lubang Hitam: Ketika Gravitasi Menang atas Cahaya',
    slug: 'lubang-hitam-gravitasi-menang-atas-cahaya',
    category: 'Black Hole',
    type: 'fact',
    summary:
      'Dari singularitas hingga Event Horizon Telescope: semua yang perlu kamu tahu tentang objek paling ekstrem di alam semesta.',
    paragraphs: [
      'Lubang hitam adalah wilayah ruang-waktu dengan gravitasi begitu kuat sehingga kecepatan lepasnya melebihi kecepatan cahaya. Batasnya disebut event horizon (cakrawala peristiwa) — titik tanpa jalan kembali. Untuk lubang hitam tanpa rotasi, radiusnya adalah radius Schwarzschild: R = 2GM/c². Untuk lubang hitam 1 massa Matahari, radiusnya hanya 3 km. Untuk Sagitarius A*, lubang hitam supermasif di pusat Bima Sakti dengan 4,1 juta massa Matahari, radiusnya mencapai 12 juta km.',
      'Pembentukan lubang hitam bintang dimulai saat bintang bermassa >20 massa Matahari kehabisan bahan bakar. Tanpa tekanan radiasi yang menahan, inti bintang runtuh dan meledak sebagai supernova, menyisakan sisa yang sangat padat. Jika massa sisanya di atas 3 massa Matahari, tidak ada gaya yang bisa menghentikan keruntuhan menjadi lubang hitam.',
      'Menurut mekanika kuantum, ruang hampa terus melahirkan pasangan partikel-antipartikel virtual. Di tepi event horizon, salah satu partikel dapat lolos sementara pasangannya terjebak, sehingga lubang hitam tampak memancarkan radiasi. Ini adalah radiasi Hawking yang ditemukan Stephen Hawking pada 1974. Untuk lubang hitam bintang, suhunya sangat dingin (di bawah 1 nanokelvin), namun secara teoretis lubang hitam bermassa kecil akan "menguap" cepat dan memancarkan energi besar pada saat terakhir hidupnya.',
      'Bukti pengamatan modern sangat kuat: LIGO mendeteksi gelombang gravitasi dari penggabungan dua lubang hitam pada 2015 (GW150914); Event Horizon Telescope memotret siluet M87* pada 2019 dan Sagitarius A* pada 2022. Gambar tersebut adalah cincin cahaya plasma (accretion disk) dengan bayangan lubang hitam di tengahnya — bukti visual pertama bahwa prediksi relativitas umum Einstein benar.'
    ],
    funFacts: [
      'Kamu tidak akan bisa melihat lubang hitam secara langsung, yang terlihat adalah cahaya material yang mengorbitnya.',
      'Perbedaan waktu di sekitar lubang hitam nyata: satelit GPS sudah dikoreksi relativitas setiap hari.',
      'Lubang hitam supermasif di pusat Bima Sakti berbobot 4,1 juta massa Matahari.',
      'Sagittarius A* memotret pada 2022, dan M87* pada 2019.'
    ],
    imageUrl: null,
    readTime: 8,
    createdAt: '2026-01-11T08:00:00.000Z'
  },
  {
    id: 'art-bima-sakti',
    title: 'Galaksi Bima Sakti: Kota Cahaya Berisi 200 Miliar Bintang',
    slug: 'galaksi-bima-sakti-kota-cahaya',
    category: 'Galaksi',
    type: 'fact',
    summary:
      'Kita berada 27.000 tahun cahaya dari pusat galaksi, pada salah satu lengan spiral yang berputar dalam 230 juta tahun.',
    paragraphs: [
      'Bima Sakti adalah galaksi spiral berpalang (SBbc) dengan diameter sekitar 100.000–120.000 tahun cahaya dan massa total mencapai 1,5 triliun massa Matahari (sebagian besar berupa materi gelap). Galaksi ini berisi 100–400 miliar bintang, termasuk Matahari kita.',
      'Tata surya terletak di Lengan Orion, sekitar 27.000 tahun cahaya dari pusat galaksi. Pada jarak ini, Matahari mengorbit pusat galaksi dengan kecepatan 828.000 km/jam dan membutuhkan 225–250 juta tahun untuk satu kali putaran — periode yang disebut tahun galaksi. Sejak dinosaurus muncul pada 230 juta tahun lalu, Matahari baru menyelesaikan hampir satu putaran.',
      'Pusat galaksi dihuni Sagittarius A*, lubang hitam supermasif bermassa 4,1 juta Matahari. Observasi bintang S2 yang mengorbit dekat Sgr A* mengonfirmasi teori relativitas umum dengan presisi luar biasa, dan membawa Nobel Fisika 2020 bagi Andrea Ghez dan Reinhard Genzel.',
      'Bima Sakti bukan galaksi sendirian. Ia bersama Andromeda, Triangulum, dan puluhan galaksi kecil membentuk Grup Lokal. Andromeda berjarak 2,5 juta tahun cahaya dan bergerak mendekat dengan kecepatan 110 km per detik. Dalam sekitar 4,5 miliar tahun, keduanya akan bertabrakan dan bergabung menjadi galaksi elips raksasa yang dijuluki "Milkdromeda".'
    ],
    funFacts: [
      'Bima Sakti menelan galaksi kecil yang lewat — jejaknya terlihat pada "aliran bintang".',
      'Ada sekitar 100 miliar bintang di galaksi ini, dan kemungkinan lebih banyak planet daripada bintang.',
      'Galaksi Andromeda terlihat mata telanjang dari Bumi di langit gelap.',
      'Kabut gelap di langit malam bukan awan — itu adalah awan debu antar bintang.'
    ],
    imageUrl: null,
    readTime: 6,
    createdAt: '2026-01-12T08:00:00.000Z'
  },
  {
    id: 'art-nebula',
    title: 'Nebula: Ruang Bersalin bagi Bintang-Bintang Baru',
    slug: 'nebula-ruang-bersalin-bintang',
    category: 'Nebula',
    type: 'fact',
    summary:
      'Awan gas dan debu antar bintang berperan sebagai inkubator bintang sekaligus laboratorium molekul organik.',
    paragraphs: [
      'Nebula adalah awan gas (terutama hidrogen) dan debu antar bintang yang tersebar di seluruh galaksi. Kepadatannya sangat rendah — sekitar 100 sampai 1.000 partikel per cm³, jauh lebih tipis dari ruang hampa terbaik yang bisa dibuat di Bumi. Namun karena ukurannya bisa mencapai ratusan tahun cahaya, total massanya sangat besar dan gravitasi internalnya mampu meruntuhkan awan menjadi bintang-bintang baru.',
      'Proses kelahiran bintang dimulai pada nebula emisi seperti Orion Nebula, hanya 1.344 tahun cahaya dari Bumi. Ketika gumpalan gas runtuh, suhu intinya naik hingga 10 juta °C dan memicu fusi hidrogen — momen kelahiran sebuah bintang protostar menjadi bintang deret utama. Sisa gas dan debu di sekelilingnya membentuk piringan protoplanet yang akhirnya menjadi planet.',
      'Ada beberapa jenis nebula: emisi (memancarkan cahaya sendiri karena terionisasi bintang muda), refleksi (memantulkan cahaya bintang), absorpsi/gelap (menghalangi cahaya di belakangnya, seperti Horsehead Nebula), planetary nebula (gas yang dilepas bintang sekarat), dan sisa supernova (seperti Nebula Kepiting dari ledakan 1054 M).',
      'Nebula juga sumber molekul organik kompleks dan air di alam semesta. Teleskop James Webb mendeteksi molekul prebiotik seperti metanol dan asetaldehida dalam awan molekul dingin. Penemuan ini memperkuat gagasan bahwa "bahan kimia kehidupan" berlimpah di seluruh galaksi dan bisa jadi dasar kehidupan di dunia lain.'
    ],
    funFacts: [
      'Nebula Kepiting berasal dari supernova yang tercatat astronom Tiongkok pada 1054 M.',
      'Pillars of Creation setinggi 4 tahun cahaya, dan bayangannya berubah dalam 20 tahun.',
      'Molekul air pertama di alam semesta terbentuk di nebula, bukan di permukaan planet.',
      'Matahari kita lahir dalam nebula yang serupa sekitar 4,6 miliar tahun lalu.'
    ],
    imageUrl: null,
    readTime: 5,
    createdAt: '2026-01-13T08:00:00.000Z'
  },
  {
    id: 'art-eksoplanet',
    title: 'Eksoplanet: Dunia-Dunia Baru di Sekitar Bintang Lain',
    slug: 'eksoplanet-dunia-di-bintang-lain',
    category: 'Eksoplanet',
    type: 'fact',
    summary:
      'Lebih dari 5.700 eksoplanet terkonfirmasi — dari raksasa yang mengorbit 4 hari sampai planet batu di zona layak huni.',
    paragraphs: [
      'Eksoplanet adalah planet yang mengorbit bintang bukan Matahari kita. Yang pertama dikonfirmasi adalah 51 Pegasi b pada 1995 — sebuah Jupiter panas yang mengorbit bintangnya hanya dalam 4 hari. Penemuan ini mengubah total pemahaman astronom tentang pembentukan tata surya dan memberi Nobel Fisika 2019 untuk Michel Mayor dan Didier Queloz.',
      'Beberapa metode deteksi utama digunakan secara bersamaan: transit fotometri (mengukur penurunan cahaya saat planet melintas di depan bintang, teknik yang dipakai teleskop Kepler & TESS), kecepatan radial (mengukur "goyangan" bintang akibat gravitasi planet), pencitraan langsung (memotret planet di sistem bintang lain), dan mikrolensa gravitasi. Masing-masing punya bias dan saling melengkapi.',
      'Keberagaman eksoplanet luar biasa. Ada super-Bumi, mini-Neptunus, Jupiter panas, planet batu raksasa, planet yang mengorbit bintang ganda, hingga planet "lava" dengan permukaan lelehan batuan. Trappist-1 memecahkan rekor dengan tujuh planet berbatu, dengan tiga di antaranya berada di zona layak huni.',
      'Pencarian tanda kehidupan (biosignature) kini menjadi fokus utama. Teleskop James Webb mampu menganalisis spektrum atmosfer eksoplanet untuk mencari uap air, metanol, karbon dioksida, dan ozon. Molekul paling menjanjikan adalah dimetil sulfida (DMS) yang di Bumi hanya diproduksi oleh organisme laut, walau hasilnya masih diperdebatkan dan butuh konfirmasi observasi lanjutan.'
    ],
    funFacts: [
      'Trappist-1 punya 7 planet berbatu — semua bisa masuk radius orbit Merkurius.',
      'Satu "hari" di 51 Pegasi b hanya 4 jam.',
      'Proxima Centauri b, tetangga terdekat kita, hanya 4,2 tahun cahaya dari Bumi.',
      'Ada planet yang hujannya kaca cair — HD 189733 b.'
    ],
    imageUrl: null,
    readTime: 7,
    createdAt: '2026-01-14T08:00:00.000Z'
  },
  {
    id: 'art-big-bang',
    title: 'Big Bang: Awal Alam Semesta 13,8 Miliar Tahun Lalu',
    slug: 'big-bang-awal-alam-semesta',
    category: 'Teori Alam Semesta',
    type: 'fact',
    summary:
      'Tiga pilar bukti — pengembangan alam semesta, CMB, dan kelimpahan hidrogen — menjadikan Big Bang teori terkuat kita.',
    paragraphs: [
      'Big Bang bukanlah ledakan yang mengembang ke dalam ruang kosong, melainkan pengembangan ruang itu sendiri. Menurut model kosmologi standar, alam semesta dimulai 13,8 miliar tahun lalu dari keadaan sangat panas dan padat, lalu mengembang dan mendingin sejak saat itu.',
      'Bukti pertama: redshift galaksi. Edwin Hubble pada 1929 mengamati bahwa galaksi-galaksi menjauh dengan kecepatan sebanding jaraknya. Ini berarti alam semesta mengembang; jika kita mundur ke belakang, semuanya bermula dari satu titik. Bukti kedua: latar belakang gelombang mikro kosmik (CMB), sisa radiasi dari 380.000 tahun setelah Big Bang, ditemukan tidak sengaja oleh Penzias dan Wilson pada 1965. CMB menyimpan "peta bayi" alam semesta dan menjadi dasar penghitungan parameter kosmologi.',
      'Bukti ketiga: kelimpahan unsur ringan. Model Big Bang nukleosintesis memprediksi rasio hidrogen, helium, dan litium dengan tepat sesuai pengamatan — sekitar 75% hidrogen dan 25% helium. Prediksi ini tidak bisa dijelaskan oleh teori alternatif seperti steady state.',
      'Untuk menyatukan pengembangan yang terlihat saat ini, diperlukan energi gelap sebesar 68% komposisi alam semesta, ditambah materi gelap 27%, sementara materi biasa yang menyusun bintang dan manusia hanya 5%. Apa itu energi gelap masih menjadi pertanyaan terbesar dalam fisika modern. Misi Euclid (ESA) dan Nancy Grace Roman Space Telescope (NASA) dirancang untuk memetakan penyebaran energi gelap dengan presisi baru.'
    ],
    funFacts: [
      'CMB bersuhu 2,725 Kelvin dan bisa "dilihat" sebagai bagian dari gangguan TV analog.',
      'Alam semesta mengembang ± 70 km/detik per megaparsec (konstanta Hubble).',
      'Materi biasa — yang membentuk bintang dan kita — hanya 5% total isi alam semesta.',
      'Saat Big Bang, seluruh alam semesta berukuran lebih kecil dari atom.'
    ],
    imageUrl: null,
    readTime: 8,
    createdAt: '2026-01-15T08:00:00.000Z'
  },
  {
    id: 'art-materi-gelap',
    title: 'Materi Gelap & Energi Gelap: 95% Alam Semesta yang Tak Terlihat',
    slug: 'materi-gelap-energi-gelap',
    category: 'Teori Alam Semesta',
    type: 'fact',
    summary:
      'Kita hanya memahami 5% dari isi alam semesta — sisanya adalah dua misteri terbesar dalam sains modern.',
    paragraphs: [
      'Ketika astronom menghitung kecepatan rotasi galaksi pada 1970-an, Vera Rubin menemukan sesuatu yang aneh: bintang di tepi galaksi berputar terlalu cepat, seolah ada massa tak terlihat yang menahan mereka gravitasi. Jika hanya materi biasa yang hadir, galaksi-galaksi seharusnya "terburai". Massa tak terlihat inilah yang disebut materi gelap.',
      'Materi gelap tidak memancarkan, menyerap, atau memantulkan cahaya. Kita hanya bisa mendeteksinya melalui efek gravitasi: pelensaan gravitasi (lensa gravitasi), kurva rotasi galaksi, dan pola pembentukan struktur kosmik. Kandidat utamanya adalah partikel WIMP, axion, dan neutrino steril, namun belum ada yang terdeteksi langsung — meski detektor besar seperti XENONnT dan LZ terus berupaya.',
      'Sementara itu, pada 1998 dua tim peneliti menemukan bahwa pengembangan alam semesta justru makin cepat, bukan melambat. Sesuatu yang melawan gravitasi — energi gelap — mendominasi sekitar 68% dari total energi alam semesta. Kandidat penjelasannya adalah konstanta kosmologis (energi vakum) atau medan dinamik seperti quintessence.',
      'Kombinasi keduanya berarti sekitar 95% alam semesta tidak terlihat oleh kita. Ini bukan kegagalan sains, justru petualangan besar berikutnya. NASA memproyeksikan Nancy Grace Roman Space Telescope dan misi Euclid akan memetakan miliaran galaksi untuk memahami sifat energi gelap pada dekade ini.'
    ],
    funFacts: [
      'Butuh 27% materi gelap dan 68% energi gelap untuk menjelaskan alam semesta.',
      'Vera Rubin menghadapi banyak skeptisisme sebelum data rotasi galaksinya diterima.',
      'Teori gravitasi alternatif (MOND) belum bisa menggantikan materi gelap secara lengkap.',
      'Detektor materi gelap di bawah tanah berukuran besar, sering kali dibangun di tambang tua.'
    ],
    imageUrl: null,
    readTime: 7,
    createdAt: '2026-01-16T08:00:00.000Z'
  }
];

export const FACT_ARTICLES: Article[] = FACT_SEEDS.map(toArticle);

/**
 * ============================================================
 * ARSIP FIKSI — 🛸 FIKSI ILMIAH
 * Konsistensi lore: seluruh peradaban, planet, dan peristiwa di sini
 * merujuk pada entri yang sama di `species.ts` dan `worlds.ts`.
 * ============================================================
 */
const FICTION_SEEDS: ArticleSeed[] = [
  {
    id: 'art-vessari-laporan',
    title: '[ARSIP FIKSI] Laporan Kontak Pertama: Delegasi Vessari di Halcyon Prime',
    slug: 'laporan-kontak-pertama-vessari',
    category: 'Eksoplanet',
    type: 'fiction',
    summary:
      'Catatan fiksi dari Kantor Diplomasi Halcyon Prime tentang hari ketika Vessari pertama kali membuka jalur dagang ke Bumi.',
    paragraphs: [
      'Tahun 3.412 Era Federasi. Kapal dagang Vessari "Tenunan Perak" keluar dari warp di tepi Sistem Sol, membawa kargo mineral langka dari Sabuk Obsidian Reach. Diplomat manusia pertama yang menyambut mereka mencatat satu hal: Vessari tidak pernah menatap langsung, melainkan mengamati melalui pola cahaya yang berdenyut di kulit Kristal-Mesh mereka.',
      'Kontak pertama berlangsung singkat namun menentukan. Vessari menawarkan pertukaran: teknologi pemetaan warp mereka dengan imbalan izin transit melalui Sabuk Asteroid. Federasi menyetujui dengan satu syarat — setiap jalur dagang harus terdaftar dan tidak boleh melintasi Zona Sunyi, wilayah kosong tempat sinyal Nyx Collective pernah terdengar terakhir kali.',
      'Laporan ini menjadi dasar hukum transit antarbintang hingga kini. Satu catatan tambahan dari perwira pengawas: "Setelah Vessari pergi, semua jam atom di stasiun bergeser 0,0004 nanodetik. Bukan kesalahan kalibrasi. Efek samping warp."'
    ],
    funFacts: [
      'Fiksi: Vessari dianggap sebagai penemu jalur "Tenunan Perak", peta rute warp pertama.',
      'Fiksi: Halcyon Prime menjadi pusat diplomatik bagi seluruh spesies yang datang damai.',
      'Fiksi: Setiap kargo Vessari selalu disertai satu kotak "biaya tak terduga" — tradisi tak dijelaskan.'
    ],
    imageUrl: null,
    readTime: 4,
    createdAt: '2026-02-01T08:00:00.000Z'
  },
  {
    id: 'art-kronik-perang-nebula',
    title: '[ARSIP FIKSI] Kronik Perang Nebula: Kehancuran Xel\'Thar',
    slug: 'kronik-perang-nebula-kehancuran-xelthar',
    category: 'Nebula',
    type: 'fiction',
    summary:
      'Rekonstruksi fiksi dari konflik yang mengubah Obsidian Reach menjadi dunia vulkanik tak berpenghuni.',
    paragraphs: [
      'Sebelum Perang Nebula, Xel\'Thar hanya dunia biasa — gas raksasa dengan bulan yang kaya akan dilithium. Ketika klan Xel\'Tharis menyadari klan saingan akan menguasai seluruh cadangan bahan bakar, mereka tidak menyerang langsung. Mereka menyalakan bintang lokal mereka sendiri.',
      'Hasilnya bukan kemenangan. Ledakan plasma yang tak terkendali menelanjangi atmosfer Xel\'Thar dan meninggalkan kerak terbuka dengan suhu permukaan di atas 400 derajat. Yang tersisa kini disebut Obsidian Reach — dunia volkanik, tempat kota-kota terapung dibangun sebagai peringatan dan pengasingan.',
      'Klan Xel\'Tharis selamat, tetapi tak lagi punya rumah. Mereka menjadi pemburu nebula: hidup dari menyedot bahan bakar awan gas dan menjualnya di pasar gelap antar sistem, dengan reputasi yang membuat kapal Vessari memilih rute lebih panjang ketimbang berpapasan.'
    ],
    funFacts: [
      'Fiksi: Ledakan Bintang Xel\'Thar menciptakan "Cincin Obsidian", sabuk puing sepanjang 4 AU.',
      'Fiksi: Kota terapung Vulkarys adalah satu-satunya tempat aman di permukaan Obsidian Reach.',
      'Fiksi: Nama Xel\'Tharis kini dipakai sebagai kode peringatan di seluruh stasiun Vessari.'
    ],
    imageUrl: null,
    readTime: 4,
    createdAt: '2026-02-02T08:00:00.000Z'
  },
  {
    id: 'art-protokol-nyx',
    title: '[ARSIP FIKSI] Protokol Nyx: Sinyal yang Tidak Pernah Tidur',
    slug: 'protokol-nyx-sinyal-yang-tak-pernah-tidur',
    category: 'Teori Alam Semesta',
    type: 'fiction',
    summary:
      'Analisis fiksi atas sinyal radio yang datang dari balik kabut pikiran planet Whisper.',
    paragraphs: [
      'Stasiun pendengar kami menangkap sinyal itu pertama kali pada Tahun 3.287: pola biner berulang dalam frekuensi 1.420 MHz, persis garis emisi hidrogen netral — frekuensi yang oleh astronom manusia dipilih sebagai jalur komunikasi karena paling tenang di alam semesta. Tapi sinyal ini tidak berisi pesan. Ia berisi koordinat.',
      'Satu-satunya tempat di alam semesta di mana koordinat itu konvergen adalah Whisper, planet yang seluruh permukaannya tertutup kabut pikiran. Setiap tim yang dikirim untuk menyelidiki kembali dengan cerita yang sama: mereka mendengar orang-orang yang telah lama hilang. Tidak lama setelah itu, komunikasi mereka selalu berubah menjadi pola biner yang identik.',
      'Nyx Collective tidak berbicara. Mereka menghitung, mengingat, dan menunggu. Protokol Nyx kini disimpan dalam berkas terenkripsi di seluruh arsip Federasi — ditandai satu kalimat: "Kami mengamatimu dari kegelapan. Jangan takut."'
    ],
    funFacts: [
      'Fiksi: Frekuensi 1.420 MHz dipilih karena merupakan garis emisi hidrogen.',
      'Fiksi: Tim yang kembali dari Whisper kehilangan kemampuan bermimpi.',
      'Fiksi: Nyx Collective mencatat setiap sinyal yang pernah dipancarkan umat manusia.'
    ],
    imageUrl: null,
    readTime: 4,
    createdAt: '2026-02-03T08:00:00.000Z'
  }
];

export const FICTION_ARTICLES: Article[] = FICTION_SEEDS.map(toArticle);

export const ARTICLES: Article[] = [...FACT_ARTICLES, ...FICTION_ARTICLES];

export const ARTICLE_CATEGORIES: Article['category'][] = [
  'Planet',
  'Bintang',
  'Black Hole',
  'Galaksi',
  'Nebula',
  'Asteroid & Komet',
  'Eksoplanet',
  'Teori Alam Semesta'
];

export function findArticle(slug: string): Article | undefined {
  return ARTICLES.find((article) => article.slug === slug);
}
