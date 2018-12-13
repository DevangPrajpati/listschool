/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-underscore-dangle */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Countries } from './countries';
import { insertCountry, updateCountry, removeCountry } from './methods';
import { EJSON } from 'meteor/ejson';

describe('Countries collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Countries, 'object');
  });
});

describe('Countries methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a country into the Countries collection', function () {
    const user = Factory.create('user_admin');
    const profile = {
      currency: 'BRL',
      vaccines: 'Do not need',
      visa: true,
    };

    const methodInvocation = { userId: user._id };
    const args = {
      name: 'Brazil',
      profile,
    };

    insertCountry._execute(methodInvocation, args);
    const getCountry = Countries.findOne({ name: 'Brazil' });
    assert.equal(getCountry.name, 'Brazil');
    assert.equal(EJSON.stringify(getCountry.profile), EJSON.stringify(profile));
  });

  it('updates a country in the Countries collection', function () {
    const user = Factory.create('user_admin');
    const { _id } = Factory.create('country');
    const profile = {
      currency: 'BRL',
      vaccines: 'Do not need',
      visa: true,
    };

    const methodInvocation = { userId: user._id };
    const args = {
      _id,
      update: {
        name: 'Brazil',
        profile,
      },
    };

    updateCountry._execute(methodInvocation, args);

    const getCountry = Countries.findOne(_id);
    assert.equal(getCountry.name, 'Brazil');
    assert.equal(EJSON.stringify(getCountry.profile), EJSON.stringify(profile));
  });

  it('removes a country from the Countries collection', function () {
    const user = Factory.create('user_admin');
    const { _id } = Factory.create('country');

    const methodInvocation = { userId: user._id };
    const args = { _id };

    removeCountry._execute(methodInvocation, args);
    const getCountry = Countries.findOne(_id);
    assert.equal(getCountry, undefined);
  });
});
