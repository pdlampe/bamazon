
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
    ])



}



function runManagerAPP() {

    promptManager();
}

runManagerAPP();