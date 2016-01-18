// TODO change the Thing name here and in the models folder to follow the name Object you are creating
var Thing = require('./models/thing');  // load the thing mongoose model - change as needed
var User = require('./models/user');  // load the User mongoose model for passport.js authentication

module.exports = function(app, passport) {
	// api ---------------------------------------------------------------------
	// create thing
	app.post('/api/things', function(req, res) {
		Thing.create({
			// TODO populate the obj
		}, function(err, thing) {
			if (err) {
				res.send(err);
			}
			res.json(thing);
		});
	});

	// get all things
	app.get('/api/things', function(req, res) {
		// use mongoose to get all things from the db
		Thing.find(function(err, things) {
			// if err, send it
			if (err) {
				res.send(err);
			}
			res.json(things);
		});
	});

	// get thing by parameter
	app.get('/api/things/:parameter', function(req, res) {
		// use mongoose to get all the things using a paramater
		// TODO Populate the search obj with the needed parameter
		Thing.find({}, function(err, things) {
			// if err, send it
			if (err) {
				res.send(err);
			}
			res.json(things);
		});
	});

	// get thing by id
	app.get('/api/thing/:id', function(req, res) {
		// use mongoose to find the thing by id requested
		Thing.findById(req.params.id, function(err, thing) {
			if(err) {
				res.send(err);
			}
			res.json(thing);
		});
	});

	// update a thing by id
	app.post('/api/things/:id', function(req, res) {
		Thing.findById(req.body._id, function(err, thing) {
			if(err) {
				res.send(err);
			}
			// TODO make changes to thing
			// save
			thing.save(function (err) {
				if (err) {
					res.send(err);
				}
				res.json(thing);
			});
		});
	});

	// delete a thing by id
	app.delete('/api/things/:id', function(req, res) {
		Thing.remove({
			_id : req.params.id
		},
		function(err, thing) {
			if (err) {
				res.send(err);
			}
			res.send();
		});
	});

	// process the login form
	// Express Route with passport authentication and custom callback
	app.post('/api/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (user === false) {
				res.status(401).send(req.flash('loginMessage'));
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(500).send("There has been an error");
					} else {
						res.status(200).send("success!");
					}
				});
			}
		})(req, res, next);
	});

	// process the signup form
	// Express Route with passport authentication and custom callback
	app.post('/api/signup', function(req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) {
				return next(err);
			}
			if (user === false) {
				res.status(401).send(req.flash('signupMessage'));
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(500).send("There has been an error");
					} else {
						res.status(200).send("success!");
					}
				});
			}
		})(req, res, next);
	});

	// check if the user is logged in an retrieve a different user obj based on the status
	app.get('/loggedin', function(req, res) {
		res.json(isLoggedIn(req));
	});

	// log the user out and redirect to /
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	isLoggedIn = function(req) {
		if (req.isAuthenticated()) {
			var user = JSON.parse(JSON.stringify(req.user));
			// hide sensible information
			delete user.local.password;
			return user;
		}
		return null;
	}
};
