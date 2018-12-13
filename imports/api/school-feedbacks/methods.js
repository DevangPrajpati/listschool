/* eslint-disable no-param-reassign */

import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { SchoolFeedbacks, SchoolGradeSchema } from './school-feedbacks';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';

export const insertSchoolFeedback = new ValidatedMethod({
  name: 'schoolFeedbacks.insert',
  validate: new SimpleSchema({
    school: { type: String },
    grades: { type: SchoolGradeSchema },
    comment: { type: String, optional: true },
  }).validator(),
  run(schoolFeedback) {
    if (!this.userId) {
      throw new Meteor.Error('schoolFeedbacks.insert.notLoggedIn',
                             'Must be logged in to insert a schoolFeedback.');
    }

    if (SchoolFeedbacks.findOne({ user: this.userId, school: schoolFeedback.school })) {
      throw new Meteor.Error('schoolFeedbacks.insert.repeatedFeedback',
                             'You can give just one feedback per school.');
    }

    schoolFeedback.user = this.userId;
    SchoolFeedbacks.insert(schoolFeedback);
  },
});

export const updateSchoolFeedback = new ValidatedMethod({
  name: 'schoolFeedbacks.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.grades': { type: SchoolGradeSchema, optional: true },
    'update.comment': { type: String, optional: true },
  }).validator(),
  run({ _id, update }) {
    const schoolFeedback = SchoolFeedbacks.findOne(_id);

    if (schoolFeedback.user !== this.userId) {
      throw new Meteor.Error('schoolFeedbacks.update.accessDenied',
                             'You don\'t have permission to edit this schoolFeedback.');
    }

    SchoolFeedbacks.update(_id, { $set: update });
  },
});

export const removeSchoolFeedback = new ValidatedMethod({
  name: 'schoolFeedbacks.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    const schoolFeedback = SchoolFeedbacks.findOne(_id);

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      if (schoolFeedback.user !== this.userId) {
        throw new Meteor.Error('schoolFeedbacks.remove.accessDenied',
                               'You don\'t have permission to remove this schoolFeedback.');
      }
    }

    SchoolFeedbacks.remove(_id);
  },
});
