import { safeQuery, prisma } from '@/lib/prisma';
import { ARTICLES } from '@/lib/data/articles';
import { ALIEN_SPECIES } from '@/lib/data/species';
import { FICTIONAL_PLANETS } from '@/lib/data/worlds';
import { SIGNALS, toPublicSignal, type PublicSignal } from '@/lib/data/signals';
import type { AlienSpecies, Article, FictionalPlanet, KardashevLevel, Signal, SpeciesStatus } from '@/lib/types';

/**
 * ============================================================
 * REPOSITORY KONTEN
 * Setiap fungsi mencoba membaca dari PostgreSQL (Prisma), lalu
 * otomatis mundur ke data statis `src/lib/data/*` bila database
 * tidak tersedia — sehingga aplikasi selalu bisa dirender.
 * ============================================================
 */

type ArticleRow = {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: string;
  summary: string;
  content: string;
  funFacts: string[];
  imageUrl: string | null;
  readTime: number;
  createdAt: Date;
};

export function mapArticle(row: ArticleRow): Article {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    category: row.category as Article['category'],
    type: row.type === 'fiction' ? 'fiction' : 'fact',
    summary: row.summary,
    content: row.content,
    funFacts: row.funFacts,
    imageUrl: row.imageUrl,
    readTime: row.readTime,
    createdAt: row.createdAt.toISOString()
  };
}

export async function getArticles(): Promise<Article[]> {
  const rows = await safeQuery('getArticles', () =>
    prisma!.article.findMany({ orderBy: [{ type: 'asc' }, { createdAt: 'asc' }] })
  );
  if (rows && rows.length > 0) return rows.map(mapArticle);
  return ARTICLES;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const row = await safeQuery('getArticleBySlug', () =>
    prisma!.article.findUnique({ where: { slug } })
  );
  if (row) return mapArticle(row);
  return ARTICLES.find((article) => article.slug === slug) ?? null;
}

export function getStaticArticleSlugs(): string[] {
  return ARTICLES.map((article) => article.slug);
}

type SpeciesRow = {
  id: string;
  name: string;
  slug: string;
  homePlanet: string;
  homePlanetSlug: string | null;
  kardashevLevel: string;
  status: string;
  abilities: string[];
  lore: string;
  appearance: string;
  avatarUrl: string | null;
  accentColor: string;
};

export function mapSpecies(row: SpeciesRow): AlienSpecies {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    homePlanet: row.homePlanet,
    homePlanetSlug: row.homePlanetSlug,
    kardashevLevel: row.kardashevLevel as KardashevLevel,
    status: row.status as SpeciesStatus,
    abilities: row.abilities,
    lore: row.lore,
    appearance: row.appearance,
    avatarUrl: row.avatarUrl,
    accentColor: row.accentColor
  };
}

export async function getSpecies(): Promise<AlienSpecies[]> {
  const rows = await safeQuery('getSpecies', () =>
    prisma!.alienSpecies.findMany({ orderBy: { name: 'asc' } })
  );
  if (rows && rows.length > 0) return rows.map(mapSpecies);
  return ALIEN_SPECIES;
}

export async function getSpeciesBySlug(slug: string): Promise<AlienSpecies | null> {
  const row = await safeQuery('getSpeciesBySlug', () =>
    prisma!.alienSpecies.findUnique({ where: { slug } })
  );
  if (row) return mapSpecies(row);
  return ALIEN_SPECIES.find((species) => species.slug === slug) ?? null;
}

type PlanetRow = {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  atmosphere: string;
  inhabitants: string;
  resources: string[];
  dangerLevel: number;
  beautyScore: number;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
};

export function mapFictionalPlanet(row: PlanetRow): FictionalPlanet {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    tagline: row.tagline,
    description: row.description,
    atmosphere: row.atmosphere,
    inhabitants: row.inhabitants,
    resources: row.resources,
    dangerLevel: row.dangerLevel,
    beautyScore: row.beautyScore,
    themeColor: row.themeColor,
    gradientFrom: row.gradientFrom,
    gradientTo: row.gradientTo
  };
}

export async function getFictionalPlanets(): Promise<FictionalPlanet[]> {
  const rows = await safeQuery('getFictionalPlanets', () =>
    prisma!.fictionalPlanet.findMany({ orderBy: { name: 'asc' } })
  );
  if (rows && rows.length > 0) return rows.map(mapFictionalPlanet);
  return FICTIONAL_PLANETS;
}

export async function getFictionalPlanetBySlug(slug: string): Promise<FictionalPlanet | null> {
  const row = await safeQuery('getFictionalPlanetBySlug', () =>
    prisma!.fictionalPlanet.findUnique({ where: { slug } })
  );
  if (row) return mapFictionalPlanet(row);
  return FICTIONAL_PLANETS.find((planet) => planet.slug === slug) ?? null;
}

/** Sinyal publik: jawaban terdekode TIDAK pernah dikirim ke klien. */
export async function getPublicSignals(): Promise<PublicSignal[]> {
  const rows = await safeQuery('getSignals', () =>
    prisma!.signal.findMany({ orderBy: { order: 'asc' } })
  );
  if (rows && rows.length > 0) {
    return rows.map((row) => toPublicSignal(row as unknown as Signal));
  }
  return SIGNALS.map(toPublicSignal);
}

/** Dipakai server-side (route verifikasi jawaban) — menyertakan jawaban. */
export async function getSignalsWithAnswers(): Promise<Signal[]> {
  const rows = await safeQuery('getSignalsWithAnswers', () =>
    prisma!.signal.findMany({ orderBy: { order: 'asc' } })
  );
  if (rows && rows.length > 0) return rows as unknown as Signal[];
  return SIGNALS;
}

export async function getContentStats() {
  const [articles, species, planets] = await Promise.all([
    getArticles(),
    getSpecies(),
    getFictionalPlanets()
  ]);
  return {
    articles: articles.length,
    factArticles: articles.filter((article) => article.type === 'fact').length,
    fictionArticles: articles.filter((article) => article.type === 'fiction').length,
    species: species.length,
    planets: planets.length,
    signals: SIGNALS.length
  };
}
