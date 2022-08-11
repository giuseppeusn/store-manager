const express = require('express');
const productController = require('../controllers/productsController');

const route = express.Router();

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProduct);
route.post('/', productController.createProduct);

module.exports = route;