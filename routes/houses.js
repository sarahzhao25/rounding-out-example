const router = require('express').Router();
const { House, Student } = require('../db');

// keep our routes skinny and our models thicc

// /houses
router.get('/', async (req, res, next) => {
  try {
    // House has the hasMany relationship -> will receive an ARRAY of students
    const houses = await House.getEverything();
    res.send(houses);
  } catch (e) {
    next(e);
  }
});
// if I don't have a house associated with my table, I am sending 200 which I SHOULD NOT BE!!!!
// I want to send back a 404!!!
// /houses/:id
router.get('/:id', async (req, res, next) => {
  try {
    const house = await House.findByPk(req.params.id);



    // console.log('This is my house variable:', house);
    // the not operator since house is FALSY --> !house
    if (house === null) {
      const error = new Error('THERE IS NO HOUSE!!!!!!! associated with this ID');
      error.status = 404; // assigning a property to an object
      throw error;
    }
    else {

      const colorStatement = house.colorStatement();

      res.send(colorStatement);

      // res.send(house);
    }
  } catch(e) {
    // console.log('I have an error in /houses/:id', e);
    next(e);
      // inside of the next function:
      // next says:
      // 1. If I have NO argument, I am going to look for the NEXT ROUTE that matches my verb and url.
      // 2. If I have 1 argument, I will look for the NEXT ERROR HANDLING MIDDLEWARE.

    // WHAT DOES THAT MEAN!
    // if next accepts an argument (e) -> it will move to the NEXT ERROR HANDLING MIDDLEWARE.
    // express's default error handling middleware.
  }
});

module.exports = router;
