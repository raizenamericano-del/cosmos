import { NextResponse } from 'next/server';
import { databaseMode } from '@/lib/prisma';
import { getContentStats } from '@/lib/repositories/content';

export const dynamic = 'force-dynamic';

export async function GET() {
  const stats = await getContentStats();
  return NextResponse.json({
    status: 'ok',
    service: 'cosmos-academy',
    mode: databaseMode(),
    stats,
    timestamp: new Date().toISOString()
  });
}
