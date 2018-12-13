import { composeWithTracker } from 'react-komposer';
import { Subjects } from '/imports/api/subjects/subjects';
import { AdminSubjectsList } from '/imports/ui/components/admin/subjects/admin-subjects-list';
import { Loading } from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';

const composer = (params, onData) => {
  const schoolCoursesSubscription = Meteor.subscribe('subjects');
  if (schoolCoursesSubscription.ready() ) {
    const subjects = Subjects.find({}).fetch();
    onData(null, { subjects });
  }
};

export default composeWithTracker(composer, Loading)(AdminSubjectsList);
