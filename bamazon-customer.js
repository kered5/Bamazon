var mysql = require("mysql");
var inquirer = require("inquirer");
var color = require("colors");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
//Call the function to read the list of available products
  readProducts();
});

function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
      console.log("Welcome to Bamazon Prime".blue.bgWhite);
      console.log("-----------------------------------------------------------------------------".blue);
            for (var i = 0; i < res.length; i++) {
      console.log("Item ID: ".yellow +res[i].item_id + " |Product: ".yellow + res[i].product_name + " |Dept: ".yellow + res[i].department_name + " |Price: ".yellow + res[i].price + " |Qty: ".yellow + res[i].stock_quantity);
      console.log("-----------------------------------------------------------------------------".blue);
    }
    if (err) throw err;

 start();
  });
}

function start() {
  // prompt for info about the item being purchased
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the ID of the item you would like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
      },

    ])
    .then(function(answer) {
      // when finished use the inputs to service the order
// Pull the line item identified by the item_id
  var query = connection.query("SELECT * FROM products WHERE item_id=?", [answer.item], function(err, res) {

      var currentStock= res[0].stock_quantity;
      var requestedQty= answer.quantity;
      var totalCost = requestedQty * res[0].price;
      var newQty = currentStock - requestedQty;
//If the requested quantiy is less than or equal to the quantity in stock...then process the order.
      if (requestedQty <= currentStock){
        console.log("Thank you for your order of " + requestedQty + " units of " + res[0].product_name + "\n");
        console.log("Your total for today is: $" + totalCost + "\n");
        console.log("Thank you for shopping with Bamazon");
  
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQty
      },
      {
        item_id: res[0].item_id
      }
    ],
    function(err, res) {
  connection.end();
      if (err) throw err;

    }

  );

      }
      else{
        console.log("Sorry, we don't have sufficient stock to fulfil that order");
          connection.end();
      }

  });

    });
}
