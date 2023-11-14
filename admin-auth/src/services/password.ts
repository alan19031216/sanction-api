import bcrypt from 'bcryptjs'

export class Password {
  static async toHash(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = bcrypt.hashSync(password, salt);

    return { salt, hash };
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const result = bcrypt.compareSync(suppliedPassword, storedPassword)

    return result;
  }
}
