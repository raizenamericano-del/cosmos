import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFictionalPlanetBySlug, getSpecies, getSpeciesBySlug } from '@/lib/repositories/content';
import { SpeciesDossier } from '@/components/codex/species-dossier';
import { ContentBadge } from '@/components/ui/badge';

export const revalidate = 300;

export async function generateStaticParams() {
  const species = await getSpecies();
  return species.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const species = await getSpeciesBySlug(params.slug);
  if (!species) return { title: 'Spesies tidak ditemukan' };
  return {
    title: `${species.name} — Alien Codex`,
    description: `Arsip fiksi: ${species.name} dari ${species.homePlanet}, peradaban Kardashev ${species.kardashevLevel} dengan status ${species.status}.`
  };
}

export default async function SpeciesPage({ params }: { params: { slug: string } }) {
  const species = await getSpeciesBySlug(params.slug);
  if (!species) notFound();

  const homePlanet = species.homePlanetSlug
    ? await getFictionalPlanetBySlug(species.homePlanetSlug)
    : null;

  const all = await getSpecies();
  const others = all.filter((item) => item.slug !== species.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-[11px] uppercase tracking-[0.25em] text-slate-500">
        <Link href="/codex-alien" className="transition hover:text-fuchsia-200">
          Alien Codex
        </Link>{' '}
        / <span className="text-slate-400">{species.name}</span>
      </nav>

      <SpeciesDossier species={species} homePlanet={homePlanet} />

      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-white">Peradaban lain di arsip</h2>
          <ContentBadge type="fiction" size="sm" />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <Link
              key={item.id}
              href={`/codex-alien/${item.slug}`}
              className="glass rounded-2xl p-4 transition hover:-translate-y-1"
            >
              <p className="font-heading text-sm text-white">{item.name}</p>
              <p className="mt-1 text-[11px] text-slate-400">Kardashev {item.kardashevLevel}</p>
              <p className="mt-2 text-[11px] text-slate-500">{item.homePlanet}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/codex-alien"
          className="rounded-full border border-white/15 px-5 py-3 text-sm text-slate-200 transition hover:border-fuchsia-300/50"
        >
          ← Kembali ke arsip
        </Link>
        <Link
          href="/simulator-perjalanan"
          className="rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white"
        >
          🚀 Rencanakan perjalanan ke {species.homePlanet}
        </Link>
      </div>
    </div>
  );
}
