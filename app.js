import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {dbConnection} from "./config/database.js"
 
// import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(express.json());
app.use(express.static(__dirname + "/public/uploads"));
// app.use("/user", userRoute);
app.use("/product", productRoute);

dbConnection()

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});

import {register, login} from "./controllers/auth/auth.js"





// AUTH
app.post('/register', register);
app.post("/login", login)












