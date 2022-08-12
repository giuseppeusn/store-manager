const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const sales = req.body;

  const { code, response, message } = await salesService.createSale(sales);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(response);
};

module.exports = {
  createSale,
};