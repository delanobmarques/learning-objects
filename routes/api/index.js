var express = require('express');
var router = express.Router();

//define endpoints OR more routers
var lObjectsRouter = require('./lObjects');
router.use('/lObjects', lObjectsRouter);

var usersRouter = require('./users');
router.use('/users', usersRouter);

//define endpoints
router.get('/', (req, res) => {
    res.send('Welcome to the Learning Objects API!!!');
});

module.exports = router;