var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findOrCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function() {

	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
										clientID: 'a8da8afb1e67716a6ab0',
										clientSecret: '4307e97d0f4ea53b41c12c5cccc87a7f78535166',
										callbackURL: 'http://localhost:3000/auth/github/callback'
									}, 
									function(accessToken, refreshToken, profile, done) {
										Usuario.findOrCreate(
												{ "login" : profile.username},
												{ "nome" : profile.username},
												function(erro, usuario) {
													if(erro) {
														return done(erro);
													}
													return done(null, usuario);
												}
										);
									}
				));

	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});

	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
		.then(function(usuario) {
			done(null, usuario);
		});
	});
};