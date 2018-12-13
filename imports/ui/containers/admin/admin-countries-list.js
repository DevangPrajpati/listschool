import { composeWithTracker } from 'react-komposer';
import { Countries } from '/imports/api/countries/countries';
import { AdminCountriesList } from '/imports/ui/components/admin/admin-countries-list';
import { Loading } from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const countriesSubscription = Meteor.subscribe('countries');
  if (countriesSubscription.ready()) {
    const countries = Countries.find({}).fetch();

    onData(null, { countries });
  }
};

export default composeWithTracker(composer, Loading)(AdminCountriesList);
