# Database Schema
* Two collections are created for Coffee Shop Application.
  * items
  * orders

## *items* Collection
* Each item will be stored in a separate document.
* Here is how items schema looks -
* ```
   {
      _id: ObjectId,
      name: String unique NOT NULL,
      quantity: Number NOT NULL,
      tax: Decimal NOT NULL,
      price: Decimal NOT NULL 
   }
   ```
* name is unique and indexed.
* Though constraints ar not implemented in assessment due to time constrains and make it simple.

## *orders* Collection
* Each order will be stored in a separate document.
* Here is how items schema looks -
* ```
   {
      _id: ObjectId,
      items: [
        {
          name: String,
          quantity: Number,
          tax: Decimal,
          price: Decimal 
        }
      ],
      totalAmount: Decimal,
      totalTax: Decimal
   }
   ```
* items is array of objects, holding item details. 
* The reason item details are copied here - item price, tax and name can change over a time. So for reference and to avoid join while fetching order details.



