const express = require('express');
const userController=require('../controllers/userController');
const auth = require('../middleware/auth');
const userRouter = express.Router();

//add routes
userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout',auth.verifyToken, userController.logout);
userRouter.get('/profile', auth.verifyToken,userController.getProfile);
userRouter.put('/profile', auth.verifyToken, userController.updateProfile);
userRouter.delete('/profile', auth.verifyToken, userController.deleteProfile);

// export the router
module.exports=userRouter;