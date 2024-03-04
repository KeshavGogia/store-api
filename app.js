const express =require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require('dotenv/config');


const productsRouter = require("./routes/products");
const orderRouter = require("./routes/orders");
const userRouter = require("./routes/user");

mongoose.connect(process.env.MONGODB_KEY)
.then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});


app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// Cors
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH,DELETE')
        res.status(200).json({})
    }
    next();
})

app.use('/products', productsRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next) => {
    res.status(error.status || 500).json({
        error : {
            message : error.message
        }
    });
});

module.exports = app;