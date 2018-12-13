import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Accommodations } from '../accommodations';

Meteor.publish('accommodations', () => Accommodations.find());
