const { StatusCodes, ReasonPhrases } = require('../utils/httpStatusCodes');

const productsValidate = (req, res, next) => {
  const { name } = req.body;

  if (!name) { 
    return res.status(StatusCodes.BAD_REQUEST).json({ message: ReasonPhrases.NAME_REQ });
  }

  if (name.length < 5) {
    return res.status(StatusCodes.UNPROCESSABLE).json({ message: ReasonPhrases.NAME_GREATER });
  }

  return next();
};

module.exports = productsValidate;