const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();

  return result;
};

const getProduct = async (id) => {
  const result = await productsModel.getProduct(id);

  if (!result.length) {
    return { code: 404, message: 'Product not found' };
  }

  return { code: 200, response: result[0] };
};

const createProduct = async (name) => {
  const { insertId } = await productsModel.createProduct(name);

  const response = { id: insertId, name };

  return { code: 201, response };
};

const updateProduct = async (id, name) => {
  const { changedRows } = await productsModel.updateProduct(id, name);

  if (changedRows < 1) {
    return { code: 404, message: 'Product not found' };
  }

  return { code: 200 };
};

const deleteProduct = async (id) => {
  const { affectedRows } = await productsModel.deleteProduct(id);

  if (affectedRows < 1) return { code: 404, message: 'Product not found' };

  return { code: 204 };
};

const searchProduct = async (query) => {
  const result = await productsModel.searchProduct(query);

  return result;
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};