import { NextResponse } from 'next/server';
import { searchValueSerp } from '@/lib/valueserp';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  const city = searchParams.get('city');
  const page = parseInt(searchParams.get('page') || '1');

  if (!keyword || !city) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  try {
    const results = await searchValueSerp(keyword, city);
    const startIndex = (page - 1) * 10;
    const paginatedResults = results.slice(startIndex, startIndex + 10);

    return NextResponse.json({
      results: paginatedResults,
      total: results.length,
      page,
      totalPages: Math.ceil(results.length / 10)
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
