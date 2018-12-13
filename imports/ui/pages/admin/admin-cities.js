import React from 'react';
import { browserHistory } from 'react-router';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import AdminCitiesList from '/imports/ui/containers/admin/admin-cities-list';

const handleNewCity = () => browserHistory.push('/admin/cities/new');

export class AdminCities extends React.Component {
  render() {
    return (
      <div>
        <Grid className="main-app-container">
          <Row className="admin-list-buttons">
            <Col sm={12} lg={3} lgOffset={9}>
              <Button bsStyle="success" block onClick={ handleNewCity }>
                <Glyphicon glyph="plus"/> City
              </Button>
            </Col>
          </Row>
          <Row className="admin-list-content">
            <AdminCitiesList />
          </Row>
        </Grid>
      </div>
    );
  }
}
