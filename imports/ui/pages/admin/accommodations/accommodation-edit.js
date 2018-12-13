import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import AccommodationForm from '/imports/ui/containers/admin/accommodations/accommodation-form';

export const AccommodationEdit = (props) => {
  const T = i18n.createComponent();
  return (
    <Grid className="main-app-container">
      <Row>
        <Col xs={12}>
          <h1 className="page-header"><T>editAccommodation</T></h1>
          <AccommodationForm accommodationId={props.params.accommodationId}/>
        </Col>
      </Row>
    </Grid>);
};
