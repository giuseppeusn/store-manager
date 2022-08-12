const express = require('express');
const productController = require('../controllers/productsController');
const productsValidate = require('../middlewares/productsValidate');

const route = express.Router();

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProduct);
route.post('/', productsValidate, productController.createProduct);

module.exports = route;