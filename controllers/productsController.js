const productService = require('../services/productsService');

const getAllProducts = async (_req, res) => {
  const products = await productService.getAllProducts();

  res.status(200).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  const { message, code, response } = await productService.getProduct(id);

  if (message) {
    res.status(code).json({ message });
  }

  res.status(code).json(response);
};

module.exports = {
  getAllProducts,
  getProduct,
};