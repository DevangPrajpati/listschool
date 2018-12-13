import {Meteor} from 'meteor/meteor';
import {Roles} from 'meteor/alanning:roles';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SchoolCourses, SchoolCoursePriceSchema, SCHOOL_COURSES_COLLECTION_NAME} from '../school-courses/school-courses';
import {updateMethod, insertMethod, removeMethod} from '../collections-api';


export const insertSchoolCourse = insertMethod(SchoolCourses, SCHOOL_COURSES_COLLECTION_NAME,
  new SimpleSchema({
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
      label: 'level required',
      optional: true
    },
    min_age: {
      type: Number,
      label: 'min age',
      optional: true
    },
    max_age: {
      type: Number,
      label: 'max age',
      optional: true
    },
    hours_week: {
      type: String,
      label: 'hours week',
      optional: true
    },
    lessons_week: {
      type: String,
      label: 'lessons week',
      optional: true
    },
    min_duration: {
      type: Number,
      label: 'min duration',
      optional: true
    },
    max_duration: {
      type: Number,
      label: 'max duration',
      optional: true
    },
    classrooms_avalbl: {
      type: Number,
      label: 'classrooms avalbl',
      optional: true
    },
    max_class_size: {
      type: Number,
      label: 'max class size',
      optional: true
    },
    morning: {
      type: Boolean,
      label: 'morning',
      optional: true
    },
    afternoon: {
      type: Boolean,
      label: 'afternoon',
      optional: true
    },
    night: {
      type: Boolean,
      label: 'night',
      optional: true
    },
    all_day: {
      type: Boolean,
      label: 'all_day',
      optional: true,
      defaultValue: false
    },
    course_desc: {
      type: String,
      label: 'course_desc',
      optional: true
    },
    start_dates: {
      type: Date,
      label: 'start dates',
      optional: true
    },
    fullpay_required: {
      type: Boolean,
      label: 'full pay required',
      optional: true
    },
    government_insurance: {
      type: Boolean,
      label: 'government insurance',
      optional: true
    },
    price_valid_date: {
      type: Date,
      label: 'price valid date',
      optional: true
    },
    course_currency: {
      type: String,
      label: 'course currency',
      optional: true
    },
    course_commision: {
      type: Number,
      label: 'course commision',
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
  })
);

export const updateSchoolCourse= updateMethod(SchoolCourses, SCHOOL_COURSES_COLLECTION_NAME,
  new SimpleSchema({
    _id: {type: String},
    'update.courseName': {type: String},
    'update.subject': {type: String, regEx: SimpleSchema.RegEx.Id},
    'update.level_required': {type: String, optional: true},
    'update.min_age': {type: Number, optional: true},
    'update.max_age': {type: Number, optional: true},
    'update.hours_week': {type: String, optional: true},
    'update.lessons_week': {type: String, optional: true},
    'update.min_duration': {type: Number, optional: true},
    'update.max_duration': {type: Number, optional: true},
    'update.classrooms_avalbl': {type: Number, optional: true},
    'update.max_class_size': {type: Number, optional: true},
    'update.morning': {type: Boolean, optional: true},
    'update.afternoon': {type: Boolean, optional: true},
    'update.all_day': {type: Boolean, optional: true},
    'update.night': {type: Boolean, optional: true},
    'update.course_desc': {type: String, optional: true},
    'update.start_dates': {type: Date, optional: true},
    'update.fullpay_required': {type: Boolean, optional: true},
    'update.government_insurance': {type: Boolean, optional: true},
    'update.price_valid_date': {type: Date, optional: true},
    'update.course_currency': {type: String, optional: true},
    'update.course_commision': {type: Number, optional: true},
    'update.coursePrice': { type: [SchoolCoursePriceSchema]},
    'update.language': {type: String, optional: true},
  })
);

export const removeSchoolCourse = removeMethod(SchoolCourses, SCHOOL_COURSES_COLLECTION_NAME,
  new SimpleSchema({
    _id: {type: String},
  })
);
