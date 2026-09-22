import type { MetadataRoute } from 'next';
import { getArticles, getFictionalPlanets, getSpecies } from '@/lib/repositories/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, species, planets] = await Promise.all([
    getArticles(),
    getSpecies(),
    getFictionalPlanets()
  ]);

  const staticRoutes = [
    '',
    '/tata-surya',
    '/ensiklopedia',
    '/lubang-hitam',
    '/kuis',
    '/papan-skor',
    '/codex-alien',
    '/atlas-dunia',
    '/simulator-perjalanan',
    '/sinyal-misterius',
    '/portal-multiverse',
    '/cuaca-antariksa',
    '/pencapaian',
    '/masuk'
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '' ? 1 : 0.8
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/ensiklopedia/${article.slug}`,
      lastModified: new Date(article.createdAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7
    })),
    ...species.map((item) => ({
      url: `${SITE_URL}/codex-alien/${item.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    })),
    ...planets.map((planet) => ({
      url: `${SITE_URL}/atlas-dunia/${planet.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  ];
}
