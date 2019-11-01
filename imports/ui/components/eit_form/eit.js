import { Eits } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';

import './eit.html';

import '../../../startup/client/routes';

Template.eit.onCreated(function() {
  Meteor.subscribe('eits.all');
});

Template.eit.helpers({
  eits() {
    return Eits.find({}, { sort: { createdAt: -1 } });
  },
});

Template.eit.events({
  // add EIT
  'submit .eit-add'(event) {
    event.preventDefault();

    // collect form data
    let target = event.target;
    let firstname = target.firstname;
    let surname = target.surname;
    let country = target.country;
    let age = target.age;

    // add EIT data to db
    Meteor.call(
      'eits.insert',
      firstname.value,
      surname.value,
      country.value,
      age.value,
    );

    // clear form
    firstname.value = '';
    surname.value = '';
    country.value = '';
    age.value = '';
  },

  // delete EIT
  'click .delete'() {
    event.preventDefault(event);
    Meteor.call('eits.remove', this._id, this.editor);
  },

  // select multiple EITs
  'click .toggle-checked'() {
    Meteor.call('eits.setChecked', this._id, !this.checked);
  },

  // delete multiple EITs
  'click .bulk-delete'() {
    Meteor.call('eits.bulkDelete');
  },

  'click .edit-btn'() {
    Meteor.call('eits.edit', id);
  },
});
