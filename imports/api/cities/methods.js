import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Cities, CityProfileSchema } from './cities';
import { Schools } from '../schools/schools';

export const insertCity = new ValidatedMethod({
  name: 'cities.insert',
  validate: new SimpleSchema({
    name: { type: String },
    country: { type: String },
    profile: { type: CityProfileSchema },
  }).validator(),
  run(city) {
    if (!this.userId) {
      throw new Meteor.Error('cities.insert.notLoggedIn',
                             'Must be logged in to insert a city.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('cities.insert.accessDenied',
                             'Must be admin to insert a city.');
    }

    Cities.insert(city);
  },
});

export const updateCity = new ValidatedMethod({
  name: 'cities.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.name': { type: String, optional: true },
    'update.profile': { type: CityProfileSchema, optional: true },
  }).validator(),
  run({ _id, update }) {
    if (!this.userId) {
      throw new Meteor.Error('cities.update.notLoggedIn',
                             'Must be logged in to update a city.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('cities.update.accessDenied',
                             'Must be admin to update a city.');
    }

    Cities.update(_id, { $set: update });
  },
});

export const removeCity = new ValidatedMethod({
  name: 'cities.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('cities.remove.notLoggedIn',
                             'Must be remove in to insert a city.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('cities.remove.accessDenied',
                             'Must be admin to remove a city.');
    }

    if (Schools.findOne({ cityId: _id })) {
      throw new Meteor.Error('cities.remove.schoolConstraint',
                             'Before remove the city you must remove all schools of that city.');
    }

    Cities.remove(_id);
  },
});
