import React from 'react';
import {browserHistory} from 'react-router';
import {Button, Glyphicon, Grid, Row} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import AdminAccommodationsList from '/imports/ui/containers/admin/accommodations/admin-accommodations-list';
import i18n from 'meteor/universe:i18n';

const handleNewAccommodation = () => browserHistory.push('/admin/accommodations/new');

export class AdminAccommodations extends React.Component {
  render() {
    const T = i18n.createComponent();
    return (
      <div>
        <Grid className="main-app-container">
          <Row className="admin-list-buttons">
            <Button bsStyle="success" block onClick={handleNewAccommodation}>
              <Glyphicon glyph="plus"/><T>accommodation</T>
            </Button>
          </Row>
          <Row className="admin-list-content">
            <AdminAccommodationsList/>
          </Row>
        </Grid>
      </div>
    );
  }
}
