const mongoose = require('mongoose');

var adminSchema = new mongoose.Schema({
	username: String,
	password: String,
}, {
	timestamps: true
});

let Admins = mongoose.model('Admins', adminSchema);
module.exports = { Admins, adminSchema };