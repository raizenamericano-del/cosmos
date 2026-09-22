import { NextResponse } from 'next/server';
import { getLeaderboard, getQuizSummary } from '@/lib/repositories/quiz';

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get('limit') ?? 25) || 25, 100);
  const [entries, summary] = await Promise.all([getLeaderboard(limit), getQuizSummary()]);
  return NextResponse.json({ entries, summary });
}
