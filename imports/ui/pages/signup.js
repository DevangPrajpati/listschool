import React from 'react';
import { Link } from 'react-router';
import { Row, Col, Grid, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { handleSignup } from '../../modules/signup';
import i18n from 'meteor/universe:i18n';

export class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const T = i18n.createComponent();
    return (
      <Grid className="main-app-container">
        <Row>
          <Col xs={ 12 }>
            <div className="form-view-container">
              <h4 className="page-header"><T>register</T></h4>
              <form ref="signup" className="signup" onSubmit={ this.handleSubmit }>
                <Row>
                  <Col xs={ 6 } sm={ 6 }>
                    <FormGroup>
                      <ControlLabel><T>firstName</T></ControlLabel>
                      <FormControl
                        type="text"
                        ref="firstName"
                        name="firstName"
                        placeholder="First name"
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={ 6 } sm={ 6 }>
                    <FormGroup>
                      <ControlLabel><T>surname</T></ControlLabel>
                      <FormControl
                        type="text"
                        ref="lastName"
                        name="lastName"
                        placeholder="Last Name"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <ControlLabel><T>email</T></ControlLabel>
                  <FormControl
                    type="text"
                    ref="emailAddress"
                    name="emailAddress"
                    placeholder="Email Address"
                  />
                </FormGroup>
                <FormGroup>
                  <ControlLabel><T>password</T></ControlLabel>
                  <FormControl
                    type="password"
                    ref="password"
                    name="password"
                    placeholder="Password"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success"><T>registerAction</T></Button>
              </form>
              <p><T>doYouAlreadyHaveAccount</T><Link to="/login"><T>logIn</T></Link>.</p>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
