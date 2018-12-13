import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Subjects } from '../subjects';

Meteor.publish('subjects', () => Subjects.find());
