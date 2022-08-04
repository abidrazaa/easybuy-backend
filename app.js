const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
 


const { register, login, updateUser, deleteUser, userById, resetPassword } = require("./controllers/auth/auth");
const {addProduct, updateProduct, deleteProduct, getAllProducts} = require("./controllers/products/products")
const {checkout, addToCart, cart, removeFromCart} = require("./controllers/user/cart")
const {isAdmin, checkAuth} = require("./controllers/middlewares/auth");
const { dashboardData } = require('./controllers/admin/dashboard');
const mongoose = require("./config/database")()









app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is runningggggg')
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
console.log(process.env.PORT)
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});