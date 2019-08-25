
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
            filer: function (selection) {
                if (selection === 'View products for sale') {
                    return 'sale';
                } else if (val === 'View low inventory') {
                    return 'lowInventory';
                } else if (val === 'Add to inventory') {
                    return 'addInventory';
                } else if (val === 'Add new product') {
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
            dispalyLowInventory();
        }
        else if (input.option === 'addInventory') {
            addInventory();
        } else if (input.option === 'newProduct') {
            createNewProduct();
        }
        else {
            console.log('ERROR: Unsupported operation!');
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


function runManagerAPP() {

    promptManager();
}

runManagerAPP();