import { composeWithTracker } from 'react-komposer';
import { SchoolCourses } from '/imports/api/school-courses/school-courses';
import { AdminSchoolCoursesList } from '/imports/ui/components/admin/school-courses/admin-school-courses-list';
import { Loading } from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';
import { Schools } from '/imports/api/schools/schools';

const composer = (params, onData) => {
  const schoolCoursesSubscription = Meteor.subscribe('schoolCourses');
  if (schoolCoursesSubscription.ready() ) {
  	let schoolCourses = [];
  	if (params.schoolId) {
  		const school = Schools.findOne(params.schoolId)
  		const coursesIds = school && school.schoolCourses && _.pluck(school.schoolCourses, 'course')
  		if (coursesIds && coursesIds.length) {
  			schoolCourses = SchoolCourses.find({_id:{$in:coursesIds}}).fetch();
  		}
  	}else{
  		schoolCourses = SchoolCourses.find({}).fetch();
  	}
    
    onData(null, { schoolCourses });
  }
};

export default composeWithTracker(composer, Loading)(AdminSchoolCoursesList);
