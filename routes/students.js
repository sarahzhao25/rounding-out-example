const router = require('express').Router();
const { Student, House } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (e) {
    next(e);
  }
});
// /students/:id
router.get('/:id', async (req, res, next) => {
  try {
    // const student = await Student.findByPk(req.params.id);
    // const studentsHouse = await House.findByPk(student.houseId);
    // const studentsHouse = await student.getHouse();
    // PROBLEM: We made 2 database calls, when we would much have rather made 1.
    // Let's solve that problem!!
    // 'eager-loading' --> I want to get the information I'm asking for AND if I have an association, I will want those instance(s) as well.

    // findById
    // 2nd argument: an object with an include key, and the model I want to include

    const student = await Student.findByPk(req.params.id, {
      include: House
    });


    // console.log('i have students house', studentsHouse);
    res.send(student);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
