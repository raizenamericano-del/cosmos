import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { getUserAchievements, unlockAchievement } from '@/lib/repositories/progress';
import { ACHIEVEMENT_BADGES, getAchievement } from '@/lib/data/achievements';
import { isDatabaseEnabled } from '@/lib/prisma';

const unlockSchema = z.object({
  badgeName: z.string().refine((value) => ACHIEVEMENT_BADGES.includes(value), {
    message: 'Badge tidak dikenali.'
  })
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ achievements: [], authenticated: false });
  }
  const achievements = await getUserAchievements(session.user.id);
  return NextResponse.json({ achievements, authenticated: true });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body harus berupa JSON.' }, { status: 400 });
  }

  const parsed = unlockSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Badge tidak dikenali.' }, { status: 422 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { stored: false, authenticated: false, database: isDatabaseEnabled() },
      { status: 200 }
    );
  }

  const definition = getAchievement(parsed.data.badgeName);
  const result = await unlockAchievement(
    session.user.id,
    parsed.data.badgeName,
    definition?.description
  );
  return NextResponse.json({ ...result, authenticated: true });
}
