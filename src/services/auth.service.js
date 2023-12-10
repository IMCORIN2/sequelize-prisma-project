import { AuthRepository } from '../repositories/auth.repository.js';
import jwt from 'jsonwebtoken';
import {
  PASSWORD_HASH_SALT_ROUNDS,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRES_IN,
} from '../../constants/security.costant.js';

export class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }
  // authRepository = new AuthRepository();
  signUpUser = async (email, password, passwordConfirm, name) => {
    try {
      const newUser = await this.authRepository.signUpUser(
        email,
        password,
        passwordConfirm,
        name,
      );

      return {
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
      };
    } catch (err) {
      next(err);
    }
  };

  signInUser = async (email, password) => {
    try {
      const user = await this.authRepository.findUserByEmail(email, password);

      // 토큰 발급
      const accessToken = jwt.sign(
        { userId: user.userId },
        JWT_ACCESS_TOKEN_SECRET,
        {
          expiresIn: JWT_ACCESS_TOKEN_EXPIRES_IN,
        },
      );
      console.log('accessToken=>', accessToken);
      console.log('user.Id=>', user.userId);
      return {
        accessToken,
        ...user,
      };
    } catch (err) {
      next(err);
    }
  };

  findUserByEmail = async (email) => {
    const user = await this.authRepository.findUserByEmail(email);
    console.log('user=>', user);
    return user;
  };
}
