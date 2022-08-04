import mongoose from "mongoose"

const productSchema = mongoose.Schema({

    title : String,
    sku : {type : String},
    price : Number,
    image : String,
    description : String,
    category : String,
    quantity : Number

}, { timestamps : true })

export default mongoose.model("product", productSchema)