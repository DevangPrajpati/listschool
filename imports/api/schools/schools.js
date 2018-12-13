import faker from 'faker';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Factory } from 'meteor/dburles:factory';
import { Cities } from '../cities/cities';
import { Countries } from '../countries/countries';
import { BooleanForm } from '/imports/modules/boolean-form';
import { ImageForm } from '/imports/modules/image-form';
import slug from 'slug';

export const Schools = new Mongo.Collection('Schools');

export const SchoolFacilitySchema = new SimpleSchema({
  accessibility: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  transfer: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  insurance: {
    type: Boolean,
    uniforms: BooleanForm,
  },
  job_support: {
    type: Boolean,
    uniforms: BooleanForm,
  },
});

const SchoolCitySchema = new SimpleSchema({
  name: {
    type: String,
    autoValue: function schoolNameAutoValue() {
      if (this.isInsert) {
        const city = Cities.findOne({ _id: this.field('cityId').value });
        return city.name;
      }

      if (this.isUpdate) {
        const cityId = Schools.findOne({ _id: this.docId }).cityId;
        const city = Cities.findOne({ _id: cityId });
        return city.name;
      }

      this.unset();
      return '';
    },
  },
  country: {
    type: String,
    autoValue: function schoolCountryAutoValue() {
      if (Meteor.isServer) {
        if (this.isInsert) {
          const city = Cities.findOne({ _id: this.field('cityId').value });
          const country = Countries.findOne({ _id: city.country });
          return country.name;
        }

        if (this.isUpdate) {
          const cityId = Schools.findOne({ _id: this.docId }).cityId;
          const city = Cities.findOne({ _id: cityId });
          const country = Countries.findOne({ _id: city.country });
          return country.name;
        }
      }

      this.unset();
      return '';
    },
  },
});

export const SchoolProfileSchema = new SimpleSchema({
  avatar: {
    type: String,
    optional: true,
    uniforms: ImageForm,
  },
  address: {
    type: String,
    optional: true,
  },
  website: {
    type: String,
    optional: true,
  },
  facebook: {
    type: String,
    optional: true,
  },
  twitter: {
    type: String,
    optional: true,
  },
  instagram: {
    type: String,
    optional: true,
  },
  currency: {
    type: String,
    optional: true,
  },
});

export const SchoolCoursePriceSchema = new SimpleSchema({
  weekBeginNumber: {
    type: Number,
    optional: false,
    min: 1,
  },
  weekEndNumber: {
    type: Number,
    optional: false,
    min: 2,
  },
  priceForWeek: {
    type: String,
    optional: true,
  },
  minimumWeeks: {
    type: Number,
    optional: false,
    min: 1,
  },
  isInclusivePrice: {
    type: Boolean,
    optional:false,
    uniforms: BooleanForm,
  },
  priceInclusive: {
    type: String,
    optional: true,
  }

});

export const SchoolCoursesSchema = new SimpleSchema({
  course: {
    type: String,
    optional: false
  }
});


Schools.schema = new SimpleSchema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    autoValue: function schoolNameSlug() {
      return slug(this.field('name').value.toLowerCase());
    },
  },
  description: {
    type: String,
  },
  cityId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  city: {
    type: SchoolCitySchema,
  },
  accommodations: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  facilities: {
    type: [String],
    regEx: SimpleSchema.RegEx.Id,
    optional: true,
  },
  profile: {
    type: SchoolProfileSchema,
  },
  schoolCourses: {
    type: [SchoolCoursesSchema],
    optional: true,
  }
});

Schools.attachSchema(Schools.schema);

Factory.define('school', Schools, {
  name: () => faker.hacker.phrase(),
  description: faker.hacker.phrase(),
  cityId: () => Factory.get('city'),
  facilities: () => ({
    accessibility: faker.random.boolean(),
    transfer: faker.random.boolean(),
    insurance: faker.random.boolean(),
    job_support: faker.random.boolean(),
  }),
  profile: () => ({
    address: faker.address.streetAddress(),
    website: faker.internet.url(),
    facebook: faker.internet.url(),
    twitter: faker.internet.url(),
    instagram: faker.internet.url(),
    currency: faker.finance.currencyCode(),
  }),
});
