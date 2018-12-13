import {Mongo} from 'meteor/mongo';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {Factory} from 'meteor/dburles:factory';
import { BooleanForm } from '/imports/modules/boolean-form';

export const SCHOOL_COURSES_COLLECTION_NAME = 'SchoolCourses';
export const SchoolCourses = new Mongo.Collection(SCHOOL_COURSES_COLLECTION_NAME);

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
    label: 'Price per week',
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

SchoolCourses.schema = new SimpleSchema({
  courseName: {
    type: String,
    label: 'School course name',
    optional: false,
  },
  subject: {
    type: String,
    label: 'Subject id',
    optional: false,
    regEx: SimpleSchema.RegEx.Id,
  },
  level_required: {
    type: String,
    label: 'Level required',
    optional: true
  },
  min_age: {
    type: Number,
    label: 'Minimum age',
    optional: true
  },
  max_age: {
    type: Number,
    label: 'Maximum age',
    optional: true
  },
  hours_week: {
    type: String,
    label: 'Hours per week',
    optional: true
  },
  lessons_week: {
    type: String,
    label: 'Lessons per week',
    optional: true
  },
  min_duration: {
    type: Number,
    label: 'Minimum duration',
    optional: true
  },
  max_duration: {
    type: Number,
    label: 'Maximum duration',
    optional: true
  },
  classrooms_avalbl: {
    type: Number,
    label: 'Classrooms avalbl',
    optional: true
  },
  max_class_size: {
    type: Number,
    label: 'Maximum class size',
    optional: true
  },
  morning: {
    type: Boolean,
    label: 'Morning',
    uniforms: BooleanForm,
    optional: true
  },
  afternoon: {
    type: Boolean,
    label: 'Afternoon',
    uniforms: BooleanForm,
    optional: true
  },
  night: {
    type: Boolean,
    label: 'Night',
    uniforms: BooleanForm,
    optional: true,
  },
  all_day: {
    type: Boolean,
    label: 'All day',
    uniforms: BooleanForm,
    optional: true
  },
  course_desc: {
    type: String,
    label: 'Course description',
    optional: true
  },
  start_dates: {
    type: Date,
    label: 'Start dates',
    optional: true
  },
  fullpay_required: {
    type: Boolean,
    label: 'Full pay required',
    uniforms: BooleanForm,
    optional: true
  },
  government_insurance: {
    type: Boolean,
    label: 'Government insurance',
    uniforms: BooleanForm,
    optional: true
  },
  price_valid_date: {
    type: Date,
    label: 'Price valid date',
    optional: true
  },
  course_currency: {
    type: String,
    label: 'Course currency',
    optional: true
  },
  course_commision: {
    type: Number,
    label: 'Course commision',
    optional: true
  },
  coursePrice: {
    type: [SchoolCoursePriceSchema],
    optional: true,
    minCount: 1,
  },
  language: {
    type: String,
    label: 'Language of Administration',
    defaultValue: 'English',
    optional: true
  }
});
SchoolCourses.attachSchema(SchoolCourses.schema);
