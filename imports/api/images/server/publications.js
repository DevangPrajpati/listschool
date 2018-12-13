import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Images } from '../images';

Meteor.publish('images', () => Images.find().cursor);
Meteor.publish('image', (imageId) => {
  check(imageId, String);
  return Images.find({ _id: imageId });
});
