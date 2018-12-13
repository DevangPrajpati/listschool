import React from 'react';
import { Grid } from 'react-bootstrap';
import CoursesList from '../containers/courses-list';
import { CourseSearch } from '../components/course-search';
import CourseFilter from '../containers/course-filter';
import SchoolSearchButtons from '../components/school-search-buttons';

export const Index = () => (
  <div>
    <div className="school-search-fav-wrapper">
      <div className="school-search-fav">
        <div>
          <CourseSearch />
        </div>
        <SchoolSearchButtons />
      </div>
      <div className="school-filter-wrapper">
        <CourseFilter />
      </div>
    </div>
    <Grid className="main-app-container small-padding">
      <CoursesList />
    </Grid>
  </div>
);
