var express    = require("express"),
	mongoose   = require("mongoose"),
	router     = express.Router(),
	Building   = require("../models/building"),
	MiddleWare = require("../middleware");

router.use(express.static(__dirname + "/public"));

//Index Route
router.get("/buildings", function(req, res) {
	Building.find({}, function(err, allBuildings) {
		if (err) console.log(err);
		else {
			res.render("buildings/index.ejs", {building: allBuildings});
		}
	});
});

//Show Route
router.get("/buildings/:id", function(req, res) {
	Building.findById(req.params.id, function(err, found) {
		if (err) console.log(err);
		else {
			res.render("buildings/show.ejs", {building: found});
		}
	});
});





module.exports = router;






