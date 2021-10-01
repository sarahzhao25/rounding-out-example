const express = require('express');
const app = express();
const PORT = 8080;
const morgan = require('morgan');
const houseRouter = require('./routes/houses');
const studentRouter = require('./routes/students');
const { db } = require('./db'); // db the folder if you don't provide a filename, it will look automatically for index.js

const setup = async () => {
  try {
    // logging middleware
    app.use(morgan('dev'));

    app.use('/houses', houseRouter);
    app.use('/students', studentRouter);

    // custom 404 response
    // at the very bottom of your code so that any url that DOES NOT get hit will land here.
    // there is no error that happened, I just could not find your route so I want to customize my response to you.
    app.use((req, res) => {
      res.status(404).send('There are no spells here for that URL srry try again!');
    });

    // error handling middleware: (err, req, res, next) => {}
    // regular middleware: (req, res, next) => {}
    app.use((err, req, res, next) => {
      console.log('I am in error handling middleware', err.status);
      // res.send('You have an error');
      const status = err.status || 500;
      res.status(status).send(err.message);
    })

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
