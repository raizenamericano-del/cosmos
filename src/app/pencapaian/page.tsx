import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { AchievementGrid } from '@/components/achievements/achievement-grid';

export const metadata: Metadata = {
  title: 'Achievement & Badge',
  description:
    'Koleksi 12 achievement Cosmos Academy: First Contact, Wormhole Explorer, Signal Hunter, Galactic Cartographer, Paradise Seeker, hingga badge rahasia.'
};

export default function PencapaianPage() {
  return (
    <>
      <PageHero
        eyebrow="🏅 Gamifikasi"
        title="Achievement & Badge"
        description="Setiap badge terbuka ketika kamu melakukan sesuatu di stasiun ini — menjawab kuis sempurna, mendekode sinyal, menemukan halaman rahasia, atau mengaktifkan mode hyperspace."
        seed="pencapaian"
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <AchievementGrid />
      </section>
    </>
  );
}
