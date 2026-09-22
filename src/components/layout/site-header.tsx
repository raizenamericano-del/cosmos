'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { Menu, Volume2, VolumeX, X, LogOut, User, Rocket } from 'lucide-react';
import { ACCOUNT_NAV, EDU_NAV, FICTION_NAV } from '@/lib/navigation';
import { useSound } from '@/context/sound-context';
import { cn, initials } from '@/lib/utils';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [world, setWorld] = useState<'edukasi' | 'fiksi'>('edukasi');
  const { enabled, toggle, play } = useSound();
  const { data: session, status } = useSession();

  const items = world === 'edukasi' ? EDU_NAV : FICTION_NAV;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-cosmos-void/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => play('click')}>
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-aurora-gradient text-lg shadow-glow">
            🪐
            <span className="absolute inset-0 rounded-xl border border-white/20" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-sm font-bold tracking-wide text-white">
              COSMOS ACADEMY
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.25em] text-slate-400 sm:block">
              Fakta & Fiksi Alam Semesta
            </span>
          </span>
        </Link>

        {/* Navigasi desktop */}
        <nav className="ml-auto hidden items-center gap-1 xl:flex">
          <WorldSwitch world={world} setWorld={setWorld} />
          {items.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => play('hover')}
                className={cn(
                  'rounded-full px-3 py-2 text-xs font-medium transition-colors',
                  active
                    ? world === 'edukasi'
                      ? 'bg-sky-400/15 text-sky-100'
                      : 'bg-fuchsia-400/15 text-fuchsia-100'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                )}
              >
                <span className="mr-1.5">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/pencapaian"
            className="rounded-full px-3 py-2 text-xs font-medium text-amber-200 transition-colors hover:bg-amber-300/10"
          >
            🏅 Achievement
          </Link>

          <button
            type="button"
            onClick={() => {
              toggle();
              play('click');
            }}
            title={enabled ? 'Matikan efek suara' : 'Nyalakan efek suara'}
            aria-label={enabled ? 'Matikan efek suara' : 'Nyalakan efek suara'}
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-white/25 hover:text-white"
          >
            {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
          </button>

          {status === 'authenticated' && session?.user ? (
            <div className="relative ml-2 flex items-center gap-2">
              <Link
                href="/profil"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-3 transition hover:border-white/25"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-aurora-gradient text-[11px] font-semibold text-white">
                  {initials(session.user.name)}
                </span>
                <span className="max-w-[110px] truncate text-xs text-slate-200">
                  {session.user.name ?? 'Penjelajah'}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                title="Keluar"
                aria-label="Keluar"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:border-rose-400/40 hover:text-rose-200"
              >
                <LogOut size={15} />
              </button>
            </div>
          ) : (
            <Link
              href="/masuk"
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-aurora-gradient px-4 py-2 text-xs font-semibold text-white shadow-glow transition hover:brightness-110"
            >
              <Rocket size={14} /> Masuk
            </Link>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="ml-auto grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-200 xl:hidden"
          aria-label="Buka menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {/* Navigasi mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-cosmos-void/95 backdrop-blur-xl xl:hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <span className="font-display text-sm tracking-wide text-white">NAVIGASI STASIUN</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-slate-200"
                aria-label="Tutup menu"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[calc(100vh-70px)] space-y-6 overflow-y-auto px-4 py-5">
              <WorldSwitch world={world} setWorld={setWorld} full />

              <div className="space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="font-heading text-sm text-white">
                      {item.icon} {item.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{item.description}</p>
                  </Link>
                ))}
              </div>

              <div className="space-y-2">
                <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-500">
                  Akun
                </p>
                {ACCOUNT_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="font-heading text-sm text-white">
                      {item.icon} {item.label}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{item.description}</p>
                  </Link>
                ))}
                {status === 'authenticated' ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      void signOut({ callbackUrl: '/' });
                    }}
                    className="flex w-full items-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4 text-sm text-rose-100"
                  >
                    <LogOut size={15} /> Keluar
                  </button>
                ) : (
                  <Link
                    href="/masuk"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-sm text-cyan-100"
                  >
                    <User size={15} /> Masuk / Daftar
                  </Link>
                )}
              </div>

              <button
                type="button"
                onClick={toggle}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 p-4 text-sm text-slate-200"
              >
                {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                Efek suara: {enabled ? 'AKTIF' : 'MATI'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function WorldSwitch({
  world,
  setWorld,
  full = false
}: {
  world: 'edukasi' | 'fiksi';
  setWorld: (world: 'edukasi' | 'fiksi') => void;
  full?: boolean;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1',
        full && 'w-full'
      )}
    >
      <button
        type="button"
        onClick={() => setWorld('edukasi')}
        className={cn(
          'rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition',
          world === 'edukasi'
            ? 'bg-sky-400/20 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.35)]'
            : 'text-slate-400 hover:text-white',
          full && 'flex-1'
        )}
      >
        📚 Fakta
      </button>
      <button
        type="button"
        onClick={() => setWorld('fiksi')}
        className={cn(
          'rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition',
          world === 'fiksi'
            ? 'bg-fuchsia-400/20 text-fuchsia-100 shadow-[0_0_18px_rgba(192,132,252,0.35)]'
            : 'text-slate-400 hover:text-white',
          full && 'flex-1'
        )}
      >
        🛸 Fiksi
      </button>
    </div>
  );
}
