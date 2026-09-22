import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { SpeciesGallery } from '@/components/codex/species-gallery';
import { getSpecies } from '@/lib/repositories/content';
import { Reveal } from '@/components/ui/reveal';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Alien Codex — Arsip Peradaban Luar Angkasa',
  description:
    'Arsip fiksi ilmiah berisi 5 peradaban luar angkasa: Xel\'Tharis, Aurelians, Nyx Collective, Vessari, dan Zephyrians — lengkap dengan level Kardashev, kemampuan unik, dan lore.'
};

export default async function CodexAlienPage() {
  const species = await getSpecies();

  return (
    <>
      <PageHero
        eyebrow="🛸 Fiksi Ilmiah"
        title="Alien Codex"
        description="Arsip peradaban luar angkasa yang dikumpulkan Stasiun Cosmos Academy. Semua entri di sini fiktif — namun skala Kardashev dan konsep energi yang dirujuk adalah konsep astrofisika nyata."
        type="fiction"
        seed="codex-alien"
      >
        <div className="flex flex-wrap gap-2 text-[11px] text-slate-400">
          <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1.5">
            {species.length} peradaban terdaftar
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5">
            Filter berdasarkan status & level teknologi
          </span>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <SpeciesGallery species={species} />
        </Reveal>
      </section>
    </>
  );
}
