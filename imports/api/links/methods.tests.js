// Tests for methods
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Eits } from './links.js';
import './methods.js';
import './server/publications';

if (Meteor.isServer) {
  describe('Eits database methods', () => {
    let userId = Random.id();
    const username = 'userzero';

    before(() => {
      // Create user if not already created
      let user = Meteor.users.findOne({ username: username });
      if (!user) {
        userId = Accounts.createUser({
          username: username,
          email: 'poi@yut.com',
          password: '1234567890',
        });
      } else {
        userId = userId;
      }
    });

    beforeEach(() => {
      Eits.remove({});
      eitId = Eits.insert({
        firstname: 'Gordon',
        surname: 'Norman',
        country: 'Kenya',
        age: '34',
        createdAt: new Date(),
        editor: userId,
      });
    });

    it('Can view all Eits', () => {
      const userId = Random.id();
      Eits.insert({
        firstname: 'Ahmed',
        surname: 'Samir',
        country: 'Ivory Coast',
        age: '27',
        createdAt: new Date(),
        editor: userId,
      });

      const invocation = { userId };
      const eitsPublication = Meteor.server.publish_handlers['eits.all'];

      EitsPub = eitsPublication.apply(invocation);

      assert.equal(EitsPub.count(), 2);
    });

    it('Can add EIT', () => {
      const invocation = { userId };

      const addEit = Meteor.server.method_handlers['eits.insert'];
      let firstname = 'Adam';
      let surname = 'Abel';
      let country = 'Ethiopia';
      let age = '34';

      addEit.apply(invocation, [firstname, surname, country, age]);

      assert.equal(Eits.find().count(), 2);
    });

    it('Can not add EIT if not logged in', () => {
      const invocation = {};

      const addEit = Meteor.server.method_handlers['eits.insert'];
      let firstname = 'Adam';
      let surname = 'Abel';
      let country = 'Ethiopia';
      let age = '34';

      assert.throws(
        function() {
          addEit.apply(invocation, [firstname, surname, country, age]);
        },
        Meteor.Error,
        'Permission denied: can not insert.',
      );

      assert.equal(Eits.find().count(), 1);
    });

    it('Can edit EIT', () => {
      const invocation = { userId };

      const editEit = Meteor.server.method_handlers['eits.edit'];
      let firstname = 'Adamu';
      let surname = 'Usmail';
      let country = 'Sudan';
      let age = '24';
      let editor = userId;

      editEit.apply(invocation, [firstname, surname, country, age]);

      assert.equal(Eits.find().count(), 1);
    });

    it('Can not edit EIT is not logged in', () => {
      const invocation = {};

      const editEit = Meteor.server.method_handlers['eits.edit'];
      let firstname = 'Adamu';
      let surname = 'Usmail';
      let country = 'Sudan';
      let age = '24';
      let editor;

      assert.throws(
        function() {
          editEit.apply(invocation, [firstname, surname, country, age, editor]);
        },
        Meteor.Error,
        'Permission denied: can not edit.',
      );

      assert.equal(Eits.find().count(), 1);
    });

    it('Can delete EIT', () => {
      const invocation = { userId };

      const deleteEit = Meteor.server.method_handlers['eits.remove'];
      let editor = userId;

      deleteEit.apply(invocation, [eitId, editor]);

      assert.equal(Eits.find().count(), 0);
    });

    it('Can not delete EIT if not logged in', () => {
      const invocation = {};

      const deleteEit = Meteor.server.method_handlers['eits.remove'];
      let editor;

      assert.throws(
        function() {
          deleteEit.apply(invocation, [eitId, editor]);
        },
        Meteor.Error,
        'Permission denied: can not delete.',
      );

      assert.equal(Eits.find().count(), 1);
    });
  });
}
