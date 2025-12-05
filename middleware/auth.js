const jwt = require('jsonwebtoken');
const {SECRET}= require('../utils/config');

const auth ={
    verifyToken:(req, res, next)=>{
     try{
        // geth the token from the request cookies
        const token = req.cookies.token;

        // if the token does not exist, return error
        if(!token){
            return res.status(400).send({message: 'Token not found'})
        }
        // verify the token
        try{
            const decoded = jwt.verify(token, SECRET);
            req.userId = decoded.id;
            next();
        }catch(error){
            res.status(400).send({message: 'Invalid token'})
        }
     }catch(error){
        res.send({message:error.message})
     }  
    }
}
module.exports = auth;