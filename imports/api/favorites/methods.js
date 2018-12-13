/* eslint-disable no-param-reassign */

import { Meteor } from 'meteor/meteor';
import { Favorites } from './favorites';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertFavorite = new ValidatedMethod({
  name: 'favorites.insert',
  validate: new SimpleSchema({
    school: { type: String, optional: true },
    course: { type: String, optional: true },
  }).validator(),
  run(favorite) {
    if (!this.userId) {
      throw new Meteor.Error('favorites.insert.notLoggedIn',
                             'Must be logged in to insert a favorite.');
    }

    favorite.user = this.userId;

    Favorites.insert(favorite);
  },
});

export const removeFavorite = new ValidatedMethod({
  name: 'favorites.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const favorite = Favorites.findOne(_id);

    if (favorite.user !== this.userId) {
      throw new Meteor.Error('favorite.remove.accessDenied',
                             'You don\'t have permission to remove this favorite.');
    }

    Favorites.remove(_id);
  },
});
