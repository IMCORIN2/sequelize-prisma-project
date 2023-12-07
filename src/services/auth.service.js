import { AuthRepository } from '../repositories/auth.repository';
export class AuthService {
  authRepository = AuthRepository();
  signUpUser = async (email, password, passwordConfirm, name) => {
    const newUser = this.authRepository.signUpUser(
      email,
      password,
      passwordConfirm,
      name,
    );
    // 유호성 검사, 에러 처리 넣기

    return {
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
    };
  };

  signInUser = async (email, password) => {
    const user = await this.authRepository.signInUser(email, password);
    // 유효성 검사, 에러 처리 넣기
    // 토큰 발급
    return {
      accessToken,
    };
  };
}
