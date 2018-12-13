import faker from 'faker';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { BooleanForm } from '/imports/modules/boolean-form';

export const Cities = new Mongo.Collection('Cities');

export const CityProfileSchema = new SimpleSchema({
  small: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  town: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  beach: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  large: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  campus: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  bicycle: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  sports: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  snow: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  sunny: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  glamour: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  outdoors: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  academic: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  countryside: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  mountain: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  minimum_wage: {
    type: String,
    optional: true,
  },
  current_time: {
    type: String,
    optional: true,
  },
  cosft_of_life: {
    type: String,
    optional: true,
  },
  wheather: {
    type: String,
    optional: true,
  },
  youtube: {
    type: String,
    optional: true,
  },
});

Cities.schema = new SimpleSchema({
  name: {
    type: String,
    unique: true,
  },
  country: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  profile: {
    type: CityProfileSchema,
  },
});

Cities.attachSchema(Cities.schema);

Factory.define('city', Cities, {
  name: () => faker.address.city(),
  country: () => Factory.get('country'),
  profile: () => (
    {
      small: faker.random.boolean(),
      town: faker.random.boolean(),
      beach: faker.random.boolean(),
      large: faker.random.boolean(),
      campus: faker.random.boolean(),
      bicycle: faker.random.boolean(),
      sports: faker.random.boolean(),
      snow: faker.random.boolean(),
      sunny: faker.random.boolean(),
      glamour: faker.random.boolean(),
      outdoors: faker.random.boolean(),
      academic: faker.random.boolean(),
      countryside: faker.random.boolean(),
      mountain: faker.random.boolean(),
      minimum_wage: faker.internet.url(),
      current_time: faker.internet.url(),
      cosft_of_life: faker.internet.url(),
      wheather: faker.internet.url(),
      youtube: faker.internet.url(),
    }
  ),
});
