import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import SchoolCourseForm from '/imports/ui/containers/admin/school-courses/school-course-form';

export const SchoolCourseNew = () => (

  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header"></h1>
        <SchoolCourseForm />
      </Col>
    </Row>
  </Grid>
);
