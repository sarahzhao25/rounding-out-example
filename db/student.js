const Sequelize = require('sequelize');
const db = require('./database');

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  patronus: Sequelize.STRING,
  pet: Sequelize.STRING
});

module.exports = Student;
