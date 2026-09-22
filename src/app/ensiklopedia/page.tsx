import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/page-hero';
import { EncyclopediaBrowser } from '@/components/encyclopedia/encyclopedia-browser';
import { getArticles } from '@/lib/repositories/content';
import { ARTICLE_CATEGORIES } from '@/lib/data/articles';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Ensiklopedia Astronomi',
  description:
    'Kumpulan artikel astronomi berbahasa Indonesia: planet, bintang, black hole, galaksi, nebula, asteroid & komet, eksoplanet, hingga teori alam semesta. Setiap artikel punya label 📚 Fakta Ilmiah.'
};

export default async function EnsiklopediaPage() {
  const articles = await getArticles();
  const factCount = articles.filter((article) => article.type === 'fact').length;

  return (
    <>
      <PageHero
        eyebrow="📚 Fakta Ilmiah & 🛸 Arsip Fiksi"
        title="Ensiklopedia Alam Semesta"
        description={`${factCount} artikel edukasi akurat + arsip fiksi ilmiah yang dilabeli jelas. Gunakan pencarian, filter kategori, dan pengurutan untuk menemukan topik yang kamu butuhkan.`}
        seed="ensiklopedia"
      >
        <p className="text-[11px] text-slate-400">
          Tips: coba ketik <span className="text-cyan-200">alien</span> di kotak pencarian. Ada yang
          menunggu. 😉
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <EncyclopediaBrowser articles={articles} categories={ARTICLE_CATEGORIES} />
      </section>
    </>
  );
}
