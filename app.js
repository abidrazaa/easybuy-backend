
const express = require('express')
const app = express();
const port = process.env.PORT;
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var path = require('path');
var cors = require('cors')

// To access public folder
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

// Set up Global configuration access
dotenv.config();

// MULTER
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    let uploadFile = file.originalname.split('.')
    let name = `${uploadFile[0]}-${Date.now()}.${uploadFile[uploadFile.length-1]}`
    cb(null, name)
  }
})
const upload = multer({ storage: storage })

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