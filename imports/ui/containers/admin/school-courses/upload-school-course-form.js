import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { Schools } from '/imports/api/schools/schools';
import { SchoolCourses } from '/imports/api/school-courses/school-courses';
import { Subjects } from '/imports/api/subjects/subjects';
import { UploadSchoolCourseForm } from '/imports/ui/components/admin/school-courses/upload-school-course-form';
import { Loading } from '/imports/ui/components/loading';

const composer = (props, onData) => {
  const schoolCoursesSubscription = Meteor.subscribe('schoolCourses');
  const subjectsSubscription = Meteor.subscribe('subjects');
  const schoolsSubscription = Meteor.subscribe('schools');
  if (schoolCoursesSubscription.ready() && subjectsSubscription.ready() && schoolsSubscription.ready()) {
    let schoolCourses = [];
    const subjects = Subjects.find({}).fetch();
    const school = Schools.findOne(props.schoolId);
    if (school) {
    	const coursesIds = (school.schoolCourses && _.pluck(school.schoolCourses, 'course')) || []
    	schoolCourses = SchoolCourses.find({_id:{$in:coursesIds}}).fetch();
    }else{
    	schoolCourses = SchoolCourses.find({}).fetch();
    }
    onData(null, { schoolCourses, subjects, school });
  }
};

export default composeWithTracker(composer, Loading)(UploadSchoolCourseForm);
