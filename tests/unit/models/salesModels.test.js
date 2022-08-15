const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/salesModel");
const connection = require("../../../models/connection");

describe('Sales Models tests', () => {
  describe('Get a list of sales', () => {
    before(() => {
      const execute = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2
        }
      ];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a list of products with "saleId", "date", "productId" and "quantity"', async () => {
      const response = await salesModel.getAllSales();

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('saleId');
      expect(response).to.have.a.property('date');
      expect(response).to.have.a.property('productId');
      expect(response).to.have.a.property('quantity');
    });
  });

  describe('Get sales by ID', () => {
    before(() => {
      const execute = [
        {
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        }
      ];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a product with "date", "productId" and "quantity"', async () => {
      const response = await salesModel.getSale('1');

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('date');
      expect(response).to.have.a.property('productId');
      expect(response).to.have.a.property('quantity');
    });
  });

  describe('Create sale', () => {
    before(() => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a sale "id" inserted', async () => {
      const response = await salesModel.createSale();
      
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('insertId');
    });
  });

  describe('Create sale product', () => {
    const mock = [
      {
        productId: 1,
        quantity: 1,
      },
      {
        productId: 2,
        quantity: 5,
      },
    ];

    before(() => {
      const execute = [{ affectedRows: 1 }];
      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return quantity "affectedRows" affected', async () => {
      const response = await salesModel.createSaleProduct('1', mock);
      
      expect(response).to.be.a('object');
      expect(response).to.have.a.property('affectedRows')
    });
  });
});