const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
	res.status(404).render('error', { pageTitle: 'Page Not Found' });
});

app.listen(5000);
