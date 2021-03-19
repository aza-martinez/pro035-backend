import { hashSync, genSaltSync } from "bcryptjs";

export function hashPassword(password: string): string {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  return hashedPassword;
}
