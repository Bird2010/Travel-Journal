const router = require('express').Router(); //this is a route we are creating

let location = require('../models/location.model'); //mongoose model we created

//first endpoint handles http get requests
//root is localhost:5000 then 
router.route('/').get((req,res) => {
    location.find()
    .then(locations => res.json(locations))
    .catch(err=> res.status(400).json('Error: '+err));
});

//handle post requests. New user name is part of the request body
//new user saved with save method
router.route('/add').post((req,res) => {
    const username = req.body.username;
    const place = req.body.place;
    const description = req.body.description;
    const rating = req.body.rating;
    const latitude = Number(req.body.latitude);
    const longitude = Number(req.body.longitude);

    const newlocation = new location( {
        username, 
        place,
        description, 
        rating,
        latitude, longitude
    });

    newlocation.save()
    .then(() =>res.json('location added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/:id').get((req,res) => { //:id is an object id created automatically by mongodb locations/objectid from database then get info about just that location
    location.findById(req.params.id) //getting id directly from the url and finding then return it as json
    .then(location=> res.json(location))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => { //same but delete request with object id
    location.findByIdAndDelete(req.params.id)
    .then(location=> res.json('location deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => { //if route /location/update/id then update the location
    location.findById(req.params.id)
    .then(location=> {
        location.username = req.body.username;
        location.place = req.body.place;
        location.description = req.body.description;
        location.rating = req.body.rating;
        location.latitude = Number(req.body.latitude);
        location.longitude = Number(req.body.longitude);

        location.save()
        .then(() => res.json('location Updated!'))
        .catch(err => res.status(400).json('Error: '+err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
