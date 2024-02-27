import { compare, hash } from 'bcrypt';

async function createHash(password: string): Promise<string> {
  return hash(password, 10);
}

async function validate(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return compare(password, hashedPassword);
}

export const password = {
  createHash,
  validate,
};
