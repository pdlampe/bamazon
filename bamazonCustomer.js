
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',

    password: 'SourPablo1985!!',
    database: 'Bamazon'
});

function validateInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole number.';
    }
}

function promptPurchase() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: validateInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: validateInput,
            filter: Number
        }
    ]).then(function (input) {


        var item = input.item_id;
        var quantity = input.quantity;


        var queryStore = 'SELECT * FROM products WHERE ?';

        connection.query(queryStore, { item_id: item }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data attay will be empty
            // console.log('data = ' + JSON.stringify(data));

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            } else {
                var productData = data[0];

                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the product you requested is in stock! Placing order!');


                    var updateQueryStore = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    connection.query(updateQueryStore, function (err, data) {
                        if (err) throw err;

                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        connection.end();
                    })
                } else {
                    console.log('Sorry, there is not enough product in stock, your order can not be placed as is.');
                    console.log('Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}

function showInventory() {

    queryStore = 'SELECT * FROM products';

    connection.query(queryStore, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var storeInfo = '';
        for (var i = 0; i < data.length; i++) {
            storeInfo = '';
            storeInfo += 'Item ID: ' + data[i].item_id + '  //  ';
            storeInfo += 'Product Name: ' + data[i].product_name + '  //  ';
            storeInfo += 'Department: ' + data[i].department_name + '  //  ';
            storeInfo += 'Price: $' + data[i].price + '\n';

            console.log(storeInfo);
        }

        console.log("---------------------------------------------------------------------\n");
        promptPurchase();
    })
}
function runAPP() {

    showInventory();
}

runAPP();