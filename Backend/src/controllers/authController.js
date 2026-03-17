const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req,res)=>{
try{

const {name,email,password} = req.body;

if(!name || !email || !password){
    return res.status(400).json({
        message:"All fields required"
    });
}

const userExists = await User.findOne({email});

if(userExists){
    return res.status(400).json({
        message:"User already exists"
    });
}

const hashedPassword = await bcrypt.hash(password,10);

const user = await User.create({
    name,
    email,
    password:hashedPassword
});

res.status(201).json({
    message:"User registered successfully"
});

}catch(error){
res.status(500).json({message:error.message});
}
};




// LOGIN
exports.login = async (req,res)=>{
try{

const {email,password} = req.body;

const user = await User.findOne({email});

if(!user){
    return res.status(400).json({
        message:"Invalid credentials"
    });
}

const isMatch = await bcrypt.compare(password,user.password);

if(!isMatch){
    return res.status(400).json({
        message:"Invalid credentials"
    });
}

const token = jwt.sign(
    {id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
);

 res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000
});

res.json({
    message:"Login successful"
});

}catch(error){
res.status(500).json({message:error.message});
}
};




// LOGOUT
exports.logout = (req,res)=>{
res.clearCookie("token");
res.json({message:"Logged out"});
};