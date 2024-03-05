const Product = require("../model/products");

exports.product_get_all = (req,res,next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count : docs.length,
                products : docs.map(doc => {
                    return {
                        name : doc.name,
                        price : doc.price,
                        productImage : doc.productImage,
                        _id : doc._id,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:8000/products'+doc._id
                        }
                    }
                })
            }
            res.status(200).json(response);     
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        })
}

exports.product_create = (req,res,next) => {
    const product = new Product({
        _id : new mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price,
        productImage : req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message : "Created Product",
                createdProduct  : {
                    name : result.name,
                    price : result.price,
                    _id : result._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:8000/products'+result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err}); 
        })
    
}

exports.product_get_by_id = (req,res,next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            console.log(doc);
            if(doc){
                res.status(200).json({
                    product : doc,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:8000/products'
                    }
                });
            }
            else{
                res.status(500).json({error : "No valid entry found"});
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err}); 
        })
}

exports.product_update_by_id = (req,res,next) => {
    const id = req.params.productId;
    const updateOp = {};
    for (const ops of req.body) {
        updateOp[ops.propName] = ops.value;
    }
    Product.updateOne({_id : id},{$set: updateOp})
        .exec()
        .then(result => {
            res.status(200).json({
                description : "Product Updated",
                request : {
                    type : 'GET',
                    url : 'http://localhost:8000/products'+id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error : err});
        });
}

exports.product_delete_by_id =  (req,res,next) => {
    const id = req.params.productId;
    Product.deleteOne({_id : id})
     .exec()
     .then(result => {
         res.status(200).json({
             message : "Product Deleted",
             request : {
                 type : "POST",
                 url : "http://localhost:8000/products",
                 body : {name : 'String' , price : 'Number'}
             }
         })
     })
     .catch(err => {
         console.log(err);
         res.status(500).json({error : err});
     });
 }