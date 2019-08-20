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