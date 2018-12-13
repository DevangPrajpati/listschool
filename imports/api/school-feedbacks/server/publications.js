import { Meteor } from 'meteor/meteor';
import { SchoolFeedbacks } from '../school-feedbacks';

Meteor.publish('schoolFeedbacks', () => SchoolFeedbacks.find());
