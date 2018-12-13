import { composeWithTracker } from 'react-komposer';
import { Schools } from '/imports/api/schools/schools';
import { AdminSchoolsList } from '/imports/ui/components/admin/admin-schools-list';
import { Loading } from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const schoolSubscription = Meteor.subscribe('schools');
  const citiesSubscription = Meteor.subscribe('cities');
  const countriesSubscription = Meteor.subscribe('countries');
  if (schoolSubscription.ready() && citiesSubscription.ready()
      && countriesSubscription.ready()) {
    const schools = Schools.find({}).fetch();

    onData(null, { schools });
  }
};

export default composeWithTracker(composer, Loading)(AdminSchoolsList);
