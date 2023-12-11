import { Router } from 'express';
import { prisma } from '../utils/prisma/index.js';
import { UsersController } from '../controllers/users.controller.js';
import { UsersService } from '../services/users.service.js';
import { UsersRepository } from '../repositories/users.repository.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import errorHandleMiddleware from '../middlewares/error-handling.middleware.js';
const usersRouter = Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

usersRouter.get(
  '/me',
  errorHandleMiddleware,
  needSignin,
  usersController.getUser,
);

export default usersRouter;
