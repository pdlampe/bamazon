DROP DATABASE IF EXISTS bamazon;
DROP database bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(200) NOT NULL,
    department_name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('Town and Country Plates', 'Kitchen', 24.99, 6),
('Dry Erase Board', 'Office Products', 89.99, 4),
('iPad', 'Electronics', 499.99, 30),
('Nike Running Shoes', 'Apparel', 129.95, 18),
('Bluetooth Wireless Headphones', 'Electronics', 49.99, 5),
('Picture Frame', 'Home Essentials', 19.99, 10),
('Town and Country Drinking Glasses', 'Kitchen', 9.99, 20),
('Gold Rimmed Glass Tealight Candleholders Set of 3', 'Home Essentials', 17.99, 10),
('JBL Bluetooth Speaker', 'Electronics', 99.99, 5),
('SOHO High-Back Executive Chair', 'Office Products', 359.99, 60);

SELECT * FROM products;

