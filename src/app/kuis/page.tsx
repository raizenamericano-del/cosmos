import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/layout/page-hero';
import { QuizGame } from '@/components/quiz/quiz-game';
import { getQuizSummary, getQuizQuestions } from '@/lib/repositories/quiz';

export const revalidate = 600;

export const metadata: Metadata = {
  title: 'Kuis Astronomi',
  description:
    'Kuis astronomi bergaya gamifikasi: 4 kategori, timer per pertanyaan, penjelasan ilmiah, rank dari Crew Cadet hingga Starship Captain, dan papan skor global.'
};

export default async function KuisPage() {
  const [questions, summary] = await Promise.all([getQuizQuestions(), getQuizSummary()]);

  return (
    <>
      <PageHero
        eyebrow="📚 Fakta Ilmiah · Gamifikasi"
        title="Kuis Astronomi Cosmos Academy"
        description={`${summary.totalQuestions} pertanyaan dalam 4 kategori. Setiap jawaban dilengkapi penjelasan ilmiahnya, dan skormu masuk ke papan skor global bila kamu login.`}
        type="fact"
        seed="kuis"
      >
        <p className="text-[11px] text-slate-400">
          Ingin pemanasan?{' '}
          <Link href="/ensiklopedia" className="text-cyan-200 underline decoration-dotted">
            baca ensiklopedia
          </Link>{' '}
          atau{' '}
          <Link href="/tata-surya" className="text-cyan-200 underline decoration-dotted">
            jelajahi tata surya 3D
          </Link>{' '}
          dulu.
        </p>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <QuizGame questions={questions} categories={summary.perCategory} />
      </section>
    </>
  );
}
