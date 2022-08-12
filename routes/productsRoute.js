const express = require('express');
const productController = require('../controllers/productsController');
const productsValidate = require('../middlewares/productsValidate');

const productsRoute = express.Router();

productsRoute.get('/', productController.getAllProducts);
productsRoute.get('/:id', productController.getProduct);
productsRoute.post('/', productsValidate, productController.createProduct);

module.exports = productsRoute;