const db = require('./database');
const House = require('./house');
const Student = require('./student');

// 1 to many
// House.hasMany(Student);
// Student.belongsTo(House);

// student.getHouse(), house.getStudents()

// console.log(Object.keys(House.prototype));
// console.log(Object.keys(Student.prototype));

// many to many relationship
// tags and entries --> Tag, Entry, another table that included our foreign keys for tag and entry
House.belongsToMany(Student, { through: 'house-student' });
Student.belongsToMany(House, { through: 'house-student' });

console.log(Object.keys(House.prototype));
console.log(Object.keys(Student.prototype));


// 1 to 1
/*
House.hasOne(Student);
Student.belongsTo(House);
*/

module.exports = {
  db,
  House,
  Student
};
