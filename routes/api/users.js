const express =  require('express');
const router = express.Router();
const session = require("express-session");
// User model
const User = require('../../models/User');
const fs = require('fs');

// @route GET api/users/getAllUsers
// @desc Get all users
// @access Public
router.get('/getAllUsers', (req, res) => {
  // if (req.session.userRole != "admin") {
  //   return res.status(403).json({success:false, message:"You are not an admin"});
  // }
  User.find()
    .sort({ email: -1 })
    .then(users => res.status(200).json({success:true, message: users}))
});

// @route GET api/users/:userEmail
// @desc Get a particular user
// @access private
router.get('/:userEmail', (req, res) => {
  console.log(req.params.userEmail);
  if(true) {
    const user = User.find({email: req.params.userEmail}, function(err, user){
      if (user.length)
        return res.status(200).json({success:true, message:user});
      else
        return res.status(404).json({success:false, message: "user with that email not found"});
    })
  }
  else {
    return res.status(403).json({success:false, message: "No permission"});
  }
});

// @route GET api/users/userid/:id
// @desc Get a particular user
// @access private
router.get('/userid/:id', (req, res) => {
  const targetId = console.log(req.params.id);
  const targetUser = User.findById(targetId, function(err, user){
    if (err){
      return res.status(404).json({success:false, message: "user with that id not found"});
    }
    return res.status(200).json({success:true, message: user})
  })
});

// @route POST api/users
// @desc Create new User
// @access Public
router.post('/', (req, res) => {

  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    name: {first: req.body.name.first, last: req.body.name.last},
    address: req.body.address,
    contact: req.body.contact,
    postalCode: req.body.postalCode,
    company: req.body.company
  });
  newUser.save()
    .then(user => res.json({success: true, message:user}))
    .catch(err => res.status(500).json({
      success: false, message:err
    }));
});

// @route PATCH api/users/:id
// @desc PATCH a user
// @access Private
router.patch('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id,req.body, function(err, result){
    if (err)
      return res.status(404).json({success: false, message: "No such user found"});
    else
      return res.status(200).json({success: true, message: result});
  })
});

// @route POST api/users/login
// @desc login authentication, creates a session and cookie (userId, email, role)
router.post('/login', (req,res) => {
  User.authenticate(req.body.email, req.body.password, function(error, user){
    if (error || !user) {
      return res.status(404).json({success: false, message: "Wrong email or password"})
    } else {
      req.session.userId = user._id;
      req.session.email = user.email;
      req.session.userRole = user.role;
      req.session.first = user.name.first;
      req.session.last = user.name.last;
      req.session.company = user.company;
      return res.status(200).json({success:true, session: req.session});
    }
  })
});

// @route GET api/users/verify
// @desc verify a user
// @access private by admin only
router.get('/:userEmail', (req, res) => {
  if(req.session.userRole === "admin") {
    User.findOneAndUpdate({email: req.params.userEmail}, { isVerified: true }, function(err, user){
      if(error) {return res.status(404).json({success: false, message:"Email not found"});}
      else {
        return res.status(200).json({success:true, user: user});
      }
    });
  }
  else {
    return res.status(403).json({success:false, message: "No permission"});
  }
});

// @route GET api/users/activate
// @desc activate a user, needs userEmail and activated(Boolean) <-- give me true to activate, false to deactivate
// @access private by admin only
router.get('/:userEmail', (req, res) => {
  if(req.session.userRole === "admin") {
    User.findOneAndUpdate({email: req.params.userEmail}, { activated: req.params.activated }, function(err, user){
      if(error) {return res.status(404).json({success: false, message:"Email not found"});}
      else {
        return res.status(200).json({success:true, user: user});
      }
    });
  }
  else {
    return res.status(403).json({success:false, message: "No permission"});
  }
});

// GET /api/users/action/logout
router.get('/action/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return res.status(500).json({success: false})
      } else {
        return res.status(200).json({success: true, message:"Successfully logged out"});
      }
    });
  }
})

// @route GET api/users/action/getDrivers
// @desc get all drivers
// @access private by admin only
router.get('/action/getDrivers', (req, res) => {
  const users = User.find({role: "driver"}, function(err, users){
    return res.status(200).json({success: true, message: users});
  })
});

// @route GET api/users/action/getBuyers
// @desc get all buyers
// @access private by admin only
router.get('/action/getBuyers', (req, res) => {
  const users = User.find({role: "buyer"}, function(err, users){
    return res.status(200).json({success: true, message: users});
  })
});

module.exports = router;
