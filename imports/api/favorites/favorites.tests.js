/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-underscore-dangle */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Favorites } from './favorites';
import { insertFavorite, removeFavorite } from './methods';

describe('Favorites collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Favorites, 'object');
  });
});

describe('Favorites methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a favorite into the Favorites collection', function () {
    const user = Factory.create('user');
    const school = Factory.create('school');

    const methodInvocation = { userId: user._id };
    const args = { school: school._id };
    insertFavorite._execute(methodInvocation, args);

    const getFavorite = Favorites.findOne({ user: user._id });
    assert.equal(getFavorite.user, user._id);
    assert.equal(getFavorite.school, school._id);
  });

  it('removes a favorite from the Favorites collection', function () {
    const favorite = Factory.create('favorite');

    const methodInvocation = { userId: favorite.user };
    const args = { _id: favorite._id };

    removeFavorite._execute(methodInvocation, args);
    const getFavorite = Favorites.findOne(favorite._id);
    assert.equal(getFavorite, undefined);
  });
});
