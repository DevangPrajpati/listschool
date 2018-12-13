import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Facilities } from '../facilities';

Meteor.publish('facilities', () => Facilities.find());
