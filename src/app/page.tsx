import Link from 'next/link';
import { HeroSection } from '@/components/hero/hero-section';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeading } from '@/components/ui/section-heading';
import { ContentBadge } from '@/components/ui/badge';
import { GlowPanel } from '@/components/ui/glow-panel';
import { getArticles, getContentStats } from '@/lib/repositories/content';
import { EDU_NAV, FICTION_NAV } from '@/lib/navigation';
import { SOLAR_SYSTEM_SUMMARY } from '@/lib/data/solar-system';
import { truncate } from '@/lib/utils';

export const revalidate = 300;

export default async function HomePage() {
  const [articles, stats] = await Promise.all([getArticles(), getContentStats()]);
  const featured = articles.filter((article) => article.type === 'fact').slice(0, 3);
  const fictionFeatured = articles.filter((article) => article.type === 'fiction').slice(0, 2);

  return (
    <>
      <HeroSection />

      {/* ---------------------- DUA DUNIA KONTEN ---------------------- */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Navigasi jelas, tanpa kebingungan"
            title="Dua dunia konten, satu stasiun"
            description="Cosmos Academy memisahkan secara tegas antara sains yang bisa diverifikasi dan imajinasi yang bebas. Setiap kartu, artikel, dan halaman selalu membawa labelnya."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="glass-strong h-full rounded-3xl border-sky-400/20 p-6">
              <ContentBadge type="fact" />
              <h3 className="mt-4 font-display text-xl text-white">Ruang Edukasi</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Data mengikuti NASA Planetary Fact Sheet, publikasi Hubble/Webb, dan konsensus kosmologi
                modern. Cocok untuk pelajar, guru, dan siapa pun yang ingin memahami alam semesta tanpa
                mitos.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                {EDU_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition hover:border-sky-400/40 hover:bg-sky-400/[0.06]"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>
                        <span className="block font-heading text-sm text-white">{item.label}</span>
                        <span className="block text-xs text-slate-400">{item.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass-strong h-full rounded-3xl border-fuchsia-400/20 p-6">
              <ContentBadge type="fiction" />
              <h3 className="mt-4 font-display text-xl text-white">Ruang Fiksi Ilmiah</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Peradaban alien, planet surga, mesin warp, dan sinyal misterius — semuanya dibangun dengan
                lore yang konsisten. Semua konten di sini <span className="text-fuchsia-200">fiksi</span> dan
                diberi label 🛸 secara eksplisit.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                {FICTION_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 transition hover:border-fuchsia-400/40 hover:bg-fuchsia-400/[0.06]"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>
                        <span className="block font-heading text-sm text-white">{item.label}</span>
                        <span className="block text-xs text-slate-400">{item.description}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------------- TATA SURYA RINGKAS ---------------------- */}
      <section className="relative border-y border-white/10 bg-cosmos-deep/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <Reveal>
              <SectionHeading
                eyebrow="Inti edukasi"
                title="Tata surya kita, dalam angka yang bisa kamu jelajahi"
                description="Buka simulator 3D, pilih planet mana pun, dan baca data resminya: diameter, jarak dari Matahari, suhu, jumlah satelit, dan fun facts."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tata-surya"
                  className="rounded-full bg-aurora-gradient px-6 py-3 font-heading text-sm font-semibold text-white shadow-glow"
                >
                  🪐 Buka Simulator 3D
                </Link>
                <Link
                  href="/lubang-hitam"
                  className="rounded-full border border-amber-300/40 px-6 py-3 font-heading text-sm font-semibold text-amber-100 transition hover:bg-amber-300/10"
                >
                  🕳️ Black Hole Explorer
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['Usia tata surya', SOLAR_SYSTEM_SUMMARY.age],
                  ['Jumlah planet', `${SOLAR_SYSTEM_SUMMARY.planets} + ${SOLAR_SYSTEM_SUMMARY.dwarfPlanets} kerdil`],
                  ['Bulan terkonfirmasi', `${SOLAR_SYSTEM_SUMMARY.knownMoons}+`],
                  ['Massa Matahari', SOLAR_SYSTEM_SUMMARY.sunMassShare],
                  ['Sabuk asteroid', SOLAR_SYSTEM_SUMMARY.asteroidBeltWidth],
                  ['Heliopause', SOLAR_SYSTEM_SUMMARY.heliopause]
                ].map(([label, value]) => (
                  <GlowPanel key={label} intensity={7} className="p-4">
                    <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
                    <p className="mt-2 font-heading text-sm leading-snug text-white">{value}</p>
                  </GlowPanel>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------------- ARTIKEL UNGGULAN ---------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="📚 Fakta ilmiah"
            title="Mulai dari artikel-artikel ini"
            description={`${stats.factArticles} artikel edukasi berbahasa Indonesia, disusun ringkas dengan fun facts di setiap akhir.`}
          />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((article, index) => (
            <Reveal key={article.id} delay={index * 0.07}>
              <Link href={`/ensiklopedia/${article.slug}`} className="block h-full">
                <GlowPanel className="flex h-full flex-col p-5">
                  <ContentBadge type="fact" size="sm" />
                  <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-slate-400">
                    {article.category} · {article.readTime} menit baca
                  </p>
                  <h3 className="mt-2 font-heading text-lg leading-snug text-white">{article.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                    {truncate(article.summary, 150)}
                  </p>
                  <span className="mt-4 text-xs text-cyan-200">Baca selengkapnya →</span>
                </GlowPanel>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/ensiklopedia"
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-slate-200 transition hover:border-cyan-300/50 hover:text-white"
          >
            Lihat semua {stats.factArticles} artikel + {stats.fictionArticles} arsip fiksi
          </Link>
        </div>
      </section>

      {/* ---------------------- ARSIP FIKSI ---------------------- */}
      <section className="border-y border-white/10 bg-gradient-to-b from-fuchsia-950/10 via-cosmos-deep/40 to-cosmos-void py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <SectionHeading
              eyebrow="🛸 Fiksi ilmiah"
              title="Arsip dari seberang galaksi"
              description="Kronik perang nebula, laporan kontak pertama, dan protokol sinyal dari Nyx Collective — semua terhubung dalam satu lore."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {fictionFeatured.map((article, index) => (
              <Reveal key={article.id} delay={index * 0.08}>
                <Link href={`/ensiklopedia/${article.slug}`} className="block h-full">
                  <GlowPanel className="h-full p-5" glowColor="rgba(192,132,252,0.3)">
                    <ContentBadge type="fiction" size="sm" />
                    <h3 className="mt-3 font-heading text-lg leading-snug text-white">{article.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {truncate(article.summary, 160)}
                    </p>
                    <span className="mt-4 inline-block text-xs text-fuchsia-200">Buka arsip →</span>
                  </GlowPanel>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------- GAMIFIKASI ---------------------- */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="glass-strong h-full rounded-3xl p-6">
              <p className="text-3xl">🎯</p>
              <h3 className="mt-4 font-display text-lg text-white">Kuis Astronomi</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {stats.signals >= 0 ? '30' : '30'} soal dalam 4 kategori dengan timer, penjelasan jawaban, dan
                rank dari Crew Cadet sampai Starship Captain.
              </p>
              <Link href="/kuis" className="mt-4 inline-block text-xs text-cyan-200">
                Mulai kuis →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="glass-strong h-full rounded-3xl p-6">
              <p className="text-3xl">🏅</p>
              <h3 className="mt-4 font-display text-lg text-white">12 Achievement</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Dari First Contact hingga Sector Cartographer. Progres tersimpan di akun (atau di perangkat
                saat bermain sebagai tamu).
              </p>
              <Link href="/pencapaian" className="mt-4 inline-block text-xs text-amber-200">
                Lihat koleksi badge →
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass-strong h-full rounded-3xl p-6">
              <p className="text-3xl">🥚</p>
              <h3 className="mt-4 font-display text-lg text-white">Easter Egg</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Ketik &quot;alien&quot; di pencarian, klik bintang di hero 5×, atau coba kode rahasia gaya
                arcade. Ada 5 kejutan menanti.
              </p>
              <p className="mt-4 text-[11px] text-slate-500">Petunjuk: ↑↑↓↓←→←→ B A</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
