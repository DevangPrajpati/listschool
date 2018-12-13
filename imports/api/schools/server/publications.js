import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Schools } from '../schools';

Meteor.publish('schools', () => Schools.find());
Meteor.publish('school', (schoolSlug) => {
  check(schoolSlug, String);
  return Schools.find({ slug: schoolSlug });
});
