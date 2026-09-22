'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Cosmos Academy] Kesalahan runtime:', error);
  }, [error]);

  return (
    <section className="mx-auto grid min-h-[70svh] max-w-3xl place-items-center px-4 py-20 text-center sm:px-6">
      <div>
        <p className="text-5xl">🛰️</p>
        <h1 className="mt-5 font-display text-3xl font-bold text-white">
          Sistem stasiun terkena gangguan
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300">
          Ada anomali dalam pemrosesan data. Coba muat ulang modul ini — kalau masih gagal, kembali ke
          beranda dan laporkan ke kru teknis.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-[11px] text-slate-500">kode anomali: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-aurora-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            🔄 Muat ulang modul
          </button>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-6 py-3 text-sm text-slate-200 transition hover:border-cyan-300/50"
          >
            🏠 Beranda
          </Link>
        </div>
      </div>
    </section>
  );
}
