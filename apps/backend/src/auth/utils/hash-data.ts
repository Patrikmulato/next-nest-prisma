import { hash } from 'bcrypt';

const roundsOfHashing = 10;

export default async function hashData(data: string): Promise<string> {
  return hash(data, roundsOfHashing);
}
