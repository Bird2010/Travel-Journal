const router = require('express').Router(); //this is a route we are creating

let User = require('../models/user.model'); //mongoose model we created

//first endpoint handles http get requests
//root is localhost:5000 then /users if get request then this below is going to happen - get list of all users from mongodb
//find method returns a promise. Then res.json will return user in json format from database
router.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err=> res.status(400).json('Error: '+err));
});

//handle post requests. New user name is part of the request body
router.route('/add').post((req,res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
    .then(() =>res.json('User added!'))
    .catch(err => res.status(400).json('Error: '+err));
});

module.exports = router;
