import {composeWithTracker} from 'react-komposer';
import {Meteor} from 'meteor/meteor';
import {Facilities} from '/imports/api/facilities/facilities';
import {FacilitiesForm} from '/imports/ui/components/admin/facilities/facilities-form';
import {Loading} from '/imports/ui/components/loading';

const composer = (props, onData) => {
  const facilitiesSubscription = Meteor.subscribe('facilities');
  if (facilitiesSubscription.ready()) {
    const facility = Facilities.findOne({_id: props.facilityId});
    onData(null, {facility: facility});
  }
};

export default composeWithTracker(composer, Loading)(FacilitiesForm);
