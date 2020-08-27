var express     		= require("express"),
    app         		= express(),
    axios       		= require('axios'),
    bodyParser  		= require('body-parser'),
	expressSanitizer 	= require('express-sanitizer'),
	methodOverride 		= require("method-override"),
    mongoose    		= require('mongoose'),
	flash				= require("connect-flash"),
	User				= require("./models/user"),
	Course				= require("./models/course"),
	Building			= require("./models/building"),
	passport			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose");

// Connect the DB 
mongoose.connect('mongodb://localhost:27017/NEUcamp', {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(() => {
	console.log("||      Connected to DB!       ||");
	console.log("=================================");
	console.log("");
})
.catch(error => console.log(error.message));

// app.use something
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());
app.use(flash());

// Passport configuration
app.use(require("express-session")({
	secret: "AlexanderLiu was Cool",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Require routes
var authRoutes      = require("./routes/auth"),
	courseRoutes    = require("./routes/courses"),
	buildingRoutes  = require("./routes/buildings");

// Pass the variable currentUser, error flash, and success flash to every route
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.errorM = req.flash("error");
	res.locals.successM = req.flash("success");
	next();
});

// Use the routes and pre-set the prefix of the URL
app.use("/", authRoutes);
app.use("/courses", courseRoutes);
app.use("/buildings", buildingRoutes);

// ==============================================================================

app.get("*", function(req, res) {
	res.send("Oh-oh! You hit the wall! (404 NOT FOUND)");
});

app.listen(3000, function() { 
	console.log("");
	console.log("=================================");
  	console.log("||      NEU Camp Started       ||"); 
});






