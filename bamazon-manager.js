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
  runSearch();
});
//Function to read all products
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

          connection.end();
  });
}
//Main prompt function
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "List all products",
        "View low inventory",
        "Add to inventory",
        "Add new product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "List all products":
          readProducts();
          break;

        case "View low inventory":
          readLow();
          break;

        case "Add to inventory":
          addInventory();
          break;

        case "Add new product":
          addProduct();
          break;
      }
    });
}
//Function to read low inventory (less than 100 remaining)
function readLow(){

  connection.query("SELECT * FROM products", function(err, res) {
      console.log("Low Inventory items".cyan);
      console.log("-----------------------------------------------------------------------------".blue);
            for (var i = 0; i < res.length; i++) {
              if(res[i].stock_quantity <100){
      console.log("Item ID: ".yellow +res[i].item_id + " |Product: ".yellow + res[i].product_name + " |Dept: ".yellow + res[i].department_name + " |Price: ".yellow + res[i].price + " |Qty: ".yellow + res[i].stock_quantity);
      console.log("-----------------------------------------------------------------------------".blue);
    }
    }
    if (err) throw err;
          connection.end();

  });

}
//Fucntion to add a new product
function addProduct() {
  console.log("Inserting a new product...\n");

inquirer
    .prompt([
      {
        name: "newItem",
        type: "input",
        message: "What is the name of the new Product"
      },
      {
        name: "newDept",
        type: "input",
        message: "What is the department of the new Item"
      },
            {
        name: "newPrice",
        type: "input",
        message: "What is the price of the new Item"
      },
      {
        name: "newQty",
        type: "input",
        message: "What is the quantity of the new Item"
      },


    ])
    .then(function(answer) {


  var query = connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: answer.newItem,
      department_name: answer.newDept,
      price: answer.newPrice,
      stock_quantity: answer.newQty
    },
    function(err, res) {
      console.log(answer.newItem + " has been inserted!\n");
          connection.end();
});
    }
  );

}

//Function to add numbers to inventory
function addInventory() {
  // prompt for info about the item being updated.

  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the ID of the item ?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like to add?"
      },

    ])
    .then(function(answer) {
      // when finished use the inputs to service the request
// Pull the line item identified by the item_id
  var query = connection.query("SELECT * FROM products WHERE item_id=?", [answer.item], function(err, res) {

      var currentStock= res[0].stock_quantity;
      var addQty= answer.quantity;
      var newQty = currentStock + parseInt(addQty);
//Calculate new stock quantity


  
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
        console.log(addQty + " units of " + res[0].product_name + " have been added. Your new stock quantity is "+ newQty+ "\n");

  });

    });
}




