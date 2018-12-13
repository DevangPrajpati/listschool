import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import AdminCityFeedbacksList from '/imports/ui/containers/admin/admin-city-feedbacks-list';

export const CityShow = (props) => (
  <Grid className="main-app-container">
    <Row>
      <Col xs={ 12 }>
        <h1 className="page-header">City Feedbacks</h1>
        <AdminCityFeedbacksList cityId={props.params.cityId}/>
      </Col>
    </Row>
  </Grid>
);
