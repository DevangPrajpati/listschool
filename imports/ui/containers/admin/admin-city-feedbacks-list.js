import { composeWithTracker } from 'react-komposer';
import { CityFeedbacks } from '/imports/api/city-feedbacks/city-feedbacks';
import { AdminCityFeedbacksList } from '/imports/ui/components/admin/admin-city-feedbacks-list';
import { Loading } from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const adminUsersSubscription = Meteor.subscribe('adminUsers');
  const cityFeedbacksSubscription = Meteor.subscribe('cityFeedbacks');
  if (cityFeedbacksSubscription.ready() && adminUsersSubscription.ready()) {
    const cityFeedbacks = CityFeedbacks.find({ city: params.cityId }).fetch();

    onData(null, { cityFeedbacks });
  }
};

export default composeWithTracker(composer, Loading)(AdminCityFeedbacksList);
