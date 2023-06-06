const mongoose = require('mongoose');
const moment = require('moment');
const Admins = require("../models/admin").Admins;
const Raffles = require("../models/raffle").Raffles;
const { to, ReE, ReS } = require('../services/util.service');
const CONFIG = require('../config/config');

/*var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connect = mongoose.connect(CONFIG.LOCAL_MONGO_URL, options);
connect.then((db) => {
    console.log('Connected correctly to mongo database server!');
}, (err) => {
    console.log(err);
});*/

const signinadmin = async (req, res) => {
  let admin, message;
  let body = req.body;
  var search = {
    username: body.username,
    password: body.password
  }
  admin = await Admins.findOne(search);
  // console.log("admin >>>>> ", admin);
  if (admin) {
    admin = admin;
    message = "Admin login successfully !!";
  }
  else {
    admin = null;
    message = "Invalid password and email";
  }
  return ReS(res, { admin: admin, message: message }, 201);
}
module.exports.signinadmin = signinadmin;


