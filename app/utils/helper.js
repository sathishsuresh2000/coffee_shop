const serverConfig = require("config").get("server");

class Helper {

  getOrderLink(orderId) {
    return `http://${serverConfig.host}:${serverConfig.port}/api/orders/${orderId.toString()}`;
  }
}

module.exports = new Helper();