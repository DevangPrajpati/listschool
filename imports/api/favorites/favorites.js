import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Favorites = new Mongo.Collection('Favorites');

Favorites.schema = new SimpleSchema({
  user: {
    type: String,
    label: 'The id of the user.',
    regEx: SimpleSchema.RegEx.Id,
  },
  school: {
    type: String,
    label: 'The id of the school.',
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  course: {
    type: String,
    label: 'The id of the course.',
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
});

Favorites.attachSchema(Favorites.schema);

Factory.define('favorite', Favorites, {
  user: () => Factory.get('user'),
  school: () => Factory.get('school'),
  course: () => Factory.get('course'),
});
