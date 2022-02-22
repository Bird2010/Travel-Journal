const express = require('express');
const cors = require('cors');  // CORS = Cross Origin Resource Sharing
const mongoose = require("mongoose");  // Mongoose - easy way to connect to mongoDB

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req,res) {   
    res.send("Hello World"); 
});

const uri = "mongodb+srv://mongouser:devry123@cluster0.0xiiw.mongodb.net/travel?retryWrites=true&w=majority";

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb database connection established successfully");
});

const locationRouter= require('./routes/locations'); //if someone goes to /locations it will load everything in the locations router
const usersRouter = require('./routes/users');
app.use('/locations', locationRouter);
app.use('/users', usersRouter);

app.listen(3001, function() {
    console.log("Server started on port 3001");
});

