const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");

describe("Get a list of products - Service", () => {
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

  it('should return a list of products', async () => {
    const response = await productsService.getAllProducts();

    expect(response).to.be.a('array');
  });

  it('should return a list of products with "id" and "name"', async () => {
    const response = await productsService.getAllProducts();

    expect(response[0]).to.have.a.property('id');
    expect(response[0]).to.have.a.property('name');

    expect(response[1]).to.have.a.property("id");
    expect(response[1]).to.have.a.property("name");
  });
});
