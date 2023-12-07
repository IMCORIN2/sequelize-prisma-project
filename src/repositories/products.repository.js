import { Sequelize } from 'sequelize';
import db from '../models/index.cjs';
const { Products, Users } = db;

export class ProductsRepository {
  findAllProducts = async () => {
    const products = await Products.findMany();

    return products;
  };

  createProduct = async (id, name, title, description) => {
    const createdProduct = await Products.create({
      data: {
        title,
        description,
        userId,
      },
    });

    return createdProduct;
  };

  findProductById = async (productId) => {
    const product = await Products.findFirst({
      where: { productId: +productId },
    });

    return product;
  };

  updateProduct = async (productId, title, description, status, id, name) => {
    const updatedProduct = this.Products.update({
      where: { id: productId },
      data: { title, description, status },
    });

    return updatedProduct;
  };

  deleteProduct = async (productId, id, name) => {
    const deleteProduct = await Products.delete({
      where: { id: productId },
    });

    return deleteProduct;
  };
}
