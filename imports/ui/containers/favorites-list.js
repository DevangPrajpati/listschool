import { composeWithTracker } from 'react-komposer';
import { Schools } from '../../api/schools/schools';
import { Favorites } from '../../api/favorites/favorites';
import { SchoolsList } from '../components/schools-list';
import { Meteor } from 'meteor/meteor';
import { Loading } from '../components/loading';

const filterSchools = () => {
  const favorites = Favorites.find({ user: Meteor.userId() }).fetch();
  const schoolIds = favorites.map((favorite) => (favorite.school));
  const schools = Schools.find({ _id: { $in: schoolIds } }).fetch();

  return schools;
};

const composer = (props, onData) => {
  const schoolSubscription = Meteor.subscribe('schools');
  const schoolFeedbacksSubscription = Meteor.subscribe('schoolFeedbacks');
  const cityFeedbacksSubscription = Meteor.subscribe('cityFeedbacks');
  const citiesSubscription = Meteor.subscribe('cities');
  const countriesSubscription = Meteor.subscribe('countries');
  const favoritesSubscription = Meteor.subscribe('favorites');
  const usersSubscription = Meteor.subscribe('users');
  if (schoolSubscription.ready() && citiesSubscription.ready() &&
      countriesSubscription.ready() && favoritesSubscription.ready() &&
      schoolFeedbacksSubscription.ready() && cityFeedbacksSubscription.ready() &&
      usersSubscription.ready()) {
    const schools = filterSchools();

    onData(null, { schools, canCompare: true });
  }
};

export default composeWithTracker(composer, Loading)(SchoolsList);
