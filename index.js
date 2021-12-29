'use strict';

require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI||`mongodb+srv://munther:munther12345@cluster0.z1ltb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
//import the server
const server = require('./src/server.js');

// use mongoose for MongoDB
const mongoose = require('mongoose');
const options = {
  useNewUrlParser: true,
  //   useCreateIndex: true,
  useUnifiedTopology: true,
};

// connect database then Start the server
mongoose
  .connect(MONGODB_URI, options)
  .then(() => {
    server.start(process.env.PORT);
  })
  .catch((e) => {
    console.error(e.message);
  });


