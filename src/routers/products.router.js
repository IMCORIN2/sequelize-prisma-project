import { Router } from 'express';
import { prisma } from '../utils/prisma/index.js';
import { ProductsController } from '../controllers/products.controller.js';
import { ProductsService } from '../services/products.service.js';
import { ProductsRepository } from '../repositories/products.repository.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';
import errorHandleMiddleware from '../middlewares/error-handling.middleware.js';

export const productsRouter = Router();
// -----------------------------------
const productsRepository = new ProductsRepository(prisma);
const productsService = new ProductsService(productsRepository);
const productsController = new ProductsController(productsService);

/* 상품 생성 API */
productsRouter.post(
  '/',
  needSignin,
  errorHandleMiddleware,
  productsController.createProduct,
);
/* 상품 조회 API */
productsRouter.get('/', errorHandleMiddleware, productsController.getProducts);
/* 상품 상세 조회 API */
productsRouter.get(
  '/:productId',
  errorHandleMiddleware,
  productsController.getProductsById,
);
/* 상품 수정 API */
productsRouter.put(
  '/:productId',
  needSignin,
  errorHandleMiddleware,
  productsController.updateProduct,
);
/* 상품 삭제 API */
productsRouter.delete(
  '/:productId',
  needSignin,
  productsController.deleteProduct,
);
export default productsRouter;
