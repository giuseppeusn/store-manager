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

const updateProduct = async (id, name) => {
  const query = `
    UPDATE StoreManager.products
    SET name = ?
    WHERE id = ?
  `;

  const [result] = await connection.execute(query, [name, id]);

  return result;
};

const deleteProduct = async (id) => {
  const query = `
    DELETE FROM StoreManager.products
    WHERE id = ?
  `;

  const [result] = await connection.execute(query, [id]);

  return result;
};

const searchProduct = async (search) => {
  const query = `
    SELECT *
    FROM StoreManager.products
    WHERE name LIKE ?
  `;

  const [result] = await connection.execute(query, [`%${search}%`]);

  return result;
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};