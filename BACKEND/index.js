const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/connectDB.js');
const auth = require("./routes/auth.js")
const category = require("./routes/category.js")
const product = require("./routes/product.js")

const cors =require('cors');

//rest app;
const app = express();

//env config;
dotenv.config();

//call connectdb;
connectDB();

//middlewares;
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes;
app.use("/api/v1/auth" , auth )
app.use("/api/v2/category" , category )
app.use("/api/v3/product" , product )



//rest api;
app.get("/",(req,res)=>{
    res.send("<h1>Welcome To E-Commerce App!!!</h1>");
});

//port;
const PORT=process.env.PORT

//app listen;
app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`)
})