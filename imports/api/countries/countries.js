import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';

export const Countries = new Mongo.Collection('Countries');

export const CountryProfileSchema = new SimpleSchema({
  currency: {
    type: String,
    label: 'The currency of the country.',
  }, 
  vaccines: {
    type: String,
    label: 'What vaccines the country needs.',
  },
  visa: {
    type: Boolean,
    label: 'What kind of visa the country needs.',
  },
});


Countries.schema = new SimpleSchema({
  name: {
    type: String,
    unique: true,
    label: 'The name of the country.',
  },
  profile: {
    type: CountryProfileSchema,
  },
});

Countries.attachSchema(Countries.schema);

Factory.define('country', Countries, {
  name: () => faker.address.country(),
  profile: () => (
    {
      currency: faker.finance.currencyCode(),
      vaccines: faker.hacker.phrase(),
      visa: faker.random.boolean(),
    }
  ),
});
