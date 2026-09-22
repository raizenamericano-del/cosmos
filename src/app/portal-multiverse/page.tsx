import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { MultiversePortal } from '@/components/multiverse/multiverse-portal';

export const metadata: Metadata = {
  title: 'Portal Multiverse',
  description:
    'Melompat ke timeline alternatif: Andromeda Parallel, Dying Sun Timeline, dan Machine Era. Dilengkapi animasi wormhole dan efek distorsi layar saat transisi.'
};

export default function PortalMultiversePage() {
  return (
    <>
      <PageHero
        eyebrow="🛸 Fiksi Ilmiah"
        title="Portal Multiverse"
        description="Menurut tafsir banyak-dunia (many-worlds), setiap kemungkinan kuantum menghasilkan cabang semesta sendiri. Di halaman ini kita meminjam gagasan itu untuk berkunjung ke tiga timeline alternatif tata surya kita."
        type="fiction"
        seed="portal-multiverse"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <MultiversePortal />
      </section>

      <section className="border-t border-white/10 bg-cosmos-deep/50 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-lg text-white">Catatan ilmiah (bagian faktanya)</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>
              <span className="text-cyan-200">Interpetasi many-worlds</span> adalah salah satu tafsir
              mekanika kuantum, bukan teori yang sudah terbukti; ia belum menghasilkan prediksi yang bisa
              diuji berbeda dari tafsir lainnya.
            </li>
            <li>
              <span className="text-cyan-200">Timeline</span> dalam fisika relativitas berarti urutan
              peristiwa dalam ruang-waktu — bukan "cabang realitas" seperti dalam cerita fiksi.
            </li>
            <li>
              <span className="text-cyan-200">Wormhole</span> secara matematis merupakan solusi sah
              persamaan Einstein, tetapi tidak ada bukti bahwa wormhole alami yang bisa dilewati materi
              benar-benar ada.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
