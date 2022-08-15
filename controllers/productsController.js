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

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { code, response } = await productService.createProduct(name);

  res.status(code).json(response);
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { code, message } = await productService.editProduct(id, name);

  if (message) return res.status(code).json({ message });

  return res.status(code).json({ id, name });
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await productService.deleteProduct(id);

  if (message) return res.status(code).json({ message });

  return res.status(code).end();
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};