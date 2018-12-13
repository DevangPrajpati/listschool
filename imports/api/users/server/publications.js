import { Meteor } from 'meteor/meteor';
import { Users } from '../users';

Meteor.publish('users', () => Users.find({}, {
  fields: { profile: 1 },
}));

Meteor.publish('adminUsers', () => Users.find());
