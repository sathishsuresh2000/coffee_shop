const { items } = require("../../models");

class ItemsService {

  createItem(itemObj) {
    return items.createItem(itemObj);
  }

  updateItem(itemObj) {
    return items.updateItem(itemObj);
  }

  async isItemAlreadyExist(id) {
    const result = await items.findItem(id);
    return !!result;
  }

  async isItemAlreadyExistByName(name) {
    const result = await items.findItemByName(name);
    return !!result;
  }

  getAllItems() {
    return items.findAll();
  }

  async getItemsByName(itemsName) {
    const itemsObj = {};
    const itemsList = await items.findItemsByName(itemsName)
    itemsList.map(i => itemsObj[i.name] = i);
    return itemsObj;
  }
}

module.exports = new ItemsService();