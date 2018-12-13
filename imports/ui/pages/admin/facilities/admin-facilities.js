import React from 'react';
import {browserHistory} from 'react-router';
import {Row, Col, Grid, Button, ButtonGroup, Glyphicon} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';
import AdminFacilitiesList from '/imports/ui/containers/admin/facilities/admin-facilities-list';
import i18n from 'meteor/universe:i18n';

const handleNewSubject = () => browserHistory.push('/admin/facilities/new');

export class AdminFacilities extends React.Component {
  render() {
    const T = i18n.createComponent();
    return (
      <div>
        <Grid className="main-app-container">
          <Row className="admin-list-buttons">
            <Button bsStyle="success" block onClick={handleNewSubject}>
              <Glyphicon glyph="plus"/><T>schoolFacility</T>
            </Button>
          </Row>
          <Row className="admin-list-content">
            <AdminFacilitiesList/>
          </Row>
        </Grid>
      </div>
    );
  }
}
