const{ todo } = require('./utils/config');
const app = require('./app');
const mongoose = require('mongoose');

//1. connect to the database
mongoose.connect(todo)
.then(()=>{
    console.log('Connected to MongoDB');
    //2. start the server
    app.listen(3002, ()=>{
        console.log('Server is runninng on port 3002 ');
    })
})
.catch(err => console.error('Could not connect to MonogoDB...', err))