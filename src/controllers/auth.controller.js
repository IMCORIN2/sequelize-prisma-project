import { AuthService } from '../services/auth.service';

export class AuthController {
  authService = AuthService();
  signUpUser = async (req, res, next) => {
    try {
      const { email, password, passwordConfirm, name } = req.body;
      const newUser = await this.authService.signUpUser(
        email,
        password,
        passwordConfirm,
        name,
      );

      return res.status(201).json({ data: newUser });
    } catch (err) {
      next(err);
    }
  };

  signInUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.signInUser(email, password);

      return res.status(200).json({ data: user });
    } catch (err) {
      next(err);
    }
  };
}
