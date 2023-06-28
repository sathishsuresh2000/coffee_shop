const dbManager = require("./dbManager");
const { COLLECTIONS } = require("../utils/constants");

class Items {
  createItem(itemObj) {
    const doc = {
      name: itemObj.name,
      price: itemObj.price,
      quantity: itemObj.quantity,
      tax: itemObj.tax,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return dbManager.execute(async (client) => {
      const result = client.db().collection(COLLECTIONS.ITEMS).insertOne(doc);
      return { _id: result.insertedId, ...doc };
    });
  }

  updateItem(itemObj) {
    const query = { _id: dbManager.getObjectId(itemObj._id) };
    const update = { $set: {} };
    if (itemObj.name) update.$set.name = itemObj.name;
    if (itemObj.price) update.$set.price = itemObj.price;
    if (itemObj.quantity) update.$inc = { quantity: itemObj.quantity };
    if (itemObj.tax) update.$set.tax = itemObj.tax;

    return dbManager.execute(async (client) => {
      const result = await client.db().collection(COLLECTIONS.ITEMS).findOneAndUpdate(query, update, { returnDocument: 'after' });
      return result.value;
    });
  }

  findItemByName(name) {
    return dbManager.execute((client) => {
      return client.db().collection(COLLECTIONS.ITEMS).findOne({ name });
    });
  }

  findItem(id) {
    return dbManager.execute((client) => {
      return client.db().collection(COLLECTIONS.ITEMS).findOne({ _id: dbManager.getObjectId(id) });
    });
  }

  findAll() {
    return dbManager.execute((client) => {
      return client.db().collection(COLLECTIONS.ITEMS).find({ quantity: { $gt: 0 } })
        .project({ name: 1, price: 1, quantity: 1, _id: 0 })
        .toArray();
    });
  }

  findItemsByName(itemsName) {
    return dbManager.execute((client) => {
      return client.db().collection(COLLECTIONS.ITEMS).find({ name: { $in: itemsName } }).toArray();
    });
  }
}

module.exports = new Items();
