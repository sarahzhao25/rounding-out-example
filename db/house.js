const Sequelize = require('sequelize');
const db = require('./database');

const House = db.define('house', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  points: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  colorPrimary: Sequelize.STRING,
  colorSecondary: Sequelize.STRING,
  ghost: Sequelize.STRING
});

module.exports = House;
