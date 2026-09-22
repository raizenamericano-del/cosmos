import type { AlienSpecies } from '@/lib/types';

/**
 * ============================================================
 * ALIEN CODEX — 🛸 FIKSI ILMIAH
 * Lore konsisten dengan `worlds.ts`:
 *  - Aurelians        ➜ Elyria
 *  - Xel'Tharis       ➜ Obsidian Reach (dulunya Xel'Thar)
 *  - Nyx Collective   ➜ Whisper
 *  - Vessari          ➜ Halcyon Prime
 *  - Zephyrians       ➜ Aetheris (raksasa gas di sistem Vessari), sering transit di Cryon Veil
 * ============================================================
 */
export const ALIEN_SPECIES: AlienSpecies[] = [
  {
    id: 'sp-xeltharis',
    name: "Xel'Tharis",
    slug: 'xeltharis',
    homePlanet: 'Obsidian Reach',
    homePlanetSlug: 'obsidian-reach',
    kardashevLevel: 'II',
    status: 'berbahaya',
    abilities: [
      'Siphon Plasma — menyerap energi langsung dari korona bintang',
      'Crucible Armor — armor hidup yang mengeras saat terkena tembakan',
      'Echo Hunt — melacak jejak warp lawan hingga 3 sistem bintang',
      'Nebula Forge — membuat bahan bakar dari awan gas tanpa kilang'
    ],
    lore:
      'Klan Xel\'Tharis dulu adalah penambang bintang yang dihormati. Ketika mereka menyalakan bintang lokal mereka sendiri demi memenangkan perang, ledakan plasma menghancurkan rumah mereka dan mengubahnya menjadi dunia obsidian. Kini mereka hidup sebagai pemburu nebula — mengembara dari satu awan gas ke awan gas lain, menjual bahan bakar gelap di pasar hitam antarbintang. Mereka tidak membunuh tanpa alasan, tetapi mereka juga tidak pernah melupakan siapa yang menutup pintu bagi mereka saat mereka membutuhkan tempat berlindung.',
    appearance:
      'Humanoid setinggi 2,4 meter dengan kulit berupa lempeng obsidian bercahaya jingga di sela-selanya. Mahkota tulang mineral bercabang seperti karang vulkanik. Suara mereka rendah, seperti gemuruh lempeng tektonik yang terbaca sebagai bahasa.',
    avatarUrl: null,
    accentColor: '#f97316'
  },
  {
    id: 'sp-aurelians',
    name: 'Aurelians',
    slug: 'aurelians',
    homePlanet: 'Elyria',
    homePlanetSlug: 'elyria',
    kardashevLevel: 'I',
    status: 'damai',
    abilities: [
      'Luminescent Bloom — menumbuhkan flora bercahaya dalam hitungan detik',
      'Tidal Whisper — berkomunikasi dengan makhluk laut Elyria lewat resonansi',
      'Bio-Archive — menyimpan ingatan spesies dalam jaringan akar selama ribuan tahun',
      'Healing Sap — bioteknologi penyembuh jaringan yang belum bisa direplikasi umat manusia'
    ],
    lore:
      'Aurelians membangun peradaban tanpa mesin berat. Mereka menanam, bukan menambang; mereka memanen energi dari laut emas Elyria dan dari simbiosis dengan hutan luminescen. Pengetahuan mereka tidak ditulis di buku, tetapi disimpan dalam jaringan akar pohon-pohon cahaya yang mengelilingi seluruh planet. Ketika utusan Vessari pertama mendarat, Aurelians menyambut mereka dengan sebuah pertanyaan sederhana: "Apa yang kamu tinggalkan agar dunia ini lebih hidup dari sebelumnya?"',
    appearance:
      'Makhluk bipedal ramping dengan tinggi 1,8 meter, kulit tembus cahaya berwarna gading-kuning, dan rambut berupa serat fotosintetik yang berdenyut lembut ketika mereka berpikir. Mata mereka besar dengan pupil horizontal seperti kijang, dan tiap langkah mereka meninggalkan jejak spora bercahaya beberapa detik.',
    avatarUrl: null,
    accentColor: '#facc15'
  },
  {
    id: 'sp-nyx',
    name: 'Nyx Collective',
    slug: 'nyx-collective',
    homePlanet: 'Whisper',
    homePlanetSlug: 'whisper',
    kardashevLevel: 'III',
    status: 'misterius',
    abilities: [
      'Mind Tide — menyiarkan pikiran kolektif melalui kabut planet',
      'Signal Mimicry — meniru sinyal komunikasi spesies lain dengan akurasi sempurna',
      'Recollection — mengumpulkan ingatan setiap entitas yang pernah menyentuh jaringannya',
      'Silent Recall — memadamkan seluruh komunikasi elektromagnetik dalam radius 1 AU'
    ],
    lore:
      'Tidak ada yang tahu apakah Nyx Collective adalah satu makhluk atau miliaran. Yang diketahui: seluruh permukaan Whisper tertutup kabut pikiran, dan siapa pun yang bernapas di dalamnya akan mendengar suara orang-orang yang mereka cintai. Nyx tidak pernah menyerang, tidak pernah menuntut, tetapi juga tidak pernah berhenti mengamati. Peradaban mereka menguasai energi setara galaksi, namun tidak ada satu pun struktur buatan Nyx yang pernah terlihat dari orbit — mungkin karena mereka sendiri adalah strukturnya.',
    appearance:
      'Tidak konsisten. Saksi melaporkan siluet gelap setinggi 3 meter dengan tepi yang terus berubah seperti kabut; beberapa melaporkan melihat wajah mereka sendiri di dalamnya. Rekaman kamera selalu berisi noise biner yang berulang — pola yang sama dengan sinyal yang mereka kirim ke stasiun pendengar manusia.',
    avatarUrl: null,
    accentColor: '#8b5cf6'
  },
  {
    id: 'sp-vessari',
    name: 'Vessari',
    slug: 'vessari',
    homePlanet: 'Halcyon Prime',
    homePlanetSlug: 'halcyon-prime',
    kardashevLevel: 'II',
    status: 'netral',
    abilities: [
      'Warp Weave — menenun jalur warp stabil tanpa merusak ruang-waktu lokal',
      'Trade Sense — memprediksi nilai komoditas antarbintang dengan presisi 94%',
      'Crystal Mesh Comms — berbicara melalui denyut cahaya di kulit kristal',
      'Neutral Protocol — protokol diplomasi yang dihormati semua spesies besar'
    ],
    lore:
      'Vessari tidak pernah menyatakan perang pada siapa pun selama 800 tahun terakhir — bukan karena mereka lemah, tetapi karena perang buruk untuk perdagangan. Mereka membangun jalur "Tenunan Perak", jaringan rute warp yang menghubungkan 40 sistem bintang, dan menjadikan Halcyon Prime sebagai pusat diplomatik seluruh spesies. Di balik keramahan itu, Vessari menyimpan arsip rahasia: catatan lengkap kekuatan setiap peradaban yang pernah mereka temui.',
    appearance:
      'Berkaki empat seperti krustasea darat, tubuh setinggi 2 meter dengan kulit berupa lempeng kristal yang berdenyut warna sesuai emosi. Tidak memiliki mata konvensional — mereka "melihat" melalui getaran cahaya di seluruh permukaan tubuh.',
    avatarUrl: null,
    accentColor: '#22d3ee'
  },
  {
    id: 'sp-zephyrians',
    name: 'Zephyrians',
    slug: 'zephyrians',
    homePlanet: 'Aetheris',
    homePlanetSlug: null,
    kardashevLevel: 'I',
    status: 'damai',
    abilities: [
      'Atmosferik Adaptasi — hidup sempurna di tekanan 40 kali atmosfer Bumi',
      'Badai Ride — terbang mengikuti aliran jet raksasa gas untuk berpindah benua awan',
      'Gas Harvest — mengubah metana dan amonia menjadi makanan serta bahan bakar',
      'Sky Song — navigasi melalui gelombang suara di dalam atmosfer gas'
    ],
    lore:
      'Zephyrians tidak pernah menyentuh permukaan planet. Mereka lahir di awan, hidup di awan, dan mati di awan — raksasa gas Aetheris adalah satu-satunya dunia yang mereka kenal. Peradaban mereka berupa kota-kota balon kristal yang mengambang pada ketinggian 900 km, dihubungkan oleh jaringan "jalan angin" yang bergerak. Karena tidak memiliki permukaan untuk ditambang, Zephyrians mengembangkan bioteknologi paling efisien untuk mengubah gas menjadi segala hal, termasuk air dan oksigen untuk spesies lain. Mereka sering menjadi perantara logistik di pasar Halcyon Prime dan penyelamat bagi kapal yang rusak di Cryon Veil.',
    appearance:
      'Makhluk setinggi 3,5 meter dengan tubuh berongga seperti balon biologi, empat sirip membran lebar, dan tenda-tenda halus untuk mengarahkan arus udara. Kulit mereka transparan kebiruan dengan pola gas yang bergerak di dalamnya — pola ini berfungsi seperti sidik jari dan tanda identitas.',
    avatarUrl: null,
    accentColor: '#38bdf8'
  }
];

export const SPECIES_STATUSES = ['damai', 'netral', 'berbahaya', 'misterius'] as const;

export function findSpecies(slug: string): AlienSpecies | undefined {
  return ALIEN_SPECIES.find((species) => species.slug === slug);
}
