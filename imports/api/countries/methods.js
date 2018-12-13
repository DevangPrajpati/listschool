import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Countries, CountryProfileSchema } from './countries';
import { Cities } from '../cities/cities';

export const insertCountry = new ValidatedMethod({
  name: 'countries.insert',
  validate: new SimpleSchema({
    name: { type: String },
    profile: { type: CountryProfileSchema },
  }).validator(),
  run(country) {
    if (!this.userId) {
      throw new Meteor.Error('countries.insert.notLoggedIn',
                             'Must be logged in to insert a country.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('countries.insert.accessDenied',
                             'Must be admin to insert a country.');
    }

    Countries.insert(country);
  },
});

export const updateCountry = new ValidatedMethod({
  name: 'countries.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.name': { type: String, optional: true },
    'update.profile': { type: CountryProfileSchema, optional: true },
  }).validator(),
  run({ _id, update }) {
    if (!this.userId) {
      throw new Meteor.Error('countries.update.notLoggedIn',
                             'Must be logged in to insert a country.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('countries.update.accessDenied',
                             'Must be admin to insert a country.');
    }

    Countries.update(_id, { $set: update });
  },
});

export const removeCountry = new ValidatedMethod({
  name: 'countries.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('countries.update.notLoggedIn',
                             'Must be logged in to insert a country.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('countries.update.accessDenied',
                             'Must be admin to insert a country.');
    }

    if (Cities.findOne({ country: _id })) {
      throw new Meteor.Error('cities.remove.countryConstraint',
                             'Before remove the country you must ' +
                             'remove all cities of that country.');
    }

    Countries.remove(_id);
  },
});
