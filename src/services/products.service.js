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

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      status: product.status,
      userId: product.userId,
      userName: product.userName,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };

  updateProduct = async (productId, title, description, status, id, name) => {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) throw new Error('존재하지 않는 게시글입니다.');

    const updatedProduct = await this.productsRepository.updateProduct(
      productId,
      title,
      description,
      status,
      id,
      name,
    );

    return {
      title: updatedProduct.title,
      description: updatedProduct.description,
      status: updatedProduct.status,
    };
  };

  deleteProduct = async (productId, id, name) => {
    const product = await this.productsRepository.findProductById(productId);

    if (!product) throw new Error('존재하지 않는 게시글입니다.');

    await this.productsRepository.deleteProduct(productId);

    return {
      id: product.id,
      userId: product.userId,
      title: product.title,
      description: product.description,
      status: product.status,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  };
}
