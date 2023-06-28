const ordersValidator = require("./ordersValidator");
const { HTTP_CODES, MESSAGES } = require("../../utils/constants");
const ordersService = require("../../services/orders");
const { getOrderLink } = require("../../utils/helper");

class Orders {

  async createOrder(req, res) {
    try {
      let validationErrors = ordersValidator.validateCreateOrder(req.body);
      if (validationErrors.length > 0) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ message: MESSAGES.FIX_ERRORS, errors: validationErrors });
      }
      const { errors, itemsObj } = await ordersValidator.verifyItems(req.body.items);
      if (errors.length > 0) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ message: MESSAGES.FIX_ERRORS, errors });
      }
      const result = await ordersService.createOrder(req.body, itemsObj);
      return res.status(HTTP_CODES.SUCCESS_CREATE).send({
        message: MESSAGES.ORDER_BREWING,
        result,
        orderLink: getOrderLink(result._id)
      });
    } catch (err) {
      console.log("Error while creating order:", err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: MESSAGES.ERROR_CREATING_ORDER });
    }
  }

  async viewOrder(req, res) {
    try {
      const errors = ordersValidator.validateOrderId(req.params.id);
      if (errors.length > 0) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ message: MESSAGES.FIX_ERRORS, errors });
      }
      const result = await ordersService.viewOrder(req.params.id);
      if (!result) {
        return res.status(HTTP_CODES.NOT_FOUND).send({ message: MESSAGES.ORDER_NOT_FOUND, result });
      }
      return res.status(HTTP_CODES.SUCCESS).send({ message: MESSAGES.ORDER_READY, result });
    } catch (err) {
      console.log("Error while viewing order:", err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: MESSAGES.ERROR_CREATING_ORDER });
    }
  }
}

module.exports = new Orders();