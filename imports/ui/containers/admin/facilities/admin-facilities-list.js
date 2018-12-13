import { composeWithTracker } from 'react-komposer';
import { Facilities } from '/imports/api/facilities/facilities';
import { AdminFacilitiesList } from '/imports/ui/components/admin/facilities/admin-facilities-list';
import { Loading } from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const facilitiesSubscription = Meteor.subscribe('facilities');
  if (facilitiesSubscription.ready() ) {
    const facilities = Facilities.find({}).fetch();
    onData(null, { facilities });
  }
};

export default composeWithTracker(composer, Loading)(AdminFacilitiesList);
