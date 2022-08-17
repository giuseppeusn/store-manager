const sinon = require("sinon");
const { expect } = require("chai");
const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");

describe('Sales Controller tests', () => {
  describe('Get a list of sales', () => {
    const response = {};
    const request = {};
    const result = [
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

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
      
      sinon.stub(salesService, 'getAllSales').resolves(result);
    });

    after(() => {
      salesService.getAllSales.restore();
    });

    it('should response with status 200', async () => {
      await salesController.getAllSales(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(result)).to.be.equal(true);
    });
  });

  describe('Get sale by ID', () => {
    const response = {};
    const request = {};

    describe('In case of success', () => {
      const result = {
        code: 200,
        reponse: [
          {
            date: "2021-09-09T04:54:29.000Z",
            productId: 1,
            quantity: 2
          }
        ]
      };

      before(() => {
        request.body = {};
        request.params = '1';

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(salesService, 'getSale').resolves(result);
      });

      after(() => {
        salesService.getSale.restore();
      });

      it('should response with status 200 and json with "id" and "name"', async () => {
        await salesController.getSale(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith(result.response)).to.be.equal(true);
      });
    });

    describe('In case of failing', () => {
      const result = {
        code: 404,
        message: 'Sale not found'
      };

      before(() => {
        request.body = {};
        request.params = '1';

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(salesService, 'getSale').resolves(result);
      });

      after(() => {
        salesService.getSale.restore();
      });

      it('should response with status 404 and message "Sale not found"', async () => {
        await salesController.getSale(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith({ message: result.message })).to.be.equal(true);
      });
    });
  });

  describe('Create sale', () => {
    describe('In case of success', () => {
      const response = {};
      const request = {};

      const result = {
        code: 201,
        response: {
          id: 3,
          itemsSold: [
            {
              productId: 1,
              quantity: 1,
            },
            {
              productId: 2,
              quantity: 5,
            },
          ],
        },
      };

      before(() => {
        request.body = [
          {
            productId: 1,
            quantity: 1,
          },
          {
            productId: 2,
            quantity: 5,
          },
        ];

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(salesService, 'createSale').resolves(result);
      });

      after(() => {
        salesService.createSale.restore();
      });

      it('should response with status 201 and json with "id" and "itemsSold"', async () => {
        await salesController.createSale(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith(result.response)).to.be.equal(true);
      });
    });

    describe('In case of failing', () => {
      const response = {};
      const request = {};

      const result = {
        code: 404,
        message: 'Product not found'
      };

      before(() => {
        request.body = [
          {
            productId: 98,
            quantity: 1,
          },
          {
            productId: 99,
            quantity: 5,
          },
        ];

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(salesService, 'createSale').resolves(result);
      });

      after(() => {
        salesService.createSale.restore();
      });

      it('should response with status 404 and message "Product not found"', async () => {
        await salesController.createSale(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith({ message: result.message })).to.be.equal(true);
      });
    });
  });

  describe('Delete sale', () => {
    describe('In case of success', () => {
      const response = {};
      const request = {};

      const result = { code: 204 };

      before(() => {
        request.body = {};
        request.params = '1';

        response.status = sinon.stub()
          .returns(response);
        response.end = sinon.stub().returns();
        
        sinon.stub(salesService, 'deleteSale').resolves(result);
      });

      after(() => {
        salesService.deleteSale.restore();
      });

      it('should response with status 204', async () => {
        await salesController.deleteSale(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
      });
    });

    describe('In case of failing', () => {
      const response = {};
      const request = {};

      const result = {
        code: 404,
        message: 'Sale not found'
      };

      before(() => {
        request.body = {};
        request.params = '1';

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub()
          .returns();
        
        sinon.stub(salesService, 'deleteSale').resolves(result);
      });

      after(() => {
        salesService.deleteSale.restore();
      });

      it('should response with status 404 and message "Sale not found"', async () => {
        await salesController.deleteSale(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: result.message })).to.be.equal(true);
      });
    });
  });

  describe('Update sale', () => {
    describe('In case of success', () => {
      const response = {};
      const request = {};
      const responseService = [
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

      const result = { code: 200, response: responseService };

      before(() => {
        request.body = responseService;
        request.params = '1';

        response.status = sinon.stub()
          .returns(response);
        response.json = sinon.stub().returns();
        
        sinon.stub(salesService, 'updateSale').resolves(result);
      });

      after(() => {
        salesService.updateSale.restore();
      });

      it('should response with status 200', async () => {
        await salesController.updateSale(request, response);

        expect(response.status.calledWith(result.code)).to.be.equal(true);
        expect(response.json.calledWith(result.response)).to.be.equal(true);
      });
    });

    describe('In case of failing', () => {
      const response = {};
      const request = {};

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
        
        sinon.stub(salesService, 'updateSale').resolves(result);
      });

      after(() => {
        salesService.updateSale.restore();
      });

      it('should response with status 404 and message "Product not found"', async () => {
        await salesController.updateSale(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: result.message })).to.be.equal(true);
      });
    });
  });
});
