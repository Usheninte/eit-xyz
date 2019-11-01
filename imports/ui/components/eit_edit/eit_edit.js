import { Eits } from '/imports/api/links/links.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Meteor } from 'meteor/meteor';

import './eit_edit.html';

import '../../../startup/client/routes';

Template.eit_edit.helpers({
  setEdit() {
    let id = FlowRouter.getParam('id');
    return Eits.findOne({ _id: id });
  },
});

Template.eit_edit.events({
  // delete EIT
  'click .delete'() {
    event.preventDefault(event);
    let id = FlowRouter.getParam('id');
    Meteor.call('eits.remove', id, this.editor);
  },

  // edit specific EIT
  'submit .eit-update'(event) {
    event.preventDefault();

    // collect form data
    let target = event.target;
    let firstname = target.firstname.value;
    let surname = target.surname.value;
    let country = target.country.value;
    let age = target.age.value;

    let id = FlowRouter.getParam('id');

    Meteor.call('eits.update', id, firstname, surname, country, age);
  },
});
