import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getBookmarks, getProfileStats, getUserAchievements } from '@/lib/repositories/progress';
import { rankTitle } from '@/lib/utils';
import { PageHero } from '@/components/layout/page-hero';
import { GuestProgress } from '@/components/profile/guest-progress';
import { ContentBadge, StatusPill } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/section-heading';
import { ACHIEVEMENTS } from '@/lib/data/achievements';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Profil Penjelajah',
  description: 'Riwayat kuis, bookmark artikel, dan koleksi achievement milik akunmu.'
};

export default async function ProfilPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <>
        <PageHero
          eyebrow="👤 Akun"
          title="Profil Penjelajah"
          description="Kamu belum masuk. Kamu tetap bisa bermain sebagai tamu — progres akan tersimpan di perangkat ini. Masuk untuk menyimpan permanen."
          seed="profil"
        />
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <GuestProgress />
        </section>
      </>
    );
  }

  const [bookmarks, stats, achievements] = await Promise.all([
    getBookmarks(session.user.id),
    getProfileStats(session.user.id),
    getUserAchievements(session.user.id)
  ]);

  const isDemoAccount = session.user.role === 'demo';
  const highest = stats.bestScore > 0 ? rankTitle(stats.bestScore, 8) : '—';

  return (
    <>
      <PageHero
        eyebrow="👤 Akun"
        title={`Selamat datang, ${session.user.name ?? 'Penjelajah'}`}
        description={
          isDemoAccount
            ? 'Kamu masuk dalam mode demo: identitas sesi sementara karena database belum dikonfigurasi.'
            : 'Ringkasan petualanganmu di Cosmos Academy — tersimpan permanen di PostgreSQL.'
        }
        seed="profil"
      >
        <div className="flex flex-wrap gap-2">
          <StatusPill label={isDemoAccount ? 'Akun demo' : 'Akun terverifikasi'} tone={isDemoAccount ? 'warn' : 'good'} />
          <ContentBadge type="fact" size="sm" />
        </div>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-4">
          {[
            ['Kuis dimainkan', `${stats.quizzesPlayed} sesi`],
            ['Skor tertinggi', stats.bestScore > 0 ? `${stats.bestScore} poin` : '—'],
            ['Rank terbaik', highest],
            ['Bookmark', `${stats.bookmarks} artikel`]
          ].map(([label, value]) => (
            <div key={label} className="glass-strong rounded-2xl p-5">
              <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
              <p className="mt-2 font-heading text-base text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Bookmark */}
          <div className="glass-strong rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg text-white">Bookmark artikel</h2>
              <span className="text-[11px] text-slate-400">{bookmarks.length} tersimpan</span>
            </div>

            {bookmarks.length === 0 ? (
              <p className="mt-4 text-sm text-slate-400">
                Belum ada bookmark. Buka{' '}
                <Link href="/ensiklopedia" className="text-cyan-200 underline decoration-dotted">
                  Ensiklopedia
                </Link>{' '}
                dan simpan artikel favoritmu.
              </p>
            ) : (
              <ul className="mt-4 space-y-2">
                {bookmarks.map((bookmark) => (
                  <li key={bookmark.articleId}>
                    <Link
                      href={`/ensiklopedia/${bookmark.articleSlug}`}
                      className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/40"
                    >
                      <span className="block font-heading text-sm text-white">
                        {bookmark.articleTitle}
                      </span>
                      <span className="mt-1 block text-[11px] text-slate-400">
                        {bookmark.category} · disimpan{' '}
                        {new Date(bookmark.savedAt).toLocaleDateString('id-ID')}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Achievement */}
          <div className="glass-strong rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg text-white">Achievement</h2>
              <span className="text-[11px] text-amber-200">
                {achievements.length}/{ACHIEVEMENTS.length}
              </span>
            </div>

            <div className="mt-4">
              <ProgressBar
                value={achievements.length}
                max={ACHIEVEMENTS.length}
                tone="gold"
                showLabel
              />
            </div>

            <ul className="mt-5 space-y-2">
              {achievements.map((achievement) => {
                const definition = ACHIEVEMENTS.find(
                  (item) => item.badgeName === achievement.badgeName
                );
                return (
                  <li
                    key={achievement.badgeName}
                    className="flex items-center gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-3"
                  >
                    <span className="text-xl">{definition?.icon ?? '🏅'}</span>
                    <span>
                      <span className="block text-sm text-white">
                        {definition?.title ?? achievement.badgeName}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        Terbuka {new Date(achievement.unlockedAt).toLocaleDateString('id-ID')}
                      </span>
                    </span>
                  </li>
                );
              })}
              {achievements.length === 0 && (
                <li className="text-sm text-slate-400">
                  Belum ada badge yang tersimpan di akun ini.
                </li>
              )}
            </ul>

            <Link
              href="/pencapaian"
              className="mt-5 inline-block text-xs text-amber-200 underline decoration-dotted"
            >
              Lihat semua 12 achievement →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
