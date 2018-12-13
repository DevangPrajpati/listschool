import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import CountryForm from '/imports/ui/containers/admin/country-form';

export const CountryNew = () => (
  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header">Insert a new country</h1>
        <CountryForm />
      </Col>
    </Row>
  </Grid>
);
