var mongoose = require("mongoose");

var courseSchema = new mongoose.Schema({
	number: String,
	name: String, 
	day: String,
	time: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
	 		ref: "User"
		},
		username: String
	},
	classroom: String
	// classroom: {
	// 	building: {
	// 		type: mongoose.Schema.Types.ObjectId,
	//  		ref: "Building"
	// 	},
	// 	room: String
	// }
});

module.exports = mongoose.model("Course", courseSchema);