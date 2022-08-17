const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");

describe('Products Models tests', () => {
  describe('Get a list of products', () => {
    before(() => {
      const execute = [
        { id: 1, name: 'example_name' },
        { id: 2, name: 'example_name2' },
      ];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a list of products with "id" and "name"', async () => {
      const response = await productsModel.getAllProducts();

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    });
  });

  describe('Get product by ID', async () => {
    before(() => {
      const execute = [
        {
          id: 1,
          name: 'example_name',
        },
      ];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a product with "id" and "name"', async () => {
      const response = await productsModel.getProduct('1');

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
    });
  });

  describe('Create product', async () => {
    before(() => {
      const execute = [{ insertId: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a product "id" inserted', async () => {
      const response = await productsModel.createProduct('name_example');

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('insertId');
    });
  });

  describe('Update product', async () => {
    before(() => {
      const execute = [{ changedRows: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a object with "changedRows" greater than 1', async () => {
      const response = await productsModel.editProduct('1','name_example');

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('changedRows');
    });
  });

  describe('Delete product', async () => {
    before(() => {
      const execute = [{ affectedRows: 1 }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('should return a object with "affectedRows" greater than 1', async () => {
      const response = await productsModel.deleteProduct('1');

      expect(response).to.be.a('object');
      expect(response).to.have.a.property('affectedRows');
    });
  });
});
