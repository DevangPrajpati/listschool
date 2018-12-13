import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import AccommodationForm from '/imports/ui/containers/admin/accommodations/accommodation-form';

export const AccommodationNew = () => (

  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header"></h1>
        <AccommodationForm />
      </Col>
    </Row>
  </Grid>
);
