export class ProductsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllProducts = async () => {
    const products = await this.prisma.products.findMany();

    return products;
  };

  createProduct = async (userId, title, description) => {
    const createdProduct = await this.prisma.products.create({
      data: {
        title,
        description,
        UserId: userId,
      },
    });
    return createdProduct;
  };

  findProductById = async (productId) => {
    const product = await this.prisma.products.findFirst({
      where: { productId: +productId },
    });

    return product;
  };

  updateProduct = async (productId, title, description, status) => {
    const updatedProduct = await this.prisma.products.update({
      where: { productId: +productId },
      data: { title, description, status },
    });
    return updatedProduct;
  };

  deleteProduct = async (productId) => {
    const deleteProduct = await this.prisma.products.delete({
      where: { productId: +productId },
    });
    return deleteProduct;
  };
}
