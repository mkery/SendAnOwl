var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FriendSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: String, required: true, max: 100},
    friend_title: {type: String, required: true, max: 100},
    contact_method: [{type: Schema.ObjectId, ref: 'CommMode'}]
  }
);


// Virtual for author's URL
FriendSchema
.virtual('url')
.get(function () {
  return '/friend/' + this._id;
});

//Export model
module.exports = mongoose.model('Friend', FriendSchema);
