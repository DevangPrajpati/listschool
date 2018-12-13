import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import CountryForm from '/imports/ui/containers/admin/country-form';

export const CountryEdit = (props) => (
  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header">Edit a country</h1>
        <CountryForm countryId={props.params.countryId} />
      </Col>
    </Row>
  </Grid>
);
