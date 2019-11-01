// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Eits } from '../links.js';

Meteor.publish('eits.all', () => {
  return Eits.find();
});
