const connection = require('./connection');

const createSale = async (sales) => {
  const querySalesProducts = `
    INSERT INTO
      StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES
      (?, ?, ?)`;

  const querySales = `
    INSERT INTO
      StoreManager.sales (id, date)
    VALUES
      (default, default)`;

  const [resultSale] = await connection.query(querySales);

  await sales.forEach(async (sale) => {
    const { productId, quantity } = sale;
    await connection.query(querySalesProducts, [resultSale.insertId, productId, quantity]);
  });

  return resultSale;
};

module.exports = {
  createSale,
};