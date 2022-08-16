const connection = require('./connection');

const getAllSales = async () => {
  const query = `
    SELECT * FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id`;
  
  const [result] = await connection.execute(query);

  return result;
};

const getSale = async (id) => {
  const query = `
    SELECT * FROM StoreManager.sales AS s
    INNER JOIN StoreManager.sales_products AS sp
    ON s.id = sp.sale_id
    WHERE s.id = ?`;

  const [result] = await connection.execute(query, [id]);

  return result;
};

const createSale = async () => {
  const query = `
    INSERT INTO
      StoreManager.sales (id, date)
    VALUES
      (default, default)`;

  const [result] = await connection.execute(query);

  return result;
};

const createSaleProduct = async (id, sale) => {
  const { productId, quantity } = sale;

  const query = `
    INSERT INTO
      StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES
      (?, ?, ?)`;
  
  const [result] = await connection.execute(query, [id, productId, quantity]);

  return result;
};

const deleteSale = async (id) => {
  const query = `
    DELETE
    FROM StoreManager.sales
    WHERE id = ?
  `;

  const [result] = await connection.execute(query, [id]);

  return result;
};

module.exports = {
  createSale,
  getAllSales,
  getSale,
  createSaleProduct,
  deleteSale,
};