import React from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import CityForm from '/imports/ui/containers/admin/city-form';

export const CityNew = () => (
  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header">Insert a new City</h1>
        <CityForm />
      </Col>
    </Row>
  </Grid>
);
