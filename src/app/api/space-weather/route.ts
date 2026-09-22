import { NextResponse } from 'next/server';
import { generateLocationForecasts, generateSpaceWeather } from '@/lib/space-weather';
import { todayIso } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  const date = dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam) ? dateParam : todayIso();

  const report = generateSpaceWeather(date);
  const locations = generateLocationForecasts(date, 6);

  return NextResponse.json({
    report,
    locations,
    fictional: true,
    disclaimer:
      'Seluruh prakiraan ini FIKSI ilmiah dengan dasar astronomi nyata. Jangan dipakai untuk perencanaan misi sungguhan.'
  });
}
