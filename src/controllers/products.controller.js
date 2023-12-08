// import { ProductsService } from '../services/products.service.js';

export class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }
  // productsService = new ProductsService();
  /* 상품 생성 API */
  createProduct = async (req, res, next) => {
    try {
      const { id: userId, name: userName } = res.locals.user;
      const { title, description } = req.body;

      if (!id || !password || !title || !description) {
        throw new Error('InvalidParamsError');
      }

      const createdProduct = await this.productsService.createProduct(
        userId,
        userName,
        title,
        description,
      );

      return res.status(201).json({
        success: true,
        message: '상품 생성에 성공했습니다.',
        data: createdProduct,
      });
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

      if (!product) {
        return res.status(404).json({
          success: false,
          message: '상품 조회에 실패했습니다.',
        });
      }

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

      // 수정 정보가 하나도 없는 경우
      if (!title && !description && !status) {
        return res.status(400).json({
          success: false,
          message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
        });
      }

      const isValidStatus = status
        ? status === 'FOR_SALE' || status === 'SOLD_OUT'
        : true;

      if (!isValidStatus) {
        return res.status(400).json({
          success: false,
          message: '지원하지 않는 상태입니다. (status: FOR_SALE | SOLD_OUT)',
        });
      }

      // 일치하는 상품이 존재하지 않는 경우
      const product = await this.productsService.findProductById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: '상품 조회에 실패했습니다.',
        });
      }

      // 작성자ID와 인증 정보의 사용자ID가 다른 경우
      const isProductOwner = product.userId === userId;
      if (!isProductOwner) {
        return res.status(403).json({
          success: false,
          message: '상품 수정 권한이 없습니다.',
        });
      }

      const updatedProduct = await this.productsService.updateProduct(
        productId,
        title,
        description,
        status,
        userId,
        userName,
      );

      return res.status(200).json({
        success: true,
        message: '상품 수정에 성공했습니다.',
        data: updatedProduct,
      });
    } catch (err) {
      next(err);
    }
  };

  /* 상품 삭제 API */
  deleteProduct = async (req, res, next) => {
    try {
      const { productId } = req.params;
      const { id: userId, name: userName } = res.locals.user;

      // 일치하는 상품이 존재하지 않는 경우
      const product = await this.productsService.findProductById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: '상품 조회에 실패했습니다.',
        });
      }

      // 작성자ID와 인증 정보의 사용자ID가 다른 경우
      const isProductOwner = product.userId === userId;
      if (!isProductOwner) {
        return res.status(403).json({
          success: false,
          message: '상품 삭제 권한이 없습니다.',
        });
      }

      const deleteProduct = await this.productsService.deleteProduct(
        productId,
        userId,
        userName,
      );

      return res.status(200).json({
        success: true,
        message: '상품 삭제에 성공했습니다.',
        data: deleteProduct,
      });
    } catch (err) {
      next(err);
    }
  };
}
