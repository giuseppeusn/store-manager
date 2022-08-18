const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCodes');

const salesValidate = (req, res, next) => {
  const sales = req.body;
  
  const productId = sales.filter((sale) => sale.productId);
  const quantity = sales.filter((sale) => sale.quantity);
  const quantityValue = sales.filter((sale) => sale.quantity <= 0);

  switch (true) {
    case productId.length !== sales.length:
      return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.PRODUCT_REQ });
    case quantityValue.length > 0:
      return res.status(StatusCodes.UNPROCESSABLE)
        .json({ message: ReasonPhrases.QUANTITY_GREATER });
    case quantity.length !== sales.length:
      return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.QUANTITY_REQ });
    default:
      return next();
  }
};

module.exports = salesValidate;