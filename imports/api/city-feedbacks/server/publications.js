import { Meteor } from 'meteor/meteor';
import { CityFeedbacks } from '../city-feedbacks';

Meteor.publish('cityFeedbacks', () => CityFeedbacks.find());
