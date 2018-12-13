import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SchoolCoursesSchema, SchoolProfileSchema, Schools} from './schools';
import {SchoolFeedbacks} from '../school-feedbacks/school-feedbacks';
import {SchoolCourses} from '../school-courses/school-courses';
import {Favorites} from '../favorites/favorites';
import GoogleSpreadsheetsHelper from '/imports/modules/google-spreadsheets-helper';


export const insertSchool = new ValidatedMethod({
  name: 'schools.insert',
  validate: new SimpleSchema({
    name: { type: String },
    description: { type: String },
    cityId: { type: String },
    accommodations: { type: [String], regEx: SimpleSchema.RegEx.Id },
    schoolCourses: { type: [SchoolCoursesSchema]},
    facilities: { type: [String], regEx: SimpleSchema.RegEx.Id},
    profile: { type: SchoolProfileSchema, optional: true },
  }).validator(),
  run(school) {
    if (!this.userId) {
      throw new Meteor.Error('schools.insert.notLoggedIn',
                             'Must be logged in to insert a school.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('schools.insert.accessDenied',
                             'Must be admin to insert a school.');
    }

    Schools.insert(school);
  },
});

export const updateSchool = new ValidatedMethod({
  name: 'schools.update',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.name': { type: String },
    'update.description': { type: String},
    'update.accommodations': { type: [String], regEx: SimpleSchema.RegEx.Id },
    'update.schoolCourses': { type: [SchoolCoursesSchema]},
    'update.facilities': { type: [String], regEx: SimpleSchema.RegEx.Id},
    'update.profile': { type: SchoolProfileSchema, optional: true },
  }).validator(),
  run({ _id, update }) {
    if (!this.userId) {
      throw new Meteor.Error('schools.update.notLoggedIn',
                             'Must be logged in to update a school.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('schools.update.accessDenied',
                             'Must be admin to update a school.');
    }

    Schools.update(_id, { $set: update });
  },
});
export const updateSchoolCoursePricesWithNewCourse = new ValidatedMethod({
  name: 'schools.updateSchoolCoursePricesWithNewCourse',
  validate: new SimpleSchema({
    _id: { type: String },
    'update.course': { type: String, optional: false },
  }).validator(),
  run(courseOld, courseNew) {
    if (!this.userId) {
      throw new Meteor.Error('schools.updateSchoolCoursePricesWithNewCourse.notLoggedIn',
        'Must be logged in to update a school.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('schools.updateSchoolCoursePricesWithNewCourse.accessDenied',
        'Must be admin to update a school.');
    }

    let schools = Schools.findAll({});
    schools.forEach(school => {
      let schoolCourses = school.schoolCourses;
      if (schoolCourses != undefined) {
        let schoolCoursesUpdated = schoolCourses.map(schoolCourse => {
          if (schoolCourse.course === courseOld) {
            schoolCourse.course = courseNew;
          }
          return schoolCourse;
        });
        Schools.update(school._id, {
          $set: {
            schoolCourses: schoolCoursesUpdated,
          }
        });
      }
    })
  },
});
export const removeSchool = new ValidatedMethod({
  name: 'schools.remove',
  validate: new SimpleSchema({
    _id: { type: String },
  }).validator(),
  run({ _id }) {
    if (!this.userId) {
      throw new Meteor.Error('schools.remove.notLoggedIn',
                             'Must be logged in to remove a school.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('schools.remove.accessDenied',
                             'Must be admin to remove a school.');
    }

    const school = Schools.findOne(_id)
    if (school && school.schoolCourses && school.schoolCourses.length) {
      school.schoolCourses.map(schoolCourse=>{
        if (schoolCourse.course) {
          SchoolCourses.remove(schoolCourse.course)
        }
      })
    }

    SchoolFeedbacks.find({ school: _id }).fetch().map((schoolFeedback) => (
      SchoolFeedbacks.remove(schoolFeedback._id)
    ));

    Favorites.find({ school: _id }).fetch().map((favorite) => (
      Favorites.remove(favorite._id)
    ));

    Schools.remove(_id);
  },
});

export const downloadSchools = new ValidatedMethod({
  name: 'schools.download',
  validate: new SimpleSchema().validator(),
  run() {
    if (!this.userId) {
      throw new Meteor.Error('schools.download.notLoggedIn',
                             'Must be logged in to download the schools.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('schools.download.accessDenied',
                             'Must be admin to download the schools.');
    }

    if (Meteor.isServer) {
      GoogleSpreadsheetsHelper.pullAllSchools();
    }
  },
});

export const uploadSchools = new ValidatedMethod({
  name: 'schools.upload',
  validate: new SimpleSchema().validator(),
  run() {
    if (!this.userId) {
      throw new Meteor.Error('schools.upload.notLoggedIn',
                             'Must be logged in to upload the schools.');
    }

    if (!Roles.userIsInRole(this.userId, ['admin'], Roles.GLOBAL_GROUP)) {
      throw new Meteor.Error('schools.upload.accessDenied',
                             'Must be admin to upload the schools.');
    }

    if (Meteor.isServer) {
      GoogleSpreadsheetsHelper.writeAllSchools();
    }
  },
});
