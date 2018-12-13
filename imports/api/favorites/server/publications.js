import { Meteor } from 'meteor/meteor';
import { Favorites } from '../favorites';

Meteor.publish('favorites', () => Favorites.find());
