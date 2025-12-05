//import express
const express=require('express');
const logger = require('./utils/logger')
const unknownEndpoint=require('./utils/Error');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const taskRouter= require('./routes/taskRoutes');

// create an express app
const app=express();
app.use(cors({
   origin: ["http://localhost:5173", "https://todofrnt.netlify.app/"],
   credentials: true
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/api/v2/users', userRouter);
app.use('/api/v2/tasks', taskRouter);
app.use(unknownEndpoint);
// export the app
module.exports=app;