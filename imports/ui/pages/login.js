import React from 'react';
import { Link } from 'react-router';
import { Row, Grid, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleLogin } from '../../modules/login';
import {T} from "../../utils/translation-utils";

export class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Grid className="main-app-container">
        <Row>
          <Col xs={ 12 }>
            <div className="form-view-container">
              <h4 className="page-header">Login</h4>
              <form ref="login" className="login" onSubmit={ this.handleSubmit }>
                <FormGroup>
                  <ControlLabel><T>email</T></ControlLabel>
                  <FormControl
                    type="email"
                    ref="emailAddress"
                    name="emailAddress"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>
                    <span className="pull-left"><T>password</T></span>
                    <Link className="pull-right" to="/recover-password"><T>didYouForgotThePassword</T></Link>
                  </ControlLabel>
                  <FormControl
                    type="password"
                    ref="password"
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success"><T>login</T></Button>
              </form>
              <p><T>dontYouHaveTheAccount</T><Link to="/signup"><T>register</T></Link>.</p>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
