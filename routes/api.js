const express = require('express');
const router = express.Router();
const Driver = require('../models/driver')

//get a list of drivers from the DB
router.get('/drivers', function(req, res, next){
  /*Driver.find({}).then(function(drivers){
    res.send(drivers);
  });*/
  Driver.geoNear(
    {type:"Point", coordinates:[parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    {maxDistance:100000, spherical:true}
  ).then(function(drivers){
    res.send(drivers);
  });
});

//add a new driver to the DB
router.post('/drivers', function(req, res, next){
  Driver.create(req.body).then(function(driver){
    res.send(driver);
  }).catch(next);
});

//update a driver in the DB
router.put('/drivers/:id', function(req, res, next){
  Driver.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
    Driver.findOne({_id:req.params.id}).then(function(driver){
      res.send(driver);
    });
  });
});

//delete a driver from the DB
router.delete('/drivers/:id', function(req, res, next){
  Driver.findByIdAndRemove({_id: req.params.id}).then(function(driver){
    res.send(driver);
  });
});


module.exports = router;
