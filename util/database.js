const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'roflcopter24', {
	dialect: 'mysql',
	host: 'localhost'
});

module.exports = sequelize;
