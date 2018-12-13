import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import FacilityForm from '/imports/ui/containers/admin/facilities/facility-form';

export const FacilityNew = () => (

  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header"></h1>
        <FacilityForm />
      </Col>
    </Row>
  </Grid>
);
