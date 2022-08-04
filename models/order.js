import mongoose from "mongoose"

const orderSchema = mongoose.Schema({

    user : {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    items : [{productId : {type: mongoose.Schema.Types.ObjectId, ref : "product"}, quantity : Number, price : Number}],
    amount : Number,
    discount : Number,
    shippingAddress : String,
    payment_type : {type : String, enum: ["cod","online"]}

}, { timestamps : true })

export default mongoose.model("order", orderSchema)