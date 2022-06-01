const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    //getting token sent in header 'x-auth-token'
    const token  = req.header('x-auth-token');

    console.log(token);
    //if the token is not present send status 401
    if(!token) return res.status(401).send('Access is Denied...');

    try{//if token found verify if it's valid
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;
        next();//continue to next endpoint
    }catch(err){
        res.status(400).send('Invalid Token...');//message sent in case of error
    }
}