import { PASSWORD_HASH_SALT_ROUNDS } from '../../constants/security.costant.js';

import bcrypt from 'bcrypt';

export class AuthRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  signUpUser = async (email, password, name) => {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = await this.prisma.users.create({
      data: { email, password: hashedPassword, name },
    });
    delete newUser.password;

    return newUser;
  };

  findUserByEmail = async (email) => {
    const user = await this.prisma.users.findFirst({ where: { email } });

    return user;
  };
}
