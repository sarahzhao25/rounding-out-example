const { db, Student, House } = require('./db');

const students = [
  {
      name: 'Harry Potter',
      patronus: 'stag',
      pet: 'Hedwig the snowy owl'
  }, {
      name: 'Cedric Diggory',
      patronus: 'non-corporeal',
      pet: 'All of his adoring fans'
  },
  {
      name: 'Hermione Granger',
      patronus: 'otter',
      pet: 'Crookshanks the grumpy cat'
  },
  {
      name: 'Ronald Weasley',
      patronus: 'dog',
      pet: 'Scabbers the rat man'
  },
  {
      name: 'Neville Longbottom',
      patronus: 'non-corporeal',
      pet: 'Trevor the terrified toad'
  },
  {
      name: 'Luna Lovegood',
      patronus: 'hare',
  },
  {
      name: 'Ginny Weasley',
      patronus: 'horse',
      pet: 'Pigwidgeon the pesty owl'
  },
  {
      name: 'Draco Malfoy',
      patronus: ':(',
      pet: 'Unnamed Owl'
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
    const newHouses = await Promise.all(houses.map(house => House.create(house)));
    console.log(`${newHouses.length} houses have been created! Let the sorting begin!`);
    const newStudents = await Promise.all(students.map(student => Student.create(student)));
    console.log(`${newStudents.length} wizards have been created! Let the spells cast!`);
    await Promise.all(newHouses.map(house => house.addStudent(newStudents[Math.floor(Math.random() * newStudents.length)])));
    await Promise.all(newStudents.map(student => student.addHouse(newHouses[Math.floor(Math.random() * newHouses.length)])));
    console.log('I have seeded my new many to many associations!');
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
