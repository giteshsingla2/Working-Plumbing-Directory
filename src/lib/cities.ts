import { promises as fs } from 'fs';
import path from 'path';

export async function getCaliforniaCities(): Promise<string[]> {
  const filePath = path.join(process.cwd(), 'city-names.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
