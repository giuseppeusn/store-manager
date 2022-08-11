const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");

describe('Get a list of products - Model', () => {
  before(() => {
    const execute = [
      { id: 1, name: 'example_name' },
      { id: 2, name: 'example_name2' }
    ]

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('should return a list of products with "id" and "name"', async () => {
    const response = await productsModel.getAllProducts();

    expect(response).to.be.a("object");
    expect(response).to.have.a.property('id');
    expect(response).to.have.a.property('name');

  });
});

describe('Get products by ID - Model', async () => {
  before(() => {
    const execute = [{
      id: 1,
      name: "example_name"
    }];

    sinon.stub(connection, "execute").resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('should return a product with "id" and "name"', async () => {
    const response = await productsModel.getProduct('1');
    console.log(response);

    expect(response).to.be.a('object');
    expect(response).to.have.a.property('id');
    expect(response).to.have.a.property('name');
  });
});