'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { BookmarkCheck, BookmarkPlus } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useAchievements } from '@/context/achievement-context';
import { useSound } from '@/context/sound-context';
import { cn } from '@/lib/utils';

/**
 * Bookmark artikel.
 * - Tamu / mode demo: disimpan di localStorage perangkat.
 * - Pengguna login + database aktif: disimpan ke akun (tabel `bookmarks`).
 */
export function BookmarkButton({
  slug,
  className,
  compact = false
}: {
  slug: string;
  className?: string;
  compact?: boolean;
}) {
  const { data: session } = useSession();
  const { value: localBookmarks, setValue: setLocalBookmarks } = useLocalStorage<string[]>(
    'cosmos.bookmarks',
    []
  );
  const [synced, setSynced] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const { unlock } = useAchievements();
  const { play } = useSound();

  const authenticated = Boolean(session?.user?.id);
  const bookmarked = authenticated ? synced.includes(slug) : localBookmarks.includes(slug);

  useEffect(() => {
    if (!authenticated) return;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch('/api/bookmarks', { cache: 'no-store' });
        if (!response.ok) return;
        const data = (await response.json()) as { bookmarks?: { articleSlug: string }[] };
        if (!cancelled && data.bookmarks) {
          setSynced(data.bookmarks.map((item) => item.articleSlug));
        }
      } catch {
        /* abaikan */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [authenticated]);

  const toggle = async () => {
    if (busy) return;
    setBusy(true);
    play('click');

    if (!authenticated) {
      setLocalBookmarks((prev) => {
        const next = prev.includes(slug) ? prev.filter((item) => item !== slug) : [...prev, slug];
        if (next.length >= 3) unlock('Lexicon Keeper');
        return next;
      });
      setBusy(false);
      return;
    }

    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleSlug: slug })
      });
      const data = (await response.json()) as { bookmarked?: boolean; stored?: boolean };

      if (data.stored) {
        setSynced((prev) =>
          data.bookmarked ? [...new Set([...prev, slug])] : prev.filter((item) => item !== slug)
        );
        const count = data.bookmarked ? synced.length + 1 : synced.length - 1;
        if (count >= 3) unlock('Lexicon Keeper');
      } else {
        // Database belum menyimpan artikel statis → tetap simpan lokal.
        setLocalBookmarks((prev) => [...new Set([...prev, slug])]);
      }
    } catch {
      setLocalBookmarks((prev) => [...new Set([...prev, slug])]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={bookmarked}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition',
        bookmarked
          ? 'border-amber-300/50 bg-amber-300/10 text-amber-100'
          : 'border-white/15 bg-white/[0.03] text-slate-300 hover:border-amber-300/40 hover:text-amber-100',
        className
      )}
    >
      {bookmarked ? <BookmarkCheck size={15} /> : <BookmarkPlus size={15} />}
      {!compact && (bookmarked ? 'Tersimpan' : 'Simpan artikel')}
      {!authenticated && !compact && <span className="text-[10px] text-slate-500">(lokal)</span>}
    </button>
  );
}
