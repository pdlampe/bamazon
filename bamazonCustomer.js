var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: '',
    database: 'bamazon'
});

function validateInput(value) {
    var integer = Number.isInteger(parseFloast(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    }
    else {
        return 'Please enter a whole number.';
    }
}

function promptUserPurchase() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the ID for the item you would like to purchase.',
            validate: validateInpute,
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
        var queryString = 'SELECT * FROM products WHERE ?';

        connection.query(queryString, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                displayInventory();

            }
            else {
                var productData = data[0];
                if (quantity <= productData.stock_quantity) {
                    console.log('Congratulations, the produce you ordered is still in stock! Placing order!');
                    var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    connection.query(updateQueryString, function (err, data) {
                        if (err) throw err;

                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                        console.log('Thank you for shopping with us!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    })

                }
                else {
                    console.log('Sorry, we do not have your product in stock. Your order can not be placed as is. ');
                    console.log('Please modify your order. ');
                    console.log("\n---------------------------------------------------------------------\n");

                    displayInventory();
                }
            }
        })
    })
}

function displayInventory() {

    queryString = 'SELECT * FROM products';
    connection.query(queryString, function (err, data) {
        if (err) throw err;

        console.log('Existing Inventory: ');
        console.log('...................\n');

        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id + '  //  ';
            strOut += 'Product Name: ' + data[i].product_name + '  //  ';
            strOut += 'Department: ' + data[i].department_name + '  //  ';
            strOut += 'Price: $' + data[i].price + '\n';

            console.log(strOut);
        }

        console.log("---------------------------------------------------------------------\n");


        promptUserPurchase();
    })
}

function runBamazon() {
    displayInventory();

}

runBamazon();