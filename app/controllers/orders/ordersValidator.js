const util = require("util");
const validator = require("../../utils/validator");
const { MESSAGES } = require("../../utils/constants");
const { isValidObjectId } = require("../../models");
const itemsService = require("../../services/items");

class OrdersValidator {

  validateCreateOrder(bodyObject = {}) {
    if (!bodyObject.items || bodyObject.items.length === 0) {
      return [MESSAGES.ORDER_ITEMS_EMPTY];
    }
    const errors = new Set();
    for (const item of bodyObject.items) {
      if (!validator.isString(item.name)) errors.add(MESSAGES.ITEM_NAME_INVALID);
      if (!validator.isPositiveNumeric(item.quantity)) errors.add(MESSAGES.QUANTITY_INVALID);
    }
    return [...errors];
  }

  async verifyItems(orderItems) {
    const itemsObj = await itemsService.getItemsByName(orderItems.map(i => i.name));
    const errors = [];
    for (const item of orderItems) {
      if (!itemsObj[item.name]) {
        errors.push(util.format(MESSAGES.ITEM_NOT_AVAILABLE, item.name));
      }
      else if (itemsObj[item.name].quantity < item.quantity) {
        errors.push(util.format(MESSAGES.QUANTITY_NOT_AVAILABLE, itemsObj[item.name].quantity, item.name));
      }
    }
    return { errors, itemsObj };
  }

  validateOrderId(id) {
    const errors = [];
    if (!isValidObjectId(id)) {
      errors.push(MESSAGES.INVALID_ID);
    }
    return errors;
  }
}

module.exports = new OrdersValidator();