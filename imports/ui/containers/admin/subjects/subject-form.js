import {composeWithTracker} from 'react-komposer';
import {Meteor} from 'meteor/meteor';
import {Subjects} from '/imports/api/subjects/subjects';
import {SubjectsForm} from '/imports/ui/components/admin/subjects/subjects-form';
import {Loading} from '/imports/ui/components/loading';

const composer = (props, onData) => {
  const subjectsSubscription = Meteor.subscribe('subjects');
  if (subjectsSubscription.ready()) {
    const subject = Subjects.findOne({_id: props.subjectId});
    onData(null, {subject: subject});
  }
};

export default composeWithTracker(composer, Loading)(SubjectsForm);
