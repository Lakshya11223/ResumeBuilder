import {mongoose ,Schema} from 'mongoose'

const userSchemma = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        isverified:{
            type:Boolean,
        },
        otp:{
            type:String,
        },
        otpexpire:{
            type:Date,
        }

    },{
        timestamps:true,
    }
)

const User = mongoose.model("User",userSchemma);
export default User;