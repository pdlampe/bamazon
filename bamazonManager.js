
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user: 'root',

    password: 'SourPablo1985!!',
    database: 'bamazon'
});

function promptManager() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Please select an option:',
            choices: ['View products for sale', 'View low inventory', 'Add to Inventory', 'Add New Product'],
            filter: function (selection) {
                if (selection === 'View products for sale') {
                    return 'sale';
                } else if (selection === 'View low inventory') {
                    return 'lowInventory';
                } else if (selection === 'Add to inventory') {
                    return 'addInventory';
                } else if (selection === 'Add new product') {
                    return 'newProduct';
                } else {
                    console.log('ERROR: Unsupported operation!');
                    exit(1);
                }
            }

        }
    ]).then(function (input) {
        if (input.option === 'sale') {
            showInventory();
        }
        else if (input.option === 'lowInventory') {
            showLowInventory();
        }
        else if (input.option === 'addInventory') {
            addInventory();
        } else if (input.option === 'newProduct') {
            createNewProduct();
        }
        else {
            console.log('ERROR!');
            exit(1);
        }
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
            storeInfo += 'Price: $' + data[i].price + '  //  ';
            storeInfo += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(storeInfo);
        }

        console.log("---------------------------------------------------------------------\n");

        connection.end();
    })
}

function showLowInventory() {

    queryStore = 'SELECT * FROM products WHERE stock_quantity < 5';

    connection.query(queryStore, function (err, data) {
        if (err) throw err;

        console.log('Low Inventory Items (below 5): ');
        console.log('................................\n');

        var storeInfo = '';
        for (var i = 0; i < data.length; i++) {
            storeInfo = '';
            storeInfo += 'Item ID: ' + data[i].item_id + '  //  ';
            storeInfo += 'Product Name: ' + data[i].product_name + '  //  ';
            storeInfo += 'Department: ' + data[i].department_name + '  //  ';
            storeInfo += 'Price: $' + data[i].price + '  //  ';
            storeInfo += 'Quantity: ' + data[i].stock_quantity + '\n';

            console.log(storeInfo);
        }

        connection.end();
    })
}

function validateInteger(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);
    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'Please enter a whole number.';
    }
}

function validateNumeric(value) {

    var number = (typeof parseFloat(value)) === 'number';
    var positive = parseFloat(value) > 0;

    if (number && positive) {
        return true;
    } else {
        return 'Please enter a positive number for the unit price.'
    }
}


function addInventory() {

    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID.',
            validate: validateInteger,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'Please provide a quantity for this product',
            validate: validateInteger,
            filter: Number
        }
    ]).then(function (input) {


        var item = input.item_id;
        var increaseQuantity = input.quantity;


        var queryStore = 'SELECT * FROM products WHERE ?';

        connection.query(queryStore, { item_id: item }, function (err, data) {
            if (err) throw err;

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
                addInventory();

            } else {
                var productInfo = data[0];

                console.log('Updating Inventory...');

                var updatequeryStore = 'UPDATE products SET stock_quantity = ' + (productInfo.stock_quantity + increaseQuantity) + ' WHERE item_id = ' + item;

                connection.query(updatequeryStore, function (err, data) {
                    if (err) throw err;

                    console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productInfo.stock_quantity + increaseQuantity) + '.');
                    console.log("\n---------------------------------------------------------------------\n");
                    connection.end();
                })
            }
        })
    })
}
function createNewProduct() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'product_name',
            message: 'Please enter a new product name.',
        },
        {
            type: 'input',
            name: 'department_name',
            message: 'Please identify an appropriate department for your product.',
        },
        {
            type: 'input',
            name: 'price',
            message: 'Please provide unit price.',
            validate: validateNumeric
        },
        {
            type: 'input',
            name: 'stock_quantity',
            message: 'How many items are available?',
            validate: validateInteger
        }
    ]).then(function (input) {
        console.log('Adding New Item: \n    product_name = ' + input.product_name + '\n' +
            '    department_name = ' + input.department_name + '\n' +
            '    price = ' + input.price + '\n' +
            '    stock_quantity = ' + input.stock_quantity);
        var queryStore = 'INSERT INTO products SET ?';
        connection.query(queryStore, input, function (error, results, fields) {
            if (error) throw error;
            console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
            console.log("\n---------------------------------------------------------------------\n");
            connection.end();
        });
    })
}
function runManagerAPP() {
    promptManager();
}
runManagerAPP();