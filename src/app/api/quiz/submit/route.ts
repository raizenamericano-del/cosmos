import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { getQuizQuestions, saveQuizResult } from '@/lib/repositories/quiz';
import { unlockAchievement } from '@/lib/repositories/progress';

const submitSchema = z.object({
  category: z.string().min(3),
  answers: z.record(z.string(), z.number().int().min(0).max(5))
});

/**
 * POST /api/quiz/submit
 * Menilai jawaban di sisi server (kunci jawaban tidak pernah dikirim ke klien
 * dalam alur ini), menyimpan hasil ke database bila tersedia, dan memberi
 * achievement "Quiz Champion" untuk skor sempurna.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body harus berupa JSON.' }, { status: 400 });
  }

  const parsed = submitSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Format jawaban tidak valid.' }, { status: 422 });
  }

  const { category, answers } = parsed.data;
  const questions = await getQuizQuestions(category);
  if (questions.length === 0) {
    return NextResponse.json({ error: 'Kategori tidak ditemukan.' }, { status: 404 });
  }

  const perQuestion = questions.map((question) => {
    const submitted = answers[question.id];
    const correct = submitted === question.correctAnswer;
    return {
      id: question.id,
      correct,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation
    };
  });

  const score = perQuestion.filter((item) => item.correct).length;
  const total = questions.length;

  const session = await getServerSession(authOptions);
  let stored = false;
  if (session?.user?.id) {
    const saved = await saveQuizResult({ userId: session.user.id, category, score, total });
    stored = saved.stored;
    if (score === total) {
      await unlockAchievement(
        session.user.id,
        'Quiz Champion',
        `Skor sempurna pada kategori ${category} (${score}/${total}).`
      );
    }
  }

  return NextResponse.json({ score, total, stored, perQuestion });
}
