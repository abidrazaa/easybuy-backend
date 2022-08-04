import express from "express";
import {
  check,
  addProduct
  
} from "../controllers/products/products.js";

// import {
//     login,
//     register
// } from "../controllers/auth/auth.js"
import multer from "multer";

const router = express.Router();
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

// router.post("/view", viewProductSingle);

// router.post("/view/list", viewProductList);

// router.post("/add", upload.single("image"), addProduct);
router.post("/add", addProduct);

// router.post("/delete", deleteProduct);

// router.post("/update", updateProduct);


// AUTH
// router.post('/register', register);
// router.post("/login", login)


// User Routes
// router.post("/update-user", updateUser)
// router.get("/user", userById)
// router.get("/delete-user", deleteUser)
// router.post("/reset-password", resetPassword)


// // Products
// router.post("/product", [isAdmin], addProduct)
// router.get("/products", getAllProducts)
// router.post("/update-product", [isAdmin], updateProduct)
// router.get("/delete-product", [isAdmin], deleteProduct)


// // ADMIN
// router.get("/dashboard",[isAdmin],dashboardData)




export default router;