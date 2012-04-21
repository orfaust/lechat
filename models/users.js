var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    "default": true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

var model = exports.model = mongoose.model("Users", userSchema);

model.getUserById = function(id, callback) {
  model.findOne({_id:id}, function(err, userData) {
    if(err) {
      console.log(err);
      callback(false);
    } else {
      callback(userData);
    }
  });
};

model.getList = function(query, callback) {
  model.find(query, function(err, users) {
    if(err) {
      console.log(err);
      callback(false);
    } else {
      callback(data);
    }
  });
}

model.getUserByNickname = function(nickname, callback) {
  model.findOne({nickname: nickname}, function(err, userData) {
    if(err) {
      console.log(err);
      callback(false);
    } else {
      callback(userData);
    }
  });
};