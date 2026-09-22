import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getFictionalPlanetBySlug,
  getFictionalPlanets,
  getSpecies
} from '@/lib/repositories/content';
import { WorldDossier } from '@/components/worlds/world-dossier';

export const revalidate = 300;

export async function generateStaticParams() {
  const planets = await getFictionalPlanets();
  return planets.map((planet) => ({ slug: planet.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const planet = await getFictionalPlanetBySlug(params.slug);
  if (!planet) return { title: 'Dunia tidak ditemukan' };
  return {
    title: `${planet.name} — Atlas Dunia Fiksi`,
    description: planet.tagline + '. ' + planet.description.slice(0, 120)
  };
}

export default async function WorldPage({ params }: { params: { slug: string } }) {
  const [planet, species, allPlanets] = await Promise.all([
    getFictionalPlanetBySlug(params.slug),
    getSpecies(),
    getFictionalPlanets()
  ]);

  if (!planet) notFound();

  const inhabitants = species.filter((item) => item.homePlanetSlug === planet.slug);
  const others = allPlanets.filter((item) => item.slug !== planet.slug).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-[11px] uppercase tracking-[0.25em] text-slate-500">
        <Link href="/atlas-dunia" className="transition hover:text-fuchsia-200">
          Atlas Dunia Fiksi
        </Link>{' '}
        / <span className="text-slate-400">{planet.name}</span>
      </nav>

      <WorldDossier planet={planet} inhabitants={inhabitants} />

      <section className="mt-12">
        <h2 className="font-display text-lg text-white">Dunia lain di atlas</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((item) => (
            <Link
              key={item.id}
              href={`/atlas-dunia/${item.slug}`}
              className="relative overflow-hidden rounded-2xl border border-white/10 p-4 transition hover:-translate-y-1"
              style={{
                background: `linear-gradient(150deg, ${item.gradientFrom}22, ${item.gradientTo}18, rgba(7,10,20,0.95))`
              }}
            >
              <p className="font-heading text-sm text-white">{item.name}</p>
              <p className="mt-1 text-[11px] text-slate-300/80">{item.tagline}</p>
              <p className="mt-2 text-[10px] text-slate-400">
                💀 {item.dangerLevel}/10 · ✨ {item.beautyScore}/10
              </p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/atlas-dunia"
          className="rounded-full border border-white/15 px-5 py-3 text-sm text-slate-200 transition hover:border-fuchsia-300/50"
        >
          ← Kembali ke atlas
        </Link>
        <Link
          href="/simulator-perjalanan"
          className="rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-600 px-5 py-3 text-sm font-semibold text-white"
        >
          🚀 Simulasikan perjalanan ke {planet.name}
        </Link>
      </div>
    </div>
  );
}
