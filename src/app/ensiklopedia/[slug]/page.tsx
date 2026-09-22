import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getArticles, getFictionalPlanets, getSpecies } from '@/lib/repositories/content';
import { articleParagraphs } from '@/lib/data/articles';
import { ContentBadge, StatusPill } from '@/components/ui/badge';
import { BookmarkButton } from '@/components/encyclopedia/bookmark-button';
import { Reveal } from '@/components/ui/reveal';
import { formatDateId, truncate } from '@/lib/utils';

export const revalidate = 300;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'Artikel tidak ditemukan' };
  return {
    title: article.title,
    description: article.summary,
    openGraph: { title: article.title, description: article.summary, type: 'article' }
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const [related, species, planets] = await Promise.all([
    getArticles(),
    getSpecies(),
    getFictionalPlanets()
  ]);

  const paragraphs = articleParagraphs(article.content);
  const sameCategory = related
    .filter((item) => item.slug !== article.slug && item.category === article.category)
    .slice(0, 3);

  // Untuk artikel fiksi: tampilkan lore terkait agar dunia terasa nyambung.
  const isFiction = article.type === 'fiction';
  const relatedSpecies = isFiction ? species.slice(0, 3) : [];
  const relatedPlanets = isFiction ? planets.slice(0, 3) : [];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
        <Link href="/ensiklopedia" className="transition hover:text-cyan-200">
          Ensiklopedia
        </Link>{' '}
        / <span className="text-slate-400">{article.category}</span>
      </nav>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-3">
          <ContentBadge type={article.type} />
          <StatusPill label={article.category} tone="neutral" />
          <span className="text-[11px] text-slate-500">
            {article.readTime} menit baca · {formatDateId(article.createdAt)}
          </span>
        </div>

        <h1 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-300">{article.summary}</p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <BookmarkButton slug={article.slug} />
          <span className="text-[11px] text-slate-500">
            {isFiction
              ? '🛸 Arsip fiksi — tidak ada klaim ilmiah di dalamnya.'
              : '📚 Angka & konsep mengikuti publikasi astronomi resmi.'}
          </span>
        </div>
      </header>

      {/* Ilustrasi prosedural (tanpa aset eksternal) */}
      <div
        className="relative mt-8 h-44 overflow-hidden rounded-3xl border border-white/10 sm:h-56"
        style={{
          background: isFiction
            ? 'linear-gradient(120deg, rgba(88,28,135,0.7), rgba(8,145,178,0.35), rgba(7,10,20,0.95))'
            : 'linear-gradient(120deg, rgba(30,58,138,0.7), rgba(14,116,144,0.35), rgba(7,10,20,0.95))'
        }}
      >
        <div className="absolute inset-0 bg-grid-lines bg-[length:56px_56px] opacity-30" />
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative grid h-full place-items-center">
          <p className="font-display text-xs uppercase tracking-[0.45em] text-white/70">
            {article.category}
          </p>
        </div>
      </div>

      <div className="article-prose mt-10">
        {paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      {/* Fun facts */}
      <section className="glass-strong mt-10 rounded-3xl p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg text-white">Fun facts</h2>
          <ContentBadge type={article.type} size="sm" />
        </div>
        <ul className="mt-4 space-y-3">
          {article.funFacts.map((fact) => (
            <li key={fact} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <span className="text-cyan-300">◆</span>
              <span className="text-sm leading-relaxed text-slate-200">{fact}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Lore terkait untuk artikel fiksi */}
      {isFiction && (
        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          <div className="glass-strong rounded-3xl p-5">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-fuchsia-200">
              Peradaban terkait
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {relatedSpecies.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/codex-alien/${item.slug}`}
                    className="text-slate-300 underline decoration-dotted transition hover:text-white"
                  >
                    {item.name} — {item.homePlanet}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-strong rounded-3xl p-5">
            <p className="font-display text-[10px] uppercase tracking-[0.3em] text-fuchsia-200">
              Dunia terkait
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {relatedPlanets.map((planet) => (
                <li key={planet.id}>
                  <Link
                    href={`/atlas-dunia/${planet.slug}`}
                    className="text-slate-300 underline decoration-dotted transition hover:text-white"
                  >
                    {planet.name} — {planet.tagline}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Artikel terkait */}
      {sameCategory.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-lg text-white">Masih di kategori {article.category}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {sameCategory.map((item) => (
              <Reveal key={item.id}>
                <Link href={`/ensiklopedia/${item.slug}`} className="block h-full">
                  <div className="glass h-full rounded-2xl p-4 transition hover:border-white/25">
                    <ContentBadge type={item.type} size="sm" />
                    <p className="mt-3 font-heading text-sm leading-snug text-white">
                      {truncate(item.title, 70)}
                    </p>
                    <p className="mt-2 text-[11px] text-slate-400">{item.readTime} menit baca</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 flex flex-wrap gap-3">
        <Link
          href="/ensiklopedia"
          className="rounded-full border border-white/15 px-5 py-3 text-sm text-slate-200 transition hover:border-cyan-300/50"
        >
          ← Kembali ke ensiklopedia
        </Link>
        <Link
          href="/kuis"
          className="rounded-full bg-aurora-gradient px-5 py-3 text-sm font-semibold text-white shadow-glow"
        >
          Uji pemahamanmu di kuis →
        </Link>
      </div>
    </article>
  );
}
