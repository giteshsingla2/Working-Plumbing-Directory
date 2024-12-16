import numbers from '@/data/numbers.json';

export function getRandomNumber(): string {
  const randomIndex = Math.floor(Math.random() * numbers.numbers.length);
  return numbers.numbers[randomIndex];
}
