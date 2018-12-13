import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import SubjectForm from '/imports/ui/containers/admin/subjects/subject-form';

export const SubjectNew = () => (

  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header"></h1>
        <SubjectForm />
      </Col>
    </Row>
  </Grid>
);
