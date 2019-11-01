// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Eits } from '../../api/links/links.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Eits.find().count() === 0) {
    const data = [
      {
        firstname: 'Wisteria',
        surname: 'Ravenclaw',
        country: 'Namibia',
        age: '21',
        createdAt: new Date(),
      },
      {
        firstname: 'Gordon',
        surname: 'Norman',
        country: 'Kenya',
        age: '34',
        createdAt: new Date(),
      },
      {
        firstname: 'Pars',
        surname: 'Montan',
        country: 'Niger',
        age: '24',
        createdAt: new Date(),
      },
      {
        firstname: 'Ahmed',
        surname: 'Samir',
        country: 'Ivory Coast',
        age: '27',
        createdAt: new Date(),
      },
    ];

    data.forEach(eits => Eits.insert(eits));
  }
});
