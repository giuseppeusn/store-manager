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

  describe('Create product', () => {
    describe('In case of success', () => {
      before(() => {
        const execute = [{ insertId: 1 }];

        sinon.stub(productsModel, 'createProduct').resolves(execute);
      });

      after(() => {
        productsModel.createProduct.restore();
      });

      it('should return a object with "code" and "response"', async () => {
        const response = await productsService.createProduct('1');

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('response');
      });
    });
  });

  describe('Update product', () => {
    describe('In case of success', () => {
      before(() => {
        const execute = { changedRows: 1};

        sinon.stub(productsModel, 'editProduct').resolves(execute);
      });

      after(() => {
        productsModel.editProduct.restore();
      });

      it('should return a object with "code"', async () => {
        const response = await productsService.editProduct('1', 'name_example');

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
      });
    });

    describe('In case of failing', () => {
      before(() => {
        const execute = { changedRows: 0 };

        sinon.stub(productsModel, 'editProduct').resolves(execute);
      });

      after(() => {
        productsModel.editProduct.restore();
      });

      it('should return a object with "code" and "message"', async () => {
        const response = await productsService.editProduct('99', 'name_example');

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('message');
      });
    });
  });

  describe('Delete product', () => {
    describe('In case of success', () => {
      before(() => {
        const execute = { affectedRows: 1 };

        sinon.stub(productsModel, 'deleteProduct').resolves(execute);
      });

      after(() => {
        productsModel.deleteProduct.restore();
      });

      it('should return a object with "code"', async () => {
        const response = await productsService.deleteProduct('1');

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
      });
    });

    describe('In case of failing', () => {
      before(() => {
        const execute = { affectedRows: 0 };

        sinon.stub(productsModel, 'deleteProduct').resolves(execute);
      });

      after(() => {
        productsModel.deleteProduct.restore();
      });

      it('should return a object with "code" and "message"', async () => {
        const response = await productsService.deleteProduct('99');

        expect(response).to.be.a('object');
        
        expect(response).to.have.a.property('code');
        expect(response).to.have.a.property('message');
      });
    });
  });

  describe('Search product by query', () => {
    before(() => {
      const execute = [
        {
          id: 1,
          name: 'example_name',
        },
      ];

      sinon.stub(productsModel, 'searchProduct').resolves(execute);
    });

    after(() => {
      productsModel.searchProduct.restore();
    });

    it('should return an array', async () => {
      const response = await productsService.searchProduct('name_example');

      expect(response).to.be.an('array');
    }); 
  });
});
