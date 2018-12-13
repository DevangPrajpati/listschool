import React from 'react';
import {Row, Col, Grid} from 'react-bootstrap';
import i18n from 'meteor/universe:i18n';
import FacilityForm from '/imports/ui/containers/admin/facilities/facility-form';

export const FacilityEdit = (props) => {
  const T = i18n.createComponent();
  return (
    <Grid className="main-app-container">
      <Row>
        <Col xs={12}>
          <h1 className="page-header"><T>editFacility</T></h1>
          <FacilityForm facilityId={props.params.facilityId}/>
        </Col>
      </Row>
    </Grid>);
};
