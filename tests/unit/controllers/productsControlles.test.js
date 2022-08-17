const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

describe('Products Controller tests', () => {
  describe('Get a list of products', () => {
    const response = {};
    const request = {};
    const result = [
      { id: 1, name: 'example_name' },
      { id: 2, name: 'example_name2' }
    ];

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(productsService, 'getAllProducts').resolves(result);
    });

    after(() => {
      productsService.getAllProducts.restore();
    });

    it('should response with status 200', async () => {
      await productsController.getAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Get product by ID', () => {
    const response = {};
    const request = {};

    describe('In case of success', () => {
      const result = {
        code: 200,
        response: {
          id: '1',
          name: 'example_name'
        }
      };

      before(() => {
        request.body = {};
        request.params = { id: '1' };

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(productsService, 'getProduct').resolves(result);
      });

      after(() => {
        productsService.getProduct.restore();
      });

      it('should response with status 200 and json with "id" and "name"', async () => {
        await productsController.getProduct(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith(result.response)).to.be.equal(true);
      });
    });

    describe('In case of failing', () => {
      const result = {
        code: 404,
        message: 'Product not found'
      };

      before(() => {
        request.body = {};
        request.params = '1';

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(productsService, 'getProduct').resolves(result);
      });

      after(() => {
        productsService.getProduct.restore();
      });

      it('should response with status 404 and message "Product not found"', async () => {
        await productsController.getProduct(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith({ message: result.message })).to.be.equal(true);
      });
    });
  });

  describe('Create product', () => {
    describe('In case of success', () => {
      const response = {};
      const request = {};

      const result = {
        code: 201,
        response: {
          id: '1',
          name: 'example_name'
        }
      };

      before(() => {
        request.body = {
          name: 'example_name',
        };

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(productsService, 'createProduct').resolves(result);
      });

      after(() => {
        productsService.createProduct.restore();
      });

      it('should response with status 201 and json with "id" and "name"', async () => {
        await productsController.createProduct(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith(result.response)).to.be.equal(true);
      });
    });
  });

  describe('Update product', () => {
    const response = {};
    const request = {};

    describe('In case of success', () => {
      const result = { code: 200 };
      const mock = {
        id: '1',
        name: 'example_name'
      };

      before(() => {
        request.body = { name: 'example_name' };
        request.params = { id: '1' };

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(productsService, 'editProduct').resolves(result);
      });

      after(() => {
        productsService.editProduct.restore();
      });

      it('should response with status 200 and json with "id" and "name"', async () => {
        await productsController.editProduct(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith(mock)).to.be.equal(true);
      });
    });

    describe('In case of failing', () => {
      const result = {
        code: 404,
        message: 'Product not found'
      };

      before(() => {
        request.body = { name: 'example_name' };
        request.params = '99';

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(productsService, 'editProduct').resolves(result);
      });

      after(() => {
        productsService.editProduct.restore();
      });

      it('should response with status 404 and message "Product not found"', async () => {
        await productsController.editProduct(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith({ message: result.message })).to.be.equal(true);
      });
    });
  });
});
