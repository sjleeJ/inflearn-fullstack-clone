import bcrypt from "bcryptjs";

// salt + hash password
export function saltAndHashPassword(password: string): string {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
  
    return hash;
  }
// compare password
export function comparePassword(
    password: string,
    hashedPassword: string
  ): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }