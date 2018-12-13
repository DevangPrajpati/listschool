import React from 'react';
import { browserHistory } from 'react-router';
import { Row, Grid, Col, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import { sendContactEmail } from '/imports/api/users/methods';
import { getInputValue } from '/imports/modules/get-input-value';
import i18n from 'meteor/universe:i18n';

export class Contact extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const args = {
      emailAddress: getInputValue(this.refs.emailAddress),
      description: getInputValue(this.refs.description),
    };

    sendContactEmail.call(args, (error) => {
      if (error) {
        Bert.alert(error, 'warning');
      } else {
        Bert.alert('Mensagem enviada, nós entraremos em contato o mais rápido possível!', 'success');
        browserHistory.push('/');
      }
    });
  }

  render() {
    const T = i18n.createComponent();
    let emailAddress = '';
    const user = Meteor.user();

    if (user) {
      emailAddress = <FormControl
        type="email"
        ref="emailAddress"
        name="emailAddress"
        defaultValue={user.emails[0].address}
        disabled="disabled"
      />;
    } else {
      emailAddress = <FormControl
        type="email"
        ref="emailAddress"
        name="emailAddress"
      />;
    }

    return (
      <Grid className="main-app-container">
        <Row>
          <Col xs={ 12 }>
            <div className="form-view-container">
              <h4 className="page-header"><T>contact</T></h4>
              <form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <ControlLabel><T>yourEmailAddress</T></ControlLabel>
                  {emailAddress}
                </FormGroup>
                <FormGroup>
                  <ControlLabel><T>howCanWeHelpYou</T></ControlLabel>
                  <FormControl
                    type="text"
                    ref="description"
                    name="description"
                  />
                </FormGroup>
                <Button type="submit" bsStyle="success"><T>send</T></Button>
              </form>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
