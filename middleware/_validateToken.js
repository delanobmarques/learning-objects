const jwt = require('jsonwebtoken'); 
const dotenv = require("dotenv");

// get config vars
dotenv.config();

function validateToken(req, res, next) {
    //get auth header value
    const bearerHeader = req.headers['x-auth-token'];

    console.log(req.header('x-auth-token'));

    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //calling the next middleware
        next();
    }else{
        res.status(403).send('Token Validation Failed');
    }
}        



module.exports = validateToken