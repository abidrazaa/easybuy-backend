import orderModel from "../../models/order.js"
import userModel from "../../models/user.js"
import productModel from "../../models/product.js"

export const dashboardData = async (req, res) => {

    try{

        // counts 
        const ordersCount = await orderModel.find().count()
        const usersCount = await userModel.find().count()
        const productsCount = await productModel.find().count()
        const categoriesCount = 5

        return res.json({
            success : true,
            message : "dashboard data",
            data : {
                ordersCount,
                usersCount,
                productsCount,
                categoriesCount
            }
        })

    }catch(error){
        res.send(error.message)
    }

}