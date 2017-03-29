/**
 * Created by admin on 17/3/27.
 */
var path = require('path');
var express = require('express');
var config = require('config-lite');
var routes = require('./routes');
var flash = require('connect-flash');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var pkg = require('./package');

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(path.join(__dirname,'public')));

app.use(session({
	name:config.session.key,
	secret:config.session.secret,
	resave:true,
	saveUninitialized:false,
	cookie:{
		maxAge:config.session.maxAge
	},
	store:new MongoStore({
		url:config.mongodb
	})
}));

app.use(flash());
app.use(require('express-formidable')({
	uploadDir:path.join(__dirname,'public/img'),
	keepExtensions:true
}));
app.locals.blog = {
	title:pkg.name
}
app.use(function(req,res,next){
	res.locals.success = req.flash('success').toString();
	res.locals.error = req.flash('error').toString();
	res.locals.loading = req.flash('loading').toString();
	next();
});

routes(app);

app.use(function(err,req,res,next){
	res.render('error',{
		error:err
	})
});

app.listen(config.port);