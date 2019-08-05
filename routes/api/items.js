const express = require('express');
const router = express.Router();
const fs = require('fs');

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get all Items from a particular account, users userId from session
// @access private
router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(403).json({success:false, message:"You are not logged in"})
  }
  else {
    const items = Item.find({owner: userId}, function(err, items){
      return res.status(200).json({success: true, message: items});
    });
  }
});

// @route GET api/items
// @desc Get all Items from everything
// @access private
router.get('/getAllItems', (req, res) => {
    const items = Item.find({}, function(err, items){
      if(err){
        return res.status(500).json({success:false, message: err})
      }
      return res.status(200).json({success: true, message: items});
  })
});

// @route POST api/items
// @desc create new item
// @access private
router.post('/', (req, res) => {
  userId = req.session.userId;

  // if (!userId) {
  //   return res.status(403).json({success:false, message:"You are not logged in"})
  // }

  var img_path = null;
  if (req.file) {
    img_path = {data:fs.readFileSync(req.file.path), contentType: 'image/jpeg'};
  }
  const newItem = new Item({
    name: req.body.name,
    owner: req.session.userId,
    ownerName: req.session.first + " " + req.session.last,
    description: req.body.description,
    condition: req.body.condition,
    category: req.body.category,
    img: img_path,
    delivery: {
      canDeliver: req.body.delivery.canDeliver,
      canSetup: req.body.delivery.canSetup,
      canPickup: req.body.delivery.canPickup,
      deliverPrice: req.body.delivery.deliverPrice,
      setupPrice:req.body.delivery.setupPrice
    },
    depositFee: req.body.depositFee,
    eventType: req.body.eventType,
    price: req.body.price,
    manufacturer: req.body.manufacturer,
    available: req.body.available,
    activated: req.body.activated
  });
  if (!req.file) {
    delete newItem.img;
  }
  newItem.save()
    .then(item => res.status(200).json({success:true, message:item}))
    .catch(err => res.status(500).json({success:false, message:err}))
});

// @route PATCH api/items/:id
// @desc PATCH an item
// @access Private
router.patch('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id,req.body, function(err, result){
    if (err)
      return res.status(404).json({success: false, message: "No such item found"});
    else
      return res.status(200).json({success: true, message: result});
  })
});

// @route GET api/items/:id
// @desc GET an item
// @access Public
router.get('/:id', (req, res) => {
  Item.findById(req.params.id, function(err, item){
    if (err)
      return res.status(404).json({success: false, message: "No such item found"});
    else
      return res.status(200).json({success: true, message: item});
  })
});

// @route DELETE api/items/:id
// @desc DELETE an item
// @access Public
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true, message:item})))
    .catch(err => res.status(404).json({success: false, message: err}));
});


module.exports = router;
