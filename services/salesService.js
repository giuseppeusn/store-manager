const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

const createSale = async (sales) => {
  const responseProd = await productsModel.getAllProducts();
  const existProd = sales.filter((sale) => sale.productId > responseProd.length);

  if (existProd.length > 0) {
    return { code: 404, message: 'Product not found' };
  }

  const result = await salesModel.createSale(sales);

  const response = {
    id: result.insertId,
    itemsSold: sales,
  };

  return { code: 201, response };
};

module.exports = {
  createSale,
};
