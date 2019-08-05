const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
//Create Schema
const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  location: {
    lat: {type: Number, default: 0.0},
    lng: {type: Number, default: 0.0}
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  name: {
    first: { type: String, required: true, trim: true},
    last: { type: String, required: true, trim: true}
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  activated: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: false
  },
  address: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  company: { // only present for sellers
    type: String,
    required: false
  },
  postalCode: {type: Number, required: true},
  items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  img: { //TODO: separate upload method
    data: Buffer,
    contentType: String,
    required: false
  },
  bookings: { // an array of booking objectIDs
    type: Array,
    required: false
  },
  reviews: {
    type: Array,
    required: false,
  },
  Assignments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment'
  }],
  location: {
    lat: {type: Number},
    lng: {type: Number}
  }
});

//authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  console.log("pre-save hashing");
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

module.exports = User = mongoose.model('user', userSchema)
