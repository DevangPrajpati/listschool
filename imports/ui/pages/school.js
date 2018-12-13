import React from 'react';
import { Grid } from 'react-bootstrap';
import SchoolContainer from '../containers/school-view';

const School = ({ params }) => {
  const schoolSlug = params.schoolSlug;
  const courseId = params.courseId;
  if (schoolSlug) {
    return (
      <Grid className="main-app-container">
        <SchoolContainer schoolSlug={schoolSlug} courseId = {courseId}/>
      </Grid>
    );
  }
  return null;
};

School.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default School;
