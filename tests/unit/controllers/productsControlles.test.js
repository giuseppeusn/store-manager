const sinon = require("sinon");
const { expect } = require("chai");
const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");

describe("Get a list of products - Controller", () => {
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

  it("should response with status 200", async () => {
    await productsController.getAllProducts(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});
