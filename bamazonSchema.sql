DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10, 2),
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wheaties", "food/drink", 3.79, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sauce Pan", "kitchen", 19.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Frying Pan", "kitchen", 21.99, 178);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Captain Crunch", "food/drink", 3.29, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paper Towels", "essentials", 4.29, 115);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Roll", "essentials", 6.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Twinkies", "food/drink", 3.89, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dishwasher Tabs", "essentials", 11.99, 109);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spatula", "kitchen", 1.79, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lucky Charms", "food/drink", 2.99, 100);