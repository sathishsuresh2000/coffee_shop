const { orders } = require("../../models");

class ordersService {
  createOrder(orderObj, itemsObj) {
    const order = { items: [], totalAmount: 0, taxAmount: 0 };
    for (const item of orderObj.items) {
      order.items.push({
        name: item.name,
        quantity: item.quantity,
        tax: itemsObj[item.name].tax,
        price: itemsObj[item.name].price,
      });
      order.totalAmount += item.quantity * itemsObj[item.name].price;
      order.taxAmount += item.quantity * ((itemsObj[item.name].price * itemsObj[item.name].tax) / 100);
      itemsObj[item.name].quantity -= item.quantity;
    }
    return orders.insertOrder(order, itemsObj);
  }

  viewOrder(orderId) {
    return orders.findOrder(orderId);
  }
}

module.exports = new ordersService();