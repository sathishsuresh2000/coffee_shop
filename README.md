# Coffee Shop application

## Application Setup
* First install the dependencies - 
* ```
    npm ci
  ```
* Setup your own mongo database or create using mongodb atlas - https://cloud.mongodb.com
* To pass database details, fill the host, username, password and dbname in below command and run
* ```
    export NODE_CONFIG='{"database": {"host":"host", "username": "username", "password": "password",  "dbname": "coffeeshop"}}'
  ```
* To start the application, 
* ```
    npm run start
  ```

## Problem Summary
* Customers should be able to view available items and order them. They should be notified once the order is ready.

## Summary of Changes
* mongodb npm is used to connect to mongodb.
* Layering architecture with singleton patten has been adopted.
* Admin APIs to create and update items are available. 
* Customer API to view items is available.
* Customer can create and view order through respective APIs.

## API Changes

### POST */api/items*
* This API is used to insert items.
* Sample payload - 
  * ```
    {
      "name": "cappuccino",
      "quantity": 10,
      "price": 150,
      "tax": 8
    }
    ``` 
* Sample response - 
  * ```
      {
        "message": "Item created successfully",
        "result": {
            "_id": "649bd1168477a6379edfae2c",
            "name": "cappuccino",
            "price": 150,
            "quantity": 10,
            "tax": 8,
            "createdAt": "2023-06-28T06:20:06.194Z",
            "updatedAt": "2023-06-28T06:20:06.194Z"
         }
      } 
    ```
* Basic validations are added to ensure name, quantity, tax and price are valid and in required format. If item with same name already exists, system will throw validation error.
* Once validation passes, item will be created and returned.

### PUT */api/items/:id*
* This API is used to update existing items.
* Sample payload - 
  * ```
    {
      "name": "cappuccino",
      "quantity": 20,
      "price": 160,
      "tax": 10
    }
    ``` 
* Sample response - 
  * ```
     {
        "message": "Item created successfully",
        "result": {
            "_id": "649bd1168477a6379edfae2c",
            "name": "cappuccino",
            "price": 160,
            "quantity": 30,
            "tax": 10,
            "createdAt": "2023-06-28T06:20:06.194Z",
            "updatedAt": "2023-06-28T06:20:06.194Z"
         }
      } 
    ```
* Basic validations are added to ensure name, quantity, tax and price are valid and in required format. If item with same name already exists for different id, system will throw validation error.
* Using this API, item name, price and tax can be updated and quantity will be added.
  
### GET */api/items*
* This API is used to get all available items.
* Sample response - 
  * ```
     [
        {
            "name": "cappuccino",
            "price": 160,
            "quantity": 40
        },
        {
            "name": "cake",
            "price": 120,
            "quantity": 20
        }
     ]
    ```
### POST */api/orders*
* This API is used to place order.
* Sample payload - 
  * ```
    {
        "items":[
            {
                "name": "cappuccino",
                "quantity": 1
            },
            {
                "name": "cake",
                "quantity": 1
            }
        ]
    }
    ``` 
* Sample response - 
  * ```
     {
          "message": "Your order is brewing",
          "result": {
              "_id": "649bd3c90ef8a97ac49fdbb0",
              "items": [
                  {
                      "name": "cappuccino",
                      "quantity": 1,
                      "tax": 10,
                      "price": 160
                  },
                  {
                      "name": "cake",
                      "quantity": 1,
                      "tax": 10,
                      "price": 120
                  }
              ],
              "totalAmount": 280,
              "taxAmount": 28,
              "createdAt": "2023-06-28T06:31:37.174Z",
              "updatedAt": "2023-06-28T06:31:37.174Z"
          }
      }
    ```
* Basic validations are performed to ensure name and quantity are valid and in required format. If item not available or out of stock, system will throw validation error.

### POST */api/orders/:id*
* This API is used to return order status.
* Sample response - 
  * ```
     {
          "message": "Your order is ready, enjoy your food",
          "result": {
              "_id": "649bd3c90ef8a97ac49fdbb0",
              "items": [
                  {
                      "name": "cappuccino",
                      "quantity": 1,
                      "tax": 10,
                      "price": 160
                  },
                  {
                      "name": "cake",
                      "quantity": 1,
                      "tax": 10,
                      "price": 120
                  }
              ],
              "totalAmount": 280,
              "taxAmount": 28,
              "createdAt": "2023-06-28T06:31:37.174Z",
              "updatedAt": "2023-06-28T06:31:37.174Z"
          }
      }
    ```
* Basic validations is performed on the id and order details will be returned as part of this api.

## Tradeoffs and Improvements
* Mongoose npm can be used in place of mongodb npm. This definitely provides better functionality and provision to define schemas. 
* Also mongoose supports some schema validations as well. But due to time constraint, it's not considered in current assignment.
* Transactions could be used while creating order, but in mongo, transactions are supported only for replicaset servers. Again that increases complexity, so this can be a good improvement.
* Customer notification is achieved manually through API. This can be improved by adding MessageQueues(eg. RabbitMQ, BullMQ, Redis Pub/Sub) and integrate with email/sms (AWS SES, Twilio SMS) notification.