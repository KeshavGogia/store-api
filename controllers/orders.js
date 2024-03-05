const Order = require("../model/order");

exports.orders_get_all = (req,res,next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product', 'name price _id')
        .then( docs => {
            res.status(200).json({
                count : docs.length,
                orders : docs.map(docs =>{
                    return{
                        _id : docs._id,
                        product : docs.product,
                        quantity : docs.quantity,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:8000/orders/'+docs._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error : err
            });
        });
}

exports.create_order = (req,res,next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if(!product){
                return res.status(404).json({message : "Product not found"})
            }
            const order = new Order({
                _id : new mongoose.Types.ObjectId(),
                quantity : req.body.quantity,
                product : req.body.productId
            })
            return order.save()
                .then(result => {
                    console.log(result);
                    res.status(200).json({
                        message : "Order Stored",
                        createdOrder : {
                            _id : result._id,
                            product : result.product,
                            quantity : result.quantity
                        },
                        request : {
                            type : 'GET',
                            url : "http://localhost:8000/orders/" + result._id
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error : err
                    })
                });
        })
        // .catch(err => {
        //     res.status(500).json({
        //         message : "Product not found",
        //         error : err
        //     })
        // });
    
}

exports.get_order_by_id = (req,res,next) => {
    Order.findById(req.params.orderId)
        .populate('product', 'name price _id')
        .then(order => {
            if(!order){
                return res.status(404).json({
                    message : "Order not found"
                })
            }
            res.status(200).json({
                order : order,
                request : {
                    type : 'GET',
                    url : 'http://localhost:8000/orders'
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message : "Order not found",
                error : err
            })
        })
}

exports.delete_order = (req,res,next) => {
    Order.deleteOne({_id : req.params.orderId})
     .then(order => {
         res.status(200).json({
             message : "Order Deleted",
             request : {
                 type : 'POST',
                 url : 'http://localhost:8000/orders',
                 body : {
                     productId : 'ID',
                     quantity : 'Number'
                 }
             }
         })
     })
     .catch(err => {
         res.status(500).json({
             message : "Order not found",
             error : err
         })
     });
 }