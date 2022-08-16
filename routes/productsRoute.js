const express = require('express');
const productController = require('../controllers/productsController');
const productsValidate = require('../middlewares/productsValidate');

const productsRoute = express.Router();

productsRoute.get('/search', productController.searchProduct);
productsRoute.get('/', productController.getAllProducts);
productsRoute.get('/:id', productController.getProduct);
productsRoute.post('/', productsValidate, productController.createProduct);
productsRoute.put('/:id', productsValidate, productController.editProduct);
productsRoute.delete('/:id', productController.deleteProduct);

module.exports = productsRoute;