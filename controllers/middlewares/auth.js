import jsonwebtoken from "jsonwebtoken"
import userModel from "../../models/user.js"


export const isAdmin = async (req, res, next) => {

    const {email} = req.body;
    // receiving token from the header
    let token = req.headers["x-auth-token"] || req.body.token || req.query.token;

    if(token){
        // decode token with TOKEN key to extract the user
        const decoded = jsonwebtoken.verify(token,process.env.TOKEN_KEY)

        // saving the current user in req.user
        req.user = decoded

        // checking if the logged in user is ADMIN or not
        const user = await userModel.findOne({_id : decoded?._id, userType : "ADMIN"})
            .select("-password")

        if(!user){
            // if not admin
            return res.send("Insufficient User Permissions")
        }

        // if admin, pass to the next function call
        return next()
    }
    else{
        return res.status(400).json({ msg: "No Auth Token Found", err: "No Auth Token Found" });
    }
}


export const checkAuth = async (req, res, next) => {
    try{

        let token = req.headers["x-auth-token"] || req.body.token || req.query.token;

        if(token){
            const decoded = jsonwebtoken.verify(token,process.env.TOKEN_KEY)
            req.user = decoded

            const user = await userModel.findOne({_id : decoded?._id})
                .select("-password")

            if(!user){
                return res.send("Authentication failed")
            }
            return next()
        }
        else{
            return res.status(400).json({ msg: "No Auth Token Found", err: "No Auth Token Found" });
        }

    }catch(error){

    }
}