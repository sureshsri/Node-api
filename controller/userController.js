const User= require('../model/UserSchema');
const bcrypt = require('bcrypt')
const jsonWebToken= require('jsonwebtoken');

const signup = async (req,res)=>{
    User.findOne({username:req.body.username}).then(result=>{
        console.log(req.body);
        console.log(result);
        if(result==null){
            //add new record
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if(err){
                    return  res.status(500).json({message:'something went wrong'+ err});
                }
               const user = new User({
                username:req.body.username,
                fullName:req.body.fullName,
                password:hash
               });
               user.save().then(savedData=>{
                res.status(201).json({message:'User was saved!'});
               }).catch(error=>{
                res.status(500).json(error);
               })
            });
        }else{
            res.status(409).json({message:'email alredy exist !'});
        }
    }).catch(error=>{
        res.status(500).json(error);
    });
};




const login = async (req,res)=>{
    User.findOne({username:req.body.username}).then(selectedUser=>{
        if(selectedUser==null){
           return res.status(404).json({status:false,message:'username not found'});
        }else{
            bcrypt.compare(req.body.password, selectedUser.password, function(err, result) {
                if(err){
                    console.log(err);
                    return res.status(500).json(err);
                }
                if(result){
                    const expiresIn = 36000;
                   const token = jsonWebToken.sign({'email':selectedUser.username},process.env.SECRET_KEY,{expiresIn});
                   res.setHeader('Autherization',`Bearer ${token}`)

                    return res.status(200).json({token:token});
                }else{
                    return res.status(401).json({message:'Incorrect password'});
                }
            });
        }
    }).catch(error=>{
        console.log(error);
        res.status(500).json(error);
    });
};



module.exports={
    signup,
    login
}