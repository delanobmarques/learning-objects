var express = require('express');
var router = express.Router();
//linking to Learning Objects Model - LearningObject is an object
var LearningObject = require('../../models/learning_objects')
const dotenv = require('dotenv'); //using the dotenv package to set environment variables
const verifyToken = require('../../middleware/verifyToken');

//initialize dotenv
dotenv.config();

//GET all learning objects
router.get('/', (req, res) => {
    //return all learning objects data from mongo
    
    LearningObject.find({}, (err, lobjects) => {
        if(err) return res.status(400).send('Error')
        
        res.send(lobjects);
    })
});

//GET a specific learning object by id
router.get('/:id', (req, res) => {    
    //get a single record id and return it
    LearningObject.findById(req.params.id, (err, lobject) => {
        if(err) return res.status(404).send('Error');
        if(!lobject) return res.status(404).send('Resource Not found')
        res.send(lobject);
    })
})

//GET a specific learning object by category
router.get('/search/:category', (req, res) => {    
    //get a single record id and return it
    console.log('API search by category...')
    LearningObject.find({"category": req.params.category}, (err, lobjects) => {
        if(err) return res.status(400).send('Error');

        if(!lobjects) return res.status(404).send('Resource Not found')
        console.log(lobjects)
        res.send(lobjects);
    })
})

//CREATE a new record - valid token needed
router.post('/',  (req, res) => { //router.post('/', validateToken, (req, res) => { //not invoking the function - telling the pipeline additional middlware functions to get throught
   
    //create a new object based on the req.body
    const newlObj = new LearningObject(req.body);
    newlObj.save ((err, newlObj) => {//validation occurs automatically on save
        if(err) {
            return res.status(400).send(err);
        }
        res.status(201).send('Resource created successfully')
    })    
})

//UPDATE a record - valid token needed
router.patch('/:id', verifyToken, (req, res) => { 

    let updateData = new LearningObject(req.body);

    //validate req.body
    let validationError = updateData.validateSync();//validation (Mongoose Model)

    if(validationError){//check if there is a validation error
        return res.status(404).send('Validation Error'); //sending message if validation error found 
    }

    //make sure it exists
    LearningObject.findById(req.params.id, (error, lobject) => {
        if(!lobject) return res.status(404).send('Resource not found');
    
        LearningObject.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
            if(err) return res.status(400).send('Error');
            res.status(200).send('Resource Updated');
        })
    })
});

//DELETE a record  - valid token needed
router.delete('/:id', verifyToken, (req, res) => {
    //make sure it exists
    LearningObject.findById(req.params.id, (error, lobject) => {
        if(!lobject) return res.status(404).send('Resource not found');
    
        LearningObject.findByIdAndDelete(req.params.id, (err, result) => {
            if(err) return res.status(400).send('Error');
            res.status(204).send('Resource deleted');
        })
    })
});

module.exports = router;
