const salesService = require('../services/salesService');
const { StatusCodes } = require('../utils/httpStatusCodes');

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();

  return res.status(StatusCodes.OK).json(sales);
};

const getSale = async (req, res) => {
  const { id } = req.params;

  const { message, code, response } = await salesService.getSale(id);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(response);
};

const createSale = async (req, res) => {
  const sales = req.body;

  const { code, response, message } = await salesService.createSale(sales);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(response);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { code, message } = await salesService.deleteSale(id);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).end();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sales = req.body;

  const { code, message, response } = await salesService.updateSale(id, sales);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(response);
};

module.exports = {
  createSale,
  getAllSales,
  getSale,
  deleteSale,
  updateSale,
};