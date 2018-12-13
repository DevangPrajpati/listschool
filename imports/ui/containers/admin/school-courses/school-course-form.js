import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { SchoolCourses } from '/imports/api/school-courses/school-courses';
import { Subjects } from '/imports/api/subjects/subjects';
import { SchoolCourseForm } from '/imports/ui/components/admin/school-courses/school-course-form';
import { Loading } from '/imports/ui/components/loading';

const composer = (props, onData) => {
  const schoolCoursesSubscription = Meteor.subscribe('schoolCourses');
  const subjectsSubscription = Meteor.subscribe('subjects');
  if (schoolCoursesSubscription.ready() && subjectsSubscription.ready()) {
    const schoolCourse = SchoolCourses.findOne({_id:props.schoolCourseId});
    const subjects = Subjects.find({}).fetch();
    onData(null, { schoolCourse, subjects });
  }
};

export default composeWithTracker(composer, Loading)(SchoolCourseForm);
