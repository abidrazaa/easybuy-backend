import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name : String,
    email : {type : String, required : true, unique : true},
    userType : String,
    password : String,
    token : String,
    cart : [{productId : {type: mongoose.Schema.Types.ObjectId, ref : "product"}, quantity : Number}]

},{timestamps: true})

export default mongoose.model('user',userSchema)