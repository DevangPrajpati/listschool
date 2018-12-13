import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Cities } from '/imports/api/cities/cities';
import { Countries } from '/imports/api/countries/countries';
import { CityForm } from '/imports/ui/components/admin/forms/city-form';
import { Loading } from '/imports/ui/components/loading';

const composer = (props, onData) => {
  const citiesSubscription = Meteor.subscribe('cities');
  const countriesSubscription = Meteor.subscribe('countries');
  if (citiesSubscription.ready() && countriesSubscription.ready()) {
    const city = Cities.findOne(props.cityId);
    const countries = Countries.find({}).fetch();

    onData(null, { countries, city });
  }
};

export default composeWithTracker(composer, Loading)(CityForm);
