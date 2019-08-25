# bamazon


This project was created during week 12 of University of Kansas Coding Bootcamp. The goal of this project is to create an Amazon-like storefront using MySQL and Node.js. 

### Bamazon Demo

You can download and watch the demo of the bamazon customer and manager interfaces at the link below. 

[bamazon Demo](https://drive.google.com/file/d/1ogRAV1fNuUxI6Sk4AVaNcsYkssrS80hE/view)

### What Each JavaScript Application Does

1. `bamazonCustomer.js`

    * Shows a list of the products in the store.

    * Prompts customer to choose a product in the store based on the ID. 

    * The application asks the user for a quantity. 

      * If there is a sufficient amount of the product in stock, the app will return the total for that purchase.
      * If there is not enough of the product in stock, the app will tell the user that there isn't enough of the product.
      * If the purchase is processed, the application updates the stock quantity in the MySQL database to reflect the purchase.

-----------------------

2. `bamazonManager.js`

    * The manager application presents a list of four options (see below):
        * View products for sale
        * View low inventory
        * Add to inventory
        * Add new product

    * If the manager selects `View products for sale`, the app lists all of the products in the store including all of their details.

    * If the manager selects `View low inventory`, the app will list all items with an inventory count lower than five.

    * If the manager selects `Add to inventory`, the app should display a prompt that will let the manager "add more" of any item currently in the store.

    * If the manager selects `Add new product`, it allows the manager to add a new product to the store.

-----------------------


## Built With

* MySQLWorkbench
* Terminal
* Visual Studio Code

## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MySQL NPM Package (https://www.npmjs.com/package/mysql)


### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
- Create a MYSQL database called 'bamazon'.
```

## Authors

* **Paul David Lampe** - [Paul David Lampe](https://github.com/pdlampe)