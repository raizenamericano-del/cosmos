# 🪐 Cosmos Academy

**Platform Eksplorasi Alam Semesta & Peradaban Luar Angkasa** — menggabungkan **edukasi astronomi yang akurat** dengan **fiksi ilmiah yang interaktif**, dipisahkan secara tegas lewat label:

- 📚 **FAKTA ILMIAH** — data & konsep astronomi yang dapat diverifikasi (NASA/ESA)
- 🛸 **FIKSI ILMIAH** — konten imajinatif yang selalu diberi label fiksi

---

## ✨ Fitur Utama

### 📚 Dunia Edukasi (Fakta Ilmiah)

| Fitur | Halaman | Deskripsi |
| --- | --- | --- |
| Hero Starfield Interaktif | `/` | Starfield WebGL (React Three Fiber) yang merespons gerakan mouse, ratusan bintang, nebula, asteroid, dan shooting star |
| Tata Surya 3D Interaktif | `/tata-surya` | 8 planet + Matahari, drag untuk rotate, scroll untuk zoom, klik planet → panel detail (diameter, jarak, suhu, satelit, fun facts), **Mode Orbital** & **Mode Jelajah** |
| Ensiklopedia | `/ensiklopedia` | 12 artikel edukasi + arsip fiksi, pencarian, filter kategori/dunia, sorting, kartu dengan efek tilt 3D, bookmark |
| Black Hole Explorer | `/lubang-hitam` | Visualisasi accretion disk + event horizon, slider massa → radius Schwarzschild berubah real-time, penjelasan event horizon, singularitas, radiasi Hawking, piringan akresi |
| Kuis Astronomi | `/kuis` | 30 soal / 4 kategori, progress bar, timer per pertanyaan, penjelasan jawaban, rank (Crew Cadet → Starship Captain), tombol share |
| Papan Skor | `/papan-skor` | Leaderboard global tersimpan di PostgreSQL |

### 🛸 Dunia Fiksi Ilmiah (selalu berlabel 🛸)

| Fitur | Halaman | Deskripsi |
| --- | --- | --- |
| Alien Codex | `/codex-alien` | 5 peradaban: Xel'Tharis, Aurelians, Nyx Collective, Vessari, Zephyrians — avatar ilustrasi, planet asal, level Kardashev, kemampuan unik, status, lore. Efek hologram + scanline saat membuka detail |
| Atlas Dunia Fiksi | `/atlas-dunia` | 5 planet: Elyria, Obsidian Reach, Whisper, Halcyon Prime, Cryon Veil — atmosfer, penghuni, sumber daya, **danger level** & **beauty score** |
| Interstellar Travel Simulator | `/simulator-perjalanan` | Pilih asal & tujuan (bintang nyata / planet fiksi) + mesin (Warp / Hyperspace / Lightfold) → estimasi waktu, dilithium fuel, % risiko anomali, animasi rute di peta galaksi, **boarding pass PNG yang bisa diunduh** |
| Sinyal Misterius | `/sinyal-misterius` | Mini-game decode 4 sinyal: biner → Caesar cipher → ROT13 → substitusi simbol alien. Setelah benar, muncul pesan dari alien + badge |
| Portal Multiverse | `/portal-multiverse` | Animasi wormhole partikel + lompatan ke 3 timeline alternatif dengan efek distorsi layar |
| Cuaca Antariksa | `/cuaca-antariksa` | Prakiraan bergaya weather app dengan seed per tanggal (konsisten seharian) |

### 🥚 Easter Eggs & Achievement

1. **Glitch alien** — ketik `alien` di kotak pencarian Ensiklopedia
2. **Bintang rahasia** — klik bintang di hero **5×** → membuka halaman `/rahasia`
3. **404 "LOST IN SPACE"** — astronaut mengambang + petunjuk
4. **Konami Code** `↑ ↑ ↓ ↓ ← → ← → B A` → mode Hyperspace 10 detik
5. **Terminal rahasia** di `/rahasia` — coba perintah `hidden`

12 achievement tersimpan ke akun (atau localStorage sebagai tamu): *First Contact, Wormhole Explorer, Signal Hunter, Galactic Cartographer, Paradise Seeker, Black Hole Diver, Quiz Champion, Stargazer, Lexicon Keeper, Sector Cartographer, Hyperspace Rider, Signal Master* — lengkap dengan modal unlock beranimasi + konfeti bintang.

