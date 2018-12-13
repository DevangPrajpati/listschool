import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import SchoolForm from '/imports/ui/containers/admin/school-form';

export const SchoolNew = () => (
  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header">Insert a new school</h1>
        <SchoolForm />
      </Col>
    </Row>
  </Grid>
);
