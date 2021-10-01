const { db, Student, House } = require('./db');

const students = [
  {
      name: 'Harry Potter',
      patronus: 'stag',
      pet: 'Hedwig the snowy owl',
      houseId: 1
  }, {
      name: 'Cedric Diggory',
      patronus: 'non-corporeal',
      pet: 'All of his adoring fans',
      houseId: 2
  },
  {
      name: 'Hermione Granger',
      patronus: 'otter',
      pet: 'Crookshanks the grumpy cat',
      houseId: 1
  },
  {
      name: 'Ronald Weasley',
      patronus: 'dog',
      pet: 'Scabbers the rat man',
      houseId: 1
  },
  {
      name: 'Neville Longbottom',
      patronus: 'non-corporeal',
      pet: 'Trevor the terrified toad',
      houseId: 1
  },
  {
      name: 'Luna Lovegood',
      patronus: 'hare',
      houseId: 3
  },
  {
      name: 'Ginny Weasley',
      patronus: 'horse',
      pet: 'Pigwidgeon the pesty owl',
      houseId: 1
  },
  {
      name: 'Draco Malfoy',
      patronus: ':(',
      pet: 'Unnamed Owl',
      houseId: 4
  }
];

const houses = [
  {
      name: 'Gryffindor',
      points: 0,
      colorPrimary: 'scarlet',
      colorSecondary: 'gold',
      ghost: 'Nearly Headless Nick'
  },
  {
      name: 'Hufflepuff',
      points: 20,
      colorPrimary: 'yellow',
      colorSecondary: 'black',
      ghost: 'The Fat Friar'
  },
  {
      name: 'Ravenclaw',
      points: 100,
      colorPrimary: 'blue',
      colorSecondary: 'bronze',
      ghost: 'The Grey Lady '
  },
  {
      name: 'Slytherin',
      points: 500,
      colorPrimary: 'green',
      colorSecondary: 'silver',
      ghost: 'The Bloody Baron'
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    await Promise.all(houses.map(house => House.create(house)));
    console.log(`${houses.length} houses have been created! Let the sorting begin!`);
    await Promise.all(students.map(student => Student.create(student)));
    console.log(`${students.length} wizards have been created! Let the spells cast!`);
    console.log('I am done seeding! Let the wizarding begin!');
  } catch (e) {
    console.log('There was an error seeding!');
    console.error(e);
  }
}

seed()
  .then(() => db.close())
  .catch(err => {
    console.error('Problem seeding:', err)
    db.close();
});
