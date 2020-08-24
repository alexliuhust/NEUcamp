var express    = require("express"),
    router     = express.Router(),
    Course 	   = require("../models/course"),
	MiddleWare = require("../middleware");

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
	res.render("courses/new.ejs");
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

//Edit Route
router.get("/:id/edit", MiddleWare.courseIsPermitted, function(req, res) {
	Course.findById(req.params.id, function(err, found) {
		res.render("courses/edit.ejs", {course: found});
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
// router.delete("/:id", MiddleWare.courseIsPermitted, function(req, res) {
// 	Course.findByIdAndDelete(req.params.comid, function(err) {
// 		if (err) res.redirect("back");
// 		else {
// 			res.redirect("/courses");
// 		}
// 	});
// });

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








