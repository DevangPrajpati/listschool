import { Meteor } from 'meteor/meteor';
import { Cities } from '../cities';

Meteor.publish('cities', () => Cities.find());
