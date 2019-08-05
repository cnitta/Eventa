const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Photo, category, item condition, deposit fee, rating

// Create schema
const itemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerName: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
  },
  images: [{type: Buffer, required: false}],
  description: {
    type: String,
    required: true
  },
  delivery: {
    canDeliver: {type: Boolean, default: false},
    canSetup: {type: Boolean, default: false},
    canPickup: {type:Boolean, default: false},
    deliverPrice: {type:Number},
    setupPrice: {type: Number},
    required: false
  },
  rating: {
    type: Number,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  depositFee: {
    type: Number,
    required: true
  },
  manufacturer: {
    type: String,
    required: false
  },
  available: {
    type: Boolean,
    default: true,
    required: true
  },
  activated: {
    type: Boolean,
    default: true,
    required:false
  },
  eventType: [{type: String}],
  img: { data: Buffer, contentType: String },
  bookings:[{type: mongoose.Schema.Types.ObjectId, ref:'Booking'}]
});

module.exports = Item = mongoose.model('item', itemSchema);
