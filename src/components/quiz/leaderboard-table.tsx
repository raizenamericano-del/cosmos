import type { LeaderboardRow } from '@/lib/repositories/quiz';
import { formatDateId, initials } from '@/lib/utils';

const MEDALS = ['🥇', '🥈', '🥉'];

export function LeaderboardTable({ entries }: { entries: LeaderboardRow[] }) {
  return (
    <div className="glass-strong overflow-hidden rounded-3xl">
      <div className="hidden grid-cols-[60px_1fr_140px_110px_120px] gap-3 border-b border-white/10 px-5 py-4 text-[10px] uppercase tracking-widest text-slate-400 sm:grid">
        <span>Rank</span>
        <span>Penjelajah</span>
        <span>Kategori</span>
        <span className="text-right">Skor</span>
        <span className="text-right">Tanggal</span>
      </div>

      <ul className="divide-y divide-white/10">
        {entries.map((entry) => (
          <li
            key={`${entry.id}-${entry.rank}`}
            className="grid grid-cols-[46px_1fr_auto] items-center gap-3 px-5 py-4 sm:grid-cols-[60px_1fr_140px_110px_120px]"
          >
            <span className="font-display text-sm text-slate-300">
              {MEDALS[entry.rank - 1] ?? `#${entry.rank}`}
            </span>

            <span className="flex min-w-0 items-center gap-3">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-aurora-gradient text-[11px] font-semibold text-white">
                {initials(entry.userName ?? 'Penjelajah')}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm text-white">
                  {entry.userName ?? 'Penjelajah Anonim'}
                  {entry.isSeed && (
                    <span className="ml-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-2 py-0.5 text-[9px] uppercase tracking-wider text-amber-200">
                      kru legendaris
                    </span>
                  )}
                </span>
                <span className="block text-[11px] text-slate-400">{entry.title}</span>
              </span>
            </span>

            <span className="hidden truncate text-xs text-slate-400 sm:block">{entry.category}</span>

            <span className="text-right font-display text-sm text-cyan-200">
              {entry.score}/{entry.total}
            </span>

            <span className="hidden text-right text-[11px] text-slate-500 sm:block">
              {formatDateId(entry.playedAt)}
            </span>
          </li>
        ))}
      </ul>

      {entries.length === 0 && (
        <p className="px-5 py-10 text-center text-sm text-slate-400">
          Papan skor masih kosong — jadilah yang pertama! 🚀
        </p>
      )}
    </div>
  );
}
