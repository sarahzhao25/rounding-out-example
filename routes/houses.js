const router = require('express').Router();
const { House } = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const houses = await House.findAll();
    res.send(houses);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const house = await House.findByPk(req.params.id);
    res.send(house);
  } catch(e) {
    next(e);
  }
});

module.exports = router;