---

## 🧱 Stack Teknologi

| Lapisan | Teknologi |
| --- | --- |
| Framework | Next.js 14 (App Router), TypeScript (strict), React 18 |
| Styling | Tailwind CSS 3 + glassmorphism kustom, Framer Motion, Lucide Icons |
| 3D / Visual | React Three Fiber, @react-three/drei, three.js, **tekstur prosedural Canvas 2D** (tanpa aset gambar eksternal) |
| Backend | Next.js API Routes (zod validation) |
| Database | PostgreSQL (Supabase-ready) + Prisma ORM |
| Auth | NextAuth (credentials + bcrypt, opsional Google/GitHub) |
| Deploy | Vercel (production-ready, seluruh API key via env) |

> **Mode Demo:** seluruh repository otomatis memakai data statis di `src/lib/data/*` bila `DATABASE_URL` kosong — jadi proyek **tetap bisa dijalankan & di-deploy tanpa database**.

---

## 🚀 Setup Lokal

### 1. Prasyarat

- Node.js **≥ 18.17**
- PostgreSQL 14+ (lokal, Supabase, Neon, atau Docker)

### 2. Clone & install

```bash
git clone https://github.com/USERNAME/cosmos-academy.git
cd cosmos-academy
npm install
```

### 3. Konfigurasi environment

```bash
cp .env.example .env
```

Isi minimal:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cosmos_academy?schema=public"
DIRECT_URL="postgresql://postgres:postgres@localhost:5432/cosmos_academy?schema=public"
NEXTAUTH_SECRET="hasil-dari-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
```

> Lewati langkah database bila ingin mencoba **mode demo** (data statis, progress disimpan di perangkat).

### 4. Migrasi + seed database

```bash
npx prisma db push      # atau: npx prisma migrate deploy
npm run db:seed         # 15 artikel, 5 spesies, 5 planet, 30 soal, 4 sinyal, 2 user demo
```

**Akun demo yang dibuat seed:**

| Email | Password | Role |
| --- | --- | --- |
| `cadet@cosmos.academy` | `cosmos123` | cadet |
| `captain@cosmos.academy` | `cosmos123` | captain |

### 5. Jalankan

```bash
npm run dev     # http://localhost:3000
```

Perintah lain:

```bash
npm run build       # prisma generate + next build
npm start           # serve hasil build
npm run lint        # ESLint (bersih tanpa warning)
npm run typecheck   # tsc --noEmit
npm run db:studio   # Prisma Studio
```

---

## 🔐 Variabel Environment

| Variabel | Wajib | Keterangan |
| --- | --- | --- |
| `DATABASE_URL` | disarankan | Connection string PostgreSQL (Supabase: gunakan pooler port 6543 untuk runtime) |
| `DIRECT_URL` | opsional | Koneksi langsung untuk migrasi (`prisma db push` / `migrate`) |
| `NEXTAUTH_SECRET` | **ya** (produksi) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | **ya** (produksi) | URL publik aplikasi |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | opsional | Login Google |
| `GITHUB_ID` / `GITHUB_SECRET` | opsional | Login GitHub |
| `NEXT_PUBLIC_SITE_URL` | opsional | Dipakai untuk metadata, sitemap, robots |
| `NEXT_PUBLIC_ENABLE_DEMO_SEED` | opsional | Menandai mode demo |

Tidak ada API key yang di-hardcode. Semua akses rahasia lewat `process.env`.

---

## 🗄️ Struktur Database (Prisma)

```
users(id, email, name, image, passwordHash, role, created_at, updated_at)
accounts, sessions, verification_tokens       → NextAuth
articles(id, title, slug, category, type[fact|fiction], summary, content, fun_facts[], image_url, read_time)
alien_species(id, name, slug, home_planet, home_planet_slug, kardashev_level, status, abilities[], lore, appearance, accent_color)
fictional_planets(id, name, slug, tagline, description, atmosphere, inhabitants, resources[],
                  danger_level, beauty_score, theme_color, gradient_from, gradient_to)
