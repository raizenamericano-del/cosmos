import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/layout/page-hero';
import { LeaderboardTable } from '@/components/quiz/leaderboard-table';
import { getLeaderboard, getQuizSummary } from '@/lib/repositories/quiz';
import { databaseMode } from '@/lib/prisma';
import { Reveal } from '@/components/ui/reveal';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Papan Skor Global',
  description:
    'Peringkat pemain kuis astronomi Cosmos Academy dari seluruh penjelajah, lengkap dengan rank, kategori, dan skor tertinggi.'
};

export default async function PapanSkorPage() {
  const [entries, summary] = await Promise.all([getLeaderboard(30), getQuizSummary()]);
  const mode = databaseMode();

  return (
    <>
      <PageHero
        eyebrow="🏆 Leaderboard"
        title="Papan Skor Antariksa"
        description="Skor kuis tersimpan di database saat kamu login. Papan skor juga memuat 'kru legendaris' sebagai penanda awal sehingga selalu ada target untuk dikalahkan."
        type="fact"
        seed="papan-skor"
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          {[
            ['Total entri', `${entries.length} pemain`],
            ['Bank soal', `${summary.totalQuestions} pertanyaan`],
            ['Mode data', mode === 'database' ? 'PostgreSQL aktif' : 'Mode demo (data statis)']
          ].map(([label, value], index) => (
            <Reveal key={label} delay={index * 0.05}>
              <div className="glass rounded-2xl p-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
                <p className="mt-2 font-heading text-sm text-white">{value}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <LeaderboardTable entries={entries} />

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/kuis"
            className="rounded-full bg-aurora-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            🎯 Perbaiki skormu
          </Link>
          <Link
            href="/pencapaian"
            className="rounded-full border border-amber-300/40 px-6 py-3 text-sm text-amber-100 transition hover:bg-amber-300/10"
          >
            🏅 Lihat achievement
          </Link>
        </div>

        {mode === 'demo' && (
          <p className="mt-6 rounded-2xl border border-amber-400/25 bg-amber-400/[0.06] p-4 text-[11px] leading-relaxed text-amber-100">
            Mode demo aktif: belum ada koneksi PostgreSQL, sehingga skor baru tidak tersimpan permanen.
            Isi <code className="text-amber-50">DATABASE_URL</code> pada file .env lalu jalankan{' '}
            <code className="text-amber-50">npm run db:push</code> dan{' '}
            <code className="text-amber-50">npm run db:seed</code> untuk mengaktifkan penyimpanan.
          </p>
        )}
      </section>
    </>
  );
}
