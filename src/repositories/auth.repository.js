import { Sequelize } from 'sequelize';
import db from '../models/index.cjs';
const { Products, Users } = db;

export class AuthRepository {
  signUpUser = async (email, password, passwordConfirm, name) => {
    // newUser 부분 고쳐야 할지도..
    // 그리고 내용 조금 더 추가해야 함
    const newUser = await this.Users.create({
      data: { email, password: hashedPassword, name },
    });

    return newUser;
  };

  signInUser = async (email, password) => {
    const user = await this.Users.findOne({ where: { email } });
  };
  // 입력한 이메일에 해당하는 유저가 존재하고, 입력한 비밀번호와 hash된 비밀번호가 일치할 경우
  // token 발급
  // return accessToken;
}
