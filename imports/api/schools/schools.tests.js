/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-underscore-dangle */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { Schools } from './schools';
import { insertSchool, updateSchool, removeSchool } from './methods';
import { EJSON } from 'meteor/ejson';

describe('Schools collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof Schools, 'object');
  });
});

describe('Schools methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a school into the Schools collection', function () {
    const user = Factory.create('user_admin');
    const city = Factory.create('city');
    const courses = {
      general: false,
      intensive: false,
      examPreparation: false,
      private: false,
      teen: false,
      senior: false,
      studyWork: false,
      volunteer: false,
      business: false,
      languagePlus: false,
      group: false,
    };
    const accommodations = {
      familyHouse: false,
      hotel: false,
      studentResidence: false,
    };
    const facilities = {
      accessibility: false,
      transfer: false,
      insurance: false,
      job_support: false,
    };
    const profile = {
      address: 'Avenida paulista, 150',
      website: 'www.listaschool.com',
      facebook: 'www.listaschool.com',
      twitter: 'www.listaschool.com',
      instagram: 'www.listaschool.com',
      currency: 'R$',
    };

    const methodInvocation = { userId: user._id };
    const args = {
      name: 'Sao Paulo',
      description: 'description',
      cityId: city._id,
      courses,
      accommodations,
      facilities,
      profile,
    };

    insertSchool._execute(methodInvocation, args);

    const getSchool = Schools.findOne({ name: 'Sao Paulo' });
    assert.equal(getSchool.name, 'Sao Paulo');
    assert.equal(getSchool.cityId, city._id);
    assert.equal(EJSON.stringify(getSchool.city.name), EJSON.stringify(city.name));
    assert.equal(EJSON.stringify(getSchool.courses), EJSON.stringify(courses));
    assert.equal(EJSON.stringify(getSchool.accommodations), EJSON.stringify(accommodations));
    assert.equal(EJSON.stringify(getSchool.facilities), EJSON.stringify(facilities));
    assert.equal(EJSON.stringify(getSchool.profile), EJSON.stringify(profile));
  });

  it('updates a school in the Schools collection', function () {
    const user = Factory.create('user_admin');
    const school = Factory.create('school');
    const cityName = school.city.name;

    const courses = {
      general: false,
      intensive: false,
      examPreparation: false,
      private: false,
      teen: false,
      senior: false,
      studyWork: false,
      volunteer: false,
      business: false,
      languagePlus: false,
      group: false,
    };
    const accommodations = {
      familyHouse: false,
      hotel: false,
      studentResidence: false,
    };
    const facilities = {
      accessibility: false,
      transfer: false,
      insurance: false,
      job_support: false,
    };
    const profile = {
      address: 'Avenida paulista, 150',
      website: 'www.listaschool.com',
      facebook: 'www.listaschool.com',
      twitter: 'www.listaschool.com',
      instagram: 'www.listaschool.com',
      currency: 'R$',
    };

    const methodInvocation = { userId: user._id };
    const args = {
      _id: school._id,
      update: {
        name: 'Hi, I\'m a School test!',
        description: 'description',
        courses,
        accommodations,
        facilities,
        profile,
      },
    };

    updateSchool._execute(methodInvocation, args);

    const getSchool = Schools.findOne(school._id);
    assert.equal(getSchool.name, 'Hi, I\'m a School test!');
    assert.equal(EJSON.stringify(getSchool.city.name), EJSON.stringify(cityName));
    assert.equal(EJSON.stringify(getSchool.courses), EJSON.stringify(courses));
    assert.equal(EJSON.stringify(getSchool.accommodations), EJSON.stringify(accommodations));
    assert.equal(EJSON.stringify(getSchool.facilities), EJSON.stringify(facilities));
    assert.equal(EJSON.stringify(getSchool.profile), EJSON.stringify(profile));
  });

  it('removes a school from the Schools collection', function () {
    const user = Factory.create('user_admin');
    const { _id } = Factory.create('school');

    const methodInvocation = { userId: user._id };
    const args = { _id };

    removeSchool._execute(methodInvocation, args);
    const getSchool = Schools.findOne(_id);
    assert.equal(getSchool, undefined);
  });
});
