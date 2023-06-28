const validator = require("../../utils/validator");
const { MESSAGES } = require("../../utils/constants");
const { isValidObjectId } = require("../../models");
const {items} = require("../../models");

class ItemsValidator {

  validateCreateItem(bodyObj = {}) {
    const errors = [];
    if (!validator.isString(bodyObj.name)) {
      errors.push(MESSAGES.ITEM_NAME_INVALID);
    }
    if (!validator.isPositiveNumeric(bodyObj.quantity)) {
      errors.push(MESSAGES.QUANTITY_INVALID);
    }
    if (!validator.isPositiveNumeric(bodyObj.price)) {
      errors.push(MESSAGES.PRICE_INVALID);
    }
    if (!validator.isPositiveNumeric(bodyObj.tax)) {
      errors.push(MESSAGES.TAX_INVALID);
    }
    return errors;
  }

  async validateUpdateItem(id, bodyObj = {}) {
    const errors = [];
    if (!isValidObjectId(id)) {
      errors.push(MESSAGES.INVALID_ID);
    }
    if (bodyObj.name && !validator.isString(bodyObj.name)) {
      errors.push(MESSAGES.ITEM_NAME_INVALID);
    }
    if (bodyObj.quantity && !validator.isPositiveNumeric(bodyObj.quantity)) {
      errors.push(MESSAGES.QUANTITY_INVALID);
    }
    if (bodyObj.price && !validator.isPositiveNumeric(bodyObj.price)) {
      errors.push(MESSAGES.PRICE_INVALID);
    }
    if (bodyObj.tax && !validator.isPositiveNumeric(bodyObj.tax)) {
      errors.push(MESSAGES.TAX_INVALID);
    }
    if (bodyObj.name && validator.isString(bodyObj.name) && isValidObjectId(id)) {
      const item = await items.findItemByName(bodyObj.name);
      if (item && item._id.toString() !== id) {
        errors.push(MESSAGES.ITEM_NAME_ALREADY_EXIST);
      }
    }
    return errors;
  }
}

module.exports = new ItemsValidator();