import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { SchoolCourses } from '../school-courses';

Meteor.publish('schoolCourses', (selector = {}, options = {}) => SchoolCourses.find(selector, options));
