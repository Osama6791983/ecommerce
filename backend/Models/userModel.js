const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed more than 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true , "Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail , "Please Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true , "Please Enter Your Password"],
        minLength:[6,"Password should have more than 6 characters"],
        select:false
    },
    avatar:{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

},{timestamps:true});
//pre conditon
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    } 
    this.password = await bcrypt.hash(this.password,10);
})
//jwt token method

userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword =async function (password) {
    return await bcrypt.compare(password,this.password)
}
//creating password reset token
userSchema.methods.getResetPasswordToken = async function () {
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    //hash reset token and add to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000
    return resetToken
}
module.exports = mongoose.model("User",userSchema);