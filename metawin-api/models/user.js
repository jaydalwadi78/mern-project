const mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	userNounce: String,
	address: String,
	busd_address: String,
	twitter_id: String,
	twitter_screen_name: String,
	twitter_verified: Number,
	email_verified: Number,
	twitter_access_token: String,
	twitter_access_secret: String,
	resetcode: String,
	resetcount: Number,
}, {
	timestamps: true
});

let Users = mongoose.model('Users', usersSchema);
module.exports = { Users, usersSchema };