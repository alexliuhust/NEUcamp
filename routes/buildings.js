var express    = require("express"),
	mongoose   = require("mongoose"),
	router     = express.Router(),
	Building   = require("../models/building"),
	MiddleWare = require("../middleware");

router.use(express.static(__dirname + "/public"));

//Index Route
router.get("/", function(req, res) {
	Building.find({}, function(err, allBuildings) {
		if (err) console.log(err);
		else {
			res.render("buildings/index.ejs", {building: allBuildings});
		}
	});
});

//New Route
router.get("/new", MiddleWare.isAdministrator, function(req, res) {
	res.render("buildings/new.ejs");
});

//Create Route
router.post("/", MiddleWare.isAdministrator, function(req, res) {
	var newBuilding = req.body.building;
	Building.create(newBuilding, function (err, newone) {
		if (err) console.log(err);
		else {
			res.redirect("/buildings");
		}
	});
});

//Show Route
router.get("/:id", function(req, res) {
	Building.findById(req.params.id, function(err, found) {
		if (err) console.log(err);
		else {
			res.render("buildings/show.ejs", {building: found});
		}
	});
});

//Edit Route
router.get("/:id/edit", MiddleWare.isAdministrator, function(req, res) {
	Building.findById(req.params.id, function(err, found) {
		if (err) console.log(err);
		else {
			res.render("buildings/edit.ejs", {building: found});
		}
	});
});

//Update Route
router.put("/:id", MiddleWare.isAdministrator, function(req, res) {
	Building.findByIdAndUpdate(req.params.id, req.body.building, function(err, updated) {
		if (err) console.log(err);
		else {
			res.redirect("/buildings");
		}
	});
});

//Delete Route
router.delete("/:id", MiddleWare.isAdministrator, async(req, res) => {
	try {
    	let foundBuilding = await Building.findById(req.params.id);
    	await foundBuilding.delete();
		req.flash("success", "Building Deleted");
    	res.redirect("/buildings");
  	} catch (error) {
    	console.log(error.message);
    	res.redirect("/buildings");
  	}
});



module.exports = router;






