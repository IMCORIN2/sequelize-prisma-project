import { Router } from 'express';
import { prisma } from '../utils/prisma/index.js';

import { AuthController } from '../controllers/auth.controller.js';
import { AuthService } from '../services/auth.service.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import errorHandleMiddleware from '../middlewares/error-handling.middleware.js';

const authRouter = Router();

const authRepository = new AuthRepository(prisma);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

authRouter.post('/signup', errorHandleMiddleware, authController.signUpUser);
authRouter.post('/signin', errorHandleMiddleware, authController.signInUser);

export default authRouter;
