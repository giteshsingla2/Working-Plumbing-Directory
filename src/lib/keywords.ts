import { promises as fs } from 'fs';
import path from 'path';

export async function getKeywords(): Promise<string[]> {
  const filePath = path.join(process.cwd(), 'keywords.txt');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return fileContent.split('\n').filter(keyword => keyword.trim() !== '');
}
