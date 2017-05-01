const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

//connect to mongoDB
mongoose.connect('mongodb://localhost/drivergo');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

//must be added before the routes.
app.use(bodyParser.json());
//initilaize routes
app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
  //console.log(err);
  res.status(422).send({error: err.message});
});

//listen for requests
app.listen(process.env.port || 4000, function(){
  console.log("now listening at port 4000");
});
