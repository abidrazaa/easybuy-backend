import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {dbConnection} from "./config/database.js"
 
// import userRoute from "./routes/user.js";
// import productRoute from "./routes/product.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(express.json());
app.use(express.static(__dirname + "/public"));
// app.use("/user", userRoute);
// app.use("/product", productRoute);

dbConnection()



// import {register, login, updateUser, deleteUser, userById, resetPassword} from "./controllers/auth/auth.js"
// import {addProduct, getAllProducts, updateProduct, deleteProduct} from "./controllers/products/products.js"
// import {isAdmin, checkAuth} from "./controllers/middlewares/auth.js"
// import {dashboardData} from "./controllers/admin/dashboard.js"


// // AUTH
// app.post('/register', register);
// app.post("/login", login)


// // User Routes
// app.post("/update-user", updateUser)
// app.get("/user", userById)
// app.get("/delete-user", deleteUser)
// app.post("/reset-password", resetPassword)


// // Products
// app.post("/product", [isAdmin], addProduct)
// app.get("/products", getAllProducts)
// app.post("/update-product", [isAdmin], updateProduct)
// app.get("/delete-product", [isAdmin], deleteProduct)


// // ADMIN
// app.get("/dashboard",[isAdmin],dashboardData)








// MULTER
import multer from "multer";
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

app.get("/",(req, res) => {
  return res.send("Working")
})

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});






