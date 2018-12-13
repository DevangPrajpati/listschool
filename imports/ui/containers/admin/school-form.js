import {composeWithTracker} from 'react-komposer';
import {Meteor} from 'meteor/meteor';
import {Schools} from '/imports/api/schools/schools';
import {Cities} from '/imports/api/cities/cities';
import {SchoolCourses} from '/imports/api/school-courses/school-courses';
import {Accommodations} from '/imports/api/accommodations/accommodations';
import {Facilities} from '/imports/api/facilities/facilities';
import {SchoolForm} from '/imports/ui/components/admin/forms/school-form';
import {Loading} from '/imports/ui/components/loading';

const composer = (props, onData) => {
  const schoolSubscription = Meteor.subscribe('schools');
  const accommodationsSubscription = Meteor.subscribe('accommodations');
  const citiesSubscription = Meteor.subscribe('cities');
  const schoolCoursesSubscription = Meteor.subscribe('schoolCourses');
  const facilitiesSubscription = Meteor.subscribe('facilities');
  if (schoolSubscription.ready() && citiesSubscription.ready() && schoolCoursesSubscription.ready() && accommodationsSubscription.ready() && facilitiesSubscription.ready()) {
    const school = Schools.findOne(props.schoolId);
    const cities = Cities.find({}).fetch();
    const schoolCourses = SchoolCourses.find({}).fetch();
    const accommodations = Accommodations.find({}).fetch();
    const facilities = Facilities.find({}).fetch();
    onData(null, { cities, school, schoolCourses, accommodations, facilities});
  }
};

export default composeWithTracker(composer, Loading)(SchoolForm);
