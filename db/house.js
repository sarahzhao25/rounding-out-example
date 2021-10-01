const Sequelize = require('sequelize');
const db = require('./database');
const Student = require('./student');

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

// all of our models are just constructor functions.
// fully capable of taking advantage of this and creating CLASS and INSTANCE methods to help ourselves.

// console.log(typeof House());

// class method
House.getEverything = async function() {
  const houses = await House.findAll({
    include: Student
  });
  return houses;
}

// instance methods
House.prototype.colorStatement = function() {
  // console.log("what is this?", this);
  // The house Gryffindor's colors are scarlet and gold.
  return `The house ${this.name}'s colors are ${this.colorPrimary} and ${this.colorSecondary}.`;
}

/*
    const houses = await House.findAll({
      include: Student
    });
*/

module.exports = House;
