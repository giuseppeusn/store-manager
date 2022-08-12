const salesValidate = (req, res, next) => {
  const sales = req.body;
  const STATUS_BAD_REQ = 400;
  const STATUS_UNPROCESSABLE = 422;
  
  const productId = sales.filter((sale) => sale.productId);
  const quantity = sales.filter((sale) => sale.quantity);
  const quantityValue = sales.filter((sale) => sale.quantity <= 0);

  switch (true) {
    case productId.length !== sales.length:
      return res.status(STATUS_BAD_REQ).json({ message: '"productId" is required' });
    case quantityValue.length > 0:
      return res
        .status(STATUS_UNPROCESSABLE)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    case quantity.length !== sales.length:
      return res.status(STATUS_BAD_REQ).json({ message: '"quantity" is required' });
    default:
     return next();
  }
};

module.exports = salesValidate;