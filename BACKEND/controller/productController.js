const productModel = require("../models/productModel.js");
const orderModel = require('../models/orderModel.js')
const slugify = require("slugify");
const fs = require("fs");
const braintree = require("braintree");
const dotenv = require('dotenv');

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});


//create product
const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;
    //validation;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    if (!description) {
      return res.status(401).send({ message: "description is required" });
    }
    if (!price) {
      return res.status(401).send({ message: "price is required" });
    }
    if (!category) {
      return res.status(401).send({ message: "category is required" });
    }
    if (!quantity) {
      return res.status(401).send({ message: "quantity is required" });
    }
    if (!description) {
      return res.status(401).send({ message: "description is required" });
    }
    if (photo && photo.size > 1000000) {
      return res.status(401).send({ message: "photo size is less than 1mb" });
    }


    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all product
const getallproductcontroller = async (req, res) => {

  try {
    const products = await productModel.find({}).select("-photo").populate("category").limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "ALLProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting products",
    });
  }

};
//get single product;
const getsingleproductcontroller = async (req, res) => {

  try {
    const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category").limit(12).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in getting product",
    });
  }

};

//get photo product;
const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//get update-product
const updateproductcontroller = async (req, res) => {
  try {
    const { name, description, price, category, quantity } =
      req.fields;
    const { photo } = req.files;
    //validation;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    if (!description) {
      return res.status(401).send({ message: "description is required" });
    }
    if (!price) {
      return res.status(401).send({ message: "price is required" });
    }
    if (!category) {
      return res.status(401).send({ message: "category is required" });
    }
    if (!quantity) {
      return res.status(401).send({ message: "quantity is required" });
    }
    if (!description) {
      return res.status(401).send({ message: "description is required" });
    }
    if (photo && photo.size > 1000000) {
      return res.status(401).send({ message: "photo size is less than 1mb" });
    }
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }

};

//delete products
const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//get filter product;
const productFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};


//get count product;
const productcountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Products count",
      error,
    });
  }
};

//get listed product;
const productlistController = async (req, res) => {
  try {
    const perpage = 3;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel.find({}).select("-photo")
      .skip((page - 1) * perpage)
      .limit(perpage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Products list",
      error,
    });
  }
};

//search product
const productsearchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel.find({

      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ]

    }).select("-photo");
    res.json(result);

  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Products searching",
      error,
    });
  }
};


//getSimilarProduct
const getSimilarProduct = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const products = await productModel.find({

      category: cid,
      _id: { $ne: pid },

    }).select("-photo").limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in similar Products",
      error,
    });
  }
};

//payment gateway api
//token
 const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
 const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};




module.exports = {
  createProductController, getallproductcontroller
  , getsingleproductcontroller, productPhotoController, updateproductcontroller
  , productFiltersController, productcountController, deleteProductController,
  productlistController, productsearchController,getSimilarProduct,brainTreePaymentController
  ,braintreeTokenController
}