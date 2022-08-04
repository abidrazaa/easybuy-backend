import mongoose from "mongoose"

export const dbConnection = () => {
    // mogoose.connect("mongodb://localhost/ecommerce")
    mongoose.connect("mongodb+srv://abidrazaa:Abcd1234@cluster0.lr2rk.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log('DB Connection Successfull'))
        .catch(err => console.log(err.message))
}