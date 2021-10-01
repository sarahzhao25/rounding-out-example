const db = require('./database');
const House = require('./house');
const Student = require('./student');

House.hasMany(Student);
Student.belongsTo(House);

module.exports = {
  db,
  House,
  Student
};
