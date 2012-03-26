var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Users = function()
{
    var userSchema = new Schema({
        name      : { type: String, required: true }
      , email     : { type: String, unique: true }
      , password  : { type: String }
      , createdOn : { type: Date, default: Date.now }
    });
    return mongoose.model('Users', userSchema);
};

exports.Users = Users();