quiz_questions(id, category, question, options[], correct_answer, explanation, difficulty, order)
quiz_results(id, user_id, category, score, total, played_at)
bookmarks(id, user_id, article_id)            → unique(user_id, article_id)
achievements(id, user_id, badge_name, description, unlocked_at) → unique(user_id, badge_name)
signals(id, title, difficulty, encoded_message, decoded_message, hint, cipher, sender, reward_badge, order)
```

---

## 🔌 API Routes

| Method | Endpoint | Keterangan |
| --- | --- | --- |
| `GET` | `/api/health` | Status aplikasi + mode database (demo/database) |
| `GET` | `/api/articles` | Filter `?category=&type=&q=&sort=terbaru\|terlama\|judul\|baca` |
| `GET` | `/api/bookmarks` | Bookmark milik pengguna (butuh sesi) |
| `POST` | `/api/bookmarks` | Toggle bookmark `{ articleSlug }` |
| `GET` | `/api/quiz/questions` | Bank soal **tanpa kunci jawaban** |
| `POST` | `/api/quiz/submit` | Penilaian server-side `{ category, answers }` + simpan hasil |
| `GET` | `/api/leaderboard` | Peringkat global |
| `GET`/`POST` | `/api/achievements` | Ambil / buka badge |
| `GET` | `/api/signals` | Daftar sinyal (tanpa pesan terdekode) |
| `POST` | `/api/signals/verify` | Verifikasi jawaban decode; pesan hanya dikirim bila benar |
| `POST` | `/api/travel` | Rencana perjalanan `{ origin, destination, engine }` |
| `GET` | `/api/space-weather` | Prakiraan fiksi dengan seed per tanggal |
| `POST` | `/api/auth/register` | Pendaftaran akun (bcrypt) |
| `GET/POST` | `/api/auth/[...nextauth]` | NextAuth |

---

## 📁 Struktur Proyek

```
cosmos-academy/
├── prisma/
│   ├── schema.prisma           # 13 model (auth, konten, kuis, gamifikasi)
│   └── seed.ts                 # data awal idempoten (upsert)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # font, metadata, provider global
│   │   ├── globals.css         # tema cosmic dark + glassmorphism
│   │   ├── page.tsx            # beranda (hero + 2 dunia konten)
│   │   ├── not-found.tsx       # 🥚 404 "LOST IN SPACE"
│   │   ├── error.tsx, loading.tsx, sitemap.ts, robots.ts
│   │   ├── tata-surya/         │ ensiklopedia/[slug]/  │ lubang-hitam/
│   │   ├── kuis/               │ papan-skor/           │ pencapaian/
│   │   ├── codex-alien/[slug]/ │ atlas-dunia/[slug]/   │ simulator-perjalanan/
│   │   ├── sinyal-misterius/   │ portal-multiverse/    │ cuaca-antariksa/
│   │   ├── masuk/              │ profil/               │ rahasia/  (🥚 easter egg)
│   │   └── api/                # 14 route handler
│   ├── components/
│   │   ├── hero/               # starfield-scene (R3F) + hero-section
│   │   ├── solar-system/       # canvas 3D + explorer
│   │   ├── black-hole/         # visualisasi + explorer
│   │   ├── encyclopedia/       # browser, kartu, bookmark, glitch alien
│   │   ├── quiz/               # game + leaderboard
│   │   ├── codex/              # avatar prosedural SVG + galeri + dossier
│   │   ├── worlds/             # galeri + dossier planet fiksi
│   │   ├── travel/             # simulator + peta galaksi SVG
│   │   ├── signals/            # decoder
│   │   ├── multiverse/         # portal wormhole (Canvas 2D)
│   │   ├── weather/            # panel cuaca antariksa
│   │   ├── achievements/       # grid badge
│   │   ├── layout/             # header, footer, page hero
│   │   └── ui/                 # primitif: button, glass, tilt card, typewriter, dst.
│   ├── context/                # sound, achievement, hyperspace (Konami)
│   ├── hooks/                  # useLocalStorage
│   ├── lib/
│   │   ├── data/               # KONTEN SEED (artikel, spesies, dunia, kuis, sinyal, tata surya)
│   │   ├── repositories/       # akses data: Prisma → fallback statis
│   │   ├── three/textures.ts   # tekstur prosedural (planet, matahari, cincin, nebula, akresi)
│   │   ├── physics.ts          # rumus Schwarzschild, Hawking, ISCO, tidal, dilatasi waktu
│   │   ├── travel.ts           # mesin warp/hyperspace/lightfold + kalkulasi rute
│   │   ├── space-weather.ts    # generator cuaca ber-seed
│   │   ├── ciphers.ts          # biner, Caesar, ROT13, simbol alien
│   │   ├── boarding-pass.ts    # render boarding pass ke PNG (Canvas)
│   │   ├── auth.ts             # konfigurasi NextAuth
│   │   └── prisma.ts, types.ts, utils.ts, navigation.ts
│   └── types/next-auth.d.ts
├── .env.example
├── tailwind.config.ts
└── README.md
```

---

## ☁️ Deploy ke Vercel

1. **Push ke GitHub**

   ```bash
   git init
   git add .
   git commit -m "feat: Cosmos Academy — edukasi astronomi + fiksi ilmiah interaktif"
   git branch -M main
   git remote add origin https://github.com/USERNAME/cosmos-academy.git
   git push -u origin main
   ```

2. **Import ke Vercel** — [vercel.com/new](https://vercel.com/new) → pilih repo → framework terdeteksi **Next.js** (biarkan default).

3. **Tambahkan Environment Variables** (Settings → Environment Variables) untuk Production & Preview:

   ```
   DATABASE_URL, DIRECT_URL, NEXTAUTH_SECRET, NEXTAUTH_URL,
   NEXT_PUBLIC_SITE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GITHUB_ID, GITHUB_SECRET
   ```

   `NEXTAUTH_URL` = `https://nama-proyek.vercel.app` (tanpa slash di akhir).

