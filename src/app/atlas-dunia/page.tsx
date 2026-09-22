import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { WorldGallery } from '@/components/worlds/world-gallery';
import { getFictionalPlanets } from '@/lib/repositories/content';
import { WORLD_DISCLAIMER } from '@/lib/data/worlds';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Atlas Dunia Fiksi',
  description:
    'Atlas planet imajinatif: Elyria, Obsidian Reach, Whisper, Halcyon Prime, dan Cryon Veil — lengkap dengan atmosfer, penghuni, sumber daya, danger level, dan beauty score.'
};

export default async function AtlasDuniaPage() {
  const planets = await getFictionalPlanets();

  return (
    <>
      <PageHero
        eyebrow="🛸 Fiksi Ilmiah"
        title="Atlas Dunia Fiksi"
        description="Lima dunia imajinatif yang terhubung langsung dengan Alien Codex. Setiap dunia memiliki atmosfer, penghuni, sumber daya, dan penilaian tingkat bahaya serta keindahan."
        type="fiction"
        seed="atlas-dunia"
      >
        <p className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-[11px] text-fuchsia-100">
          ⚠️ {WORLD_DISCLAIMER}
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <WorldGallery planets={planets} />
      </section>
    </>
  );
}
