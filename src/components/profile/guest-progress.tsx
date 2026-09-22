'use client';

import Link from 'next/link';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { ACHIEVEMENTS } from '@/lib/data/achievements';
import { ARTICLES } from '@/lib/data/articles';
import { ContentBadge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/section-heading';

/**
 * Ringkasan progres untuk pengunjung tanpa akun (mode tamu / mode demo).
 * Data dibaca dari localStorage perangkat.
 */
export function GuestProgress() {
  const { value: bookmarks } = useLocalStorage<string[]>('cosmos.bookmarks', []);
  const { value: achievements } = useLocalStorage<string[]>('cosmos.achievements', []);
  const { value: solvedSignals } = useLocalStorage<string[]>('cosmos.signals.solved', []);

  const bookmarkedArticles = ARTICLES.filter((article) => bookmarks.includes(article.slug));

  return (
    <div className="space-y-6">
      <div className="glass-strong rounded-3xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-display text-[10px] uppercase tracking-[0.35em] text-amber-200">
              Mode tamu
            </p>
            <h2 className="mt-2 font-heading text-lg text-white">
              Progresmu tersimpan di perangkat ini
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
              Masuk ke akun agar bookmark, skor kuis, dan achievement tersimpan permanen di PostgreSQL —
              bisa diakses dari perangkat mana pun.
            </p>
          </div>
          <Link
            href="/masuk"
            className="rounded-full bg-aurora-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            🚀 Masuk / Daftar
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            ['Bookmark lokal', `${bookmarks.length} artikel`],
            ['Achievement lokal', `${achievements.length}/${ACHIEVEMENTS.length}`],
            ['Sinyal terpecahkan', `${solvedSignals.length}/4`]
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[10px] uppercase tracking-widest text-slate-400">{label}</p>
              <p className="mt-2 font-heading text-sm text-white">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-strong rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Progres achievement
          </p>
          <span className="text-[11px] text-amber-200">
            {Math.round((achievements.length / ACHIEVEMENTS.length) * 100)}%
          </span>
        </div>
        <div className="mt-4">
          <ProgressBar value={achievements.length} max={ACHIEVEMENTS.length} tone="gold" />
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {ACHIEVEMENTS.filter((achievement) => achievements.includes(achievement.badgeName)).map(
            (achievement) => (
              <span
                key={achievement.badgeName}
                className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-[11px] text-amber-100"
              >
                {achievement.icon} {achievement.title}
              </span>
            )
          )}
          {achievements.length === 0 && (
            <p className="text-xs text-slate-400">
              Belum ada badge. Coba buka{' '}
              <Link href="/codex-alien" className="text-cyan-200 underline decoration-dotted">
                Alien Codex
              </Link>{' '}
              atau pecahkan satu sinyal.
            </p>
          )}
        </div>
      </div>

      <div className="glass-strong rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Bookmark lokal
          </p>
          <ContentBadge type="fact" size="sm" />
        </div>

        {bookmarkedArticles.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">
            Belum ada artikel tersimpan. Buka{' '}
            <Link href="/ensiklopedia" className="text-cyan-200 underline decoration-dotted">
              Ensiklopedia
            </Link>{' '}
            lalu tekan &quot;Simpan artikel&quot;.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {bookmarkedArticles.map((article) => (
              <li key={article.id}>
                <Link
                  href={`/ensiklopedia/${article.slug}`}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-300/40"
                >
                  <ContentBadge type={article.type} size="sm" />
                  <span>
                    <span className="block font-heading text-sm text-white">{article.title}</span>
                    <span className="block text-[11px] text-slate-400">
                      {article.category} · {article.readTime} menit
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
