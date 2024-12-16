import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'city-names.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const cities = JSON.parse(fileContents);

    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error reading cities:', error);
    return NextResponse.json({ error: 'Failed to load cities' }, { status: 500 });
  }
}
