import { prisma, safeQuery } from '@/lib/prisma';
import { getStaticArticleSlugs } from '@/lib/repositories/content';

/**
 * Repository progres pengguna: bookmark, achievement, dan data profil.
 * Semua fungsi aman dipanggil ketika database tidak aktif — pemanggil akan
 * menerima `stored: false` dan frontend menyimpan progres di localStorage.
 */

export interface BookmarkEntry {
  articleId: string;
  articleSlug: string;
  articleTitle: string;
  category: string;
  type: string;
  savedAt: string;
}

export async function getBookmarkSlugs(userId: string): Promise<string[]> {
  const rows = await safeQuery('getBookmarkSlugs', () =>
    prisma!.bookmark.findMany({
      where: { userId },
      select: { article: { select: { slug: true } } },
      orderBy: { createdAt: 'desc' }
    })
  );
  if (!rows) return [];
  return rows.map((row) => row.article.slug);
}

export async function getBookmarks(userId: string): Promise<BookmarkEntry[]> {
  const rows = await safeQuery('getBookmarks', () =>
    prisma!.bookmark.findMany({
      where: { userId },
      include: { article: true },
      orderBy: { createdAt: 'desc' }
    })
  );
  if (!rows) return [];
  return rows.map((row) => ({
    articleId: row.articleId,
    articleSlug: row.article.slug,
    articleTitle: row.article.title,
    category: row.article.category,
    type: row.article.type,
    savedAt: row.createdAt.toISOString()
  }));
}

export async function toggleBookmark(
  userId: string,
  articleSlug: string
): Promise<{ stored: boolean; bookmarked: boolean; count: number }> {
  const article = await safeQuery('toggleBookmark:findArticle', () =>
    prisma!.article.findUnique({ where: { slug: articleSlug }, select: { id: true } })
  );

  // Mode demo: artikel statis tidak ada di DB → hanya sinyal "tidak tersimpan".
  if (!article) {
    return { stored: false, bookmarked: false, count: 0 };
  }

  const existing = await safeQuery('toggleBookmark:findExisting', () =>
    prisma!.bookmark.findUnique({
      where: { userId_articleId: { userId, articleId: article.id } }
    })
  );

  if (existing) {
    await safeQuery('toggleBookmark:delete', () =>
      prisma!.bookmark.delete({ where: { id: existing.id } })
    );
  } else {
    await safeQuery('toggleBookmark:create', () =>
      prisma!.bookmark.create({ data: { userId, articleId: article.id } })
    );
  }

  const count = await safeQuery('toggleBookmark:count', () =>
    prisma!.bookmark.count({ where: { userId } })
  );

  return { stored: true, bookmarked: !existing, count: count ?? 0 };
}

export async function getUserAchievements(userId: string) {
  const rows = await safeQuery('getUserAchievements', () =>
    prisma!.achievement.findMany({ where: { userId }, orderBy: { unlockedAt: 'desc' } })
  );
  if (!rows) return [];
  return rows.map((row) => ({
    badgeName: row.badgeName,
    unlockedAt: row.unlockedAt.toISOString()
  }));
}

export async function unlockAchievement(
  userId: string,
  badgeName: string,
  description?: string
): Promise<{ stored: boolean; unlocked: boolean }> {
  const existing = await safeQuery('unlockAchievement:findExisting', () =>
    prisma!.achievement.findUnique({
      where: { userId_badgeName: { userId, badgeName } }
    })
  );
  if (existing) return { stored: true, unlocked: false };

  const created = await safeQuery('unlockAchievement:create', () =>
    prisma!.achievement.create({
      data: { userId, badgeName, description }
    })
  );
  if (!created) return { stored: false, unlocked: false };
  return { stored: true, unlocked: true };
}

export async function getProfileStats(userId: string) {
  const [results, bookmarks, achievements] = await Promise.all([
    safeQuery('profile:quizResults', () => prisma!.quizResult.findMany({ where: { userId } })),
    safeQuery('profile:bookmarks', () => prisma!.bookmark.count({ where: { userId } })),
    safeQuery('profile:achievements', () =>
      prisma!.achievement.findMany({ where: { userId } })
    )
  ]);

  const quiz = results ?? [];
  const bestScore = quiz.reduce((max, item) => Math.max(max, item.score), 0);
  const totalPlayed = quiz.length;

  return {
    quizzesPlayed: totalPlayed,
    bestScore,
    bookmarks: bookmarks ?? 0,
    achievements: (achievements ?? []).map((row) => ({
      badgeName: row.badgeName,
      unlockedAt: row.unlockedAt.toISOString()
    }))
  };
}

export function isKnownArticleSlug(slug: string): boolean {
  return getStaticArticleSlugs().includes(slug);
}
