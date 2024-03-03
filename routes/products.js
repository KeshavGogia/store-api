const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const multer = require('multer');
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, './uploads/')
    },
    filename : function(req,file,cb){
        cb(null, new Date().toISOString()+ file.originalname)
    }
})
const fileFilter = function(req,file,cb){
    if(file.mimetype === 'image/jpeg'||file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const upload = multer({storage: storage,limits:{
    fileSize : 1024 * 1024 *5
},
    fileFilter : fileFilter
});

const Product = require("../model/products");
const ProductsController = require("../controllers/products");

router.get('/',ProductsController.product_get_all);

router.post('/',checkAuth,upload.single('productImage'),ProductsController.product_create);

router.get('/:productId', ProductsController.product_get_by_id);

router.patch('/:productId',checkAuth, ProductsController.product_update_by_id);

router.delete('/:productId',checkAuth, ProductsController.product_delete_by_id);

module.exports = router;