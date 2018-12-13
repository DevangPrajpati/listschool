/* eslint-env mocha */
/* eslint-disable func-names, prefer-arrow-callback, no-underscore-dangle */

import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { resetDatabase } from 'meteor/xolvio:cleaner';
import { Factory } from 'meteor/dburles:factory';
import { SchoolFeedbacks } from './school-feedbacks';
import { insertSchoolFeedback, updateSchoolFeedback, removeSchoolFeedback } from './methods';
import { EJSON } from 'meteor/ejson';

describe('SchoolFeedbacks collection', function () {
  it('registers the collection with Mongo properly', function () {
    assert.equal(typeof SchoolFeedbacks, 'object');
  });
});

describe('SchoolFeedbacks methods', function () {
  beforeEach(function () {
    if (Meteor.isServer) {
      resetDatabase();
    }
  });

  it('inserts a schoolFeedback into the SchoolFeedbacks collection', function () {
    const user = Factory.create('user');
    const school = Factory.create('school');
    const grades = {
      facilities: 1,
      teachers: 2,
      activities: 3,
      location: 4,
      cost: 5,
      books: 1,
      enrollment: 2,
    };

    const methodInvocation = { userId: user._id };
    const args = {
      school: school._id,
      grades,
      comment: 'Fake comment',
    };

    insertSchoolFeedback._execute(methodInvocation, args);

    const getSchoolFeedback = SchoolFeedbacks.findOne({ user: user._id });
    assert.equal(getSchoolFeedback.user, user._id);
    assert.equal(getSchoolFeedback.school, school._id);
    assert.equal(EJSON.stringify(getSchoolFeedback.grades), EJSON.stringify(grades));
  });

  it('updates a schoolFeedback in the SchoolFeedbacks collection', function () {
    const schoolFeedback = Factory.create('schoolFeedback');
    const grades = {
      facilities: 1,
      teachers: 2,
      activities: 3,
      location: 4,
      cost: 5,
      books: 1,
      enrollment: 2,
    };

    const methodInvocation = { userId: schoolFeedback.user };
    const args = {
      _id: schoolFeedback._id,
      update: {
        grades,
        comment: 'Fake comment',
      },
    };

    updateSchoolFeedback._execute(methodInvocation, args);

    const getSchoolFeedback = SchoolFeedbacks.findOne(schoolFeedback._id);
    assert.equal(EJSON.stringify(getSchoolFeedback.grades), EJSON.stringify(grades));
  });

  it('removes a schoolFeedback from the SchoolFeedbacks collection', function () {
    const schoolFeedback = Factory.create('schoolFeedback');

    const methodInvocation = { userId: schoolFeedback.user };
    const args = { _id: schoolFeedback._id };

    removeSchoolFeedback._execute(methodInvocation, args);
    const getSchoolFeedback = SchoolFeedbacks.findOne(schoolFeedback._id);
    assert.equal(getSchoolFeedback, undefined);
  });
});
