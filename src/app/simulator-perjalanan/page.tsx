import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { TravelSimulator } from '@/components/travel/travel-simulator';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Interstellar Travel Simulator',
  description:
    'Rencanakan perjalanan antarbintang: pilih titik asal dan tujuan (bintang nyata atau planet fiksi), pilih mesin Warp/Hyperspace/Lightfold, lalu unduh boarding pass PNG.'
};

export default function SimulatorPerjalananPage() {
  return (
    <>
      <PageHero
        eyebrow="🛸 Fiksi Ilmiah"
        title="Interstellar Travel Simulator"
        description="Komputer navigasi Cosmos Academy siap menerima rute. Perhitungan jarak memakai hukum kosinus antar-vektor posisi, sedangkan kecepatan mesin, kebutuhan dilithium, dan risiko anomali adalah parameter fiksi."
        type="fiction"
        seed="simulator-perjalanan"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <TravelSimulator />
        </Reveal>
      </section>
    </>
  );
}
