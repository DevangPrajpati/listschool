import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import UploadCourseForm from '/imports/ui/containers/admin/school-courses/upload-school-course-form';

export const UploadSchoolCourse = () => (
  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <UploadCourseForm />
      </Col>
    </Row>
  </Grid>
);
