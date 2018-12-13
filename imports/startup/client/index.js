import {Session} from 'meteor/session';
import i18n from 'meteor/universe:i18n';
import 'bootstrap/dist/js/bootstrap.min';
import './routes';
import {ENGLISH_LOCALE} from "../../../common/locale-names";

Session.set('SchoolSearch', '');
Session.set('SchoolFilter', {
  langs: [],
  countries: [],
  courses: [],
  price: 0,
});
Session.set('CourseSearch', '');
Session.set('CourseFilter', {
  langs: [],
  countries: [],
  courses: [],
  price: 0,
  duration: 0
});
Session.set('Compare', {});
Session.set('GivenFeedback', false);
i18n.setLocale(localStorage.getItem("Lang") !== null ? localStorage.getItem("Lang"): ENGLISH_LOCALE.locale);
