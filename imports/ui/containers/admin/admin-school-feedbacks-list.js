import { composeWithTracker } from 'react-komposer';
import { SchoolFeedbacks } from '/imports/api/school-feedbacks/school-feedbacks';
import { AdminSchoolFeedbacksList } from '/imports/ui/components/admin/admin-school-feedbacks-list';
import { Loading } from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const adminUsersSubscription = Meteor.subscribe('adminUsers');
  const schoolFeedbacksSubscription = Meteor.subscribe('schoolFeedbacks');
  if (schoolFeedbacksSubscription.ready() && adminUsersSubscription.ready()) {
    const schoolFeedbacks = SchoolFeedbacks.find({ school: params.schoolId }).fetch();

    onData(null, { schoolFeedbacks });
  }
};

export default composeWithTracker(composer, Loading)(AdminSchoolFeedbacksList);
