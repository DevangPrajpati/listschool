import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import UsersList from '../containers/users-list';

export class Users extends React.Component {
  render() {
    return (
      <div>
        <Grid className="main-app-container">
          <Row>
            <Col xs={ 12 }>
              <h4 className="page-header">Usuários</h4>
              <UsersList />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
