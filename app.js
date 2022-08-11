const express = require('express');
const productsRoute = require('./routes/productsRoute');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());
app.use('/products', productsRoute);

module.exports = app;