import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import AdminSchoolFeedbacksList from '/imports/ui/containers/admin/admin-school-feedbacks-list';
import i18n from 'meteor/universe:i18n';

export const SchoolShow = (props) => {
  const T = i18n.createComponent();

  return (
    <Grid className="main-app-container">
    <Row>
      <Col xs={12}>
        <h1 className="page-header"><T>schoolFeedbacks</T></h1>
        <AdminSchoolFeedbacksList schoolId={props.params.schoolId}/>
      </Col>
    </Row>
  </Grid>
  );
};
