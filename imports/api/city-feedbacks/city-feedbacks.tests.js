/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-underscore-dangle */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { CityFeedbacks } from './city-feedbacks';
import { insertCityFeedback, updateCityFeedback, removeCityFeedback } from './methods';
import { EJSON } from 'meteor/ejson';

describe('CityFeedbacks collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof CityFeedbacks, 'object');
  });
});

describe('CityFeedbacks methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a cityFeedback into the CityFeedbacks collection', function () {
    const user = Factory.create('user');
    const city = Factory.create('city');
    const grades = {
      accessibility: 1,
      cost: 1,
      food: 1,
      historical: 1,
      leisure: 1,
      lgbt: 1,
      nightlife: 1,
      transport: 1,
      life: 1,
      racial: 1,
      security: 1,
      shopping: 1,
      women: 1,
    };

    const methodInvocation = { userId: user._id };
    const args = {
      city: city._id,
      grades,
    };

    insertCityFeedback._execute(methodInvocation, args);

    const getCityFeedback = CityFeedbacks.findOne({ user: user._id });
    assert.equal(getCityFeedback.user, user._id);
    assert.equal(getCityFeedback.city, city._id);
    assert.equal(EJSON.stringify(getCityFeedback.grades), EJSON.stringify(grades));
  });

  it('updates a cityFeedback in the CityFeedbacks collection', function () {
    const cityFeedback = Factory.create('cityFeedback');
    const grades = {
      accessibility: 1,
      cost: 1,
      food: 1,
      historical: 1,
      leisure: 1,
      lgbt: 1,
      nightlife: 1,
      transport: 1,
      life: 1,
      racial: 1,
      security: 1,
      shopping: 1,
      women: 1,
    };

    const methodInvocation = { userId: cityFeedback.user };
    const args = {
      _id: cityFeedback._id,
      update: {
        grades,
      },
    };

    updateCityFeedback._execute(methodInvocation, args);

    const getCityFeedback = CityFeedbacks.findOne(cityFeedback._id);
    assert.equal(EJSON.stringify(getCityFeedback.grades), EJSON.stringify(grades));
  });

  it('removes a cityFeedback from the CityFeedbacks collection', function () {
    const cityFeedback = Factory.create('cityFeedback');

    const methodInvocation = { userId: cityFeedback.user };
    const args = { _id: cityFeedback._id };

    removeCityFeedback._execute(methodInvocation, args);
    const getCityFeedback = CityFeedbacks.findOne(cityFeedback._id);
    assert.equal(getCityFeedback, undefined);
  });
});
