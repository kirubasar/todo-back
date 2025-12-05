const User = require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {SECRET}=require('../utils/config');

const userController={
    register: async(req, res)=>{
        try{
            // get the user data from request body
            const{username, email, password}=req.body;
            // check if user already exists
            const user = await User.findOne({email});
            // if user exists, return error
            if(user){
                return res.status(400).send({message: 'User already exists'})
            }
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // create new user
            const newUser=new User({username, email, password:hashedPassword});
            // save user to database
            const savedUser= await newUser.save();
            // return the saved user
            res.status(201).send({message: 'User registered successfully'})
        }catch(error){
            res.send({message: error.message})
        }

    },
    login: async(req, res)=>{
        try{
            // get the login data from request body
            const{email, password}=req.body;
            // check if user exists in database
            const user= await User.findOne({email});
            if(!user){
                return res.status(400).send({message: 'User does not exist'});
            }
            // check if password is correct
            const isPasswordValid= await bcrypt.compare(password, user.password);
            // if password is incorrect, return error
            if(!isPasswordValid){
                return res.status(400).send({message: 'Invalid password'});
            }
            // generate jwt token
            const token = jwt.sign({id: user._id}, SECRET);
            // set a cookie with the token
            res.cookie('token', token,{
                httpOnly:true,
                sameSite: 'Lax',
                secure: false,
                expires: new Date(new Date().getTime() + 24 *60*60*1000)
            })
            // return the user
        res.status(200).send({message: 'Login successful', user: user})
        }catch(error){
            res.send({message: error.message})
        }
        
    },
    logout: async(req, res)=>{
        try{
            // get the user id from request object
            const userId= req.userId;
            // check if user id exists
            if(!userId){
                return res.status(400).send({message: 'User not logged in'});
            }
            // clear the cookie
            res.clearCookie('token');
            // return the user
            res.status(200).send({message: 'Logout successful'})
        }catch(error){
            res.send({message: error.message})
        }
    },
    // get the user profile
    getProfile: async(req, res)=>{
        try{
         // get the user id from request object
         const userId = req.userId;
         // find the user by id
         const userProfile  = await User.findById(userId);
         // if the user does not exist, return error
         if(!userProfile){
            return res.status(400).send({message: 'User not found'})
         } 
         // return the user profile
         res.status(200).send({message: 'User profile', user: userProfile})
        }catch(error){
            res.send({message: error.message})
        }
    },
    updateProfile: async(req,res)=>{
        try{
            // get the user id from request object
            const userId = req.userId;
            // get the data from request body
            const {username, email}=req.body;
            // find the user by id
            const user = await User.findById(userId);
            // if the user does not exist, return error
            if(!user){
                return res.status(400).send({message: 'User not found'})
            }
            // update the user data
            user.username = username || user.username;
            user.email=email || user.email;
            // save the updated user
            const updatedUser = await user.save();

            // generate new jwt after updating user
            const token= jwt.sign({id:updatedUser._id}, SECRET);

            // send updated cookie
            res.cookie('token',token, {
                httpOnly:true,
                sameSite:"Lax",
                secure:false,
                expires:new Date(Date.now() + 24 * 60 * 60 * 1000 )
            })
            // return the updated user
            res.status(200).send({message: 'User profile updated successfully', user:updatedUser})
        }catch(error){
            res.send({message:error.message})
        }
    },
    deleteProfile: async(req, res)=>{
        try{
            // get the user id from request object
            const userId=req.userId;
            // find the user by id and delete
            const deletedUser= await User.findByIdAndDelete(userId);
            // if the user does not exist, return error
            if(!deletedUser){
                return res.status(400).send({message: 'User not found'})
            }
            // return deleted user
            res.status(200).send({message: 'User deleted successfully', user: deletedUser})
        }catch(error){
            res.send({message:error.message})
        }
    }
}
module.exports=userController;