import faker from 'faker';
import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';

export const SchoolFeedbacks = new Mongo.Collection('SchoolFeedbacks');

export const SchoolGradeSchema = new SimpleSchema({
  qualityOfTeaching: {
    type: Number,
    min: 1,
    max: 5,
  },
  teachingMaterial: {
    type: Number,
    min: 1,
    max: 5,
  },
  schoolFacilities: {
    type: Number,
    min: 1,
    max: 5,
  },
  socialExtraActivities: {
    type: Number,
    min: 1,
    max: 5,
  },
  schoolLocation: {
    type: Number,
    min: 1,
    max: 5,
  },
  housing: {
    type: Number,
    min: 1,
    max: 5,
  }
});

SchoolFeedbacks.schema = new SimpleSchema({
  user: {
    type: String,
    label: 'The id of the user.',
    regEx: SimpleSchema.RegEx.Id,
  },
  school: {
    type: String,
    label: 'The id of the school.',
    regEx: SimpleSchema.RegEx.Id,
  },
  grades: {
    type: SchoolGradeSchema,
  },
  comment: {
    type: String,
    optional: true,
  },
});

SchoolFeedbacks.attachSchema(SchoolFeedbacks.schema);

Factory.define('schoolFeedback', SchoolFeedbacks, {
  user: () => Factory.get('user'),
  school: () => Factory.get('school'),
  grades: () => (
    {
      qualityOfTeaching: 1 + (faker.random.number() % 5),
      teachingMaterial: 1 + (faker.random.number() % 5),
      schoolFacilities: 1 + (faker.random.number() % 5),
      socialExtraActivities: 1 + (faker.random.number() % 5),
      schoolLocation: 1 + (faker.random.number() % 5),
      housing: 1 + (faker.random.number() % 5),
    }
  ),
  comment: () => faker.hacker.phrase(),
});
