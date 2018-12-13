import {composeWithTracker} from 'react-komposer';
import {Schools} from '../../api/schools/schools';
import {Countries} from '../../api/countries/countries';
import {Cities} from '../../api/cities/cities';
import {SchoolCourses} from '../../api/school-courses/school-courses';
import {Favorites} from '../../api/favorites/favorites';
import {SchoolsList} from '../components/schools-list';
import {Loading} from '../components/loading';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';

const filterSchoolsByPrice = (schools, price) => {
  return schools.filter(school => {
    let schoolCourses = school.schoolCourses;
    if (schoolCourses !== undefined) {
      let schoolCoursesWhichMatchThePrice = schoolCourses.filter(schoolCourse => {
        let coursePriceForTimeFramesBeginningInWeek1 = schoolCourse.coursePrice.filter(coursePrice => coursePrice.weekBeginNumber === 1)[0];
        if (coursePriceForTimeFramesBeginningInWeek1.isInclusivePrice) {
          return price >= parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceInclusive);
        } else {
          return price >= parseFloat(coursePriceForTimeFramesBeginningInWeek1.priceForWeek) * parseFloat(coursePriceForTimeFramesBeginningInWeek1.minimumWeeks);
        }
      });
      return schoolCoursesWhichMatchThePrice.length > 0;
    } else {
      return false;
    }
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
      idsOfCitiesInSelectedCountries.push(city._id);
    });
  });
  idsOfCitiesInSelectedCountries = idsOfCitiesInSelectedCountries.filter(onlyUnique);
  return idsOfCitiesInSelectedCountries;
};
const filterSchools = (params) => {
  const countries = params.schoolFilter.countries;
  const langs = params.schoolFilter.langs;
  const subjectIdArray = params.schoolFilter.courses;
  const favourites = params.schoolFilter.favourites;
  const price = params.schoolFilter.price;
  let favColl;
  let favSchoolIds;

  let schools = [];
  const filters = [];
  let idsOfCitiesInSelectedCountries = getAllIdsOfCitiesInSelectedCountries(countries);
  if (langs.length) {
    filters.push({'profile.language': {$in: langs}});
  }
  if (countries.length) {
    filters.push({"cityId": {$in: idsOfCitiesInSelectedCountries}});
  }

  let schoolCoursesIdArray = subjectIdArray
    .map(subjectId => SchoolCourses.findOne({subject: subjectId}))
    .map(schoolCourse => schoolCourse !== undefined ? schoolCourse._id : '');
  if (schoolCoursesIdArray.length !== 0) {
    filters.push({
      'schoolCourses.course': {
        $in: schoolCoursesIdArray
      }
    });
  }

  if (filters.length > 0) {
    schools = Schools.find({
      $or: [
        {name: {$regex: params.schoolSearch, $options: 'i'}},
        {'city.name': {$regex: params.schoolSearch, $options: 'i'}},
        {'city.country': {$regex: params.schoolSearch, $options: 'i'}},
      ],
      $and: filters,
    }).fetch();
  } else {
    schools = Schools.find({
      $or: [
        {name: {$regex: params.schoolSearch, $options: 'i'}},
        {'city.name': {$regex: params.schoolSearch, $options: 'i'}},
        {'city.country': {$regex: params.schoolSearch, $options: 'i'}},
      ],
    }).fetch();
  }

  if (favourites) {
    favColl = Favorites.find({user: Meteor.userId()}).fetch();
    favSchoolIds = favColl.map((f) => (f.school));
    schools = schools.filter(s => favSchoolIds.indexOf(s._id) !== -1);
  }
  if (price > 0) {
    schools = filterSchoolsByPrice(schools, price);
  }
  return schools;
};

const composer = (params, onData) => {
  const schoolSearch = Session.get('SchoolSearch');
  const schoolFilter = Session.get('SchoolFilter');

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
    const schools = filterSchools({schoolSearch, schoolFilter});

    onData(null, {schools});
  }
};

export default composeWithTracker(composer, Loading)(SchoolsList);
