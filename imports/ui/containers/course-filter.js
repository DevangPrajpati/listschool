import { composeWithTracker } from 'react-komposer';
import { uniq, flattenDeep } from 'lodash';
import { Schools } from '../../api/schools/schools';
import { SchoolCourses } from '/imports/api/school-courses/school-courses';
import { Subjects } from '../../api/subjects/subjects';
import { Countries } from '../../api/countries/countries';
import { CourseFilter } from '../components/course-filter';
import { Meteor } from 'meteor/meteor';
import { Loading } from '../components/loading';

const composer = (props, onData) => {
  const schoolSubscription = Meteor.subscribe('schools');
  const schoolCourcesSubscription = Meteor.subscribe('schoolCourses');
  const subjectsSubscription = Meteor.subscribe('subjects');
  const countriesSubscription = Meteor.subscribe('countries');
  const citiesSubscription = Meteor.subscribe('cities');
  if (schoolSubscription.ready() && subjectsSubscription.ready() && schoolCourcesSubscription.ready() && countriesSubscription.ready() && citiesSubscription.ready()) {
    const languages = [];
    const unqiueCountries = Countries.find().map(country => country.name);
    const price = 0;
    const duration = 0;
    SchoolCourses.find().forEach(course => {
      if (course && course.language) {
        languages.push(course.language);
      }
    });
    const uniqLangs = uniq(languages).sort();
    const uniqueSubjects = Subjects.find({}).fetch();
    onData(null, { languages: uniqLangs, countries: Array.from(unqiueCountries), subjects: uniqueSubjects, price, duration });
  }
};

export default composeWithTracker(composer, Loading)(CourseFilter);
