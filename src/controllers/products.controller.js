// import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }
  // productsService = new ProductsService();
  /* 상품 생성 API */
  createProduct = async (req, res, next) => {
    try {
      // console.log('컨트롤러 res.locals.user=>', res.locals.user);
      const { userId: userId } = res.locals.user;
      const { title, description } = req.body;

      const createdProduct = await this.productsService.createProduct(
        userId,
        title,
        description,
      );
      // console.log('오잉', createdProduct);

      if (createdProduct.success === false) {
        return res.status(400).json(createdProduct);
      } else if (createdProduct.id) {
        return res.status(201).json({
          success: true,
          message: '상품 생성에 성공했습니다.',
          data: createdProduct,
        });
      }
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

      const product = await this.productsService.findProductById(productId);
      console.log('controller', product);
      if (product.success === false) {
        res.status(400).json(product);
      } else if (product.productId) {
        res.status(200).json({ data: product });
      }
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
        userId,
        userName,
      );

      if (updatedProduct.success === false) {
        return res.status(400).json(updatedProduct);
      } else if (updatedProduct.productId) {
        return res.status(200).json({
          success: true,
          message: '상품 수정에 성공했습니다.',
          data: updatedProduct,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  /* 상품 삭제 API */
  deleteProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { userId } = res.locals.user;

      const deleteProduct = await this.productsService.deleteProduct(
        productId,
        userId,
      );

      if (deleteProduct.success === false) {
        res.status(400).json(deleteProduct);
      } else if (deleteProduct.productId) {
        return res.status(200).json({
          success: true,
          message: '상품 삭제에 성공했습니다.',
          data: deleteProduct,
        });
      }
    } catch (err) {
      next(err);
    }
  };
}
