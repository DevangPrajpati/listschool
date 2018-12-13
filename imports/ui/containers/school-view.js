import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import SchoolView from '../components/school-view';
import { Schools } from '../../api/schools/schools';
import {SchoolCourses} from '../../api/school-courses/school-courses';
import { Cities } from '../../api/cities/cities';
import { Countries } from '../../api/countries/countries';
import { Images } from '../../api/images/images';
import { Loading } from '../components/loading';

const composer = (props, onData) => {
  const schoolSlug = props.schoolSlug;
  const courseId = props.courseId;
  const schoolViewSubscription = Meteor.subscribe('school', schoolSlug);
  const courseSubscription = Meteor.subscribe('schoolCourses');
  const citiesSubscription = Meteor.subscribe('cities');
  const countriesSubscription = Meteor.subscribe('countries');
  const imagesSubscription = Meteor.subscribe('images');
  const schoolFeedbacksSubscription = Meteor.subscribe('schoolFeedbacks');
  const cityFeedbacksSubscription = Meteor.subscribe('cityFeedbacks');
  const favoritesSubscription = Meteor.subscribe('favorites');
  const usersSubscription = Meteor.subscribe('users');
  const school = Schools.findOne({ slug: schoolSlug });
  if (schoolViewSubscription.ready()
      && courseSubscription.ready()
      && citiesSubscription.ready()
      && countriesSubscription.ready()
      && imagesSubscription.ready()
      && schoolFeedbacksSubscription.ready()
      && cityFeedbacksSubscription.ready()
      && favoritesSubscription.ready()
      && usersSubscription.ready()
      && school) {
    const city = Cities.findOne(school.cityId);
    const country = Countries.findOne(city.country);
    const course = courseId ? SchoolCourses.findOne(courseId) : null;
    const image = Images.findOne(school.profile.avatar) || {};
    if (city && country && image) {
      onData(null, { school, city, country, image, course });
    }
  }
};

export default composeWithTracker(composer, Loading)(SchoolView);
