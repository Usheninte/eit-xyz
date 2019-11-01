// Tests for methods
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { assert } from 'chai';
import { Eits } from './links.js';
import './methods.js';

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

      const addEit = Meteor.server.method_handlers.eits;

      addEit.apply(invocation, [eitId]);

      assert.equal(Eits.find().count(), 2);
    });
  });
}
