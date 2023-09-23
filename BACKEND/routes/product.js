const express = require('express');
const {requireSignIn, isAdmin}=require('../Middleware/Authmiddleware');
const formidable = require("express-formidable");
const {createProductController, getallproductcontroller, getsingleproductcontroller, productPhotoController
    , updateproductcontroller, productFiltersController
    , productcountController,deleteProductController,
     productlistController,productsearchController,getSimilarProduct,braintreeTokenController,brainTreePaymentController} = require("../controller/productController")

//router object;
const router = express.Router();

//routing endpoints;
//1 router || create ;
router.post("/create-product",  requireSignIn,  isAdmin, formidable(),  createProductController);

//2 router || router.get("/getall-product",getallproductcontroller);
 ;
router.get("/getall-product",getallproductcontroller);

//3 router || getsingle ;
router.get("/getsingle-product/:slug",getsingleproductcontroller);

//4 router || getsingle ;
router.get("/product-photo/:id",productPhotoController);

//5 router || getsingle ;
router.put("/update-product/:id",requireSignIn,isAdmin,formidable(),updateproductcontroller);

//6 router || delete products ;
router.delete("/delete-product/:id",deleteProductController);

//7 router || filters ;
router.post("/product-filters",productFiltersController);

//8 router || count products ;
router.get("/product-count",productcountController);

//9 router || listed products ;
router.get("/product-list/:page",productlistController);

//10 router || search products ;
router.get("/search/:keyword",productsearchController);

//11 router || similar products ;
router.get("/related-product/:pid/:cid",getSimilarProduct);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);





module.exports=router;