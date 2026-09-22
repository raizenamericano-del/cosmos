import type { Metadata } from 'next';
import Link from 'next/link';
import { CosmicBackdrop } from '@/components/ui/cosmic-backdrop';
import { ContentBadge } from '@/components/ui/badge';
import { SecretTerminal } from '@/components/easter-eggs/secret-terminal';

export const metadata: Metadata = {
  title: 'Sektor Tersembunyi',
  description: 'Kamu menemukan sektor tersembunyi Cosmos Academy. Tidak semua peta seharusnya digambar.',
  robots: { index: false, follow: false }
};

/**
 * EASTER EGG: halaman rahasia yang hanya bisa ditemukan lewat bintang
 * di hero section (klik 5×) — atau lewat tebakan yang beruntung.
 */
export default function RahasiaPage() {
  return (
    <div className="relative">
      <CosmicBackdrop density={150} seed="sektor-rahasia" />
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <ContentBadge type="fiction" />
          <p className="mt-6 font-display text-[11px] uppercase tracking-[0.5em] text-violet-200">
            Sektor 7 · Arsip Terbatas
          </p>
          <h1
            className="glitch-text mt-4 font-display text-3xl font-black text-white sm:text-5xl"
            data-text="SEKTOR TERSEMBUNYI"
          >
            SEKTOR TERSEMBUNYI
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-300">
            Kamu menemukan berkas yang seharusnya tidak ada di katalog publik. Berkas ini berisi catatan
            stasiun pendengar kami atas sinyal yang belum bisa dijelaskan — beserta terminal untuk menguji
            keberuntunganmu.
          </p>
        </div>

        <div className="mt-10">
          <SecretTerminal />
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="glass-strong rounded-3xl p-5">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-violet-200">
              Berkas 07-A: Kontak Pertama
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Pada Tahun 3.287 Era Federasi, stasiun pendengar Bumi menangkap pola biner berulang pada
              frekuensi 1.420 MHz. Setelah dekode, pesan itu hanya berisi empat kata:{' '}
              <span className="text-fuchsia-200">
                &quot;Kami mengamatimu dari kegelapan.&quot;
              </span>{' '}
              Tidak ada ancaman, tidak ada tuntutan. Hanya pengamatan.
            </p>
          </div>

          <div className="glass-strong rounded-3xl p-5">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-cyan-200">
              Berkas 07-B: Peta yang Hilang
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Vessari menyerahkan salinan parsial jalur &quot;Tenunan Perak&quot; kepada Federasi pada
              tahun yang sama. Sembilan sistem bintang di dalamnya tidak ada di katalog manusia. Koordinat
              kesepuluh sengaja dikosongkan — dan di situ tertulis catatan tangan:{' '}
              <span className="text-cyan-100">jangan gambar peta ini.</span>
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-cosmos-deep/80 p-6 text-center">
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-slate-400">
            Lanjutkan eksplorasi
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/sinyal-misterius"
              className="rounded-full bg-aurora-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow"
            >
              📡 Pecahkan sinyal lain
            </Link>
            <Link
              href="/pencapaian"
              className="rounded-full border border-amber-300/40 px-5 py-3 text-sm text-amber-100 transition hover:bg-amber-300/10"
            >
              🏅 Cek badge rahasia
            </Link>
          </div>
          <p className="mt-4 text-[11px] text-slate-500">
            Masih ada easter egg lain: coba kode arcade klasik di halaman mana pun.
          </p>
        </div>
      </section>
    </div>
  );
}
