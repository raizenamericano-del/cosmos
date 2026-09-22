import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';
import { getBookmarks, toggleBookmark } from '@/lib/repositories/progress';
import { isDatabaseEnabled } from '@/lib/prisma';

const bodySchema = z.object({ articleSlug: z.string().min(1) });

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ bookmarks: [], authenticated: false, database: isDatabaseEnabled() });
  }
  const bookmarks = await getBookmarks(session.user.id);
  return NextResponse.json({
    bookmarks,
    authenticated: true,
    database: isDatabaseEnabled()
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Masuk terlebih dahulu untuk menyimpan bookmark ke akunmu.', authenticated: false },
      { status: 401 }
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Body harus berupa JSON.' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'articleSlug wajib diisi.' }, { status: 422 });
  }

  const result = await toggleBookmark(session.user.id, parsed.data.articleSlug);
  return NextResponse.json({ ...result, database: isDatabaseEnabled() });
}
