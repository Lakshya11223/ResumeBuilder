import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

 const generateToken =(userid,res) =>{
    const token = jwt.sign({id:userid},process.env.JWT_SECRET,{expiresIn:'3d'});

    res.cookie("jwt",token,{
        httpOnly:true,
        maxAge:3*24*60*60*1000,//ms
        secure:false,
        sameSite:"strict",
       
        })

    return token;

}
export default generateToken;