/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-underscore-dangle */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Cities } from './cities';
import { insertCity, updateCity, removeCity } from './methods';
import { EJSON } from 'meteor/ejson';

describe('Cities collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Cities, 'object');
  });
});

describe('Cities methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a city into the Cities collection', function () {
    const user = Factory.create('user_admin');
    const country = Factory.create('country');
    const profile = {
      small: false,
      town: false,
      beach: false,
      large: false,
      campus: false,
      bicycle: false,
      sports: false,
      snow: false,
      sunny: false,
      glamour: false,
      outdoors: false,
      academic: false,
      countryside: false,
      mountain: false,
      minimum_wage: 'http://listaschool.com',
      current_time: 'http://listaschool.com',
      cosft_of_life: 'http://listaschool.com',
      wheather: 'http://listaschool.com',
      youtube: 'http://listaschool.com',
    };

    const methodInvocation = { userId: user._id };
    const args = {
      name: 'Sao Paulo',
      country: country._id,
      profile,
    };

    insertCity._execute(methodInvocation, args);

    const getCity = Cities.findOne({ name: 'Sao Paulo' });
    assert.equal(getCity.name, 'Sao Paulo');
    assert.equal(getCity.country, country._id);
    assert.equal(EJSON.stringify(getCity.profile), EJSON.stringify(profile));
  });

  it('updates a city in the Cities collection', function () {
    const user = Factory.create('user_admin');
    const { _id } = Factory.create('city');
    const profile = {
      small: false,
      town: false,
      beach: false,
      large: false,
      campus: false,
      bicycle: false,
      sports: false,
      snow: false,
      sunny: false,
      glamour: false,
      outdoors: false,
      academic: false,
      countryside: false,
      mountain: false,
      minimum_wage: 'http://listaschool.com',
      current_time: 'http://listaschool.com',
      cosft_of_life: 'http://listaschool.com',
      wheather: 'http://listaschool.com',
      youtube: 'http://listaschool.com',
    };

    const methodInvocation = { userId: user._id };
    const args = {
      _id,
      update: {
        name: 'Sao Paulo',
        profile,
      },
    };

    updateCity._execute(methodInvocation, args);

    const getCity = Cities.findOne(_id);
    assert.equal(getCity.name, 'Sao Paulo');
    assert.equal(EJSON.stringify(getCity.profile), EJSON.stringify(profile));
  });

  it('removes a city from the Cities collection', function () {
    const user = Factory.create('user_admin');
    const { _id } = Factory.create('city');

    const methodInvocation = { userId: user._id };
    const args = { _id };

    removeCity._execute(methodInvocation, args);
    const getCity = Cities.findOne(_id);
    assert.equal(getCity, undefined);
  });
});
