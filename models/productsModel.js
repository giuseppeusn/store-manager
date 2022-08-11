const connection = require('./connection');

const getAllProducts = async () => {
  const query = 'SELECT * FROM StoreManager.products';

  const [result] = await connection.execute(query);

  return result;
};

const getProduct = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [result] = await connection.execute(query, [id]);

  return result;
};

const createProduct = async (name) => {
  const query = `
    INSERT INTO
      StoreManager.products (name)
    VALUES
      (?)
  `;

  const [result] = await connection.execute(query, [name]);

  return result;
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
};