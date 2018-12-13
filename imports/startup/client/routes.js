import $ from 'jquery';
import React from 'react';
import ReactGA from 'react-ga';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { App } from '/imports/ui/layouts/app';
import { Users } from '/imports/ui/pages/users';
import { Favorites } from '/imports/ui/pages/favorites';
import { Index } from '/imports/ui/pages/index';
import { Login } from '/imports/ui/pages/login';
import { NotFound } from '/imports/ui/pages/not-found';
import { RecoverPassword } from '/imports/ui/pages/recover-password';
import { ResetPassword } from '/imports/ui/pages/reset-password';
import { Signup } from '/imports/ui/pages/signup';
import { Profile } from '/imports/ui/pages/profile';
import { Contact } from '/imports/ui/pages/contact';
import School from '/imports/ui/pages/school';
import { SuggestSchool } from '/imports/ui/pages/suggest-school';

import { AdminSchools } from '/imports/ui/pages/admin/admin-schools';
import { SchoolNew } from '/imports/ui/pages/admin/school-new';
import { SchoolShow } from '/imports/ui/pages/admin/school-show';
import { SchoolEdit } from '/imports/ui/pages/admin/school-edit';

import { AdminCities } from '/imports/ui/pages/admin/admin-cities';
import { CityNew } from '/imports/ui/pages/admin/city-new';
import { CityShow } from '/imports/ui/pages/admin/city-show';
import { CityEdit } from '/imports/ui/pages/admin/city-edit';

import { AdminCountries } from '/imports/ui/pages/admin/admin-countries';
import { CountryNew } from '/imports/ui/pages/admin/country-new';
import { CountryEdit } from '/imports/ui/pages/admin/country-edit';

import {AdminSchoolCourses} from "../../ui/pages/admin/school-courses/admin-school-courses";
import {SchoolCourseEdit} from "../../ui/pages/admin/school-courses/school-course-edit";
import {SchoolCourseNew} from "../../ui/pages/admin/school-courses/school-course-new";
import {UploadSchoolCourse} from '../../ui/pages/admin/school-courses/upload-school-course';

import {AdminSubjects} from "../../ui/pages/admin/subjects/admin-subjects";
import {SubjectEdit} from "../../ui/pages/admin/subjects/subject-edit";
import {SubjectNew} from "../../ui/pages/admin/subjects/subject-new";

import {AdminAccommodations} from "../../ui/pages/admin/accommodations/admin-accommodations";
import {AccommodationEdit} from "../../ui/pages/admin/accommodations/accommodation-edit";
import {AccommodationNew} from "../../ui/pages/admin/accommodations/accommodation-new";

import {AdminFacilities} from "../../ui/pages/admin/facilities/admin-facilities";
import {FacilityEdit} from "../../ui/pages/admin/facilities/facility-edit";
import {FacilityNew} from "../../ui/pages/admin/facilities/facility-new";
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
  if ($('.navbar-collapse').hasClass('in')) {
    $('.navbar-toggle').click();
  }
};

const requireAuth = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const requireAuthAdmin = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  } else {
    if (!Roles.userIsInRole(Meteor.userId(), ['admin'], Roles.GLOBAL_GROUP)) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname },
      });
    }
  }
};

Meteor.startup(() => {
  ReactGA.initialize(Meteor.settings.public.analytics);

  render(
    <Router history={ browserHistory } onUpdate={logPageView}>
      <Route path="/admin" component={ App } onEnter={ requireAuthAdmin } >
        <Route name="schools" path="/admin/schools" component={ AdminSchools } />
        <Route name="new-school" path="/admin/schools/new" component={ SchoolNew } />
        <Route name="show-school" path="/admin/schools/:schoolId" component={ SchoolShow } />
        <Route name="edit-school" path="/admin/schools/:schoolId/edit" component={ SchoolEdit } />

        <Route name="cities" path="/admin/cities" component={ AdminCities } />
        <Route name="new-city" path="/admin/cities/new" component={ CityNew } />
        <Route name="show-city" path="/admin/cities/:cityId" component={ CityShow } />
        <Route name="edit-city" path="/admin/cities/:cityId/edit" component={ CityEdit } />

        <Route name="countries" path="/admin/countries" component={ AdminCountries } />
        <Route name="new-country" path="/admin/countries/new" component={ CountryNew } />
        <Route name="edit-country" path="/admin/countries/:countryId/edit" component={ CountryEdit }/>

        <Route name="admin-school-courses" path="/admin/schoolCourses" component={ AdminSchoolCourses } />
        <Route name="new-school-course" path="/admin/schoolCourses/new" component={ SchoolCourseNew } />
        <Route name="upload-school-courses" path="/admin/schoolCourses/upload" component={ UploadSchoolCourse } />
        <Route name="edit-school-course" path="/admin/schoolCourses/:schoolCourseId/edit" component={ SchoolCourseEdit } />

        <Route name="admin-subjects" path="/admin/subjects" component={ AdminSubjects } />
        <Route name="new-subject" path="/admin/subjects/new" component={ SubjectNew } />
        <Route name="edit-subject" path="/admin/subjects/:subjectId/edit" component={ SubjectEdit } />

        <Route name="admin-accommodations" path="/admin/accommodations" component={ AdminAccommodations } />
        <Route name="new-accommodation" path="/admin/accommodations/new" component={ AccommodationNew } />
        <Route name="edit-accommodation" path="/admin/accommodations/:accommodationId/edit" component={ AccommodationEdit } />

        <Route name="admin-facilities" path="/admin/facilities" component={ AdminFacilities} />
        <Route name="new-facility" path="/admin/facilities/new" component={ FacilityNew } />
        <Route name="edit-facility" path="/admin/facilities/:facilityId/edit" component={ FacilityEdit } />
      </Route>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="favorites" path="/favorites" component={ Favorites } onEnter={ requireAuth } />
        <Route name="users" path="/users" component={ Users } onEnter={ requireAuth } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="profile" path="/profile" component={ Profile } onEnter={ requireAuth } />
        <Route name="contact" path="/contact" component={ Contact } />
        <Route name="suggest-school" path="/suggest-school" component={ SuggestSchool } />
        <Route name="school" path="/school/:schoolSlug" component={ School } />
        <Route name="course" path="/school/:schoolSlug/:courseId" component={ School } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
