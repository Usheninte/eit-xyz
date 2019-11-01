// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
// import { FlowRouter } from 'meteor/kadira:flow-router';
import { Eits } from './links.js';

Meteor.methods({
  'eits.insert'(firstname, surname, country, age) {
    if (!this.userId) {
      throw new Meteor.Error('Permission denied: can not insert.');
    }

    check(firstname, String);
    check(surname, String);
    check(country, String);
    check(age, String);

    return Eits.insert({
      firstname,
      surname,
      country,
      age,
      createdAt: new Date(),
      editor: this.userId,
    });
  },

  'eits.remove'(_id, editor) {
    if (this.userId !== editor) {
      throw new Meteor.Error('Permission denied: can not delete.');
    }

    return Eits.remove({
      _id,
    });
  },

  'eits.setChecked'(_id, checked) {
    return Eits.update(_id, {
      $set: { checked: checked },
    });
  },

  'eits.bulkDelete'() {
    const checkedEits = Eits.find({ checked: true }).fetch();

    checkedEits.forEach(function(selected) {
      Eits.remove(selected._id);
    });
  },

  'eits.edit'(_id, editor, firstname, surname, country, age) {
    if (!this.userId) {
      throw new Meteor.Error('Permission denied: can not edit.');
    }

    Eits.update(_id, {
      $set: {
        firstname: firstname,
        surname: surname,
        country: country,
        age: age,
      },
    });
  },
});
