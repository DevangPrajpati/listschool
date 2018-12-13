import {composeWithTracker} from 'react-komposer';
import {Meteor} from 'meteor/meteor';
import {Accommodations} from '/imports/api/accommodations/accommodations';
import {AccommodationsForm} from '/imports/ui/components/admin/accommodations/accommodation-form';
import {Loading} from '/imports/ui/components/loading';

const composer = (props, onData) => {
  const accommodationsSubscription = Meteor.subscribe('accommodations');
  if (accommodationsSubscription.ready()) {
    const accommodation = Accommodations.findOne({_id: props.accommodationId});
    onData(null, {accommodation: accommodation});
  }
};

export default composeWithTracker(composer, Loading)(AccommodationsForm);
