const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require("express-session");
const multer = require('multer');

const items = require('./routes/api/items');
const users = require('./routes/api/users');
const bookings = require('./routes/api/bookings');

const app = express();

// bodyParser Middleware
app.use(bodyParser.json());
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false
  }
}));

// multer parameters
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads/')
    }
});
const upload = multer({ storage: storage });


// DB config
const db = require('./config/keys').mongoURI;
// connect to mongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// For Login Page
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-type");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  // res.header("Access-Control-Allow-Origin", "http://localhost:5000/api/users/login");
  res.header("Access-Control-Allow-Credentials", true);
  // session.save();
  next();
});

//  Use routes
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/bookings', bookings);


const port = process.env.PORT || 5000;

//catches uncaught exceptions
function exitHandler(options, exitCode) {
    if (options.cleanup) console.log('clean');
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) process.exit();
}
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

app.listen(port, () => console.log(`Server started on port ${port}`));
