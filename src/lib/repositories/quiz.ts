import { prisma, safeQuery } from '@/lib/prisma';
import { QUIZ_QUESTIONS } from '@/lib/data/quiz';
import type { LeaderboardEntry, QuizQuestion, QuizResult } from '@/lib/types';
import { rankTitle } from '@/lib/utils';

/**
 * Repository kuis: bank soal, penyimpanan hasil, dan leaderboard global.
 * Leaderboard selalu menyertakan "kru legendaris" statis sebagai pengisi awal
 * agar papan tidak kosong di mode demo (dan diberi tanda `isSeed`).
 */

export interface LeaderboardRow extends LeaderboardEntry {
  isSeed?: boolean;
}

const SEED_LEADERBOARD: Omit<LeaderboardRow, 'rank' | 'title'>[] = [
  {
    id: 'seed-1',
    userId: 'seed-user-1',
    userName: 'Kapten Alya Wijaya',
    userImage: null,
    category: 'Black Hole & Kosmologi',
    score: 7,
    total: 7,
    playedAt: '2026-02-10T10:00:00.000Z',
    isSeed: true
  },
  {
    id: 'seed-2',
    userId: 'seed-user-2',
    userName: 'Navigator Bagas',
    userImage: null,
    category: 'Tata Surya',
    score: 8,
    total: 8,
    playedAt: '2026-02-09T13:20:00.000Z',
    isSeed: true
  },
  {
    id: 'seed-3',
    userId: 'seed-user-3',
    userName: 'Rara Andromeda',
    userImage: null,
    category: 'Bintang & Galaksi',
    score: 7,
    total: 8,
    playedAt: '2026-02-08T09:05:00.000Z',
    isSeed: true
  },
  {
    id: 'seed-4',
    userId: 'seed-user-4',
    userName: 'Teknisi Dirga',
    userImage: null,
    category: 'Eksoplanet',
    score: 6,
    total: 7,
    playedAt: '2026-02-07T17:40:00.000Z',
    isSeed: true
  },
  {
    id: 'seed-5',
    userId: 'seed-user-5',
    userName: 'Astronom Muda Nia',
    userImage: null,
    category: 'Tata Surya',
    score: 6,
    total: 8,
    playedAt: '2026-02-06T08:15:00.000Z',
    isSeed: true
  }
];

export async function getQuizQuestions(category?: string): Promise<QuizQuestion[]> {
  const rows = await safeQuery('getQuizQuestions', () =>
    prisma!.quizQuestion.findMany({
      where: category ? { category } : undefined,
      orderBy: [{ category: 'asc' }, { order: 'asc' }]
    })
  );
  if (rows && rows.length > 0) {
    return rows.map((row) => ({
      id: row.id,
      category: row.category as QuizQuestion['category'],
      question: row.question,
      options: row.options,
      correctAnswer: row.correctAnswer,
      explanation: row.explanation,
      difficulty: (row.difficulty as QuizQuestion['difficulty']) ?? 'mudah',
      order: row.order
    }));
  }
  if (!category) return QUIZ_QUESTIONS;
  return QUIZ_QUESTIONS.filter((question) => question.category === category);
}

export async function saveQuizResult(input: {
  userId: string;
  category: string;
  score: number;
  total: number;
}): Promise<{ stored: boolean; resultId?: string }> {
  const row = await safeQuery('saveQuizResult', () =>
    prisma!.quizResult.create({
      data: {
        userId: input.userId,
        category: input.category,
        score: input.score,
        total: input.total
      }
    })
  );
  if (!row) return { stored: false };
  return { stored: true, resultId: row.id };
}

export async function getLeaderboard(limit = 25): Promise<LeaderboardRow[]> {
  const rows = await safeQuery('getLeaderboard', () =>
    prisma!.quizResult.findMany({
      take: limit,
      orderBy: [{ score: 'desc' }, { playedAt: 'asc' }],
      include: { user: { select: { name: true, email: true, image: true } } }
    })
  );

  const mapped: LeaderboardRow[] = (rows ?? []).map((row, index) => ({
    id: row.id,
    userId: row.userId,
    userName: row.user.name ?? row.user.email.split('@')[0],
    userImage: row.user.image,
    category: row.category,
    score: row.score,
    total: row.total,
    playedAt: row.playedAt.toISOString(),
    rank: index + 1,
    title: rankTitle(row.score, row.total),
    isSeed: false
  }));

  const merged = [...mapped, ...SEED_LEADERBOARD.map((entry) => ({ ...entry }))];
  return merged
    .sort((a, b) => {
      const ratioA = a.total === 0 ? 0 : a.score / a.total;
      const ratioB = b.total === 0 ? 0 : b.score / b.total;
      if (ratioB !== ratioA) return ratioB - ratioA;
      return a.playedAt.localeCompare(b.playedAt);
    })
    .slice(0, limit)
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
      title: rankTitle(entry.score, entry.total)
    }));
}

export async function getUserQuizResults(userId: string): Promise<QuizResult[]> {
  const rows = await safeQuery('getUserQuizResults', () =>
    prisma!.quizResult.findMany({
      where: { userId },
      orderBy: { playedAt: 'desc' },
      take: 20
    })
  );
  if (!rows) return [];
  return rows.map((row) => ({
    id: row.id,
    userId: row.userId,
    category: row.category,
    score: row.score,
    total: row.total,
    playedAt: row.playedAt.toISOString()
  }));
}

export async function getQuizSummary() {
  const questions = await getQuizQuestions();
  const categories = Array.from(new Set(questions.map((question) => question.category)));
  return {
    totalQuestions: questions.length,
    categories,
    perCategory: categories.map((category) => ({
      category,
      count: questions.filter((question) => question.category === category).length
    }))
  };
}
