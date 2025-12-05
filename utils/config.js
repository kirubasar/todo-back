require('dotenv').config();
const todo=process.env.TODO_URI;
const SECRET=process.env.JWT_SECRET;

module.exports={
    todo,
    SECRET
};