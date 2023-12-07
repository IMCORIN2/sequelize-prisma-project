import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  productsService = new ProductsService();

  /* 상품 생성 API */
  createProduct = async (req, res, next) => {
    try {
      const { id: userId, name: userName } = res.locals.user;
      const { title, description } = req.body;

      if (!id || !password || !title || !description) {
        throw new Error('InvalidParamsError');
      }

      const createdProduct = await this.productsService.createProduct(
        id,
        name,
        title,
        description,
      );

      return res.status(201).json({ data: createdProduct });
    } catch (err) {
      next(err);
    }
  };

  /* 상품 조회 API */
  getProducts = async (req, res, next) => {
    try {
      const products = await this.productsService.findAllProducts();

      return res.status(200).json({ data: products });
    } catch (err) {
      next(err);
    }
  };

  /* 상품 상세조회 API */
  getProductsById = async (req, res, next) => {
    try {
      const { productId } = req.params;

      const post = await this.productsService.findProductById(productId);

      res.status(200).json({ data: post });
    } catch (err) {
      next(err);
    }
  };

  /* 상품 수정 API */
  updateProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { title, description, status } = req.body;
      const { id: userId, name: userName } = res.locals.user;

      const updatedProduct = await this.productsService.updateProduct(
        productId,
        title,
        description,
        status,
        id,
        name,
      );

      return res.status(200).json({ data: updatedProduct });
    } catch (err) {
      next(err);
    }
  };

  /* 상품 삭제 API */
  deleteProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { id: userId, name: userName } = res.locals.user;

      const deleteProduct = await this.productsService.deleteProduct(
        productId,
        id,
        name,
      );

      res.status(200).json({ data: deleteProduct });
    } catch (err) {
      next(err);
    }
  };
}
