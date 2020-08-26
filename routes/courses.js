var express    = require("express"),
    router     = express.Router(),
	bodyParser = require('body-parser'),
    Course 	   = require("../models/course"),
	Building   = require("../models/building"),
	MiddleWare = require("../middleware");


router.use(bodyParser.urlencoded({ extended: true}));

//Index Route
router.get("/", MiddleWare.isLoggedIn, function(req, res) {
	Course.find({}, function(err, allCourses) {
		if (err) console.log(err);
		else {
			res.render("courses/index.ejs", {course: allCourses});
		}
	});
});

//New Route
router.get("/new", MiddleWare.isLoggedIn, function(req, res) {
	Building.find({}, function(err, allBuildings) {
		if (err) console.log(err);
		else {
			res.render("courses/new.ejs", {building: allBuildings});
		}
	});
});

//Create Route
router.post("/", MiddleWare.isLoggedIn, function(req, res) {
	var newCourse = req.body.course;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	newCourse.author = author;
	Course.create(newCourse, function (err, newone) {
		if (err) console.log(err);
		else {
			res.redirect("/courses");
		}
	});
});

//Show Route
router.get("/:id", MiddleWare.isLoggedIn, function(req, res) {
	Course.findById(req.params.id, function(err, foundCourse) {
		if (err) console.log(err);
		else {
			Building.find({}, function(err, allBuildings) {
				if (err) console.log(err);
				else {
					allBuildings.forEach(function(part) {
						if (part.name === foundCourse.building) {
							var foundBuilding = part;
							res.render("courses/show.ejs", {course: foundCourse, building: foundBuilding});
						}
					});
				}
			});
		}
	});
});


//Edit Route
router.get("/:id/edit", MiddleWare.courseIsPermitted, function(req, res) {
	Course.findById(req.params.id, function(err, found) {
		Building.find({}, function(err, allBuildings) {
			if (err) console.log(err);
			else {
				res.render("courses/edit.ejs", {course: found, building: allBuildings});
			}
		});
	});
});

//Update Route
router.put("/:id", MiddleWare.courseIsPermitted, function(req, res) {
	Course.findByIdAndUpdate(req.params.id, req.body.course, function(err, updated) {
		if (err) console.log(err);
		else {
			res.redirect("/courses");
		}
	});
});

//Delete Route
router.delete("/:id", MiddleWare.courseIsPermitted, async(req, res) => {
	try {
    	let foundCourse = await Course.findById(req.params.id);
    	await foundCourse.delete();
		// req.flash("success", "Course Deleted");
    	res.redirect("/courses");
  	} catch (error) {
    	// console.log(error.message);
    	res.redirect("/courses");
  	}
});




module.exports = router;








