import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'keywords.txt');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const keywords = fileContents.split('\n').filter(Boolean);

    return NextResponse.json(keywords);
  } catch (error) {
    console.error('Error reading keywords:', error);
    return NextResponse.json({ error: 'Failed to load keywords' }, { status: 500 });
  }
}
