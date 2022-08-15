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
  const querySales = `
    INSERT INTO
      StoreManager.sales (id, date)
    VALUES
      (default, default)`;

  const [resultSale] = await connection.execute(querySales);

  return resultSale;
};

const createSaleProduct = async (id, sales) => {
  const querySalesProducts = `
    INSERT INTO
      StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES
      (?, ?, ?)`;
  
  sales.forEach(async (sale) => {
    const { productId, quantity } = sale;
    await connection.execute(querySalesProducts, [
      id,
      productId,
      quantity,
    ]);
  });
};

module.exports = {
  createSale,
  getAllSales,
  getSale,
  createSaleProduct,
};