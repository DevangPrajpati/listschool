import { composeWithTracker } from 'react-komposer';
import { uniq, flattenDeep } from 'lodash';
import { Schools } from '../../api/schools/schools';
import { Subjects } from '../../api/subjects/subjects';
import { Countries } from '../../api/countries/countries';
import { SchoolFilter } from '../components/school-filter';
import { Meteor } from 'meteor/meteor';
import { Loading } from '../components/loading';

const composer = (props, onData) => {
  const schoolSubscription = Meteor.subscribe('schools');
  const subjectsSubscription = Meteor.subscribe('subjects');
  const countriesSubscription = Meteor.subscribe('countries');
  const citiesSubscription = Meteor.subscribe('cities');
  if (schoolSubscription.ready() && subjectsSubscription.ready() && schoolSubscription.ready() && countriesSubscription.ready() && citiesSubscription.ready()) {
    const languages = [];
    const unqiueCountries = Countries.find().map(country => country.name);
    const price = 0;
    Schools.find().forEach(school => {
      languages.push(school.profile.language);
    });
    const uniqLangs = uniq(languages).sort();
    const uniqueSubjects = Subjects.find({}).fetch();
    onData(null, { languages: uniqLangs, countries: Array.from(unqiueCountries), subjects: uniqueSubjects, price: price });
  }
};

export default composeWithTracker(composer, Loading)(SchoolFilter);
