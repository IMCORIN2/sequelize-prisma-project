import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {
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
      // 유효성 검사
      if (!email) {
        return {
          success: false,
          message: '이메일 입력이 필요합니다.',
        };
      }

      if (!password) {
        return {
          success: false,
          message: '비밀번호 입력이 필요합니다.',
        };
      }

      if (!passwordConfirm) {
        return {
          success: false,
          message: '비밀번호 확인 입력이 필요합니다.',
        };
      }

      if (!name) {
        return {
          success: false,
          message: '이름 입력이 필요합니다.',
        };
      }

      if (password !== passwordConfirm) {
        return {
          success: false,
          message: '입력 한 비밀번호가 서로 일치하지 않습니다.',
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          message: '비밀번호는 최소 6자리 이상입니다.',
        };
      }

      let emailValidationRegex = new RegExp('[a-z0-9._]+@[a-z]+.[a-z]{2,3}');
      const isValidEmail = emailValidationRegex.test(email);
      if (!isValidEmail) {
        return {
          success: false,
          message: '올바른 이메일 형식이 아닙니다.',
        };
      }
      const existedUser = await this.authRepository.findUserByEmail(email);

      if (existedUser) {
        return {
          success: false,
          messagee: '이미 가입된 이메일입니다.',
        };
      }

      const newUser = await this.authRepository.signUpUser(
        email,
        password,
        passwordConfirm,
        name,
      );

      return {
        userId: newUser.userId,
        email: newUser.email,
        name: newUser.name,
        createdAt: newUser.createdAt,
        updatedAt: newUser.createdAt,
      };
    } catch (err) {
      console.log(err);
    }
  };

  signInUser = async (email, password) => {
    try {
      const user = await this.authRepository.findUserByEmail(email, password);
      // 유효성 검사
      if (!email) {
        return {
          success: false,
          message: '이메일 입력이 필요합니다.',
        };
      }

      if (!password) {
        return {
          success: false,
          message: '비밀번호 입력이 필요합니다.',
        };
      }

      const hashedPassword = user?.password ?? '';
      const isPasswordMatched = bcrypt.compareSync(password, hashedPassword);
      console.log(isPasswordMatched);
      const isCorrectUser = user && isPasswordMatched;

      if (!isCorrectUser) {
        return {
          success: false,
          message: '일치하는 인증 정보가 없습니다.',
        };
      }
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
      };
    } catch (err) {
      console.log(err);
    }
  };

  findUserByEmail = async (email) => {
    const user = await this.authRepository.findUserByEmail(email);
    console.log('user=>', user);
    return user;
  };
}
