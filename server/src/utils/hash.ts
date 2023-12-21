import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

/**
 * Hash a password.
 *
 * @param password Password to be hashed
 * @param gensalt The number of salt generations
 * @returns Returns the hashed password
 */
export async function hashPassword(password: string, gensalt: number = 16) {
  const salt = randomBytes(gensalt * 8).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

/**
 * Compares a password to a hash password value, and checks if they are equal.
 *
 * @param password Password to be compared
 * @param hash The hash password to be compared to
 * @returns Returns whether they are equal or not
 */
export async function verifyPassword(password: string, hash: string) {
  const [hashPassword, salt] = hash.split(".");
  if (!hashPassword || !salt) throw new Error("Invalid hash string.");

  const bufferHash = Buffer.from(hashPassword, "hex");
  const bufferHashedPassword = (await scryptAsync(password, salt, 64)) as Buffer;
  return timingSafeEqual(bufferHash, bufferHashedPassword);
}