4. **Deploy** — build menjalankan `prisma generate && next build`.

5. **Siapkan database produksi** (Supabase):

   ```bash
   DATABASE_URL="<supabase-pooler>" DIRECT_URL="<supabase-direct>" npx prisma migrate deploy
   DATABASE_URL="<supabase-pooler>" DIRECT_URL="<supabase-direct>" npm run db:seed
   ```

6. **Callback OAuth** (bila memakai Google/GitHub):
   `https://nama-proyek.vercel.app/api/auth/callback/google` dan `.../callback/github`

> ⚙️ **Catatan:** halaman konten memakai `revalidate` (ISR) sehingga query database saat build aman — bila database belum siap, aplikasi otomatis memakai data statis.

---

## 🎨 Desain

- **Nuansa "cosmic dark"**: background `#0a0e1a`, glassmorphism, glow accent ungu → biru → cyan (`linear-gradient(120deg,#8b5cf6,#6366f1,#22d3ee)`)
- **Font**: Orbitron (display), Space Grotesk (heading), Inter (body) — dimuat via `next/font` (self-hosted)
- **Animasi**: scroll-triggered reveal di setiap section, tilt 3D pada kartu, parallax bintang, custom glow cursor
- **Aksesibilitas**: seluruh animasi menghormati `prefers-reduced-motion`, navigasi keyboard, `aria-label` pada kontrol penting
- **Efek suara opsional**: disintesis via Web Audio API (tanpa file audio), default **nonaktif**, bisa di-toggle dari header

---

## 🔍 Catatan Teknis

- **Kunci jawaban & pesan sinyal tidak pernah dikirim ke klien sebelum terjawab** — verifikasi dilakukan di server (`/api/quiz/submit`, `/api/signals/verify`).
- **Tekstur 3D dibuat saat runtime** dengan Canvas 2D (`src/lib/three/textures.ts`), sehingga tidak ada aset gambar eksternal yang perlu di-host.
- **Simulator 3D dimuat dengan `next/dynamic({ ssr: false })`** agar tidak membebani render server.
- **Skala visual** pada tata surya dan lubang hitam sengaja tidak proporsional demi kenyamanan; seluruh angka pada panel detail tetap akurat.
- **Fisika lubang hitam** dihitung di peramban dari rumus asli: `R_s = 2GM/c²`, `T = ħc³/(8πGMk_B)`, `t ≈ 2,1×10⁶⁷·M³ tahun`, ISCO `3R_s`, photon sphere `1,5R_s`.
- **Jarak rute antarbintang** dihitung dengan hukum kosinus antar vektor posisi pada proyeksi cakram galaksi.

---

## 📜 Lisensi & Etika Konten

Kode proyek ini dirilis untuk keperluan edukasi. Seluruh entri bertanda 🛸 adalah **fiksi ilmiah** dan tidak boleh dikutip sebagai klaim ilmiah. Data faktual astronomi mengacu pada publikasi resmi NASA/ESA (Planetary Fact Sheet, Hubble/Webb science releases) dan konsensus kosmologi standar (ΛCDM).

Selamat menjelajah, Kapten. 🚀
