const express = require('express');
const { productsRoute, salesRoute } = require('./routes');

const app = express();

app.use(express.json());
app.use('/products', productsRoute);
app.use('/sales', salesRoute);

module.exports = app;