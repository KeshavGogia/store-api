const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv/config') 

exports.user_signup = (req,res,next)=> {

    User.find({email : req.body.email})
        .then(user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message : "Email already exists"
                })
            }
            else{
                bcrypt.hash(req.body.password, 10 ,(err,hash)=>{
                        if(err){
                            return res.status(500).json({
                                error : err
                            });
                        }else{
                            const user = new User({
                            _id : new mongoose.Types.ObjectId(),
                            email : req.body.email,
                            password : hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message : "User Created"
                                })
                            })
                            .catch(err =>{
                                console.log(err);
                                res.status(500).json({
                                    error : err
                                })
                            })
                        }
                    })
            }
        })  
}

exports.user_login = (req,res,next)=>{
    User.find({email : req.body.email})
        .then(user => {
            if(user.length <1){
                return res.status(401).json({
                    message : "Auth Failed"
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if(err){
                    return res.status(401).json({
                        message : "Auth Failed"
                    });
                }
                if(result){
                    const token = jwt.sign(
                        {
                            email : user[0].email,
                            userId : user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn : "1h"
                        }
                    )
                    return res.status(200).json({
                        message : "Auth Successful",
                        token : token
                    });
                }
                res.status(401).json({
                    message : "Auth Failed"
                });
            } )
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error : err
            })
        });
}

exports.user_delete = (req,res,next)=>{
    User.deleteOne({_id : req.params.userId})
        .then(result => {
            res.status(200).json({
                message : "User Deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(400).json({
                error : err
            })
        });
}