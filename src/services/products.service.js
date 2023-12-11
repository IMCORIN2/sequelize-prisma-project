import { ProductsRepository } from '../repositories/products.repository.js';

export class ProductsService {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }
  // productsRepository = new ProductsRepository();
  findAllProducts = async () => {
    const products = await this.productsRepository.findAllProducts();

    // 게시글을 생성 날짜로부터 내림차순 정렬
    products.sort((a, b) => b.createdAt - a.createdAt);

    return products.map((product) => {
      return {
        // prisma model 설정에 따라 productId부분 바뀔수도 있음.
        id: product.productId,
        title: product.title,
        description: product.description,
        status: product.status,
        userId: product.uesrId,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });
  };

  createProduct = async (userId, title, description) => {
    if (!userId || !title || !description) {
      return {
        success: false,
        message: '찾을 수 없는 사용자이거나 입력란이 비어있습니다.',
      };
    }

    const createdProduct = await this.productsRepository.createProduct(
      userId,
      title,
      description,
    );
    console.log('createdProduct=>>>>>>', createdProduct);
    return {
      id: createdProduct.productId,
      title: createdProduct.title,
      description: createdProduct.description,
      status: createdProduct.status,
      userId: createdProduct.UserId,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    };
  };

  findProductById = async (productId) => {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) {
      return {
        success: false,
        message: '상품 조회에 실패했습니다.',
      };
    }
    console.log('product', product);
    return {
      productId: product.productId,
      title: product.title,
      description: product.description,
      status: product.status,
      userId: product.UserId,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  updateProduct = async (
    productId,
    title,
    description,
    status,
    userId,
    name,
  ) => {
    // 수정 정보가 하나도 없는 경우
    if (!title && !description && !status) {
      return {
        success: false,
        message: '수정 정보는 최소 한 가지 이상이어야 합니다.',
      };
    }

    const isValidStatus = status
      ? status === 'FOR_SALE' || status === 'SOLD_OUT'
      : true;

    if (!isValidStatus) {
      return {
        success: false,
        message: '지원하지 않는 상태입니다. (status: FOR_SALE | SOLD_OUT)',
      };
    }

    // 일치하는 상품이 존재하지 않는 경우
    const product = await this.productsRepository.findProductById(productId);

    if (!product) {
      return {
        success: false,
        message: '상품 조회에 실패했습니다.',
      };
    }

    // 작성자ID와 인증 정보의 사용자ID가 다른 경우
    const isProductOwner = product.userId === userId;
    if (!isProductOwner) {
      return {
        success: false,
        message: '상품 수정 권한이 없습니다.',
      };
    }

    const updatedProduct = await this.productsRepository.updateProduct(
      productId,
      title,
      description,
      status,
      userId,
      name,
    );

    return {
      productId: updatedProduct.productId,
      userId: updatedProduct.UserId,
      title: updatedProduct.title,
      description: updatedProduct.description,
      status: updatedProduct.status,
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    };
  };

  deleteProduct = async (productId, userId) => {
    const product = await this.productsRepository.findProductById(productId);
    console.log('product', product);
    if (!product) {
      return {
        success: false,
        message: '상품 조회에 실패했습니다.',
      };
    }

    // 작성자ID와 인증 정보의 사용자ID가 다른 경우
    const isProductOwner = product.UserId === userId;
    console.log('isProductOwner', isProductOwner);
    if (!isProductOwner) {
      return {
        success: false,
        message: '상품 삭제 권한이 없습니다.',
      };
    }
    if (!product) {
      return {
        success: false,
        message: '존재하지 않는 게시글입니다.',
      };
    }

    const deleteProduct = await this.productsRepository.deleteProduct(
      productId,
    );

    return {
      productId: deleteProduct.productId,
      userId: deleteProduct.userId,
      title: deleteProduct.title,
      description: deleteProduct.description,
      status: deleteProduct.status,
      createdAt: deleteProduct.createdAt,
      updatedAt: deleteProduct.updatedAt,
    };
  };
}
