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







// AUTH
app.post('/register', register);
app.post("/login", login)

// User Routes
app.post("/update-user", updateUser)
app.get("/user", userById)
app.get("/delete-user", deleteUser)
app.post("/reset-password", resetPassword)

// Products
app.post("/product", [isAdmin], addProduct)
app.get("/products", getAllProducts)
app.post("/update-product", [isAdmin], updateProduct)
app.get("/delete-product", [isAdmin], deleteProduct)

// CART
app.post("/checkout",[checkAuth],checkout)
app.post("/add-to-cart",[checkAuth],addToCart)
app.get("/cart",[checkAuth],cart)
app.get("/remove-from-cart",[checkAuth],removeFromCart)


// ADMIN
app.get("/dashboard",[isAdmin],dashboardData)

// HELPER
app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files is array of `photos` files

  try{
    let files = req.files;
    if(!files.length){
      return res.status(400).json({ err:'Please upload an image', msg:'Please upload an image' })
    }
    let file = req.files[0]
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        return res.send(file.filename) 
    }
  }catch(errror){
    return res.send(error.message)
  }
  
})



app.get('/', (req, res) => {
  res
    .status(200)
    .send('Hello server is running')
    .end();
});
 
// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});