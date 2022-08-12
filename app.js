const express = require('express');
const { productsRoute, salesRoute } = require('./routes');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productsRoute);
app.use('/sales', salesRoute);

module.exports = app;