import express from "express";
import {
  check,
  
} from "../controllers/products/products.js";
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
router.get("/add", check);

// router.post("/delete", deleteProduct);

// router.post("/update", updateProduct);

export default router;