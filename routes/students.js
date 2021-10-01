const router = require('express').Router();
const { Student } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    res.send(student);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
