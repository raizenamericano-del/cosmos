import { NextResponse } from 'next/server';
import { getQuizQuestions } from '@/lib/repositories/quiz';

export const revalidate = 600;

/**
 * GET /api/quiz/questions?category=Tata%20Surya
 * Mengembalikan soal TANPA kunci jawaban agar tidak bisa diintip dari jaringan.
 * Verifikasi jawaban dilakukan di klien lewat halaman kuis (mode latihan),
 * atau lewat POST /api/quiz/submit untuk penilaian server-side resmi.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') ?? undefined;

  const questions = await getQuizQuestions(category);

  return NextResponse.json({
    total: questions.length,
    questions: questions.map((question) => ({
      id: question.id,
      category: question.category,
      question: question.question,
      options: question.options,
      difficulty: question.difficulty,
      order: question.order
    }))
  });
}
