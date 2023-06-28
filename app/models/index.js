const orders = require("./orders");
const items = require("./items");
const dbManager = require("./dbManager");

module.exports = {
  orders,
  items,
  getObjectId: dbManager.getObjectId,
  isValidObjectId: dbManager.isValidObjectId,
};