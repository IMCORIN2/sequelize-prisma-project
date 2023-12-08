export class ProductsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllProducts = async () => {
    const products = await this.prisma.products.findMany();

    return products;
  };

  createProduct = async (id, name, title, description) => {
    const createdProduct = await this.prisma.products.create({
      data: {
        title,
        description,
        userId,
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

  updateProduct = async (productId, title, description, status, id, name) => {
    const updatedProduct = await this.this.prisma.products.update({
      where: { id: productId },
      data: { title, description, status },
    });

    return updatedProduct;
  };

  deleteProduct = async (productId, id, name) => {
    const deleteProduct = await this.prisma.products.delete({
      where: { id: productId },
    });

    return deleteProduct;
  };
}
