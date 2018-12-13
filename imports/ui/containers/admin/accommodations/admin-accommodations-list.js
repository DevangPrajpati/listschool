import {composeWithTracker} from 'react-komposer';
import {Accommodations} from '/imports/api/accommodations/accommodations';
import {AdminAccommodationsList} from '/imports/ui/components/admin/accommodations/admin-accommodations-list';
import {Loading} from '/imports/ui/components/loading';
import {Meteor} from 'meteor/meteor';

const composer = (params, onData) => {
  const schoolCoursesSubscription = Meteor.subscribe('accommodations');
  if (schoolCoursesSubscription.ready()) {
    const accommodations = Accommodations.find({}).fetch();
    onData(null, {accommodations});
  }
};

export default composeWithTracker(composer, Loading)(AdminAccommodationsList);
