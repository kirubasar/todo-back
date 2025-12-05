const logger = (req, res, next)=>{
    console.log('Method:',req.method);
    console.log('Path:', req.path);
    console.log('Body:')
    console.log('Query:')
    console.log('Cookies:', req.cookies) 
    console.log('-----')
    next();
}
module.exports = logger;