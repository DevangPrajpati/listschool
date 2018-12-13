import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import Compare from '../containers/compare';
import FavoritesList from '../containers/favorites-list';
import i18n from 'meteor/universe:i18n';

export class Favorites extends React.Component {

  render() {
    const T = i18n.createComponent();
    return (
      <div>
        <Grid className="main-app-container">
          <Row>
            <Col xs={ 12 }>
              <h4 className="page-header"><T>favourites</T></h4>
              <FavoritesList />
            </Col>
          </Row>
          <Compare />
        </Grid>
      </div>
    );
  }
}
