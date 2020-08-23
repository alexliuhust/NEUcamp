var express     		= require("express"),
    app         		= express(),
    axios       		= require('axios'),
    bodyParser  		= require('body-parser'),
	expressSanitizer 	= require('express-sanitizer'),
	methodOverride 		= require("method-override"),
    mongoose    		= require('mongoose'),
	flash				= require("connect-flash"),
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
	secret: "Alexander Liu was Cool",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());







// ==============================================================================
app.get("/", function(req, res) {
	res.send("The home page!");
});

app.get("*", function(req, res) {
	res.send("Iyt dsinh iyt'r de ivarmah neut phovaund 404, iyt alsshiynebul?");
});

app.listen(3000, function() { 
	console.log("");
	console.log("=================================");
  	console.log("||      NEU Camp Started       ||"); 
});





