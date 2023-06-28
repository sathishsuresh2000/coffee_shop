const itemsValidator = require("./itemsValidator");
const { HTTP_CODES, MESSAGES } = require("../../utils/constants");
const itemsService = require("../../services/items");

class ItemsController {

  async createItem(req, res) {
    try {
      const errors = itemsValidator.validateCreateItem(req.body);
      if (errors.length > 0) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ message: MESSAGES.FIX_ERRORS, errors });
      }
      if (await itemsService.isItemAlreadyExistByName(req.body.name)) {
        return res.status(HTTP_CODES.CONFLICT).send({ message: MESSAGES.ITEM_ALREADY_EXIST });
      }
      const result = await itemsService.createItem(req.body);
      return res.status(HTTP_CODES.SUCCESS_CREATE).send({ message: MESSAGES.ITEM_CREATED, result });
    } catch (err) {
      console.log("Error while creating item:", err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: MESSAGES.ERROR_CREATING_ITEM });
    }
  }

  async updateItem(req, res) {
    try {
      const errors = await itemsValidator.validateUpdateItem(req.params.id, req.body);
      if (errors.length > 0) {
        return res.status(HTTP_CODES.BAD_REQUEST).send({ message: MESSAGES.FIX_ERRORS, errors });
      }
      const result = await itemsService.updateItem({ _id: req.params.id, ...req.body });
      if (!result) {
        return res.status(HTTP_CODES.NOT_FOUND).send({ message: MESSAGES.ITEM_NOT_EXIST });
      }
      return res.status(HTTP_CODES.SUCCESS).send({ message: MESSAGES.ITEM_UPDATED, result });
    } catch (err) {
      console.log("Error while updating item:", err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: MESSAGES.ERROR_UPDATING_ITEM });
    }
  }

  async getAllItems(req, res) {
    try {
      return res.status(HTTP_CODES.SUCCESS).send(await itemsService.getAllItems());
    } catch (err) {
      console.log("Error while getting items:", err);
      res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({ message: MESSAGES.ERROR_GETTING_ITEMS });
    }
  }

}

module.exports = new ItemsController();