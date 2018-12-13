import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Countries } from '/imports/api/countries/countries';
import { CountryForm } from '/imports/ui/components/admin/forms/country-form';
import { Loading } from '/imports/ui/components/loading';

const composer = (props, onData) => {
  const countriesSubscription = Meteor.subscribe('countries');
  if (countriesSubscription.ready()) {
    const country = Countries.findOne(props.countryId);

    onData(null, { country });
  }
};

export default composeWithTracker(composer, Loading)(CountryForm);
