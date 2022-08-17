const sinon = require("sinon");
const { expect } = require("chai");
const salesService = require("../../../services/salesService");
const productsModel = require("../../../models/productsModel");
const salesModel = require("../../../models/salesModel");

describe('Sales Services tests', () => {
  describe('Get a list of sales', () => {
    before(() => {
      const execute = [
        {
          saleId: 1,
          date: "2021-09-09T04:54:29.000Z",
          productId: 1,
          quantity: 2,
        },
        {
          saleId: 1,
          date: "2021-09-09T04:54:54.000Z",
          productId: 2,
          quantity: 2,
        },
      ];

      sinon.stub(salesModel, 'getAllSales').resolves(execute);
    });

    after(() => {
      salesModel.getAllSales.restore();
    });

    it('should return a list of products with "saleId", "date", "productId" and "quantity"', async () => {
      const response = await salesService.getAllSales();

      expect(response).to.be.a('array');

      expect(response[0]).to.have.a.property('saleId');
      expect(response[0]).to.have.a.property('date');
      expect(response[0]).to.have.a.property('productId');
      expect(response[0]).to.have.a.property('quantity');

      expect(response[1]).to.have.a.property('saleId');
      expect(response[1]).to.have.a.property('date');
      expect(response[1]).to.have.a.property('productId');
      expect(response[1]).to.have.a.property('quantity');
    });
  });

  describe('Get sale by ID', () => {
    describe('In case of success', () => {
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
          },
        ];

        sinon.stub(salesModel, 'getSale').resolves(execute);
      });

      after(() => {
        salesModel.getSale.restore();
      });

      it('should return a object with "code" and "response"', async () => {
        const response = await salesService.getSale('1');

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('response');
      });
    });
    
    describe('In case of failing', () => {
      before(() => {
        const execute = [];

        sinon.stub(salesModel, 'getSale').resolves(execute);
      });

      after(() => {
        salesModel.getSale.restore();
      });

      it('should return a object with "code" and "message"', async () => {
        const response = await salesService.getSale('2');

        expect(response).to.be.a('object');

        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('message');
      });
    });
  });

  describe('Create sale', () => {
    describe('In case of success', () => {
      const saleMock = [
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
        const executeProduct = [
          { id: 1, name: 'example' },
          { id: 2, name: 'example_2' },
        ];
        const executeCreateSale = [{ insertId: 1 }];

        sinon.stub(productsModel, 'getAllProducts').resolves(executeProduct);
        sinon.stub(salesModel, 'createSale').resolves(executeCreateSale);
        sinon.stub(salesModel, 'createSaleProduct').returns();
      });

      after(() => {
        productsModel.getAllProducts.restore();
        salesModel.createSale.restore();
        salesModel.createSaleProduct.restore();
      });

      it('should return a object with "code" and "response"', async () => {
        const response = await salesService.createSale(saleMock);

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('response');
      });
    });

    describe('In case of failing', () => {
      const saleMock = [
        {
          productId: 98,
          quantity: 1,
        },
        {
          productId: 99,
          quantity: 5,
        },
      ];

      before(() => {
        const executeProduct = [];

        sinon.stub(productsModel, 'getAllProducts').resolves(executeProduct);
      });

      after(() => {
        productsModel.getAllProducts.restore();
      });

      it('should return a object with "code" and "message"', async () => {
        const response = await salesService.createSale(saleMock);

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('message');
      });
    });
  });

  describe('Delete sale', () => {
    describe('In case of success', () => {
      before(() => {
        const execute = [{ affectedRows: 1 }];

        sinon.stub(salesModel, 'deleteSale').resolves(execute);
      });

      after(() => {
        salesModel.deleteSale.restore();
      });

      it('should return a object with "code"', async () => {
        const response = await salesService.deleteSale('1');

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
      });
    });
    
    describe('In case of failing', () => {
      before(() => {
        const execute = [{ affectedRows: 0 }];

        sinon.stub(salesModel, 'deleteSale').resolves(execute);
      });

      after(() => {
        salesModel.deleteSale.restore();
      });

      it('should return a object with "code" and "message"', async () => {
        const response = await salesService.deleteSale('2');

        expect(response).to.be.a('object');

        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('message');
      });
    });
  });
});