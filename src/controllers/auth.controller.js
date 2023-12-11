export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }
  // authService = new AuthService();
  signUpUser = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;

      const newUser = await this.authService.signUpUser(
        email,
        password,
        passwordConfirm,
        name,
      );
      console.log('newUser', newUser);
      console.log('newUser.email', newUser.email);
      console.log('newUser.success', newUser.success);
      if (newUser.success === false) {
        console.log('2');
        return res.status(400).json(newUser);
      } else if (newUser.email) {
        console.log('1');
        return res.status(201).json({
          success: true,
          data: newUser,
          message: '회원가입에 성공했습니다.',
        });
      }
    } catch (err) {
      next(err);
    }
  };

  signInUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.signInUser(email, password);

      if (user.success === false) {
        return res.status(400).json(user);
      } else if (user.accessToken) {
        return res.status(200).json({
          success: true,
          message: '로그인에 성공했습니다.',
          data: user,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
