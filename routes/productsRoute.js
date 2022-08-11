const express = require('express');
const productController = require('../controllers/productsController');

const route = express.Router();

route.get('/', productController.getAllProducts);
route.get('/:id', productController.getProduct);

module.exports = route;