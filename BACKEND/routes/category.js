const express = require('express');
const { createCategoryController,updateCategoryController,categoryControlller,singleCategoryController,deleteCategoryCOntroller } = require('../controller/categoryController');
const { requireSignIn, isAdmin } = require('../Middleware/Authmiddleware');


//router object;
const router = express.Router();


//routing endpoints;
//1 router || createCategoryController ;
router.post("/create-category" , requireSignIn , isAdmin , createCategoryController);

//2 router || updateCategoryController ;
router.put("/update-category/:id" , requireSignIn , isAdmin , updateCategoryController);

//3 router || getallCategoryController ;
router.get("/getall-category" , categoryControlller);

//4 router || singleCategoryController ;
router.get("/single-category/:slug" , singleCategoryController);

//5 router || deleteCategoryController ;
router.delete("/delete-category/:id" , requireSignIn , isAdmin , deleteCategoryCOntroller);



module.exports=router;