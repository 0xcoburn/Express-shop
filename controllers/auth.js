const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getLogin = (req, res, next) => {
	res.render('auth/login', {
		path: '/login',
		pageTitle: 'Login'
	});
};

exports.getSignup = (req, res, next) => {
	res.render('auth/signup', {
		path: '/signup',
		pageTitle: 'Signup'
	});
};

exports.postLogin = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	User.findOne({ email: email })
		.then((user) => {
			if (!user) {
				return res.redirect('/login');
			}
			bcrypt
				.compare(password, user.password)
				.then((doMatch) => {
					if (doMatch) {
						req.session.isLoggedIn = true;
						req.session.user = user;
						return req.session.save((err) => {
							console.log(err);
							res.redirect('/');
						});
					}
					res.redirect('/login');
				})
				.catch((err) => {
					console.log(err);
					res.redirect('/login');
				});
		})
		.catch((err) => console.log(err));
};

exports.postSignup = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	try {
		const userDoc = await User.findOne({ email: email });

		if (userDoc) {
			return res.redirect('/signup');
		}
		const hashedPassword = await bcrypt.hash(password, 12);

		const user = new User({
			email: email,
			password: hashedPassword,
			cart: { items: [] }
		});
		await user.save();

		res.redirect('/login');
	} catch (err) {
		console.log(err);
	}
};

exports.postLogout = (req, res, next) => {
	req.session.destroy((err) => {
		console.log(err);
		res.redirect('/');
	});
};
