import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import SchoolCourseForm from '/imports/ui/containers/admin/school-courses/school-course-form';

export const SchoolCourseEdit = (props) => {
  const T = i18n.createComponent();
  return (
    <Grid className="main-app-container">
      <Row>
        <Col xs={12}>
          <h1 className="page-header"><T>editSchoolCourse</T></h1>
          <SchoolCourseForm schoolCourseId={props.params.schoolCourseId}/>
        </Col>
      </Row>
    </Grid>);
};
