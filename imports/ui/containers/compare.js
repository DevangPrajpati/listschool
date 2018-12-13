import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Compare } from '../components/compare';

const composer = (props, onData) => {
  const compare = Session.get('Compare');
  const schoolFeedbacksSubscription = Meteor.subscribe('schoolFeedbacks');
  const schools = Object.keys(compare).map(key => compare[key]);
  if (schoolFeedbacksSubscription.ready() && schools) {
    onData(null, { schools });
  }
};

export default composeWithTracker(composer)(Compare);
