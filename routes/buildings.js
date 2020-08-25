var express    = require("express"),
	mongoose   = require("mongoose"),
	router     = express.Router(),
	Building   = require("../models/building"),
	MiddleWare = require("../middleware");

router.use(express.static(__dirname + "/public"));


	

router.get("/buildings", function(req, res) {
	Building.find({}, function(err, allBuildings) {
		if (err) console.log(err);
		else {
			res.render("buildings/index.ejs", {building: allBuildings});
		}
	});
});






module.exports = router;






