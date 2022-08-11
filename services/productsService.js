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

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
};