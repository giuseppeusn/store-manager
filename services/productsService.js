const productsModel = require('../models/productsModel');
const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCodes');

const getAllProducts = async () => {
  const result = await productsModel.getAllProducts();

  return result;
};

const getProduct = async (id) => {
  const result = await productsModel.getProduct(id);

  if (!result.length) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.PRODUCT_NOT_FOUND };
  }

  return { code: StatusCodes.OK, response: result[0] };
};

const createProduct = async (name) => {
  const { insertId } = await productsModel.createProduct(name);

  const response = { id: insertId, name };

  return { code: StatusCodes.CREATED, response };
};

const updateProduct = async (id, name) => {
  const { changedRows } = await productsModel.updateProduct(id, name);

  if (changedRows < 1) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.PRODUCT_NOT_FOUND };
  }

  return { code: StatusCodes.OK };
};

const deleteProduct = async (id) => {
  const { affectedRows } = await productsModel.deleteProduct(id);

  if (affectedRows < 1) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.PRODUCT_NOT_FOUND };
  }

  return { code: StatusCodes.NO_CONTENT };
};

const searchProduct = async (query) => productsModel.searchProduct(query);

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};