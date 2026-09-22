import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { SignalDecoder } from '@/components/signals/signal-decoder';
import { getPublicSignals } from '@/lib/repositories/content';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Sinyal Misterius — Signal Decoder',
  description:
    'Mini-game decode: pecahkan 4 sinyal radio dari peradaban fiktif. Tingkat kesulitan naik dari biner, Caesar cipher, ROT13, hingga substitusi simbol alien.'
};

export default async function SinyalMisteriusPage() {
  const signals = await getPublicSignals();

  return (
    <>
      <PageHero
        eyebrow="🛸 Fiksi Ilmiah"
        title="Sinyal Misterius"
        description="Stasiun radio Cosmos Academy menangkap transmisi aneh pada frekuensi 1.420 MHz — garis emisi hidrogen netral, frekuensi klasik yang dipakai astronom untuk mencari kecerdasan luar angkasa. Pecahkan sandinya untuk membaca pesannya."
        type="fiction"
        seed="sinyal-misterius"
      >
        <p className="text-[11px] text-slate-400">
          {signals.length} transmisi terdeteksi · tambahan akan muncul saat anomali baru tercatat.
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <SignalDecoder signals={signals} />
      </section>

      <section className="border-t border-white/10 bg-cosmos-deep/50 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-lg text-white">Kenapa astronom memilih 1.420 MHz?</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Frekuensi 1.420 MHz adalah garis emisi hidrogen netral — unsur paling melimpah di alam
            semesta. Di sekitar frekuensi ini, gangguan alami relatif rendah. Astronom Frank Drake dan
            Carl Sagan berargumen bahwa peradaban cerdas mana pun yang mempelajari astronomi akan tahu
            tentang garis ini, sehingga ia menjadi "bahasa universal" paling logis untuk sinyal
            antarbintang.
          </p>
          <p className="mt-3 text-xs text-rose-200">
            Catatan penting: seluruh pesan pada halaman ini adalah fiksi ilmiah 🛸. Belum ada sinyal
            terkonfirmasi dari peradaban luar angkasa hingga hari ini.
          </p>
        </div>
      </section>
    </>
  );
}
