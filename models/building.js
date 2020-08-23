var mongoose = require("mongoose");

var buildingSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	location: String
});

module.exports = mongoose.model("Building", buildingSchema);