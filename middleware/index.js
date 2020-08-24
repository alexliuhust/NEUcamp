var express     = require("express"),
	Building 	= require("../models/building"),
	Course 	= require("../models/course");

var MiddleWare = {};

MiddleWare.isLoggedIn = function(req, res, next) {
	if (req.isAuthenticated()) return next();
	// req.flash("error", "Please Log In First");
	res.redirect("/login");
}

MiddleWare.courseIsPermitted = function(req, res, next) {
	if (req.isAuthenticated()) {
		Course.findById(req.params.id, function(err, found) {
			if (err) {
				// req.flash("error", "Course not found!");
				res.redirect("back");
			}
			else {
				if (found.author.id.equals(req.user._id)) return next();
				// req.flash("error", "You are not permitted!");
				res.redirect("back");
			}
		});
	} else {
		// req.flash("error", "Please Log In First");
		res.redirect("back");
	}
	
}

// MiddleWare.buildingIsPermitted = function(req, res, next) {
// 	if (req.isAuthenticated()) {
// 		Building.findById(req.params.comid, function(err, found) {
// 			if (err) {
// 				// req.flash("error", "building not found!");
// 				res.redirect("back");
// 			}
// 			else {
// 				if (found.author.id.equals(req.user._id)) return next();
// 				// req.flash("error", "You are not permitted!");
// 				res.redirect("back");
// 			}
// 		});
// 	} else {
// 		// req.flash("error", "Please Log In First");
// 		res.redirect("back");
// 	}
// }

module.exports = MiddleWare


