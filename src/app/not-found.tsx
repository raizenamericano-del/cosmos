import Link from 'next/link';
import { CosmicBackdrop } from '@/components/ui/cosmic-backdrop';

/**
 * EASTER EGG: halaman 404 bertema "LOST IN SPACE" dengan astronaut mengambang.
 */
export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden">
      <CosmicBackdrop density={160} seed="lost-in-space" />

      <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <p className="font-display text-[11px] uppercase tracking-[0.5em] text-rose-200">
          Peringatan navigasi
        </p>
        <h1 className="mt-4 font-display text-6xl font-black tracking-tight text-white sm:text-8xl">
          404
        </h1>
        <p className="mt-3 font-display text-lg uppercase tracking-[0.35em] text-cyan-200">
          Lost in Space
        </p>

        {/* Astronaut mengambang */}
        <div className="pointer-events-none relative mx-auto mt-10 h-40 w-full">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 animate-float text-6xl">
            🧑‍🚀
          </div>
          <div className="absolute left-1/2 top-24 h-24 w-24 -translate-x-1/2 rounded-full border border-dashed border-cyan-300/30" />
          <span className="absolute left-[22%] top-10 animate-twinkle text-lg">✦</span>
          <span className="absolute right-[24%] top-2 animate-twinkle text-sm" style={{ animationDelay: '1s' }}>
            ✧
          </span>
          <span
            className="absolute left-[36%] top-28 animate-twinkle text-base"
            style={{ animationDelay: '1.8s' }}
          >
            ★
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-slate-300">
          Halaman ini tidak ada di katalog stasiun — kemungkinan tersedot lubang hitam, atau koordinat yang
          kamu masukkan menunjuk ke timeline alternatif yang belum dipetakan.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-aurora-gradient px-6 py-3 text-sm font-semibold text-white shadow-glow"
          >
            🏠 Kembali ke beranda
          </Link>
          <Link
            href="/tata-surya"
            className="rounded-full border border-cyan-400/40 px-6 py-3 text-sm text-cyan-100 transition hover:bg-cyan-400/10"
          >
            🪐 Cari di Tata Surya 3D
          </Link>
          <Link
            href="/sinyal-misterius"
            className="rounded-full border border-fuchsia-400/40 px-6 py-3 text-sm text-fuchsia-100 transition hover:bg-fuchsia-400/10"
          >
            📡 Cek sinyal misterius
          </Link>
        </div>

        <p className="mt-6 text-[11px] text-slate-500">
          Petunjuk easter egg: ketik <span className="text-slate-300">↑↑↓↓←→←→ B A</span> untuk melipat
          ruang-waktu.
        </p>
      </div>
    </section>
  );
}
