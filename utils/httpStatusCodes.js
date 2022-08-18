const StatusCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
};

const ReasonPhrases = {
  PRODUCT_NOT_FOUND: 'Product not found',
  SALE_NOT_FOUND: 'Sale not found',
  PRODUCT_REQ: '"productId" is required',
  QUANTITY_REQ: '"quantity" is required',
  QUANTITY_GREATER: '"quantity" must be greater than or equal to 1',
  NAME_REQ: '"name" is required',
  NAME_GREATER: '"name" length must be at least 5 characters long',
};

module.exports = {
  StatusCodes,
  ReasonPhrases,
};