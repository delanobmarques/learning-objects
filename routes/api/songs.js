var express = require('express');
var router = express.Router();
//linking to Song Model - Song is an object
var Song = require('../../models/song')

//define endpoints OR more routers

//GET all songs
router.get('/', (req, res) => {
    //return all song data from mongo
    Song.find({}, (err, songs) => {
        if(err) return res.status(400).send('Error')
        
        res.send(songs);
    })
});

//GET a specific song
router.get('/:id', (req, res) => {    
    //get a single song by id and return it
    Song.findById(req.params.id, (err, song) => {
        if(err) return res.status(404).send('Error');
        if(!song) return res.status(404).send('Resource Not found')
        res.send(song);
    })
})

//CREATE a song
router.post('/', (req, res) => {
    //create a song object based on the req.body
    const newSong = new Song(req.body);
    newSong.save ((err, newSong) => {
        if(err) {
            console.log(err);
            return res.status(400).send();
        }
        res.status(201).send(newSong)
    })
})

//UPDATE a song
router.patch('/:id', (req, res) => {
    //make sure it exists
    Song.findById(req.params.id, (error, song) => {
        if(!song) return res.status(404).send('Resource not found');
    
        Song.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
            if(err) return res.status(400).send('Error');
            res.status(200).send('Resource Updated');
        })
    })
});

//DELETE a song 
router.delete('/:id', (req, res) => {
    //make sure it exists
    Song.findById(req.params.id, (error, song) => {
        if(!song) return res.status(404).send('Resource not found');
    
        Song.findByIdAndDelete(req.params.id, (err, result) => {
            if(err) return res.status(400).send('Error');

            res.status(204).send();
        })
    })
});

module.exports = router;
