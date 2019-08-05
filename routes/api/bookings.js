const express = require('express');
var request = require('request');
const router = express.Router();

// Item Model
const Booking = require('../../models/Booking');
const Assignment = require('../../models/Booking');
const Item = require('../../models/Item');

// @route GET api/bookings
// @desc lists the bookings a user has, uses userId from session
// @access private
router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(403).json({success:false, message:"You are not logged in"})
  }
  const bookings = Booking.find({user: userId}, function(err, bookings){
    return res.status(200).json({success: true, message: bookings});
  });
});

// @route Post api/bookings
// @desc Creates a new booking with session userId
// @access private
router.post('/', (req, res) => {
  const userId = req.session.userId;
  // if (!userId) {
  //   return res.status(403).json({success:false, message:"You are not logged in"})
  // }

  const newBooking = new Booking({
    items: req.body.items,
    itemNames: req.body.itemNames,
    vendors: req.body.itemOwners,
    price: req.body.price,
    user:  req.session.userId,
    userFirstName: req.session.first,
    userLastName: req.session.last,
    destination: {
      address: req.body.destination.address,
      postal: req.body.destination.postal
    },
    start: req.body.start,
    end: req.body.end,
    driver: "5be985f8e7f2331a2697a050",
    eventName: req.body.eventName,
    assignments: []
  })
  //sssssss
  var newAssignments = [];
  req.body.itemOwners.forEach(function(item, index) {
    User.findById(req.body.itemOwners[index], function(err, foundOwner) {
      // console.log("-----");ssssss
      // console.log(foundOwner);
      var newAssignment = {
        lat: foundOwner.location.lat,
        lng: foundOwner.location.lng,
        vendor: req.body.itemOwners[index],
        vendorName: foundOwner.company,
        vendorAddress: foundOwner.address,
        vendorPostal: foundOwner.postalCode,
        items: req.body.itemNames[index],
        toVendor: false,
        toCustomer: false,
      }
      newAssignments.push(newAssignment);
    });
  });

  setTimeout(function(){
    // console.log(newAssignments);sss
    newBooking.assignments = newAssignments;
    // end steps
    newBooking.save()
      .then(booking => res.status(200).json({success: true, message: booking}))
      .catch(err => res.status(500).json({success: false, message: err}));
  }, 8000);

});

// @route PATCH api/bookings/:id
// @desc PATCH an booking
// @access Private
router.patch('/:id', (req, res) => {
  Booking.findByIdAndUpdate(req.params.id,req.body, function(err, result){
    if (err)
      return res.status(404).json({success: false, message: "No such booking found"});
    else
      return res.status(200).json({success: true, message: result});
  })
});

// @route PATCH api/bookings/:id
// @desc PATCH an booking
// @access Private
router.patch('/patchAssignment/:id', (req, res) => {
  const newAssignments = req.body.assignments;
  Booking.findByIdAndUpdate(req.params.id,{assignments: newAssignments}, function(err, result){
    if (err)
      return res.status(404).json({success: false, message: err});
    else
      return res.status(200).json({success: true, message: result});
  })
});

// @route GET api/bookings/indiv/:Id
// @desc GET a Booking by Id
// @access Private
router.get('/indiv/:id', (req, res) => {
  Booking.findById(req.params.id,req.body, function(err, result){
    if (err)
      return res.status(404).json({success: false, message: "No such booking found"});
    else
      return res.status(200).json({success: true, message: result});
  })
});

// @route DELETE api/bookings/:id
// @desc DELETE an item
// @access Public
router.delete('/:bookingId', (req, res) => {
  Booking.findById(req.params.bookingId)
    .then(booking => booking.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

// -------- Vendor related methods ------

// @route GET api/bookings/vendor
// @desc lists the bookings a vendor has - Mongo search by vendorId provided
// @access private
router.get('/vendor', (req, res) => {
  const vendorId = req.session.userId;
  if (!vendorId) {
    return res.status(403).json({success:false, message:"You are not logged in"})
  }
  else {
    // get all bookings where its vendors[] contains userId
    const bookings = Booking.find({vendors: vendorId}, function(err, bookings){
      return res.status(200).json({success: true, message: bookings});
    })
  }
});

// -------- Driver related methods ------

// @route GET api/bookings/driver/:id
// @desc lists the bookings a driver has - Mongo search by driverId provided
// @access private
router.get('/driver/:id', (req, res) => {
  const driverId = req.params.id;
  const bookings = Booking.find({driver: driverId}, function(err, bookings){
    return res.status(200).json({success: true, message: bookings});
  })
});

// @route GET api/bookings/driver/assignments/:id
// @desc return giant Array of all assignments a driver has across all bookings
// @access private
router.get('/driver/assignments/:id', (req, res) => {
  const driverId = req.params.id;
  var assignments = [];
  const bookings = Booking.find({driver: driverId}, function(err, bookings){
    for (booking of bookings) {
      assignments = assignments.concat(booking.assignments);
    }
  }).then( () => {
    res.status(200).json({success: true, message: assignments})
  })
});

// -------- Admin related methods ------

// @route GET api/bookings/admin
// @desc lists the bookings that are unexpired
// @access private
router.get('/admin', (req, res) => {
  const bookings = Booking.find({expired: false}, function(err, bookings){
    return res.status(200).json({success: true, message: bookings});
  })
});

// -------- Geocoding API ------

// @route GET api/bookings/geocode
// @desc lists the bookings that are unexpired
// @access private
router.get('/geocode', (req, res) => {
  var q = req.body.query;
  //https://us1.locationiq.com/v1/search.php?key=YOUR_PRIVATE_TOKEN&q=SEARCH_STRING&format=json
  url = "https://us1.locationiq.com/v1/search.php?key=44a20cdf3d1a39&q="+q+"&format=json&countrycodes=sg&postalcode="+req.body.postalCode;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      response = JSON.parse(response.body);
      const location = {
        lat: response[0].lat,
        lng: response[0].lon
      }
      // const test = (response.body)[0];
      return res.status(200).json({success:true, message: location});
    }
  })
});


module.exports = router;
