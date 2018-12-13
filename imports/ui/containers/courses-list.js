import {composeWithTracker} from 'react-komposer';
import {Schools} from '../../api/schools/schools';
import {Countries} from '../../api/countries/countries';
import {Cities} from '../../api/cities/cities';
import {SchoolCourses} from '../../api/school-courses/school-courses';
import {Favorites} from '../../api/favorites/favorites';
import {CoursesList} from '../components/courses-list';
import {Loading} from '../components/loading';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

const filterCoursesByPrice = (courses, price) => {
  return courses.filter(schoolCourse => {
    let coursePriceForTimeFramesBeginningInWeek1 = schoolCourse.coursePrice && schoolCourse.coursePrice.filter(coursePrice => coursePrice.weekBeginNumber === 1)[0];
    if (coursePriceForTimeFramesBeginningInWeek1) {
      if (coursePriceForTimeFramesBeginningInWeek1.isInclusivePrice) {
        return price >= parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceInclusive);
      } else {
        return price >= parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceForWeek) * parseFloat(coursePriceForTimeFramesBeginningInWeek1.minimumWeeks);
      }
    } else {
      return false
    }
  });
};

const filterCoursesByDuration = (courses, duration) => {
  return courses.filter(schoolCourse => {
    const min_duration = schoolCourse.min_duration;
    const max_duration = schoolCourse.max_duration;
    if (min_duration && max_duration) {
      return duration >= min_duration && duration <= max_duration;
    }else if (min_duration) {
      return duration >= min_duration;
    }
    return false;
  });
};

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

let getAllIdsOfCitiesInSelectedCountries = function (countries) {
  const idsOfAllSelectedCountries = countries.map(country => Countries.findOne({name: country})._id);
  let idsOfCitiesInSelectedCountries = [];
  idsOfAllSelectedCountries.forEach(countryId => {
    Cities.find({country: countryId}).forEach(city => {
      if (city && city._id) {
        idsOfCitiesInSelectedCountries.push(city._id);
      }
    });
  });
  idsOfCitiesInSelectedCountries = idsOfCitiesInSelectedCountries.filter(onlyUnique);
  return idsOfCitiesInSelectedCountries;
};
const filterCourses = (params) => {
  const countries = params.courseFilter.countries;
  const langs = params.courseFilter.langs;
  const subjectIdArray = params.courseFilter.courses;
  const favourites = params.courseFilter.favourites;
  const price = params.courseFilter.price;
  const duration = params.courseFilter.duration;
  let favColl;
  let favCourseIds;

  let schools = [];
  const filters = [];
  let idsOfCitiesInSelectedCountries = getAllIdsOfCitiesInSelectedCountries(countries);
  if (langs.length) {
    filters.push({'language': {$in: langs}});
  }
  let schoolCoursesIdArray = SchoolCourses.find().fetch().map(c=> c._id)
  let byCountryCourseIdArray = [],
      bySubjectCoursesIdArray = subjectIdArray
        .map(subjectId => SchoolCourses.findOne({subject: subjectId}))
        .map(schoolCourse => schoolCourse !== undefined ? schoolCourse._id : '');
  if (countries.length) {
    byCountryCourseIdArray = Schools.find({"cityId": {$in: idsOfCitiesInSelectedCountries}}).fetch().map(school=>{
      return _.pluck(school.schoolCourses, 'course')
    })
    byCountryCourseIdArray = [].concat.apply([], byCountryCourseIdArray);
  }
  
  if (countries.length) {
    schoolCoursesIdArray = _.intersection(schoolCoursesIdArray, byCountryCourseIdArray)
  }

  if (subjectIdArray.length) {
    schoolCoursesIdArray = _.intersection(schoolCoursesIdArray, bySubjectCoursesIdArray)
  }

  if (subjectIdArray.length || countries.length || params.courseSearch.length) {
    filters.push({
      '_id': {
        $in: schoolCoursesIdArray
      }
    });
  }

  if (filters.length > 0) {
    courses = SchoolCourses.find({
      $or: [
        {courseName: {$regex: params.courseSearch, $options: 'i'}},
      ],
      $and: filters,
    }).fetch();
  } else {
    courses = SchoolCourses.find({
      $or: [
        {courseName: {$regex: params.courseSearch, $options: 'i'}},
      ],
    }).fetch();
  }

  if (favourites) {
    favColl = Favorites.find({user: Meteor.userId()}).fetch();
    favCourseIds = favColl.map((f) => (f.course));
    courses = courses.filter(s => favCourseIds.indexOf(s._id) !== -1);
  }
  if (price > 0) {
    courses = filterCoursesByPrice(courses, price);
  }
  if (duration > 0) {
    courses = filterCoursesByDuration(courses, duration);
  }
  return courses;
};

const composer = (params, onData) => {
  const courseSearch = Session.get('CourseSearch');
  const courseFilter = Session.get('CourseFilter');

  const imagesSubscription = Meteor.subscribe('images');
  const schoolSubscription = Meteor.subscribe('schools');
  const schoolFeedbacksSubscription = Meteor.subscribe('schoolFeedbacks');
  const cityFeedbacksSubscription = Meteor.subscribe('cityFeedbacks');
  const citiesSubscription = Meteor.subscribe('cities');
  const countriesSubscription = Meteor.subscribe('countries');
  const favoritesSubscription = Meteor.subscribe('favorites');
  const usersSubscription = Meteor.subscribe('users');
  const schoolCoursesSubscription = Meteor.subscribe('schoolCourses');
  if (schoolSubscription.ready() && citiesSubscription.ready() &&
    countriesSubscription.ready() && favoritesSubscription.ready() &&
    schoolFeedbacksSubscription.ready() && cityFeedbacksSubscription.ready() &&
    usersSubscription.ready() && imagesSubscription.ready() && schoolCoursesSubscription.ready()) {
    const courses = filterCourses({courseSearch, courseFilter});

    onData(null, {courses});
  }
};

export default composeWithTracker(composer, Loading)(CoursesList);
