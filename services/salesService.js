const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCodes');

const serialize = (response) => {
  let result = [];

  response.forEach((item) => {
    result = [...result, {
      saleId: item.sale_id,
      date: item.date,
      productId: item.product_id,
      quantity: item.quantity,
    }];
  });

  return result;
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  const serialized = serialize(result);

  return serialized;
};

const getSale = async (id) => {
  const result = await salesModel.getSale(id);

  if (!result.length) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.SALE_NOT_FOUND };
  }

  const serialized = serialize(result)
    .map(({ date, productId, quantity }) => ({ date, productId, quantity }));

  return { code: StatusCodes.OK, response: serialized };
};

const createSale = async (sales) => {
  const responseProd = await productsModel.getAllProducts();
  const existProd = sales.filter((sale) => sale.productId > responseProd.length);

  if (existProd.length > 0) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.PRODUCT_NOT_FOUND };
  }

  const result = await salesModel.createSale();

  await Promise.all(sales.map((sale) => salesModel.createSaleProduct(result.insertId, sale)));

  const response = {
    id: result.insertId,
    itemsSold: sales,
  };

  return { code: StatusCodes.CREATED, response };
};

const deleteSale = async (id) => {
  const { affectedRows } = await salesModel.deleteSale(id);

  if (affectedRows < 1) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.SALE_NOT_FOUND };
  }

  return { code: StatusCodes.NO_CONTENT };
};

const updateSale = async (id, sales) => {
  const existSale = await getSale(id);

  if (existSale.message) {
    return existSale;
  }

  const responseProd = await productsModel.getAllProducts();
  const existProd = sales.filter((sale) => sale.productId > responseProd.length);

  if (existProd.length > 0) {
    return { code: StatusCodes.NOT_FOUND, message: ReasonPhrases.PRODUCT_NOT_FOUND };
  }

  await Promise.all(sales.map((sale) => salesModel.updateSale(sale.productId, sale.quantity, id)));

  const response = {
    saleId: id,
    itemsUpdated: sales,
  };

  return { code: StatusCodes.OK, response };
};

module.exports = {
  createSale,
  getAllSales,
  getSale,
  deleteSale,
  updateSale,
};
