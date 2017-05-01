const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create geo loaction Schema
const GeoSchema = new Schema({
  type:{
    type:String,
    default:"Point"
  },
  coordinates:{
    type:[Number],
    index:"2dsphere"
  }
});

//create driver schema and model
const DriverSchema = new Schema({
  name:{
    type: String, required: [true, 'name field is required']
  },
  license:{
    type: String
  },
  available:{
    type: Boolean,
    default:false
  },
  //add in geo location
  geometry:GeoSchema
});

//The driver model which is based on the schema
const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
