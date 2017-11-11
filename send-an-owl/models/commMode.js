var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommMode = new Schema(
  {
    title: {type: String, required: true, max: 100}
  }
);


//Export model
module.exports = mongoose.model('CommMode', CommMode);
