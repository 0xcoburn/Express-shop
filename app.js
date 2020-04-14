const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	User.findById('5e954e24100e422b7b3784c6')
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
	.connect(
		'mongodb+srv://coburn24:jo9zf2mqCZYKnuVw@cluster0-xppk5.mongodb.net/shop?retryWrites=true&w=majority'
	)
	.then((result) => {
		User.findOne().then((user) => {
			if (!user) {
				const user = new User({
					name: 'matt',
					email: 'matt@test.com',
					cart: {
						items: []
					}
				});
				user.save();
			}
		});
		app.listen(3000);
	})
	.catch((err) => {
		console.log(err);
	});
