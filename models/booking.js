const mongoose = require('mongoose');
const Schema = mongoose.Schema

const bookingSchema = new Schema({
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userFirstName: {
    type: String
  },
  userLastName: {
    type: String
  },
  vendors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  destination: {
    address: {type: String, required: true},
    postal: {type: String, required: false}
  },
  price: {type: Number, required: true},
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  expired: {
    type: Boolean,
    default: false
  },
  eventName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Payment Confirmed",
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  location: {
    lat: {type: Number, default: 1.295269},
    lng: {type: Number, default: 103.773886}
  },
  assignments:[{
    vendorName: {type: String},
    vendor:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    vendorAddress: {type: String},
    vendorPostal: {type: Number},
    items:{type: String},
    toVendor: {type: Boolean, default: false},
    toCustomer: {type: Boolean, default: false},
    lat: {type: Number},
    lng: {type: Number}
  }]
});

module.exports = Booking = mongoose.model('booking', bookingSchema);
