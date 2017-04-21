var mysql = require("mysql");
var inquirer = require("inquirer");

// creates the connection to mySQL
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "",
    database: "bamazon"
});

// shows the connection to the database. 
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as ID " + connection.threadId);
    promptUser();

})



// Creates the prompts
function promptUser(res) {
    inquirer.prompt([{
        name: "id",
        message: "What is the id of the product you would like to buy?"
    }, {
        name: "quantity",
        message: "How many would you like to buy?"
    }]).then(function(res) {
        var itemId = res.id;
        var customerAmount = res.quantity;
        getItem(itemId, customerAmount);

    });
}


// function updateItem (items){
// // // to grab the specific item to update
// for (var i = 0; i < results.length; i++) {
//         if (items[i].id === customer.ID && customerAmount > items.stock_quantity) {

//     connection.query(stock_quantity[i]-customerAmount);
//         }
//       }
//  }

function getItem(itemId, customerAmount) {

    connection.query("SELECT * FROM products where id=?", [itemId], function(err, res) {

                if (err) {
                    console.log("try again!")
                }
                // data is available 

                if (quantity < customerAmount) {
                    var quantity = res[0].stock_quantity;
                    var newQuantity = (quantity - customerAmount);
                    console.log("we do not have enough inventory, try again!");
                } else {


                    connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newQuantity }], function(err, res) {
                                console.log("your purchase has been made")
                            }
                            )
                        
