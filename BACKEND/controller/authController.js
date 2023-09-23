const userModel = require("../models/userModel.js");
const orderModel = require('../models/orderModel.js')
const JWT = require('jsonwebtoken');

//registrationcontroller;
const { comparePassword, hashPassword } = require("../helpers/authHelper.js");
 const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //validations
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(400).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await userModel.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    })

    res.status(200).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//forgetpasswordcontroller;
 const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};



//logincontroller;
const logincontroller=async(req,res)=>{
    
  try {
    
  
  const{email,password}=req.body;
  
  //validation;
  if (!email) {
    return res.send({ message: "Email is Required For Login" });
  }
  if (!password) {
    return res.send({ message: "Password is Required For Login" });
  }

  //check user;
  const user= await userModel.findOne({email});
  if(!user){
    return res.status(400).send({
      success: false,
      message: "Firstly Need Registeration",
    });
  }
  //compare password;
  const match= await comparePassword(password,user.password);
  if(!match){
    return res.status(401).send({
      success: false,
      message: "Incorrect Password , Try Again",
    });
  }

  //web token;
  const token = JWT.sign({_id : user._id} , process.env.JWT_SECRET);
  res.status(200).send({
    success: true,
    message: "Login Successfully",
    
    user:{
      name:user.name,
      email:user.email,
      phone:user.phone,
      address:user.address,
      role:user.role,
    },
    token
  });
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error in Login",
    error,
  });
}
};

//testcontroller;
const testcontroller= async(req,res)=>{
     
res.send("protected routes");
}

const updateprofile=async(req,res)=>{
try {
const{name,password,phone,address}=req.body;
const user = await userModel.findById(req.user._id);
if (password && password.length < 6) {
  return res.json({ error: "Passsword is required and 6 character long" });
}
const hashed =  password ? await hashPassword(password):undefined
  const updateprofile = await userModel.findByIdAndUpdate(req.user._id,{
    name:name || user.name,
    password:hashed || user.password,
    phone:phone || user.phone,
    address:address || user.address,
  },{new:true});
  res.status(200).send({
    success: true,
    message: "succefully update profile",
    updateprofile,
  });
  
} catch (error) {
  console.log(error);
  res.status(500).send({
    success: false,
    message: "Error in updating profile",
    error,
  });
}
};

 //orders
 const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//adminorders
const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });   
       res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting adminOrders",
      error,
    });
  }
};

//order status
 const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


module.exports={registerController,logincontroller,testcontroller,forgotPasswordController,updateprofile,getOrdersController,
  getAllOrdersController,orderStatusController}

