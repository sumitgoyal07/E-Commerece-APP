const express = require('express');
const {registerController,logincontroller, testcontroller, forgotPasswordController,updateprofile,getOrdersController,
  getAllOrdersController,orderStatusController} = require('../controller/authController');
const {requireSignIn, isAdmin}=require('../Middleware/Authmiddleware');

//router object;
const router = express.Router();

//routing endpoints;
//1 router || regrister ;
router.post("/register" , registerController);

//2 router|| login;
router.post("/login" , logincontroller);

//2 router|| login;
router.post("/forgot-password" , forgotPasswordController);

//3 router|| testmiddleware;
router.get("/test" ,requireSignIn ,testcontroller);

//4 router|| private route;
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  //5 router|| adminprivate route;
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//6 router|| testmiddleware;
router.put("/profile" ,requireSignIn,updateprofile);

//7 orders
router.get("/orders", requireSignIn, getOrdersController);

//8 all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

//9 order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);





module.exports=router;