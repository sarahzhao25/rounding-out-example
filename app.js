const express = require('express');
const app = express();
const PORT = 8080;
const morgan = require('morgan');
const houseRouter = require('./routes/houses');
const studentRouter = require('./routes/students');
const { db } = require('./db');

const setup = async () => {
  try {
    // logging middleware
    app.use(morgan('dev'));

    app.use('/houses', houseRouter);
    app.use('/students', studentRouter);

    // syncing the database before listening to the port!
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Casting spells on PORT ${PORT}`);
    });
  } catch(e) {
    console.log(e);
  }
}

setup();
