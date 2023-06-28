const { Router } = require("express");
const itemsController = require('../controllers/items');
const ordersController = require('../controllers/orders');
const { MESSAGES } = require("../utils/constants");

class Routes extends Router {
  constructor() {
    super();
    this.get('/', (req, res) => res.send(MESSAGES.SHOP_OPEN));
    this.post('/api/items', itemsController.createItem);
    this.put('/api/items/:id', itemsController.updateItem);
    this.get('/api/items', itemsController.getAllItems);
    this.post('/api/orders', ordersController.createOrder);
    this.get('/api/orders/:id', ordersController.viewOrder);
  }
}

module.exports = Routes;