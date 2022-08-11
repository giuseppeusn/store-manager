const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");

describe('Products Services tests', () => {
  describe('Get a list of products', () => {
    before(() => {
      const execute = [
        { id: 1, name: 'example_name' },
        { id: 2, name: 'example_name2' },
      ];

      sinon.stub(productsModel, 'getAllProducts').resolves(execute);
    });

    after(() => {
      productsModel.getAllProducts.restore();
    });

    it('should return a list of products with "id" and "name"', async () => {
      const response = await productsService.getAllProducts();

      expect(response).to.be.a('array');

      expect(response[0]).to.have.a.property('id');
      expect(response[0]).to.have.a.property('name');

      expect(response[1]).to.have.a.property('id');
      expect(response[1]).to.have.a.property('name');
    });
  });

  describe('Get product by ID', () => {
    describe('In case of success', () => {
      before(() => {
        const execute = [
          {
            id: 1,
            name: 'example_name'
          }
        ];

        sinon.stub(productsModel, 'getProduct').resolves(execute);
      });

      after(() => {
        productsModel.getProduct.restore();
      });

      it('should return a object with "code" and "response"', async () => {
        const response = await productsService.getProduct('1');

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('response');
      });
    });
    
    describe('In case of failing', () => {
      before(() => {
        const execute = [];

        sinon.stub(productsModel, 'getProduct').resolves(execute);
      });

      after(() => {
        productsModel.getProduct.restore();
      });

      it('should return a object with "code" and "message"', async () => {
        const response = await productsService.getProduct('2');

        expect(response).to.be.a('object');

        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('message');
      });
    });
  });
});
