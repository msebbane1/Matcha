const { Sequelize, DataTypes } = require('sequelize');
const { faker } = require('@faker-js/faker');
const sequelize = require('./db');
const User = require('./models/User');


async function createFakeUsers() {
  await sequelize.sync({ force: true });

  const allowedTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10'];

  for (let i = 0; i < 100; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const password = faker.internet.password();
    const verificationLink = faker.datatype.uuid();
    const verified = faker.datatype.boolean();
    const gender = ['homme', 'femme'][Math.floor(Math.random() * 2)];
const interest = ['homme', 'femme', 'bisexuel'][Math.floor(Math.random() * 3)];

    const tags = Array.from({ length: 5 }, () => {
  const randomIndex = Math.floor(Math.random() * allowedTags.length);
  return allowedTags[randomIndex];
});
    const age = faker.datatype.number({ min: 18, max: 100 });
    const fameRating = faker.datatype.float({ min: 0, max: 5, precision: 0.1 });
    const biography = faker.lorem.paragraph();
    const localisation = faker.address.city();

    await User.create({
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      verificationLink,
      verified,
      gender,
      interest,
      tags,
      age,
      fameRating,
      biography,
      localisation
    });
  }

  console.log('100 utilisateurs fictifs ont été créés avec succès!');
}

createFakeUsers().catch(e => console.error(e.stack));
