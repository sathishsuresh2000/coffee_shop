const dbManager = require("./dbManager");
const { COLLECTIONS } = require("../utils/constants");

class Orders {
  insertOrder(order, itemsObj) {
    order.createdAt = new Date();
    order.updatedAt = new Date();
    return dbManager.execute(async (client) => {
      const result = await client.db().collection(COLLECTIONS.ORDERS).insertOne({ order });
      const promises = [];
      for (const key in itemsObj) {
        promises.push(client.db().collection(COLLECTIONS.ITEMS).updateOne(
          { _id: itemsObj[key]._id },
          { $set: { quantity: itemsObj[key].quantity } },
        ));
      }
      await Promise.all(promises);
      return { _id: result.insertedId, ...order };
    });
  }
  
  findOrder(orderId) {
    return dbManager.execute((client) => {
      return client.db().collection(COLLECTIONS.ORDERS).findOne({ _id: dbManager.getObjectId(orderId) });
    });
  }
}

module.exports = new Orders();
