import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../../constants/security.costant.js';

import bcrypt from 'bcrypt';

export class AuthRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }
  signUpUser = async (email, password, passwordConfirm, name) => {
    const hashedPassword = bcrypt.hashSync(password, PASSWORD_HASH_SALT_ROUNDS);

    const newUser = await this.prisma.users.create({
      data: { email, password: hashedPassword, name },
    });
    delete newUser.password;

    return newUser;
  };

  // signInUser = async (email, password) => {
  //   const user = await this.Users.findOne({ where: { email } });

  //   return user;
  // };

  findUserByEmail = async (email) => {
    const user = await this.prisma.users.findFirst({ where: { email } });

    return user;
  };
}
