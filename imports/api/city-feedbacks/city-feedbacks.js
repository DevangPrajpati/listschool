import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const CityFeedbacks = new Mongo.Collection('CityFeedbacks');

export const CityGradeSchema = new SimpleSchema({
  accessibility: {
    type: Number,
    min: 1,
    max: 5,
  },
  costOfLife: {
    type: Number,
    min: 1,
    max: 5,
  },
  leisure: {
    type: Number,
    min: 1,
    max: 5,
  },
  publicTransport: {
    type: Number,
    min: 1,
    max: 5,
  },
  qualityOfLife: {
    type: Number,
    min: 1,
    max: 5,
  },
  safety: {
    type: Number,
    min: 1,
    max: 5,
  },
});

CityFeedbacks.schema = new SimpleSchema({
  user: {
    type: String,
    label: 'The id of the user.',
    regEx: SimpleSchema.RegEx.Id,
  },
  city: {
    type: String,
    label: 'The id of the city.',
    regEx: SimpleSchema.RegEx.Id,
  },
  grades: {
    type: CityGradeSchema,
  },
});

CityFeedbacks.attachSchema(CityFeedbacks.schema);

Factory.define('cityFeedback', CityFeedbacks, {
  user: () => Factory.get('user'),
  city: () => Factory.get('city'),
  grades: () => (
    {
      accessibility: 1 + (faker.random.number() % 5),
      costOfLife: 1 + (faker.random.number() % 5),
      leisure: 1 + (faker.random.number() % 5),
      publicTransport: 1 + (faker.random.number() % 5),
      qualityOfLife: 1 + (faker.random.number() % 5),
      safety: 1 + (faker.random.number() % 5),
      women: 1 + (faker.random.number() % 5),
    }
  ),
});
