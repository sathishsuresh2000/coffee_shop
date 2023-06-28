module.exports = {
  HTTP_CODES: {
    SUCCESS: 200,
    SUCCESS_CREATE: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
  },
  MESSAGES: {
    SHOP_OPEN: "Shop is open, let's brew something!!",
    INVALID_ID: "Id is not valid",
    ITEM_NAME_INVALID: "Item name is not valid",
    QUANTITY_INVALID: "Quantity is not valid",
    PRICE_INVALID: "Price is not valid",
    TAX_INVALID: "Tax % is not valid",
    FIX_ERRORS: "Please fix the errors",
    ERROR_CREATING_ITEM: "Error while creating item, please try again",
    ERROR_CREATING_ORDER: "Error while creating order, please try again",
    ERROR_UPDATING_ITEM: "Error while updating item, please try again",
    ITEM_CREATED: "Item created successfully",
    ITEM_ALREADY_EXIST: "Item already exist",
    ITEM_NOT_EXIST: "Item not exist",
    ITEM_UPDATED: "Item updated successfully",
    ERROR_GETTING_ITEMS: "Error while getting available items, please try again",
    ORDER_ITEMS_EMPTY: "Please add items",
    ITEM_NOT_AVAILABLE: "%s not available",
    QUANTITY_NOT_AVAILABLE: "Only %s quantities of %s available",
    ORDER_BREWING: "Your order is brewing, click on order link to get status",
    ORDER_NOT_FOUND: "Cannot find your order, please try ordering",
    ORDER_READY: "Your order is ready, enjoy your food",
    ITEM_NAME_ALREADY_EXIST: "Another item with same name already exist"
  },

  COLLECTIONS: {
    ITEMS: "items",
    ORDERS: "orders",
  },
};