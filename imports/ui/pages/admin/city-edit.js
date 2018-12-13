import React from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import CityForm from '/imports/ui/containers/admin/city-form';

export const CityEdit = (props) => (
  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header">Edit a school</h1>
        <CityForm cityId={props.params.cityId} />
      </Col>
    </Row>
  </Grid>
);
