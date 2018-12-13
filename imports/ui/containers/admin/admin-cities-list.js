import { composeWithTracker } from 'react-komposer';
import { Cities } from '/imports/api/cities/cities';
import { AdminCitiesList } from '/imports/ui/components/admin/admin-cities-list';
import { Loading } from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const citiesSubscription = Meteor.subscribe('cities');
  const countriesSubscription = Meteor.subscribe('countries');
  if (citiesSubscription.ready() && countriesSubscription.ready()) {
    const cities = Cities.find({}).fetch();

    onData(null, { cities });
  }
};

export default composeWithTracker(composer, Loading)(AdminCitiesList);
