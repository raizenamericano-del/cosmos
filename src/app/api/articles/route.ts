import { NextResponse } from 'next/server';
import { getArticles } from '@/lib/repositories/content';

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const type = searchParams.get('type');
  const search = searchParams.get('q')?.toLowerCase();
  const sort = searchParams.get('sort') ?? 'terbaru';

  let articles = await getArticles();

  if (category && category !== 'semua') {
    articles = articles.filter((article) => article.category === category);
  }
  if (type === 'fact' || type === 'fiction') {
    articles = articles.filter((article) => article.type === type);
  }
  if (search) {
    articles = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(search) ||
        article.summary.toLowerCase().includes(search) ||
        article.content.toLowerCase().includes(search)
    );
  }

  articles = [...articles].sort((a, b) => {
    if (sort === 'judul') return a.title.localeCompare(b.title, 'id');
    if (sort === 'baca') return a.readTime - b.readTime;
    if (sort === 'terlama') return a.createdAt.localeCompare(b.createdAt);
    return b.createdAt.localeCompare(a.createdAt);
  });

  return NextResponse.json({ total: articles.length, articles });
}
