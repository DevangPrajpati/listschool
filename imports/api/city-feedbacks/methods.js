/* eslint-disable no-param-reassign */

import { Meteor } from 'meteor/meteor';
import { CityFeedbacks, CityGradeSchema } from './city-feedbacks';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertCityFeedback = new ValidatedMethod({
  name: 'cityFeedbacks.insert',
  validate: new SimpleSchema({
    city: { type: String },
    grades: { type: CityGradeSchema },
  }).validator(),
  run(cityFeedback) {
    if (!this.userId) {
      throw new Meteor.Error('cityFeedbacks.insert.notLoggedIn',
                             'Must be logged in to insert a cityFeedback.');
    }

    cityFeedback.user = this.userId;
    CityFeedbacks.insert(cityFeedback);
  },
});

export const updateCityFeedback = new ValidatedMethod({
  name: 'cityFeedbacks.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.grades': { type: CityGradeSchema, optional: true },
  }).validator(),
  run({ _id, update }) {
    const cityFeedback = CityFeedbacks.findOne(_id);

    if (cityFeedback.user !== this.userId) {
      throw new Meteor.Error('cityFeedbacks.update.accessDenied',
                             'You don\'t have permission to edit this cityFeedback.');
    }

    CityFeedbacks.update(_id, { $set: update });
  },
});

export const removeCityFeedback = new ValidatedMethod({
  name: 'cityFeedbacks.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const cityFeedback = CityFeedbacks.findOne(_id);

    if (cityFeedback.user !== this.userId) {
      throw new Meteor.Error('cityFeedbacks.remove.accessDenied',
                             'You don\'t have permission to remove this cityFeedback.');
    }

    CityFeedbacks.remove(_id);
  },
});
