const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  accessCode: {
    type: String,
    required: false
  },
  googleId: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  companyName: {
    type: String,
    required: false
  },
  sessionPath: {
    type: String
  },
  subscriptionType: {
    type: String
  },
  status: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    default: 'customer'
  },
  TOA: [String],
});

userSchema.plugin(passportLocalMongoose);

var User = module.exports = mongoose.model("User", userSchema);

module.exports.createUser = function (newUser, callback) {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.getUserByEmail = function (email, callback) {
  var query = { email: email };
  User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
}