import React from 'react';
import { browserHistory } from 'react-router';
import { Row, Col, Grid, Button, Glyphicon } from 'react-bootstrap';
import AdminCountriesList from '/imports/ui/containers/admin/admin-countries-list';

const handleNewCountry = () => browserHistory.push('/admin/countries/new');

export class AdminCountries extends React.Component {
  render() {
    return (
      <div>
        <Grid className="main-app-container">
          <Row className="admin-list-buttons">
            <Col sm={12} lg={3} lgOffset={9}>
              <Button bsStyle="success" block onClick={ handleNewCountry }>
                <Glyphicon glyph="plus"/> Country
              </Button>
            </Col>
          </Row>
          <Row className="admin-list-content">
            <AdminCountriesList />
          </Row>
        </Grid>
      </div>
    );
  }
}
