var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	username: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	passwordConf: {
		type: String,
		required: true
	}
});

//hashing a password before saving it to the database

var User = mongoose.model("User", UserSchema);

module.exports = User;